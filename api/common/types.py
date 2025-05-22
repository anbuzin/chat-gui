from pydantic import BaseModel, Field
from datetime import datetime
import uuid
from typing import Literal, Optional


class ToolInvocation(BaseModel):
    state: Literal["partial-call", "call", "result"]
    tool_call_id: str
    tool_name: str
    args: dict
    result: dict | None = None


class Part(BaseModel):
    type_: Literal["text", "reasoning", "tool_invocation", "source", "step_start"]
    text: Optional[str] = None
    reasoning: Optional[str] = None
    tool_invocation: Optional[ToolInvocation] = None
    source: Optional[str] = None

    @classmethod
    def from_nextjs_part(cls, part_data: dict) -> "Part":
        part_type = part_data["type"]

        part = cls(type_=part_type)

        match part_type:
            case "text":
                part.text = part_data["text"]
            case "reasoning":
                part.reasoning = part_data["reasoning"]
            case "tool_invocation":
                part.tool_invocation = ToolInvocation(**part_data["tool_invocation"])
            case "source":
                part.source = part_data["source"]
            case "step_start":
                pass
            case _:
                raise ValueError(f"Unknown part type: {part_type}")

        return part

    def to_nextjs_part(self) -> dict:
        result = {"type": self.type_}

        match self.type_:
            case "text":
                result["text"] = self.text
            case "reasoning":
                result["reasoning"] = self.reasoning
            case "tool_invocation":
                result["tool_invocation"] = self.tool_invocation.model_dump()
            case "source":
                result["source"] = self.source
            case "step_start":
                pass

        return result

    @classmethod
    def from_pydantic_ai_part(cls, raw_part: dict) -> "Part":
        raise NotImplementedError

    def to_pydantic_ai_part(self) -> dict:
        raise NotImplementedError


class Message(BaseModel):
    id_: uuid.UUID
    role: Literal["system", "user", "assistant", "data"]
    created_at: datetime
    content: str | None = None
    annotations: dict = Field(default_factory=dict)
    parts: list[Part] = Field(default_factory=list)

    @classmethod
    def from_nextjs_ui_message(cls, raw_message: dict) -> "Message":
        assert "parts" in raw_message, "Expected parts in raw Next.js UIMessage"

        parts = [Part.from_nextjs_part(part) for part in raw_message["parts"]]

        return cls(
            id_=raw_message["id"],
            role=raw_message["role"],
            created_at=raw_message["created_at"],
            content=raw_message["content"],
            annotations=raw_message["annotations"],
            parts=parts,
        )

    def to_nextjs_ui_message(self) -> dict:
        return {
            "id": self.id_,
            "role": self.role,
            "created_at": self.created_at,
            "content": self.content,
            "annotations": self.annotations,
            "parts": [part.to_nextjs_part() for part in self.parts],
        }

    @classmethod
    def from_pydantic_ai_message(cls, raw_message: dict) -> "Message":
        raise NotImplementedError

    def to_pydantic_ai_message(self) -> dict:
        raise NotImplementedError


class ChatInfo(BaseModel):
    id_: uuid.UUID
    title: str
    created_at: datetime


class Chat(BaseModel):
    id_: uuid.UUID
    title: str
    created_at: datetime
    history: list[Message]
    archive: list[Message]

    def to_chat_info(self) -> ChatInfo:
        return ChatInfo(
            id_=self.id_,
            title=self.title,
            created_at=self.created_at,
        )
