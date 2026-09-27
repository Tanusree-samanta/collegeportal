import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Code2,
  Brain,
  Stethoscope,
  Leaf,
  Pill,
  Compass,
  Fish,
  Utensils,
  HeartPulse,
  Wrench,
  Building,
  TrendingUp,
  X,
  Lock,
  Megaphone,
} from 'lucide-react';
import { SCHOOLS_DATA } from '../data/schools';
import { School } from '../types';

interface SchoolsPageProps {
  onSelectSchool: (school: School) => void;
  onNavigateHome: () => void;
}

export const SchoolsPage: React.FC<SchoolsPageProps> = ({
  onSelectSchool,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);

  // Icon mapping helper
  const renderSchoolIcon = (id: string, hasReq: boolean) => {
    const iconClass = hasReq ? 'w-5 h-5 text-[#D83232]' : 'w-5 h-5 text-[#765331]/60';
    switch (id) {
      case 'school-of-technology':
        return <Code2 className={iconClass} />;
      case 'school-of-humanities':
        return <Brain className={iconClass} />;
      case 'school-of-health-science':
        return <Stethoscope className={iconClass} />;
      case 'school-of-agriculture':
        return <Leaf className={iconClass} />;
      case 'school-of-pharmacy':
        return <Pill className={iconClass} />;
      case 'school-of-marine-science':
        return <Compass className={iconClass} />;
      case 'school-of-fisheries':
        return <Fish className={iconClass} />;
      case 'school-of-hospitality':
        return <Utensils className={iconClass} />;
      case 'institute-of-nursing':
        return <HeartPulse className={iconClass} />;
      case 'skill-development':
        return <Wrench className={iconClass} />;
      case 'administration-student-affairs':
        return <Building className={iconClass} />;
      case 'marketing-admissions':
        return <TrendingUp className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  const activeSchoolsCount = useMemo(() => {
    return SCHOOLS_DATA.filter((s) => Boolean(s.isActive && (s.openPositionsCount || 0) > 0)).length;
  }, []);

  const filteredSchools = useMemo(() => {
    return SCHOOLS_DATA.filter((school) => {
      const hasReq = Boolean(school.isActive && (school.openPositionsCount || 0) > 0);
      if (filterActiveOnly && !hasReq) return false;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        school.name.toLowerCase().includes(query) ||
        school.streamLabel.toLowerCase().includes(query) ||
        school.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, filterActiveOnly]);

  return (
    <div className="w-full bg-[#F8F6F0] min-h-[calc(100vh-64px)] pb-16 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col gap-5 sm:gap-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Academic Path Breadcrumb" className="overflow-x-auto whitespace-nowrap">
          <ol className="flex items-center gap-1.5 text-xs text-[#765331]">
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#D83232] transition-colors inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="inline-flex items-center gap-1">
              <span className="font-medium text-[#765331]">Career</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            <li className="text-[#D83232] font-bold">Schools Directory</li>
          </ol>
        </nav>

        {/* Page Heading & Editorial Subtitle */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B69A62]/15 border border-[#D9CC86]/50 shadow-xs w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-pulse" />
            <span className="text-[10px] sm:text-xs text-[#B4141D] font-bold tracking-wider uppercase">
              12 Academic Schools & Faculties
            </span>
          </div>

          <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl font-bold text-[#292727] tracking-tight">
            Explore Schools & Academic Disciplines
          </h1>

          <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed max-w-3xl">
            Review school credentials and open faculty positions. Positions with active recruitment requirements have enabled exploration actions below.
          </p>
        </div>

        {/* Recruitment Status Callout Banner */}
        <div className="bg-[#FAF8F5] border border-[#D9CC86]/50 rounded-xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D83232] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-[#292727] block">
                Cycle 2026–2027 Active Hiring Stream
              </span>
              <span className="text-[11px] text-[#765331]">
                {activeSchoolsCount} of 12 schools currently have open requirements and active vacancies.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterActiveOnly(false)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !filterActiveOnly
                  ? 'bg-[#4A351F] text-white'
                  : 'bg-white text-[#765331] border border-[#D9CC86]/50'
              }`}
            >
              All Schools (12)
            </button>
            <button
              type="button"
              onClick={() => setFilterActiveOnly(true)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterActiveOnly
                  ? 'bg-[#D83232] text-white shadow-xs'
                  : 'bg-white text-[#765331] border border-[#D9CC86]/50'
              }`}
            >
              With Openings Only ({activeSchoolsCount})
            </button>
          </div>
        </div>

        {/* Search Controls */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#765331]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search school by discipline, engineering, pharmacy, nursing, management..."
            className="w-full bg-white text-[#292727] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-[#D9CC86]/50 shadow-2xs placeholder:text-[#765331]/60 focus:outline-none focus:border-[#D83232] focus:ring-1 focus:ring-[#D83232] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#765331] hover:text-[#292727] p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Schools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredSchools.map((school) => {
            const courseCount = school.courseCount || (school.courses ? school.courses.length : 0);
            const openPos = school.openPositionsCount || 0;
            const hasRequirement = Boolean(school.isActive && openPos > 0);

            return (
              <article
                key={school.id}
                onClick={() => {
                  if (hasRequirement) {
                    onSelectSchool(school);
                  }
                }}
                className={`rounded-xl shadow-xs overflow-hidden relative flex flex-col justify-between transition-all duration-300 ${
                  hasRequirement
                    ? 'bg-white border border-[#D9CC86]/70 hover:border-[#D83232]/60 hover:-translate-y-1 hover:shadow-md cursor-pointer group'
                    : 'bg-white/60 border border-[#EBE6DF] opacity-85 cursor-default'
                }`}
              >
                {/* Accent strip on top */}
                <div
                  className={`h-1 w-full transition-all ${
                    hasRequirement
                      ? 'bg-[#D83232] group-hover:h-1.5'
                      : 'bg-[#EBE6DF]'
                  }`}
                />

                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                          hasRequirement
                            ? 'bg-[#D83232]/10 border border-[#D83232]/20 group-hover:scale-105'
                            : 'bg-[#EBE6DF]/70 text-[#765331]/60'
                        }`}
                      >
                        {renderSchoolIcon(school.id, hasRequirement)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#765331] font-bold">
                          {school.streamLabel}
                        </span>
                        <h2
                          className={`font-bold text-base sm:text-lg truncate transition-colors ${
                            hasRequirement
                              ? 'text-[#292727] group-hover:text-[#D83232]'
                              : 'text-[#292727]/70'
                          }`}
                        >
                          {school.name}
                        </h2>
                      </div>
                    </div>

                    {/* Status Badge: Active vs Inactive */}
                    {hasRequirement ? (
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20 text-[10px] font-bold tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-pulse" />
                        <span>{openPos} Openings</span>
                      </span>
                    ) : (
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#EBE6DF] text-[#765331]/70 text-[10px] font-semibold uppercase">
                        No Current Opening
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                      hasRequirement ? 'text-[#5B403D]' : 'text-[#5B403D]/70'
                    }`}
                  >
                    {school.description}
                  </p>

                  {/* Metrics Box: Courses & Vacancy */}
                  <div className="bg-[#FAF8F5] border border-[#D9CC86]/40 rounded-lg p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#292727] font-semibold">
                      <BookOpen className={`w-3.5 h-3.5 ${hasRequirement ? 'text-[#D83232]' : 'text-[#765331]/50'}`} />
                      <span>{courseCount} Academic Programs</span>
                    </div>
                    <div className="text-[11px] text-[#765331] font-medium">
                      Ratio: {school.studentFacultyRatio || '14:1'}
                    </div>
                  </div>

                  {/* Primary CTA Button: ENABLED IF REQUIREMENT IS AVAILABLE, NEITHER NOT */}
                  <div className="pt-1">
                    {hasRequirement ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSchool(school);
                        }}
                        className="w-full bg-[#FAF8F5] group-hover:bg-[#D83232] group-hover:text-white text-[#765331] font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-[#D9CC86]/60 group-hover:border-[#D83232] transition-all duration-200 shadow-2xs cursor-pointer"
                      >
                        <span>Explore School Details & Openings</span>
                        <ArrowRight className="w-4 h-4 text-[#D83232] group-hover:text-white transition-colors" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={true}
                        aria-disabled="true"
                        className="w-full bg-[#F2ECE4]/70 text-[#765331]/50 font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-[#EBE6DF] cursor-not-allowed shadow-none"
                        title="No vacancies currently available for this school in cycle 2026-27"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#765331]/40" />
                        <span>Explore Details & Openings (Unavailable)</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredSchools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-white rounded-xl border border-[#D9CC86]/40 shadow-xs">
            <Search className="w-10 h-10 text-[#765331]/40 mb-2" />
            <h3 className="font-bold text-sm sm:text-base text-[#292727]">
              No matching schools found
            </h3>
            <p className="text-xs text-[#765331] max-w-xs mt-1">
              Try adjusting your search keywords or reset filter to view all schools.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterActiveOnly(false);
              }}
              className="mt-3 px-3.5 py-1.5 bg-[#FAF8F5] border border-[#D9CC86] text-[#D83232] rounded-lg text-xs font-bold hover:bg-[#F2ECE4] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
