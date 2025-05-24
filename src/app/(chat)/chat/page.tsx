"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import ChatInput from "@/components/chat-input";

export default function NewChat() {
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sessionStorage.setItem("firstMessage", input);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    const data = await response.json();
    const chatId = data.chat_id;
    redirect("/chat/" + chatId);
  }
  return (
    <ChatInput
      handleSubmit={handleSubmit}
      handleInputChange={(e) => setInput(e.target.value)}
      input={input}
    />
  );
}
