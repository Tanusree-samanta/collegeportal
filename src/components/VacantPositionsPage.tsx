import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Code2,
  Shield,
  BarChart3,
  Cpu,
  X,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { VACANT_POSITIONS_DATA } from '../data/positions';
import { School, VacantPosition } from '../types';

interface VacantPositionsPageProps {
  school?: School | null;
  onSelectPosition: (position: VacantPosition) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  onNavigateSchoolDetail?: () => void;
}

export const VacantPositionsPage: React.FC<VacantPositionsPageProps> = ({
  school,
  onSelectPosition,
  onNavigateHome,
  onNavigateSchools,
  onNavigateSchoolDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const schoolName = school?.name || 'School of Technology';
  const schoolId = school?.id || 'school-of-technology';

  const schoolPositions = useMemo(() => {
    const matched = VACANT_POSITIONS_DATA.filter((p) => p.schoolId === schoolId);
    if (matched.length > 0) return matched;
    // fallback if a new school is added without explicit positions
    return VACANT_POSITIONS_DATA;
  }, [schoolId]);

  const filteredPositions = useMemo(() => {
    return schoolPositions.filter((pos) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pos.cadre.toLowerCase().includes(q) ||
        pos.area.toLowerCase().includes(q) ||
        pos.department.toLowerCase().includes(q) ||
        pos.description.toLowerCase().includes(q) ||
        pos.preferredSkills.some((s) => s.toLowerCase().includes(q));

      let matchesFilter = true;
      if (selectedFilter === 'professor') {
        matchesFilter = pos.cadre.toLowerCase().includes('professor') && !pos.cadre.toLowerCase().includes('assistant');
      } else if (selectedFilter === 'associate') {
        matchesFilter = pos.cadre.toLowerCase().includes('associate');
      } else if (selectedFilter === 'assistant') {
        matchesFilter = pos.cadre.toLowerCase().includes('assistant') || pos.cadre.toLowerCase().includes('lecturer');
      }

      return matchesSearch && matchesFilter;
    });
  }, [schoolPositions, searchQuery, selectedFilter]);

  const totalVacancies = schoolPositions.reduce((sum, p) => sum + p.vacancyCount, 0);

  const getPositionIcon = (id: string) => {
    switch (id) {
      case 'pos-ai-ml':
        return <Code2 className="w-5 h-5 text-[#D83232]" />;
      case 'pos-cyber':
        return <Shield className="w-5 h-5 text-[#D83232]" />;
      case 'pos-data-science':
        return <BarChart3 className="w-5 h-5 text-[#D83232]" />;
      case 'pos-robotics':
        return <Cpu className="w-5 h-5 text-[#D83232]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#D83232]" />;
    }
  };

  return (
    <div className="w-full bg-[#F8F6F0] min-h-[calc(100vh-64px)] pb-16 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col gap-4 sm:gap-6">
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
              <button
                type="button"
                onClick={onNavigateSchools}
                className="hover:text-[#D83232] transition-colors font-medium cursor-pointer"
              >
                Schools Directory
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
            </li>
            {onNavigateSchoolDetail && school && (
              <li className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateSchoolDetail}
                  className="hover:text-[#D83232] transition-colors font-medium cursor-pointer max-w-xs truncate"
                >
                  {school.name}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
              </li>
            )}
            <li className="text-[#D83232] font-bold">Vacant Posts</li>
          </ol>
        </nav>

        {/* Top Back to School Info Link */}
        {onNavigateSchoolDetail && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateSchoolDetail}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#765331] hover:text-[#D83232] bg-white px-3 py-1.5 rounded-lg border border-[#D9CC86]/50 shadow-xs cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to School Information & Courses</span>
            </button>
            <span className="text-xs font-semibold text-[#765331]">
              {totalVacancies} Vacancies Listed
            </span>
          </div>
        )}

        {/* Editorial Masthead */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#D83232] inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#765331]">
              {schoolName} • Recruitment Cycle 2026–2027
            </span>
          </div>
          <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl font-bold text-[#292727] tracking-tight">
            Vacant Faculty Positions
          </h1>
          <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed max-w-3xl">
            Select a position below to view complete post requirements, qualification norms, pay band, and access the 4-step application form.
          </p>
        </div>

        {/* Search & Cadre Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#765331]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vacant positions by title, specialization, or skills..."
              className="w-full bg-white text-[#292727] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-[#D9CC86]/50 shadow-2xs placeholder:text-[#765331]/60 focus:outline-none focus:border-[#D83232] focus:ring-1 focus:ring-[#D83232]"
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

          <div className="flex items-center gap-1.5 flex-wrap">
            {['all', 'assistant', 'associate', 'professor'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#D83232] text-white shadow-xs'
                    : 'bg-white text-[#765331] border border-[#D9CC86]/50 hover:bg-[#FAF8F5]'
                }`}
              >
                {cat === 'all' ? 'All Cadres' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vacant Positions Cards List */}
        <div className="flex flex-col gap-4">
          {filteredPositions.map((position) => (
            <article
              key={position.id}
              onClick={() => onSelectPosition(position)}
              className="bg-white rounded-xl border border-[#D9CC86]/70 shadow-xs hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col gap-3 group cursor-pointer hover:border-[#D83232]/60"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#D9CC86]/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getPositionIcon(position.id)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B69A62]/15 text-[#765331] uppercase tracking-wider">
                        {position.department}
                      </span>
                      {position.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#D83232] bg-[#D83232]/10 border border-[#D83232]/20 px-2 py-0.5 rounded-full uppercase">
                          <Sparkles className="w-3 h-3" /> Priority Hiring
                        </span>
                      )}
                    </div>
                    <h2 className="font-bold text-base sm:text-lg text-[#292727] group-hover:text-[#D83232] transition-colors leading-snug">
                      {position.area}
                    </h2>
                    <div className="text-xs font-semibold text-[#765331]">
                      Cadre: {position.cadre}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1">
                  <span className="text-xs font-bold text-[#D83232] bg-[#D83232]/10 border border-[#D83232]/20 px-2.5 py-1 rounded-full">
                    {position.vacancyCount} {position.vacancyCount === 1 ? 'Vacancy' : 'Vacancies'}
                  </span>
                  <span className="text-[11px] text-[#765331]">
                    Deadline: {position.deadline}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5B403D] leading-relaxed line-clamp-2">
                {position.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {position.preferredSkills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FAF8F5] text-[#765331] border border-[#EBE6DF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 border-t border-[#EBE6DF] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#765331] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B69A62]" />
                  <span>Sarisha Campus • 7th CPC Scale</span>
                </span>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D83232] group-hover:translate-x-0.5 transition-transform">
                  <span>View Post Details & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <div className="bg-white p-8 rounded-xl border border-[#D9CC86]/50 text-center space-y-2">
            <h3 className="font-bold text-sm text-[#292727]">No positions found</h3>
            <p className="text-xs text-[#765331]">Try clearing your search query or switching cadre filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D9CC86] text-xs font-bold text-[#D83232] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
