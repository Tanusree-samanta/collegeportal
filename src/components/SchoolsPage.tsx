import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Search,
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

  // Icon mapping helper with burgundy / muted styling
  const renderSchoolIcon = (id: string, hasReq: boolean) => {
    const iconClass = hasReq ? 'w-5 h-5 text-[#6B1F2A]' : 'w-5 h-5 text-[#8A817C]';
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
    <div className="w-full bg-[#F8F5EF] min-h-[calc(100vh-64px)] pb-16 select-none page-enter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col gap-5 sm:gap-6">
        {/* Breadcrumb Navigation: Manrope 600, 14-15px */}
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
              <span className="font-semibold text-[#625B58]">Career</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
            </li>
            <li className="text-[#6B1F2A] font-bold">Schools Directory</li>
          </ol>
        </nav>

        {/* Page Heading & Editorial Subtitle */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C9A96E]/40 shadow-xs w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1F2A]" />
            <span className="text-[11px] sm:text-[12px] text-[#6B1F2A] font-bold tracking-wider uppercase">
              12 Academic Schools & Faculties
            </span>
          </div>

          {/* Section Heading: DM Serif Display, Font weight 400 */}
          <h1 className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#241F20] tracking-[-0.01em]">
            Explore Schools & Academic Disciplines
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#625B58] leading-[1.6] max-w-3xl font-normal">
            Review school credentials and open faculty positions. Positions with active recruitment requirements have enabled exploration actions below.
          </p>
        </div>

        {/* Recruitment Status Callout Banner */}
        <div className="bg-white/80 border border-[#C9A96E]/35 rounded-[16px] p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6B1F2A] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Megaphone className="w-4 h-4 text-[#D8BD7A]" />
            </div>
            <div>
              <span className="font-semibold text-[14px] sm:text-[15px] text-[#241F20] block">
                Cycle 2026–2027 Active Hiring Stream
              </span>
              <span className="text-[12px] sm:text-[13px] text-[#625B58] font-medium">
                {activeSchoolsCount} of 12 schools currently have open requirements and active vacancies.
              </span>
            </div>
          </div>

          {/* Filter Toggles: Buttons Manrope 700 14px */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterActiveOnly(false)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-bold transition-all cursor-pointer ${
                !filterActiveOnly
                  ? 'bg-[#6B1F2A] text-white shadow-xs'
                  : 'bg-white text-[#625B58] border border-[#C9A96E]/40 hover:bg-[#F8F5EF]'
              }`}
            >
              All Schools (12)
            </button>
            <button
              type="button"
              onClick={() => setFilterActiveOnly(true)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-bold transition-all cursor-pointer ${
                filterActiveOnly
                  ? 'bg-[#6B1F2A] text-white shadow-xs'
                  : 'bg-white text-[#625B58] border border-[#C9A96E]/40 hover:bg-[#F8F5EF]'
              }`}
            >
              With Openings Only ({activeSchoolsCount})
            </button>
          </div>
        </div>

        {/* Search Controls: Input Manrope 400 */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A817C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search school by discipline, engineering, pharmacy, nursing, management..."
            className="w-full bg-white text-[#241F20] text-[14px] sm:text-[15px] font-normal pl-10 pr-4 py-2.5 rounded-xl border border-[#C9A96E]/40 shadow-2xs placeholder:text-[#8A817C] focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A817C] hover:text-[#241F20] p-1 cursor-pointer"
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
                className={`rounded-[18px] shadow-xs overflow-hidden relative flex flex-col justify-between transition-all duration-300 ${
                  hasRequirement
                    ? 'bg-white border border-[#C9A96E]/40 hover:border-[#6B1F2A]/60 hover:-translate-y-1 hover:shadow-md cursor-pointer group'
                    : 'bg-white/60 border border-[#EEE9DF] opacity-80 cursor-default'
                }`}
              >
                {/* Accent strip on top: Burgundy when active, muted when inactive */}
                <div
                  className={`h-1 w-full transition-all ${
                    hasRequirement
                      ? 'bg-[#6B1F2A] group-hover:h-1.5'
                      : 'bg-[#EEE9DF]'
                  }`}
                />

                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                          hasRequirement
                            ? 'bg-[#6B1F2A]/10 border border-[#6B1F2A]/20 group-hover:scale-105'
                            : 'bg-[#EEE9DF]/70 text-[#8A817C]'
                        }`}
                      >
                        {renderSchoolIcon(school.id, hasRequirement)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-[#625B58] font-bold">
                          {school.streamLabel}
                        </span>
                        {/* School Heading: DM Serif Display, 400 */}
                        <h2
                          className={`font-serif-tnu font-normal text-lg sm:text-xl truncate transition-colors ${
                            hasRequirement
                              ? 'text-[#241F20] group-hover:text-[#6B1F2A]'
                              : 'text-[#241F20]/60'
                          }`}
                        >
                          {school.name}
                        </h2>
                      </div>
                    </div>

                    {/* Status Badge: Manrope 700 11-12px slightly increased letter spacing */}
                    {hasRequirement ? (
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1B7340]/10 text-[#1B7340] border border-[#1B7340]/25 text-[11px] font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B7340] animate-status-dot" />
                        <span>OPEN • {openPos} Vacancies</span>
                      </span>
                    ) : (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#EEE9DF] text-[#8A817C] text-[11px] font-bold uppercase tracking-wider">
                        CLOSED / No Openings
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-[14px] leading-[1.6] line-clamp-2 font-normal ${
                      hasRequirement ? 'text-[#625B58]' : 'text-[#625B58]/70'
                    }`}
                  >
                    {school.description}
                  </p>

                  {/* Metrics Box: Programs & Ratio - Manrope 500 12-13px */}
                  <div className="bg-[#F8F5EF] border border-[#EEE9DF] rounded-xl p-2.5 flex items-center justify-between text-[12px] sm:text-[13px]">
                    <div className="flex items-center gap-1.5 text-[#241F20] font-semibold">
                      <BookOpen className={`w-3.5 h-3.5 ${hasRequirement ? 'text-[#6B1F2A]' : 'text-[#8A817C]'}`} />
                      <span>{courseCount} Academic Programs</span>
                    </div>
                    <div className="text-[12px] text-[#625B58] font-medium">
                      Ratio: {school.studentFacultyRatio || '14:1'}
                    </div>
                  </div>

                  {/* Primary Action Button: Manrope 700 14px */}
                  <div className="pt-1">
                    {hasRequirement ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSchool(school);
                        }}
                        className="w-full bg-[#F8F5EF] group-hover:bg-[#6B1F2A] group-hover:text-white text-[#6B1F2A] font-bold text-[14px] py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-[#C9A96E]/40 group-hover:border-[#6B1F2A] transition-all duration-200 shadow-2xs cursor-pointer"
                      >
                        <span>Explore School Details & Openings</span>
                        <ArrowRight className="w-4 h-4 text-[#6B1F2A] group-hover:text-white transition-colors" />
                      </button>
                    ) : (
                      <div className="w-full bg-white/40 text-[#8A817C] text-[13px] py-2.5 px-4 rounded-xl text-center border border-[#EEE9DF] font-semibold">
                        Positions Currently Filled
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
