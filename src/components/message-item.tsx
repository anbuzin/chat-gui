import Markdown from "react-markdown";
import reactGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export type Message = {
  id: string;
  llm_role: string;
  body: string;
  created_at: string;
  chatId: string;
  evicted?: boolean;
  thinking?: string;
};

export function MessageItem({ message }: { message: Message }) {
  const isUser = message.llm_role === "user";
  return (
    <div
      className={cn("w-full flex", isUser ? "justify-end" : "justify-start")}
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
        <Markdown remarkPlugins={[reactGfm]}>{message.body}</Markdown>
      </div>
    </div>
  );
}
