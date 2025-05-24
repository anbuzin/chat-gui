import { MessageItem } from "@/components/message-item";
import { mockMessages } from "@/app/mock-chats";

export function ChatContainer({ chatId }: { chatId: string }) {
  return (
    <div className="w-full">
      <div className="overflow-y-auto flex flex-col gap-4 w-full max-w-3xl mx-auto px-4">
        {mockMessages.filter((message) => message.chatId === chatId).map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
