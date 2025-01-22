import { MessageSquare } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-primary rounded-lg animate-logo-spin">
          <MessageSquare className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <span className="text-xl font-semibold text-foreground">VoiceAI</span>
    </div>
  );
};