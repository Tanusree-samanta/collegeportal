import React, { useState, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Megaphone,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  BellRing,
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
  Mail,
  Check,
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
  const [activeOnly, setActiveOnly] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySuccess, setNotifySuccess] = useState(false);

  // Icon mapping helper
  const renderSchoolIcon = (id: string, isActive: boolean) => {
    const iconClass = isActive ? 'w-5 h-5 text-[#D83232]' : 'w-5 h-5 text-[#765331]/70';
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
        return <Building className={iconClass} />;
    }
  };

  const filteredSchools = useMemo(() => {
    return SCHOOLS_DATA.filter((school) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.streamLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesActive = !activeOnly || school.isActive;
      return matchesSearch && matchesActive;
    });
  }, [searchQuery, activeOnly]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) return;
    setNotifySuccess(true);
    setTimeout(() => {
      setShowNotifyModal(false);
      setNotifySuccess(false);
      setNotifyEmail('');
    }, 2200);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-4 sm:gap-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Academic Path" className="flex items-center gap-1.5 text-xs text-[#765331]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="breadcrumb-item gap-1 cursor-pointer font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateHome}
            className="breadcrumb-item cursor-pointer font-medium"
          >
            Career
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <span className="text-[#D83232] font-bold">Schools</span>
        </nav>

        {/* Page Heading & Editorial Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="font-serif-tnu text-2xl sm:text-3xl md:text-4xl font-bold text-[#292727] tracking-tight">
            Explore Faculty Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed">
            Select a school to view currently available faculty positions, research tenure tracks, and academic criteria.
          </p>
        </div>

        {/* Academic Recruitment Status Callout Banner (Glass Panel) */}
        <div className="glass-panel p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-[0_6px_24px_rgba(41,39,39,0.04)]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#D83232] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#292727] truncate">
                Cycle 2026–27 Active Stream
              </span>
              <span className="text-[11px] sm:text-xs text-[#765331] truncate">
                Engineering, AI & Computing currently receiving dossiers
              </span>
            </div>
          </div>
          <span className="shrink-0 text-[10px] sm:text-xs px-3 py-1 bg-white/80 border border-[#D9CC86]/50 text-[#765331] rounded-full font-bold shadow-2xs">
            1 of 12 Open
          </span>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#765331]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by school name or discipline..."
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

          <button
            type="button"
            onClick={() => setActiveOnly(!activeOnly)}
            className={`h-10 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-all cursor-pointer shadow-2xs ${
              activeOnly
                ? 'btn-primary-tnu'
                : 'btn-secondary-tnu'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Active Only</span>
          </button>
        </div>

        {/* 12 School Cards List with Staggered Entrance */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {filteredSchools.map((school, index) => {
            if (school.isActive) {
              // ACTIVE CARD: School of Technology (Glass Panel + Hover Sheen + Accent)
              return (
                <article
                  key={school.id}
                  style={{ animationDelay: `${index * 45}ms` }}
                  className="glass-panel glass-card-hover glass-sheen border-2 border-[#D83232]/75 overflow-hidden relative group p-0 page-enter"
                >
                  {/* Red accent strip */}
                  <div className="h-1.5 w-full bg-[#D83232]" />

                  <div className="p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-[#D83232]/10 border border-[#D83232]/25 flex items-center justify-center shrink-0 shadow-2xs">
                          {renderSchoolIcon(school.id, true)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#765331] font-bold">
                            {school.streamLabel}
                          </span>
                          <h2 className="font-bold text-base sm:text-lg text-[#292727] truncate">
                            {school.name}
                          </h2>
                        </div>
                      </div>

                      {/* Recruitment Open Badge with 2s Status Dot */}
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D83232] text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-xs uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-status-dot" />
                        RECRUITMENT OPEN
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed">
                      {school.description}
                    </p>

                    {/* Open Positions Metrics Box */}
                    <div className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-2.5 sm:p-3 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D83232]" />
                        <span className="font-bold text-xs sm:text-sm text-[#292727]">
                          {school.openPositionsCount} Open Positions
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#765331] font-medium">
                        <span>{school.openPositionsLabel}</span>
                        <Info className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Active Primary CTA Button (Hover lift 2px, Arrow moves right 4px) */}
                    <button
                      type="button"
                      onClick={() => onSelectSchool(school)}
                      className="btn-primary-tnu w-full py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer mt-1 group"
                    >
                      <span>View Opportunities</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              );
            }

            // INACTIVE CARD: Muted, Disabled appearance, NO hover lift
            return (
              <article
                key={school.id}
                style={{ animationDelay: `${index * 45}ms` }}
                className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#EBE6DF]/80 p-3.5 sm:p-4 flex flex-col gap-2.5 shadow-2xs page-enter"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBE6DF]/70 text-[#765331]/70 flex items-center justify-center shrink-0">
                      {renderSchoolIcon(school.id, false)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#765331]/60 font-semibold">
                        {school.streamLabel}
                      </span>
                      <h2 className="font-semibold text-sm sm:text-base text-[#292727]/80 truncate">
                        {school.name}
                      </h2>
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#EBE6DF]/80 text-[#765331]/70 text-[10px] sm:text-[11px] font-medium">
                    No Current Opening
                  </span>
                </div>

                <p className="text-xs text-[#5B403D]/70 leading-relaxed line-clamp-2">
                  {school.description}
                </p>

                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full bg-[#F2ECE4]/60 text-[#765331]/50 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed mt-1 border border-[#EBE6DF]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Currently Unavailable</span>
                </button>
              </article>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredSchools.length === 0 && (
          <div className="glass-panel flex flex-col items-center justify-center py-10 px-4 text-center">
            <Search className="w-10 h-10 text-[#765331]/40 mb-2" />
            <h3 className="font-bold text-sm sm:text-base text-[#292727]">
              No matching schools found
            </h3>
            <p className="text-xs text-[#765331] max-w-xs mt-1">
              Try adjusting your search keywords or clearing active filters to view all 12 academic streams.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveOnly(false);
              }}
              className="btn-secondary-tnu mt-3 px-4 py-2 text-xs font-bold cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Dean's Office Future Cycle Notice Card (Glass Panel) */}
        <div className="glass-panel p-4 flex flex-col gap-2 mt-2 shadow-[0_6px_20px_rgba(41,39,39,0.03)]">
          <div className="flex items-center gap-2 text-[#765331]">
            <BellRing className="w-4 h-4 text-[#B69A62]" />
            <span className="font-bold text-xs sm:text-sm text-[#292727]">
              Upcoming Hiring Notification
            </span>
          </div>
          <p className="text-xs text-[#5B403D] leading-relaxed">
            Streams marked currently unavailable will announce subsequent recruitment schedules in Phase II (Q3 2026). Scholars may submit proactive curriculum vitae directly to the Office of the Registrar.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowNotifyModal(true)}
              className="inline-flex items-center gap-1.5 text-xs text-[#D83232] font-bold hover:underline cursor-pointer group"
            >
              <span>Register for Stream Notifications</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Stream Notification Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-5 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 text-[#765331] hover:text-[#292727] p-1.5 rounded-lg hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center">
                <BellRing className="w-4 h-4" />
              </div>
              <h3 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727]">
                Register for Phase II Openings
              </h3>
            </div>

            <p className="text-xs text-[#765331] mb-4 leading-relaxed">
              Enter your academic email to receive alerts when candidatures open for Humanities, Health Sciences, Pharmacy, Agriculture, and Marine Studies.
            </p>

            {notifySuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subscription registered! You will receive notification alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    Academic / Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#765331]" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. scholar@university.edu"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="glass-input w-full text-xs pl-9 pr-3 py-2.5"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowNotifyModal(false)}
                    className="btn-secondary-tnu flex-1 py-2.5 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-tnu flex-1 py-2.5 text-xs font-bold cursor-pointer"
                  >
                    Subscribe Alerts
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
