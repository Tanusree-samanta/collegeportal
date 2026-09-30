import React, { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  Download,
  Compass,
  Mail,
  Clock,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Layers,
  Building,
  UserCheck,
} from 'lucide-react';
import { ApplicationFormData, VacantPosition, School } from '../types';

interface SuccessPageProps {
  applicationId: string;
  formData: ApplicationFormData;
  position?: VacantPosition | null;
  school?: School | null;
  onGoToCandidatePortal: () => void;
  onTrackApplication: () => void;
  onBackToCareers: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  applicationId,
  formData,
  position,
  school,
  onGoToCandidatePortal,
  onTrackApplication,
  onBackToCareers,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
  };

  const displayPosition =
    position?.area || 'Assistant Professor — Computer Science & Engineering';
  const displaySchool = school?.name || 'School of Technology';
  const displayDept = position?.department || 'Department of Computer Science & Engineering';
  const submissionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-20 relative z-10 page-enter select-none bg-[#F7F9FC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col gap-6">
        {/* Stage Progress Pill */}
        <div className="bg-white p-3 px-5 rounded-2xl flex items-center justify-between shadow-xs border border-[#D9E2EC]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#19B87A] animate-pulse" />
            <span className="text-xs text-[#52708A] font-bold tracking-wider uppercase">
              Recruitment Dossier Lodged
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#E8F8F2] text-[#16865F] border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <CheckCircle className="w-3.5 h-3.5 text-[#19B87A]" />
            <span>Application Complete</span>
          </div>
        </div>

        {/* Centered Success Card */}
        <div className="bg-white p-6 sm:p-10 flex flex-col items-center text-center shadow-md rounded-3xl relative overflow-hidden border border-[#D9E2EC]">
          {/* Top Brand Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#003B68] via-[#0057B8] to-[#0074E4]" />

          {/* Success Check Icon */}
          <div className="relative mb-5 mt-2">
            <div className="w-24 h-24 rounded-full bg-[#E8F8F2] border-2 border-emerald-200 flex items-center justify-center shadow-inner">
              <div className="w-16 h-16 rounded-full bg-[#19B87A] text-white flex items-center justify-center shadow-md">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] rounded-full mb-3 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0057B8]" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              The Neotia University • Office of Academic Appointments
            </span>
          </div>

          {/* Main Headings */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#003B68] font-bold mb-2 tracking-tight">
            Application Submitted Successfully
          </h1>
          <p className="text-sm sm:text-base text-[#52708A] max-w-xl leading-relaxed mb-6 font-normal">
            Thank you for applying. Your faculty application has been officially registered with The Neotia University Selection Secretariat.
          </p>

          {/* CANDIDATE PORTAL ACTIVATED CALLOUT */}
          <div className="w-full bg-[#F5F9FD] border-2 border-[#BFDDF5] rounded-2xl p-4 sm:p-5 text-left mb-6 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0057B8] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0057B8] bg-[#EAF4FF] px-2.5 py-0.5 rounded-full border border-[#BFDDF5]">
                    CANDIDATE PORTAL ACTIVATED
                  </span>
                  <span className="text-xs text-[#16865F] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Session Linked to Application ID
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#123B5D] mt-1.5 leading-relaxed">
                  Your personal <strong>Candidate Portal</strong> is now active. You do <strong>not</strong> need to apply again—you can now monitor your complete recruitment journey from HR screening to statutory committee interview, letter of intent (LOI), and joining formalities.
                </p>
              </div>
            </div>
          </div>

          {/* Official Application Summary Table / Block */}
          <div className="w-full bg-[#F7F9FC] border border-[#D9E2EC] rounded-2xl p-5 text-left mb-6 space-y-3.5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D9E2EC] gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#71869A] block">
                  Application ID
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#0057B8]">
                  {applicationId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyId}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-bold border border-[#BFDDF5] shadow-2xs cursor-pointer transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16865F]" />
                    <span className="text-[#16865F]">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Application ID</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="bg-white p-3 rounded-xl border border-[#D9E2EC]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71869A] block">
                  Position Applied For
                </span>
                <span className="font-bold text-[#123B5D] text-sm mt-0.5 block leading-snug">
                  {displayPosition}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D9E2EC]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71869A] block">
                  School / Department
                </span>
                <span className="font-bold text-[#123B5D] text-sm mt-0.5 block leading-snug">
                  {displaySchool}
                </span>
                <span className="text-[#52708A] text-[11px] block mt-0.5">{displayDept}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D9E2EC]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71869A] block">
                  Submission Date
                </span>
                <span className="font-bold text-[#123B5D] text-sm mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0057B8]" />
                  {submissionDate}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D9E2EC]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71869A] block">
                  Current Application Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5]">
                    Application Submitted
                  </span>
                  <span className="text-[11px] text-[#16865F] font-semibold">Stage 1 Active</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#52708A] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0057B8]" />
              <span>
                Registered applicant email: <strong>{formData.email}</strong> • Mobile: <strong>{formData.mobile}</strong>
              </span>
            </div>
          </div>

          {/* PRIMARY PROMINENT CALL TO ACTIONS */}
          <div className="w-full flex flex-col gap-3">
            {/* 1. GO TO CANDIDATE PORTAL (PROMINENT PRIMARY BUTTON) */}
            <button
              type="button"
              onClick={onGoToCandidatePortal}
              className="w-full py-4 px-6 rounded-2xl bg-[#0057B8] hover:bg-[#003B68] text-white text-base sm:text-lg font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#003B68] active:scale-[0.99] group"
            >
              <LayoutDashboard className="w-5 h-5 text-white" />
              <span className="tracking-wide">GO TO CANDIDATE PORTAL</span>
              <ArrowRight className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-1.5" />
            </button>

            {/* 2. Track Application button */}
            <button
              type="button"
              onClick={onTrackApplication}
              className="w-full py-3 px-6 rounded-2xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-sm font-bold flex items-center justify-center gap-2 border-2 border-[#0057B8] shadow-xs transition-all cursor-pointer active:scale-[0.99]"
            >
              <Layers className="w-4 h-4" />
              <span>Track Application (10-Stage Lifecycle)</span>
            </button>

            {/* Secondary actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="py-2.5 px-4 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#D9E2EC] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>
                  {downloading
                    ? 'Generating Dossier PDF...'
                    : downloaded
                    ? '✓ Application PDF Saved'
                    : 'Download Application Copy (PDF)'}
                </span>
              </button>

              <button
                type="button"
                onClick={onBackToCareers}
                className="py-2.5 px-4 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#D9E2EC] cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Back to Career Opportunities</span>
              </button>
            </div>
          </div>

          {/* Official Footer Note */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-[#71869A] mt-6 font-normal">
            <Building className="w-3.5 h-3.5 text-[#0057B8]" />
            <span>The Neotia University Statutory Selection Secretariat • Recruitment Cycle 2026-27</span>
          </div>
        </div>
      </div>
    </div>
  );
};
