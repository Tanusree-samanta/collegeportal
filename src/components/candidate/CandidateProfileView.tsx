import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Save,
  CheckCircle2,
  Edit3,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { CandidateProfile } from '../../types';

interface CandidateProfileViewProps {
  candidateProfile: CandidateProfile;
  onUpdateProfile: (updated: CandidateProfile) => void;
}

export const CandidateProfileView: React.FC<CandidateProfileViewProps> = ({
  candidateProfile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(candidateProfile.fullName);
  const [email, setEmail] = useState(candidateProfile.email);
  const [mobile, setMobile] = useState(candidateProfile.mobile);
  const [designation, setDesignation] = useState(candidateProfile.currentDesignation || '');
  const [organization, setOrganization] = useState(candidateProfile.currentOrganization || '');
  const [highestDegree, setHighestDegree] = useState(candidateProfile.highestDegree || '');
  const [experience, setExperience] = useState(candidateProfile.totalExperienceYears || '');
  const [location, setLocation] = useState(candidateProfile.location || '');
  const [address, setAddress] = useState(candidateProfile.address || '');
  const [pinCode, setPinCode] = useState(candidateProfile.pinCode || '');
  const [dob, setDob] = useState(candidateProfile.dateOfBirth || '');
  const [gender, setGender] = useState(candidateProfile.gender || 'Male');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'DC';

    onUpdateProfile({
      ...candidateProfile,
      fullName,
      email,
      mobile,
      currentDesignation: designation,
      currentOrganization: organization,
      highestDegree,
      totalExperienceYears: experience,
      location,
      address,
      pinCode,
      dateOfBirth: dob,
      gender,
      avatarInitials: initials,
    });

    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================= */}
      {/* 1. HEADER & ACTIONS                                      */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-[#0057B8]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">
              Academic Dossier & Identity
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68]">
            Candidate Academic Profile
          </h1>
          <p className="text-xs text-[#52708A] mt-0.5">
            Institutional curriculum vitae details used to prefill formal academic applications.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {savedToast && (
            <span className="text-xs font-bold text-[#059669] flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Profile Saved
            </span>
          )}

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-white" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. PROFILE HERO OVERVIEW CARD                            */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D9E2EC] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#0057B8] text-white flex items-center justify-center font-bold text-3xl shadow-md ring-4 ring-[#EAF4FF] shrink-0">
            {candidateProfile.avatarInitials}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono font-bold text-[#0057B8] bg-[#EAF4FF] px-2.5 py-0.5 rounded-full border border-[#BFDDF5]">
                ID: {candidateProfile.id}
              </span>
              <span className="text-xs text-[#059669] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Academic Profile
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68]">
              {candidateProfile.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-[#52708A] mt-0.5">
              {candidateProfile.currentDesignation || 'Academic Scholar'} •{' '}
              {candidateProfile.currentOrganization || 'The Neotia University Applicant'}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#52708A]">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0057B8]" />
                {candidateProfile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0057B8]" />
                {candidateProfile.mobile}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0057B8]" />
                {candidateProfile.location || 'India'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. EDIT FORM OR DISPLAY CARDS                            */}
      {/* ========================================================= */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-[#D9E2EC] space-y-6 shadow-xs">
          <h3 className="text-base font-serif font-bold text-[#003B68] border-b border-[#D9E2EC] pb-3">
            Modify Academic & Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Primary Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Mobile Contact</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Current Academic Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. Associate Professor"
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Current Institute / Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. National Institute of Technology"
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Highest Earned Degree</label>
              <input
                type="text"
                value={highestDegree}
                onChange={(e) => setHighestDegree(e.target.value)}
                placeholder="e.g. Ph.D. in Computer Science"
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Total Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 11 Years 4 Months"
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Location / State</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kolkata, West Bengal"
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D9E2EC]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-white" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card A: Academic Qualifications */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#003B68] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#0057B8]" />
              Academic Degrees & Pedigree
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#003B68]">Doctor of Philosophy (Ph.D.)</span>
                  <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                    Awarded
                  </span>
                </div>
                <div className="text-xs text-[#52708A] mt-0.5">
                  Computer Science & Engineering • Jadavpur University
                </div>
                <div className="text-[11px] text-[#71869A] mt-1">
                  Thesis: "Adaptive Neural Architectures for Real-Time Decision Systems" (2018)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#003B68]">Master of Technology (M.Tech)</span>
                  <span className="text-[10px] font-bold text-[#52708A] bg-white px-2 py-0.5 rounded-full border border-[#D9E2EC]">
                    First Class Distinction
                  </span>
                </div>
                <div className="text-xs text-[#52708A] mt-0.5">
                  Software Engineering • IIEST Shibpur (2012)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#003B68]">Bachelor of Technology (B.Tech)</span>
                  <span className="text-[10px] font-bold text-[#52708A] bg-white px-2 py-0.5 rounded-full border border-[#D9E2EC]">
                    First Class
                  </span>
                </div>
                <div className="text-xs text-[#52708A] mt-0.5">
                  Information Technology • MAKAUT (2010)
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Scholarly & Research Metrics */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9E2EC] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#003B68] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0057B8]" />
              Research Indices & Scholarly Metrics
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC] text-center">
                <div className="text-xl font-serif font-bold text-[#0057B8]">18</div>
                <div className="text-[11px] text-[#52708A] mt-0.5">SCI/Scopus Papers</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC] text-center">
                <div className="text-xl font-serif font-bold text-[#003B68]">11</div>
                <div className="text-[11px] text-[#52708A] mt-0.5">H-Index</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC] text-center">
                <div className="text-xl font-serif font-bold text-[#059669]">480+</div>
                <div className="text-[11px] text-[#52708A] mt-0.5">Total Citations</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1.5 text-xs text-[#52708A]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#003B68]">ORCID ID:</span>
                <span className="font-mono text-[#0057B8] font-bold">0000-0002-4819-2184</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#003B68]">Scopus Author ID:</span>
                <span className="font-mono text-[#0057B8] font-bold">57218491022</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#003B68]">Patents Granted:</span>
                <span className="font-semibold text-[#123B5D]">2 Published / 1 Granted</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
