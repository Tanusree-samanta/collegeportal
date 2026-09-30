import React from 'react';
import {
  LayoutDashboard,
  Layers,
  FileCheck2,
  Calendar,
  Award,
  FolderArchive,
  ShieldCheck,
  CheckCircle2,
  Bell,
  User,
  LogOut,
  ExternalLink,
  Lock,
  Sparkles,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import { CandidateProfile, CandidateApplication } from '../../types';
import { TnuLogo } from '../TnuLogo';

export type CandidateTab =
  | 'dashboard'
  | 'my-applications'
  | 'journey'
  | 'interview'
  | 'loi'
  | 'documents'
  | 'verification'
  | 'onboarding'
  | 'notifications'
  | 'profile'
  | 'open-positions';

interface CandidateSidebarProps {
  currentTab: CandidateTab;
  onSelectTab: (tab: CandidateTab) => void;
  activeApp: CandidateApplication | null;
  totalApplicationsCount: number;
  unreadNotificationsCount: number;
  candidateProfile: CandidateProfile;
  onLogout: () => void;
  onSwitchToPublicPortal: () => void;
  onLockedItemClick?: (label: string, reason: string) => void;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({
  currentTab,
  onSelectTab,
  activeApp,
  totalApplicationsCount,
  unreadNotificationsCount,
  candidateProfile,
  onLogout,
  onSwitchToPublicPortal,
  onLockedItemClick,
}) => {
  // Determine locked statuses based on active application lifecycle
  const isShortlisted =
    activeApp?.applicationStatus === 'Shortlisted' ||
    activeApp?.applicationStatus === 'Interview Scheduled' ||
    activeApp?.applicationStatus === 'Selected' ||
    activeApp?.applicationStatus === 'LOI Issued' ||
    activeApp?.applicationStatus === 'LOI Accepted' ||
    activeApp?.applicationStatus === 'Yet to Join' ||
    activeApp?.applicationStatus === 'Joined';

  const isInterviewLocked = !isShortlisted;
  const interviewBadge = isInterviewLocked
    ? 'Not available yet'
    : activeApp?.interviewStatus === 'Scheduled'
    ? 'Scheduled'
    : 'Available';

  const isLoiIssued = activeApp?.loiStatus === 'Issued';
  const isLoiAccepted = activeApp?.loiStatus === 'Accepted';
  const isLoiLocked = activeApp?.loiStatus === 'Not Issued' && activeApp?.selectionStatus !== 'Selected';
  const loiBadge = isLoiAccepted
    ? 'Accepted'
    : isLoiIssued
    ? 'Action Required'
    : 'Pending';

  const isOnboardingLocked = !isLoiAccepted && activeApp?.joiningStatus === 'Not Started';
  const onboardingBadge = isOnboardingLocked
    ? 'Locked'
    : activeApp?.joiningStatus === 'Joined'
    ? 'Joined'
    : 'Active';

  interface NavItem {
    id: CandidateTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeType?: 'neutral' | 'action' | 'success' | 'count';
    count?: number;
    isLocked?: boolean;
    lockedReason?: string;
  }

  const primaryNav: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'my-applications',
      label: 'My Applications',
      icon: FileCheck2,
      count: totalApplicationsCount,
      badgeType: 'count',
    },
    {
      id: 'journey',
      label: 'Recruitment Journey',
      icon: Layers,
    },
    {
      id: 'interview',
      label: 'Interview',
      icon: Calendar,
      badge: interviewBadge,
      badgeType: isInterviewLocked ? 'neutral' : 'action',
      isLocked: isInterviewLocked,
      lockedReason: 'Interview workspace unlocks once your application is shortlisted by HR.',
    },
    {
      id: 'loi',
      label: 'LOI / Offer',
      icon: Award,
      badge: loiBadge,
      badgeType: isLoiIssued ? 'action' : isLoiAccepted ? 'success' : 'neutral',
      isLocked: isLoiLocked,
      lockedReason: 'Letter of Intent unlocks upon selection committee approval and issuance.',
    },
    {
      id: 'documents',
      label: 'Documents & CV',
      icon: FolderArchive,
    },
    {
      id: 'verification',
      label: 'Document Verification',
      icon: ShieldCheck,
      badge:
        activeApp?.verificationStatus === 'Verified'
          ? 'Verified'
          : activeApp?.verificationStatus === 'Rejected — Re-upload Required'
          ? 'Action Required'
          : undefined,
      badgeType:
        activeApp?.verificationStatus === 'Verified'
          ? 'success'
          : activeApp?.verificationStatus === 'Rejected — Re-upload Required'
          ? 'action'
          : 'neutral',
    },
    {
      id: 'onboarding',
      label: 'Joining / Onboarding',
      icon: CheckCircle2,
      badge: onboardingBadge,
      badgeType: isOnboardingLocked ? 'neutral' : 'success',
      isLocked: isOnboardingLocked,
      lockedReason: 'Onboarding unlocks following Letter of Intent acceptance.',
    },
  ];

  const secondaryNav: NavItem[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      count: unreadNotificationsCount,
      badgeType: 'count',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
    {
      id: 'open-positions',
      label: 'Explore Vacancies',
      icon: Briefcase,
    },
  ];

  const handleItemClick = (item: NavItem) => {
    if (item.isLocked) {
      if (onLockedItemClick) {
        onLockedItemClick(item.label, item.lockedReason || 'This section is not unlocked yet.');
      }
      return;
    }
    onSelectTab(item.id);
  };

  return (
    <aside className="w-72 bg-white border-r border-[#D9E2EC] flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#D9E2EC] bg-white">
          <div className="flex items-center gap-3">
            <TnuLogo className="h-10" />
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0057B8]">
                The Neotia University
              </div>
              <div className="text-xs font-serif font-bold text-[#003B68] leading-tight">
                Candidate Recruitment Portal
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Profile Widget */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-[#F0F7FF] border border-[#D9E2EC]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0057B8] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ring-2 ring-[#EAF4FF]">
              {candidateProfile.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#003B68] truncate">
                {candidateProfile.fullName}
              </div>
              <div className="text-[10px] font-mono text-[#0057B8] font-semibold truncate">
                {activeApp ? activeApp.id : candidateProfile.id}
              </div>
              <div className="text-[10px] text-[#52708A] truncate">
                {activeApp?.jobTitle || 'Faculty Candidate'}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-2 space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
            Recruitment Workspace
          </div>
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isLocked = item.isLocked;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-[#0057B8] text-white shadow-xs'
                    : isLocked
                    ? 'text-[#71869A]/70 hover:bg-[#F7F9FC]/60 cursor-not-allowed opacity-80'
                    : 'text-[#123B5D] hover:bg-[#EAF4FF] hover:text-[#0057B8] cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-white'
                        : isLocked
                        ? 'text-[#71869A]/60'
                        : 'text-[#0057B8]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {isLocked && <Lock className="w-3 h-3 text-[#71869A]" />}

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-tight ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeType === 'action'
                          ? 'bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] font-bold'
                          : item.badgeType === 'success'
                          ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                          : 'bg-[#F7F9FC] text-[#52708A] border border-[#D9E2EC]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-[#0057B8]'
                          : 'bg-[#0057B8] text-white'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="px-3 py-2 space-y-1 border-t border-[#D9E2EC] mt-2">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#52708A]">
            Account & Support
          </div>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#0057B8] text-white shadow-xs font-bold'
                    : 'text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-[#71869A]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-[#0057B8]'
                        : 'bg-[#0057B8] text-white'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer Actions */}
      <div className="p-3 border-t border-[#D9E2EC] space-y-1.5 bg-[#F7F9FC]/60">
        <button
          type="button"
          onClick={onSwitchToPublicPortal}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#0057B8] hover:bg-[#EAF4FF] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Recruitment Portal</span>
          </span>
          <ChevronRight className="w-3 h-3 text-[#71869A]" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#71869A] hover:text-[#DC2626] hover:bg-[#DC2626]/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
