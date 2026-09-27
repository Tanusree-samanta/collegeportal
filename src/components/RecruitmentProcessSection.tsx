import React, { useEffect, useRef, useState } from 'react';
import {
  FileText,
  SearchCheck,
  UserCheck,
  PhoneCall,
  Users,
  BadgeCheck,
  FileCheck,
  GraduationCap,
  ArrowRight,
  Info,
  CheckCircle2,
  Columns,
  StretchHorizontal,
} from 'lucide-react';

interface RecruitmentStage {
  number: string;
  name: string;
  description: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
  isFirst?: boolean;
}

const RECRUITMENT_STAGES: RecruitmentStage[] = [
  {
    number: '01',
    name: 'CV / APPLICATION SUBMITTED',
    description:
      'Submit your faculty application along with your updated CV and required academic documents.',
    status: 'APPLICATION RECEIVED',
    icon: FileText,
    isFirst: true,
  },
  {
    number: '02',
    name: 'HR / ACADEMIC SCREENING',
    description:
      'Our HR and academic team reviews your CV, qualifications, experience, research profile and eligibility.',
    status: 'UNDER REVIEW',
    icon: SearchCheck,
  },
  {
    number: '03',
    name: 'SHORTLISTING',
    description:
      'Candidates meeting the academic and professional requirements are shortlisted for the next stage.',
    status: 'SHORTLISTED',
    icon: UserCheck,
  },
  {
    number: '04',
    name: 'INTERVIEW CALL',
    description:
      'Shortlisted candidates receive an interview invitation with the interview date, time and mode.',
    status: 'INTERVIEW INVITATION',
    icon: PhoneCall,
  },
  {
    number: '05',
    name: 'INTERVIEW / ACADEMIC ASSESSMENT',
    description:
      'Participate in the faculty interview, academic discussion and subject-specific assessment where applicable.',
    status: 'INTERVIEW',
    icon: Users,
  },
  {
    number: '06',
    name: 'SELECTION & APPROVAL',
    description:
      'The selected candidate profile moves through the required academic and administrative approval process.',
    status: 'APPROVAL',
    icon: BadgeCheck,
  },
  {
    number: '07',
    name: 'OFFER LETTER',
    description:
      'After final approval, the selected candidate receives the official appointment / offer letter.',
    status: 'OFFER ISSUED',
    icon: FileCheck,
  },
  {
    number: '08',
    name: 'JOINING & ONBOARDING',
    description:
      'Complete joining formalities and begin your academic journey with the university.',
    status: 'JOINING',
    icon: GraduationCap,
  },
];

const STATUS_PIPELINE = [
  'APPLICATION RECEIVED',
  'UNDER REVIEW',
  'SHORTLISTED',
  'INTERVIEW',
  'APPROVAL',
  'OFFER',
  'JOINING',
];

