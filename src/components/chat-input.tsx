import { Input } from "./ui/input";

export default function ChatInput( {
  handleSubmit,
  handleInputChange,
  input,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
}) {
  return (
    <div className="sticky bottom-0">
      <div className="max-w-3xl mx-auto mb-2">
        <div className="bg-black/5 backdrop-blur-md p-1 rounded-md">
          <div className="bg-background/75 backdrop-blur-lg p-2 rounded-sm">
          <form onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="bg-transparent border-none outline-none focus-visible:border-none focus-visible:ring-0 shadow-none"
            />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
