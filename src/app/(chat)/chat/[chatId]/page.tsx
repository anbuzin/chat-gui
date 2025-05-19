import { ChatContainer } from "@/components/chat-container";
import { Input } from "@/components/ui/input";

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  return (
    <>
      <ChatContainer chatId={chatId} />
      <Input
        className="sticky bottom-0 bg-background/50 backdrop-blur-sm border-t p-4"
        placeholder="Type a message..."
      />
    </>
  );
}
