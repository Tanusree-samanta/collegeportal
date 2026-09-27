import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Brain,
  Clock,
  MapPin,
  CheckCircle,
  GraduationCap,
  Calendar,
  ArrowRight,
  ExternalLink,
  Layers,
  Terminal,
  Activity,
  Bot,
  Database,
  FileCode,
  Microscope,
  Users2,
  Check,
} from 'lucide-react';

import { VacantPosition } from '../types';

interface RequirementPageProps {
  position?: VacantPosition | null;
  onApplyNow: () => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  onNavigateVacancies: () => void;
}

export const RequirementPage: React.FC<RequirementPageProps> = ({
  position,
  onApplyNow,
  onNavigateHome,
  onNavigateSchools,
  onNavigateVacancies,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor / Tutor Professor';
  const currentArea = position?.area || 'Artificial Intelligence & Machine Learning';
  const currentDeadline = position?.deadline || 'March 31, 2026';

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-36 relative z-10">
      {/* Toast Alert for Bookmarking */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 glass-panel text-[#292727] px-4 py-2.5 shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <BookmarkCheck className="w-4 h-4 text-[#D83232]" />
          <span className="text-xs font-bold">
            {isBookmarked
              ? 'Position saved to your academic dossier'
              : 'Position removed from saved list'}
          </span>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-4 sm:gap-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Academic Path Breadcrumb" className="overflow-x-auto whitespace-nowrap">
          <ol className="flex items-center gap-1.5 text-xs text-[#765331]">
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="breadcrumb-item gap-1 font-medium cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateSchools}
                className="breadcrumb-item font-medium cursor-pointer"
              >
                Career
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateSchools}
                className="breadcrumb-item font-medium cursor-pointer"
              >
                Schools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <span className="font-semibold text-[#292727]">School of Technology</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateVacancies}
                className="breadcrumb-item font-medium cursor-pointer"
              >
                Vacancies
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="inline-flex items-center text-[#D83232] font-bold">
              <span>Post Requirements</span>
            </li>
          </ol>
        </nav>

        {/* Editorial Masthead Section */}
        <header className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#D83232] inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#765331]">
              Faculty Recruitment — 2026–2027
            </span>
          </div>
          <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl font-bold text-[#292727]">
            School of Technology
          </h1>
          <p className="text-xs sm:text-sm text-[#5B403D]">
            Academic appointment across Professorial cadre in frontier computing domains.
          </p>
        </header>

        {/* Post Meta Summary Box (Larger Main Header Glass Card) */}
        <section className="glass-panel p-5 sm:p-6 shadow-[0_10px_35px_rgba(41,39,39,0.06)] flex flex-col gap-4">
          {/* Title & Live Status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Academic Post Cadre
              </span>
              <h2 className="font-serif-tnu text-xl sm:text-2xl text-[#D83232] font-bold leading-tight">
                {currentCadre}
              </h2>
            </div>
            <button
              type="button"
              onClick={toggleBookmark}
              aria-label="Bookmark position"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-2xs border ${
                isBookmarked
                  ? 'bg-[#D83232]/10 text-[#D83232] border-[#D83232]/30'
                  : 'bg-white/80 text-[#765331] hover:text-[#D83232] border-[#D9CC86]/50'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 fill-[#D83232]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Department Highlight */}
          <div className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-3.5 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#D83232]/10 border border-[#D83232]/20 flex items-center justify-center shrink-0 text-[#765331]">
              <Brain className="w-5 h-5 text-[#D83232]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Academic Focus & Area
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#292727] truncate">
                {currentArea}
              </span>
            </div>
          </div>

          {/* Quick Metadata Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Status Pill with 2-second Subtle Infinite Status Indicator */}
            <div className="flex flex-col gap-1.5 bg-white/75 border border-[#D9CC86]/35 rounded-xl p-3 shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Status
              </span>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 w-fit shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-status-dot" />
                <span className="text-[11px] font-bold text-emerald-800 tracking-wide uppercase">
                  Applications Open
                </span>
              </div>
            </div>

            {/* Job Type */}
            <div className="flex flex-col gap-1.5 bg-white/75 border border-[#D9CC86]/35 rounded-xl p-3 shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Engagement
              </span>
              <div className="inline-flex items-center gap-1.5 text-[#292727] font-semibold text-xs sm:text-sm pt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#B69A62]" />
                <span>Full Time Academic</span>
              </div>
            </div>
          </div>

          {/* Location Pin */}
          <div className="flex items-center gap-2 pt-1 text-[#5B403D] text-xs">
            <MapPin className="w-4 h-4 text-[#D83232] shrink-0" />
            <span>The Neotia University, Sarisha Campus, Diamond Harbour Rd, West Bengal</span>
          </div>
        </section>

        {/* Institutional Metrics Strip (Glass Panels) */}
        <section className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {[
            { value: '1:12', label: 'Faculty Ratio' },
            { value: '50+', label: 'AI Lab Nodes' },
            { value: 'UGC', label: 'Norm Cadre' },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-2.5 sm:p-3 text-center shadow-[0_4px_16px_rgba(41,39,39,0.03)] flex flex-col justify-center"
            >
              <span className="font-serif-tnu text-lg sm:text-2xl text-[#D83232] font-bold">
                {metric.value}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#765331] font-bold uppercase tracking-wider mt-0.5">
                {metric.label}
              </span>
            </div>
          ))}
        </section>

        {/* Secondary Detailed Job Requirement Sections (Smaller Glass Cards) */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {/* 1. Position Overview */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Position Overview
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed">
              Applications are invited from distinguished academicians, scholars, and industry specialists for faculty positions in <strong className="text-[#292727] font-semibold">Artificial Intelligence & Machine Learning</strong> and related frontier computer science areas. Candidates should possess a passion for pedagogical excellence, interdisciplinary curriculum delivery, and high-impact scholarship.
            </p>

            {/* Lab Image Visual */}
            <div className="overflow-hidden rounded-xl relative mt-1 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1fw2UY18dM3s3V5KdyySfZNcNvUIl4s9TYO5ZF-6LZAz1ZEswrfdd8DlW6HJhFPZo8UVwuoxz8WD-SoSWPDZSlOLyqv5nHr5t9yAVYqTo7XYaHgbG7ctZdUPa35AXZ4IbLU0U71XCSPs0SmNsQpcT06I18dN-i0NARwShPoqO1YSK3zFN3Vexj6jLiEFMsZ5raL7Ht-kv2Qv3KUMOslf__Lh29MbpQ36gOLOBBrJV5LCFS3NRF34vJg"
                alt="High-Performance Computing Research Labs"
                className="w-full h-36 sm:h-44 object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-[11px] sm:text-xs font-semibold">
                  High-Performance Computing Research Labs • Sarisha
                </span>
              </div>
            </div>
          </article>

          {/* 2. Educational Qualification */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#B69A62]/20 text-[#765331] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Educational Qualification
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#5B403D]">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#D83232] shrink-0 mt-0.5" />
                <span>Bachelor's / Master's / Ph.D. in Computer Science & Engineering, Artificial Intelligence, or related field.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#D83232] shrink-0 mt-0.5" />
                <span>Consistently strong academic record with First Class or equivalent grade point average throughout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#D83232] shrink-0 mt-0.5" />
                <span>Mandatory degree from a UGC / AICTE recognized institution or premier accredited overseas university.</span>
              </li>
            </ul>
          </article>

          {/* 3. Preferred Specialization */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Preferred Specialization
              </h3>
            </div>
            <p className="text-xs text-[#765331]">
              Candidates with primary domain expertise or verified doctoral research in:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Artificial Intelligence', highlight: false },
                { name: 'Machine Learning', highlight: true },
                { name: 'Deep Learning', highlight: false },
                { name: 'Data Science', highlight: false },
                { name: 'Computer Science', highlight: false },
                { name: 'Natural Language Processing', highlight: false },
                { name: 'Generative AI', highlight: true },
                { name: 'Related Frontier Areas', highlight: false },
              ].map((item, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-2xs ${
                    item.highlight
                      ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25'
                      : 'bg-white/80 text-[#292727] border border-[#D9CC86]/50'
                  }`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </article>

          {/* 4. Required Skills */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#B69A62]/20 text-[#765331] flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Required Skills
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'Python', icon: Terminal },
                { name: 'Machine Learning', icon: Activity },
                { name: 'Deep Learning', icon: Layers },
                { name: 'Data Science', icon: Database },
                { name: 'Artificial Intelligence', icon: Bot },
                { name: 'Programming', icon: FileCode },
                { name: 'Research & Grants', icon: Microscope },
                { name: 'Teaching & Mentoring', icon: Users2 },
              ].map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-white/75 rounded-xl border border-[#D9CC86]/45 text-xs font-semibold text-[#292727] shadow-2xs"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#D83232] shrink-0" />
                    <span className="truncate">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </article>

          {/* 5. Experience */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Experience
              </h3>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#5B403D]">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] mt-2 shrink-0" />
                <span>
                  <strong className="text-[#292727] font-semibold">2–8 Years Minimum:</strong> Demonstrable record of collegiate-level teaching, peer-reviewed research, or relevant industry R&D experience conforming strictly to UGC/AICTE norms.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] mt-2 shrink-0" />
                <span>
                  <strong className="text-[#292727] font-semibold">Scholarly Impact:</strong> Significant track record of peer-reviewed publications indexed in <strong className="text-[#D83232] font-semibold">SCI / Scopus</strong> databases.
                </span>
              </div>
            </div>
          </article>

          {/* 6. Key Responsibilities */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#B69A62]/20 text-[#765331] flex items-center justify-center font-bold text-xs">
                6
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Key Responsibilities
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-[#5B403D]">
              {[
                'Teaching undergraduate and postgraduate courses in Computer Science & AI',
                'Preparing lectures, curricula, and hands-on laboratory modules',
                'Conducting practical sessions in high-performance computing labs',
                'Mentoring capstone research projects and student theses',
                'Publishing high-impact research in Scopus/SCI journals and securing grants',
                'Academic administration, accreditation compliance (NBA/NAAC), and examinations',
                'Active participation in departmental colloquiums and industry outreach activities',
              ].map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 bg-white/75 rounded-xl border border-[#D9CC86]/40 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-[#D83232] shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </article>

          {/* 7. Job Location & Map View */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center font-bold text-xs">
                7
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Job Location
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5B403D]">
              The Neotia University, Sarisha, Diamond Harbour Road, 24 Parganas (S), West Bengal — 743368
            </p>

            {/* Campus Map Graphic */}
            <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden relative shadow-inner border border-[#D9CC86]/45">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI2efDljh2qN3UdN45mQ-xLjD-uP9uyZ1ehQMKclks2OVx9IzH3gq4LtEJZnxyIMgXLWqefH5ee--Nas5W5EDqWPOlQLTPzSw-4wEiRlF3NNcrAH-OLDUmvWcmpdg2Xt6uUB0ucNnomL8Xbun1eI7w_yWjn_ew26plsMGArQYkpgsuPNhbHKC4U8hz5-9ldx2BdUNyVfaeNsue0OHGkUjiOiFf18h_2YVjTQQqkSwUmZWz1da7wF4z6A"
                alt="TNU Sarisha Campus Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-2 bottom-2 bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-sm border border-[#D9CC86]/45 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D83232] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#292727] truncate">
                    TNU Sarisha Campus
                  </span>
                  <span className="text-[10px] text-[#765331] truncate">
                    Direct access via Diamond Harbour Road (45 min from Kolkata)
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* 8. Application Deadline */}
          <article className="glass-panel p-4 sm:p-5 shadow-[0_6px_22px_rgba(41,39,39,0.04)] flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#B69A62]/20 text-[#765331] flex items-center justify-center font-bold text-xs">
                8
              </div>
              <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Application Deadline
              </h3>
            </div>
            <div className="bg-white/80 border border-[#D83232]/30 rounded-xl p-3 sm:p-4 flex flex-col gap-1 shadow-2xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D83232]" />
                <span className="font-serif-tnu text-lg sm:text-xl font-bold text-[#D83232]">
                  {currentDeadline}
                </span>
              </div>
              <span className="text-xs text-[#765331] leading-relaxed">
                Rolling review of applicant dossiers begins immediately upon receipt. Early submissions receive priority interview scheduling.
              </span>
            </div>
          </article>
        </div>
      </div>

      {/* Bottom Sticky Floating Application Bar (Subtle Glass & Red CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-[#D9CC86]/50 shadow-[0_-6px_24px_rgba(41,39,39,0.06)] px-4 py-3">
        <div className="max-w-md mx-auto flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onApplyNow}
            className="w-full flex items-center justify-center gap-2.5 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-[0_8px_24px_rgba(216,50,50,0.28)] hover:shadow-[0_12px_28px_rgba(216,50,50,0.36)] hover:-translate-y-[3px] transition-all duration-200 uppercase tracking-wider cursor-pointer group"
          >
            <span>APPLY NOW</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#765331]">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Opens the official Faculty Application Form. No popup modal.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
