import { ChatContainer } from "@/components/chat-container";
import ChatInput from "@/components/chat-input";

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  return (
    <>
      <ChatContainer chatId={chatId} />
      <ChatInput />
    </>
  );
}
