import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageContainer } from "@/components/message-container";
import { mockMessages } from "@/app/mock-chats";


export function ChatContainer() {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4">
            {mockMessages.map((message) => (
              <MessageContainer key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="sticky bottom-0 bg-background/50 backdrop-blur-sm border-t p-4">
        <Input placeholder="Type a message..." />
      </div>
    </div>
  );
}
