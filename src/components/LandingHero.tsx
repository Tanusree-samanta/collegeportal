import React from 'react';
import { ArrowRight, MapPin, CheckCircle2, GraduationCap } from 'lucide-react';
import { TnuLogo } from './TnuLogo';
import { Footer } from './Footer';
import campusPhoto from '../assets/images/campus.jpg';

interface LandingHeroProps {
  onNavigateToSchools: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigateToSchools }) => {
  return (
    <div className="min-h-screen w-full bg-[#F8F5EF] flex flex-col select-none">
      {/* 1. HEADER: Top University Brand Bar */}
      <header className="sticky top-0 z-40 w-full shrink-0 border-b border-[#C9A96E]/25 bg-[#F8F5EF]/95 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_2px_10px_rgba(36,31,32,0.02)]">
        <div className="flex items-center gap-3">
          <TnuLogo className="h-8 sm:h-9 md:h-10" />
          <div className="hidden sm:block h-6 w-[1px] bg-[#C9A96E]/40" />
          <span className="hidden sm:inline-block text-[14px] font-semibold text-[#625B58] tracking-tight">
            Office of Academic Appointments & Faculty Affairs
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold text-[#6B1F2A] bg-white border border-[#C9A96E]/40 px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B7340] animate-status-dot" />
            2026–2027 Cycle • Active
          </span>
        </div>
      </header>

      {/* 2. HERO: Main Hero Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-14 flex-1 flex flex-col justify-center">
        {/* Split Grid for Desktop; Single Flow for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE: Headings, Copy, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-4 sm:gap-5 text-center lg:text-left">
            {/* Announcement Badge (Manrope 700 11-12px slightly increased letter spacing) */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#C9A96E]/40 shadow-xs backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B1F2A]" />
                <span className="text-[11px] sm:text-[12px] text-[#6B1F2A] font-bold tracking-wider uppercase">
                  Inviting Applications for Faculty Positions 2026–2027
                </span>
              </div>
            </div>

            {/* Main Editorial Heading: DM Serif Display, Weight 400, Letter spacing: -0.02em */}
            <h1 className="font-serif-tnu font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] text-[#241F20] leading-[1.12] tracking-[-0.02em]">
              Build the Future of <br className="hidden sm:inline" />
              <span className="text-[#6B1F2A] not-italic font-serif-tnu font-normal">
                Higher Learning & Research
              </span>
            </h1>

            {/* Description: Manrope, 400, 15-17px, line height 1.6 */}
            <p className="text-[15px] sm:text-[16px] text-[#625B58] leading-[1.6] max-w-xl mx-auto lg:mx-0 font-normal">
              The Neotia University invites applications from distinguished academicians, scholars, and industry specialists with high research credentials for Assistant Professor, Associate Professor, and Chair Professor positions across six specialized academic schools.
            </p>

            {/* CTA Buttons: Manrope 700, 14-15px */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToSchools}
                className="btn-primary-tnu inline-flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-6 sm:px-8 text-[14px] sm:text-[15px] font-bold tracking-wide cursor-pointer whitespace-nowrap group"
              >
                <span>Submit Faculty Candidature</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Campus Visual Card & Lower Information Card */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 max-w-lg mx-auto w-full">
            {/* Campus Image Card with 20px radius & champagne border */}
            <div className="relative rounded-[20px] overflow-hidden shadow-md bg-white border border-[#C9A96E]/40 group transition-all duration-300">
              <div className="relative h-52 sm:h-60 md:h-64 lg:h-72 w-full overflow-hidden">
                <img
                  src={campusPhoto}
                  alt="The Neotia University Campus"
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-[1.02] transition-transform duration-600 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241F20]/85 via-[#241F20]/35 to-transparent pointer-events-none" />

                {/* Location Overlay Pill (Glassmorphic) */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-white/70">
                  <MapPin className="w-3 h-3 text-[#6B1F2A] shrink-0" />
                  <span className="text-[11px] text-[#241F20] font-bold tracking-wider uppercase">
                    The Neotia University, Sarisha, West Bengal
                  </span>
                </div>

                {/* Image Overlay Title & Supporting Text */}
                <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 text-white">
                  <h2 className="text-base sm:text-lg md:text-xl leading-tight tracking-tight drop-shadow-xs font-serif-tnu font-normal">
                    The Neotia University
                  </h2>
                  <p className="text-[12px] sm:text-[13px] text-white/90 mt-1 font-medium leading-relaxed drop-shadow-2xs">
                    Modern academic campus with advanced facilities, research centres, laboratories and student-focused learning spaces.
                  </p>
                </div>
              </div>
            </div>

            {/* Lower Information Card */}
            <div className="glass-panel p-3.5 sm:p-4 rounded-[18px] flex items-center gap-3.5 bg-white/85">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#6B1F2A]/10 border border-[#6B1F2A]/20 flex items-center justify-center shrink-0 text-[#6B1F2A]">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[#241F20] font-semibold text-[14px]">
                  <span>Industry-Integrated Education</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                </div>
                <p className="text-[12px] sm:text-[13px] text-[#625B58] mt-0.5 leading-snug font-normal">
                  Industry-focused academic programmes, modern infrastructure and experiential learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. STATISTICS: 4 Academic Metric Cards */}
      <section className="w-full shrink-0 border-y border-[#C9A96E]/25 bg-white/60 backdrop-blur-xs px-4 sm:px-6 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white/80 rounded-[16px] p-3 sm:p-4 text-center shadow-xs border border-[#C9A96E]/30 flex flex-col justify-center items-center glass-card-hover">
            <span className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#6B1F2A] leading-none">
              06
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#625B58] font-bold tracking-wider uppercase mt-1.5">
              Academic Schools
            </span>
          </div>

          <div className="bg-white/80 rounded-[16px] p-3 sm:p-4 text-center shadow-xs border border-[#C9A96E]/30 flex flex-col justify-center items-center glass-card-hover">
            <span className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#6B1F2A] leading-none">
              12+
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#625B58] font-bold tracking-wider uppercase mt-1.5">
              Faculty Openings
            </span>
          </div>

          <div className="bg-white/80 rounded-[16px] p-3 sm:p-4 text-center shadow-xs border border-[#C9A96E]/30 flex flex-col justify-center items-center glass-card-hover">
            <span className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#6B1F2A] leading-none">
              50+
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#625B58] font-bold tracking-wider uppercase mt-1.5">
              Acres Green Campus
            </span>
          </div>

          <div className="bg-white/80 rounded-[16px] p-3 sm:p-4 text-center shadow-xs border border-[#C9A96E]/30 flex flex-col justify-center items-center glass-card-hover">
            <span className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#6B1F2A] leading-none">
              14:1
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#625B58] font-bold tracking-wider uppercase mt-1.5">
              Student-Faculty Ratio
            </span>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
};
