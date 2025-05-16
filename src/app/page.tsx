import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatContainer } from "@/components/chat-container";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="fixed top-0 left-0 z-50" />
      <main className="flex flex-col h-screen w-full bg-background">
        <ChatContainer />
        <Input
          className="sticky bottom-0 bg-background/50 backdrop-blur-sm border-t p-4"
          placeholder="Type a message..."
        />
      </main>
    </SidebarProvider>
  );
}
