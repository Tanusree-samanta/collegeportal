import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { TnuLogo } from './TnuLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#D9E2EC] text-[#123B5D] py-10 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#D9E2EC]">
          {/* Col 1: University Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <TnuLogo className="h-9 sm:h-10" />
              <div className="h-6 w-[1px] bg-[#D9E2EC]" />
              <span className="font-bold text-sm sm:text-base text-[#003B68] tracking-tight">
                The Neotia University
              </span>
            </div>

            <p className="text-[14px] text-[#52708A] leading-relaxed max-w-sm font-normal">
              Office of Academic Appointments & Faculty Affairs. Committed to fostering academic excellence, high-impact research, and world-class pedagogic standards.
            </p>

            <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#52708A] bg-[#F7F9FC] px-3 py-1.5 rounded-lg border border-[#D9E2EC]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0057B8]" />
              <span>Accredited Academic Institution • Approved 7th CPC Scale</span>
            </div>
          </div>

          {/* Col 2: Campus Location */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#003B68]">
              Campus & Secretariat
            </h4>
            <div className="text-[13px] text-[#52708A] space-y-2 leading-relaxed font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0057B8] shrink-0 mt-0.5" />
                <span>Sarisha, Diamond Harbour Road, 24 Parganas (South), West Bengal – 743368, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0057B8] shrink-0" />
                <span>+91 33 2456 7890 / Ext. 204 (Registrar Office)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0057B8] shrink-0" />
                <span>recruitment@tnu.ac.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Notice */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#003B68]">
              Recruitment Notice
            </h4>
            <p className="text-[13px] text-[#52708A] leading-relaxed font-normal">
              Applications are reviewed by school-specific Academic Screening Committees. Only shortlisted candidates are contacted for personal interviews.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0057B8] bg-[#EAF4FF] border border-[#BFDDF5] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#19B87A] animate-pulse" />
                Cycle 2026–2027 Active
              </span>
            </div>
          </div>
        </div>

        {/* Lower Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-[#71869A] font-medium">
          <span>
            © {new Date().getFullYear()} The Neotia University (TNU). All Rights Reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#0057B8] transition-colors cursor-pointer">
              UGC / AICTE Norms
            </span>
            <span>•</span>
            <span className="hover:text-[#0057B8] transition-colors cursor-pointer">
              Faculty Regulations
            </span>
            <span>•</span>
            <span className="hover:text-[#0057B8] transition-colors cursor-pointer">
              Terms of Appointment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
