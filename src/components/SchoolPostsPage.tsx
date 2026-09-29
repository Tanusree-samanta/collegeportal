import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  ArrowRight,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  BookOpen,
  GraduationCap,
  Building2,
  X,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { School, VacantPosition } from '../types';
import { VACANT_POSITIONS_DATA } from '../data/positions';

interface SchoolPostsPageProps {
  school: School | null;
  onSelectPosition: (position: VacantPosition) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
}

export const SchoolPostsPage: React.FC<SchoolPostsPageProps> = ({
  school,
  onSelectPosition,
  onNavigateHome,
  onNavigateSchools,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCadreFilter, setSelectedCadreFilter] = useState<string>('all');

  // Filter positions belonging to the selected school
  const schoolPositions = useMemo(() => {
    if (!school) return VACANT_POSITIONS_DATA.slice(0, 4);
    const matched = VACANT_POSITIONS_DATA.filter((p) => p.schoolId === school.id);
    if (matched.length === 0) {
      return VACANT_POSITIONS_DATA.slice(0, 3);
    }
    return matched;
  }, [school]);

  // Cadre filter options derived dynamically
  const cadreOptions = useMemo(() => {
    const set = new Set<string>();
    schoolPositions.forEach((pos) => {
      if (pos.cadre.toLowerCase().includes('chair')) set.add('Chair Professor');
      if (pos.cadre.toLowerCase().includes('professor') && !pos.cadre.toLowerCase().includes('associate') && !pos.cadre.toLowerCase().includes('assistant')) {
        set.add('Professor');
      }
      if (pos.cadre.toLowerCase().includes('associate')) set.add('Associate Professor');
      if (pos.cadre.toLowerCase().includes('assistant') || pos.cadre.toLowerCase().includes('lecturer')) {
        set.add('Assistant Professor');
      }
    });
    return Array.from(set);
  }, [schoolPositions]);

  // Filtered positions based on search & cadre filter
  const filteredPositions = useMemo(() => {
    return schoolPositions.filter((pos) => {
      // Cadre filter
      if (selectedCadreFilter !== 'all') {
        const cLower = pos.cadre.toLowerCase();
        if (selectedCadreFilter === 'Chair Professor' && !cLower.includes('chair')) return false;
        if (selectedCadreFilter === 'Professor' && (!cLower.includes('professor') || cLower.includes('associate') || cLower.includes('assistant'))) return false;
        if (selectedCadreFilter === 'Associate Professor' && !cLower.includes('associate')) return false;
        if (selectedCadreFilter === 'Assistant Professor' && !cLower.includes('assistant') && !cLower.includes('lecturer')) return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        pos.area.toLowerCase().includes(q) ||
        pos.department.toLowerCase().includes(q) ||
        pos.cadre.toLowerCase().includes(q) ||
        pos.description.toLowerCase().includes(q) ||
        pos.preferredSkills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [schoolPositions, selectedCadreFilter, searchQuery]);

  // Total openings count for this school
  const totalOpenings = schoolPositions.reduce((acc, curr) => acc + (curr.vacancyCount || 1), 0);

  return (
    <div className="w-full min-h-screen bg-[#F7F9FC] pb-16 page-enter">
      {/* 1. Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-[#D9E2EC] px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#52708A]">
              <li className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="breadcrumb-link inline-flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#0057B8]" />
                  <span>Home</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
              </li>
              <li className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateSchools}
                  className="breadcrumb-link font-medium cursor-pointer"
                >
                  Schools Directory
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
              </li>
              <li className="inline-flex items-center text-[#0057B8] font-bold truncate max-w-[200px] sm:max-w-xs">
                <span>{school ? school.name : 'Open Positions'}</span>
              </li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={onNavigateSchools}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0057B8] hover:underline cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to All Schools</span>
            <span className="sm:hidden">Schools</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-col gap-6">
        {/* 2. School Header Card */}
        <section className="bg-white rounded-[14px] p-6 sm:p-8 border border-[#D9E2EC] shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold uppercase tracking-wider border border-[#BFDDF5]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{school?.streamLabel || 'Academic School'}</span>
              </span>

              {/* Status Badge (Rule 10: OPEN / ACTIVE) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F2] text-[#16865F] text-xs font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-[#19B87A] animate-pulse" />
                <span>{totalOpenings} Active Vacancies Across {schoolPositions.length} Posts</span>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#003B68] font-bold tracking-tight">
                {school?.name || 'Academic Positions'}
              </h1>
              <p className="text-sm sm:text-base text-[#52708A] max-w-3xl leading-relaxed">
                {school?.description}
              </p>
            </div>

            {/* School Highlights / Dean Note */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#D9E2EC] text-xs text-[#52708A]">
              {school?.deanName && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0057B8] shrink-0" />
                  <span>
                    <strong className="text-[#123B5D]">Dean:</strong> {school.deanName}
                  </span>
                </div>
              )}
              {school?.courseCount && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0057B8] shrink-0" />
                  <span>
                    <strong className="text-[#123B5D]">Academic Offerings:</strong> {school.courseCount} Accredited Programs
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0057B8] shrink-0" />
                <span>
                  <strong className="text-[#123B5D]">Campus:</strong> Sarisha, South 24 Pgs, WB
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Filter & Search Controls */}
        <section className="bg-white rounded-[14px] p-4 border border-[#D9E2EC] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Cadre Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCadreFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCadreFilter === 'all'
                  ? 'bg-[#0057B8] text-white shadow-xs'
                  : 'bg-[#F5F9FD] text-[#52708A] border border-[#D9E2EC] hover:bg-[#EAF4FF] hover:text-[#0057B8]'
              }`}
            >
              All Posts ({schoolPositions.length})
            </button>

            {cadreOptions.map((cadre) => (
              <button
                key={cadre}
                type="button"
                onClick={() => setSelectedCadreFilter(cadre)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCadreFilter === cadre
                    ? 'bg-[#0057B8] text-white shadow-xs'
                    : 'bg-[#F5F9FD] text-[#52708A] border border-[#D9E2EC] hover:bg-[#EAF4FF] hover:text-[#0057B8]'
                }`}
              >
                {cadre}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialization, area, skills..."
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
        </section>

        {/* 4. Posts Listing */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#003B68] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0057B8]" />
              <span>Available Academic Positions ({filteredPositions.length})</span>
            </h2>
            <span className="text-xs text-[#71869A]">
              Click any position to review requirements & submit application
            </span>
          </div>

          {filteredPositions.length === 0 ? (
            <div className="bg-white rounded-[14px] p-12 text-center border border-[#D9E2EC] flex flex-col items-center gap-3">
              <Briefcase className="w-10 h-10 text-[#71869A]" />
              <h3 className="text-base font-bold text-[#003B68]">No Matching Positions Found</h3>
              <p className="text-xs text-[#52708A] max-w-sm">
                No active openings match your current search filters. Try clearing your search query or selecting "All Posts".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCadreFilter('all');
                }}
                className="btn-primary-portal mt-2 px-4 py-2 text-xs"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredPositions.map((position) => (
                <article
                  key={position.id}
                  onClick={() => onSelectPosition(position)}
                  className="bg-white rounded-[14px] p-6 border border-[#D9E2EC] hover:border-[#BFDDF5] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden"
                >
                  {/* Left Color Accent Strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0057B8] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Main Position Info */}
                  <div className="flex-1 flex flex-col gap-3">
                    {/* Cadre & Vacancy Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold tracking-wide border border-[#BFDDF5]">
                        {position.cadre}
                      </span>

                      {/* OPEN status badge (Rule 10) */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F2] text-[#16865F] text-xs font-semibold">
                        <Users className="w-3 h-3 text-[#19B87A]" />
                        <span>{position.vacancyCount} {position.vacancyCount === 1 ? 'Opening' : 'Openings'}</span>
                      </span>

                      {/* PENDING / IMMEDIATE badge (Rule 10) */}
                      {position.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF4DE] text-[#A66A00] text-xs font-semibold">
                          <Sparkles className="w-3 h-3" />
                          <span>Immediate Recruitment</span>
                        </span>
                      )}
                    </div>

                    {/* Position Area Title */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#003B68] group-hover:text-[#0057B8] transition-colors leading-snug">
                        {position.area}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#52708A] mt-0.5">
                        {position.department}
                      </p>
                    </div>

                    {/* Brief description */}
                    <p className="text-xs sm:text-[13px] text-[#52708A] line-clamp-2 leading-relaxed">
                      {position.description}
                    </p>

                    {/* Skill Tags */}
                    {position.preferredSkills && position.preferredSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-[#71869A] mr-1">Skills:</span>
                        {position.preferredSkills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-[#F5F9FD] text-[#123B5D] border border-[#D9E2EC] text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {position.preferredSkills.length > 5 && (
                          <span className="text-[11px] text-[#71869A] font-medium">
                            +{position.preferredSkills.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side: Meta Details & Action Button */}
                  <div className="lg:border-l lg:border-[#D9E2EC] lg:pl-6 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-xs text-[#52708A] lg:text-right">
                      <div className="inline-flex items-center lg:justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0057B8]" />
                        <span>Deadline: <strong className="text-[#123B5D]">{position.deadline}</strong></span>
                      </div>
                      <div className="inline-flex items-center lg:justify-end gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0057B8]" />
                        <span>{position.employmentType.split('•')[0] || 'Full Time'}</span>
                      </div>
                    </div>

                    {/* Action Button: Post Requirement (Rule 4) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPosition(position);
                      }}
                      className="btn-primary-portal w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm cursor-pointer"
                    >
                      <span>View Requirement</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 5. Institutional Support Banner */}
        <section className="bg-white rounded-[14px] p-6 border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0057B8] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#003B68]">Direct Scrutiny by Selection Committee</h4>
              <p className="text-xs text-[#52708A]">
                All dossiers are reviewed strictly under UGC 2018 & AICTE 7th CPC academic appointment criteria.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onNavigateSchools}
            className="btn-secondary-portal px-4 py-2 text-xs whitespace-nowrap cursor-pointer"
          >
            Explore Other Schools
          </button>
        </section>
      </div>
    </div>
  );
};
