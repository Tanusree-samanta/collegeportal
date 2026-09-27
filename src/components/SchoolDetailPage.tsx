import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Building2,
  FlaskConical,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  ArrowLeft,
  FileCheck,
} from 'lucide-react';
import { School } from '../types';

interface SchoolDetailPageProps {
  school: School;
  onViewVacancies: (school: School) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
}

export const SchoolDetailPage: React.FC<SchoolDetailPageProps> = ({
  school,
  onViewVacancies,
  onNavigateHome,
  onNavigateSchools,
}) => {
  const [courseFilter, setCourseFilter] = useState<'all' | 'UG' | 'PG' | 'Ph.D.' | 'Diploma'>('all');

  const courses = school.courses || [];
  const filteredCourses = courses.filter((c) => {
    if (courseFilter === 'all') return true;
    return c.level === courseFilter;
  });

  const ugCount = courses.filter((c) => c.level === 'UG').length;
  const pgCount = courses.filter((c) => c.level === 'PG').length;
  const phdCount = courses.filter((c) => c.level === 'Ph.D.').length;
  const diplomaCount = courses.filter((c) => c.level === 'Diploma').length;

  const hasOpenings = Boolean((school.openPositionsCount || 0) > 0 && school.isActive);

  return (
    <div className="w-full bg-[#F8F6F0] min-h-[calc(100vh-64px)] pb-20 select-none">
      {/* Breadcrumb Navigation Bar */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EBE6DF] px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs text-[#765331]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#D83232] transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateSchools}
            className="hover:text-[#D83232] transition-colors font-medium cursor-pointer"
          >
            Schools Directory
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <span className="text-[#D83232] font-bold truncate max-w-xs">{school.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col gap-8">
        {/* Top Action & Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onNavigateSchools}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#765331] hover:text-[#D83232] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#D9CC86]/50 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Schools</span>
          </button>

          {hasOpenings ? (
            <button
              type="button"
              onClick={() => onViewVacancies(school)}
              className="inline-flex items-center gap-2 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Open Positions ({school.openPositionsCount || 0} Openings)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 bg-[#EBE6DF] text-[#765331]/50 text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-[#EBE6DF] cursor-not-allowed whitespace-nowrap"
            >
              <Briefcase className="w-4 h-4 text-[#765331]/40" />
              <span>No Current Openings</span>
            </button>
          )}
        </div>

        {/* HERO / SCHOOL BANNER */}
        <div
          className="rounded-[14px] p-6 sm:p-8 border border-[#D9CC86]/70 bg-white/70 shadow-[0_8px_25px_rgba(41,39,39,0.04)] relative overflow-hidden"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/50 uppercase tracking-wider">
                  {school.streamLabel}
                </span>
                {school.accreditation && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#4A351F] border border-[#D9CC86]/60 shadow-xs">
                    {school.accreditation}
                  </span>
                )}
              </div>

              <h1 className="font-serif-tnu text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292727] tracking-tight">
                {school.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#5B403D] leading-relaxed">
                {school.description}
              </p>

              {school.deanNote && (
                <div className="pt-2 border-t border-[#EBE6DF]/80">
                  <div className="text-[11px] font-semibold text-[#765331] italic">
                    "{school.deanNote}"
                  </div>
                  <div className="text-[10px] font-bold text-[#292727] uppercase tracking-wider mt-1">
                    — {school.deanName || 'Dean of Academic Faculty'}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 shrink-0 lg:w-64">
              <div className="bg-white p-3 rounded-xl border border-[#D9CC86]/40 shadow-xs text-center">
                <span className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#D83232] leading-none block">
                  {school.courseCount || courses.length}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-[#765331] mt-0.5 block">
                  Academic Courses / Programs
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D9CC86]/40 shadow-xs text-center">
                <span className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#765331] leading-none block">
                  {school.labCount || 8}+
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-[#765331] mt-0.5 block">
                  Specialized Labs & Facilities
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D9CC86]/40 shadow-xs text-center col-span-2 sm:col-span-1 lg:col-span-1">
                <span className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#B69A62] leading-none block">
                  {school.studentFacultyRatio || '14:1'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-[#765331] mt-0.5 block">
                  Student-Faculty Ratio
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: HOW MANY COURSES & COMPLETE COURSE CATALOG */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EBE6DF]">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D83232]" />
                <h2 className="font-serif-tnu text-lg sm:text-xl font-bold text-[#292727]">
                  Academic Courses & Degree Programs
                </h2>
              </div>
              <p className="text-xs text-[#765331] mt-0.5">
                Total {courses.length} courses offered across Undergraduate, Postgraduate, and Doctoral curricula.
              </p>
            </div>

            {/* Filter Tabs */}
            {courses.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCourseFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    courseFilter === 'all'
                      ? 'bg-[#D83232] text-white shadow-xs'
                      : 'bg-white text-[#765331] border border-[#D9CC86]/50 hover:bg-[#F2ECE4]'
                  }`}
                >
                  All ({courses.length})
                </button>
                {ugCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCourseFilter('UG')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      courseFilter === 'UG'
                        ? 'bg-[#D83232] text-white shadow-xs'
                        : 'bg-white text-[#765331] border border-[#D9CC86]/50 hover:bg-[#F2ECE4]'
                    }`}
                  >
                    UG ({ugCount})
                  </button>
                )}
                {pgCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCourseFilter('PG')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      courseFilter === 'PG'
                        ? 'bg-[#D83232] text-white shadow-xs'
                        : 'bg-white text-[#765331] border border-[#D9CC86]/50 hover:bg-[#F2ECE4]'
                    }`}
                  >
                    PG ({pgCount})
                  </button>
                )}
                {phdCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCourseFilter('Ph.D.')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      courseFilter === 'Ph.D.'
                        ? 'bg-[#D83232] text-white shadow-xs'
                        : 'bg-white text-[#765331] border border-[#D9CC86]/50 hover:bg-[#F2ECE4]'
                    }`}
                  >
                    Ph.D. ({phdCount})
                  </button>
                )}
                {diplomaCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCourseFilter('Diploma')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      courseFilter === 'Diploma'
                        ? 'bg-[#D83232] text-white shadow-xs'
                        : 'bg-white text-[#765331] border border-[#D9CC86]/50 hover:bg-[#F2ECE4]'
                    }`}
                  >
                    Diploma ({diplomaCount})
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.code}
                  className="p-4 rounded-[14px] border border-[#D9CC86]/60 bg-white/70 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B69A62]/15 text-[#765331] border border-[#D9CC86]/40 uppercase tracking-wider">
                        {course.code}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          course.level === 'Ph.D.'
                            ? 'bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20'
                            : course.level === 'PG'
                            ? 'bg-[#4A351F]/10 text-[#4A351F] border border-[#4A351F]/20'
                            : 'bg-[#B69A62]/10 text-[#765331] border border-[#D9CC86]/40'
                        }`}
                      >
                        {course.level} Degree
                      </span>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-[#292727] leading-snug mb-1">
                      {course.name}
                    </h3>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EBE6DF]/70 flex items-center justify-between text-[11px] text-[#765331]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B69A62]" />
                      <span>{course.duration}</span>
                    </span>
                    {course.seats && (
                      <span className="flex items-center gap-1 font-semibold">
                        <Users className="w-3.5 h-3.5 text-[#B69A62]" />
                        <span>{course.seats} Seats</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border border-[#D9CC86]/40 text-center text-xs text-[#765331]">
              Administrative & Governance division with non-degree functional operations.
            </div>
          )}
        </div>

        {/* SECTION 2: DEPARTMENTS & FACILITIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departments */}
          <div
            className="p-5 sm:p-6 rounded-[14px] border border-[#D9CC86]/60 bg-white/70 shadow-xs"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-[#D83232]" />
              <h3 className="font-serif-tnu font-bold text-base text-[#292727]">
                Departments & Specialized Centres
              </h3>
            </div>
            <ul className="space-y-2.5">
              {(school.departments || ['Department of Core Academic Studies']).map((dept) => (
                <li key={dept} className="flex items-start gap-2.5 text-xs text-[#5B403D]">
                  <CheckCircle2 className="w-4 h-4 text-[#B69A62] shrink-0 mt-0.5" />
                  <span className="font-medium">{dept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Labs & Facilities */}
          <div
            className="p-5 sm:p-6 rounded-[14px] border border-[#D9CC86]/60 bg-white/70 shadow-xs"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-4 h-4 text-[#D83232]" />
              <h3 className="font-serif-tnu font-bold text-base text-[#292727]">
                Laboratories & Research Infrastructure
              </h3>
            </div>
            <ul className="space-y-2.5">
              {(school.facilities || ['Central Academic Computing & Multimedia Laboratory']).map((fac) => (
                <li key={fac} className="flex items-start gap-2.5 text-xs text-[#5B403D]">
                  <Sparkles className="w-4 h-4 text-[#D83232] shrink-0 mt-0.5" />
                  <span className="font-medium">{fac}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION 3: KEY HIGHLIGHTS */}
        {school.highlights && school.highlights.length > 0 && (
          <div
            className="p-5 sm:p-6 rounded-[14px] border border-[#D9CC86]/60 bg-white/70 shadow-xs"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#B69A62]" />
              <h3 className="font-serif-tnu font-bold text-base text-[#292727]">
                Key Academic Highlights & Research Mandate
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {school.highlights.map((hl) => (
                <div key={hl} className="flex items-start gap-2 text-xs text-[#5B403D] bg-[#F8F6F0] p-3 rounded-lg border border-[#EBE6DF]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D83232] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM ACTION CARD: VIEW OPEN POSITIONS */}
        <div
          className="rounded-[14px] p-6 sm:p-8 border-2 border-[#D83232]/30 bg-gradient-to-r from-white to-[#F8F6F0] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D83232]/10 text-[#D83232] border border-[#D83232]/20 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-pulse" />
              <span>Inviting Faculty Dossiers 2026–2027</span>
            </div>
            <h3 className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#292727]">
              Vacant Faculty Positions in {school.name}
            </h3>
            <p className="text-xs text-[#5B403D] max-w-xl leading-relaxed">
              Explore open appointments for Professor, Associate Professor, and Assistant Professor cadres under approved 7th CPC scale with research seed grants.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {hasOpenings ? (
              <button
                type="button"
                onClick={() => onViewVacancies(school)}
                className="inline-flex items-center justify-center gap-2 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 bg-[#EBE6DF] text-[#765331]/50 text-xs sm:text-sm font-bold px-6 py-3 rounded-lg border border-[#EBE6DF] cursor-not-allowed whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4 text-[#765331]/40" />
                <span>No Current Openings</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
