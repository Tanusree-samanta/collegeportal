import React, { useState } from 'react';
import {
  Home,
  Search,
  User,
  Send,
  Mic,
  X,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TnuLogo } from './TnuLogo';
import { Footer } from './Footer';
import { VoiceConversationModal } from './VoiceConversationModal';
import { SCHOOLS_DATA } from '../data/schools';
import { School } from '../types';
import bassRobotImage from '../assets/images/bass_robot.jpg';
import tnuCampusPhoto from '../assets/images/tnu_campus_building.jpg';

interface LandingHeroProps {
  onNavigateToSchools: () => void;
  onApplyNow?: () => void;
  onSelectSchool?: (school: School) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigateToSchools,
  onSelectSchool,
}) => {
  // Modal states
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [showCandidateLogin, setShowCandidateLogin] = useState(false);
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Form states for modals
  const [candidateId, setCandidateId] = useState('');
  const [candidatePass, setCandidatePass] = useState('');
  const [candidateLoginMsg, setCandidateLoginMsg] = useState('');

  const [staffId, setStaffId] = useState('');
  const [staffPass, setStaffPass] = useState('');
  const [staffLoginMsg, setStaffLoginMsg] = useState('');

  // Search query for quick search modal
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered schools for quick search
  const filteredSchools = SCHOOLS_DATA.filter((school) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      school.name.toLowerCase().includes(q) ||
      school.streamLabel.toLowerCase().includes(q) ||
      school.description.toLowerCase().includes(q)
    );
  });

  const handleCandidateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateLoginMsg('Verifying applicant credentials...');
    setTimeout(() => {
      setCandidateLoginMsg('✓ Welcome back. Application dossier FAC-2026-8942 is loaded.');
      setTimeout(() => {
        setShowCandidateLogin(false);
        setCandidateLoginMsg('');
      }, 1200);
    }, 900);
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffLoginMsg('Authenticating institutional access...');
    setTimeout(() => {
      setStaffLoginMsg('✓ Authorized Selection Committee access verified.');
      setTimeout(() => {
        setShowStaffLogin(false);
        setStaffLoginMsg('');
      }, 1200);
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F9FC] flex flex-col font-sans select-none text-[#123B5D]">
      {/* ========================================================= */}
      {/* 1. TOP NAVIGATION BAR (DESIGN RULE 1)                    */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#D9E2EC] shadow-[0_1px_3px_rgba(0,59,104,0.04)] px-4 sm:px-6 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo on Left */}
          <div className="flex items-center gap-3 shrink-0">
            <TnuLogo className="h-9 sm:h-11" />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {/* Active Home with Blue Icon and Blue Underline */}
            <button
              type="button"
              className="relative flex items-center gap-1.5 text-[14px] font-semibold text-[#0057B8] pb-1 cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#0057B8]" />
              <span>Home</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0057B8] rounded-full" />
            </button>

            <button
              type="button"
              onClick={() => setShowAboutModal(true)}
              className="text-[14px] font-medium text-[#52708A] hover:text-[#0057B8] transition-colors cursor-pointer"
            >
              About TNU
            </button>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="text-[14px] font-medium text-[#52708A] hover:text-[#0057B8] transition-colors cursor-pointer"
            >
              Help & Support
            </button>
          </nav>

          {/* Right Controls: Search + Candidate Login + Staff Login */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              aria-label="Search Open Positions"
              className="p-2 text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Candidate Login Button (Rule 1: border #0057B8, text #0057B8, background: white) */}
            <button
              type="button"
              onClick={() => setShowCandidateLogin(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg border border-[#0057B8] text-[#0057B8] bg-white hover:bg-[#EAF4FF] active:scale-95 transition-all text-xs sm:text-[13px] font-semibold cursor-pointer shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate Login</span>
            </button>

            {/* Primary Staff Login Button (Rule 1: background: #0057B8, text: white, hover #003B68) */}
            <button
              type="button"
              onClick={() => setShowStaffLogin(true)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#0057B8] hover:bg-[#003B68] active:scale-95 text-white transition-all text-xs sm:text-[13px] font-semibold shadow-xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN HERO SECTION (Campus Photo + Left copy + Bass)    */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden min-h-[480px] md:min-h-[540px] lg:min-h-[580px] flex items-center border-b border-[#D9E2EC] flex-1">
        {/* Full-width Panoramic Campus Photo Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={tnuCampusPhoto}
            alt="The Neotia University Campus Building"
            className="w-full h-full object-cover object-[center_42%]"
          />
          {/* Subtle white/blue overlay according to Design Rule 2 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-35% sm:via-white/90 sm:via-45% md:via-white/80 md:via-55% to-[#F5F9FD]/40 to-90% pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Primary Action Button */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 max-w-2xl">
            {/* Top Logo / Brand Identity inside Hero */}
            <div className="flex items-center gap-2">
              <TnuLogo className="h-10 sm:h-12" />
            </div>

            {/* Main Headline (Rule 3: Dark navy #003B68) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-[#003B68] leading-[1.18] tracking-tight">
              Central Recruitment & <br className="hidden sm:inline" />
              CV Management Portal
            </h1>

            {/* Subtitle (Rule 3: Secondary text #52708A) */}
            <p className="text-sm sm:text-base md:text-lg text-[#52708A] leading-relaxed font-normal">
              Apply for opportunities. Track your application. <br className="hidden sm:inline" />
              Build your career with TNU.
            </p>

            {/* Primary Action Button: Career (Rule 4: background #0057B8, hover #003B68, radius 8px) */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToSchools}
                className="btn-primary-portal inline-flex items-center justify-center gap-2 px-6 py-3 text-sm cursor-pointer whitespace-nowrap"
              >
                <Send className="w-4 h-4 -rotate-45" />
                <span>Career</span>
              </button>
            </div>
          </div>

          {/* Right Column: AI Voice Assistant "Bass" Interactive Widget (Rule 15) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0">
            <div className="relative flex flex-col items-center lg:items-end gap-3 max-w-sm sm:max-w-md w-full">
              {/* Row with Speech Bubble on Left and Robot Mascot on Right */}
              <div className="flex items-start gap-3 w-full justify-end">
                {/* Speech Bubble Card (White, subtle shadow, #D9E2EC border) */}
                <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#D9E2EC] text-left max-w-[270px] sm:max-w-[290px] transition-all">
                  {/* Speech Bubble Arrow pointing to the robot */}
                  <div className="hidden sm:block absolute -right-2 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white/95" />

                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold text-[14px] text-[#003B68]">
                      Hi! I'm Bass
                    </span>
                    <span className="text-sm">👋</span>
                  </div>

                  <p className="font-semibold text-xs text-[#0057B8] mb-1.5">
                    Your AI voice assistant.
                  </p>

                  <p className="text-[11px] sm:text-xs text-[#52708A] leading-relaxed mb-2 font-normal">
                    I can help you find vacancies, check your application status, answer your queries and more.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="text-[12px] font-semibold text-[#0057B8] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Just say what you need!</span>
                  </button>
                </div>

                {/* Robot Mascot: Bass */}
                <div
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="relative shrink-0 cursor-pointer group hover:scale-105 transition-transform"
                  title="Click to talk with Bass AI"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1.5 shadow-md border-2 border-[#D9E2EC] flex items-center justify-center overflow-hidden">
                    <img
                      src={bassRobotImage}
                      alt="Bass - TNU AI Voice Assistant"
                      className="w-full h-full object-contain drop-shadow-xs group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Status indicator: Green #19B87A (Rule 15) */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#19B87A] border-2 border-white ring-1 ring-emerald-200" />
                </div>
              </div>

              {/* Glowing Microphone Button + Equalizer Waves Row */}
              <div className="flex items-center justify-center lg:justify-end gap-3 w-full pr-2 sm:pr-8 py-1">
                {/* Circular Blue Microphone Button (#0057B8) */}
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  aria-label="Start Voice Conversation with Bass"
                  className="relative w-14 h-14 rounded-full bg-[#0057B8] hover:bg-[#003B68] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-[#EAF4FF] group"
                >
                  <span className="absolute inset-0 rounded-full bg-[#0066CC] animate-ping opacity-25 pointer-events-none" />
                  <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Animated Sound Equalizer Waves */}
                <div className="flex items-center gap-1 h-7">
                  <span className="w-1 bg-[#0057B8] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-3" />
                  <span className="w-1 bg-[#0066CC] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-5" />
                  <span className="w-1 bg-[#0057B8] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-6" />
                  <span className="w-1 bg-[#0066CC] rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-4" />
                  <span className="w-1 bg-[#0057B8] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2.5" />
                </div>
              </div>

              {/* "Try saying..." Prompt Card */}
              <div
                onClick={() => {
                  setIsVoiceModalOpen(true);
                }}
                className="bg-white border border-[#D9E2EC] hover:border-[#0057B8] rounded-xl px-4 py-2 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center gap-2 text-xs group"
              >
                <span className="text-[11px] text-[#71869A] font-medium">Try saying...</span>
                <div className="flex items-center gap-1.5 text-[#0057B8] font-semibold group-hover:underline">
                  <Mic className="w-3.5 h-3.5" />
                  <span>"Show available positions"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MODALS (Candidate Login, Staff Login, About, Help, Voice) */}
      {/* ========================================================= */}

      {/* Candidate Login Modal (Rule 14) */}
      {showCandidateLogin && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative border border-[#D9E2EC] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowCandidateLogin(false);
                setCandidateLoginMsg('');
              }}
              className="absolute top-4 right-4 text-[#71869A] hover:text-[#123B5D] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0057B8] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#003B68]">Candidate Portal Login</h3>
                <p className="text-xs text-[#52708A]">Access your application dossier and track status</p>
              </div>
            </div>

            <form onSubmit={handleCandidateLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Application ID or Registered Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FAC-2026-8942 or name@domain.com"
                  value={candidateId}
                  onChange={(e) => setCandidateId(e.target.value)}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Password or Date of Birth (YYYY-MM-DD)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={candidatePass}
                  onChange={(e) => setCandidatePass(e.target.value)}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              {candidateLoginMsg && (
                <div className="p-2.5 bg-[#E8F8F2] border border-[#19B87A]/30 text-xs font-semibold text-[#16865F] rounded-lg">
                  {candidateLoginMsg}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary-portal w-full py-2.5 text-sm cursor-pointer"
              >
                Sign In to Candidate Dashboard
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-[#D9E2EC] flex items-center justify-between text-xs text-[#52708A]">
              <button
                type="button"
                onClick={() => {
                  setShowCandidateLogin(false);
                  onNavigateToSchools();
                }}
                className="text-[#0057B8] hover:underline font-semibold"
              >
                New Applicant? Apply Now
              </button>
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-[#71869A] hover:text-[#123B5D]"
              >
                Forgot Credentials?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Login Modal */}
      {showStaffLogin && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative border border-[#D9E2EC] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowStaffLogin(false);
                setStaffLoginMsg('');
              }}
              className="absolute top-4 right-4 text-[#71869A] hover:text-[#123B5D] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0057B8] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#003B68]">Staff & Screening Committee Login</h3>
                <p className="text-xs text-[#52708A]">Authorized administrative and scrutiny desk</p>
              </div>
            </div>

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Institutional Staff ID or Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. dean.tech@tnu.ac.in"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  Institutional Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={staffPass}
                  onChange={(e) => setStaffPass(e.target.value)}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              {staffLoginMsg && (
                <div className="p-2.5 bg-[#E8F8F2] border border-[#19B87A]/30 text-xs font-semibold text-[#16865F] rounded-lg">
                  {staffLoginMsg}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary-portal w-full py-2.5 text-sm cursor-pointer"
              >
                Access Recruitment Administration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* About TNU Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative border border-[#D9E2EC] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-[#71869A] hover:text-[#123B5D] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <TnuLogo className="h-10" />
            </div>

            <h3 className="text-xl font-bold text-[#003B68] mb-2">About The Neotia University (TNU)</h3>
            <p className="text-xs sm:text-sm text-[#52708A] leading-relaxed mb-4">
              The Neotia University is a premier multidisciplinary institution established by the West Bengal State Legislature and promoted by the distinguished Ambuja Neotia Group. Spread across a sprawling 50+ acre lush green campus in Sarisha, South 24 Parganas, TNU is committed to academic rigor, futuristic pedagogy, and high-impact scholarly research.
            </p>

            <div className="space-y-2.5 text-xs text-[#123B5D] bg-[#F7F9FC] p-4 rounded-xl border border-[#D9E2EC] mb-4">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0057B8]" />
                <span>Statutory UGC Recognition & AICTE / PCI / BCI / DG Shipping Approvals</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0057B8]" />
                <span>Modern R&D Centres, Robotics & Nvidia AI Computing Clusters</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0057B8]" />
                <span>7th CPC Scale implementation with faculty research grants</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className="btn-primary-portal px-4 py-2 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative border border-[#D9E2EC]">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-[#71869A] hover:text-[#123B5D] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#003B68] mb-1">Help & Recruitment Support</h3>
            <p className="text-xs text-[#52708A] mb-4">
              Office of Academic Appointments & Faculty Affairs
            </p>

            <div className="space-y-3 text-xs text-[#123B5D] bg-[#F7F9FC] p-4 rounded-xl border border-[#D9E2EC] mb-4">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0057B8]" />
                <span>recruitment@tnu.ac.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0057B8]" />
                <span>+91 33 2456 7890 / Ext. 204</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                <span>Monday – Friday: 9:30 AM – 5:30 PM IST</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="btn-primary-portal px-4 py-2 text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/30 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-xl relative border border-[#D9E2EC]">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-[#71869A] hover:text-[#123B5D] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-base font-bold text-[#003B68] mb-3">Search Portal</h4>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search computer science, AI, pharmacy, management..."
                className="portal-input w-full text-sm pl-9 pr-3 py-2.5"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredSchools.slice(0, 4).map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setShowSearchModal(false);
                    if (onSelectSchool) onSelectSchool(s);
                    else onNavigateToSchools();
                  }}
                  className="p-3 rounded-lg hover:bg-[#F5F9FD] border border-[#D9E2EC] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#003B68]">{s.name}</h5>
                    <p className="text-[11px] text-[#52708A]">{s.streamLabel}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#0057B8] bg-[#EAF4FF] border border-[#BFDDF5] px-2 py-0.5 rounded-full">
                    {s.openPositionsCount || 0} Openings
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live AI Voice Assistant Modal with Bass */}
      <VoiceConversationModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      {/* ========================================================= */}
      {/* 4. FOOTER                                                 */}
      {/* ========================================================= */}
      <Footer />
    </div>
  );
};
