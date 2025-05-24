import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="fixed top-0 left-0 z-50 mt-2 ml-2" />
      <main className="w-full h-screen flex flex-col">
        <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
