from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from typing import List
from pydantic import BaseModel

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


MOCK_TEXT_RESPONSE = "This is a mock response from the server. It simulates what a real AI would return. The streaming functionality is working correctly!"

MOCK_TOOL_CALL_RESPONSE = {
    "id": "call_123456789",
    "name": "get_current_weather",
    "arguments": '{"latitude": 40.7128, "longitude": -74.0060}',
}

MOCK_TOOL_RESULT = {"temperature": 72, "unit": "fahrenheit", "description": "Sunny"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    async def generate_stream():
        # Stream the text content first
        words = MOCK_TEXT_RESPONSE.split()
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


# Keep the original stream endpoint for compatibility
@app.get("/api/stream")
async def stream_response():
    async def generate_stream():
        for chunk in MOCK_TEXT_RESPONSE.split(" "):
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0.05)

        yield "data: [DONE]\n\n"

    return StreamingResponse(generate_stream(), media_type="text/event-stream")
