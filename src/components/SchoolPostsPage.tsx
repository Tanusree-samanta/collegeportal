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
    // If no direct matches, return general positions matching school discipline
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
    <div className="w-full min-h-screen bg-[#F8F5EF] pb-16">
      {/* 1. Breadcrumb Bar */}
      <div className="w-full bg-white/80 backdrop-blur-xs border-b border-[#C9A96E]/20 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#625B58]">
              <li className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#6B1F2A] transition-colors inline-flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Home</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
              </li>
              <li className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateSchools}
                  className="hover:text-[#6B1F2A] transition-colors font-semibold cursor-pointer"
                >
                  Schools Directory
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
              </li>
              <li className="inline-flex items-center text-[#6B1F2A] font-bold truncate max-w-[200px] sm:max-w-xs">
                <span>{school ? school.name : 'Open Positions'}</span>
              </li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={onNavigateSchools}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B1F2A] hover:underline cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to All Schools</span>
            <span className="sm:hidden">Schools</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-col gap-6">
        {/* 2. School Header Card */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#C9A96E]/30 shadow-xs relative overflow-hidden">
          {/* Subtle decorative background tint */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#6B1F2A]/5 via-amber-500/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B1F2A]/10 text-[#6B1F2A] text-xs font-bold uppercase tracking-wider border border-[#6B1F2A]/20">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{school?.streamLabel || 'Academic School'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{totalOpenings} Active Vacancies Across {schoolPositions.length} Posts</span>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241F20] font-bold tracking-tight">
                {school?.name || 'Academic Positions'}
              </h1>
              <p className="text-sm sm:text-base text-[#625B58] max-w-3xl leading-relaxed">
                {school?.description}
              </p>
            </div>

            {/* School Highlights / Dean Note */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-xs text-[#625B58]">
              {school?.deanName && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>
                    <strong className="text-[#241F20]">Dean:</strong> {school.deanName}
                  </span>
                </div>
              )}
              {school?.courseCount && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>
                    <strong className="text-[#241F20]">Academic Offerings:</strong> {school.courseCount} Accredited Programs
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>
                  <strong className="text-[#241F20]">Campus:</strong> Sarisha, South 24 Pgs, WB
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Filter & Search Controls */}
        <section className="bg-white rounded-xl p-4 border border-[#C9A96E]/25 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Cadre Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCadreFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCadreFilter === 'all'
                  ? 'bg-[#6B1F2A] text-white shadow-2xs'
                  : 'bg-gray-100 text-[#625B58] hover:bg-gray-200/70'
              }`}
            >
              All Posts ({schoolPositions.length})
            </button>

            {cadreOptions.map((cadre) => (
              <button
                key={cadre}
                type="button"
                onClick={() => setSelectedCadreFilter(cadre)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCadreFilter === cadre
                    ? 'bg-[#6B1F2A] text-white shadow-2xs'
                    : 'bg-gray-100 text-[#625B58] hover:bg-gray-200/70'
                }`}
              >
                {cadre}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialization, area, skills..."
              className="w-full text-xs bg-gray-50/80 border border-gray-200 rounded-lg pl-9 pr-8 py-2 text-[#241F20] focus:outline-none focus:border-[#6B1F2A] focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* 4. Posts Listing */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6B1F2A] flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Available Academic Positions ({filteredPositions.length})</span>
            </h2>
            <span className="text-xs text-gray-500">
              Click any position to review requirements & submit application
            </span>
          </div>

          {filteredPositions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 flex flex-col items-center gap-3">
              <Briefcase className="w-10 h-10 text-gray-300" />
              <h3 className="text-base font-bold text-[#241F20]">No Matching Positions Found</h3>
              <p className="text-xs text-gray-500 max-w-sm">
                No active openings match your current search filters. Try clearing your search query or selecting "All Posts".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCadreFilter('all');
                }}
                className="mt-2 px-4 py-2 bg-[#6B1F2A] text-white rounded-lg text-xs font-semibold hover:bg-[#521720] transition-colors cursor-pointer"
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
                  className="bg-white rounded-2xl p-6 border border-[#C9A96E]/30 hover:border-[#6B1F2A] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden"
                >
                  {/* Left Color Accent Strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#6B1F2A] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Main Position Info */}
                  <div className="flex-1 flex flex-col gap-3">
                    {/* Cadre & Vacancy Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#6B1F2A]/10 text-[#6B1F2A] text-xs font-bold tracking-wide">
                        {position.cadre}
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <Users className="w-3 h-3" />
                        <span>{position.vacancyCount} {position.vacancyCount === 1 ? 'Opening' : 'Openings'}</span>
                      </span>

                      {position.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Immediate Recruitment</span>
                        </span>
                      )}
                    </div>

                    {/* Position Area Title */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#241F20] group-hover:text-[#6B1F2A] transition-colors leading-snug">
                        {position.area}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">
                        {position.department}
                      </p>
                    </div>

                    {/* Brief description */}
                    <p className="text-xs sm:text-[13px] text-[#625B58] line-clamp-2 leading-relaxed">
                      {position.description}
                    </p>

                    {/* Skill Tags */}
                    {position.preferredSkills && position.preferredSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-gray-500 mr-1">Skills:</span>
                        {position.preferredSkills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {position.preferredSkills.length > 5 && (
                          <span className="text-[11px] text-gray-400 font-medium">
                            +{position.preferredSkills.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side: Meta Details & Action Button */}
                  <div className="lg:border-l lg:border-gray-100 lg:pl-6 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-xs text-gray-500 lg:text-right">
                      <div className="inline-flex items-center lg:justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>Deadline: <strong className="text-gray-700">{position.deadline}</strong></span>
                      </div>
                      <div className="inline-flex items-center lg:justify-end gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>{position.employmentType.split('•')[0] || 'Full Time'}</span>
                      </div>
                    </div>

                    {/* Action Button: Post Requirement */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPosition(position);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B1F2A] hover:bg-[#521720] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer group-hover:bg-[#521720]"
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
        <section className="bg-gradient-to-r from-amber-50/70 via-white to-amber-50/50 rounded-2xl p-6 border border-[#C9A96E]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6B1F2A]/10 text-[#6B1F2A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#241F20]">Direct Scrutiny by Selection Committee</h4>
              <p className="text-xs text-gray-600">
                All dossiers are reviewed strictly under UGC 2018 & AICTE 7th CPC academic appointment criteria.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onNavigateSchools}
            className="px-4 py-2 border border-[#6B1F2A] text-[#6B1F2A] hover:bg-[#6B1F2A] hover:text-white rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
          >
            Explore Other Schools
          </button>
        </section>
      </div>
    </div>
  );
};
