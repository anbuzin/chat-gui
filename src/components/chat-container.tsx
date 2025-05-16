import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageContainer } from "@/components/message-container";
import { mockMessages } from "@/app/mock-chats";

export function ChatContainer() {
  return (
    <div className="w-full">
      <div className="overflow-y-auto flex flex-col gap-4 w-full">
        {mockMessages.map((message) => (
          <MessageContainer key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
