import React, { useState } from 'react';
import {
  X,
  Briefcase,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Clock,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Share2,
  Building,
  ArrowRight,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { VacantPosition } from '../../types';

interface JobDetailsModalProps {
  position: VacantPosition | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (position: VacantPosition) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (positionId: string) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  position,
  isOpen,
  onClose,
  onApply,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !position) return null;

  const positionType = position.positionType || 'Faculty';
  const experienceReq = position.experienceRequired || '0–5 Years';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#D9E2EC] my-6 max-h-[92vh] flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Strip */}
        <div className="p-5 sm:p-6 border-b border-[#D9E2EC] bg-[#F7F9FC] sticky top-0 z-10 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] text-[11px] font-bold uppercase tracking-wider">
                {positionType} Cadre
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[11px] font-bold">
                Vacancy ID: {position.id.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#D9E2EC] text-[11px] font-semibold text-[#52708A]">
                {position.vacancyCount} {position.vacancyCount === 1 ? 'Open Post' : 'Open Posts'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl text-[#003B68] font-bold font-serif-tnu leading-tight">
              {position.cadre} — {position.area}
            </h2>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#52708A] mt-1.5 font-medium">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>{position.department}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>{position.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>Deadline: <strong className="text-[#003B68]">{position.deadline}</strong></span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleBookmark && (
              <button
                type="button"
                onClick={() => onToggleBookmark(position.id)}
                className="p-2 rounded-lg border border-[#D9E2EC] text-[#52708A] hover:text-[#0057B8] hover:bg-white transition-all cursor-pointer"
                title="Bookmark Position"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[#0057B8]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg border border-[#D9E2EC] text-[#52708A] hover:text-[#0057B8] hover:bg-white transition-all cursor-pointer"
              title="Share Vacancy"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#71869A] hover:text-[#003B68] hover:bg-[#EAF4FF] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#123B5D]">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#D9E2EC]">
              <span className="text-[10px] uppercase font-bold text-[#71869A] block">Employment Type</span>
              <span className="font-semibold text-[#003B68]">{position.employmentType.split('•')[0] || 'Full Time'}</span>
            </div>
            <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#D9E2EC]">
              <span className="text-[10px] uppercase font-bold text-[#71869A] block">Experience Req.</span>
              <span className="font-semibold text-[#003B68]">{experienceReq}</span>
            </div>
            <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#D9E2EC]">
              <span className="text-[10px] uppercase font-bold text-[#71869A] block">Pay Scale</span>
              <span className="font-semibold text-[#0057B8]">7th CPC Scales</span>
            </div>
            <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#D9E2EC]">
              <span className="text-[10px] uppercase font-bold text-[#71869A] block">Scrutiny Status</span>
              <span className="font-bold text-[#059669] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active Hiring
              </span>
            </div>
          </div>

          {/* Section 1: About the Position */}
          <div>
            <h3 className="text-base font-bold text-[#003B68] font-serif-tnu mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0057B8]" />
              <span>About the Position</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#52708A] leading-relaxed">
              {position.description}
            </p>
          </div>

          {/* Section 2: Key Responsibilities */}
          <div>
            <h3 className="text-base font-bold text-[#003B68] font-serif-tnu mb-2.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0057B8]" />
              <span>Key Responsibilities & Deliverables</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#52708A]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-1.5 shrink-0" />
                <span>Conduct undergraduate and postgraduate instruction conforming to UGC, AICTE, and university curricular guidelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-1.5 shrink-0" />
                <span>Foster translational research scholarship with active publication in SCI/Scopus Q1/Q2 journals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-1.5 shrink-0" />
                <span>Submit sponsored research proposals to national agencies (DST, SERB, CSIR, MeitY) and guide doctoral research candidates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] mt-1.5 shrink-0" />
                <span>Engage in departmental statutory committees, laboratory management, and NBA/NAAC accreditation compliance.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Educational Qualification & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#D9E2EC]">
              <div className="flex items-center gap-2 text-[#003B68] font-bold text-xs uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4 text-[#0057B8]" />
                <span>Educational Qualification</span>
              </div>
              <p className="text-xs text-[#52708A] leading-relaxed">
                {position.qualificationsOverview}
              </p>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#D9E2EC]">
              <div className="flex items-center gap-2 text-[#003B68] font-bold text-xs uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-[#0057B8]" />
                <span>Experience & Eligibility Norms</span>
              </div>
              <p className="text-xs text-[#52708A] leading-relaxed">
                Minimum {experienceReq} collegiate teaching, postdoctoral research, or advanced industrial practice conforming to UGC 2018 regulations.
              </p>
            </div>
          </div>

          {/* Section 4: Skills & Competencies */}
          {position.preferredSkills && position.preferredSkills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#003B68] mb-2">
                Preferred Competencies & Skill Domains
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {position.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#D9E2EC] text-xs font-semibold text-[#003B68]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Application Process & Required Documents */}
          <div className="bg-[#EAF4FF] p-4 rounded-xl border border-[#BFDDF5] text-xs text-[#52708A] space-y-2">
            <h4 className="font-bold text-[#003B68] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0057B8]" />
              <span>Dossier Submission Checklist</span>
            </h4>
            <p>
              Candidates are required to provide their <strong>Comprehensive CV (PDF)</strong>, Bachelor's, Master's and Doctoral degree transcripts, experience relieving letters, and proof of publication citations.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#71869A] pt-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#0057B8]" />
              <span>Selection Committee will shortlist candidates based on UGC API benchmark scorecards.</span>
            </div>
          </div>
        </div>

        {/* Persistent Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-[#D9E2EC] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#52708A] text-center sm:text-left">
            <span>Applying for: </span>
            <strong className="text-[#003B68]">{position.cadre}</strong>
            <span className="hidden sm:inline"> • {position.department}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-portal px-4 py-2.5 text-xs flex-1 sm:flex-none cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApply(position);
              }}
              className="btn-primary-portal px-6 py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer shadow-md"
            >
              <span>Apply for this Position</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
