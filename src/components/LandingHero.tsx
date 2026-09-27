import React from 'react';
import { ArrowRight, MapPin, CheckCircle2, Mic } from 'lucide-react';
import { TnuLogo } from './TnuLogo';

interface LandingHeroProps {
  onNavigateToSchools: () => void;
  onOpenVoice?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigateToSchools, onOpenVoice }) => {
  return (
    <div className="h-screen w-full flex flex-col justify-between overflow-hidden select-none relative z-10">
      {/* Top University Brand Bar */}
      <header className="w-full shrink-0 border-b border-[#D9CC86]/45 bg-white/70 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between shadow-[0_4px_20px_rgba(41,39,39,0.03)]">
        <div className="flex items-center gap-3.5">
          <TnuLogo className="h-11 sm:h-13" />
          <div className="hidden sm:block h-8 w-[1px] bg-[#D9CC86]/60" />
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#765331] uppercase tracking-wider">
            Office of Academic Appointments & Faculty Affairs
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenVoice && (
            <button
              type="button"
              onClick={onOpenVoice}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#D83232] bg-white/75 hover:bg-[#D83232] hover:text-white border border-[#D83232]/30 px-3 py-1 rounded-full shadow-2xs transition-all duration-200 cursor-pointer group backdrop-blur-xs"
              title="Speak with Dr. Neotia AI via Gemini 3.8 Live"
            >
              <Mic className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Voice Advisor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}

          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#D83232] bg-[#D83232]/10 border border-[#D83232]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-status-dot" />
            2026–2027 Cycle
          </span>
        </div>
      </header>

      {/* Main Hero Container - Adaptive for Viewport Presence (No Scroll) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-2 md:py-4 flex flex-col justify-center min-h-0">
        {/* Split Grid for Desktop; Single Flow for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-center flex-1 min-h-0">
          {/* LEFT SIDE: Headings, Copy, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-2 sm:gap-3 text-center lg:text-left">
            {/* Announcement Badge (Subtle Glass) */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/65 backdrop-blur-md border border-[#D9CC86]/50 shadow-[0_4px_16px_rgba(41,39,39,0.03)] transition-all">
                <span className="w-2 h-2 rounded-full bg-[#D83232] animate-status-dot shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#765331] font-bold tracking-wider uppercase">
                  Inviting Applications for Faculty Positions 2026–2027
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#292727] leading-[1.12] tracking-tight">
              Build the Future of <br className="hidden sm:inline" />
              <span className="text-[#D83232] italic font-serif-tnu font-semibold">
                Higher Learning & Research
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed max-w-xl mx-auto lg:mx-0 line-clamp-3 md:line-clamp-4">
              The Neotia University invites applications from distinguished academicians, scholars, and industry specialists with high research credentials for Assistant Professor, Associate Professor, and Chair Professor positions across six specialized academic schools.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1.5 sm:pt-2">
              <button
                type="button"
                onClick={onNavigateToSchools}
                className="btn-primary-tnu inline-flex items-center justify-center gap-2 text-xs sm:text-sm py-2.5 sm:py-3 px-6 sm:px-7 cursor-pointer whitespace-nowrap group"
              >
                <span>Submit Faculty Candidature</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {onOpenVoice && (
                <button
                  type="button"
                  onClick={onOpenVoice}
                  className="btn-secondary-tnu inline-flex items-center justify-center gap-2 text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 cursor-pointer whitespace-nowrap group backdrop-blur-md"
                >
                  <Mic className="w-4 h-4 text-[#D83232] transition-transform duration-200 group-hover:scale-110" />
                  <span>Voice Inquiries</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Campus Visual Card & CPC Information */}
          <div className="lg:col-span-6 flex flex-col gap-2.5 max-w-lg mx-auto w-full min-h-0">
            {/* Campus Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(41,39,39,0.08)] bg-white/75 backdrop-blur-md border border-[#D9CC86]/50 group transition-all duration-300">
              <div className="relative h-32 sm:h-44 md:h-48 lg:h-52 w-full overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA543I-TbWvOLfGcyS3DF-V-N_TftUPDTka-ao-t3aldbbBXau60-Tfhtn4L1218qsolfywGJZ-XppjyxRUffJY3j4KLAt7vCfRaQPnEwuVCQJ2P8-zlgC2c7FOOjN6lo6Zz3ZcmW38E0GciFWLr4zGFIl-5cI_dbsxDP4yA41pfPUbPg2HykDl-K6cDjrPwpCBukwEg1f38XaoqrFPs184qWFHnEw5hUl_m_0M0qL-ynCk9aNUWKoW8Q"
                  alt="The Neotia University Campus"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Location Overlay Pill */}
                <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md shadow-xs border border-white/60">
                  <MapPin className="w-3 h-3 text-[#D83232]" />
                  <span className="text-[9px] sm:text-[10px] text-[#292727] font-bold tracking-wider uppercase">
                    SARISHA, DIAMOND HARBOUR ROAD
                  </span>
                </div>

                {/* Image Overlay Title & Supporting Text */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-3 right-3 text-white">
                  <h2 className="font-bold text-xs sm:text-sm md:text-base leading-tight tracking-tight drop-shadow-sm">
                    Main Academic Complex & Research Centers
                  </h2>
                  <p className="text-[10px] sm:text-xs text-white/90 line-clamp-1 mt-0.5 font-normal">
                    Equipped with high-performing teaching clusters, research labs, laboratories and modern academic facilities.
                  </p>
                </div>
              </div>
            </div>

            {/* 7th CPC Scale Card (Glass Panel) */}
            <div className="glass-panel p-3 sm:p-3.5 flex items-center gap-3.5 shadow-[0_8px_24px_rgba(41,39,39,0.04)]">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#D83232]/10 border border-[#D83232]/25 flex flex-col items-center justify-center shrink-0 text-[#D83232] shadow-2xs">
                <span className="font-serif-tnu text-lg sm:text-xl font-bold leading-none">
                  7<sup className="text-[10px] font-semibold">th</sup>
                </span>
                <span className="text-[8px] font-bold uppercase tracking-tight text-[#765331]">
                  CPC Scale
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[#292727] font-bold text-xs sm:text-sm">
                  <span>Ph.D. Central Pay Commission (CPC)</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B69A62] shrink-0 fill-[#B69A62]/20" />
                </div>
                <p className="text-[11px] sm:text-xs text-[#765331] truncate mt-0.5 font-medium">
                  Plus Research Seed Grants up to ₹10 Lakhs & Housing Allowance
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM OF THE HERO: 4 Small Statistic Cards with Subtle Glass & Hover */}
      <footer className="w-full shrink-0 border-t border-[#D9CC86]/40 bg-white/50 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { value: '06', label: 'Academic Schools', highlight: '06' },
            { value: '12+', label: 'Faculty Openings', highlight: '12+' },
            { value: '50+', label: 'Acres Green Campus', highlight: '50+' },
            { value: '14:1', label: 'Student-Faculty', highlight: '14:1' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-2 sm:p-2.5 text-center flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(41,39,39,0.07)] group cursor-default"
            >
              <span className="font-serif-tnu text-base sm:text-xl md:text-2xl text-[#D83232] font-bold leading-none transition-transform duration-200 group-hover:scale-105">
                {stat.value}
              </span>
              <span className="text-[8px] sm:text-[10px] text-[#765331] font-bold tracking-tight uppercase mt-1 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};
