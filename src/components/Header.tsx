import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, User, Phone, Mail, X } from 'lucide-react';
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
      <header className="sticky top-0 w-full z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#EBE6DF] shadow-[0_1px_8px_rgba(74,53,31,0.06)]">
        <div className="max-w-7xl mx-auto h-16 md:h-18 px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Left Zone: Back + Brand + Title */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#765331] hover:text-[#D83232] hover:bg-[#F2ECE4] active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-3 min-w-0">
              <TnuLogo className="h-8 sm:h-9 md:h-10" />
              <div className="hidden sm:block h-7 w-[1px] bg-[#D9CC86]/50 shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[#292727] text-xs sm:text-sm tracking-tight truncate">
                    {title}
                  </span>
                  {badge && (
                    <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20 text-[9px] sm:text-[10px] leading-tight font-bold uppercase tracking-wider">
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

          {/* Right Zone: Help & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              aria-label="Recruitment Help & Contact"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#765331] hover:text-[#D83232] hover:bg-[#F2ECE4] active:scale-95 transition-all text-xs font-semibold"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden md:inline">Helpline</span>
            </button>

            <div
              className="w-8 h-8 rounded-full bg-[#D83232] text-white flex items-center justify-center shadow-sm cursor-default"
              title="Academic Applicant Portal"
            >
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Helpline / Contact Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#D9CC86] rounded-xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-[#765331] hover:text-[#292727] p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D83232]/10 text-[#D83232] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tnu font-bold text-lg text-[#292727]">
                Office of Academic Recruitment
              </h3>
            </div>

            <p className="text-xs text-[#765331] mb-4 leading-relaxed">
              For queries regarding faculty candidatures, eligibility criteria, or technical issues with application dossier submissions, reach out to the Secretariat:
            </p>

            <div className="space-y-2.5 text-xs text-[#292727] bg-[#F8F6F0] p-3.5 rounded-lg border border-[#EBE6DF]">
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
              className="mt-4 w-full py-2 bg-[#4A351F] hover:bg-[#292727] text-white rounded-lg text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
