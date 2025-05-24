"use client";

import { use, useEffect, useState } from "react";
import { Message, useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import reactGfm from "remark-gfm";
import ChatInput from "@/components/chat-input";

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
      <div className="w-full">
        <div className="overflow-y-auto flex flex-col gap-4 w-full max-w-3xl mx-auto px-4">
          {messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={cn(
                  "w-full flex",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex flex-col prose p-4",
                    isUser
                      ? "bg-primary text-primary-foreground rounded-md"
                      : "bg-none text-secondary-foreground w-full max-w-none"
                  )}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Markdown
                            key={message.id + "-" + i}
                            remarkPlugins={[reactGfm]}
                          >
                            {part.text}
                          </Markdown>
                        );
                    }
                  })}
                </div>
              </div>
            );
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
