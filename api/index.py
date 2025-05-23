from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import os
import uuid
from datetime import datetime
from pydantic import BaseModel
import gel
from common.types import Message, ChatInfo, Chat, Part, UIMessage


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


MOCK_CHATS: dict[uuid.UUID, Chat] = {}


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
    return FetchChatResponse(
        messages=[m.to_nextjs_ui_message() for m in MOCK_CHATS[chat_id].history]
    )


class ListChatsResponse(BaseModel):
    chats: list[ChatInfo]


@app.get("/api/chat")
async def list_chats() -> ListChatsResponse:
    return ListChatsResponse(
        chats=[chat.to_chat_info() for chat in MOCK_CHATS.values()]
    )


class AddMessageRequest(BaseModel):
    messages: list[UIMessage]


@app.post("/api/chat/{chat_id}")
async def add_message(
    chat_id: uuid.UUID, request: AddMessageRequest
) -> StreamingResponse:
    new_message = request.messages[-1]
    new_message.id = str(uuid.uuid4())
    MOCK_CHATS[chat_id].history.append(Message.from_nextjs_ui_message(new_message))

    async def generate_stream():
        full_message = ""
        words = ["echo "] + new_message.content.split()
        for i, word in enumerate(words):
            full_message += word + " "
            yield f'0:"{word} "\n'
            await asyncio.sleep(0.1)

        MOCK_CHATS[chat_id].history.append(
            Message(
                id_=uuid.uuid4(),
                role="assistant",
                content=full_message,
                parts=[
                    Part(
                        type="text",
                        text=full_message,
                    )
                ],
            )
        )

        yield 'e:{{"finishReason":"stop","usage":{{"promptTokens":15,"completionTokens":25}},"isContinued":false}}\n'

    response = StreamingResponse(generate_stream())
    response.headers["x-vercel-ai-data-stream"] = "v1"
    return response


class CreateChatResponse(BaseModel):
    chat_id: uuid.UUID


@app.post("/api/chat")
async def create_chat() -> CreateChatResponse:
    chat_id = uuid.uuid4()

    MOCK_CHATS[chat_id] = Chat(
        id_=chat_id,
        title="New Chat",
        created_at=datetime.now(),
    )
    return CreateChatResponse(chat_id=chat_id)
