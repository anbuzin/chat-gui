import Markdown from "react-markdown";
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
    <div key={message.id} className={cn("flex flex-col w-full")}>
      <div
        className={cn(
          "rounded-lg p-4 w-fit max-w-[80%]",
          isUser
            ? "prose bg-primary text-primary-foreground self-end"
            : "prose bg-secondary text-secondary-foreground self-start"
        )}
      >
        <Markdown>{message.body}</Markdown>
      </div>
    </div>
  );
}
