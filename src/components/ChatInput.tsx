import { FC } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput: FC<ChatInputProps> = ({
  input,
  isLoading,
  onInputChange,
  onSend
}) => {
  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          className="border-gray-300"
        />
        <Button 
          onClick={onSend}
          disabled={isLoading || !input.trim()}
          className="bg-[#403E43] hover:bg-[#333333]"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};