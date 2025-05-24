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

  const groupedChats = (() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const sorted = chats.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return {
      Today: sorted.filter((chat) => new Date(chat.createdAt) >= today),
      Yesterday: sorted.filter(
        (chat) =>
          new Date(chat.createdAt) >= yesterday &&
          new Date(chat.createdAt) < today
      ),
      "Last 7 days": sorted.filter(
        (chat) =>
          new Date(chat.createdAt) >= sevenDaysAgo &&
          new Date(chat.createdAt) < yesterday
      ),
      Older: sorted.filter((chat) => new Date(chat.createdAt) < sevenDaysAgo),
    };
  })();

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
        <div className="overflow-y-auto">
          {Object.entries(groupedChats).map(
            ([groupName, groupChats]) =>
              groupChats.length > 0 && (
                <SidebarGroup key={groupName}>
                  <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {groupChats.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`/chat/${item.id}`}
                              className="text-sm p-1"
                            >
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
