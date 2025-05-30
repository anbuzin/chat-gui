import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AuthProvider } from "@/components/auth-provider";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.getSession();

  if (!(await session.isSignedIn())) {
    redirect(auth.getBuiltinUIUrl());
  }

  // Ensure we have an auth token
  if (!session.authToken) {
    redirect(auth.getBuiltinUIUrl());
  }

  return (
    <AuthProvider authToken={session.authToken}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="fixed top-0 left-0 z-50 mt-2 ml-2" />
        <main className="w-full h-screen flex flex-col">
          <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
