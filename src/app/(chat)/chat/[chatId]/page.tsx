"use client";

import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import reactGfm from "remark-gfm";
import { Input } from "@/components/ui/input";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat/" + chatId,
    id: chatId,
  });
  return (
    <>
      <div className="w-full">
        <div className="overflow-y-auto flex flex-col gap-4 w-full max-w-3xl mx-auto px-4">
          {messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                className={cn(
                  "w-full flex",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  key={message.id}
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
                          <Markdown remarkPlugins={[reactGfm]}>
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
      <form onSubmit={handleSubmit}>
        <div className="sticky bottom-0">
          <div className="max-w-3xl mx-auto mb-2">
            <div className="bg-black/5 backdrop-blur-md p-1 rounded-md">
              <div className="bg-background/75 backdrop-blur-lg p-2 rounded-sm">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="bg-transparent border-none outline-none focus-visible:border-none focus-visible:ring-0 shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
