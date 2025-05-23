from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import os
import uuid
from pydantic import BaseModel
import gel
from common.types import Message, ChatInfo, Chat, Part, UIMessage
from queries.chat_api import (
    SELECT_CHAT_BY_ID,
    INSERT_MESSAGE,
    SELECT_CHAT_INFOS,
    INSERT_CHAT,
)

DEPLOYMENT_URL = f"https://{os.getenv('VERCEL_URL')}" or "http://localhost:3000"
VERCEL_BYPASS = os.getenv("VERCEL_AUTOMATION_BYPASS_SECRET") or ""


gel_base_client = gel.create_async_client()
gel_client = gel_base_client.with_globals(
    {"backend_url": f"{DEPLOYMENT_URL}", "vercel_bypass": f"{VERCEL_BYPASS}"}
)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FooRequest(BaseModel):
    chat_id: str
    content: str
    llm_role: str


@app.post("/api/agent/foo")
async def foo(request: FooRequest):
    return {"message": "Hello, world!"}


class FetchChatResponse(BaseModel):
    messages: list[UIMessage]


@app.get("/api/chat/{chat_id}")
async def fetch_chat(chat_id: uuid.UUID) -> FetchChatResponse:
    result_set = await gel_client.query(SELECT_CHAT_BY_ID, chat_id=chat_id)
    chat = Chat.from_gel_query_result(result_set[0])
    return FetchChatResponse(messages=[m.to_nextjs_ui_message() for m in chat.archive])


class ListChatsResponse(BaseModel):
    chats: list[ChatInfo]


@app.get("/api/chat")
async def list_chats() -> ListChatsResponse:
    result_set = await gel_client.query(SELECT_CHAT_INFOS)
    return ListChatsResponse(
        chats=[ChatInfo.from_gel_query_result(result) for result in result_set]
    )


class AddMessageRequest(BaseModel):
    messages: list[UIMessage]


@app.post("/api/chat/{chat_id}")
async def add_message(
    chat_id: uuid.UUID, request: AddMessageRequest
) -> StreamingResponse:
    user_message = Message.from_nextjs_ui_message(request.messages[-1], skip_id=True)
    await gel_client.query(
        INSERT_MESSAGE, chat_id=chat_id, **user_message.to_gel_query_params()
    )

    async def generate_stream():
        full_content = ""
        words = ["echo "] + user_message.content.split()
        for i, word in enumerate(words):
            full_content += word + " "
            yield f'0:"{word} "\n'
            await asyncio.sleep(0.1)

        ai_message = Message(
            role="assistant",
            content=full_content,
            parts=[
                Part(
                    type="text",
                    text=full_content,
                )
            ],
        )
        await gel_client.query(
            INSERT_MESSAGE, chat_id=chat_id, **ai_message.to_gel_query_params()
        )
        yield 'e:{{"finishReason":"stop","usage":{{"promptTokens":15,"completionTokens":25}},"isContinued":false}}\n'

    response = StreamingResponse(generate_stream())
    response.headers["x-vercel-ai-data-stream"] = "v1"
    return response


class CreateChatResponse(BaseModel):
    chat_id: uuid.UUID


@app.post("/api/chat")
async def create_chat() -> CreateChatResponse:
    result_set = await gel_client.query(INSERT_CHAT)
    return CreateChatResponse(chat_id=result_set[0].id)
