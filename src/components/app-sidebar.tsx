import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { mockChats } from "@/app/mock-chats";
import { Button } from "./ui/button";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Link href="/chat">
            <Button className="w-full" variant="outline" size="sm">
              New Chat
            </Button>
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Today</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mockChats.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chat/${item.id}`}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
