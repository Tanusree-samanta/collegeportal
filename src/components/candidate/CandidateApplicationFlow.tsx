import React, { useState, useRef, useMemo } from 'react';
import {
  Briefcase,
  Check,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  ShieldCheck,
  User,
  GraduationCap,
  Sparkles,
  Calendar,
  Building,
  CheckCircle2,
  HelpCircle,
  Clock,
  Download,
  Eye,
  FileCheck,
} from 'lucide-react';
import {
  VacantPosition,
  CandidateProfile,
  ApplicationFormData,
  Qualification,
  EmploymentRecord,
  CandidateApplication,
} from '../../types';

interface CandidateApplicationFlowProps {
  position: VacantPosition;
  candidateProfile: CandidateProfile | null;
  onApplicationSubmitted: (newApp: CandidateApplication) => void;
  onCancel: () => void;
  onSaveDraft: (draftData: Partial<ApplicationFormData>, currentStep: number) => void;
}

export const CandidateApplicationFlow: React.FC<CandidateApplicationFlowProps> = ({
  position,
  candidateProfile,
  onApplicationSubmitted,
  onCancel,
  onSaveDraft,
}) => {
  // Stepper: 1 to 6 (6 is Success)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State initialized with candidate profile data (Smart Data Reuse)
  const [fullName, setFullName] = useState(candidateProfile?.fullName || 'Dr. Debashis Chatterjee');
  const [email, setEmail] = useState(candidateProfile?.email || 'd.chatterjee@research.tnu.ac.in');
  const [mobile, setMobile] = useState(candidateProfile?.mobile || '+91 98301 24578');
  const [dob, setDob] = useState(candidateProfile?.dateOfBirth || '1986-04-14');
  const [gender, setGender] = useState(candidateProfile?.gender || 'Male');
  const [currentAddress, setCurrentAddress] = useState(candidateProfile?.address || 'Flat 4B, Heritage Towers, Jadavpur');
  const [permanentAddress, setPermanentAddress] = useState(candidateProfile?.address || 'Flat 4B, Heritage Towers, Jadavpur');
  const [city, setCity] = useState('Kolkata');
  const [state, setState] = useState('West Bengal');
  const [pinCode, setPinCode] = useState(candidateProfile?.pinCode || '700032');

  // Step 2: Education
  const [highestQualification, setHighestQualification] = useState(
    candidateProfile?.highestDegree || 'Ph.D. in Computer Science & Engineering'
  );
  const [educations, setEducations] = useState<Qualification[]>([
    {
      id: 'ed-1',
      level: 'Doctorate (Ph.D.)',
      degree: 'Ph.D. in Computer Science & Engineering',
      specialization: 'Artificial Intelligence & Deep Learning',
      institution: 'Jadavpur University',
      yearOfPassing: '2016',
      gradeScore: 'Distinction / Awarded',
      isVerified: true,
    },
    {
      id: 'ed-2',
      level: 'Postgraduate (M.Tech)',
      degree: 'M.Tech in Information Technology',
      specialization: 'Distributed Computing',
      institution: 'IIEST Shibpur',
      yearOfPassing: '2011',
      gradeScore: '9.24 CGPA (First Class)',
      isVerified: true,
    },
    {
      id: 'ed-3',
      level: 'Undergraduate (B.Tech)',
      degree: 'B.Tech in Computer Science & Engineering',
      specialization: 'Computer Systems',
      institution: 'Kalyani Government Engineering College',
      yearOfPassing: '2008',
      gradeScore: '8.76 DGPA (First Class)',
      isVerified: true,
    },
  ]);

  // Step 3: Experience
  const [experiences, setExperiences] = useState<EmploymentRecord[]>([
    {
      id: 'exp-1',
      organization: 'Kolkata Institute of Advanced Computing',
      designation: 'Associate Professor',
      period: '2019 – Present',
      focus: 'Teaching UG/PG classes and mentoring Ph.D. scholars in deep learning',
      description: 'Head of AI Research Group; Principal Investigator for 2 AICTE funded research projects.',
      isCurrent: true,
      employmentType: 'Full Time • Regular',
    },
    {
      id: 'exp-2',
      organization: 'Heritage Institute of Technology',
      designation: 'Assistant Professor (Senior Scale)',
      period: '2014 – 2019',
      focus: 'Machine Learning Instruction & Curriculum Revision Committee Member',
      description: 'Taught Neural Networks, Distributed Systems; Mentored 14 M.Tech theses.',
      isCurrent: false,
      employmentType: 'Full Time • Regular',
    },
  ]);

  // Step 4: Documents state
  const [docsState, setDocsState] = useState<{
    [key: string]: { fileName: string; uploaded: boolean; fileSize?: string };
  }>({
    cv: { fileName: 'Dr_Debashis_Chatterjee_Comprehensive_CV.pdf', uploaded: true, fileSize: '2.4 MB' },
    degree: { fileName: 'PhD_Degree_Certificate_Jadavpur_Univ.pdf', uploaded: true, fileSize: '1.8 MB' },
    experience: { fileName: 'Experience_Relieving_Letters.pdf', uploaded: true, fileSize: '3.1 MB' },
    idProof: { fileName: 'Aadhaar_Card_Verified.pdf', uploaded: true, fileSize: '0.8 MB' },
    other: { fileName: 'SCI_Scopus_Publication_List.pdf', uploaded: true, fileSize: '1.2 MB' },
  });

  // Step 5: Declaration & Generated ID
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState(`TNU-APP-2026-00${Math.floor(100 + Math.random() * 900)}`);

  // Calculate total experience string
  const totalExperienceString = useMemo(() => {
    return '11 Years 4 Months (Academic & Research)';
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddEducation = () => {
    const newEd: Qualification = {
      id: `ed-${Date.now()}`,
      level: 'Degree Level',
      degree: '',
      specialization: '',
      institution: '',
      yearOfPassing: '',
      gradeScore: '',
      isVerified: false,
    };
    setEducations([...educations, newEd]);
  };

  const handleRemoveEducation = (id: string) => {
    setEducations(educations.filter((e) => e.id !== id));
  };

  const handleAddExperience = () => {
    const newExp: EmploymentRecord = {
      id: `exp-${Date.now()}`,
      organization: '',
      designation: '',
      period: '',
      focus: '',
      description: '',
      isCurrent: false,
      employmentType: 'Full Time • Regular',
    };
    setExperiences([...experiences, newExp]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const handleFileUpload = (docKey: string, file: File) => {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    setDocsState((prev) => ({
      ...prev,
      [docKey]: { fileName: file.name, uploaded: true, fileSize: sizeInMb },
    }));
    triggerToast(`Attached: ${file.name}`);
  };

  const handleRemoveDoc = (docKey: string) => {
    setDocsState((prev) => ({
      ...prev,
      [docKey]: { fileName: '', uploaded: false },
    }));
  };

  const handleSaveDraftClick = () => {
    onSaveDraft(
      {
        firstName: fullName.split(' ')[0] || '',
        lastName: fullName.split(' ').slice(1).join(' ') || '',
        email,
        mobile,
        currentAddress,
        highestQualification,
        qualifications: educations,
        employmentHistory: experiences,
      },
      currentStep
    );
    triggerToast('Draft saved successfully! You can resume anytime.');
  };

  const handleFinalSubmitConfirm = () => {
    setShowSubmitModal(false);

    // Create CandidateApplication payload
    const newApp: CandidateApplication = {
      id: generatedAppId,
      vacancyId: position.id,
      jobTitle: `${position.cadre} — ${position.area}`,
      schoolName: position.department,
      department: position.department,
      positionType: position.positionType || 'Faculty',
      location: position.location,
      appliedDate: 'Today',
      lastUpdated: 'Just now',
      applicationStatus: 'Submitted',
      interviewStatus: 'Not Scheduled',
      selectionStatus: 'Pending',
      loiStatus: 'Not Issued',
      verificationStatus: 'Under Verification',
      joiningStatus: 'Not Started',
      timeline: [
        {
          stageKey: 'submitted',
          label: 'Application Submitted',
          date: 'Today',
          description: 'Dossier successfully lodged with Selection Secretariat.',
          status: 'COMPLETED',
        },
        {
          stageKey: 'received',
          label: 'Application Received',
          date: 'Today',
          description: 'Candidate file opened and queued for screening.',
          status: 'COMPLETED',
        },
        {
          stageKey: 'screening',
          label: 'Screening',
          date: 'Pending',
          description: 'Academic Scrutiny Committee review.',
          status: 'PENDING',
        },
      ],
      verificationChecklist: [
        { id: 'v1', docName: 'Academic CV', status: 'Uploaded', lastUpdated: 'Today' },
        { id: 'v2', docName: 'Educational Degrees', status: 'Uploaded', lastUpdated: 'Today' },
        { id: 'v3', docName: 'Identity Proof', status: 'Uploaded', lastUpdated: 'Today' },
      ],
      preOnboardingTasks: [],
    };

    onApplicationSubmitted(newApp);
    setCurrentStep(6); // Success step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#F7F9FC] min-h-[calc(100vh-64px)] pb-24 page-enter">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#003B68] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#BFDDF5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Position Context Header Banner */}
      <div className="w-full bg-white border-b border-[#D9E2EC] px-4 sm:px-6 lg:px-8 py-3.5 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8]">
                  Applying for
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5]">
                  {position.positionType || 'Faculty'}
                </span>
                <span className="text-[11px] text-[#71869A]">
                  ID: {position.id.toUpperCase()}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-[#003B68] font-serif-tnu truncate leading-tight">
                {position.cadre} — {position.area}
              </h2>
              <p className="text-[11px] text-[#52708A] truncate">{position.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentStep < 6 && (
              <button
                type="button"
                onClick={handleSaveDraftClick}
                className="btn-secondary-portal px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#0057B8]" />
                <span className="hidden sm:inline">Save as Draft</span>
                <span className="sm:hidden">Save</span>
              </button>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-semibold text-[#71869A] hover:text-[#003B68] px-2.5 py-1.5 cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
        {/* 5-Step Horizontal Stepper */}
        {currentStep < 6 && (
          <div className="bg-white rounded-2xl p-4 border border-[#D9E2EC] shadow-xs">
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[
                { num: 1, title: 'Personal Info' },
                { num: 2, title: 'Education' },
                { num: 3, title: 'Experience' },
                { num: 4, title: 'Documents & CV' },
                { num: 5, title: 'Review & Submit' },
              ].map((step) => {
                const isCurrent = currentStep === step.num;
                const isDone = currentStep > step.num;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => {
                      if (step.num < currentStep) {
                        setCurrentStep(step.num as any);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={step.num > currentStep}
                    className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-[#EAF4FF] border-2 border-[#0057B8]'
                        : isDone
                        ? 'bg-white border border-[#BFDDF5] hover:bg-[#F7F9FC] cursor-pointer'
                        : 'bg-[#F7F9FC] border border-[#D9E2EC] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-1 ${
                        isCurrent
                          ? 'bg-[#0057B8] text-white shadow-xs'
                          : isDone
                          ? 'bg-[#059669] text-white'
                          : 'bg-[#D9E2EC] text-[#71869A]'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                    </div>
                    <span
                      className={`text-[11px] sm:text-xs font-bold leading-tight ${
                        isCurrent ? 'text-[#0057B8]' : isDone ? 'text-[#059669]' : 'text-[#71869A]'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] text-[#71869A] font-medium hidden sm:inline">
                      {isDone ? 'Complete' : isCurrent ? 'Active Step' : `Step ${step.num}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 1: PERSONAL INFORMATION                           */}
        {/* ======================================================= */}
        {currentStep === 1 && (
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold font-serif-tnu">
                  Personal Information
                </h3>
              </div>
              <p className="text-xs text-[#52708A] mt-1 ml-8">
                Your information is securely stored and pre-filled from your candidate profile where applicable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#E02424]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Date of Birth <span className="text-[#E02424]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#E02424]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-[#E02424]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Gender <span className="text-[#E02424]">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2.5 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Current Residential Address <span className="text-[#E02424]">*</span>
                </label>
                <textarea
                  rows={2}
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                  Permanent Address
                </label>
                <textarea
                  rows={2}
                  value={permanentAddress}
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  className="portal-input w-full text-xs sm:text-sm px-3.5 py-2"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="portal-input w-full text-xs px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="portal-input w-full text-xs px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value="India"
                    readOnly
                    className="portal-input w-full text-xs px-3 py-1.5 bg-[#F7F9FC]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="portal-input w-full text-xs px-3 py-1.5"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
              <span className="text-xs text-[#71869A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0057B8]" />
                <span>Your information is securely encrypted and stored.</span>
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary-portal px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Save & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 2: EDUCATION                                      */}
        {/* ======================================================= */}
        {currentStep === 2 && (
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base sm:text-xl text-[#003B68] font-bold font-serif-tnu">
                    Educational Qualifications
                  </h3>
                </div>
                <p className="text-xs text-[#52708A] mt-1 ml-8">
                  Record all degrees from Doctorate, Post-Graduation, Graduation to Professional Diplomas.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddEducation}
                className="btn-secondary-portal px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>+ Add Education</span>
              </button>
            </div>

            {/* Highest Qualification Headline */}
            <div>
              <label className="block text-xs font-bold text-[#003B68] uppercase tracking-wider mb-1.5">
                Highest Academic Qualification <span className="text-[#E02424]">*</span>
              </label>
              <input
                type="text"
                required
                value={highestQualification}
                onChange={(e) => setHighestQualification(e.target.value)}
                placeholder="e.g. Ph.D. in Computer Science & Engineering"
                className="portal-input w-full text-xs sm:text-sm px-3.5 py-2.5"
              />
            </div>

            {/* Education Records List */}
            <div className="space-y-4">
              {educations.map((ed, idx) => (
                <div
                  key={ed.id}
                  className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] relative flex flex-col sm:flex-row gap-3 items-start justify-between"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Degree Level
                      </label>
                      <input
                        type="text"
                        value={ed.level}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].level = e.target.value;
                          setEducations(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Degree / Course Name
                      </label>
                      <input
                        type="text"
                        value={ed.degree}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].degree = e.target.value;
                          setEducations(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Specialization Area
                      </label>
                      <input
                        type="text"
                        value={ed.specialization}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].specialization = e.target.value;
                          setEducations(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        University / Institution
                      </label>
                      <input
                        type="text"
                        value={ed.institution}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].institution = e.target.value;
                          setEducations(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Year of Passing
                      </label>
                      <input
                        type="text"
                        value={ed.yearOfPassing}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].yearOfPassing = e.target.value;
                          setEducations(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Percentage / CGPA
                      </label>
                      <input
                        type="text"
                        value={ed.gradeScore}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].gradeScore = e.target.value;
                          setEducations(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(ed.id)}
                    className="p-1.5 rounded-lg text-[#71869A] hover:text-[#E02424] hover:bg-white transition-colors cursor-pointer shrink-0"
                    title="Remove this degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="btn-secondary-portal px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary-portal px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Save & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 3: EXPERIENCE                                     */}
        {/* ======================================================= */}
        {currentStep === 3 && (
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base sm:text-xl text-[#003B68] font-bold font-serif-tnu">
                    Professional Experience
                  </h3>
                </div>
                <p className="text-xs text-[#52708A] mt-1 ml-8">
                  Record teaching, research, and industry appointments. Total experience is automatically calculated.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddExperience}
                className="btn-secondary-portal px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>+ Add Experience</span>
              </button>
            </div>

            {/* Total Experience Summary Badge */}
            <div className="p-3.5 rounded-xl bg-[#EAF4FF] border border-[#BFDDF5] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#0057B8]">
                <Clock className="w-4 h-4 text-[#0057B8]" />
                <span className="font-bold uppercase tracking-wider">Total Cumulative Experience:</span>
              </div>
              <span className="font-bold text-[#003B68] text-sm">
                {totalExperienceString}
              </span>
            </div>

            {/* Experience Records */}
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] space-y-3 relative"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#D9E2EC]">
                    <span className="text-xs font-bold text-[#0057B8] uppercase tracking-wider">
                      Appointment #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-[#71869A] hover:text-[#E02424] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Organization / University Name
                      </label>
                      <input
                        type="text"
                        value={exp.organization}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].organization = e.target.value;
                          setExperiences(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Designation / Cadre
                      </label>
                      <input
                        type="text"
                        value={exp.designation}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].designation = e.target.value;
                          setExperiences(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Employment Type
                      </label>
                      <select
                        value={exp.employmentType || 'Full Time'}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].employmentType = e.target.value;
                          setExperiences(updated);
                        }}
                        className="portal-input w-full text-xs px-3 py-1.5 bg-white"
                      >
                        <option value="Full Time • Regular">Full Time • Regular</option>
                        <option value="Full Time • Contractual">Full Time • Contractual</option>
                        <option value="Adjunct / Visiting">Adjunct / Visiting</option>
                        <option value="Research Fellow">Research Fellow</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                        Period / Duration
                      </label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].period = e.target.value;
                          setExperiences(updated);
                        }}
                        placeholder="e.g. 2019 – Present"
                        className="portal-input w-full text-xs px-3 py-1.5"
                      />
                    </div>

                    <div className="flex items-center pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-[#003B68] font-semibold">
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].isCurrent = e.target.checked;
                            setExperiences(updated);
                          }}
                          className="rounded text-[#0057B8] focus:ring-[#0057B8] accent-[#0057B8]"
                        />
                        <span>Currently Working Here</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                      Key Responsibilities & Highlights
                    </label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].description = e.target.value;
                        setExperiences(updated);
                      }}
                      className="portal-input w-full text-xs px-3 py-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="btn-secondary-portal px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary-portal px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Save & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 4: DOCUMENTS & CV                                 */}
        {/* ======================================================= */}
        {currentStep === 4 && (
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold font-serif-tnu">
                  Document Management & CV Attachment
                </h3>
              </div>
              <p className="text-xs text-[#52708A] mt-1 ml-8">
                Upload your comprehensive CV and statutory certificates. Max file size: 5 MB per document (PDF, DOC, DOCX).
              </p>
            </div>

            {/* Document Cards */}
            <div className="space-y-3.5">
              {[
                { key: 'cv', label: 'Curriculum Vitae (Comprehensive Academic Dossier)', required: true },
                { key: 'degree', label: 'Doctoral / Highest Degree Certificate', required: true },
                { key: 'experience', label: 'Experience & Relieving Certificate', required: false },
                { key: 'idProof', label: 'Government Identity Proof (Aadhaar / Passport)', required: true },
                { key: 'other', label: 'Other Supporting Research Publications / NOC', required: false },
              ].map((doc) => {
                const docState = docsState[doc.key];
                return (
                  <div
                    key={doc.key}
                    className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#D9E2EC] flex items-center justify-center text-[#0057B8] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#003B68]">
                            {doc.label}
                          </span>
                          {doc.required ? (
                            <span className="text-[10px] font-bold text-[#E02424] bg-[#FDF2F2] px-1.5 py-0.2 rounded border border-[#F8B4B4]">
                              Required
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-[#71869A]">
                              Optional
                            </span>
                          )}
                        </div>

                        {docState.uploaded ? (
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-[#059669] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="truncate max-w-xs">{docState.fileName}</span>
                            <span className="text-[11px] text-[#71869A]">({docState.fileSize})</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#71869A] block mt-0.5">
                            No file attached yet. PDF / DOC format up to 5 MB.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {docState.uploaded ? (
                        <>
                          <label className="btn-secondary-portal px-3 py-1.5 text-xs cursor-pointer">
                            Replace
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileUpload(doc.key, e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(doc.key)}
                            className="p-1.5 text-[#71869A] hover:text-[#E02424] cursor-pointer"
                            title="Remove file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <label className="btn-primary-portal px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(doc.key, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="btn-secondary-portal px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary-portal px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 5: REVIEW & DECLARATION                           */}
        {/* ======================================================= */}
        {currentStep === 5 && (
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold font-serif-tnu">
                  Application Dossier Review
                </h3>
              </div>
              <p className="text-xs text-[#52708A] mt-1 ml-8">
                Carefully verify your particulars before final lodgement with the University Selection Committee.
              </p>
            </div>

            {/* Review Card: Applied Position */}
            <div className="p-4 rounded-xl bg-[#EAF4FF] border border-[#BFDDF5] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8] block">
                  Target Vacancy
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#003B68]">
                  {position.cadre} — {position.area}
                </h4>
                <p className="text-xs text-[#52708A]">{position.department} • {position.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#0057B8] border border-[#BFDDF5] text-xs font-bold">
                {position.positionType || 'Faculty'}
              </span>
            </div>

            {/* Review Section 1: Personal */}
            <div className="border border-[#D9E2EC] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#003B68] uppercase tracking-wider">
                  1. Personal & Contact Information
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-[#0057B8] hover:underline cursor-pointer"
                >
                  [Edit]
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#52708A]">
                <div><span className="text-[#71869A] block">Name:</span> <strong className="text-[#003B68]">{fullName}</strong></div>
                <div><span className="text-[#71869A] block">Email:</span> <strong className="text-[#003B68]">{email}</strong></div>
                <div><span className="text-[#71869A] block">Mobile:</span> <strong className="text-[#003B68]">{mobile}</strong></div>
                <div><span className="text-[#71869A] block">Location:</span> <strong className="text-[#003B68]">{city}, {state}</strong></div>
              </div>
            </div>

            {/* Review Section 2: Education */}
            <div className="border border-[#D9E2EC] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#003B68] uppercase tracking-wider">
                  2. Academic Qualifications ({educations.length} Records)
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-[#0057B8] hover:underline cursor-pointer"
                >
                  [Edit]
                </button>
              </div>
              <div className="space-y-1.5">
                {educations.map((ed) => (
                  <div key={ed.id} className="text-xs text-[#52708A] flex justify-between py-1 border-b border-[#D9E2EC]">
                    <span><strong>{ed.level}:</strong> {ed.degree} ({ed.specialization}) — {ed.institution}</span>
                    <span className="text-[#0057B8] font-semibold">{ed.yearOfPassing} • {ed.gradeScore}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Section 3: Experience */}
            <div className="border border-[#D9E2EC] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#003B68] uppercase tracking-wider">
                  3. Experience ({totalExperienceString})
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-bold text-[#0057B8] hover:underline cursor-pointer"
                >
                  [Edit]
                </button>
              </div>
              <div className="space-y-1.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-xs text-[#52708A] flex justify-between py-1 border-b border-[#D9E2EC]">
                    <span><strong>{exp.designation}</strong> at {exp.organization}</span>
                    <span className="text-[#0057B8] font-semibold">{exp.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Section 4: Documents */}
            <div className="border border-[#D9E2EC] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#003B68] uppercase tracking-wider">
                  4. Uploaded Documents
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs font-bold text-[#0057B8] hover:underline cursor-pointer"
                >
                  [Edit]
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(docsState).map(([key, val]) =>
                  val.uploaded ? (
                    <span key={key} className="px-2.5 py-1 rounded-lg bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{val.fileName}</span>
                    </span>
                  ) : null
                )}
              </div>
            </div>

            {/* Statutory Declaration */}
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC]">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#123B5D] leading-relaxed">
                <input
                  type="checkbox"
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  className="mt-1 rounded text-[#0057B8] focus:ring-[#0057B8] accent-[#0057B8] shrink-0"
                />
                <span>
                  <strong>Solemn Declaration:</strong> I confirm that the information provided by me in this application dossier is true and complete to the best of my knowledge. I understand that any false statement or suppression of material facts will lead to immediate disqualification or termination of candidature under UGC & University statutes.
                </span>
              </label>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="btn-secondary-portal px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={!declarationAccepted}
                onClick={() => setShowSubmitModal(true)}
                className="btn-primary-portal px-7 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <span>Submit Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* STEP 6: APPLICATION SUCCESS                            */}
        {/* ======================================================= */}
        {currentStep === 6 && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D9E2EC] shadow-md text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#ECFDF5] border-2 border-[#059669] text-[#059669] flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8] block mb-1">
                The Neotia University • Selection Secretariat
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-tnu text-[#003B68]">
                Application Submitted Successfully
              </h2>
              <p className="text-xs sm:text-sm text-[#52708A] mt-2 max-w-md mx-auto leading-relaxed">
                Your application has been successfully submitted and registered in the candidate management system. You can track its progress from My Applications.
              </p>
            </div>

            {/* Application ID Card */}
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-[#D9E2EC]">
                <span className="text-[11px] font-bold text-[#71869A] uppercase">Application ID</span>
                <span className="font-bold text-[#0057B8] text-base">{generatedAppId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71869A]">Position:</span>
                <span className="font-semibold text-[#003B68]">{position.cadre}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71869A]">Department:</span>
                <span className="font-semibold text-[#003B68]">{position.department}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71869A]">Submission Date:</span>
                <span className="font-semibold text-[#003B68]">Today</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="btn-primary-portal w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider cursor-pointer"
              >
                Go to Candidate Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0057B8] flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#003B68] font-serif-tnu">
                  Confirm Application Submission
                </h3>
                <p className="text-xs text-[#52708A]">
                  Are you sure you want to submit this application?
                </p>
              </div>
            </div>

            <p className="text-xs text-[#52708A] bg-[#F7F9FC] p-3 rounded-xl border border-[#D9E2EC] leading-relaxed">
              Once submitted, your academic dossier will be forwarded to the Scrutiny Committee for verification against UGC/AICTE minimum eligibility standards.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="btn-secondary-portal px-4 py-2 text-xs cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleFinalSubmitConfirm}
                className="btn-primary-portal px-5 py-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
