import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
  Code2,
  Shield,
  BarChart3,
  Cpu,
  X,
  ArrowLeft,
} from 'lucide-react';
import { VACANT_POSITIONS_DATA } from '../data/positions';
import { School, VacantPosition } from '../types';

interface VacantPositionsPageProps {
  school?: School | null;
  onSelectPosition: (position: VacantPosition) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
}

export const VacantPositionsPage: React.FC<VacantPositionsPageProps> = ({
  school,
  onSelectPosition,
  onNavigateHome,
  onNavigateSchools,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const schoolName = school?.name || 'School of Technology';
  const schoolId = school?.id || 'school-of-technology';

  const schoolPositions = useMemo(() => {
    const matched = VACANT_POSITIONS_DATA.filter((p) => p.schoolId === schoolId);
    if (matched.length > 0) return matched;
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
        return <Code2 className="w-5 h-5 text-[#6B1F2A]" />;
      case 'pos-cyber':
        return <Shield className="w-5 h-5 text-[#6B1F2A]" />;
      case 'pos-data-science':
        return <BarChart3 className="w-5 h-5 text-[#6B1F2A]" />;
      case 'pos-robotics':
        return <Cpu className="w-5 h-5 text-[#6B1F2A]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#6B1F2A]" />;
    }
  };

  return (
    <div className="w-full bg-[#F8F5EF] min-h-[calc(100vh-64px)] pb-16 select-none page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col gap-4 sm:gap-6">
        {/* Breadcrumb Navigation: Manrope 600 13-14px */}
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
                Schools Directory
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
            </li>
            <li className="text-[#6B1F2A] font-bold">Vacant Posts</li>
          </ol>
        </nav>

        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateSchools}
            className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-[#625B58] hover:text-[#6B1F2A] bg-white px-3.5 py-1.5 rounded-lg border border-[#C9A96E]/40 shadow-xs cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Schools Directory</span>
          </button>
          <span className="text-[12px] font-bold text-[#6B1F2A] bg-[#6B1F2A]/10 px-3 py-1 rounded-full border border-[#6B1F2A]/20 tracking-wide uppercase">
            {totalVacancies} Vacancies Listed
          </span>
        </div>

        {/* Editorial Masthead */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C9A96E]/40 shadow-xs w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B7340] animate-status-dot" />
            <span className="text-[11px] sm:text-[12px] text-[#6B1F2A] font-bold tracking-wider uppercase">
              {schoolName} • 7th CPC Scale
            </span>
          </div>

          {/* Section Heading: DM Serif Display, Font weight 400 */}
          <h1 className="font-serif-tnu font-normal text-2xl sm:text-3xl md:text-4xl text-[#241F20] tracking-[-0.01em]">
            Open Faculty Positions
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#625B58] leading-[1.6] font-normal">
            Inviting qualified scholars, professors, and industry leaders to join our esteemed faculty. Review position criteria and submit your candidature.
          </p>
        </div>

        {/* Cadre Filter Buttons & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Cadres' },
              { id: 'professor', label: 'Professors' },
              { id: 'associate', label: 'Associate Prof.' },
              { id: 'assistant', label: 'Assistant Prof.' },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-bold transition-all cursor-pointer ${
                  selectedFilter === filter.id
                    ? 'bg-[#6B1F2A] text-white shadow-xs'
                    : 'bg-white text-[#625B58] border border-[#C9A96E]/40 hover:bg-[#F8F5EF]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A817C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, subject, post..."
              className="w-full bg-white text-[#241F20] text-[14px] font-normal pl-9 pr-3 py-2 rounded-xl border border-[#C9A96E]/40 shadow-2xs placeholder:text-[#8A817C] focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A817C] hover:text-[#241F20] p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Position Cards Listing */}
        <div className="space-y-4">
          {filteredPositions.map((pos) => (
            <article
              key={pos.id}
              onClick={() => onSelectPosition(pos)}
              className="glass-panel p-5 rounded-[18px] bg-white border border-[#C9A96E]/40 hover:border-[#6B1F2A]/50 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col gap-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#6B1F2A]/10 border border-[#6B1F2A]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                    {getPositionIcon(pos.id)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase font-bold text-[#C9A96E] tracking-wider block">
                      {pos.department}
                    </span>
                    {/* Position Heading: DM Serif Display, Font weight 400 */}
                    <h2 className="font-serif-tnu font-normal text-lg sm:text-xl text-[#241F20] group-hover:text-[#6B1F2A] transition-colors leading-snug">
                      {pos.cadre}
                    </h2>
                    <span className="text-[13px] font-medium text-[#625B58]">
                      Specialization Area: {pos.area}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start shrink-0">
                  {/* Status Badge: Manrope 700 11-12px slightly increased letter spacing */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1B7340]/10 text-[#1B7340] border border-[#1B7340]/25 text-[11px] font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B7340] animate-status-dot" />
                    <span>OPEN • {pos.vacancyCount} Posts</span>
                  </span>
                </div>
              </div>

              <p className="text-[14px] text-[#625B58] leading-[1.6] line-clamp-2 font-normal">
                {pos.description}
              </p>

              {/* Meta Chips Row: Manrope 500 12-13px */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-medium bg-[#F8F5EF] text-[#625B58] px-2.5 py-1 rounded-lg border border-[#EEE9DF]">
                  <Briefcase className="w-3.5 h-3.5 text-[#6B1F2A]" />
                  <span>{pos.employmentType || 'Full-Time (7th CPC)'}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-medium bg-[#F8F5EF] text-[#625B58] px-2.5 py-1 rounded-lg border border-[#EEE9DF]">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Deadline: {pos.deadline}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-medium bg-[#F8F5EF] text-[#625B58] px-2.5 py-1 rounded-lg border border-[#EEE9DF]">
                  <MapPin className="w-3.5 h-3.5 text-[#6B1F2A]" />
                  <span>{pos.location}</span>
                </span>
              </div>

              {/* Focus tags and CTA Button: Manrope 700 14px */}
              <div className="pt-2 border-t border-[#EEE9DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-[#8A817C] uppercase tracking-wider">Focus:</span>
                  {pos.preferredSkills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-white text-[#241F20] px-2 py-0.5 rounded-md border border-[#C9A96E]/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {pos.preferredSkills.length > 3 && (
                    <span className="text-[11px] text-[#8A817C] font-medium">
                      +{pos.preferredSkills.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPosition(pos);
                  }}
                  className="btn-primary-tnu inline-flex items-center justify-center gap-1.5 text-[14px] font-bold py-2 px-4 shadow-2xs group cursor-pointer self-end sm:self-auto"
                >
                  <span>View Position Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
