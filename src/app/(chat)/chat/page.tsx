"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export default function NewChat() {
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_message: { role: "user", content: input },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    const data = await response.json();
    const chatId = data.chat_id;
    redirect("/chat/" + chatId);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
        value={input}
        placeholder="Say something..."
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
