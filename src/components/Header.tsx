import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, User, Phone, Mail, X, ShieldCheck } from 'lucide-react';
import { TnuLogo } from './TnuLogo';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'TNU Recruitment',
  subtitle = 'Explore Schools',
  badge = 'HIRING 2026-27',
  onBack,
  showBack = false,
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#C9A96E]/25 shadow-[0_2px_12px_rgba(36,31,32,0.03)]">
        <div className="max-w-7xl mx-auto h-16 md:h-18 px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Left Zone: Back + Brand + Title */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[#625B58] hover:text-[#6B1F2A] hover:bg-white active:scale-95 transition-all shrink-0 cursor-pointer border border-transparent hover:border-[#C9A96E]/30"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-3 min-w-0">
              <TnuLogo className="h-8 sm:h-9 md:h-10" />
              <div className="hidden sm:block h-6 w-[1px] bg-[#C9A96E]/40 shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif-tnu font-normal text-[#241F20] text-sm sm:text-base tracking-tight truncate">
                    {title}
                  </span>
                  {badge && (
                    <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#6B1F2A]/10 text-[#6B1F2A] border border-[#6B1F2A]/20 text-[11px] leading-tight font-bold uppercase tracking-wider">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-[12px] sm:text-[13px] text-[#625B58] truncate font-medium">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Zone: Help & Profile */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              aria-label="Recruitment Help & Contact"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#625B58] hover:text-[#6B1F2A] hover:bg-white active:scale-95 transition-all text-[14px] font-semibold border border-transparent hover:border-[#C9A96E]/30 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#C9A96E]" />
              <span className="hidden md:inline">Helpline</span>
            </button>

            <div
              className="w-8 h-8 rounded-full bg-[#6B1F2A] text-white flex items-center justify-center shadow-xs cursor-default ring-2 ring-[#C9A96E]/20"
              title="Academic Applicant Portal"
            >
              <User className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </header>

      {/* Helpline / Contact Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-[#241F20]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#C9A96E]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-[#8A817C] hover:text-[#241F20] p-1.5 rounded-lg hover:bg-[#F8F5EF] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#6B1F2A]/10 text-[#6B1F2A] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-tnu font-normal text-lg sm:text-xl text-[#241F20]">
                  Academic Recruitment Secretariat
                </h3>
                <span className="text-[12px] text-[#625B58] font-medium">
                  The Neotia University • Faculty Affairs
                </span>
              </div>
            </div>

            <p className="text-[14px] sm:text-[15px] text-[#625B58] leading-[1.6] mb-4 font-normal">
              For queries concerning eligibility criteria, doctoral requirements, UGC/AICTE cadre compliance, or technical submission issues:
            </p>

            <div className="space-y-2.5 bg-[#F8F5EF] p-4 rounded-xl border border-[#EEE9DF] text-xs text-[#241F20]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#6B1F2A] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#8A817C] uppercase font-bold tracking-wider block">Email Desk</span>
                  <a href="mailto:recruitment@tnu.ac.in" className="font-medium text-[13px] text-[#6B1F2A] hover:underline">
                    recruitment@tnu.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#EEE9DF]">
                <Phone className="w-4 h-4 text-[#6B1F2A] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#8A817C] uppercase font-bold tracking-wider block">Registrar Helpline</span>
                  <span className="font-medium text-[13px]">+91 33 2456 7890 / Ext. 204</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#EEE9DF]">
                <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#8A817C] uppercase font-bold tracking-wider block">Hours of Operation</span>
                  <span className="font-medium text-[13px] text-[#625B58]">Mon–Fri: 9:30 AM – 5:30 PM IST</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="btn-primary-tnu px-4 py-2 text-[14px] cursor-pointer"
              >
                Close Assistance
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
