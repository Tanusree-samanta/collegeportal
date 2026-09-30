import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  FolderArchive,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { TnuLogo } from '../TnuLogo';
import { CandidateProfile } from '../../types';

export type CandidateTab =
  | 'dashboard'
  | 'open-positions'
  | 'my-applications'
  | 'documents'
  | 'notifications'
  | 'profile';

interface CandidateNavigationProps {
  currentTab: CandidateTab;
  onSelectTab: (tab: CandidateTab) => void;
  candidateProfile: CandidateProfile | null;
  unreadNotificationsCount: number;
  activeApplicationsCount: number;
  onLogout: () => void;
  onSwitchToPublicPortal: () => void;
}

export const CandidateNavigation: React.FC<CandidateNavigationProps> = ({
  currentTab,
  onSelectTab,
  candidateProfile,
  unreadNotificationsCount,
  activeApplicationsCount,
  onLogout,
  onSwitchToPublicPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: CandidateTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'open-positions', label: 'Open Positions', icon: Briefcase },
    {
      id: 'my-applications',
      label: 'My Applications',
      icon: FileCheck2,
      badge: activeApplicationsCount > 0 ? activeApplicationsCount : undefined,
    },
    { id: 'documents', label: 'Documents & CV', icon: FolderArchive },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
  ];

  const handleTabClick = (tab: CandidateTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#D9E2EC] shadow-[0_1px_3px_rgba(0,59,104,0.04)]">
      {/* Top Banner Stripe with Institutional ID */}
      <div className="bg-[#003B68] text-white text-[11px] font-semibold px-4 sm:px-6 py-1 flex items-center justify-between">
        <span className="tracking-wide">
          THE NEOTIA UNIVERSITY • CENTRAL RECRUITMENT & CV MANAGEMENT PORTAL
        </span>
        <button
          type="button"
          onClick={onSwitchToPublicPortal}
          className="hover:text-[#BFDDF5] transition-colors flex items-center gap-1 cursor-pointer font-bold"
        >
          <span>University Homepage</span>
          <ExternalLink className="w-3 h-3 text-[#BFDDF5]" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <TnuLogo className="h-9 sm:h-10" />
          <div className="hidden sm:block h-6 w-[1px] bg-[#D9E2EC]" />
          <div className="hidden lg:flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8]">
              Candidate Secretariat
            </span>
            <span className="text-xs font-bold text-[#003B68] tracking-tight">
              Faculty & Staff Appointments
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0057B8] text-white shadow-xs'
                    : 'text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#EAF4FF] text-[#0057B8]' : 'bg-[#0057B8] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Candidate Profile & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notifications Quick Bell (Mobile & Tablet) */}
          <button
            type="button"
            onClick={() => handleTabClick('notifications')}
            className="md:hidden relative p-2 text-[#52708A] hover:text-[#0057B8] rounded-lg cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E02424] animate-pulse" />
            )}
          </button>

          {/* User Profile Pill Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-[#F7F9FC] border border-[#D9E2EC] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#0057B8] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-[#BFDDF5]">
                {candidateProfile?.avatarInitials || 'DC'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#003B68] leading-tight truncate max-w-[120px]">
                  {candidateProfile?.fullName?.split(' ')[0] || 'Candidate'}
                </span>
                <span className="text-[10px] text-[#71869A] leading-none">
                  {candidateProfile?.id || 'TNU-CAND'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#71869A] hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#D9E2EC] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2 border-b border-[#D9E2EC]">
                  <p className="text-xs font-bold text-[#003B68] truncate">
                    {candidateProfile?.fullName || 'Dr. Debashis Chatterjee'}
                  </p>
                  <p className="text-[11px] text-[#71869A] truncate">
                    {candidateProfile?.email || 'd.chatterjee@research.tnu.ac.in'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleTabClick('profile');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs font-semibold text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] flex items-center gap-2 cursor-pointer text-left"
                >
                  <User className="w-4 h-4 text-[#0057B8]" />
                  <span>Candidate Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleTabClick('documents');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-xs font-semibold text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] flex items-center gap-2 cursor-pointer text-left"
                >
                  <FolderArchive className="w-4 h-4 text-[#0057B8]" />
                  <span>My CV & Certificates</span>
                </button>

                <div className="my-1 border-t border-[#D9E2EC]" />

                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3.5 py-2 text-xs font-semibold text-[#E02424] hover:bg-[#FDF2F2] flex items-center gap-2 cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#52708A] hover:bg-[#F7F9FC] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D9E2EC] px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0057B8] text-white'
                    : 'text-[#52708A] hover:bg-[#EAF4FF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#EAF4FF] text-[#0057B8]' : 'bg-[#0057B8] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#D9E2EC] flex flex-col gap-1">
            <button
              type="button"
              onClick={() => handleTabClick('profile')}
              className="w-full px-3 py-2 text-xs font-semibold text-[#52708A] hover:bg-[#EAF4FF] flex items-center gap-2 rounded-lg"
            >
              <User className="w-4 h-4 text-[#0057B8]" />
              <span>Profile Settings</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="w-full px-3 py-2 text-xs font-semibold text-[#E02424] hover:bg-[#FDF2F2] flex items-center gap-2 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
