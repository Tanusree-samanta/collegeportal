import React from 'react';
import { ArrowRight, MapPin, CheckCircle2, GraduationCap } from 'lucide-react';
import { TnuLogo } from './TnuLogo';
import { RecruitmentProcessSection } from './RecruitmentProcessSection';
import { Footer } from './Footer';
import campusPhoto from '../assets/images/campus.jpg';

interface LandingHeroProps {
  onNavigateToSchools: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigateToSchools }) => {
  return (
    <div className="min-h-screen w-full bg-[#F8F6F0] flex flex-col select-none">
      {/* 1. HEADER: Top University Brand Bar */}
      <header className="sticky top-0 z-40 w-full shrink-0 border-b border-[#EBE6DF]/70 bg-[#F8F6F0]/95 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TnuLogo className="h-8 sm:h-9 md:h-10" />
          <div className="hidden sm:block h-6 w-[1px] bg-[#D9CC86]/60" />
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#765331] uppercase tracking-wider">
            Office of Academic Appointments & Faculty Affairs
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#D83232] bg-[#D83232]/10 border border-[#D83232]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-pulse" />
            2026–2027 Cycle
          </span>
        </div>
      </header>

      {/* 2. HERO: Main Hero Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-10 flex flex-col justify-center">
        {/* Split Grid for Desktop; Single Flow for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT SIDE: Headings, Copy, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-3 sm:gap-4 text-center lg:text-left">
            {/* Announcement Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B69A62]/15 border border-[#D9CC86]/40 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#B4141D] font-bold tracking-wider uppercase">
                  Inviting Applications for Faculty Positions 2026–2027
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#292727] leading-[1.14] tracking-tight">
              Build the Future of <br className="hidden sm:inline" />
              <span className="text-[#D83232] italic font-serif-tnu font-semibold">
                Higher Learning & Research
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed max-w-xl mx-auto lg:mx-0">
              The Neotia University invites applications from distinguished academicians, scholars, and industry specialists with high research credentials for Assistant Professor, Associate Professor, and Chair Professor positions across six specialized academic schools.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-2">
              <button
                type="button"
                onClick={onNavigateToSchools}
                className="inline-flex items-center justify-center gap-2 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-7 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Submit Faculty Candidature</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Campus Visual Card & Lower Information Card */}
          <div className="lg:col-span-6 flex flex-col gap-3 max-w-lg mx-auto w-full">
            {/* Campus Image Card */}
            <div className="relative rounded-xl overflow-hidden shadow-md bg-white border border-[#D9CC86]/50 group">
              <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 w-full overflow-hidden">
                <img
                  src={campusPhoto}
                  alt="The Neotia University Campus"
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                {/* Location Overlay Pill */}
                <div className="absolute top-2.5 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-white/60">
                  <MapPin className="w-3 h-3 text-[#D83232] shrink-0" />
                  <span className="text-[9px] sm:text-[10px] text-[#292727] font-bold tracking-wider uppercase">
                    THE NEOTIA UNIVERSITY, SARISHA, WEST BENGAL
                  </span>
                </div>

                {/* Image Overlay Title & Supporting Text */}
                <div className="absolute bottom-2.5 sm:bottom-3.5 left-3.5 right-3.5 text-white">
                  <h2 className="font-bold text-sm sm:text-base md:text-lg leading-tight tracking-tight drop-shadow-sm font-serif-tnu">
                    The Neotia University
                  </h2>
                  <p className="text-[11px] sm:text-xs text-white/95 mt-1 font-normal leading-relaxed drop-shadow-xs">
                    Modern academic campus with advanced facilities, research centres, laboratories and student-focused learning spaces.
                  </p>
                </div>
              </div>
            </div>

            {/* Lower Information Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xs border border-[#D9CC86]/40 flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#D83232]/10 border border-[#D83232]/20 flex items-center justify-center shrink-0 text-[#D83232]">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#D83232]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[#292727] font-bold text-xs sm:text-sm">
                  <span>Industry-Integrated Education</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B69A62] shrink-0 fill-[#B69A62]/20" />
                </div>
                <p className="text-[11px] sm:text-xs text-[#765331] mt-0.5 font-medium leading-snug">
                  Industry-focused academic programmes, modern infrastructure and experiential learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. STATISTICS: 4 Small Statistic Cards */}
      <section className="w-full shrink-0 border-y border-[#EBE6DF]/80 bg-[#F8F6F0] px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-xs border border-[#D9CC86]/35 flex flex-col justify-center items-center">
            <span className="font-serif-tnu text-base sm:text-xl md:text-2xl text-[#D83232] font-bold leading-none">
              06
            </span>
            <span className="text-[8px] sm:text-[10px] text-[#765331] font-bold tracking-tight uppercase mt-1 leading-tight">
              Academic<br className="sm:hidden" /> Schools
            </span>
          </div>

          <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-xs border border-[#D9CC86]/35 flex flex-col justify-center items-center">
            <span className="font-serif-tnu text-base sm:text-xl md:text-2xl text-[#D83232] font-bold leading-none">
              12+
            </span>
            <span className="text-[8px] sm:text-[10px] text-[#765331] font-bold tracking-tight uppercase mt-1 leading-tight">
              Faculty<br className="sm:hidden" /> Openings
            </span>
          </div>

          <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-xs border border-[#D9CC86]/35 flex flex-col justify-center items-center">
            <span className="font-serif-tnu text-base sm:text-xl md:text-2xl text-[#D83232] font-bold leading-none">
              50+
            </span>
            <span className="text-[8px] sm:text-[10px] text-[#765331] font-bold tracking-tight uppercase mt-1 leading-tight">
              Acres Green<br className="sm:hidden" /> Campus
            </span>
          </div>

          <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-xs border border-[#D9CC86]/35 flex flex-col justify-center items-center">
            <span className="font-serif-tnu text-base sm:text-xl md:text-2xl text-[#D83232] font-bold leading-none">
              14:1
            </span>
            <span className="text-[8px] sm:text-[10px] text-[#765331] font-bold tracking-tight uppercase mt-1 leading-tight">
              Student-<br className="sm:hidden" />Faculty
            </span>
          </div>
        </div>
      </section>

      {/* 4. HOW THE RECRUITMENT PROCESS WORKS + 8-STAGE TIMELINE + APPLICATION STATUS */}
      <RecruitmentProcessSection />

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
};
