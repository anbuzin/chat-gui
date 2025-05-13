import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Chat() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <ScrollArea className="flex-1">
      </ScrollArea>
      <Input />
    </div >
  );
}