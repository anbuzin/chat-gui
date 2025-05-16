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

export function MessageContainer({ message }: { message: Message }) {
  const isUser = message.llm_role === "user";
  return (
      <div
        key={message.id}
        className={cn(
          "prose rounded-lg p-4",
          isUser
            ? "bg-primary text-primary-foreground self-end"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <Markdown remarkPlugins={[reactGfm]} >{message.body}</Markdown>
      </div>
  );
}
