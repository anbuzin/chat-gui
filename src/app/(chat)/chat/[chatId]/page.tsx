import { ChatContainer } from "@/components/chat-container";
import { Input } from "@/components/ui/input";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  return (
    <>
      <ChatContainer chatId={params.chatId} />
      <Input
        className="sticky bottom-0 bg-background/50 backdrop-blur-sm border-t p-4"
        placeholder="Type a message..."
      />
    </>
  );
}
