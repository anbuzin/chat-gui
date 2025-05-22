from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import os
import uuid
from pydantic import BaseModel
import gel
from common.types import Message, ChatInfo


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
    messages: list[Message]


@app.get("/api/chat/{chat_id}")
async def fetch_chat(chat_id: uuid.UUID) -> FetchChatResponse:
    return FetchChatResponse(messages=[])


class ListChatsResponse(BaseModel):
    chats: list[ChatInfo]


@app.get("/api/chat")
async def list_chats() -> ListChatsResponse:
    return ListChatsResponse(chats=[])


class AddMessageRequest(BaseModel):
    messages: list[Message]


@app.post("/api/chat/{chat_id}")
async def add_message(
    chat_id: uuid.UUID, request: AddMessageRequest
) -> StreamingResponse:
    async def generate_stream():
        for message in request.messages:
            words = message.content.split()
            for i, word in enumerate(words):
                yield f'0:"{word} "\n'
                await asyncio.sleep(0.1)

        yield 'e:{{"finishReason":"stop","usage":{{"promptTokens":15,"completionTokens":25}},"isContinued":false}}\n'

    response = StreamingResponse(generate_stream())
    response.headers["x-vercel-ai-data-stream"] = "v1"
    return response


class CreateChatResponse(BaseModel):
    chat_id: str


@app.post("/api/chat")
async def create_chat() -> CreateChatResponse:
    return CreateChatResponse(chat_id=str(uuid.uuid4()))
