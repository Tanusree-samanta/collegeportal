import React, { useState, useMemo } from 'react';
import {
  Search,
  Briefcase,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Clock,
  ArrowRight,
  Filter,
  X,
  Sparkles,
  Users,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { VacantPosition } from '../../types';
import { VACANT_POSITIONS_DATA } from '../../data/positions';
import { SCHOOLS_DATA } from '../../data/schools';

interface CandidateOpenPositionsViewProps {
  onSelectPositionDetails: (position: VacantPosition) => void;
  onApplyPosition: (position: VacantPosition) => void;
}

export const CandidateOpenPositionsView: React.FC<CandidateOpenPositionsViewProps> = ({
  onSelectPositionDetails,
  onApplyPosition,
}) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPositionType, setSelectedPositionType] = useState<string>('All');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Derived filtered positions
  const filteredPositions = useMemo(() => {
    return VACANT_POSITIONS_DATA.filter((pos) => {
      // 1. Position Type filter
      const posType = pos.positionType || 'Faculty';
      if (selectedPositionType !== 'All' && posType !== selectedPositionType) {
        return false;
      }

      // 2. School filter
      if (selectedSchool !== 'All') {
        if (pos.schoolId !== selectedSchool) return false;
      }

      // 3. Employment Type filter
      if (selectedEmploymentType !== 'All') {
        if (!pos.employmentType.toLowerCase().includes(selectedEmploymentType.toLowerCase())) {
          return false;
        }
      }

      // 4. Experience filter
      if (selectedExperience !== 'All') {
        const expStr = (pos.experienceRequired || pos.qualificationsOverview).toLowerCase();
        if (selectedExperience === 'Fresher / Entry' && !expStr.includes('0') && !expStr.includes('fresher') && !expStr.includes('entry')) {
          return false;
        }
        if (selectedExperience === 'Senior / Chair' && !expStr.includes('10') && !expStr.includes('senior') && !expStr.includes('chair')) {
          return false;
        }
      }

      // 5. Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        pos.area.toLowerCase().includes(q) ||
        pos.cadre.toLowerCase().includes(q) ||
        pos.department.toLowerCase().includes(q) ||
        pos.description.toLowerCase().includes(q) ||
        pos.preferredSkills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedPositionType, selectedSchool, selectedEmploymentType, selectedExperience]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPositionType('All');
    setSelectedSchool('All');
    setSelectedEmploymentType('All');
    setSelectedExperience('All');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedPositionType !== 'All' ||
    selectedSchool !== 'All' ||
    selectedEmploymentType !== 'All' ||
    selectedExperience !== 'All';

  return (
    <div className="w-full pb-16 page-enter">
      {/* Editorial Page Header */}
      <div className="bg-white border-b border-[#D9E2EC] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-1 bg-[#0057B8] rounded-full inline-block" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
                Central Recruitment Portal • 2026–2027 Cycle
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#003B68] font-bold font-serif-tnu tracking-tight">
              Current Open Positions
            </h1>
            <p className="text-xs sm:text-sm text-[#52708A] max-w-2xl font-normal leading-relaxed">
              Explore approved academic, technical, and executive vacancies across The Neotia University's 12 schools. Apply directly and track your selection progress.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF4FF] border border-[#BFDDF5] text-xs font-bold text-[#0057B8] self-start md:self-auto shrink-0 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{filteredPositions.length} Open Positions Available</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
        {/* Search & Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D9E2EC] shadow-xs flex flex-col gap-4">
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71869A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, department or keyword (e.g. AI, Cyber, Agronomy)..."
                className="portal-input w-full text-xs sm:text-sm pl-10 pr-9 py-2.5"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869A] hover:text-[#003B68] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFiltersModal(!showFiltersModal)}
              className="btn-secondary-portal sm:hidden px-4 py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#0057B8]" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>
          </div>

          {/* Filters Row (Desktop & Tablet) */}
          <div className="hidden sm:flex flex-wrap items-center gap-3 pt-2 border-t border-[#D9E2EC] text-xs">
            {/* Position Type Filter Pills */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#52708A] uppercase tracking-wider text-[11px] mr-1">
                Type:
              </span>
              {['All', 'Faculty', 'Lab Technician', 'Non-Faculty'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedPositionType(type)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedPositionType === type
                      ? 'bg-[#0057B8] text-white shadow-2xs'
                      : 'bg-[#F7F9FC] text-[#52708A] hover:bg-[#EAF4FF] hover:text-[#0057B8]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-[#D9E2EC] hidden lg:block" />

            {/* School Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#52708A] uppercase tracking-wider text-[11px]">
                School:
              </span>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="portal-input text-xs px-2.5 py-1 bg-white cursor-pointer max-w-[200px]"
              >
                <option value="All">All 12 Schools</option>
                {SCHOOLS_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#52708A] uppercase tracking-wider text-[11px]">
                Cadre:
              </span>
              <select
                value={selectedEmploymentType}
                onChange={(e) => setSelectedEmploymentType(e.target.value)}
                className="portal-input text-xs px-2.5 py-1 bg-white cursor-pointer"
              >
                <option value="All">All Cadres</option>
                <option value="Regular">Regular Academic</option>
                <option value="Professorial Chair">Professorial Chair</option>
                <option value="Technical Cadre">Technical Cadre</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto text-xs font-bold text-[#E02424] hover:underline cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filters Dropdown Drawer */}
        {showFiltersModal && (
          <div className="sm:hidden bg-white p-4 rounded-xl border border-[#D9E2EC] space-y-3 shadow-md animate-in slide-in-from-top-2 duration-150">
            <div>
              <label className="block text-xs font-bold text-[#003B68] mb-1">Position Type</label>
              <select
                value={selectedPositionType}
                onChange={(e) => setSelectedPositionType(e.target.value)}
                className="portal-input w-full text-xs px-2.5 py-1.5"
              >
                <option value="All">All Types</option>
                <option value="Faculty">Faculty</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Non-Faculty">Non-Faculty</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#003B68] mb-1">School</label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="portal-input w-full text-xs px-2.5 py-1.5"
              >
                <option value="All">All 12 Schools</option>
                {SCHOOLS_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-1.5 text-xs font-bold text-[#E02424] bg-[#FDF2F2] rounded-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Vacancies Grid */}
        {filteredPositions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D9E2EC] flex flex-col items-center gap-3">
            <Briefcase className="w-12 h-12 text-[#52708A]/60" />
            <h3 className="text-lg font-bold text-[#003B68] font-serif-tnu">
              No Vacancies Match Your Search Criteria
            </h3>
            <p className="text-xs text-[#52708A] max-w-md">
              We couldn't find any approved positions matching the selected filters. Please adjust your keywords or reset filters to browse all open roles.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-primary-portal mt-2 px-5 py-2 text-xs"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPositions.map((position) => {
              const positionType = position.positionType || 'Faculty';
              const experienceReq = position.experienceRequired || '0–5 Years';
              const minQual =
                position.minQualification ||
                position.qualificationsOverview.split('.')[0] ||
                "Master's Degree / Ph.D.";

              return (
                <article
                  key={position.id}
                  className="portal-card portal-card-hover p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Royal Blue Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003B68] via-[#0057B8] to-[#BFDDF5] opacity-90" />

                  <div className="flex flex-col gap-3">
                    {/* Top Cadre & Status Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] text-[11px] font-bold uppercase tracking-wider">
                        {positionType}
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[10px] font-bold">
                        <Users className="w-3 h-3" />
                        <span>{position.vacancyCount} {position.vacancyCount === 1 ? 'Vacancy' : 'Vacancies'}</span>
                      </span>
                    </div>

                    {/* Job Title & Discipline Area */}
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#52708A] tracking-wider block">
                        {position.department}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#003B68] font-serif-tnu group-hover:text-[#0057B8] transition-colors mt-0.5 leading-snug line-clamp-2">
                        {position.cadre} — {position.area}
                      </h3>
                    </div>

                    {/* Metadata Specs: Qualification & Experience */}
                    <div className="space-y-1.5 text-xs text-[#52708A] bg-[#F7F9FC] p-2.5 rounded-xl border border-[#D9E2EC]">
                      <div className="flex items-start gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#0057B8] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">
                          <strong className="text-[#003B68]">Req:</strong> {minQual}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0057B8] shrink-0" />
                        <span>
                          <strong className="text-[#003B68]">Experience:</strong> {experienceReq}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0057B8] shrink-0" />
                        <span>Sarisha Campus, South 24 Parganas, WB</span>
                      </div>
                    </div>

                    {/* Skills Chips */}
                    {position.preferredSkills && position.preferredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {position.preferredSkills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-white border border-[#D9E2EC] text-[10px] font-medium text-[#52708A]"
                          >
                            {skill}
                          </span>
                        ))}
                        {position.preferredSkills.length > 3 && (
                          <span className="text-[10px] text-[#71869A] self-center">
                            +{position.preferredSkills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer: Deadline & Action Buttons */}
                  <div className="pt-4 mt-3 border-t border-[#D9E2EC] flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[#71869A]">
                      <span>Vacancy ID: <strong className="text-[#003B68]">{position.id.toUpperCase()}</strong></span>
                      <span className="text-[#0057B8] font-semibold">Due: {position.deadline}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectPositionDetails(position)}
                        className="btn-secondary-portal py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#0057B8]" />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onApplyPosition(position)}
                        className="btn-primary-portal py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
