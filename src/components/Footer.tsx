import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { TnuLogo } from './TnuLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8F6F0] border-t border-[#D9CC86]/60 text-[#292727] py-10 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#EBE6DF]">
          {/* Col 1: University Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <TnuLogo className="h-9 sm:h-10" />
              <div className="h-6 w-[1px] bg-[#D9CC86]/60" />
              <span className="text-xs font-bold text-[#765331] uppercase tracking-wider">
                The Neotia University
              </span>
            </div>

            <p className="text-xs text-[#5B403D] leading-relaxed max-w-sm">
              Office of Academic Appointments & Faculty Affairs. Committed to fostering academic excellence, high-impact research, and world-class pedagogic standards.
            </p>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#765331] bg-[#F2ECE4] px-2.5 py-1 rounded-md border border-[#D9CC86]/40">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B69A62]" />
              <span>Accredited Academic Institution • Approved 7th CPC Scale</span>
            </div>
          </div>

          {/* Col 2: Campus Location */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-serif-tnu font-bold text-xs uppercase tracking-wider text-[#4A351F]">
              Campus & Secretariat
            </h4>
            <div className="text-xs text-[#5B403D] space-y-1.5 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D83232] shrink-0 mt-0.5" />
                <span>Sarisha, Diamond Harbour Road, 24 Parganas (South), West Bengal – 743368, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D83232] shrink-0" />
                <span>+91 33 2456 7890 / Ext. 204 (Registrar Office)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D83232] shrink-0" />
                <span>recruitment@tnu.ac.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Notice */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-serif-tnu font-bold text-xs uppercase tracking-wider text-[#4A351F]">
              Recruitment Notice
            </h4>
            <p className="text-[11px] text-[#765331] leading-relaxed">
              Applications are reviewed by school-specific Academic Screening Committees. Only shortlisted candidates are contacted for personal interviews.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[10px] font-bold text-[#D83232] bg-[#D83232]/10 border border-[#D83232]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Cycle 2026–2027 Open
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#765331]">
          <div>
            © 2026 The Neotia University. All rights reserved.
          </div>
          <div className="text-center sm:text-right">
            Official Academic Recruitment Portal • Confidential Dossier System
          </div>
        </div>
      </div>
    </footer>
  );
};
