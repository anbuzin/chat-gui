"use client";

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
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface ChatInfo {
  id: string;
  title: string;
  createdAt: string;
}

export function AppSidebar() {
  const [chats, setChats] = useState<ChatInfo[]>([]);

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => setChats(data.chats));
  }, []);

  return (
    <Sidebar>
      <SidebarContent className="p-2 overflow-y-hidden">
        <SidebarHeader className="mt-8">
          <Link href="/chat">
            <Button className="w-full" variant="outline" size="sm">
              New Chat
            </Button>
          </Link>
        </SidebarHeader>
        <SidebarGroup className="overflow-y-auto">
          <SidebarGroupLabel>Today</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild >
                      <Link href={`/chat/${item.id}`} className="text-sm p-1">
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
