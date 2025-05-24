"use client";

import { use, useEffect, useState } from "react";
import { Message, useChat } from "@ai-sdk/react";
import ChatInput from "@/components/chat-input";
import { MessageItem } from "@/components/message-item";

export default function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { chatId } = use(params);

  const { messages, append, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat/" + chatId,
    initialMessages: initialMessages,
    sendExtraMessageFields: true,
  });

  useEffect(() => {
    const firstMessage = sessionStorage.getItem("firstMessage");
    if (firstMessage) {
      sessionStorage.removeItem("firstMessage");
      append({ role: "user", content: firstMessage });
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/chat/" + chatId);
        const data = await response.json();
        setInitialMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [chatId, append]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto py-4">
          {messages.map((message) => {
            return <MessageItem key={message.id} message={message} />;
          })}
        </div>
      </div>
      <ChatInput
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
      />
    </>
  );
}
