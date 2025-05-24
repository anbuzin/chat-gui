import Markdown from "react-markdown";
import reactGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Message } from "@ai-sdk/react";

export function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn("w-full flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "flex flex-col prose p-4",
          isUser
            ? "bg-primary text-primary-foreground rounded-md"
            : "bg-none text-secondary-foreground w-full max-w-none"
        )}
      >
        {(message.parts ?? []).map((part, i) => {
          switch (part.type) {
            case "text":
              return (
                <Markdown key={message.id + "-" + i} remarkPlugins={[reactGfm]}>
                  {part.text}
                </Markdown>
              );
          }
        })}
      </div>
    </div>
  );
}
