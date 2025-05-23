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
    type: Literal["text", "reasoning", "tool_invocation", "source", "step_start"]
    text: Optional[str] = None
    reasoning: Optional[str] = None
    tool_invocation: Optional[ToolInvocation] = None
    source: Optional[str] = None

    @classmethod
    def from_pydantic_ai_part(cls, raw_part: dict) -> "Part":
        raise NotImplementedError

    def to_pydantic_ai_part(self) -> dict:
        raise NotImplementedError


class UIMessage(BaseModel):
    id: str
    role: Literal["system", "user", "assistant", "data"]
    createdAt: datetime | None = None
    content: str | None = None
    annotations: dict = Field(default_factory=dict)
    parts: list[Part] = Field(default_factory=list)


class Message(BaseModel):
    id_: uuid.UUID | None = None
    role: Literal["system", "user", "assistant", "data"]
    created_at: datetime | None = None
    content: str | None = None
    annotations: dict = Field(default_factory=dict)
    parts: list[Part] = Field(default_factory=list)

    @classmethod
    def from_nextjs_ui_message(cls, ui_message: UIMessage) -> "Message":
        return cls(
            id_=ui_message.id,
            role=ui_message.role,
            created_at=ui_message.createdAt,
            content=ui_message.content,
            annotations=ui_message.annotations,
            parts=ui_message.parts,
        )

    def to_nextjs_ui_message(self) -> UIMessage:
        return UIMessage(
            id=str(self.id_),
            role=self.role,
            createdAt=self.created_at,
            content=self.content,
            annotations=self.annotations,
            parts=self.parts,
        )

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
    history: list[Message] = Field(default_factory=list)
    archive: list[Message] = Field(default_factory=list)

    def to_chat_info(self) -> ChatInfo:
        return ChatInfo(
            id_=self.id_,
            title=self.title,
            created_at=self.created_at,
        )
