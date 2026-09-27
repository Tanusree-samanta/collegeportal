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
        aria-label="Start Voice Conversation with Dr. Neotia AI"
        className="group relative flex items-center gap-2.5 bg-[#D83232] hover:bg-[#C62828] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer border border-white/30"
      >
        {/* Pulsing Aura */}
        <span className="absolute inset-0 rounded-full bg-[#D83232] animate-ping opacity-25" />

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
          <Mic className="w-4 h-4 text-white" />
          <Sparkles className="w-2.5 h-2.5 text-[#D9CC86] absolute -top-0.5 -right-0.5 animate-pulse" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-tight leading-tight flex items-center gap-1.5">
            <span>Voice Advisor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="text-[10px] text-white/85 font-medium leading-none">
            Gemini 3.8 Live
          </span>
        </div>
      </button>
    </div>
  );
};
