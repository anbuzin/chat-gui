from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import os
from typing import List
from pydantic import BaseModel
import gel


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


class ClientMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ClientMessage]


MOCK_TOOL_CALL_RESPONSE = {
    "id": "call_123456789",
    "name": "get_current_weather",
    "arguments": '{"latitude": 40.7128, "longitude": -74.0060}',
}

MOCK_TOOL_RESULT = {"temperature": 72, "unit": "fahrenheit", "description": "Sunny"}


class FooRequest(BaseModel):
    chat_id: str
    content: str
    llm_role: str


@app.post("/api/agent/foo")
async def foo(request: FooRequest):
    return {"message": "Hello, world!"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    async def generate_stream():
        await gel_client.query(
            "insert Message {llm_role := <str>$llm_role, content := <str>$content}",
            llm_role=request.messages[-1].role,
            content=f"deployment_url: {DEPLOYMENT_URL}\n{request.messages[-1].content}",
        )
        response = await gel_client.query(
            "select Message.content order by Message.created_at desc limit 1"
        )

        # Stream the text content first
        words = response[0].split()
        for i, word in enumerate(words):
            yield f'0:"{word} "\n'
            await asyncio.sleep(0.1)

        # Optional: simulate a tool call after text
        if len(words) > 5:  # Just a condition to sometimes include tool calls
            # Send tool call
            yield '9:{{"toolCallId":"{id}","toolName":"{name}","args":{args}}}\n'.format(
                id=MOCK_TOOL_CALL_RESPONSE["id"],
                name=MOCK_TOOL_CALL_RESPONSE["name"],
                args=MOCK_TOOL_CALL_RESPONSE["arguments"],
            )

            await asyncio.sleep(0.3)

            # Send tool result
            yield 'a:{{"toolCallId":"{id}","toolName":"{name}","args":{args},"result":{result}}}\n'.format(
                id=MOCK_TOOL_CALL_RESPONSE["id"],
                name=MOCK_TOOL_CALL_RESPONSE["name"],
                args=MOCK_TOOL_CALL_RESPONSE["arguments"],
                result=json.dumps(MOCK_TOOL_RESULT),
            )

        # End stream with finish reason and usage info
        yield 'e:{{"finishReason":"stop","usage":{{"promptTokens":15,"completionTokens":25}},"isContinued":false}}\n'

    response = StreamingResponse(generate_stream())
    response.headers["x-vercel-ai-data-stream"] = "v1"
    return response
