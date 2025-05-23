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
              {chats
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((item) => (
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
