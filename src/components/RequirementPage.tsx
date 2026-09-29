import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Share2,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Printer,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
  FileCheck,
  FileText,
} from 'lucide-react';
import { VacantPosition } from '../types';

interface RequirementPageProps {
  position?: VacantPosition | null;
  onApplyNow: () => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  onNavigateVacancies?: () => void;
}

export const RequirementPage: React.FC<RequirementPageProps> = ({
  position,
  onApplyNow,
  onNavigateHome,
  onNavigateSchools,
  onNavigateVacancies,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor / Chair Professor';
  const currentArea = position?.area || 'Artificial Intelligence & Machine Learning';
  const currentDeadline = position?.deadline || 'March 31, 2026';
  const currentDept = position?.department || 'Department of Computer Science & Engineering';

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    }
  };

  return (
    <div className="w-full bg-[#F7F9FC] min-h-[calc(100vh-64px)] pb-20 select-none page-enter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col gap-6">
        {/* 1. Breadcrumb Bar */}
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
            <li className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateSchools}
                className="breadcrumb-link cursor-pointer"
              >
                Schools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
            </li>
            {onNavigateVacancies && (
              <li className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateVacancies}
                  className="breadcrumb-link cursor-pointer"
                >
                  School Posts
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
              </li>
            )}
            <li className="inline-flex items-center text-[#0057B8] font-bold">
              <span>Post Requirements</span>
            </li>
          </ol>
        </nav>

        {/* 2. Editorial Masthead Section */}
        <header className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-5 h-1 rounded-full bg-[#0057B8] inline-block" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0057B8]">
              Faculty Recruitment — 2026–2027 Cycle
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#003B68] font-bold tracking-tight">
            {currentDept}
          </h1>
          <p className="text-[15px] text-[#52708A] leading-relaxed font-normal">
            Academic appointment across Professorial cadre conforming strictly to UGC & AICTE norms.
          </p>
        </header>

        {/* 3. Post Meta Summary Card */}
        <section className="bg-white rounded-[14px] p-5 sm:p-6 border border-[#D9E2EC] shadow-xs flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] uppercase tracking-wider text-[#71869A] font-bold">
                Cadre / Designation
              </span>
              <h2 className="text-xl sm:text-2xl text-[#003B68] font-bold leading-tight">
                {currentCadre}
              </h2>
              <span className="text-[13px] text-[#52708A] font-medium">
                Discipline Area: <strong className="text-[#123B5D]">{currentArea}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleBookmark}
                aria-label="Save position"
                className="p-2 rounded-lg border border-[#D9E2EC] text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] transition-all cursor-pointer shadow-2xs"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-[#0057B8]" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share position"
                className="p-2 rounded-lg border border-[#D9E2EC] text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] transition-all cursor-pointer shadow-2xs"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#D9E2EC] text-[13px]">
            <div className="bg-[#F5F9FD] p-2.5 rounded-lg border border-[#D9E2EC]">
              <span className="text-[11px] text-[#71869A] font-semibold block">Job Type</span>
              <span className="font-semibold text-[#123B5D]">Regular / Full-Time</span>
            </div>
            <div className="bg-[#F5F9FD] p-2.5 rounded-lg border border-[#D9E2EC]">
              <span className="text-[11px] text-[#71869A] font-semibold block">Scale of Pay</span>
              <span className="font-semibold text-[#123B5D]">7th CPC Scale</span>
            </div>
            <div className="bg-[#F5F9FD] p-2.5 rounded-lg border border-[#D9E2EC]">
              <span className="text-[11px] text-[#71869A] font-semibold block">Status</span>
              <span className="font-bold text-[#16865F] inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#19B87A] animate-pulse" />
                Open
              </span>
            </div>
            <div className="bg-[#F5F9FD] p-2.5 rounded-lg border border-[#D9E2EC]">
              <span className="text-[11px] text-[#71869A] font-semibold block">Application Due</span>
              <span className="font-bold text-[#0057B8]">{currentDeadline}</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RECRUITMENT PROCESS TRACKER (DESIGN RULE 11)              */}
        {/* Completed: #0057B8, Current: #0066CC, Upcoming: #D9E2EC  */}
        {/* ======================================================== */}
        <section className="bg-white rounded-[14px] p-5 border border-[#D9E2EC] shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs font-bold text-[#003B68] uppercase tracking-wider">
              Recruitment Process Tracker
            </span>
            <span className="text-xs text-[#71869A]">
              Evaluation Pathway
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Step 1: Active (#0066CC) */}
            <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#EAF4FF] border border-[#BFDDF5]">
              <div className="w-9 h-9 rounded-full bg-[#0066CC] text-white flex items-center justify-center font-bold text-xs shadow-xs mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#003B68]">
                1. CV Screened by HR
              </span>
              <span className="text-[12px] text-[#52708A] mt-0.5">
                Eligibility & Research Profile Review
              </span>
              <span className="mt-1.5 inline-block text-[10px] font-semibold text-[#16865F] bg-[#E8F8F2] px-2 py-0.5 rounded-full">
                Active Step
              </span>
            </div>

            {/* Step 2: Upcoming (#D9E2EC) */}
            <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
              <div className="w-9 h-9 rounded-full bg-white text-[#71869A] border border-[#D9E2EC] flex items-center justify-center font-bold text-xs mb-2">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-semibold text-[#123B5D]">
                2. Interview Call
              </span>
              <span className="text-[12px] text-[#71869A] mt-0.5">
                Statutory Selection Committee Board
              </span>
              <span className="mt-1.5 inline-block text-[10px] font-medium text-[#71869A] bg-[#F1F3F5] px-2 py-0.5 rounded-full">
                Upcoming
              </span>
            </div>

            {/* Step 3: Upcoming (#D9E2EC) */}
            <div className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
              <div className="w-9 h-9 rounded-full bg-white text-[#71869A] border border-[#D9E2EC] flex items-center justify-center font-bold text-xs mb-2">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-semibold text-[#123B5D]">
                3. Offer Letter
              </span>
              <span className="text-[12px] text-[#71869A] mt-0.5">
                Appointment Order & 7th CPC Dossier
              </span>
              <span className="mt-1.5 inline-block text-[10px] font-medium text-[#71869A] bg-[#F1F3F5] px-2 py-0.5 rounded-full">
                Final Stage
              </span>
            </div>
          </div>
        </section>

        {/* 4. Two-Column Detailed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Table of Eligibility Criteria (Rule 13: Tables) */}
            <section className="bg-white rounded-[14px] border border-[#D9E2EC] shadow-xs overflow-hidden">
              <div className="bg-[#EAF4FF] px-5 py-3.5 border-b border-[#D9E2EC] flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#003B68] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0057B8]" />
                  <span>Cadre-Wise Minimum Eligibility Matrix (UGC / AICTE)</span>
                </h3>
                <span className="text-[11px] font-semibold text-[#0057B8]">
                  7th CPC Scale
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#123B5D]">
                  <thead className="bg-[#F5F9FD] text-[#003B68] font-bold border-b border-[#D9E2EC]">
                    <tr>
                      <th className="p-3.5">Cadre Position</th>
                      <th className="p-3.5">Essential Degree</th>
                      <th className="p-3.5">Min Experience</th>
                      <th className="p-3.5">Research Publications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9E2EC]">
                    <tr className="hover:bg-[#F5F9FD] transition-colors">
                      <td className="p-3.5 font-bold text-[#003B68]">Professor / Chair</td>
                      <td className="p-3.5">Ph.D. in relevant discipline with First Class Bachelor's/Master's</td>
                      <td className="p-3.5">10+ Years (minimum 3 as Associate Professor)</td>
                      <td className="p-3.5 font-semibold text-[#0057B8]">Min 10 SCI / Scopus indexed papers</td>
                    </tr>
                    <tr className="hover:bg-[#F5F9FD] transition-colors">
                      <td className="p-3.5 font-bold text-[#003B68]">Associate Professor</td>
                      <td className="p-3.5">Ph.D. in appropriate engineering / computing / scientific branch</td>
                      <td className="p-3.5">8+ Years post-Master's / Ph.D. teaching/industry</td>
                      <td className="p-3.5 font-semibold text-[#0057B8]">Min 6 SCI / Scopus indexed papers</td>
                    </tr>
                    <tr className="hover:bg-[#F5F9FD] transition-colors">
                      <td className="p-3.5 font-bold text-[#003B68]">Assistant Professor</td>
                      <td className="p-3.5">First class in B.Tech & M.Tech, or Master's with UGC/CSIR NET</td>
                      <td className="p-3.5">0–3 Years (Ph.D. degree holders preferred)</td>
                      <td className="p-3.5 font-semibold text-[#0057B8]">Documented conference / journal papers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Core Responsibilities */}
            <section className="bg-white rounded-[14px] p-6 border border-[#D9E2EC] shadow-xs flex flex-col gap-4">
              <h3 className="text-base font-bold text-[#003B68] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0057B8]" />
                <span>Primary Academic Responsibilities & Deliverables</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#52708A] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-2 shrink-0" />
                  <span>Deliver rigorous experiential lectures, modern laboratory practicums, and tutorial mentoring for undergraduate and postgraduate cohorts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-2 shrink-0" />
                  <span>Formulate funded research proposals for national agencies (DST, SERB, AICTE, ICMR, MeitY) and guide doctoral research candidates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-2 shrink-0" />
                  <span>Maintain high scholastic momentum through regular publication in peer-reviewed Q1/Q2 Scopus and Web of Science indexed journals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-2 shrink-0" />
                  <span>Actively participate in departmental accreditation compliance (NBA, NAAC, NIRF) and industry internship placement coordination.</span>
                </li>
              </ul>
            </section>

            {/* Special Instructions & Statutory Compliance */}
            <section className="bg-white rounded-[14px] p-6 border border-[#D9E2EC] shadow-xs flex flex-col gap-3">
              <h3 className="text-base font-bold text-[#003B68] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#0057B8]" />
                <span>Important Candidate Notes</span>
              </h3>
              <div className="space-y-2 text-xs text-[#52708A] leading-relaxed bg-[#F7F9FC] p-4 rounded-xl border border-[#D9E2EC]">
                <p>• Only shortlisted candidates will be notified for offline or hybrid interview presentation rounds before the statutory board.</p>
                <p>• Degrees obtained from foreign universities must produce an AIU (Association of Indian Universities) equivalence certificate at interview time.</p>
                <p>• The university reserves the right to modify vacancy numbers or cancel recruitment without prior notification.</p>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-5 sticky top-24">
            {/* Primary Action Apply Card */}
            <div className="bg-white rounded-[14px] p-6 border border-[#D9E2EC] shadow-md flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">
                  Applications Open
                </span>
                <h4 className="text-lg font-bold text-[#003B68]">
                  Ready to Apply?
                </h4>
                <p className="text-xs text-[#52708A]">
                  Prepare your academic CV, degree transcripts, and publication references for submission.
                </p>
              </div>

              {/* Primary Apply Button (Rule 4: #0057B8, hover #003B68, radius 8px) */}
              <button
                type="button"
                onClick={onApplyNow}
                className="btn-primary-portal w-full py-3 text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-[#D9E2EC] flex items-center justify-between text-xs text-[#71869A]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0057B8]" />
                  <span>Dossier time: ~10 mins</span>
                </span>
                <span className="font-semibold text-[#16865F]">Online Submission</span>
              </div>
            </div>

            {/* Quick Details Sidebar Card */}
            <div className="bg-white rounded-[14px] p-5 border border-[#D9E2EC] shadow-xs flex flex-col gap-3 text-xs">
              <h4 className="font-bold text-[#003B68] text-sm uppercase tracking-wider">
                Key Recruitment Facts
              </h4>
              <div className="space-y-2.5 text-[#52708A]">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Pay Structure</span>
                  <strong className="text-[#123B5D]">7th Central Pay Commission</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Location</span>
                  <strong className="text-[#123B5D]">Sarisha Campus, WB</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Staff Housing</span>
                  <strong className="text-[#123B5D]">Available on Campus</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>Application Fee</span>
                  <strong className="text-[#16865F] font-bold">NIL (No Application Fee)</strong>
                </div>
              </div>
            </div>

            {/* Recruitment Help Card */}
            <div className="bg-[#EAF4FF] rounded-[14px] p-5 border border-[#BFDDF5] flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#003B68]">
                <HelpCircle className="w-4 h-4 text-[#0057B8]" />
                <span>Need Assistance?</span>
              </div>
              <p className="text-[#52708A] leading-relaxed">
                Contact the Office of Faculty Recruitment for queries regarding subject eligibility or dossier verification.
              </p>
              <a
                href="mailto:recruitment@tnu.ac.in"
                className="font-semibold text-[#0057B8] hover:underline mt-1 inline-block"
              >
                recruitment@tnu.ac.in
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Bookmark Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003B68] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#19B87A]" />
          <span>{isBookmarked ? 'Position bookmarked to candidate portfolio.' : 'Link copied to clipboard.'}</span>
        </div>
      )}
    </div>
  );
};
