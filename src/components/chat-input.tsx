import { Input } from "./ui/input";

export default function ChatInput() {
  return (
    <div className="sticky bottom-0">
      <div className="max-w-3xl mx-auto mb-2">
        <div className="bg-black/5 backdrop-blur-md p-1 rounded-md">
          <div className="bg-background/75 backdrop-blur-lg p-2 rounded-sm">
            <Input
              placeholder="Type a message..."
              className="bg-transparent border-none outline-none focus-visible:border-none focus-visible:ring-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
