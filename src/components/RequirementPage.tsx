import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
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
  FileText,
  PhoneCall,
  FileCheck,
  MapPin,
  CheckCircle,
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

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor / Chair Professor';
  const currentArea = position?.area || 'Artificial Intelligence & Machine Learning';
  const currentDeadline = position?.deadline || 'March 31, 2026';
  const currentDept = position?.department || 'Department of Computer Science & Engineering';

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-36 relative z-10 page-enter select-none bg-[#F8F5EF]">
      {/* Toast Alert for Bookmarking */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 glass-panel text-[#241F20] px-4 py-2.5 shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <BookmarkCheck className="w-4 h-4 text-[#6B1F2A]" />
          <span className="text-[13px] font-semibold">
            {isBookmarked
              ? 'Position saved to your academic dossier'
              : 'Position removed from saved list'}
          </span>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-5 sm:gap-6">
        {/* Breadcrumb Navigation: Manrope 600, 13-14px */}
        <nav aria-label="Academic Path Breadcrumb" className="overflow-x-auto whitespace-nowrap">
          <ol className="flex items-center gap-1.5 text-[14px] text-[#625B58]">
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="breadcrumb-item gap-1 font-semibold cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateSchools}
                className="breadcrumb-item font-semibold cursor-pointer"
              >
                Schools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateVacancies}
                className="breadcrumb-item font-semibold cursor-pointer"
              >
                Vacancies
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
            </li>
            <li className="inline-flex items-center text-[#6B1F2A] font-bold">
              <span>Post Requirements</span>
            </li>
          </ol>
        </nav>

        {/* Editorial Masthead Section */}
        <header className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#6B1F2A] inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#C9A96E]">
              Faculty Recruitment — 2026–2027 Cycle
            </span>
          </div>
          {/* Masthead: DM Serif Display, Font weight 400 */}
          <h1 className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#241F20] tracking-tight">
            {currentDept}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#625B58] leading-[1.6] font-normal">
            Academic appointment across Professorial cadre conforming strictly to UGC & AICTE norms.
          </p>
        </header>

        {/* Post Meta Summary Box (Main Header Glass Card) */}
        <section className="glass-panel p-5 sm:p-6 shadow-[0_10px_35px_rgba(36,31,32,0.04)] flex flex-col gap-4 bg-white/90">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] uppercase tracking-wider text-[#8A817C] font-bold">
                Cadre / Designation
              </span>
              {/* Cadre: DM Serif Display, Font weight 400 */}
              <h2 className="font-serif-tnu font-normal text-xl sm:text-2xl text-[#6B1F2A] leading-tight">
                {currentCadre}
              </h2>
              <span className="text-[13px] text-[#625B58] font-medium">
                Discipline Area: {currentArea}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleBookmark}
              aria-label="Save position"
              className="p-2 rounded-xl border border-[#C9A96E]/40 text-[#625B58] hover:text-[#6B1F2A] hover:bg-[#F8F5EF] transition-all cursor-pointer shadow-2xs shrink-0"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-[#6B1F2A]" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#EEE9DF] text-[13px]">
            <div className="bg-[#F8F5EF] p-2.5 rounded-xl border border-[#EEE9DF]">
              <span className="text-[11px] text-[#8A817C] font-semibold block">Job Type</span>
              <span className="font-semibold text-[#241F20]">Regular / Full-Time</span>
            </div>
            <div className="bg-[#F8F5EF] p-2.5 rounded-xl border border-[#EEE9DF]">
              <span className="text-[11px] text-[#8A817C] font-semibold block">Scale of Pay</span>
              <span className="font-semibold text-[#241F20]">7th CPC Scale</span>
            </div>
            <div className="bg-[#F8F5EF] p-2.5 rounded-xl border border-[#EEE9DF]">
              <span className="text-[11px] text-[#8A817C] font-semibold block">Status</span>
              <span className="font-bold text-[#1B7340] inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B7340] animate-status-dot" />
                Open
              </span>
            </div>
            <div className="bg-[#F8F5EF] p-2.5 rounded-xl border border-[#EEE9DF]">
              <span className="text-[11px] text-[#8A817C] font-semibold block">Application Due</span>
              <span className="font-bold text-[#6B1F2A]">{currentDeadline}</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RECRUITMENT PROCESS TRACKER                               */}
        {/* Stages: CV Screened by HR -> Interview Call -> Offer Letter */}
        {/* ======================================================== */}
        <section className="glass-panel p-5 rounded-[18px] bg-white/90 shadow-xs border border-[#C9A96E]/40">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-[11px] sm:text-[12px] font-bold text-[#6B1F2A] uppercase tracking-wider">
              Recruitment Process Tracker
            </span>
            <span className="text-[12px] text-[#8A817C] font-medium">
              Evaluation Pathway
            </span>
          </div>

          {/* Desktop Horizontal Tracker */}
          <div className="hidden sm:grid grid-cols-3 gap-3 relative">
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#6B1F2A]/10 border border-[#6B1F2A]/25 relative">
              <div className="w-9 h-9 rounded-full bg-[#6B1F2A] text-white flex items-center justify-center font-bold text-xs shadow-xs mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#6B1F2A]">
                1. CV Screened by HR
              </span>
              <span className="text-[12px] text-[#625B58] mt-0.5 font-normal">
                Eligibility & Research Profile Review
              </span>
              <span className="mt-1.5 inline-block text-[10px] font-bold text-[#1B7340] bg-[#1B7340]/10 px-2 py-0.5 rounded-full tracking-wide">
                Active Step
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-[#C9A96E]/40 relative">
              <div className="w-9 h-9 rounded-full bg-[#F8F5EF] text-[#C9A96E] border border-[#C9A96E]/50 flex items-center justify-center font-bold text-xs mb-2">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-semibold text-[#241F20]">
                2. Interview Call
              </span>
              <span className="text-[12px] text-[#8A817C] mt-0.5 font-normal">
                Academic & Subject Assessment
              </span>
              <span className="mt-1.5 inline-block text-[10px] text-[#8A817C] font-medium">
                Stage 2
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-[#EEE9DF] relative">
              <div className="w-9 h-9 rounded-full bg-[#F8F5EF] text-[#8A817C] border border-[#EEE9DF] flex items-center justify-center font-bold text-xs mb-2">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-semibold text-[#8A817C]">
                3. Offer Letter
              </span>
              <span className="text-[12px] text-[#8A817C] mt-0.5 font-normal">
                Statutory Approval & Appointment
              </span>
              <span className="mt-1.5 inline-block text-[10px] text-[#8A817C] font-medium">
                Final Stage
              </span>
            </div>
          </div>

          {/* Mobile Vertical Tracker */}
          <div className="sm:hidden space-y-2.5">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#6B1F2A]/10 border border-[#6B1F2A]/25">
              <div className="w-8 h-8 rounded-full bg-[#6B1F2A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[13px] font-bold text-[#6B1F2A] block">1. CV Screened by HR</span>
                <span className="text-[11px] text-[#625B58]">Eligibility & Research Review • Active</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#C9A96E]/40">
              <div className="w-8 h-8 rounded-full bg-[#F8F5EF] text-[#C9A96E] border border-[#C9A96E]/50 flex items-center justify-center font-bold text-xs shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[13px] font-semibold text-[#241F20] block">2. Interview Call</span>
                <span className="text-[11px] text-[#8A817C]">Academic & Subject Assessment</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#EEE9DF]">
              <div className="w-8 h-8 rounded-full bg-[#F8F5EF] text-[#8A817C] border border-[#EEE9DF] flex items-center justify-center font-bold text-xs shrink-0">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[13px] font-semibold text-[#8A817C] block">3. Offer Letter</span>
                <span className="text-[11px] text-[#8A817C]">Statutory Approval & Appointment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Requirement Sections */}
        <div className="space-y-4">
          {/* 1. Minimum Eligibility */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-2.5 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6B1F2A]/10 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                1
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Minimum Eligibility
              </h3>
            </div>
            <p className="text-[14px] sm:text-[15px] text-[#625B58] leading-[1.6] font-normal">
              Ph.D. degree in Computer Science & Engineering, Artificial Intelligence, or closely allied discipline from a recognized University or Institute of National Importance (IITs, NITs, IISc, or premier international institutions).
            </p>
          </article>

          {/* 2. Educational Criteria */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-3 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C9A96E]/20 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                2
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Educational Criteria
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-[#241F20]">
              <div className="flex items-center gap-2 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#EEE9DF]">
                <CheckCircle className="w-4 h-4 text-[#1B7340] shrink-0" />
                <span className="font-medium">Ph.D. Degree Completed / Defended</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#EEE9DF]">
                <CheckCircle className="w-4 h-4 text-[#1B7340] shrink-0" />
                <span className="font-medium">M.Tech / M.E. in CSE / AI / IT (First Class)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#EEE9DF]">
                <CheckCircle className="w-4 h-4 text-[#1B7340] shrink-0" />
                <span className="font-medium">B.Tech / B.E. in CSE / IT / ECE (First Class)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#EEE9DF]">
                <CheckCircle className="w-4 h-4 text-[#1B7340] shrink-0" />
                <span className="font-medium">Consistent First Division Academic Record</span>
              </div>
            </div>
          </article>

          {/* 3. Preferred Specialization */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-3 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6B1F2A]/10 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                3
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Preferred Specialization
              </h3>
            </div>
            <p className="text-[14px] text-[#625B58] font-normal leading-[1.6]">
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
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold shadow-2xs ${
                    item.highlight
                      ? 'bg-[#6B1F2A]/10 text-[#6B1F2A] border border-[#6B1F2A]/30'
                      : 'bg-white text-[#241F20] border border-[#C9A96E]/40'
                  }`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </article>

          {/* 4. Required Skills */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-3 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C9A96E]/20 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                4
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
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
                    className="flex items-center gap-2 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#EEE9DF] text-[13px] font-semibold text-[#241F20] shadow-2xs"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#6B1F2A] shrink-0" />
                    <span className="truncate">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </article>

          {/* 5. Experience */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-3 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6B1F2A]/10 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                5
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Experience Requirements
              </h3>
            </div>
            <div className="space-y-2.5 text-[14px] text-[#625B58] leading-[1.6]">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B1F2A] mt-2 shrink-0" />
                <span>
                  <strong className="text-[#241F20] font-semibold">2–8 Years Minimum:</strong> Demonstrable record of collegiate-level teaching, peer-reviewed research, or relevant industry R&D experience conforming strictly to UGC/AICTE norms.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B1F2A] mt-2 shrink-0" />
                <span>
                  <strong className="text-[#241F20] font-semibold">Scholarly Impact:</strong> Significant track record of peer-reviewed publications indexed in <strong className="text-[#6B1F2A] font-semibold">SCI / Scopus</strong> databases.
                </span>
              </div>
            </div>
          </article>

          {/* 6. Key Responsibilities */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-3 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C9A96E]/20 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                6
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Key Responsibilities
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2 text-[14px] text-[#625B58] leading-[1.6]">
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
                  className="flex items-center gap-2.5 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#EEE9DF] shadow-2xs text-[13px] font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-[#1B7340] shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </article>

          {/* 7. Job Location & Map View */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-3 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6B1F2A]/10 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                7
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Job Location
              </h3>
            </div>
            <p className="text-[14px] text-[#625B58] leading-[1.6]">
              The Neotia University, Sarisha, Diamond Harbour Road, 24 Parganas (S), West Bengal — 743368
            </p>

            {/* Campus Map Graphic */}
            <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden relative shadow-inner border border-[#C9A96E]/40">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI2efDljh2qN3UdN45mQ-xLjD-uP9uyZ1ehQMKclks2OVx9IzH3gq4LtEJZnxyIMgXLWqefH5ee--Nas5W5EDqWPOlQLTPzSw-4wEiRlF3NNcrAH-OLDUmvWcmpdg2Xt6uUB0ucNnomL8Xbun1eI7w_yWjn_ew26plsMGArQYkpgsuPNhbHKC4U8hz5-9ldx2BdUNyVfaeNsue0OHGkUjiOiFf18h_2YVjTQQqkSwUmZWz1da7wF4z6A"
                alt="TNU Sarisha Campus Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-2 bottom-2 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-sm border border-[#C9A96E]/30 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6B1F2A] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#241F20] truncate">
                    TNU Sarisha Campus
                  </span>
                  <span className="text-[11px] text-[#625B58] font-medium truncate">
                    Direct access via Diamond Harbour Road (45 min from Kolkata)
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* 8. Application Deadline */}
          <article className="glass-panel p-4 sm:p-5 shadow-xs flex flex-col gap-2.5 bg-white/85">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C9A96E]/20 text-[#6B1F2A] flex items-center justify-center font-bold text-xs">
                8
              </div>
              {/* Section Heading: DM Serif Display, Font weight 400 */}
              <h3 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                Application Deadline
              </h3>
            </div>
            <div className="bg-[#F8F5EF] border border-[#C9A96E]/30 rounded-xl p-3 sm:p-4 flex flex-col gap-1 shadow-2xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#6B1F2A]" />
                <span className="font-serif-tnu font-normal text-xl sm:text-2xl text-[#6B1F2A]">
                  {currentDeadline}
                </span>
              </div>
              <span className="text-[13px] text-[#625B58] leading-[1.6] font-normal">
                Rolling review of applicant dossiers begins immediately upon receipt. Early submissions receive priority interview scheduling.
              </span>
            </div>
          </article>
        </div>
      </div>

      {/* Bottom Sticky Floating Application Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-t border-[#C9A96E]/30 shadow-[0_-6px_24px_rgba(36,31,32,0.05)] px-4 py-3">
        <div className="max-w-md mx-auto flex flex-col gap-1.5">
          {/* Button: Manrope 700 14-15px */}
          <button
            type="button"
            onClick={onApplyNow}
            className="btn-primary-tnu w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl uppercase tracking-wider text-[14px] sm:text-[15px] font-bold cursor-pointer group"
          >
            <span>APPLY NOW</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[12px] text-[#8A817C] font-medium">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Opens official Faculty Application Form. No popup modal.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
