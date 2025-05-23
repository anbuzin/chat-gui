from pydantic import BaseModel, Field
from datetime import datetime
import uuid
import json
from typing import Literal
import gel


class ToolInvocation(BaseModel):
    state: Literal["partial-call", "call", "result"]
    tool_call_id: str
    tool_name: str
    args: dict
    result: dict | None = None

    @classmethod
    def from_gel_query_result(cls, raw_result: gel.Object) -> "ToolInvocation":
        return cls(
            state=raw_result.state,
            tool_call_id=raw_result.tool_call_id,
            tool_name=raw_result.tool_name,
            args=raw_result.args,
            result=raw_result.result,
        )

    def to_gel_query_params(self) -> dict:
        return {
            "state": self.state,
            "tool_call_id": self.tool_call_id,
            "tool_name": self.tool_name,
            "args": self.args,
            "result": self.result,
        }


class Part(BaseModel):
    type: Literal["text", "reasoning", "tool_invocation", "source", "step_start"]
    text: str | None = None
    reasoning: str | None = None
    tool_invocation: ToolInvocation | None = None
    source: str | None = None

    @classmethod
    def from_pydantic_ai_part(cls, raw_part: dict) -> "Part":
        raise NotImplementedError

    def to_pydantic_ai_part(self) -> dict:
        raise NotImplementedError

    @classmethod
    def from_gel_query_result(cls, raw_result: gel.Object) -> "Part":
        return cls(
            type=raw_result.type_,
            text=raw_result.text,
            reasoning=raw_result.reasoning,
            tool_invocation=ToolInvocation.from_gel_query_result(
                raw_result.tool_invocation
            )
            if raw_result.tool_invocation
            else None,
            source=raw_result.source_,
        )

    def to_gel_query_params(self) -> dict:
        return {
            "type": self.type,
            "text": self.text,
            "reasoning": self.reasoning,
            "tool_invocation": self.tool_invocation.to_gel_query_params()
            if self.tool_invocation
            else None,
            "source": self.source,
        }


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
    def from_nextjs_ui_message(
        cls, ui_message: UIMessage, skip_id: bool = False
    ) -> "Message":
        return cls(
            id_=ui_message.id if not skip_id else None,
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

    @classmethod
    def from_gel_query_result(cls, raw_result: gel.Object) -> "Message":
        return cls(
            id_=raw_result.id,
            role=raw_result.role_,
            created_at=raw_result.created_at,
            content=raw_result.content,
            annotations=json.loads(raw_result.annotations),
            parts=[Part.from_gel_query_result(part) for part in raw_result.parts],
        )

    def to_gel_query_params(self) -> dict:
        return {
            "role": self.role,
            "created_at": self.created_at,
            "content": self.content,
            "annotations": json.dumps(self.annotations),
            "parts": json.dumps([part.to_gel_query_params() for part in self.parts]),
        }


class ChatInfo(BaseModel):
    id_: uuid.UUID
    title: str
    created_at: datetime

    @classmethod
    def from_gel_query_result(cls, raw_result: gel.Object) -> "ChatInfo":
        return cls(
            id_=raw_result.id,
            title=raw_result.title,
            created_at=raw_result.created_at,
        )


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

    @classmethod
    def from_gel_query_result(cls, raw_result: gel.Object) -> "Chat":
        return cls(
            id_=raw_result.id,
            title=raw_result.title,
            created_at=raw_result.created_at,
            history=[
                Message.from_gel_query_result(message) for message in raw_result.history
            ],
            archive=[
                Message.from_gel_query_result(message) for message in raw_result.archive
            ],
        )
