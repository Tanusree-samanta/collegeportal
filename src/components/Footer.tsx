import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { TnuLogo } from './TnuLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8F5EF] border-t border-[#C9A96E]/30 text-[#241F20] py-10 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#EEE9DF]">
          {/* Col 1: University Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <TnuLogo className="h-9 sm:h-10" />
              <div className="h-6 w-[1px] bg-[#C9A96E]/50" />
              {/* Brand: DM Serif Display, Font weight 400 */}
              <span className="font-serif-tnu font-normal text-sm sm:text-base text-[#6B1F2A] tracking-tight">
                The Neotia University
              </span>
            </div>

            <p className="text-[14px] text-[#625B58] leading-[1.6] max-w-sm font-normal">
              Office of Academic Appointments & Faculty Affairs. Committed to fostering academic excellence, high-impact research, and world-class pedagogic standards.
            </p>

            <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#625B58] bg-white px-3 py-1.5 rounded-lg border border-[#C9A96E]/35 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Accredited Academic Institution • Approved 7th CPC Scale</span>
            </div>
          </div>

          {/* Col 2: Campus Location */}
          <div className="md:col-span-4 space-y-2.5">
            {/* Section Heading: DM Serif Display, Font weight 400 */}
            <h4 className="font-serif-tnu font-normal text-sm uppercase tracking-wider text-[#6B1F2A]">
              Campus & Secretariat
            </h4>
            <div className="text-[13px] text-[#625B58] space-y-2 leading-[1.6] font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6B1F2A] shrink-0 mt-0.5" />
                <span>Sarisha, Diamond Harbour Road, 24 Parganas (South), West Bengal – 743368, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#6B1F2A] shrink-0" />
                <span>+91 33 2456 7890 / Ext. 204 (Registrar Office)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#6B1F2A] shrink-0" />
                <span>recruitment@tnu.ac.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Notice */}
          <div className="md:col-span-3 space-y-2.5">
            {/* Section Heading: DM Serif Display, Font weight 400 */}
            <h4 className="font-serif-tnu font-normal text-sm uppercase tracking-wider text-[#6B1F2A]">
              Recruitment Notice
            </h4>
            <p className="text-[13px] text-[#625B58] leading-[1.6] font-normal">
              Applications are reviewed by school-specific Academic Screening Committees. Only shortlisted candidates are contacted for personal interviews.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#6B1F2A] bg-white border border-[#C9A96E]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B7340] animate-status-dot" />
                Cycle 2026–2027 Active
              </span>
            </div>
          </div>
        </div>

        {/* Lower Copyright Row: Manrope 500 12-13px */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-[#8A817C] font-medium">
          <span>
            © {new Date().getFullYear()} The Neotia University (TNU). All Rights Reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#6B1F2A] transition-colors cursor-pointer">
              UGC / AICTE Norms
            </span>
            <span>•</span>
            <span className="hover:text-[#6B1F2A] transition-colors cursor-pointer">
              Faculty Regulations
            </span>
            <span>•</span>
            <span className="hover:text-[#6B1F2A] transition-colors cursor-pointer">
              Terms of Appointment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