export const RecruitmentProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [desktopViewMode, setDesktopViewMode] = useState<'rail' | 'grid'>('rail');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recruitment-process"
      className="w-full bg-[#F8F6F0] pt-20 pb-20 sm:pt-24 sm:pb-24 border-t border-[#EBE6DF]/70 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ======================================================== */}
        {/* 1. SECTION HEADING & EDITORIAL SUBTITLE                  */}
        {/* Spacing: 80-100px before section, 40px to timeline       */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B69A62]/15 border border-[#D9CC86]/50 shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-pulse" />
            <span className="text-[10px] sm:text-xs text-[#B4141D] font-bold tracking-wider uppercase">
              Official Academic Selection Flow
            </span>
          </div>

          <h2 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl font-bold text-[#292727] tracking-tight">
            How the Recruitment Process Works
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#5B403D] leading-relaxed">
            From application submission to joining, follow every stage of the faculty recruitment journey.
          </p>

          {/* Desktop View Switcher Toggle */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-4">
            <div className="inline-flex items-center bg-[#FAF8F5] p-1 rounded-lg border border-[#D9CC86]/60 shadow-2xs">
              <button
                type="button"
                onClick={() => setDesktopViewMode('rail')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  desktopViewMode === 'rail'
                    ? 'bg-[#D83232] text-white shadow-xs'
                    : 'text-[#765331] hover:text-[#292727]'
                }`}
              >
                <StretchHorizontal className="w-3.5 h-3.5" />
                <span>Horizontal Timeline Rail</span>
              </button>
              <button
                type="button"
                onClick={() => setDesktopViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  desktopViewMode === 'grid'
                    ? 'bg-[#D83232] text-white shadow-xs'
                    : 'text-[#765331] hover:text-[#292727]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>4×2 Connected Flow</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. DESKTOP TIMELINE (lg and above)                       */}
        {/* ======================================================== */}

        {/* MODE A: Continuous 8-Stage Horizontal Timeline Rail */}
        {desktopViewMode === 'rail' && (
          <div className="hidden lg:block relative">
            {/* Horizontal Continuous Timeline Track */}
            <div className="relative pt-6 pb-2">
              {/* Continuous Gold Connecting Line */}
              <div className="absolute top-[38px] left-[5%] right-[5%] h-[2px] bg-[#EBE6DF]">
                <div
                  className="h-full bg-[#D9CC86] transition-all duration-[1800ms] ease-out origin-left"
                  style={{
                    width: isInView ? '100%' : '0%',
                  }}
                />
              </div>

              {/* 8 Horizontal Stages Along the Rail */}
              <div className="grid grid-cols-8 gap-3 relative z-10">
                {RECRUITMENT_STAGES.map((stage, idx) => {
                  const IconComponent = stage.icon;
                  const delayMs = idx * 100;

                  return (
                    <div
                      key={stage.number}
                      className="flex flex-col group transition-all duration-500 ease-out"
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: `${delayMs}ms`,
                      }}
                    >
                      {/* Node Circle on the horizontal line */}
                      <div className="flex items-center justify-center mb-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs ${
                            stage.isFirst
                              ? 'bg-[#D83232] text-white border-2 border-[#D83232]/40 ring-4 ring-[#D83232]/10'
                              : 'bg-white text-[#765331] border border-[#D9CC86] ring-4 ring-[#F8F6F0]'
                          }`}
                        >
                          <span className="font-serif-tnu font-bold text-xs sm:text-sm">
                            {stage.number}
                          </span>
                        </div>
                      </div>

                      {/* Glass Card */}
                      <div
                        className={`flex-1 flex flex-col justify-between p-3.5 rounded-[14px] border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(41,39,39,0.08)] ${
                          stage.isFirst
                            ? 'border-[#D83232]/40 bg-white/70 shadow-[0_8px_25px_rgba(41,39,39,0.04)] ring-1 ring-[#D83232]/15'
                            : 'border-[#D9CC86]/70 bg-white/60 shadow-[0_8px_25px_rgba(41,39,39,0.04)]'
                        }`}
                        style={{
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                        }}
                      >
                        <div>
                          {/* Header: Icon & Status Badge */}
                          <div className="flex items-center justify-between gap-1.5 mb-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 ${
                                stage.isFirst
                                  ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25'
                                  : 'bg-[#B69A62]/10 text-[#765331] border border-[#D9CC86]/40'
                              }`}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>

                            <span
                              className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider text-right truncate ${
                                stage.isFirst
                                  ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20'
                                  : 'bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50'
                              }`}
                            >
                              {stage.status}
                            </span>
                          </div>

                          {/* Stage Name */}
                          <h3 className="font-bold text-[11px] text-[#292727] tracking-tight uppercase mb-1.5 leading-snug">
                            {stage.name}
                          </h3>

                          {/* Description */}
                          <p className="text-[10px] text-[#5B403D] leading-relaxed line-clamp-4">
                            {stage.description}
                          </p>
                        </div>

                        {/* Step indicator */}
                        <div className="pt-2 mt-2 border-t border-[#EBE6DF]/70 flex items-center justify-between text-[9px] text-[#765331]">
                          <span className="font-medium">{stage.number}/08</span>
                          {idx < 7 ? (
                            <span className="inline-flex items-center text-[#B69A62]">
                              → 0{idx + 2}
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-emerald-700 font-bold">
                              ✓ Final
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODE B: 4x2 Connected Flow Grid */}
        {desktopViewMode === 'grid' && (
          <div className="hidden lg:block space-y-8">
            {/* TIER 1: Stages 01 to 04 */}
            <div className="relative">
              <div className="absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-[#EBE6DF] -z-0">
                <div
                  className="h-full bg-[#D9CC86] transition-all duration-[1600ms] ease-out origin-left"
                  style={{
                    width: isInView ? '100%' : '0%',
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-5 relative z-10">
                {RECRUITMENT_STAGES.slice(0, 4).map((stage, idx) => {
                  const IconComponent = stage.icon;
                  const delayMs = idx * 100;

                  return (
                    <div
                      key={stage.number}
                      className="flex flex-col group transition-all duration-500 ease-out"
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: `${delayMs}ms`,
                      }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs ${
                            stage.isFirst
                              ? 'bg-[#D83232] text-white border-2 border-[#D83232]/40 ring-4 ring-[#D83232]/10'
                              : 'bg-white text-[#765331] border border-[#D9CC86] ring-4 ring-[#F8F6F0]'
                          }`}
                        >
                          <span className="font-serif-tnu font-bold text-sm sm:text-base">
                            {stage.number}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-[14px] border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(41,39,39,0.08)] ${
                          stage.isFirst
                            ? 'border-[#D83232]/40 bg-white/70 shadow-[0_8px_25px_rgba(41,39,39,0.04)] ring-1 ring-[#D83232]/15'
                            : 'border-[#D9CC86]/70 bg-white/60 shadow-[0_8px_25px_rgba(41,39,39,0.04)]'
                        }`}
                        style={{
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 ${
                                stage.isFirst
                                  ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25'
                                  : 'bg-[#B69A62]/10 text-[#765331] border border-[#D9CC86]/40'
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>

                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-right ${
                                stage.isFirst
                                  ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20'
                                  : 'bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50'
                              }`}
                            >
                              {stage.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-xs sm:text-sm text-[#292727] tracking-tight uppercase mb-2 leading-snug">
                            {stage.name}
                          </h3>

                          <p className="text-xs text-[#5B403D] leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#EBE6DF]/70 flex items-center justify-between text-[10px] text-[#765331]">
                          <span className="font-medium">Stage {stage.number} of 08</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#B69A62]">
                            Proceeds to 0{idx + 2}
                            <ArrowRight className="w-3 h-3 text-[#B69A62]" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transition Connector */}
            <div className="flex justify-end pr-[12.5%] -my-2 relative z-0">
              <div className="flex flex-col items-center">
                <div
                  className="w-[2px] h-6 bg-[#D9CC86] transition-all duration-700 ease-out"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transitionDelay: '450ms',
                  }}
                />
                <div
                  className="text-[9px] font-bold text-[#765331] bg-[#F8F6F0] px-2 py-0.5 border border-[#D9CC86]/60 rounded-full uppercase tracking-wider"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transitionDelay: '500ms',
                  }}
                >
                  Assessment & Approval Phases ↓
                </div>
              </div>
            </div>

            {/* TIER 2: Stages 05 to 08 */}
            <div className="relative">
              <div className="absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-[#EBE6DF] -z-0">
                <div
                  className="h-full bg-[#D9CC86] transition-all duration-[1600ms] ease-out origin-left"
                  style={{
                    width: isInView ? '100%' : '0%',
                    transitionDelay: '400ms',
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-5 relative z-10">
                {RECRUITMENT_STAGES.slice(4, 8).map((stage, idx) => {
                  const IconComponent = stage.icon;
                  const stageIndex = idx + 4;
                  const delayMs = stageIndex * 100;

                  return (
                    <div
                      key={stage.number}
                      className="flex flex-col group transition-all duration-500 ease-out"
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateY(0)' : 'translateY(15px)',
                        transitionDelay: `${delayMs}ms`,
                      }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs bg-white text-[#765331] border border-[#D9CC86] ring-4 ring-[#F8F6F0]">
                          <span className="font-serif-tnu font-bold text-sm sm:text-base">
                            {stage.number}
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-[14px] border border-[#D9CC86]/70 bg-white/60 shadow-[0_8px_25px_rgba(41,39,39,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(41,39,39,0.08)]"
                        style={{
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 bg-[#B69A62]/10 text-[#765331] border border-[#D9CC86]/40">
                              <IconComponent className="w-4 h-4" />
                            </div>

                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-right bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50">
                              {stage.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-xs sm:text-sm text-[#292727] tracking-tight uppercase mb-2 leading-snug">
                            {stage.name}
                          </h3>

                          <p className="text-xs text-[#5B403D] leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#EBE6DF]/70 flex items-center justify-between text-[10px] text-[#765331]">
                          <span className="font-medium">Stage {stage.number} of 08</span>
                          {idx < 3 ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-[#B69A62]">
                              Proceeds to 0{idx + 6}
                              <ArrowRight className="w-3 h-3 text-[#B69A62]" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-semibold text-[#765331]">
                              <CheckCircle2 className="w-3 h-3 text-[#B69A62]" />
                              Formal Appointment
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. TABLET LAYOUT (md to lg: 2-Column Responsive Layout)   */}
        {/* ======================================================== */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 relative">
          {RECRUITMENT_STAGES.map((stage, idx) => {
            const IconComponent = stage.icon;
            const delayMs = idx * 100;

            return (
              <div
                key={stage.number}
                className={`p-5 rounded-[14px] border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(41,39,39,0.08)] flex flex-col justify-between ${
                  stage.isFirst
                    ? 'border-[#D83232]/40 bg-white/70 shadow-[0_8px_25px_rgba(41,39,39,0.04)] ring-1 ring-[#D83232]/15'
                    : 'border-[#D9CC86]/70 bg-white/60 shadow-[0_8px_25px_rgba(41,39,39,0.04)]'
                }`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(15px)',
                  transitionDelay: `${delayMs}ms`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-serif-tnu font-bold text-xs ${
                          stage.isFirst
                            ? 'bg-[#D83232] text-white shadow-xs'
                            : 'bg-white text-[#765331] border border-[#D9CC86]'
                        }`}
                      >
                        {stage.number}
                      </div>

                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          stage.isFirst
                            ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25'
                            : 'bg-[#B69A62]/10 text-[#765331] border border-[#D9CC86]/40'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        stage.isFirst
                          ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20'
                          : 'bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#292727] tracking-tight uppercase mb-1.5">
                    {stage.name}
                  </h3>

                  <p className="text-xs text-[#5B403D] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EBE6DF]/70 flex items-center justify-between text-[10px] text-[#765331]">
                  <span>Stage {stage.number} of 08</span>
                  {idx < 7 && (
                    <span className="inline-flex items-center gap-1 font-semibold text-[#B69A62]">
                      Next Stage
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 4. MOBILE LAYOUT (Under md: Vertical Timeline)            */}
        {/* ======================================================== */}
        <div className="md:hidden relative pl-6">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-3 w-[2px] bg-[#EBE6DF]">
            <div
              className="w-full bg-[#D9CC86] transition-all duration-[1800ms] ease-out origin-top"
              style={{
                height: isInView ? '100%' : '0%',
              }}
            />
          </div>

          <div className="space-y-4">
            {RECRUITMENT_STAGES.map((stage, idx) => {
              const IconComponent = stage.icon;
              const delayMs = idx * 100;

              return (
                <div
                  key={stage.number}
                  className="relative group transition-all duration-500 ease-out"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(15px)',
                    transitionDelay: `${delayMs}ms`,
                  }}
                >
                  {/* Circle dot on the vertical line */}
                  <div
                    className={`absolute -left-[23px] top-4 w-6 h-6 rounded-full flex items-center justify-center font-serif-tnu font-bold text-[10px] shadow-xs z-10 ${
                      stage.isFirst
                        ? 'bg-[#D83232] text-white ring-2 ring-[#D83232]/20'
                        : 'bg-white text-[#765331] border border-[#D9CC86] ring-2 ring-[#F8F6F0]'
                    }`}
                  >
                    {stage.number}
                  </div>

                  {/* Glass Card */}
                  <div
                    className={`w-full p-4 rounded-[14px] border transition-all duration-300 ease-out ${
                      stage.isFirst
                        ? 'border-[#D83232]/40 bg-white/70 shadow-[0_8px_25px_rgba(41,39,39,0.04)] ring-1 ring-[#D83232]/15'
                        : 'border-[#D9CC86]/70 bg-white/60 shadow-[0_8px_25px_rgba(41,39,39,0.04)]'
                    }`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-md flex items-center justify-center ${
                            stage.isFirst
                              ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25'
                              : 'bg-[#B69A62]/10 text-[#765331] border border-[#D9CC86]/40'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-xs text-[#292727] tracking-tight uppercase">
                          {stage.name}
                        </span>
                      </div>

                      <span
                        className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          stage.isFirst
                            ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20'
                            : 'bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50'
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#5B403D] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. SMALL INSTITUTIONAL HR APPROVAL NOTE                   */}
        {/* ======================================================== */}
        <div className="mt-8 text-center">
          <p className="inline-flex items-center justify-center gap-1.5 text-xs text-[#765331] bg-[#F2ECE4]/70 px-4 py-2 rounded-full border border-[#D9CC86]/40 max-w-2xl mx-auto">
            <Info className="w-3.5 h-3.5 text-[#B69A62] shrink-0" />
            <span>
              Recruitment stages may vary depending on the position, academic requirements and institutional approval process.
            </span>
          </p>
        </div>

        {/* ======================================================== */}
        {/* 6. OPTIONAL PROCESS STATUS PANEL (Informational Component)*/}
        {/* Spacing: 40px below timeline                              */}
        {/* ======================================================== */}
        <div className="mt-10">
          <div
            className="p-5 sm:p-7 rounded-[14px] border border-[#D9CC86]/70 bg-white/60 shadow-[0_8px_25px_rgba(41,39,39,0.04)]"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="pb-5 border-b border-[#EBE6DF]/80">
              <div className="flex items-center gap-2">
                <h3 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727]">
                  Application Status
                </h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50 uppercase tracking-wider">
                  Informational Guide
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5B403D] mt-1 max-w-2xl leading-relaxed">
                Once your application is submitted, the recruitment team reviews your profile against the requirements of the selected position. Shortlisted candidates are contacted for the next stage.
              </p>
            </div>

            {/* Subtle Status Sequence */}
            <div className="pt-5">
              <div className="text-[10px] font-bold text-[#765331] uppercase tracking-wider mb-3">
                Standard Candidate Journey Pipeline
              </div>

              {/* Responsive Flow */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {STATUS_PIPELINE.map((statusName, index) => {
                  const isFirst = index === 0;

                  return (
                    <React.Fragment key={statusName}>
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors ${
                          isFirst
                            ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/25'
                            : 'bg-[#F2ECE4] text-[#765331] border border-[#EBE6DF]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isFirst ? 'bg-[#D83232]' : 'bg-[#B69A62]'
                          }`}
                        />
                        <span>{statusName}</span>
                      </div>

                      {index < STATUS_PIPELINE.length - 1 && (
                        <span className="text-[#B69A62] text-xs font-bold px-0.5">
                          →
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="mt-3 text-[10px] text-[#765331]/80 italic">
                * Note: Advancement through each evaluation stage is subject to peer committee recommendations and formal institutional review.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
