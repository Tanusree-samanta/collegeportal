import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, User, Phone, Mail, X, Mic } from 'lucide-react';
import { TnuLogo } from './TnuLogo';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  onBack?: () => void;
  showBack?: boolean;
  onOpenVoice?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'TNU Recruitment',
  subtitle = 'Explore Schools',
  badge = 'HIRING 2026-27',
  onBack,
  showBack = false,
  onOpenVoice,
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 shadow-[0_8px_30px_rgba(41,39,39,0.08)] border-b border-[#D9CC86]/70'
            : 'bg-white/70 shadow-[0_4px_20px_rgba(41,39,39,0.04)] border-b border-[#D9CC86]/45'
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto h-16 md:h-18 px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Left Zone: Back + Brand + Title */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[#765331] hover:text-[#D83232] hover:bg-[#F2ECE4]/70 active:scale-95 transition-all shrink-0 cursor-pointer border border-transparent hover:border-[#D9CC86]/50"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
            )}

            <div className="flex items-center gap-3 min-w-0">
              <TnuLogo className="h-9 sm:h-11 md:h-12" />
              <div className="hidden sm:block h-8 w-[1px] bg-[#D9CC86]/50 shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[#292727] text-xs sm:text-sm tracking-tight truncate">
                    {title}
                  </span>
                  {badge && (
                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25 text-[9px] sm:text-[10px] leading-tight font-bold uppercase tracking-wider">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs text-[#765331] truncate font-medium">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Zone: Voice Advisor + Help + Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenVoice && (
              <button
                type="button"
                onClick={onOpenVoice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-[#D83232] text-[#D83232] hover:text-white border border-[#D83232]/30 text-xs font-bold transition-all cursor-pointer shadow-2xs group backdrop-blur-sm"
                title="Start real-time voice conversation with Gemini 3.8 Live"
              >
                <Mic className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Voice Advisor</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] group-hover:bg-white animate-pulse" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              aria-label="Recruitment Help & Contact"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#765331] hover:text-[#D83232] bg-white/60 hover:bg-white border border-[#D9CC86]/45 active:scale-95 transition-all text-xs font-semibold cursor-pointer shadow-2xs"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden md:inline">Helpline</span>
            </button>

            <div
              className="w-8 h-8 rounded-xl bg-[#D83232] text-white flex items-center justify-center shadow-xs cursor-default"
              title="Academic Applicant Portal"
            >
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Helpline / Contact Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-[#765331] hover:text-[#292727] p-1.5 rounded-lg hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tnu font-bold text-lg text-[#292727]">
                Office of Academic Recruitment
              </h3>
            </div>

            <p className="text-xs text-[#765331] mb-4 leading-relaxed">
              For queries regarding faculty candidatures, eligibility criteria, or technical issues with application dossier submissions, reach out to the Secretariat:
            </p>

            <div className="space-y-2.5 text-xs text-[#292727] bg-white/80 p-3.5 rounded-xl border border-[#D9CC86]/60 shadow-2xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D83232] shrink-0" />
                <span className="font-medium">recruitment@tnu.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D83232] shrink-0" />
                <span className="font-medium">+91 33 2456 7890 / Ext. 204 (Registrar Office)</span>
              </div>
              <div className="text-[11px] text-[#765331] pt-1 border-t border-[#EBE6DF]">
                Working hours: Monday to Saturday, 9:30 AM – 5:30 PM IST
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="mt-4 w-full py-2.5 bg-[#4A351F] hover:bg-[#292727] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
