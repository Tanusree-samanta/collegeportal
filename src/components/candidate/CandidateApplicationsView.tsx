import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Download,
  Building,
  Briefcase,
  User,
  GraduationCap,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  UploadCloud,
  FileText,
  HelpCircle,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  CandidateApplication,
  InterviewDetails,
  LetterOfIntent,
  NoticePeriodDetails,
  VerificationItem,
  PreOnboardingTask,
} from '../../types';

interface CandidateApplicationsViewProps {
  applications: CandidateApplication[];
  selectedAppId: string | null;
  onSelectApplication: (id: string) => void;
  onAcceptLoi: (appId: string, acceptanceDate: string) => void;
  onDeclineLoi: (appId: string, reason: string) => void;
  onUpdateNoticePeriod: (appId: string, details: NoticePeriodDetails) => void;
  onTogglePreOnboardingTask: (appId: string, taskId: string) => void;
  onConfirmInterviewAttendance: (appId: string) => void;
}

export const CandidateApplicationsView: React.FC<CandidateApplicationsViewProps> = ({
  applications,
  selectedAppId,
  onSelectApplication,
  onAcceptLoi,
  onDeclineLoi,
  onUpdateNoticePeriod,
  onTogglePreOnboardingTask,
  onConfirmInterviewAttendance,
}) => {
  const [filterTab, setFilterTab] = useState<'All' | 'Under Review' | 'Interview' | 'LOI / Offer'>('All');
  const [activePanelTab, setActivePanelTab] = useState<'timeline' | 'interview' | 'loi' | 'notice' | 'verification' | 'onboarding'>('timeline');

  // Modals inside application view
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [interviewConfirmed, setInterviewConfirmed] = useState(false);

  // Notice Period form state
  const [currentOrg, setCurrentOrg] = useState('Kolkata Institute of Advanced Computing');
  const [noticeDays, setNoticeDays] = useState(60);
  const [lastWorkingDate, setLastWorkingDate] = useState('2026-05-30');
  const [expectedJoinDate, setExpectedJoinDate] = useState('2026-06-01');

  // Selected application
  const activeApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const filteredApps = applications.filter((app) => {
    if (filterTab === 'All') return true;
    if (filterTab === 'Under Review') return app.applicationStatus === 'Submitted' || app.applicationStatus === 'Under Review';
    if (filterTab === 'Interview') return app.interviewStatus === 'Scheduled' || app.interviewStatus === 'Completed';
    if (filterTab === 'LOI / Offer') return app.loiStatus === 'Issued' || app.loiStatus === 'Accepted';
    return true;
  });

  const handleLoiAcceptSubmit = () => {
    if (activeApp) {
      onAcceptLoi(activeApp.id, new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
      setShowLoiModal(false);
    }
  };

  const handleLoiDeclineSubmit = () => {
    if (activeApp && declineReason) {
      onDeclineLoi(activeApp.id, declineReason);
      setShowDeclineConfirm(false);
      setShowLoiModal(false);
    }
  };

  const handleNoticePeriodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeApp) {
      onUpdateNoticePeriod(activeApp.id, {
        currentOrganization: currentOrg,
        currentlyEmployed: true,
        noticePeriodDays: Number(noticeDays),
        lastWorkingDate,
        expectedJoiningDate: expectedJoinDate,
        submittedAt: 'Today',
      });
      setShowNoticeModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================= */}
      {/* 1. HEADER & FILTER BAR                                   */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68]">
            Application Tracking & Lifecycle
          </h1>
          <p className="text-xs text-[#52708A] mt-0.5">
            Monitor real-time status across statutory screening, interviews, LOI, notice period, and onboarding.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F9FC] rounded-xl border border-[#D9E2EC] self-start sm:self-auto overflow-x-auto max-w-full">
          {(['All', 'Under Review', 'Interview', 'LOI / Offer'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterTab === tab
                  ? 'bg-[#0057B8] text-white shadow-xs'
                  : 'text-[#52708A] hover:text-[#0057B8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SPLIT LAYOUT: APPLICATIONS LIST & DETAILED WORKSPACE   */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Application Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-[#71869A] uppercase tracking-wider px-1">
            Applications ({filteredApps.length})
          </div>

          <div className="space-y-3">
            {filteredApps.map((app) => {
              const isSelected = app.id === activeApp?.id;
              return (
                <div
                  key={app.id}
                  onClick={() => {
                    onSelectApplication(app.id);
                    if (app.loiStatus === 'Issued') setActivePanelTab('loi');
                    else if (app.interviewStatus === 'Scheduled') setActivePanelTab('interview');
                    else setActivePanelTab('timeline');
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-white border-[#0057B8] shadow-md ring-2 ring-[#0057B8]/15'
                      : 'bg-white border-[#D9E2EC] hover:border-[#BFDDF5] hover:shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#0057B8]" />
                  )}

                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-[#71869A] uppercase tracking-wider">
                      {app.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        app.applicationStatus === 'LOI Issued'
                          ? 'bg-[#EAF4FF] text-[#0057B8] border-[#BFDDF5]'
                          : app.applicationStatus === 'Interview Scheduled'
                          ? 'bg-[#EFF6FF] text-[#0057B8] border-[#BFDDF5]'
                          : app.applicationStatus === 'Selected' || app.applicationStatus === 'Joined'
                          ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                          : 'bg-[#F7F9FC] text-[#52708A] border-[#D9E2EC]'
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#003B68] line-clamp-2 leading-snug">
                    {app.jobTitle}
                  </h3>
                  <p className="text-xs text-[#52708A] mt-1">{app.schoolName}</p>

                  <div className="mt-3 pt-2.5 border-t border-[#D9E2EC] flex items-center justify-between text-[11px] text-[#71869A]">
                    <span>Applied: {app.appliedDate}</span>
                    <span className="font-semibold text-[#0057B8] flex items-center gap-0.5">
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Workspace for Selected Application */}
        {activeApp && (
          <div className="lg:col-span-8 space-y-5">
            {/* Header for Active Application */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-mono text-[#0057B8] bg-[#EAF4FF] font-bold px-2.5 py-0.5 rounded-full border border-[#BFDDF5]">
                      Dossier ID: {activeApp.id}
                    </span>
                    <span className="text-xs text-[#71869A]">Applied on {activeApp.appliedDate}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68] leading-tight">
                    {activeApp.jobTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#52708A] mt-1 flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[#123B5D]">{activeApp.schoolName}</span>
                    <span>•</span>
                    <span>{activeApp.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0057B8]" />
                      {activeApp.location}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1 shrink-0">
                  <div className="text-[11px] uppercase tracking-wider text-[#71869A] font-semibold">
                    Current Milestone
                  </div>
                  <div className="text-sm font-bold text-[#0057B8] bg-[#EAF4FF] px-3 py-1 rounded-lg border border-[#BFDDF5]">
                    {activeApp.applicationStatus}
                  </div>
                </div>
              </div>

              {/* Subtabs for Action & Inspection */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#D9E2EC] overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActivePanelTab('timeline')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === 'timeline'
                      ? 'bg-[#0057B8] text-white shadow-xs'
                      : 'bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>10-Stage Lifecycle</span>
                </button>

                {activeApp.interviewDetails && (
                  <button
                    type="button"
                    onClick={() => setActivePanelTab('interview')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      activePanelTab === 'interview'
                        ? 'bg-[#0057B8] text-white shadow-xs'
                        : 'bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#0057B8]" />
                    <span>Interview Details</span>
                    {activeApp.interviewStatus === 'Scheduled' && (
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    )}
                  </button>
                )}

                {activeApp.loiDetails && (
                  <button
                    type="button"
                    onClick={() => setActivePanelTab('loi')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      activePanelTab === 'loi'
                        ? 'bg-[#0057B8] text-white shadow-xs'
                        : 'bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8]'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-[#0057B8]" />
                    <span>Letter of Intent (LOI)</span>
                    {activeApp.loiStatus === 'Issued' && (
                      <span className="w-2 h-2 rounded-full bg-[#0057B8] animate-pulse" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActivePanelTab('notice')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === 'notice'
                      ? 'bg-[#0057B8] text-white shadow-xs'
                      : 'bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Notice Period</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanelTab('verification')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === 'verification'
                      ? 'bg-[#0057B8] text-white shadow-xs'
                      : 'bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Document Scrutiny</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanelTab('onboarding')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === 'onboarding'
                      ? 'bg-[#0057B8] text-white shadow-xs'
                      : 'bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pre-Onboarding</span>
                </button>
              </div>
            </div>

            {/* ======================================================= */}
            {/* SUBTAB 1: 10-STAGE LIFECYCLE TRACKER                     */}
            {/* ======================================================= */}
            {activePanelTab === 'timeline' && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#003B68]">
                      Academic Appointment Progression (10 Stages)
                    </h3>
                    <p className="text-xs text-[#52708A] mt-0.5">
                      Statutory stages governed by The Neotia University Faculty Recruitment Regulations.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0057B8] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#BFDDF5]">
                    {activeApp.timeline.filter((s) => s.status === 'COMPLETED').length} / {activeApp.timeline.length} Cleared
                  </span>
                </div>

                {/* Vertical Stepper Timeline */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#D9E2EC]">
                  {activeApp.timeline.map((stage, idx) => {
                    const isCompleted = stage.status === 'COMPLETED';
                    const isCurrent = stage.status === 'CURRENT';

                    return (
                      <div key={stage.stageKey} className="relative group">
                        {/* Status Icon Indicator */}
                        <div
                          className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-[#059669] text-white shadow-xs'
                              : isCurrent
                              ? 'bg-[#0057B8] text-white ring-4 ring-[#0057B8]/20 shadow-xs'
                              : 'bg-white border-2 border-[#D9E2EC] text-[#71869A]'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : isCurrent ? (
                            <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        <div
                          className={`p-4 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-[#EAF4FF]/40 border-[#BFDDF5] shadow-xs'
                              : 'bg-white border-[#D9E2EC]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h4
                              className={`text-sm font-bold ${
                                isCurrent
                                  ? 'text-[#0057B8]'
                                  : isCompleted
                                  ? 'text-[#003B68]'
                                  : 'text-[#71869A]'
                              }`}
                            >
                              {stage.label}
                            </h4>
                            <span className="text-[11px] font-mono text-[#71869A]">
                              {stage.date}
                            </span>
                          </div>
                          <p className="text-xs text-[#52708A]">{stage.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* SUBTAB 2: INTERVIEW DETAILS & MEETING ROOM               */}
            {/* ======================================================= */}
            {activePanelTab === 'interview' && activeApp.interviewDetails && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#0057B8] tracking-wider">
                      Statutory Selection Committee Round
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#003B68] mt-0.5">
                      {activeApp.interviewDetails.round}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                      activeApp.interviewDetails.status === 'Completed'
                        ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                        : 'bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5]'
                    }`}
                  >
                    Status: {activeApp.interviewDetails.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
                    <div className="text-[11px] font-semibold text-[#71869A] uppercase tracking-wider mb-1">
                      Date & Schedule
                    </div>
                    <div className="text-sm font-bold text-[#003B68] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0057B8]" />
                      {activeApp.interviewDetails.date}
                    </div>
                    <div className="text-xs text-[#52708A] mt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#71869A]" />
                      {activeApp.interviewDetails.time}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
                    <div className="text-[11px] font-semibold text-[#71869A] uppercase tracking-wider mb-1">
                      Mode & Venue
                    </div>
                    <div className="text-sm font-bold text-[#003B68]">
                      Mode: {activeApp.interviewDetails.mode}
                    </div>
                    <div className="text-xs text-[#52708A] mt-1">
                      {activeApp.interviewDetails.venue}
                    </div>
                  </div>
                </div>

                {/* Committee Instructions */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#EAF4FF]/40 border border-[#BFDDF5]">
                  <h4 className="text-xs font-bold text-[#0057B8] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0057B8]" />
                    Selection Committee Presentation Instructions
                  </h4>
                  <p className="text-xs text-[#123B5D] leading-relaxed">
                    {activeApp.interviewDetails.instructions}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://meet.google.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Enter Virtual Committee Room</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      onConfirmInterviewAttendance(activeApp.id);
                      setInterviewConfirmed(true);
                    }}
                    disabled={interviewConfirmed}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      interviewConfirmed
                        ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                        : 'bg-white hover:bg-[#F7F9FC] text-[#003B68] border-[#D9E2EC] cursor-pointer'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>{interviewConfirmed ? 'Attendance Confirmed' : 'Confirm Attendance'}</span>
                  </button>

                  {activeApp.interviewDetails.calendarLink && (
                    <a
                      href={activeApp.interviewDetails.calendarLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] hover:text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Add to Google Calendar</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* SUBTAB 3: LETTER OF INTENT (LOI) & ACCEPTANCE MODAL      */}
            {/* ======================================================= */}
            {activePanelTab === 'loi' && activeApp.loiDetails && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#0057B8] tracking-wider">
                      Formal Offer Document
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#003B68] mt-0.5">
                      Letter of Intent (LOI)
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                      activeApp.loiDetails.status === 'Accepted'
                        ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                        : activeApp.loiDetails.status === 'Declined'
                        ? 'bg-[#FDF2F2] text-[#E02424] border border-[#F8B4B4]'
                        : 'bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5]'
                    }`}
                  >
                    LOI Status: {activeApp.loiDetails.status}
                  </span>
                </div>

                {/* Institutional Letterhead Preview */}
                <div className="p-6 rounded-2xl bg-[#F7F9FC] border-2 border-[#BFDDF5] text-[#123B5D] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[#003B68] uppercase">
                        THE NEOTIA UNIVERSITY • OFFICE OF THE REGISTRAR
                      </div>
                      <div className="text-[11px] text-[#71869A]">
                        Sarisha, Diamond Harbour Road, 24 Parganas (S), West Bengal – 743368
                      </div>
                    </div>
                    <div className="text-right text-[11px] font-mono text-[#52708A]">
                      <div>Ref: {activeApp.loiDetails.refNumber}</div>
                      <div>Date: {activeApp.loiDetails.issueDate}</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-[#52708A]">To,</p>
                    <p className="text-sm font-bold text-[#003B68]">{activeApp.loiDetails.candidateName}</p>
                    <p className="text-xs text-[#52708A]">
                      Candidate for: <span className="font-semibold text-[#0057B8]">{activeApp.loiDetails.position}</span>
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-[#123B5D]">
                    We are pleased to inform you that upon the recommendation of the University Statutory Selection Committee and subsequent approval of the Vice-Chancellor & Governing Body, The Neotia University issues this <strong>Letter of Intent (LOI)</strong> for the position of <strong>{activeApp.loiDetails.position}</strong> under the <strong>{activeApp.loiDetails.schoolName}</strong>.
                  </p>

                  <div className="p-4 rounded-xl bg-white border border-[#D9E2EC] space-y-2">
                    <div className="text-xs font-bold text-[#003B68] uppercase tracking-wide">
                      Statutory Pay Structure & Remuneration:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#71869A]">Basic Entry Pay: </span>
                        <span className="font-bold text-[#003B68]">{activeApp.loiDetails.basicPay}</span>
                      </div>
                      <div>
                        <span className="text-[#71869A]">Governing Scale: </span>
                        <span className="font-semibold text-[#123B5D]">{activeApp.loiDetails.scale}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#52708A]">
                    Acceptance deadline: <strong className="text-[#0057B8]">{activeApp.loiDetails.acceptanceDeadline}</strong>. Please confirm your acceptance by signing electronically below.
                  </p>
                </div>

                {/* Acceptance CTA bar */}
                {activeApp.loiDetails.status === 'Pending' ? (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowLoiModal(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-white" />
                      <span>Review & Accept Letter of Intent</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowDeclineConfirm(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FDF2F2] text-[#E02424] text-xs font-bold border border-[#F8B4B4] transition-all cursor-pointer"
                    >
                      <span>Decline Offer</span>
                    </button>

                    <a
                      href="#download-loi"
                      onClick={(e) => {
                        e.preventDefault();
                        window.print();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-semibold border border-[#D9E2EC] transition-all ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official PDF</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      <div>
                        <div className="text-xs font-bold text-[#059669]">
                          Letter of Intent Accepted
                        </div>
                        <div className="text-[11px] text-[#52708A]">
                          Signed electronically on {activeApp.loiDetails.acceptedDate || '28 Mar 2026'}. Office of the Registrar notified.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActivePanelTab('notice')}
                      className="text-xs font-bold text-[#0057B8] hover:underline"
                    >
                      Proceed to Notice Period →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================= */}
            {/* SUBTAB 4: NOTICE PERIOD TRACKING                         */}
            {/* ======================================================= */}
            {activePanelTab === 'notice' && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#003B68]">
                      Notice Period & Relieving Formalities
                    </h3>
                    <p className="text-xs text-[#52708A] mt-0.5">
                      Keep the University updated on your current employer notice duration and anticipated reporting date.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNoticeModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Update Notice Info</span>
                  </button>
                </div>

                {/* Current Notice Status Card */}
                {activeApp.noticePeriodDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
                      <div className="text-[11px] text-[#71869A] uppercase font-semibold">
                        Current Employer
                      </div>
                      <div className="text-sm font-bold text-[#003B68] mt-1">
                        {activeApp.noticePeriodDetails.currentOrganization}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
                      <div className="text-[11px] text-[#71869A] uppercase font-semibold">
                        Notice Duration
                      </div>
                      <div className="text-sm font-bold text-[#0057B8] mt-1">
                        {activeApp.noticePeriodDetails.noticePeriodDays} Days
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
                      <div className="text-[11px] text-[#71869A] uppercase font-semibold">
                        Target Joining Date
                      </div>
                      <div className="text-sm font-bold text-[#059669] mt-1">
                        {activeApp.noticePeriodDetails.expectedJoiningDate}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-center space-y-2">
                    <Clock className="w-8 h-8 text-[#0057B8] mx-auto" />
                    <h4 className="text-sm font-bold text-[#003B68]">Notice Period Not Recorded Yet</h4>
                    <p className="text-xs text-[#52708A] max-w-md mx-auto">
                      If you are currently employed, please submit your notice period duration and tentative relieving date so the Registrar Office can reserve your faculty quarters and laboratory space.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowNoticeModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0057B8] text-white text-xs font-bold cursor-pointer mt-2"
                    >
                      Record Notice Period Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================= */}
            {/* SUBTAB 5: DOCUMENT VERIFICATION SCRUTINY CHECKLIST       */}
            {/* ======================================================= */}
            {activePanelTab === 'verification' && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#003B68]">
                    Mandatory Statutory Verification Checklist
                  </h3>
                  <p className="text-xs text-[#52708A] mt-0.5">
                    Scrutiny cell records for University Senate and Governing Body record keeping.
                  </p>
                </div>

                <div className="divide-y divide-[#D9E2EC] border border-[#D9E2EC] rounded-xl overflow-hidden">
                  {activeApp.verificationChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-[#F7F9FC] transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#003B68]">{item.docName}</div>
                        {item.remarks && (
                          <div className="text-xs text-[#52708A] mt-0.5">
                            Note: {item.remarks}
                          </div>
                        )}
                        <div className="text-[11px] text-[#71869A] mt-0.5">
                          Last Updated: {item.lastUpdated}
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
                          item.status === 'Verified'
                            ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                            : item.status === 'Under Verification'
                            ? 'bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5]'
                            : 'bg-[#F7F9FC] text-[#71869A] border border-[#D9E2EC]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* SUBTAB 6: PRE-ONBOARDING TASKS                           */}
            {/* ======================================================= */}
            {activePanelTab === 'onboarding' && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#003B68]">
                    Pre-Onboarding & Joining Formalities
                  </h3>
                  <p className="text-xs text-[#52708A] mt-0.5">
                    Clear these milestones before physical reporting at the Sarisha Campus.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {activeApp.preOnboardingTasks.length > 0 ? (
                    activeApp.preOnboardingTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onTogglePreOnboardingTask(activeApp.id, task.id)}
                        className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          task.isCompleted
                            ? 'bg-[#F7F9FC] border-[#D9E2EC] text-[#52708A]'
                            : 'bg-white border-[#D9E2EC] hover:border-[#0057B8] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              task.isCompleted
                                ? 'bg-[#059669] border-[#059669] text-white'
                                : 'border-[#71869A] bg-white'
                            }`}
                          >
                            {task.isCompleted && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span
                              className={`text-xs sm:text-sm font-semibold ${
                                task.isCompleted ? 'line-through text-[#71869A]' : 'text-[#003B68]'
                              }`}
                            >
                              {task.label}
                            </span>
                            {task.completedAt && (
                              <div className="text-[10px] text-[#71869A]">
                                Completed on {task.completedAt}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-[#71869A]">
                          {task.isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 rounded-xl bg-[#F7F9FC] text-center text-xs text-[#71869A]">
                      Pre-onboarding checklist activates upon formal LOI acceptance.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. MODAL: LOI ACCEPTANCE CONFIRMATION                     */}
      {/* ========================================================= */}
      {showLoiModal && activeApp && activeApp.loiDetails && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
              <h3 className="text-base font-serif font-bold text-[#003B68] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0057B8]" />
                Electronic LOI Acceptance
              </h3>
              <button
                type="button"
                onClick={() => setShowLoiModal(false)}
                className="p-1 text-[#71869A] hover:text-[#003B68] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#52708A] leading-relaxed">
              By confirming below, you record your binding acceptance of the Letter of Intent Ref: <strong>{activeApp.loiDetails.refNumber}</strong> for the post of <strong>{activeApp.loiDetails.position}</strong> under the 7th CPC scale.
            </p>

            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] text-xs space-y-1">
              <div><strong>Candidate:</strong> {activeApp.loiDetails.candidateName}</div>
              <div><strong>Pay Scale:</strong> {activeApp.loiDetails.scale}</div>
              <div><strong>Acceptance Timestamp:</strong> Today, {new Date().toLocaleTimeString()}</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLoiModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLoiAcceptSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Sign & Accept LOI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MODAL: DECLINE LOI CONFIRMATION                        */}
      {/* ========================================================= */}
      {showDeclineConfirm && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-serif font-bold text-[#E02424]">
              Decline Letter of Intent
            </h3>
            <p className="text-xs text-[#52708A]">
              Please state the reason for declining this offer (optional feedback for the Selection Committee):
            </p>

            <textarea
              rows={3}
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="e.g. Relocation constraints, accepted another offer, etc."
              className="w-full text-xs p-3 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
            />

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeclineConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLoiDeclineSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#E02424] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODAL: UPDATE NOTICE PERIOD                            */}
      {/* ========================================================= */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleNoticePeriodSubmit}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
              <h3 className="text-base font-serif font-bold text-[#003B68]">
                Update Notice Period Details
              </h3>
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
                className="p-1 text-[#71869A] hover:text-[#003B68] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                Current Employer / Institute
              </label>
              <input
                type="text"
                value={currentOrg}
                onChange={(e) => setCurrentOrg(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                Notice Period Duration
              </label>
              <select
                value={noticeDays}
                onChange={(e) => setNoticeDays(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              >
                <option value={15}>15 Days</option>
                <option value={30}>30 Days (1 Month)</option>
                <option value={60}>60 Days (2 Months)</option>
                <option value={90}>90 Days (3 Months)</option>
                <option value={0}>Immediate / Not Employed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                  Last Working Date
                </label>
                <input
                  type="date"
                  value={lastWorkingDate}
                  onChange={(e) => setLastWorkingDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                  Expected Joining
                </label>
                <input
                  type="date"
                  value={expectedJoinDate}
                  onChange={(e) => setExpectedJoinDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
