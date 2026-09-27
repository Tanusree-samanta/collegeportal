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
  GraduationCap,
  Code2,
  Shield,
  BarChart3,
  Cpu,
  X,
} from 'lucide-react';
import { VACANT_POSITIONS_DATA } from '../data/positions';
import { VacantPosition } from '../types';

interface VacantPositionsPageProps {
  onSelectPosition: (position: VacantPosition) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
}

export const VacantPositionsPage: React.FC<VacantPositionsPageProps> = ({
  onSelectPosition,
  onNavigateHome,
  onNavigateSchools,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Vacancies' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'cyber', label: 'Cyber Security' },
    { id: 'data', label: 'Data Science' },
    { id: 'robotics', label: 'Robotics & IoT' },
  ];

  const filteredPositions = useMemo(() => {
    return VACANT_POSITIONS_DATA.filter((pos) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        pos.cadre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.preferredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCategory = true;
      if (selectedCategory === 'ai') matchesCategory = pos.id === 'pos-ai-ml';
      else if (selectedCategory === 'cyber') matchesCategory = pos.id === 'pos-cyber';
      else if (selectedCategory === 'data') matchesCategory = pos.id === 'pos-data-science';
      else if (selectedCategory === 'robotics') matchesCategory = pos.id === 'pos-robotics';

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalVacancies = VACANT_POSITIONS_DATA.reduce((sum, p) => sum + p.vacancyCount, 0);

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
    <div className="w-full min-h-[calc(100vh-64px)] pb-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-4 sm:gap-6">
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
            <li className="inline-flex items-center text-[#D83232] font-bold">
              <span>Opened Vacancies</span>
            </li>
          </ol>
        </nav>

        {/* Editorial Masthead */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#D83232] inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#765331]">
              School of Technology • Hiring Cycle 2026–2027
            </span>
          </div>
          <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl font-bold text-[#292727] tracking-tight">
            Opened & Vacant Faculty Positions
          </h1>
          <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed">
            The Neotia University invites distinguished academicians and researchers for active vacancies across professorial cadres. Review the vacant positions below and click to inspect complete requirements and apply.
          </p>
        </div>

        {/* Vacancy Roster Quick Metrics Callout (Glass Panel) */}
        <div className="glass-panel p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_6px_24px_rgba(41,39,39,0.04)]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#D83232] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-[#292727]">
                  {totalVacancies} Active Faculty Openings
                </span>
                <span className="text-[10px] bg-[#D83232]/10 border border-[#D83232]/20 text-[#D83232] font-bold px-2.5 py-0.5 rounded-full">
                  Applications Open
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#765331] truncate">
                Computer Science, AI, Cloud Infrastructure, Data Intelligence & Robotics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 text-xs text-[#4A351F] bg-white/80 border border-[#D9CC86]/50 px-3 py-1.5 rounded-xl shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#D83232]" />
            <span className="font-medium">Sarisha Campus, WB</span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#765331]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vacant posts by specialization, skills (e.g. Machine Learning, Python, Cyber)..."
              className="glass-input w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 shadow-2xs placeholder:text-[#765331]/60"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#765331] hover:text-[#292727] p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                  selectedCategory === cat.id
                    ? 'btn-primary-tnu'
                    : 'btn-secondary-tnu'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vacant Position Cards List (Glass Cards with Sheen) */}
        <div className="flex flex-col gap-4">
          {filteredPositions.map((pos, index) => (
            <article
              key={pos.id}
              style={{ animationDelay: `${index * 45}ms` }}
              className={`glass-panel glass-card-hover glass-sheen overflow-hidden relative page-enter p-0 ${
                pos.isFeatured
                  ? 'border-2 border-[#D83232]/75 ring-1 ring-[#D83232]/20'
                  : ''
              }`}
            >
              {pos.isFeatured && (
                <div className="bg-[#D83232] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D9CC86]" />
                    Featured Professorial Opening
                  </span>
                  <span>Rolling Review</span>
                </div>
              )}

              <div className="p-4 sm:p-5 flex flex-col gap-3.5">
                {/* Header: Title, Department & Vacancy Badge */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#D83232]/10 border border-[#D83232]/25 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {getPositionIcon(pos.id)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                        {pos.department}
                      </span>
                      <h2 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727] leading-tight">
                        {pos.cadre}
                      </h2>
                      <span className="text-xs sm:text-sm font-bold text-[#D83232] mt-0.5">
                        Focus: {pos.area}
                      </span>
                    </div>
                  </div>

                  {/* Vacancy Count Badge with Status Dot */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-status-dot" />
                      {pos.vacancyCount} {pos.vacancyCount > 1 ? 'Posts Vacant' : 'Post Vacant'}
                    </span>
                    <span className="text-[10px] text-[#765331] font-medium hidden sm:inline">
                      {pos.employmentType.split('•')[0]}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed">
                  {pos.description}
                </p>

                {/* Qualifications Summary */}
                <div className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-3 text-xs flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#765331]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#D83232]" />
                    <span>Eligibility & Educational Qualification</span>
                  </div>
                  <span className="text-[#292727] font-medium leading-relaxed">
                    {pos.qualificationsOverview}
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-bold text-[#765331] uppercase tracking-wider mr-1">
                    Specializations:
                  </span>
                  {pos.preferredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-white/70 text-[#292727] border border-[#D9CC86]/45 text-[11px] font-medium shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer Metadata & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-[#D9CC86]/35">
                  <div className="flex items-center gap-3 text-xs text-[#765331]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B69A62]" />
                      <span>Deadline: <strong className="text-[#292727]">{pos.deadline}</strong></span>
                    </div>
                    <span className="text-[#B69A62]">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B69A62]" />
                      <span>Sarisha Campus</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPosition(pos)}
                    className="btn-primary-tnu w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap group"
                  >
                    <span>View Post Requirements & Apply</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredPositions.length === 0 && (
          <div className="glass-panel flex flex-col items-center justify-center py-10 px-4 text-center">
            <Briefcase className="w-10 h-10 text-[#765331]/40 mb-2" />
            <h3 className="font-bold text-sm sm:text-base text-[#292727]">
              No vacant positions match your filter
            </h3>
            <p className="text-xs text-[#765331] max-w-xs mt-1">
              Try adjusting your keywords or reset categories to view all active openings in the School of Technology.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn-secondary-tnu mt-3 px-4 py-2 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Institutional Academic Norms Policy Card (Glass Panel) */}
        <div className="glass-panel p-4 text-xs text-[#5B403D] flex flex-col gap-2 shadow-[0_6px_20px_rgba(41,39,39,0.03)]">
          <div className="flex items-center gap-2 text-[#765331] font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#D83232]" />
            <span className="text-[#292727]">UGC & AICTE Cadre Compliance</span>
          </div>
          <p className="leading-relaxed">
            All appointments conform to the pay scale and service rules specified by the UGC/AICTE Regulations. In addition to 7th CPC basic pay and allowances, selected candidates are eligible for seed research grants up to ₹10 Lakhs, faculty housing on campus, and performance-linked scholarly incentives.
          </p>
        </div>
      </div>
    </div>
  );
};
