import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageContainer } from "@/components/message-container";
import { mockMessages } from "@/app/mock-chats";

export function ChatContainer() {
  return (
    <div>
      <ScrollArea>
        <div className="flex flex-col gap-4 w-dvw">
          {mockMessages.map((message) => (
            <MessageContainer key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <Input
        className="sticky bottom-0 bg-background/50 backdrop-blur-sm border-t p-4"
        placeholder="Type a message..."
      />
    </div>
  );
}
