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
      <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-[#D9E2EC] shadow-[0_1px_3px_rgba(0,59,104,0.04)]">
        <div className="max-w-7xl mx-auto h-16 md:h-18 px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Left Zone: Back + Brand + Title */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] active:scale-95 transition-all shrink-0 cursor-pointer border border-[#D9E2EC] hover:border-[#BFDDF5]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-3 min-w-0">
              <TnuLogo className="h-8 sm:h-9 md:h-10" />
              <div className="hidden sm:block h-6 w-[1px] bg-[#D9E2EC] shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#003B68] text-sm sm:text-base tracking-tight truncate">
                    {title}
                  </span>
                  {badge && (
                    <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] text-[11px] leading-tight font-semibold uppercase tracking-wider">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-[12px] sm:text-[13px] text-[#52708A] truncate font-normal">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] active:scale-95 transition-all text-[14px] font-medium border border-transparent hover:border-[#BFDDF5] cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#0057B8]" />
              <span className="hidden md:inline">Helpline</span>
            </button>

            <div
              className="w-8 h-8 rounded-full bg-[#0057B8] text-white flex items-center justify-center shadow-xs cursor-default ring-2 ring-[#EAF4FF]"
              title="Academic Applicant Portal"
            >
              <User className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </header>

      {/* Helpline / Contact Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D9E2EC] rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-[#71869A] hover:text-[#123B5D] p-1.5 rounded-lg hover:bg-[#F5F9FD] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#0057B8] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-[#003B68]">
                  Academic Recruitment Secretariat
                </h3>
                <span className="text-[12px] text-[#52708A] font-medium">
                  The Neotia University • Faculty Affairs
                </span>
              </div>
            </div>

            <p className="text-[14px] text-[#52708A] leading-relaxed mb-4 font-normal">
              For queries concerning eligibility criteria, doctoral requirements, UGC/AICTE cadre compliance, or technical submission issues:
            </p>

            <div className="space-y-2.5 bg-[#F7F9FC] p-4 rounded-xl border border-[#D9E2EC] text-xs text-[#123B5D]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0057B8] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#71869A] uppercase font-semibold tracking-wider block">Email Desk</span>
                  <a href="mailto:recruitment@tnu.ac.in" className="font-medium text-[13px] text-[#0057B8] hover:underline">
                    recruitment@tnu.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#D9E2EC]">
                <Phone className="w-4 h-4 text-[#0057B8] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#71869A] uppercase font-semibold tracking-wider block">Registrar Helpline</span>
                  <span className="font-medium text-[13px] text-[#123B5D]">+91 33 2456 7890 / Ext. 204</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#D9E2EC]">
                <ShieldCheck className="w-4 h-4 text-[#0066CC] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#71869A] uppercase font-semibold tracking-wider block">Hours of Operation</span>
                  <span className="font-medium text-[13px] text-[#52708A]">Mon–Fri: 9:30 AM – 5:30 PM IST</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="btn-primary-portal px-4 py-2 cursor-pointer"
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
