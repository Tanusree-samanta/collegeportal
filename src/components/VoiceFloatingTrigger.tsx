import React from 'react';
import { Mic, Sparkles } from 'lucide-react';

interface VoiceFloatingTriggerProps {
  onOpen: () => void;
}

export const VoiceFloatingTrigger: React.FC<VoiceFloatingTriggerProps> = ({ onOpen }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Start Voice Conversation with Bass AI"
        className="group relative flex items-center gap-2.5 bg-[#0057B8] hover:bg-[#003B68] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer border border-white/30"
      >
        {/* Pulsing Aura */}
        <span className="absolute inset-0 rounded-full bg-[#0066CC] animate-ping opacity-25" />

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
          <Mic className="w-4 h-4 text-white" />
          <Sparkles className="w-2.5 h-2.5 text-white/90 absolute -top-0.5 -right-0.5 animate-pulse" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-tight leading-tight flex items-center gap-1.5">
            <span>Bass Voice AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#19B87A] animate-pulse" />
          </span>
          <span className="text-[10px] text-white/85 font-medium leading-none">
            Live AI Assistant
          </span>
        </div>
      </button>
    </div>
  );
};
