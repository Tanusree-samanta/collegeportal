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
  GraduationCap,
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

  // Icon mapping helper with Primary Blue / Muted Blue styling
  const renderSchoolIcon = (id: string, hasReq: boolean) => {
    const iconClass = hasReq ? 'w-5 h-5 text-[#0057B8]' : 'w-5 h-5 text-[#71869A]';
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
    <div className="w-full bg-[#F7F9FC] min-h-[calc(100vh-64px)] pb-16 select-none page-enter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col gap-5 sm:gap-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Academic Path Breadcrumb" className="overflow-x-auto whitespace-nowrap">
          <ol className="flex items-center gap-1.5 text-[14px] text-[#52708A]">
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="breadcrumb-link gap-1 cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#0057B8]" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
            </li>
            <li className="inline-flex items-center text-[#0057B8] font-semibold">
              <span>Academic Schools Directory</span>
            </li>
          </ol>
        </nav>

        {/* Section Header with Blue Dash Line */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-1 bg-[#0057B8] rounded-full inline-block" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0057B8]">
              Academic Disciplines • 2026–2027 Cycle
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#003B68] font-bold tracking-tight">
            Explore Opportunities Across Our Schools
          </h1>
          <p className="text-sm sm:text-base text-[#52708A] max-w-2xl font-normal leading-relaxed">
            Discover exciting career opportunities in our 12 diverse academic schools and be a part of TNU's growing faculty community.
          </p>
        </div>

        {/* Filter Bar & Quick Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#D9E2EC] shadow-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterActiveOnly(false)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !filterActiveOnly
                  ? 'bg-[#0057B8] text-white shadow-xs'
                  : 'bg-white text-[#52708A] border border-[#D9E2EC] hover:bg-[#F5F9FD]'
              }`}
            >
              All 12 Schools
            </button>
            <button
              type="button"
              onClick={() => setFilterActiveOnly(true)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterActiveOnly
                  ? 'bg-[#0057B8] text-white shadow-xs'
                  : 'bg-white text-[#52708A] border border-[#D9E2EC] hover:bg-[#F5F9FD]'
              }`}
            >
              With Active Vacancies ({activeSchoolsCount})
            </button>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school or discipline..."
              className="portal-input w-full text-xs pl-9 pr-8 py-2"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71869A] hover:text-[#123B5D] p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Schools Cards Grid (Design Rule 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                className={`rounded-[14px] p-5 border transition-all duration-200 flex flex-col justify-between ${
                  hasRequirement
                    ? 'bg-white border-[#D9E2EC] hover:border-[#BFDDF5] hover:shadow-md hover:-translate-y-0.5 cursor-pointer group'
                    : 'bg-[#F1F3F5] border-[#D9E2EC] opacity-75 cursor-default'
                }`}
              >
                <div className="flex flex-col gap-3">
                  {/* Top Icon + Badge Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                        hasRequirement
                          ? 'bg-[#EAF4FF] text-[#0057B8] group-hover:scale-105'
                          : 'bg-[#E2E8F0] text-[#71808D]'
                      }`}
                    >
                      {renderSchoolIcon(school.id, hasRequirement)}
                    </div>

                    {/* Status Badge (Rule 10: OPEN vs CLOSED) */}
                    {hasRequirement ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F8F2] text-[#16865F] text-[11px] font-semibold tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#19B87A] animate-pulse" />
                        <span>{openPos} Openings</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F1F3F5] text-[#71808D] text-[10px] font-medium uppercase">
                        No Openings
                      </span>
                    )}
                  </div>

                  {/* School Title & Stream */}
                  <div>
                    <span className="text-[11px] uppercase font-semibold text-[#71869A] tracking-wider block">
                      {school.streamLabel}
                    </span>
                    <h3
                      className={`text-base font-bold transition-colors line-clamp-1 mt-0.5 ${
                        hasRequirement ? 'text-[#003B68] group-hover:text-[#0057B8]' : 'text-[#71808D]'
                      }`}
                    >
                      {school.name}
                    </h3>
                  </div>

                  {/* Description (Rule 12: #52708A) */}
                  <p className="text-xs text-[#52708A] line-clamp-2 leading-relaxed">
                    {school.description}
                  </p>
                </div>

                {/* Bottom Academic Metrics & Action Button */}
                <div className="pt-4 mt-3 border-t border-[#D9E2EC]/70 flex items-center justify-between">
                  <span className="text-xs text-[#52708A] font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#71869A]" />
                    <span>{courseCount} Programs</span>
                  </span>

                  {hasRequirement ? (
                    <span className="text-xs font-semibold text-[#0057B8] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Posts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#71808D]">Position Filled</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Institutional Accreditation Note */}
        <div className="mt-4 p-4 rounded-xl bg-white border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#52708A]">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#0057B8] shrink-0" />
            <span>
              All faculty appointments are conducted strictly in accordance with UGC Regulations 2018 & respective statutory councils (AICTE, PCI, BCI, DGS).
            </span>
          </div>
          <span className="text-[#0057B8] font-semibold shrink-0">
            Pay Band: 7th CPC Scales
          </span>
        </div>
      </div>
    </div>
  );
};
