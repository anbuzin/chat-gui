import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const mockMessages = [
  {
    id: 1,
    content: "Hey can you explain the meaning of life?",
    sender: "user",
  },
  {
    id: 2,
    content: "The meaning of life is 42",
    sender: "assistant",
  },
  {
    id: 3,
    content:
      "See that's how I know you're a boomer, the youths would say it's 420",
    sender: "user",
  },
  {
    id: 4,
    content: "I'd go as far as to say that joke is outdated",
    sender: "assistant",
  },
  {
    id: 5,
    content: "I guess that makes me a millennial then",
    sender: "user",
  },
  {
    id: 6,
    content: "I'm not sure if I'm a millennial or a gen z",
    sender: "assistant",
  },
  {
    id: 7,
    content: "Both of us are out of touch with the kids though",
    sender: "user",
  },
  {
    id: 8,
    content:
      "Yeah I'm just gonna stall to make sure that ScrollArea is working",
    sender: "assistant",
  },
  {
    id: 9,
    content:
      "Let me know if you need more messages to test the scroll functionality",
    sender: "user",
  },
  {
    id: 10,
    content:
      "I'll add quite a few more messages to make sure we have enough content to trigger the scroll behavior. This one is intentionally longer to take up more vertical space.",
    sender: "assistant",
  },
  {
    id: 11,
    content:
      "That's a good idea. Scrolling is an important part of any chat interface. Users need to be able to look back at conversation history easily.",
    sender: "user",
  },
  {
    id: 12,
    content:
      "Exactly! And proper scroll behavior ensures good user experience, especially when there are many messages or when messages contain a lot of content.",
    sender: "assistant",
  },
  {
    id: 13,
    content:
      "I wonder how the scroll area handles really long messages. Let me try typing something longer to see how it works.",
    sender: "user",
  },
  {
    id: 14,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nisl.",
    sender: "assistant",
  },
  {
    id: 15,
    content:
      "That's a good test. I think we should have enough content now to properly test the scroll functionality.",
    sender: "user",
  },
  {
    id: 16,
    content:
      "Yes, with all these messages, the ScrollArea component should definitely be displaying a scrollbar and allowing users to scroll through the conversation history.",
    sender: "assistant",
  },
  {
    id: 17,
    content: "Is there anything else we should test about the chat interface?",
    sender: "user",
  },
  {
    id: 18,
    content:
      "We might want to test how it handles different types of content like code blocks, images, or markdown formatting, but that would depend on what features are planned for the chat.",
    sender: "assistant",
  },
  {
    id: 19,
    content:
      "Good point. For now, let's focus on making sure the basic scrolling works correctly.",
    sender: "user",
  },
  {
    id: 20,
    content:
      "Perfect! This should be enough messages to demonstrate the scroll functionality clearly.",
    sender: "assistant",
  },
];

export function Chat() {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4">
            {mockMessages.map((message) => (
              <div key={message.id} className={cn("flex flex-col w-full")}>
                <div
                  className={cn(
                    "rounded-lg p-4 w-fit max-w-[80%]",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground self-end"
                      : "bg-secondary text-secondary-foreground self-start",
                  )}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="sticky bottom-0 bg-background/50 backdrop-blur-sm border-t p-4">
        <Input placeholder="Type a message..." />
      </div>
    </div>
  );
}
