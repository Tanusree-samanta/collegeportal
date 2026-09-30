import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle2, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { TnuLogo } from '../TnuLogo';
import { CandidateProfile } from '../../types';

interface CandidateAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: CandidateProfile) => void;
}

export const CandidateAuthModal: React.FC<CandidateAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('d.chatterjee@research.tnu.ac.in');
  const [loginPassword, setLoginPassword] = useState('••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginStatusMsg, setLoginStatusMsg] = useState<string | null>(null);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatusMsg('Authenticating credentials with University Selection Secretariat...');

    setTimeout(() => {
      setLoginStatusMsg('✓ Identity verified. Redirecting to Candidate Dashboard...');
      setTimeout(() => {
        onLoginSuccess({
          id: 'cand-001',
          fullName: 'Dr. Debashis Chatterjee',
          email: loginIdentifier.includes('@') ? loginIdentifier : 'd.chatterjee@research.tnu.ac.in',
          mobile: '+91 98301 24578',
          avatarInitials: 'DC',
          currentDesignation: 'Associate Professor',
          currentOrganization: 'Kolkata Institute of Advanced Computing',
          highestDegree: 'Ph.D. in Computer Science & Engineering',
          totalExperienceYears: '11 Years 4 Months',
          location: 'Kolkata, West Bengal, India',
        });
        onClose();
        setLoginStatusMsg(null);
      }, 700);
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrorMsg(null);

    if (regPassword !== regConfirmPassword) {
      setRegErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setRegErrorMsg('Please agree to The Neotia University recruitment terms & privacy policy.');
      return;
    }

    const initials = regFullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'TN';

    setLoginStatusMsg('Creating candidate recruitment account...');
    setTimeout(() => {
      onLoginSuccess({
        id: `cand-${Date.now().toString().slice(-4)}`,
        fullName: regFullName,
        email: regEmail,
        mobile: regMobile,
        avatarInitials: initials,
        currentDesignation: 'Academic Candidate',
        currentOrganization: '',
        highestDegree: 'Postgraduate / Doctoral Scholar',
        totalExperienceYears: '0 Years',
        location: 'India',
      });
      onClose();
      setLoginStatusMsg(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#D9E2EC] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Top Decorative Blue Stripe */}
        <div className="h-2 bg-gradient-to-r from-[#003B68] via-[#0057B8] to-[#BFDDF5]" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#D9E2EC] relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close authentication modal"
            className="absolute top-5 right-5 text-[#71869A] hover:text-[#003B68] p-1.5 rounded-lg hover:bg-[#F0F7FF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <TnuLogo className="h-9" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8] block mt-1">
            Central Recruitment Portal
          </span>
          <h3 className="text-xl sm:text-2xl text-[#003B68] font-bold font-serif-tnu">
            Candidate Access Desk
          </h3>
          <p className="text-xs text-[#52708A] mt-0.5">
            Apply for approved university vacancies, submit dossier, and track recruitment progress.
          </p>
        </div>

        {/* Tabs: LOGIN vs CREATE ACCOUNT */}
        <div className="grid grid-cols-2 border-b border-[#D9E2EC] bg-[#F0F7FF] p-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setRegErrorMsg(null);
            }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#0057B8] shadow-xs border border-[#D9E2EC]'
                : 'text-[#52708A] hover:text-[#003B68]'
            }`}
          >
            Candidate Login
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setRegErrorMsg(null);
            }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-[#0057B8] shadow-xs border border-[#D9E2EC]'
                : 'text-[#52708A] hover:text-[#003B68]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {loginStatusMsg && (
            <div className="mb-4 p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#059669] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>{loginStatusMsg}</span>
            </div>
          )}

          {regErrorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs font-semibold text-[#DC2626]">
              {regErrorMsg}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Email or Registered Mobile <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. name@research.tnu.ac.in or 9830124578"
                    className="portal-input w-full text-xs pl-9 pr-3 py-2.5"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider">
                    Password <span className="text-[#DC2626]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions will be dispatched to your registered email.')}
                    className="text-[11px] font-semibold text-[#0057B8] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="portal-input w-full text-xs pl-9 pr-9 py-2.5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71869A] hover:text-[#003B68] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#52708A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#0057B8] focus:ring-[#0057B8] accent-[#0057B8]"
                  />
                  <span>Remember Me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary-portal w-full py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Login to Candidate Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Fast Login Shortcut */}
              <div className="pt-3 border-t border-[#D9E2EC] text-center">
                <p className="text-[11px] text-[#71869A] mb-2 font-medium">
                  Quick Prototype Demo: Log in as Shortlisted Candidate
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('d.chatterjee@research.tnu.ac.in');
                    setLoginPassword('Password123');
                    handleLoginSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  className="btn-secondary-portal w-full py-1.5 text-xs text-[#0057B8] font-semibold cursor-pointer"
                >
                  ⚡ One-Click Demo Login (Dr. Debashis Chatterjee)
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1">
                  Full Name (As per Academic Records) <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Dr. Ananya Mukherjee"
                    className="portal-input w-full text-xs pl-9 pr-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1">
                    Email <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="portal-input w-full text-xs pl-9 pr-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1">
                    Mobile Number <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71869A]" />
                    <input
                      type="tel"
                      required
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="portal-input w-full text-xs pl-9 pr-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1">
                    Password <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="portal-input w-full text-xs px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1">
                    Confirm Password <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="portal-input w-full text-xs px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#52708A] leading-tight">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#0057B8] focus:ring-[#0057B8] accent-[#0057B8] shrink-0"
                  />
                  <span>
                    I agree to The Neotia University recruitment terms, UGC/AICTE verification criteria, and data privacy policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary-portal w-full py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create Candidate Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-xs text-[#52708A]">
                <span>Already registered with TNU? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="font-bold text-[#0057B8] hover:underline cursor-pointer"
                >
                  Login here
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 pt-3 border-t border-[#D9E2EC] flex items-center justify-center gap-1.5 text-[11px] text-[#71869A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0057B8]" />
            <span>Statutory Verification Portal • The Neotia University</span>
          </div>
        </div>
      </div>
    </div>
  );
};
