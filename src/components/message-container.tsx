import { cn } from "@/lib/utils"

export type Message = {
    id: string;
    llm_role: string;
    body: string;
    created_at: string;
    chatId: string;
    evicted?: boolean;
    thinking?: string;
}

export function MessageContainer({ message }: { message: Message }) {
    return (
        <div key={message.id} className={cn("flex flex-col w-full")}>
            <div
                className={cn(
                    "rounded-lg p-4 w-fit max-w-[80%]",
                    message.llm_role === "user"
                        ? "bg-primary text-primary-foreground self-end"
                        : "bg-secondary text-secondary-foreground self-start",
                )}
            >
                <p>{message.body}</p>
            </div>
        </div>
    );
}