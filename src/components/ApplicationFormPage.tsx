import React, { useState, useRef } from 'react';
import {
  Home,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  Trash2,
  Plus,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Save,
  Check,
  Sparkles,
  FileText,
  User,
  GraduationCap,
  FlaskConical,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import {
  ApplicationFormData,
  Qualification,
  PublicationItem,
  VacantPosition,
} from '../types';

interface ApplicationFormPageProps {
  position?: VacantPosition | null;
  onSubmitSuccess: (data: ApplicationFormData, applicationId: string) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  onNavigateVacancies?: () => void;
  onNavigateRequirement: () => void;
}

const initialFormData: ApplicationFormData = {
  // Step 1: Personal
  firstName: 'Debashis',
  middleName: 'Kumar',
  lastName: 'Chatterjee',
  dateOfBirth: '1986-04-14',
  gender: 'Male',
  nationality: 'Indian',
  email: 'd.chatterjee@research.tnu.ac.in',
  mobile: '+91 98301 24578',
  alternatePhone: '+91 33 2456 7890',
  currentAddress: 'Flat 4B, Heritage Towers, Jadavpur, Kolkata',
  permanentAddress: 'Flat 4B, Heritage Towers, Jadavpur, Kolkata',
  city: 'Kolkata',
  state: 'West Bengal',
  country: 'India',
  pinCode: '700032',

  // Step 2: Education & Experience
  highestQualification: 'Ph.D. / Doctorate',
  qualifications: [
    {
      id: '1',
      level: 'Doctorate',
      degree: 'Doctor of Philosophy (Ph.D.)',
      specialization: 'Deep Learning & Computer Vision',
      institution: 'IIT Kharagpur',
      yearOfPassing: '2018',
      gradeScore: '9.45 CGPA (Distinction)',
      isVerified: true,
    },
    {
      id: '2',
      level: "Master's",
      degree: 'Master of Technology (M.Tech)',
      specialization: 'Artificial Intelligence',
      institution: 'Jadavpur University',
      yearOfPassing: '2013',
      gradeScore: '88.6% (First Class Hons.)',
      isVerified: true,
    },
    {
      id: '3',
      level: 'Bachelor',
      degree: 'Bachelor of Technology (B.Tech)',
      specialization: 'Computer Science & Engineering',
      institution: 'MAKAUT (WBUT)',
      yearOfPassing: '2011',
      gradeScore: '8.72 DGPA',
      isVerified: true,
    },
  ],
  currentOrganization: 'Bengal Institute of Technology & Science',
  currentDesignation: 'Associate Professor (CSE)',
  totalExperience: '11.5 Years',
  teachingExperience: '8.5 Years',
  researchExperience: '5.0 Years',
  industryExperience: '3.0 Years',
  primarySpecialization: 'Neural Network Architectures, Reinforcement Learning, Autonomous Robotics',

  // Step 3: Research & Publications
  publicationsCount: '24',
  sciScopusCount: '14',
  patentsCount: '03',
  projectsCount: '02',
  publications: [
    {
      id: '1',
      title: '"Explainable Deep Reinforcement Frameworks for Real-time Robotic Actuation in Maritime Logistics"',
      venue: 'IEEE Transactions on Artificial Intelligence (2024)',
      doi: '10.1109/TAI.2024.3389012',
      authors: 'Co-authored with Dr. S. Bannerjee, IIT Kgp',
      citations: '42 Citations',
    },
    {
      id: '2',
      title: '"Autonomous Multi-Agent Routing in High-Density Computing Infrastructures"',
      venue: 'ACM Transactions on Autonomous Systems (2025)',
      doi: '10.1145/3618920.362140',
      authors: 'Primary Investigator • Indexed in Scopus',
      citations: '18 Citations',
    },
  ],
  languages: [
    { id: '1', language: 'English', read: true, write: true, speak: true },
    { id: '2', language: 'Bengali', read: true, write: true, speak: true },
    { id: '3', language: 'Hindi', read: true, write: true, speak: true },
  ],
  awards: 'Gold Medalist in M.Tech (2013); Best Faculty Researcher Award 2023.',
  memberships: 'Senior Member IEEE (#948123); Fellow, Institution of Engineers India (FIE).',
  extracurricular: 'Faculty Advisor for Robotics Club, Convener of Hackathon 2024',
  additionalNotes: 'Available for joining within 30 days of appointment if offered tenure.',
  employmentHistory: [
    {
      id: '1',
      designation: 'Associate Professor',
      organization: 'Bengal Institute of Technology & Science',
      period: '2020 – Present',
      description: 'Teaching M.Tech/B.Tech, leading AI Lab research grants.',
      focus: 'Autonomous Robotics & Deep Learning',
      isCurrent: true,
    },
  ],
  references: [
    {
      id: '1',
      name: 'Prof. (Dr.) A. K. Sen',
      designation: 'Professor & Dean (R&D)',
      organization: 'IIT Kharagpur',
      email: 'a.k.sen@ee.iitkgp.ac.in',
      phone: '+91 3222 283120',
      relationship: 'Ph.D. Doctoral Supervisor',
    },
  ],

  // Step 4: CV Upload & Declaration
  cvUploaded: true,
  cvFileName: 'Prof_D_Chatterjee_Academic_CV_2026.pdf',
  cvFileSize: '2.4 MB',
  declarationAccepted: true,
};

export const ApplicationFormPage: React.FC<ApplicationFormPageProps> = ({
  position,
  onSubmitSuccess,
  onNavigateHome,
  onNavigateSchools,
  onNavigateVacancies,
  onNavigateRequirement,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>(() => {
    try {
      const saved = localStorage.getItem('tnu_faculty_application_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return initialFormData;
  });

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor';
  const currentArea = position?.area || 'Computer Science & AI';

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // CV File Upload Handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processCvFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processCvFile(e.target.files[0]);
    }
  };

  const processCvFile = (file: File) => {
    setUploadError(null);
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setUploadError('Invalid format. Please upload a PDF, DOC, or DOCX file.');
      showNotification('Please upload a valid PDF or DOC/DOCX document.');
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds the 5 MB limit. Please compress your CV.');
      showNotification('File size exceeds the 5 MB limit.');
      return;
    }

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setFormData((prev) => ({
      ...prev,
      cvFileName: file.name,
      cvFileSize: `${sizeInMb} MB`,
      cvUploaded: true,
    }));
    showNotification('✓ Updated CV attached and verified successfully');
  };

  const handleRemoveCv = () => {
    setFormData((prev) => ({
      ...prev,
      cvFileName: '',
      cvFileSize: '',
      cvUploaded: false,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showNotification('CV removed.');
  };

  // Add Qualification
  const handleAddQualification = () => {
    const newQual: Qualification = {
      id: Date.now().toString(),
      level: 'Other Certification',
      degree: 'Post-Doctoral Research Fellow',
      specialization: 'Computational Intelligence',
      institution: 'Eminent Academic Institution',
      yearOfPassing: '2020',
      gradeScore: 'Distinction',
      isVerified: true,
    };
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newQual],
    }));
    showNotification('Qualification record added.');
  };

  const handleRemoveQualification = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((q) => q.id !== id),
    }));
  };

  // Add Publication
  const handleAddPublication = () => {
    const newPub: PublicationItem = {
      id: Date.now().toString(),
      title: '"Advances in Neural Optimization for Computational Architectures"',
      venue: 'Springer Lecture Notes in Computer Science (2025)',
      doi: '10.1007/978-3-030-99999-9',
      authors: 'Primary Investigator • Scopus Indexed',
      citations: '12 Citations',
    };
    setFormData((prev) => ({
      ...prev,
      publications: [...prev.publications, newPub],
    }));
    showNotification('Publication record appended.');
  };

  // Save Draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem('tnu_faculty_application_draft', JSON.stringify(formData));
      showNotification('✓ Application draft saved securely in browser.');
    } catch {
      showNotification('Draft saved.');
    }
  };

  // Step Navigations
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.mobile.trim()) {
        showNotification('Please provide mandatory name, email, and mobile contact fields.');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (formData.qualifications.length === 0) {
        showNotification('Please list at least one educational qualification.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Final Submit
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cvUploaded) {
      showNotification('Please attach your updated CV before submitting.');
      return;
    }
    if (!formData.declarationAccepted) {
      showNotification('Please confirm the mandatory applicant declaration.');
      return;
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const appId = `FAC-2026-${randomId}`;
    onSubmitSuccess(formData, appId);
  };

  return (
    <div className="w-full bg-[#F8F5EF] min-h-[calc(100vh-64px)] pb-20 select-none page-enter">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#241F20] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-[13px] font-medium animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#D8BD7A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Context Bar: Manrope 600 13-14px */}
      <div className="w-full bg-white/70 border-b border-[#C9A96E]/25 px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[14px] text-[#625B58]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="breadcrumb-item gap-1 font-semibold cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
          <button
            type="button"
            onClick={onNavigateSchools}
            className="breadcrumb-item font-semibold cursor-pointer"
          >
            Schools
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
          {onNavigateVacancies && (
            <>
              <button
                type="button"
                onClick={onNavigateVacancies}
                className="breadcrumb-item font-semibold cursor-pointer"
              >
                School Posts
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
            </>
          )}
          <button
            type="button"
            onClick={onNavigateRequirement}
            className="breadcrumb-item font-semibold cursor-pointer"
          >
            Post Details
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A96E]/60" />
          <span className="text-[#6B1F2A] font-bold">Application Dossier</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-6">
        {/* Post Applied Summary Banner */}
        <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#C9A96E]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#6B1F2A]/10 border border-[#6B1F2A]/20 flex items-center justify-center text-[#6B1F2A] shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A96E]">
                Candidature Lodgement For
              </span>
              {/* Section Cadre: DM Serif Display, Font weight 400 */}
              <h2 className="font-serif-tnu font-normal text-lg sm:text-xl text-[#241F20] leading-tight">
                {currentCadre}
              </h2>
              <span className="text-[13px] text-[#6B1F2A] font-semibold">{currentArea}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#C9A96E]/40 bg-[#F8F5EF] text-[#625B58] hover:text-[#6B1F2A] text-[13px] font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4-STEP PROGRESS TRACKER                                   */}
        {/* ======================================================== */}
        <div className="bg-white rounded-[18px] p-4 border border-[#C9A96E]/40 shadow-xs">
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, title: 'Personal Info', icon: User },
              { num: 2, title: 'Academics & Exp', icon: GraduationCap },
              { num: 3, title: 'Research & Papers', icon: FlaskConical },
              { num: 4, title: 'CV & Submit', icon: FileText },
            ].map((step) => {
              const isCurrent = currentStep === step.num;
              const isDone = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    if (step.num < currentStep) {
                      setCurrentStep(step.num as 1 | 2 | 3 | 4);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={step.num > currentStep}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[#6B1F2A]/10 border border-[#6B1F2A]/30'
                      : isDone
                      ? 'bg-[#F8F5EF] border border-[#C9A96E]/30 hover:bg-white cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-1 ${
                      isCurrent
                        ? 'bg-[#6B1F2A] text-white shadow-xs'
                        : isDone
                        ? 'bg-[#1B7340] text-white'
                        : 'bg-[#EEE9DF] text-[#8A817C]'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] sm:text-[12px] font-bold leading-tight ${
                      isCurrent ? 'text-[#6B1F2A]' : isDone ? 'text-[#241F20]' : 'text-[#8A817C]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-[#8A817C] font-medium hidden sm:inline">
                    {isDone ? 'Edit' : isCurrent ? 'Active' : 'Step ' + step.num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: PERSONAL & CONTACT INFORMATION                   */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <div className="glass-panel p-5 sm:p-7 rounded-[18px] bg-white border border-[#C9A96E]/40 shadow-xs space-y-6">
            <div className="border-b border-[#EEE9DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1F2A] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                {/* Step Title: DM Serif Display, Font weight 400 */}
                <h3 className="font-serif-tnu font-normal text-base sm:text-xl text-[#241F20]">
                  Step 1: Personal & Contact Information
                </h3>
              </div>
              <p className="text-[14px] text-[#625B58] mt-1 ml-8 font-normal leading-[1.6]">
                Provide applicant identity, primary academic email, telephone, and residential communication address.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                {/* Form Label: Manrope, Font weight 600 */}
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  First Name <span className="text-[#6B1F2A]">*</span>
                </label>
                {/* Form Input: Manrope, Font weight 400 */}
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Last Name <span className="text-[#6B1F2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Date of Birth <span className="text-[#6B1F2A]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Gender <span className="text-[#6B1F2A]">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Nationality <span className="text-[#6B1F2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Academic / Work Email <span className="text-[#6B1F2A]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Mobile Number (with Country Code) <span className="text-[#6B1F2A]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Current Residential Address <span className="text-[#6B1F2A]">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl focus:outline-none focus:border-[#6B1F2A] focus:ring-1 focus:ring-[#6B1F2A]/20 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#625B58] uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-[14px] font-normal px-3.5 py-2 border border-[#C9A96E]/40 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#625B58] uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-[14px] font-normal px-3.5 py-2 border border-[#C9A96E]/40 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#625B58] uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full text-[14px] font-normal px-3.5 py-2 border border-[#C9A96E]/40 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#625B58] uppercase tracking-wider mb-1.5">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full text-[14px] font-normal px-3.5 py-2 border border-[#C9A96E]/40 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions for Step 1: Buttons Manrope 700 14-15px */}
            <div className="pt-4 border-t border-[#EEE9DF] flex items-center justify-between">
              <span className="text-[13px] text-[#625B58] font-medium">
                Step 1 of 4: Personal Information Completed
              </span>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary-tnu inline-flex items-center gap-2 px-6 py-2.5 text-[14px] sm:text-[15px] font-bold cursor-pointer"
              >
                <span>Continue to Step 2: Academics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: ACADEMIC QUALIFICATIONS & EXPERIENCE             */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <div className="glass-panel p-5 sm:p-7 rounded-[18px] bg-white border border-[#C9A96E]/40 shadow-xs space-y-6">
            <div className="border-b border-[#EEE9DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1F2A] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                {/* Step Title: DM Serif Display, Font weight 400 */}
                <h3 className="font-serif-tnu font-normal text-base sm:text-xl text-[#241F20]">
                  Step 2: Academic Qualifications & Teaching Experience
                </h3>
              </div>
              <p className="text-[14px] text-[#625B58] mt-1 ml-8 font-normal leading-[1.6]">
                Record your university degrees, research doctorates, total collegiate teaching years, and current designation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Highest Qualification Attained
                </label>
                <select
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
                >
                  <option value="Ph.D. / Doctorate">Ph.D. / Doctorate</option>
                  <option value="Post-Doctoral Fellow">Post-Doctoral Fellow</option>
                  <option value="Master's (M.Tech / M.Sc / M.Pharm / MBA)">Master's (M.Tech / M.Sc / M.Pharm / MBA)</option>
                  <option value="Bachelor's (B.Tech / B.Sc / MBBS)">Bachelor's (B.Tech / B.Sc / MBBS)</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Primary Specialization / Research Area
                </label>
                <input
                  type="text"
                  value={formData.primarySpecialization}
                  onChange={(e) => setFormData({ ...formData, primarySpecialization: e.target.value })}
                  className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
                />
              </div>
            </div>

            {/* Qualifications List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#241F20] uppercase tracking-wider">
                  University Degrees & Credentials
                </span>
                <button
                  type="button"
                  onClick={handleAddQualification}
                  className="inline-flex items-center gap-1 text-[13px] text-[#6B1F2A] font-bold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Degree</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.qualifications.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-[#C9A96E]/40 bg-[#F8F5EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#C9A96E]/20 text-[#6B1F2A] uppercase tracking-wider">
                          {q.level}
                        </span>
                        <h4 className="font-semibold text-[14px] sm:text-[15px] text-[#241F20]">{q.degree}</h4>
                      </div>
                      <p className="text-[13px] text-[#625B58] mt-1 font-normal">
                        {q.specialization} • {q.institution} ({q.yearOfPassing})
                      </p>
                      <div className="text-[12px] font-semibold text-[#6B1F2A] mt-0.5">
                        Score / Grade: {q.gradeScore}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveQualification(q.id)}
                      className="text-[#8A817C] hover:text-[#B91C1C] p-1.5 self-end sm:self-center cursor-pointer rounded-lg hover:bg-white transition-colors"
                      title="Remove Degree"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Overview */}
            <div className="pt-2 border-t border-[#EEE9DF] space-y-4">
              <span className="text-[13px] font-semibold text-[#241F20] uppercase tracking-wider block">
                Collegiate & Industrial Experience
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F8F5EF] p-3 rounded-xl border border-[#EEE9DF]">
                  <label className="block text-[11px] font-bold text-[#8A817C] uppercase tracking-wider">
                    Total Experience
                  </label>
                  <input
                    type="text"
                    value={formData.totalExperience}
                    onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                    className="w-full text-[14px] font-semibold bg-transparent mt-1 border-b border-[#C9A96E]/50 focus:outline-none text-[#241F20]"
                  />
                </div>

                <div className="bg-[#F8F5EF] p-3 rounded-xl border border-[#EEE9DF]">
                  <label className="block text-[11px] font-bold text-[#8A817C] uppercase tracking-wider">
                    Teaching Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.teachingExperience}
                    onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                    className="w-full text-[14px] font-semibold bg-transparent mt-1 border-b border-[#C9A96E]/50 focus:outline-none text-[#241F20]"
                  />
                </div>

                <div className="bg-[#F8F5EF] p-3 rounded-xl border border-[#EEE9DF]">
                  <label className="block text-[11px] font-bold text-[#8A817C] uppercase tracking-wider">
                    Research Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.researchExperience}
                    onChange={(e) => setFormData({ ...formData, researchExperience: e.target.value })}
                    className="w-full text-[14px] font-semibold bg-transparent mt-1 border-b border-[#C9A96E]/50 focus:outline-none text-[#241F20]"
                  />
                </div>

                <div className="bg-[#F8F5EF] p-3 rounded-xl border border-[#EEE9DF]">
                  <label className="block text-[11px] font-bold text-[#8A817C] uppercase tracking-wider">
                    Industry Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.industryExperience}
                    onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })}
                    className="w-full text-[14px] font-semibold bg-transparent mt-1 border-b border-[#C9A96E]/50 focus:outline-none text-[#241F20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                    Current Organization / University
                  </label>
                  <input
                    type="text"
                    value={formData.currentOrganization}
                    onChange={(e) => setFormData({ ...formData, currentOrganization: e.target.value })}
                    className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                    Current Designation / Cadre
                  </label>
                  <input
                    type="text"
                    value={formData.currentDesignation}
                    onChange={(e) => setFormData({ ...formData, currentDesignation: e.target.value })}
                    className="w-full text-[14px] sm:text-[15px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions for Step 2 */}
            <div className="pt-4 border-t border-[#EEE9DF] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary-tnu inline-flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-bold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Step 1</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary-tnu inline-flex items-center gap-2 px-6 py-2.5 text-[14px] sm:text-[15px] font-bold cursor-pointer"
              >
                <span>Continue to Step 3: Research</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: RESEARCH PROFILE, PUBLICATIONS & PATENTS         */}
        {/* ======================================================== */}
        {currentStep === 3 && (
          <div className="glass-panel p-5 sm:p-7 rounded-[18px] bg-white border border-[#C9A96E]/40 shadow-xs space-y-6">
            <div className="border-b border-[#EEE9DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1F2A] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                {/* Step Title: DM Serif Display, Font weight 400 */}
                <h3 className="font-serif-tnu font-normal text-base sm:text-xl text-[#241F20]">
                  Step 3: Research Profile, Publications & Patents
                </h3>
              </div>
              <p className="text-[14px] text-[#625B58] mt-1 ml-8 font-normal leading-[1.6]">
                Record indexed research papers (SCI/Scopus), registered patents, funded grants, and academic honors.
              </p>
            </div>

            {/* Research Metrics Quad */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F8F5EF] p-3.5 rounded-xl border border-[#EEE9DF] text-center">
                <span className="text-[11px] font-bold text-[#8A817C] uppercase tracking-wider block">
                  Total Publications
                </span>
                <input
                  type="text"
                  value={formData.publicationsCount}
                  onChange={(e) => setFormData({ ...formData, publicationsCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-normal text-[#6B1F2A] text-center w-full bg-transparent border-b border-[#C9A96E]/50 focus:outline-none mt-1"
                />
              </div>

              <div className="bg-[#F8F5EF] p-3.5 rounded-xl border border-[#EEE9DF] text-center">
                <span className="text-[11px] font-bold text-[#8A817C] uppercase tracking-wider block">
                  SCI / Scopus Papers
                </span>
                <input
                  type="text"
                  value={formData.sciScopusCount}
                  onChange={(e) => setFormData({ ...formData, sciScopusCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-normal text-[#241F20] text-center w-full bg-transparent border-b border-[#C9A96E]/50 focus:outline-none mt-1"
                />
              </div>

              <div className="bg-[#F8F5EF] p-3.5 rounded-xl border border-[#EEE9DF] text-center">
                <span className="text-[11px] font-bold text-[#8A817C] uppercase tracking-wider block">
                  Patents (Filed/Granted)
                </span>
                <input
                  type="text"
                  value={formData.patentsCount}
                  onChange={(e) => setFormData({ ...formData, patentsCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-normal text-[#C9A96E] text-center w-full bg-transparent border-b border-[#C9A96E]/50 focus:outline-none mt-1"
                />
              </div>

              <div className="bg-[#F8F5EF] p-3.5 rounded-xl border border-[#EEE9DF] text-center">
                <span className="text-[11px] font-bold text-[#8A817C] uppercase tracking-wider block">
                  Funded Projects
                </span>
                <input
                  type="text"
                  value={formData.projectsCount}
                  onChange={(e) => setFormData({ ...formData, projectsCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-normal text-[#625B58] text-center w-full bg-transparent border-b border-[#C9A96E]/50 focus:outline-none mt-1"
                />
              </div>
            </div>

            {/* Key Publications List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#241F20] uppercase tracking-wider">
                  Representative Research Publications
                </span>
                <button
                  type="button"
                  onClick={handleAddPublication}
                  className="inline-flex items-center gap-1 text-[13px] text-[#6B1F2A] font-bold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Publication</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {formData.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3.5 rounded-xl border border-[#C9A96E]/40 bg-[#F8F5EF]"
                  >
                    <h4 className="font-semibold text-[14px] sm:text-[15px] text-[#241F20] leading-snug">
                      {pub.title}
                    </h4>
                    <p className="text-[13px] text-[#625B58] mt-0.5 font-normal">
                      {pub.venue} • {pub.authors}
                    </p>
                    <div className="flex items-center gap-3 text-[12px] text-[#8A817C] mt-1 font-mono">
                      <span>DOI: {pub.doi}</span>
                      <span className="text-[#6B1F2A] font-semibold">{pub.citations}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Memberships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Academic Honors, Fellowships & Awards
                </label>
                <textarea
                  rows={2}
                  value={formData.awards}
                  onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                  className="w-full text-[14px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                  Professional Society Memberships (IEEE, ACM, etc.)
                </label>
                <textarea
                  rows={2}
                  value={formData.memberships}
                  onChange={(e) => setFormData({ ...formData, memberships: e.target.value })}
                  className="w-full text-[14px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
                />
              </div>
            </div>

            {/* Bottom Actions for Step 3 */}
            <div className="pt-4 border-t border-[#EEE9DF] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary-tnu inline-flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-bold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Step 2</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary-tnu inline-flex items-center gap-2 px-6 py-2.5 text-[14px] sm:text-[15px] font-bold cursor-pointer"
              >
                <span>Continue to Step 4: CV Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: CV UPLOAD & FINAL SUBMISSION                     */}
        {/* ======================================================== */}
        {currentStep === 4 && (
          <form
            onSubmit={handleFinalSubmit}
            className="glass-panel p-5 sm:p-7 rounded-[18px] bg-white border border-[#C9A96E]/40 shadow-xs space-y-6"
          >
            <div className="border-b border-[#EEE9DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6B1F2A] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                {/* Step Title: DM Serif Display, Font weight 400 */}
                <h3 className="font-serif-tnu font-normal text-base sm:text-xl text-[#241F20]">
                  Step 4: CV Upload & Final Academic Dossier Lodgement
                </h3>
              </div>
              <p className="text-[14px] text-[#625B58] mt-1 ml-8 font-normal leading-[1.6]">
                Attach your comprehensive, updated Curriculum Vitae and complete statutory institutional declaration.
              </p>
            </div>

            {/* CV UPLOAD AREA (Section 10 Redesign) */}
            <div className="space-y-3">
              <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider">
                Upload your CV <span className="text-[#6B1F2A]">*</span>
              </label>

              {uploadError && (
                <div className="flex items-center gap-2 text-[13px] text-[#B91C1C] bg-[#B91C1C]/10 border border-[#B91C1C]/25 p-3 rounded-xl font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {formData.cvUploaded ? (
                <div className="p-4 rounded-xl border border-[#1B7340]/40 bg-[#1B7340]/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#1B7340]/15 text-[#1B7340] flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[14px] sm:text-[15px] text-[#241F20] truncate">
                          {formData.cvFileName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B7340] bg-white px-2.5 py-0.5 rounded-full border border-[#1B7340]/30 tracking-wide uppercase">
                          <Check className="w-3.5 h-3.5" />
                          Ready for Review
                        </span>
                      </div>
                      <p className="text-[12px] text-[#625B58] mt-0.5 font-medium">
                        File Size: {formData.cvFileSize} • Attached to Dossier
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[13px] font-bold text-[#625B58] hover:text-[#6B1F2A] px-3.5 py-1.5 bg-white border border-[#C9A96E]/40 rounded-lg shadow-2xs cursor-pointer hover:bg-[#F8F5EF] transition-colors"
                    >
                      Replace File
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCv}
                      className="text-[#8A817C] hover:text-[#B91C1C] p-2 rounded-lg cursor-pointer hover:bg-white transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-[#6B1F2A] bg-[#6B1F2A]/5 scale-[1.01]'
                      : 'border-[#C9A96E]/60 hover:border-[#6B1F2A] bg-[#F8F5EF]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white text-[#6B1F2A] mx-auto mb-3 flex items-center justify-center shadow-xs border border-[#C9A96E]/30">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  {/* Upload Headline: DM Serif Display, Font weight 400 */}
                  <h4 className="font-serif-tnu font-normal text-base sm:text-lg text-[#241F20]">
                    Upload your CV
                  </h4>
                  {/* Subtext: Manrope 500, 12-13px */}
                  <p className="text-[13px] text-[#8A817C] mt-1 font-medium">
                    PDF, DOC or DOCX • Maximum 5 MB
                  </p>
                  <p className="text-[12px] text-[#625B58] mt-2 max-w-sm mx-auto font-normal">
                    Drag and drop your file here, or click to browse from your device.
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Additional Dossier Statement */}
            <div>
              <label className="block text-[13px] font-semibold text-[#241F20] uppercase tracking-wider mb-1.5">
                Statement of Teaching Philosophy / Research Intent (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly state your academic objectives, pedagogical style, and research goals at The Neotia University..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full text-[14px] font-normal px-3.5 py-2.5 border border-[#C9A96E]/40 rounded-xl bg-white"
              />
            </div>

            {/* Dossier Quick Recap Summary */}
            <div className="p-4 rounded-xl border border-[#C9A96E]/30 bg-[#F8F5EF] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A96E] block">
                Candidature Summary Review
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[13px]">
                <div>
                  <span className="text-[#8A817C] text-[11px] font-medium block">Applicant:</span>
                  <span className="font-semibold text-[#241F20]">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[#8A817C] text-[11px] font-medium block">Highest Degree:</span>
                  <span className="font-semibold text-[#241F20]">{formData.highestQualification}</span>
                </div>
                <div>
                  <span className="text-[#8A817C] text-[11px] font-medium block">Experience:</span>
                  <span className="font-semibold text-[#241F20]">{formData.totalExperience}</span>
                </div>
                <div>
                  <span className="text-[#8A817C] text-[11px] font-medium block">CV Attached:</span>
                  <span className="font-bold text-[#1B7340]">
                    {formData.cvUploaded ? '✓ Verified' : 'Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mandatory Academic Declaration */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-xl border border-[#C9A96E]/40 bg-[#F8F5EF] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  required
                  checked={formData.declarationAccepted}
                  onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-[#C9A96E] text-[#6B1F2A] focus:ring-[#6B1F2A] cursor-pointer"
                />
                <span className="text-[13px] sm:text-[14px] text-[#625B58] leading-[1.6] font-normal">
                  I hereby certify that all information, degrees, publication claims, and credentials lodged in this faculty application dossier are authentic, correct, and verifiable from original records. I agree to abide by the statutory recruitment procedures of The Neotia University.
                </span>
              </label>
            </div>

            {/* Bottom Actions with PREVIOUS & FINAL SUBMIT: Buttons Manrope 700 14-15px */}
            <div className="pt-4 border-t border-[#EEE9DF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto btn-secondary-tnu inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[14px] font-bold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Step 3</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto btn-primary-tnu inline-flex items-center justify-center gap-2 px-8 py-3 text-[14px] sm:text-[15px] font-bold tracking-wide cursor-pointer whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Application Dossier</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
