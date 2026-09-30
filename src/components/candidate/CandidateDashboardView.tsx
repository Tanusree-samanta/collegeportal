import React, { useState } from 'react';
import {
  Briefcase,
  FileCheck2,
  Calendar,
  Award,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  FolderArchive,
  User,
  ShieldCheck,
  ChevronRight,
  Download,
  Building,
  GraduationCap,
  Sparkles,
  FileText,
  Check,
  Layers,
  MapPin,
  HelpCircle,
  Play,
  RotateCcw,
  UploadCloud,
  X,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import {
  CandidateProfile,
  CandidateApplication,
  CandidateDocument,
  DraftApplication,
  CandidateNotification,
  NoticePeriodDetails,
} from '../../types';
import { CandidateTab } from './CandidateSidebar';

interface CandidateDashboardViewProps {
  candidateProfile: CandidateProfile;
  applications: CandidateApplication[];
  selectedAppId: string;
  onSelectApplication: (appId: string) => void;
  onNavigateTab: (tab: CandidateTab) => void;
  onResumeDraft: (draft: DraftApplication) => void;
  onAcceptLoiClick: (appId: string) => void;
  onDeclineLoiClick: (appId: string) => void;
  onViewInterviewClick: (appId: string) => void;
  onSimulateHrStage: (action: string) => void;
  onSubmitNoticePeriod: (details: NoticePeriodDetails) => void;
  onReuploadDocument: (docName: string) => void;
}

export const CandidateDashboardView: React.FC<CandidateDashboardViewProps> = ({
  candidateProfile,
  applications,
  selectedAppId,
  onSelectApplication,
  onNavigateTab,
  onResumeDraft,
  onAcceptLoiClick,
  onDeclineLoiClick,
  onViewInterviewClick,
  onSimulateHrStage,
  onSubmitNoticePeriod,
  onReuploadDocument,
}) => {
  const [showSimControls, setShowSimControls] = useState(true);
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [showReuploadModal, setShowReuploadModal] = useState(false);
  const [reuploadTargetDoc, setReuploadTargetDoc] = useState('');

  // Form states for Notice Period
  const [currentOrg, setCurrentOrg] = useState('Kolkata Institute of Advanced Computing');
  const [currentlyEmployed, setCurrentlyEmployed] = useState(true);
  const [noticeDays, setNoticeDays] = useState(30);
  const [lastWorkingDate, setLastWorkingDate] = useState('2026-10-31');
  const [expectedJoiningDate, setExpectedJoiningDate] = useState('2026-11-02');

  // Currently active application
  const activeApp =
    applications.find((a) => a.id === selectedAppId) || applications[0] || null;

  if (!activeApp) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-[#D9E2EC]">
        <h2 className="text-xl font-serif font-bold text-[#003B68]">No Active Applications</h2>
        <p className="text-xs text-[#52708A] mt-1">Please apply for a position from the open vacancies directory.</p>
        <button
          type="button"
          onClick={() => onNavigateTab('open-positions')}
          className="mt-4 px-4 py-2 bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Browse Vacancies
        </button>
      </div>
    );
  }

  // Handle Notice Period submission
  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitNoticePeriod({
      currentOrganization: currentOrg,
      currentlyEmployed,
      noticePeriodDays: Number(noticeDays),
      lastWorkingDate,
      expectedJoiningDate,
      submittedAt: 'Today',
    });
    setShowNoticeForm(false);
  };

  const handleOpenReupload = (docName: string) => {
    setReuploadTargetDoc(docName);
    setShowReuploadModal(true);
  };

  const handleConfirmReupload = () => {
    onReuploadDocument(reuploadTargetDoc);
    setShowReuploadModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================= */}
      {/* 1. CANDIDATE PORTAL HEADER & PROFILE AREA (First Page Navy/Royal Blue) */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002747] via-[#003B68] to-[#0057B8] text-white p-6 sm:p-8 shadow-xl border border-[#BFDDF5]/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <GraduationCap className="w-80 h-80 -mr-16 text-[#BFDDF5]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#EAF4FF] text-[#003B68] flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg shrink-0 border-2 border-white/20">
              {candidateProfile.avatarInitials}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-[#BFDDF5] px-2.5 py-0.5 rounded-full border border-white/30">
                  Application ID: {activeApp.id}
                </span>
                <span className="text-[11px] text-white/90 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BFDDF5]" />
                  Session Linked to Candidature
                </span>
              </div>

              <div className="text-[11px] uppercase tracking-wider font-semibold text-white/80">
                THE NEOTIA UNIVERSITY • CANDIDATE RECRUITMENT PORTAL
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-0.5 font-bold">
                {candidateProfile.fullName}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/95 mt-1.5 font-medium">
                <span className="text-[#BFDDF5] font-bold">{activeApp.jobTitle}</span>
                <span>•</span>
                <span>{activeApp.schoolName}</span>
                <span>•</span>
                <span className="text-white/80">{activeApp.department}</span>
              </div>
            </div>
          </div>

          {/* Multiple Applications Quick Switcher */}
          {applications.length > 1 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 shrink-0 self-start md:self-auto">
              <span className="text-[10px] uppercase font-bold text-[#BFDDF5] tracking-wider block mb-1">
                Switch Application Dossier ({applications.length})
              </span>
              <select
                value={activeApp.id}
                onChange={(e) => onSelectApplication(e.target.value)}
                className="bg-[#002747] text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#BFDDF5]/50 focus:outline-none cursor-pointer"
              >
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.id} — {app.jobTitle}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. INSTITUTIONAL HR PROGRESSION SIMULATOR (DEMO TOOLBAR) */}
      {/* ========================================================= */}
      <div className="bg-[#F0F7FF] border border-[#BFDDF5] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0057B8] animate-ping" />
            <h3 className="text-xs sm:text-sm font-bold text-[#003B68] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0057B8]" />
              HR & Selection Secretariat Progression Simulator
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowSimControls(!showSimControls)}
            className="text-[11px] font-bold text-[#0057B8] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{showSimControls ? 'Hide Simulation Panel' : 'Show Simulation Panel'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showSimControls ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <p className="text-xs text-[#52708A] mb-3">
          As required by statutory guidelines, candidate statuses are controlled by HR and the Selection Secretariat. Use these simulated actions to advance your application through each stage and watch the portal react dynamically.
        </p>

        {showSimControls && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#D9E2EC]">
            <button
              type="button"
              onClick={() => onSimulateHrStage('shortlist')}
              className="px-3 py-1.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 text-[#BFDDF5]" />
              <span>1. HR: Shortlist Application</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('schedule_interview')}
              className="px-3 py-1.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3 h-3 text-[#BFDDF5]" />
              <span>2. HR: Schedule Interview</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('mark_selected')}
              className="px-3 py-1.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-3 h-3 text-[#BFDDF5]" />
              <span>3. HR: Mark Candidate Selected</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('issue_loi')}
              className="px-3 py-1.5 rounded-xl bg-[#003B68] hover:bg-[#002747] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3 h-3 text-[#BFDDF5]" />
              <span>4. HR: Issue Letter of Intent (LOI)</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('flag_rejection')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FEF2F2] text-[#DC2626] text-xs font-bold border border-[#FECACA] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <AlertCircle className="w-3 h-3 text-[#DC2626]" />
              <span>5. HR: Flag Doc for Re-upload</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('verify_all')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#A7F3D0] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3 h-3 text-[#059669]" />
              <span>6. HR: Verify All Documents</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('confirm_joining')}
              className="px-3 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              <span>7. HR: Confirm Joining & Issue Faculty Code</span>
            </button>

            <button
              type="button"
              onClick={() => onSimulateHrStage('reset')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#52708A] hover:text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Dossier to Submitted</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. SEPARATE STATUSES MATRIX (First Page Colors)           */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0057B8]">
              Statutory Recruitment Matrix
            </span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#003B68]">
              Multi-Stage Application Status Separation
            </h2>
          </div>
          <span className="text-xs text-[#52708A]">
            Last updated: <span className="font-semibold text-[#003B68]">{activeApp.lastUpdated}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {/* Status 1: APPLICATION STATUS */}
          <div className="p-3.5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
              Application
            </span>
            <div className="mt-2">
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  activeApp.applicationStatus === 'Shortlisted'
                    ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                    : activeApp.applicationStatus === 'Under Review'
                    ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                    : 'bg-[#0057B8] text-white'
                }`}
              >
                {activeApp.applicationStatus.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#71869A] mt-2 block">UGC Eligibility Check</span>
          </div>

          {/* Status 2: INTERVIEW STATUS */}
          <div className="p-3.5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
              Interview
            </span>
            <div className="mt-2">
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  activeApp.interviewStatus === 'Scheduled'
                    ? 'bg-[#0057B8] text-white animate-pulse'
                    : activeApp.interviewStatus === 'Completed'
                    ? 'bg-[#ECFDF5] text-[#059669]'
                    : 'bg-white text-[#71869A] border border-[#D9E2EC]'
                }`}
              >
                {activeApp.interviewStatus === 'Scheduled'
                  ? 'SCHEDULED — 15 OCT'
                  : activeApp.interviewStatus.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#71869A] mt-2 block">Statutory Selection</span>
          </div>

          {/* Status 3: SELECTION STATUS */}
          <div className="p-3.5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
              Selection
            </span>
            <div className="mt-2">
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  activeApp.selectionStatus === 'Selected'
                    ? 'bg-[#059669] text-white'
                    : activeApp.selectionStatus === 'Not Selected'
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-white text-[#71869A] border border-[#D9E2EC]'
                }`}
              >
                {activeApp.selectionStatus.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#71869A] mt-2 block">Committee Decision</span>
          </div>

          {/* Status 4: LOI STATUS */}
          <div className="p-3.5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
              Letter of Intent
            </span>
            <div className="mt-2">
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  activeApp.loiStatus === 'Issued'
                    ? 'bg-[#0057B8] text-white shadow-xs'
                    : activeApp.loiStatus === 'Accepted'
                    ? 'bg-[#ECFDF5] text-[#059669]'
                    : 'bg-white text-[#71869A] border border-[#D9E2EC]'
                }`}
              >
                {activeApp.loiStatus.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#71869A] mt-2 block">7th CPC Professorial</span>
          </div>

          {/* Status 5: VERIFICATION STATUS */}
          <div className="p-3.5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
              Verification
            </span>
            <div className="mt-2">
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  activeApp.verificationStatus === 'Verified'
                    ? 'bg-[#ECFDF5] text-[#059669]'
                    : activeApp.verificationStatus === 'Rejected — Re-upload Required'
                    ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                    : activeApp.verificationStatus === 'Under Verification'
                    ? 'bg-[#EAF4FF] text-[#0057B8]'
                    : 'bg-white text-[#71869A] border border-[#D9E2EC]'
                }`}
              >
                {activeApp.verificationStatus === 'Rejected — Re-upload Required'
                  ? 'RE-UPLOAD REQ.'
                  : activeApp.verificationStatus.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#71869A] mt-2 block">Dossier Authentication</span>
          </div>

          {/* Status 6: JOINING STATUS */}
          <div className="p-3.5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
              Joining
            </span>
            <div className="mt-2">
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  activeApp.joiningStatus === 'Joined'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : activeApp.joiningStatus === 'Yet to Join'
                    ? 'bg-[#0057B8] text-white'
                    : activeApp.joiningStatus === 'Notice Period Submitted'
                    ? 'bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5]'
                    : 'bg-white text-[#71869A] border border-[#D9E2EC]'
                }`}
              >
                {activeApp.joiningStatus.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] text-[#71869A] mt-2 block">Sarisha Campus Entry</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MAIN TRACKING AREA: "MY RECRUITMENT JOURNEY"           */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E2EC] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-[#0057B8]" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#0057B8]">
                Official Timeline
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68]">
              My Recruitment Journey
            </h2>
            <p className="text-xs text-[#52708A] mt-0.5">
              Live statutory milestones for Application ID: <strong className="font-mono text-[#0057B8]">{activeApp.id}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-[#0057B8] bg-[#EAF4FF] px-3 py-1.5 rounded-full border border-[#BFDDF5]">
              Stage {activeApp.timeline.filter((s) => s.status === 'COMPLETED').length} of {activeApp.timeline.length} Cleared
            </span>
          </div>
        </div>

        {/* 10-Stage Visual Step Progress Bar */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#D9E2EC]">
          {/* ======================================================= */}
          {/* STAGE 1 — APPLICATION SUBMITTED                          */}
          {/* ======================================================= */}
          <div className="relative group">
            <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <Check className="w-4 h-4" />
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 1 — Application Submitted
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#ECFDF5] text-[#059669]">
                    ✓ SUBMITTED
                  </span>
                </div>
                <span className="text-xs font-mono text-[#52708A]">{activeApp.appliedDate}</span>
              </div>
              <p className="text-xs text-[#52708A] mt-1">
                Application ID: <strong>{activeApp.id}</strong> • Position: <strong>{activeApp.jobTitle}</strong> • School: <strong>{activeApp.schoolName}</strong>
              </p>
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 2 — SCREENING / SHORTLISTING                       */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.applicationStatus === 'Shortlisted' ||
                activeApp.applicationStatus === 'Interview Scheduled' ||
                activeApp.applicationStatus === 'Selected' ||
                activeApp.applicationStatus === 'LOI Issued' ||
                activeApp.applicationStatus === 'LOI Accepted' ||
                activeApp.applicationStatus === 'Yet to Join' ||
                activeApp.applicationStatus === 'Joined'
                  ? 'bg-[#059669] text-white'
                  : 'bg-[#0057B8] text-white ring-4 ring-[#EAF4FF]'
              }`}
            >
              {activeApp.applicationStatus === 'Shortlisted' ||
              activeApp.applicationStatus === 'Interview Scheduled' ||
              activeApp.applicationStatus === 'Selected' ||
              activeApp.applicationStatus === 'LOI Issued' ||
              activeApp.applicationStatus === 'LOI Accepted' ||
              activeApp.applicationStatus === 'Yet to Join' ||
              activeApp.applicationStatus === 'Joined' ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>2</span>
              )}
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                activeApp.applicationStatus === 'Shortlisted'
                  ? 'bg-[#ECFDF5]/60 border-[#A7F3D0]'
                  : activeApp.applicationStatus === 'Submitted' ||
                    activeApp.applicationStatus === 'Under Review'
                  ? 'bg-[#F0F7FF] border-[#BFDDF5]'
                  : 'bg-[#F7F9FC] border-[#D9E2EC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 2 — Screening & UGC Scrutiny
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.applicationStatus === 'Shortlisted'
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : 'bg-[#EAF4FF] text-[#0057B8]'
                    }`}
                  >
                    {activeApp.applicationStatus === 'Shortlisted'
                      ? '✓ SHORTLISTED'
                      : 'UNDER REVIEW'}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#52708A]">HR Scrutiny Cell</span>
              </div>

              {activeApp.applicationStatus === 'Shortlisted' ? (
                <div className="mt-2 text-xs text-[#059669] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#059669]" />
                  <span>
                    Congratulations! You have been shortlisted for the next stage. Selection Committee interview scheduling is now unlocked.
                  </span>
                </div>
              ) : (
                <p className="text-xs text-[#52708A] mt-1">
                  Application Received ✓ • Currently under HR & Central Scrutiny Committee evaluation for UGC/AICTE minimum eligibility norms.
                </p>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 3 — INTERVIEW SCHEDULED                            */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.interviewStatus === 'Completed' ||
                activeApp.selectionStatus === 'Selected' ||
                activeApp.loiStatus === 'Issued' ||
                activeApp.loiStatus === 'Accepted'
                  ? 'bg-[#059669] text-white'
                  : activeApp.interviewStatus === 'Scheduled'
                  ? 'bg-[#0057B8] text-white ring-4 ring-[#EAF4FF]'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.interviewStatus === 'Completed' ||
              activeApp.selectionStatus === 'Selected' ||
              activeApp.loiStatus === 'Issued' ||
              activeApp.loiStatus === 'Accepted' ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>3</span>
              )}
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                activeApp.interviewStatus === 'Scheduled'
                  ? 'bg-[#F0F7FF] border-2 border-[#0057B8] shadow-sm'
                  : 'bg-white border-[#D9E2EC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 3 — Statutory Interview
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.interviewStatus === 'Scheduled'
                        ? 'bg-[#0057B8] text-white'
                        : activeApp.interviewStatus === 'Completed'
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.interviewStatus === 'Scheduled'
                      ? 'INTERVIEW SCHEDULED'
                      : activeApp.interviewStatus === 'Completed'
                      ? 'COMPLETED'
                      : 'NOT SCHEDULED'}
                  </span>
                </div>
              </div>

              {activeApp.interviewStatus === 'Scheduled' && activeApp.interviewDetails ? (
                <div className="space-y-3 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-[#D9E2EC]">
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Interview Type
                      </span>
                      <span className="font-bold text-[#003B68]">
                        {activeApp.interviewDetails.round}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Date & Time
                      </span>
                      <span className="font-bold text-[#0057B8]">
                        {activeApp.interviewDetails.date} • {activeApp.interviewDetails.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Mode & Venue
                      </span>
                      <span className="font-bold text-[#003B68]">
                        {activeApp.interviewDetails.mode} ({activeApp.interviewDetails.venue})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#52708A]">
                    <strong>Instructions:</strong> {activeApp.interviewDetails.instructions}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => onViewInterviewClick(activeApp.id)}
                      className="px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#BFDDF5]" />
                      <span>VIEW INTERVIEW DETAILS</span>
                    </button>

                    <a
                      href="https://calendar.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] transition-all flex items-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#0057B8]" />
                      <span>ADD TO CALENDAR</span>
                    </a>

                    <a
                      href="https://meet.google.com/new"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#003B68] hover:bg-[#002747] text-white text-xs font-bold transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <span>Join Virtual Room</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#71869A] mt-1">
                  Interview details will appear here once scheduled by the University Selection Committee.
                </p>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 4 — SELECTION STATUS                               */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.selectionStatus === 'Selected'
                  ? 'bg-[#059669] text-white'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.selectionStatus === 'Selected' ? <Check className="w-4 h-4" /> : <span>4</span>}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9E2EC]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 4 — Selection Status
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.selectionStatus === 'Selected'
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.selectionStatus === 'Selected' ? '✓ CANDIDATE SELECTED' : 'PENDING'}
                  </span>
                </div>
              </div>

              {activeApp.selectionStatus === 'Selected' ? (
                <div className="mt-2 text-xs text-[#059669] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>
                    ✓ Candidate Selected by the Statutory Selection Committee. Letter of Intent (LOI) is now unlocked.
                  </span>
                </div>
              ) : (
                <p className="text-xs text-[#52708A] mt-1">
                  Selection Committee evaluation concludes following oral interviews, micro-teaching demos, and credential vetting.
                </p>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 5 & 6 — LETTER OF INTENT & LOI ACCEPTANCE          */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.loiStatus === 'Accepted'
                  ? 'bg-[#059669] text-white'
                  : activeApp.loiStatus === 'Issued'
                  ? 'bg-[#0057B8] text-white ring-4 ring-[#EAF4FF]'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.loiStatus === 'Accepted' ? <Check className="w-4 h-4" /> : <span>5</span>}
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                activeApp.loiStatus === 'Issued'
                  ? 'bg-[#F0F7FF] border-2 border-[#0057B8] shadow-sm'
                  : activeApp.loiStatus === 'Accepted'
                  ? 'bg-[#ECFDF5]/60 border-[#A7F3D0]'
                  : 'bg-white border-[#D9E2EC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 5 & 6 — Letter of Intent (LOI)
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.loiStatus === 'Accepted'
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : activeApp.loiStatus === 'Issued'
                        ? 'bg-[#0057B8] text-white animate-pulse'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.loiStatus === 'Accepted'
                      ? '✓ LOI ACCEPTED'
                      : activeApp.loiStatus === 'Issued'
                      ? 'LETTER OF INTENT ISSUED'
                      : 'NOT ISSUED'}
                  </span>
                </div>
              </div>

              {activeApp.loiStatus === 'Issued' && activeApp.loiDetails ? (
                <div className="space-y-3 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-[#D9E2EC]">
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Position & Department
                      </span>
                      <span className="font-bold text-[#003B68]">
                        {activeApp.loiDetails.position} ({activeApp.loiDetails.schoolName})
                      </span>
                    </div>
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Reference Number & Issue Date
                      </span>
                      <span className="font-mono text-[#0057B8] font-bold">
                        {activeApp.loiDetails.refNumber} • Issued {activeApp.loiDetails.issueDate}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F0F7FF] rounded-xl border border-[#BFDDF5] text-xs">
                    <p className="font-bold text-[#003B68]">Do you wish to accept this offer?</p>
                    <p className="text-[#52708A] text-[11px] mt-0.5">
                      Acceptance deadline: <strong>{activeApp.loiDetails.acceptanceDeadline}</strong>. Accepting confirms your candidature and unlocks the Notice Period & Joining formalities.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => onAcceptLoiClick(activeApp.id)}
                      className="px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>ACCEPT LOI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeclineLoiClick(activeApp.id)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FEF2F2] text-[#DC2626] text-xs font-bold border border-[#FECACA] transition-all cursor-pointer"
                    >
                      <span>DECLINE LOI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigateTab('loi')}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] transition-all ml-auto"
                    >
                      <span>VIEW LOI DETAILS</span>
                    </button>
                  </div>
                </div>
              ) : activeApp.loiStatus === 'Accepted' && activeApp.loiDetails ? (
                <div className="mt-2 text-xs text-[#059669] font-semibold space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>✓ LOI ACCEPTED on {activeApp.loiDetails.acceptedDate || '28 Mar 2026'}.</span>
                  </div>
                  <p className="text-[11px] text-[#52708A] font-normal">
                    Notice Period & Relieving formalities have been activated below.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#71869A] mt-1">
                  Formal Letter of Intent will be issued following statutory selection committee concurrence.
                </p>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 7 — NOTICE PERIOD & RELIEVING                      */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.joiningStatus === 'Notice Period Submitted' ||
                activeApp.joiningStatus === 'Yet to Join' ||
                activeApp.joiningStatus === 'Joined'
                  ? 'bg-[#059669] text-white'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.joiningStatus === 'Notice Period Submitted' ||
              activeApp.joiningStatus === 'Yet to Join' ||
              activeApp.joiningStatus === 'Joined' ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>7</span>
              )}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9E2EC] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 7 — Notice Period & Relieving Details
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.noticePeriodDetails
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.noticePeriodDetails ? 'NOTICE PERIOD SUBMITTED' : 'PENDING SUBMISSION'}
                  </span>
                </div>
              </div>

              {activeApp.noticePeriodDetails ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#F0F7FF] p-3.5 rounded-xl border border-[#D9E2EC]">
                  <div>
                    <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                      Current Organization
                    </span>
                    <span className="font-bold text-[#003B68]">
                      {activeApp.noticePeriodDetails.currentOrganization}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                      Notice Period Days
                    </span>
                    <span className="font-bold text-[#0057B8]">
                      {activeApp.noticePeriodDetails.noticePeriodDays} Days
                    </span>
                  </div>
                  <div>
                    <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                      Expected Joining Date
                    </span>
                    <span className="font-bold text-[#059669]">
                      {activeApp.noticePeriodDetails.expectedJoiningDate}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  {!showNoticeForm ? (
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <p className="text-xs text-[#52708A]">
                        Submit your notice period duration and relieving date so campus quarters and labs can be allocated.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowNoticeForm(true)}
                        className="px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold cursor-pointer shrink-0 transition-colors"
                      >
                        Enter Notice Details
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleNoticeSubmit} className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                            Current Organization
                          </label>
                          <input
                            type="text"
                            value={currentOrg}
                            onChange={(e) => setCurrentOrg(e.target.value)}
                            required
                            className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:outline-none focus:border-[#0057B8]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                            Notice Period Duration
                          </label>
                          <select
                            value={noticeDays}
                            onChange={(e) => setNoticeDays(Number(e.target.value))}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] bg-white"
                          >
                            <option value={15}>15 Days</option>
                            <option value={30}>30 Days (1 Month)</option>
                            <option value={60}>60 Days (2 Months)</option>
                            <option value={90}>90 Days (3 Months)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                            Expected Last Working Date
                          </label>
                          <input
                            type="date"
                            value={lastWorkingDate}
                            onChange={(e) => setLastWorkingDate(e.target.value)}
                            required
                            className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:outline-none focus:border-[#0057B8]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                            Expected Joining Date at TNU
                          </label>
                          <input
                            type="date"
                            value={expectedJoiningDate}
                            onChange={(e) => setExpectedJoiningDate(e.target.value)}
                            required
                            className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:outline-none focus:border-[#0057B8]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold cursor-pointer transition-colors"
                        >
                          SUBMIT DETAILS
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNoticeForm(false)}
                          className="px-3 py-2 text-xs font-semibold text-[#52708A] hover:text-[#003B68] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 8 — DOCUMENT VERIFICATION                          */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.verificationStatus === 'Verified'
                  ? 'bg-[#059669] text-white'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.verificationStatus === 'Verified' ? <Check className="w-4 h-4" /> : <span>8</span>}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9E2EC] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 8 — Document Verification
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.verificationStatus === 'Verified'
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : activeApp.verificationStatus === 'Rejected — Re-upload Required'
                        ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.verificationStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Document verification checklist table */}
              <div className="divide-y divide-[#D9E2EC] border border-[#D9E2EC] rounded-xl overflow-hidden text-xs">
                {activeApp.verificationChecklist.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#F0F7FF]/50"
                  >
                    <div>
                      <span className="font-bold text-[#003B68]">{doc.docName}</span>
                      {doc.remarks && (
                        <p className="text-[11px] text-[#DC2626] mt-0.5 font-medium">
                          Note from HR: {doc.remarks}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          doc.status === 'Verified'
                            ? 'bg-[#ECFDF5] text-[#059669]'
                            : doc.status === 'Rejected'
                            ? 'bg-[#FEF2F2] text-[#DC2626]'
                            : doc.status === 'Under Verification'
                            ? 'bg-[#EAF4FF] text-[#0057B8]'
                            : 'bg-white text-[#71869A] border border-[#D9E2EC]'
                        }`}
                      >
                        {doc.status}
                      </span>

                      {doc.status === 'Rejected' && (
                        <button
                          type="button"
                          onClick={() => handleOpenReupload(doc.docName)}
                          className="px-2.5 py-1 rounded-lg bg-[#0057B8] hover:bg-[#003B68] text-white text-[10px] font-bold cursor-pointer transition-colors"
                        >
                          UPLOAD AGAIN
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 9 — PRE-ONBOARDING CHECKLIST                       */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.joiningStatus === 'Joined'
                  ? 'bg-[#059669] text-white'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.joiningStatus === 'Joined' ? <Check className="w-4 h-4" /> : <span>9</span>}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9E2EC] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 9 — Pre-Onboarding Checklist
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.joiningStatus === 'Joined'
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : activeApp.joiningStatus === 'Yet to Join'
                        ? 'bg-[#0057B8] text-white'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.joiningStatus === 'Joined'
                      ? '100% COMPLETE'
                      : activeApp.joiningStatus === 'Yet to Join'
                      ? '75% COMPLETE • YET TO JOIN'
                      : 'PENDING'}
                  </span>
                </div>
              </div>

              {activeApp.joiningStatus === 'Yet to Join' || activeApp.joiningStatus === 'Joined' ? (
                <div className="space-y-3">
                  <div className="w-full bg-[#D9E2EC] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#059669] h-full rounded-full transition-all duration-500"
                      style={{
                        width: activeApp.joiningStatus === 'Joined' ? '100%' : '75%',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#059669] font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Application Submitted</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#059669] font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Selected by Selection Committee</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#059669] font-semibold">
                      <Check className="w-4 h-4" />
                      <span>LOI Accepted</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#059669] font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Notice Period Submitted</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#059669] font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Documents Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#003B68]">
                      <span className="w-4 h-4 rounded-full border border-[#71869A] inline-block" />
                      <span>Joining Date Confirmed</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F0F7FF] rounded-xl border border-[#D9E2EC] text-xs">
                    <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                      Target Reporting
                    </span>
                    <span className="font-bold text-[#003B68]">
                      Expected Joining Date: {activeApp.noticePeriodDetails?.expectedJoiningDate || '02 Nov 2026'} • Status: <strong className="text-[#0057B8]">YET TO JOIN</strong>
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#71869A]">
                  Pre-onboarding checklist activates following LOI acceptance and document verification completion.
                </p>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* STAGE 10 — JOINING COMPLETED                             */}
          {/* ======================================================= */}
          <div className="relative group">
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeApp.joiningStatus === 'Joined'
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
              }`}
            >
              {activeApp.joiningStatus === 'Joined' ? <Check className="w-4 h-4" /> : <span>10</span>}
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                activeApp.joiningStatus === 'Joined'
                  ? 'bg-gradient-to-br from-[#ECFDF5] to-white border-2 border-[#059669] shadow-md'
                  : 'bg-white border-[#D9E2EC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                    Stage 10 — Joining & Campus Induction
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      activeApp.joiningStatus === 'Joined'
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#F7F9FC] text-[#71869A]'
                    }`}
                  >
                    {activeApp.joiningStatus === 'Joined' ? '🎉 JOINING COMPLETED' : 'FINAL STAGE'}
                  </span>
                </div>
              </div>

              {activeApp.joiningStatus === 'Joined' ? (
                <div className="space-y-3 mt-2 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-[#059669]/40 shadow-xs space-y-2">
                    <div className="text-base font-serif font-bold text-[#059669] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#0057B8]" />
                      Welcome to The Neotia University Faculty!
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                      <div>
                        <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                          Employee Code
                        </span>
                        <span className="font-mono font-bold text-[#003B68]">TNU-FAC-2026-104</span>
                      </div>
                      <div>
                        <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                          Confirmed Joining Date
                        </span>
                        <span className="font-bold text-[#059669]">02 November 2026</span>
                      </div>
                      <div>
                        <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                          Allotted Department & Campus
                        </span>
                        <span className="font-bold text-[#003B68]">
                          {activeApp.department}, Sarisha Campus
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#71869A] mt-1">
                  Joining confirmation takes place on reporting day at the Office of the Registrar, The Neotia University.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. MODAL: RE-UPLOAD DOCUMENT MODAL                        */}
      {/* ========================================================= */}
      {showReuploadModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
              <h3 className="text-base font-serif font-bold text-[#003B68] flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#0057B8]" />
                Re-upload Document
              </h3>
              <button
                type="button"
                onClick={() => setShowReuploadModal(false)}
                className="text-[#52708A] hover:text-[#003B68] p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#52708A]">
              Target document: <strong>{reuploadTargetDoc}</strong>. Please attach an updated, high-resolution copy for HR verification.
            </p>

            <label className="border-2 border-dashed border-[#D9E2EC] hover:border-[#0057B8] rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#F0F7FF]/60 hover:bg-[#F0F7FF] transition-all">
              <UploadCloud className="w-8 h-8 text-[#0057B8]" />
              <span className="text-xs font-semibold text-[#003B68]">
                Choose replacement file (PDF / DOCX)
              </span>
              <span className="text-[10px] text-[#52708A]">Up to 15MB</span>
              <input type="file" className="hidden" />
            </label>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReuploadModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReupload}
                className="flex-1 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Submit Re-upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
