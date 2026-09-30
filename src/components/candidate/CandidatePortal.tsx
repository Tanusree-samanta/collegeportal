import React, { useState } from 'react';
import {
  CandidateProfile,
  CandidateApplication,
  CandidateDocument,
  DraftApplication,
  CandidateNotification,
  VacantPosition,
  ApplicationFormData,
  NoticePeriodDetails,
} from '../../types';
import {
  INITIAL_CANDIDATE_PROFILE,
  INITIAL_APPLICATIONS,
  INITIAL_CANDIDATE_DOCUMENTS,
  INITIAL_DRAFTS,
  INITIAL_NOTIFICATIONS,
} from '../../data/candidateData';
import { VACANT_POSITIONS_DATA } from '../../data/positions';
import { SCHOOLS_DATA } from '../../data/schools';
import { CandidateSidebar, CandidateTab } from './CandidateSidebar';
import { CandidateDashboardView } from './CandidateDashboardView';
import { CandidateOpenPositionsView } from './CandidateOpenPositionsView';
import { CandidateApplicationsView } from './CandidateApplicationsView';
import { CandidateDocumentsView } from './CandidateDocumentsView';
import { CandidateNotificationsView } from './CandidateNotificationsView';
import { CandidateProfileView } from './CandidateProfileView';
import { JobDetailsModal } from './JobDetailsModal';
import { CandidateApplicationFlow } from './CandidateApplicationFlow';
import { Footer } from '../Footer';
import {
  Menu,
  X,
  ExternalLink,
  Bell,
  Sparkles,
  Lock,
  Calendar,
  Award,
  CheckCircle2,
  ShieldCheck,
  Download,
  AlertCircle,
  FileCheck2,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { TnuLogo } from '../TnuLogo';

interface CandidatePortalProps {
  onSwitchToPublicPortal: () => void;
  onLogout: () => void;
  initialTab?: CandidateTab;
  initialApplicationId?: string;
  initialApplications?: CandidateApplication[];
  initialProfile?: CandidateProfile;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({
  onSwitchToPublicPortal,
  onLogout,
  initialTab = 'dashboard',
  initialApplicationId,
  initialApplications,
  initialProfile,
}) => {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<CandidateTab>(initialTab);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Central State for Candidate Data
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(
    initialProfile || INITIAL_CANDIDATE_PROFILE
  );
  const [applications, setApplications] = useState<CandidateApplication[]>(
    initialApplications && initialApplications.length > 0
      ? initialApplications
      : INITIAL_APPLICATIONS
  );
  const [documents, setDocuments] = useState<CandidateDocument[]>(INITIAL_CANDIDATE_DOCUMENTS);
  const [drafts, setDrafts] = useState<DraftApplication[]>(INITIAL_DRAFTS);
  const [notifications, setNotifications] = useState<CandidateNotification[]>(INITIAL_NOTIFICATIONS);

  // Active Selected Application
  const [selectedAppId, setSelectedAppId] = useState<string>(
    initialApplicationId || applications[0]?.id || 'TNU-APP-2026-8942'
  );

  // Modals / Flows
  const [selectedPositionForDetails, setSelectedPositionForDetails] = useState<VacantPosition | null>(null);
  const [selectedPositionForApply, setSelectedPositionForApply] = useState<VacantPosition | null>(null);
  const [bookmarkedPositions, setBookmarkedPositions] = useState<string[]>(['pos-ai-ml']);
  const [lockedToast, setLockedToast] = useState<{ title: string; reason: string } | null>(null);

  // Active Application Record
  const activeApp = applications.find((a) => a.id === selectedAppId) || applications[0] || null;

  // Counters
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const totalApplicationsCount = applications.length;

  const showLockedNotice = (title: string, reason: string) => {
    setLockedToast({ title, reason });
    setTimeout(() => setLockedToast(null), 3500);
  };

  // =========================================================
  // HR PROGRESSION SIMULATOR HANDLERS
  // =========================================================
  const handleSimulateHrStage = (action: string) => {
    if (!activeApp) return;

    if (action === 'shortlist') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            applicationStatus: 'Shortlisted',
            lastUpdated: 'Just now by HR',
            timeline: app.timeline.map((s) => {
              if (s.stageKey === 'screening' || s.stageKey === 'shortlisted') {
                return { ...s, status: 'COMPLETED', date: 'Today' };
              }
              if (s.stageKey === 'interview') {
                return { ...s, status: 'CURRENT' };
              }
              return s;
            }),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'status',
          title: 'Congratulations! You have been shortlisted',
          message: `Your dossier ${activeApp.id} for ${activeApp.jobTitle} has cleared central HR screening. Interview scheduling is now available.`,
          timestamp: 'Just now',
          read: false,
          actionLabel: 'View Journey',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'schedule_interview') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            applicationStatus: 'Interview Scheduled',
            interviewStatus: 'Scheduled',
            lastUpdated: 'Just now by HR',
            interviewDetails: {
              round: 'Selection Committee Technical Interview',
              date: '15 October 2026',
              time: '11:00 AM IST',
              mode: 'Online',
              venue: 'Google Meet Virtual Boardroom (Room #4B)',
              instructions:
                'Please keep your camera on and prepare a 10-minute presentation on pedagogy, research roadmap, and sponsored grant pipeline.',
              calendarLink: 'https://calendar.google.com',
              status: 'Scheduled',
            },
            timeline: app.timeline.map((s) => {
              if (s.stageKey === 'interview') {
                return { ...s, status: 'CURRENT', date: '15 Oct 2026' };
              }
              return s;
            }),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'interview',
          title: 'Your interview has been scheduled',
          message: `Statutory Selection Committee interview scheduled for 15 October 2026, 11:00 AM (Online mode).`,
          timestamp: 'Just now',
          read: false,
          actionLabel: 'View Meeting Details',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'mark_selected') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            selectionStatus: 'Selected',
            interviewStatus: 'Completed',
            lastUpdated: 'Just now by HR',
            timeline: app.timeline.map((s) => {
              if (s.stageKey === 'interview' || s.stageKey === 'selection') {
                return { ...s, status: 'COMPLETED', date: 'Today' };
              }
              if (s.stageKey === 'loi_issued') {
                return { ...s, status: 'CURRENT' };
              }
              return s;
            }),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'status',
          title: 'Your selection status has been updated',
          message: `The Selection Committee has officially recommended your appointment as ${activeApp.jobTitle}. Letter of Intent generation is in progress.`,
          timestamp: 'Just now',
          read: false,
          actionLabel: 'Check Status',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'issue_loi') {
      const issueDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            applicationStatus: 'LOI Issued',
            selectionStatus: 'Selected',
            loiStatus: 'Issued',
            lastUpdated: 'Just now by HR',
            loiDetails: {
              refNumber: `TNU/REG/REC-2026/${Math.floor(100 + Math.random() * 900)}`,
              position: app.jobTitle,
              schoolName: app.schoolName,
              candidateName: candidateProfile.fullName,
              issueDate,
              acceptanceDeadline: '10 Days from issue',
              basicPay: '₹1,44,200 / month',
              scale: 'UGC 7th CPC Academic Pay Level 14',
              status: 'Pending',
            },
            timeline: app.timeline.map((s) => {
              if (s.stageKey === 'loi_issued') {
                return { ...s, status: 'CURRENT', date: issueDate };
              }
              return s;
            }),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'loi',
          title: 'Your Letter of Intent is now available',
          message: `Formal Letter of Intent (LOI) Ref: TNU/REG/REC-2026/041 has been issued. Action Required: Please review and accept by deadline.`,
          timestamp: 'Just now',
          read: false,
          actionLabel: 'Review & Accept LOI',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'flag_rejection') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            verificationStatus: 'Rejected — Re-upload Required',
            lastUpdated: 'Just now by Scrutiny Cell',
            verificationChecklist: app.verificationChecklist.map((item, idx) =>
              idx === 0
                ? {
                    ...item,
                    status: 'Rejected',
                    remarks: 'Document scan blurry / seal illegible. Please re-upload clear high-res PDF.',
                    lastUpdated: 'Just now',
                  }
                : item
            ),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'document',
          title: 'Your document requires re-upload',
          message:
            'Central Scrutiny Cell flagged 1 document for re-upload: Master CV / Degree Certificate scan requires higher resolution.',
          timestamp: 'Just now',
          read: false,
          actionLabel: 'Re-upload Document',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'verify_all') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            verificationStatus: 'Verified',
            lastUpdated: 'Just now by Scrutiny Cell',
            verificationChecklist: app.verificationChecklist.map((item) => ({
              ...item,
              status: 'Verified',
              remarks: 'Authenticated against original university records',
              lastUpdated: 'Today',
            })),
            timeline: app.timeline.map((s) => {
              if (s.stageKey === 'verification') {
                return { ...s, status: 'COMPLETED', date: 'Today' };
              }
              if (s.stageKey === 'joining') {
                return { ...s, status: 'CURRENT' };
              }
              return s;
            }),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'document',
          title: 'Your documents are currently verified',
          message: 'All submitted academic credentials and experience certificates have been verified by the Central Scrutiny Cell.',
          timestamp: 'Just now',
          read: false,
          actionLabel: 'View Checklist',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'confirm_joining') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            applicationStatus: 'Joined',
            joiningStatus: 'Joined',
            lastUpdated: 'Today by Registrar',
            timeline: app.timeline.map((s) => ({ ...s, status: 'COMPLETED' })),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'status',
          title: 'Your joining date has been confirmed',
          message:
            '🎉 Joining formalities confirmed! Your official Faculty Employee Code TNU-FAC-2026-104 is generated. Welcome to The Neotia University!',
          timestamp: 'Just now',
          read: false,
          actionLabel: 'View Onboarding',
          actionTarget: activeApp.id,
        },
        ...prev,
      ]);
    } else if (action === 'reset') {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== activeApp.id) return app;
          return {
            ...app,
            applicationStatus: 'Submitted',
            interviewStatus: 'Not Scheduled',
            selectionStatus: 'Pending',
            loiStatus: 'Not Issued',
            verificationStatus: 'Not Started',
            joiningStatus: 'Not Started',
            lastUpdated: 'Just reset to clean submission',
            interviewDetails: undefined,
            loiDetails: undefined,
            noticePeriodDetails: undefined,
            timeline: app.timeline.map((s, idx) => ({
              ...s,
              status: idx === 0 ? 'COMPLETED' : idx === 1 ? 'CURRENT' : 'PENDING',
            })),
            verificationChecklist: app.verificationChecklist.map((item) => ({
              ...item,
              status: 'Uploaded',
              remarks: undefined,
            })),
          };
        })
      );

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'status',
          title: 'Your application has been successfully submitted',
          message: `Application ID ${activeApp.id} reset to Stage 1 (Submitted) for recruitment lifecycle demonstration.`,
          timestamp: 'Just now',
          read: false,
        },
        ...prev,
      ]);
    }
  };

  // =========================================================
  // ACTION HANDLERS (LOI, NOTICE PERIOD, VERIFICATION)
  // =========================================================
  const handleAcceptLoi = (appId: string) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          applicationStatus: 'LOI Accepted',
          loiStatus: 'Accepted',
          loiDetails: app.loiDetails ? { ...app.loiDetails, status: 'Accepted', acceptedDate: today } : undefined,
          timeline: app.timeline.map((s) => {
            if (s.stageKey === 'loi_accepted') return { ...s, status: 'COMPLETED', date: today };
            if (s.stageKey === 'verification') return { ...s, status: 'CURRENT' };
            return s;
          }),
        };
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'loi',
        title: 'Your LOI has been accepted successfully',
        message: 'Your formal acceptance of Letter of Intent has been recorded with the Registrar Secretariat. Notice Period details unlocked.',
        timestamp: 'Just now',
        read: false,
        actionLabel: 'Enter Notice Period',
        actionTarget: appId,
      },
      ...prev,
    ]);
  };

  const handleDeclineLoi = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          loiStatus: 'Declined',
          loiDetails: app.loiDetails ? { ...app.loiDetails, status: 'Declined' } : undefined,
        };
      })
    );
  };

  const handleSubmitNoticePeriod = (details: NoticePeriodDetails) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== selectedAppId) return app;
        return {
          ...app,
          joiningStatus: 'Notice Period Submitted',
          noticePeriodDetails: details,
        };
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'status',
        title: 'Notice Period details recorded',
        message: `Current notice period of ${details.noticePeriodDays} days registered. Expected campus joining date: ${details.expectedJoiningDate}.`,
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleReuploadDoc = (docName: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== selectedAppId) return app;
        return {
          ...app,
          verificationStatus: 'Under Verification',
          verificationChecklist: app.verificationChecklist.map((item) =>
            item.docName === docName
              ? { ...item, status: 'Under Verification', remarks: undefined, lastUpdated: 'Today' }
              : item
          ),
        };
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'document',
        title: 'Your documents are currently under verification',
        message: `Replacement file for ${docName} successfully submitted. Under re-scrutiny by HR cell.`,
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleTogglePreOnboardingTask = (appId: string, taskId: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          preOnboardingTasks: app.preOnboardingTasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  isCompleted: !t.isCompleted,
                  completedAt: !t.isCompleted ? 'Today' : undefined,
                }
              : t
          ),
        };
      })
    );
  };

  const handleConfirmInterviewAttendance = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          interviewDetails: app.interviewDetails
            ? { ...app.interviewDetails, status: 'Scheduled' }
            : undefined,
        };
      })
    );
  };

  // Handlers for Application Flow
  const handleApplicationSubmitted = (newApp: CandidateApplication) => {
    setApplications((prev) => [newApp, ...prev]);
    setSelectedPositionForApply(null);
    setSelectedAppId(newApp.id);
    setCurrentTab('dashboard');
  };

  const handleSaveDraft = (draftData: Partial<ApplicationFormData>, currentStep: number) => {
    if (!selectedPositionForApply) return;
    const newDraft: DraftApplication = {
      id: `draft-${Date.now()}`,
      vacancyId: selectedPositionForApply.id,
      jobTitle: selectedPositionForApply.area,
      schoolName:
        SCHOOLS_DATA.find((s) => s.id === selectedPositionForApply.schoolId)?.name ||
        'The Neotia University',
      positionType: selectedPositionForApply.positionType || 'Faculty',
      currentStep,
      totalSteps: 6,
      lastSaved: 'Just now',
      formData: draftData,
    };
    setDrafts((prev) => [newDraft, ...prev.filter((d) => d.vacancyId !== selectedPositionForApply.id)]);
  };

  const handleResumeDraft = (draft: DraftApplication) => {
    const matchedPos = VACANT_POSITIONS_DATA.find((p) => p.id === draft.vacancyId) || VACANT_POSITIONS_DATA[0];
    setSelectedPositionForApply(matchedPos);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#123B5D] font-sans antialiased flex flex-col selection:bg-[#0057B8]/15 selection:text-[#0057B8]">
      {/* Toast Notice for Locked Items */}
      {lockedToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#003B68] text-white p-4 rounded-2xl shadow-2xl border border-[#0057B8] flex items-start gap-3 max-w-sm animate-in fade-in slide-in-from-top-4">
          <Lock className="w-5 h-5 text-[#BFDDF5] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#BFDDF5]">{lockedToast.title} Locked</h4>
            <p className="text-[11px] text-white/90 mt-0.5 leading-relaxed">{lockedToast.reason}</p>
          </div>
          <button
            type="button"
            onClick={() => setLockedToast(null)}
            className="text-white/60 hover:text-white p-0.5 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner Stripe */}
      <div className="bg-[#003B68] text-white text-[11px] font-semibold px-4 sm:px-6 py-1.5 flex items-center justify-between border-b border-[#002747]">
        <span className="tracking-wide">
          THE NEOTIA UNIVERSITY • CANDIDATE RECRUITMENT SECRETARIAT
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSwitchToPublicPortal}
            className="hover:text-[#BFDDF5] transition-colors flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>Public Vacancies Portal</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onLogout}
            className="hover:text-[#BFDDF5] transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white border-b border-[#D9E2EC] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-xl border border-[#D9E2EC] text-[#0057B8]"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <TnuLogo className="h-8" />
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-[#003B68]">{candidateProfile.fullName}</div>
          <div className="text-[10px] font-mono text-[#52708A]">{activeApp?.id}</div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex-1 flex w-full relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <CandidateSidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            activeApp={activeApp}
            totalApplicationsCount={totalApplicationsCount}
            unreadNotificationsCount={unreadNotificationsCount}
            candidateProfile={candidateProfile}
            onLogout={onLogout}
            onSwitchToPublicPortal={onSwitchToPublicPortal}
            onLockedItemClick={showLockedNotice}
          />
        </div>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-[#003B68]/60 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full shadow-2xl">
              <CandidateSidebar
                currentTab={currentTab}
                onSelectTab={(tab) => {
                  setCurrentTab(tab);
                  setMobileSidebarOpen(false);
                }}
                activeApp={activeApp}
                totalApplicationsCount={totalApplicationsCount}
                unreadNotificationsCount={unreadNotificationsCount}
                candidateProfile={candidateProfile}
                onLogout={onLogout}
                onSwitchToPublicPortal={onSwitchToPublicPortal}
                onLockedItemClick={showLockedNotice}
              />
            </div>
            <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
          </div>
        )}

        {/* Right Content Workspace */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* TAB 1: DASHBOARD OR RECRUITMENT JOURNEY */}
          {(currentTab === 'dashboard' || currentTab === 'journey') && (
            <CandidateDashboardView
              candidateProfile={candidateProfile}
              applications={applications}
              selectedAppId={selectedAppId}
              onSelectApplication={(id) => setSelectedAppId(id)}
              onNavigateTab={setCurrentTab}
              onResumeDraft={handleResumeDraft}
              onAcceptLoiClick={handleAcceptLoi}
              onDeclineLoiClick={handleDeclineLoi}
              onViewInterviewClick={(id) => {
                setSelectedAppId(id);
                setCurrentTab('interview');
              }}
              onSimulateHrStage={handleSimulateHrStage}
              onSubmitNoticePeriod={handleSubmitNoticePeriod}
              onReuploadDocument={handleReuploadDoc}
            />
          )}

          {/* TAB 2: MY APPLICATIONS LIST */}
          {currentTab === 'my-applications' && (
            <CandidateApplicationsView
              applications={applications}
              selectedAppId={selectedAppId}
              onSelectApplication={setSelectedAppId}
              onAcceptLoi={handleAcceptLoi}
              onDeclineLoi={handleDeclineLoi}
              onUpdateNoticePeriod={(_, details) => handleSubmitNoticePeriod(details)}
              onTogglePreOnboardingTask={handleTogglePreOnboardingTask}
              onConfirmInterviewAttendance={handleConfirmInterviewAttendance}
            />
          )}

          {/* TAB 3: INTERVIEW DEDICATED WORKSPACE */}
          {currentTab === 'interview' && activeApp && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E2EC] shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#0057B8] tracking-wider">
                      Stage 3 Workspace
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#003B68]">
                      Statutory Selection Committee Interview
                    </h2>
                    <p className="text-xs text-[#52708A] mt-0.5">
                      Application ID: <strong>{activeApp.id}</strong> • Position: <strong>{activeApp.jobTitle}</strong>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeApp.interviewStatus === 'Scheduled'
                        ? 'bg-[#0057B8] text-white'
                        : 'bg-[#F7F9FC] text-[#52708A]'
                    }`}
                  >
                    Status: {activeApp.interviewStatus.toUpperCase()}
                  </span>
                </div>

                {activeApp.interviewDetails ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC]">
                        <span className="text-[10px] uppercase font-bold text-[#52708A] block mb-1">
                          Date & Schedule
                        </span>
                        <div className="text-base font-bold text-[#003B68] flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#0057B8]" />
                          {activeApp.interviewDetails.date}
                        </div>
                        <div className="text-xs text-[#52708A] mt-1">{activeApp.interviewDetails.time}</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC]">
                        <span className="text-[10px] uppercase font-bold text-[#52708A] block mb-1">
                          Mode & Virtual Room
                        </span>
                        <div className="text-base font-bold text-[#003B68]">
                          {activeApp.interviewDetails.mode}
                        </div>
                        <div className="text-xs text-[#52708A] mt-1">{activeApp.interviewDetails.venue}</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC]">
                        <span className="text-[10px] uppercase font-bold text-[#52708A] block mb-1">
                          Selection Committee Panel
                        </span>
                        <div className="text-base font-bold text-[#003B68]">
                          Dean & Subject Experts
                        </div>
                        <div className="text-xs text-[#52708A] mt-1">UGC Statutory Composition</div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F9FC] border border-[#BFDDF5]">
                      <h4 className="text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#0057B8]" />
                        Committee Guidelines & Instructions
                      </h4>
                      <p className="text-xs text-[#123B5D] leading-relaxed">
                        {activeApp.interviewDetails.instructions}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="https://meet.google.com/new"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold shadow-md flex items-center gap-2 transition-colors"
                      >
                        <span>Join Virtual Committee Room</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#BFDDF5]" />
                      </a>

                      <a
                        href={activeApp.interviewDetails.calendarLink || 'https://calendar.google.com'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] flex items-center gap-1.5 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#0057B8]" />
                        <span>Add to Google Calendar</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F7F9FC] rounded-2xl border border-[#D9E2EC] space-y-2">
                    <Clock className="w-8 h-8 text-[#52708A] mx-auto" />
                    <h3 className="text-sm font-bold text-[#003B68]">Interview Not Scheduled Yet</h3>
                    <p className="text-xs text-[#52708A] max-w-md mx-auto">
                      Interview details will appear here once scheduled by the Selection Secretariat.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: LOI / OFFER DEDICATED WORKSPACE */}
          {currentTab === 'loi' && activeApp && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E2EC] shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#0057B8] tracking-wider">
                      Stage 5 & 6 Workspace
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#003B68]">
                      Formal Letter of Intent (LOI)
                    </h2>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeApp.loiStatus === 'Accepted'
                        ? 'bg-[#059669] text-white'
                        : activeApp.loiStatus === 'Issued'
                        ? 'bg-[#0057B8] text-white'
                        : 'bg-[#F7F9FC] text-[#52708A]'
                    }`}
                  >
                    LOI Status: {activeApp.loiStatus.toUpperCase()}
                  </span>
                </div>

                {activeApp.loiDetails ? (
                  <div className="space-y-5">
                    {/* Institutional Letterhead Preview */}
                    <div className="p-6 rounded-2xl bg-[#F0F7FF] border-2 border-[#BFDDF5] text-[#123B5D] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#BFDDF5] pb-3">
                        <div>
                          <div className="text-xs font-bold tracking-wider text-[#003B68] uppercase">
                            THE NEOTIA UNIVERSITY • OFFICE OF THE REGISTRAR
                          </div>
                          <div className="text-[11px] text-[#52708A]">
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
                          Candidate for: <strong className="text-[#0057B8]">{activeApp.loiDetails.position}</strong>
                        </p>
                      </div>

                      <p className="text-xs leading-relaxed text-[#123B5D]">
                        We are pleased to inform you that upon the recommendation of the Statutory Selection Committee and approval of the Vice-Chancellor, The Neotia University hereby issues this <strong>Letter of Intent (LOI)</strong> for the position of <strong>{activeApp.loiDetails.position}</strong> under the <strong>{activeApp.loiDetails.schoolName}</strong>.
                      </p>

                      <div className="p-4 rounded-xl bg-white border border-[#D9E2EC] space-y-1.5 text-xs">
                        <div className="font-bold text-[#003B68] uppercase tracking-wide">
                          Remuneration & Scale Structure:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-[#52708A]">Governing Scale: </span>
                            <span className="font-semibold text-[#123B5D]">{activeApp.loiDetails.scale}</span>
                          </div>
                          <div>
                            <span className="text-[#52708A]">Basic Entry Pay: </span>
                            <span className="font-bold text-[#003B68]">{activeApp.loiDetails.basicPay}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[#52708A]">
                        Acceptance deadline: <strong className="text-[#003B68]">{activeApp.loiDetails.acceptanceDeadline}</strong>.
                      </p>
                    </div>

                    {activeApp.loiStatus === 'Issued' ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleAcceptLoi(activeApp.id)}
                          className="px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>ACCEPT LOI</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeclineLoi(activeApp.id)}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FEE2E2] text-[#DC2626] text-xs font-bold border border-[#FECACA] cursor-pointer transition-colors"
                        >
                          <span>DECLINE LOI</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] ml-auto flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-[#0057B8]" />
                          <span>DOWNLOAD LOI (PDF)</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-[#059669] font-bold">
                          <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                          <span>LOI Accepted electronically on {activeApp.loiDetails.acceptedDate || 'Today'}.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentTab('onboarding')}
                          className="text-xs font-bold text-[#0057B8] hover:underline"
                        >
                          Proceed to Onboarding →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F7F9FC] rounded-2xl border border-[#D9E2EC] space-y-2">
                    <Award className="w-8 h-8 text-[#52708A] mx-auto" />
                    <h3 className="text-sm font-bold text-[#003B68]">Letter of Intent Pending</h3>
                    <p className="text-xs text-[#52708A] max-w-md mx-auto">
                      An official LOI is generated once the Selection Committee recommends your candidature and Governing Body approval is finalized.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DOCUMENT REPOSITORY & CV */}
          {currentTab === 'documents' && (
            <CandidateDocumentsView
              documents={documents}
              onUploadDocument={(newDoc) => setDocuments((prev) => [newDoc, ...prev])}
              onReplaceDocument={(docId, fileName, fileSize) =>
                setDocuments((prev) =>
                  prev.map((d) => (d.id === docId ? { ...d, fileName, fileSize, version: 'v3.3' } : d))
                )
              }
              onDeleteDocument={(docId) => setDocuments((prev) => prev.filter((d) => d.id !== docId))}
            />
          )}

          {/* TAB 6: DOCUMENT VERIFICATION SCRUTINY */}
          {currentTab === 'verification' && activeApp && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E2EC] shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#0057B8] tracking-wider">
                      Stage 8 Workspace
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#003B68]">
                      Document Verification Scrutiny
                    </h2>
                    <p className="text-xs text-[#52708A] mt-0.5">
                      Statutory vetting by Central Document Scrutiny Cell for UGC/AICTE compliance.
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeApp.verificationStatus === 'Verified'
                        ? 'bg-[#059669] text-white'
                        : activeApp.verificationStatus === 'Rejected — Re-upload Required'
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-[#F7F9FC] text-[#52708A]'
                    }`}
                  >
                    Verification: {activeApp.verificationStatus.toUpperCase()}
                  </span>
                </div>

                <div className="divide-y divide-[#D9E2EC] border border-[#D9E2EC] rounded-2xl overflow-hidden text-xs">
                  {activeApp.verificationChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-[#F0F7FF]/50 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-[#003B68] text-sm">{item.docName}</div>
                        {item.remarks && (
                          <div className="text-xs text-[#DC2626] mt-0.5 font-semibold">
                            HR Note: {item.remarks}
                          </div>
                        )}
                        <div className="text-[11px] text-[#52708A] mt-0.5">
                          Last Updated: {item.lastUpdated}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'Verified'
                              ? 'bg-[#ECFDF5] text-[#059669]'
                              : item.status === 'Rejected'
                              ? 'bg-[#FEF2F2] text-[#DC2626]'
                              : item.status === 'Under Verification'
                              ? 'bg-[#EAF4FF] text-[#0057B8]'
                              : 'bg-[#F7F9FC] text-[#52708A]'
                          }`}
                        >
                          {item.status}
                        </span>

                        {item.status === 'Rejected' && (
                          <button
                            type="button"
                            onClick={() => handleReuploadDoc(item.docName)}
                            className="px-3 py-1 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold cursor-pointer transition-colors"
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
          )}

          {/* TAB 7: JOINING & ONBOARDING */}
          {currentTab === 'onboarding' && activeApp && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E2EC] shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#0057B8] tracking-wider">
                      Stage 9 & 10 Workspace
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#003B68]">
                      Pre-Onboarding & Joining Checklist
                    </h2>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeApp.joiningStatus === 'Joined'
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#0057B8] text-white'
                    }`}
                  >
                    {activeApp.joiningStatus === 'Joined' ? 'JOINED' : 'YET TO JOIN'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#003B68]">
                    <span>Onboarding Milestones</span>
                    <span>{activeApp.joiningStatus === 'Joined' ? '100% Complete' : '75% Complete'}</span>
                  </div>
                  <div className="w-full bg-[#D9E2EC] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#059669] h-full rounded-full transition-all duration-500"
                      style={{ width: activeApp.joiningStatus === 'Joined' ? '100%' : '75%' }}
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#F0F7FF] rounded-2xl border border-[#D9E2EC] text-xs space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Position & Department
                      </span>
                      <span className="font-bold text-[#003B68]">{activeApp.jobTitle}</span>
                    </div>
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Expected Joining Date
                      </span>
                      <span className="font-bold text-[#059669]">
                        {activeApp.noticePeriodDetails?.expectedJoiningDate || '02 Nov 2026'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#52708A] text-[10px] uppercase font-bold block">
                        Reporting Venue
                      </span>
                      <span className="font-bold text-[#003B68]">
                        Office of the Registrar, Sarisha Campus
                      </span>
                    </div>
                  </div>
                </div>

                {activeApp.joiningStatus === 'Joined' && (
                  <div className="p-5 bg-gradient-to-r from-[#ECFDF5] to-white rounded-2xl border-2 border-[#059669] space-y-2">
                    <h3 className="text-base font-serif font-bold text-[#059669] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#0057B8]" />
                      🎉 JOINING COMPLETED
                    </h3>
                    <p className="text-xs text-[#123B5D]">
                      Faculty ID: <strong>TNU-FAC-2026-104</strong> • Induction & Department Allotment Completed.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: NOTIFICATIONS */}
          {currentTab === 'notifications' && (
            <CandidateNotificationsView
              notifications={notifications}
              onMarkAllAsRead={() =>
                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
              }
              onSelectNotificationAction={(target) => {
                if (target.startsWith('TNU-APP')) {
                  setSelectedAppId(target);
                  setCurrentTab('journey');
                } else if (target === 'documents') {
                  setCurrentTab('documents');
                } else if (target === 'profile') {
                  setCurrentTab('profile');
                }
              }}
            />
          )}

          {/* TAB 9: PROFILE */}
          {currentTab === 'profile' && (
            <CandidateProfileView
              candidateProfile={candidateProfile}
              onUpdateProfile={setCandidateProfile}
            />
          )}

          {/* TAB 10: EXPLORE OPEN POSITIONS */}
          {currentTab === 'open-positions' && (
            <CandidateOpenPositionsView
              onSelectPositionDetails={(pos) => setSelectedPositionForDetails(pos)}
              onApplyPosition={(pos) => setSelectedPositionForApply(pos)}
            />
          )}
        </main>
      </div>

      {/* MODAL: JOB DETAILS */}
      {selectedPositionForDetails && (
        <JobDetailsModal
          position={selectedPositionForDetails}
          isOpen={Boolean(selectedPositionForDetails)}
          onClose={() => setSelectedPositionForDetails(null)}
          onApply={(pos) => {
            setSelectedPositionForDetails(null);
            setSelectedPositionForApply(pos);
          }}
          isBookmarked={bookmarkedPositions.includes(selectedPositionForDetails.id)}
          onToggleBookmark={(id) =>
            setBookmarkedPositions((prev) =>
              prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
            )
          }
        />
      )}

      {/* MODAL / FLOW: CANDIDATE APPLICATION FORM */}
      {selectedPositionForApply && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#D9E2EC] my-6 max-h-[96vh] flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <CandidateApplicationFlow
              position={selectedPositionForApply}
              candidateProfile={candidateProfile}
              onApplicationSubmitted={handleApplicationSubmitted}
              onCancel={() => setSelectedPositionForApply(null)}
              onSaveDraft={handleSaveDraft}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};
