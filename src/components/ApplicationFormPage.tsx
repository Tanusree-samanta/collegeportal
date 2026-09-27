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
  AlertCircle,
  User,
  GraduationCap,
  FlaskConical,
  BookOpen,
  Award,
  Calendar,
  Building2,
  Briefcase,
} from 'lucide-react';
import {
  ApplicationFormData,
  Qualification,
  PublicationItem,
  LanguageRow,
  EmploymentRecord,
  ReferenceContact,
  VacantPosition,
} from '../types';

interface ApplicationFormPageProps {
  position?: VacantPosition | null;
  onSubmitSuccess: (data: ApplicationFormData, applicationId: string) => void;
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  onNavigateVacancies: () => void;
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
      organization: 'Bengal Institute of Tech',
      period: 'Jul 2020 – Present',
      description: 'Led Departmental AI Lab, mentored 18 M.Tech theses, and secured sponsored grants.',
      focus: 'Post-Graduate Instruction & Research',
      isCurrent: true,
    },
  ],
  references: [
    {
      id: '1',
      name: 'Prof. (Dr.) A. K. Ray',
      designation: 'Professor & Dean of Engineering',
      organization: 'IIT Kharagpur',
      relationship: 'Ph.D. Dissertation Supervisor',
      email: 'akray@cse.iitkgp.ac.in',
      phone: '+91 3222 282 340',
    },
  ],

  // Step 4: CV Upload & Declaration
  cvFileName: 'Dr_Debashis_Chatterjee_CV_2026.pdf',
  cvFileSize: '3.4 MB',
  cvUploaded: true,
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
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor / Tutor Professor';
  const currentArea = position?.area || 'AI & Machine Learning';

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // CV File Upload Handlers
  const handleFileDrop = (e: React.DragEvent) => {
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
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      showNotification('Please upload a valid PDF or DOC/DOCX document.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showNotification('File size exceeds the 10 MB limit.');
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
    <div className="w-full bg-[#F8F6F0] min-h-[calc(100vh-64px)] pb-20 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#292727] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#D9CC86]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Context Bar */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EBE6DF] px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs text-[#765331]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#D83232] transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateSchools}
            className="hover:text-[#D83232] transition-colors font-medium cursor-pointer"
          >
            Schools
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateVacancies}
            className="hover:text-[#D83232] transition-colors font-medium cursor-pointer"
          >
            Vacancies
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateRequirement}
            className="hover:text-[#D83232] transition-colors font-medium cursor-pointer"
          >
            Post Details
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <span className="text-[#D83232] font-bold">4-Step Application Form</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-6">
        {/* Post Applied Summary Banner */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#D9CC86]/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#D83232]/10 border border-[#D83232]/20 flex items-center justify-center text-[#D83232] shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#765331]">
                Candidature For
              </span>
              <h2 className="font-bold text-sm sm:text-base text-[#292727] leading-tight">
                {currentCadre}
              </h2>
              <span className="text-xs text-[#D83232] font-semibold">{currentArea}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9CC86] bg-[#F8F6F0] text-[#765331] hover:text-[#292727] text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4-STEP PROGRESS TRACKER (Interactive & Clear)             */}
        {/* ======================================================== */}
        <div className="bg-white rounded-xl p-4 border border-[#D9CC86]/60 shadow-xs">
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, title: 'Personal Info', icon: User },
              { num: 2, title: 'Academics & Exp', icon: GraduationCap },
              { num: 3, title: 'Research & Papers', icon: FlaskConical },
              { num: 4, title: 'CV & Submit', icon: FileText },
            ].map((step) => {
              const isCurrent = currentStep === step.num;
              const isDone = currentStep > step.num;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    // allow clicking to previous completed steps to edit
                    if (step.num < currentStep) {
                      setCurrentStep(step.num as 1 | 2 | 3 | 4);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={step.num > currentStep}
                  className={`flex flex-col items-center text-center p-2 rounded-lg transition-all ${
                    isCurrent
                      ? 'bg-[#D83232]/10 border border-[#D83232]/30'
                      : isDone
                      ? 'bg-[#FAF8F5] border border-[#D9CC86]/40 hover:bg-[#F2ECE4] cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-1 ${
                      isCurrent
                        ? 'bg-[#D83232] text-white shadow-xs'
                        : isDone
                        ? 'bg-[#4A351F] text-white'
                        : 'bg-[#EBE6DF] text-[#765331]'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold leading-tight ${
                      isCurrent ? 'text-[#D83232]' : isDone ? 'text-[#4A351F]' : 'text-[#765331]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[9px] text-[#765331]/80 hidden sm:inline">
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
          <div
            className="p-5 sm:p-7 rounded-[14px] border border-[#D9CC86]/70 bg-white/80 shadow-[0_8px_25px_rgba(41,39,39,0.04)] space-y-6"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="border-b border-[#EBE6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D83232] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727]">
                  Step 1: Personal & Contact Information
                </h3>
              </div>
              <p className="text-xs text-[#765331] mt-1 ml-8">
                Provide applicant identity, primary academic email, telephone, and residential communication address.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  First Name <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Last Name <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Date of Birth <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Gender <span className="text-[#D83232]">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232] bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Nationality <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Academic / Work Email <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Mobile Number (with Country Code) <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Current Residential Address <span className="text-[#D83232]">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg focus:outline-none focus:border-[#D83232]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions for Step 1 */}
            <div className="pt-4 border-t border-[#EBE6DF] flex items-center justify-between">
              <span className="text-xs text-[#765331]">
                Step 1 of 4: Personal Information Completed
              </span>

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
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
          <div
            className="p-5 sm:p-7 rounded-[14px] border border-[#D9CC86]/70 bg-white/80 shadow-[0_8px_25px_rgba(41,39,39,0.04)] space-y-6"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="border-b border-[#EBE6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D83232] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727]">
                  Step 2: Academic Qualifications & Teaching Experience
                </h3>
              </div>
              <p className="text-xs text-[#765331] mt-1 ml-8">
                Record your university degrees, research doctorates, total collegiate teaching years, and current designation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Highest Qualification Attained
                </label>
                <select
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg bg-white"
                >
                  <option value="Ph.D. / Doctorate">Ph.D. / Doctorate</option>
                  <option value="Post-Doctoral Fellow">Post-Doctoral Fellow</option>
                  <option value="Master's (M.Tech / M.Sc / M.Pharm / MBA)">Master's (M.Tech / M.Sc / M.Pharm / MBA)</option>
                  <option value="Bachelor's (B.Tech / B.Sc / MBBS)">Bachelor's (B.Tech / B.Sc / MBBS)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Primary Specialization / Research Area
                </label>
                <input
                  type="text"
                  value={formData.primarySpecialization}
                  onChange={(e) => setFormData({ ...formData, primarySpecialization: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                />
              </div>
            </div>

            {/* Qualifications List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4A351F] uppercase tracking-wider">
                  University Degrees & Credentials
                </span>
                <button
                  type="button"
                  onClick={handleAddQualification}
                  className="inline-flex items-center gap-1 text-xs text-[#D83232] font-bold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Degree</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.qualifications.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-lg border border-[#D9CC86]/60 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B69A62]/20 text-[#765331] uppercase">
                          {q.level}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-[#292727]">{q.degree}</h4>
                      </div>
                      <p className="text-xs text-[#5B403D] mt-0.5">
                        {q.specialization} • {q.institution} ({q.yearOfPassing})
                      </p>
                      <div className="text-[11px] font-semibold text-[#D83232] mt-0.5">
                        Score / Grade: {q.gradeScore}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveQualification(q.id)}
                      className="text-[#765331] hover:text-[#D83232] p-1 self-end sm:self-center cursor-pointer"
                      title="Remove Degree"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Overview */}
            <div className="pt-2 border-t border-[#EBE6DF] space-y-4">
              <span className="text-xs font-bold text-[#4A351F] uppercase tracking-wider block">
                Collegiate & Industrial Experience
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EBE6DF]">
                  <label className="block text-[10px] font-bold text-[#765331] uppercase">
                    Total Experience
                  </label>
                  <input
                    type="text"
                    value={formData.totalExperience}
                    onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                    className="w-full text-xs font-semibold bg-transparent mt-1 border-b border-[#D9CC86] focus:outline-none"
                  />
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EBE6DF]">
                  <label className="block text-[10px] font-bold text-[#765331] uppercase">
                    Teaching Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.teachingExperience}
                    onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                    className="w-full text-xs font-semibold bg-transparent mt-1 border-b border-[#D9CC86] focus:outline-none"
                  />
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EBE6DF]">
                  <label className="block text-[10px] font-bold text-[#765331] uppercase">
                    Research Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.researchExperience}
                    onChange={(e) => setFormData({ ...formData, researchExperience: e.target.value })}
                    className="w-full text-xs font-semibold bg-transparent mt-1 border-b border-[#D9CC86] focus:outline-none"
                  />
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EBE6DF]">
                  <label className="block text-[10px] font-bold text-[#765331] uppercase">
                    Industry Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.industryExperience}
                    onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })}
                    className="w-full text-xs font-semibold bg-transparent mt-1 border-b border-[#D9CC86] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    Current Organization / University
                  </label>
                  <input
                    type="text"
                    value={formData.currentOrganization}
                    onChange={(e) => setFormData({ ...formData, currentOrganization: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                    Current Designation / Cadre
                  </label>
                  <input
                    type="text"
                    value={formData.currentDesignation}
                    onChange={(e) => setFormData({ ...formData, currentDesignation: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions for Step 2 with PREVIOUS / BACK TO EDIT */}
            <div className="pt-4 border-t border-[#EBE6DF] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#D9CC86] bg-white hover:bg-[#FAF8F5] text-[#765331] font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous: Back to Edit Step 1</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
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
          <div
            className="p-5 sm:p-7 rounded-[14px] border border-[#D9CC86]/70 bg-white/80 shadow-[0_8px_25px_rgba(41,39,39,0.04)] space-y-6"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="border-b border-[#EBE6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D83232] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727]">
                  Step 3: Research Profile, Publications & Patents
                </h3>
              </div>
              <p className="text-xs text-[#765331] mt-1 ml-8">
                Record indexed research papers (SCI/Scopus), registered patents, funded grants, and academic honors.
              </p>
            </div>

            {/* Research Metrics Quad */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D9CC86]/50 text-center">
                <span className="text-[10px] font-bold text-[#765331] uppercase block">
                  Total Publications
                </span>
                <input
                  type="text"
                  value={formData.publicationsCount}
                  onChange={(e) => setFormData({ ...formData, publicationsCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#D83232] text-center w-full bg-transparent border-b border-[#D9CC86] focus:outline-none mt-1"
                />
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D9CC86]/50 text-center">
                <span className="text-[10px] font-bold text-[#765331] uppercase block">
                  SCI / Scopus Papers
                </span>
                <input
                  type="text"
                  value={formData.sciScopusCount}
                  onChange={(e) => setFormData({ ...formData, sciScopusCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#4A351F] text-center w-full bg-transparent border-b border-[#D9CC86] focus:outline-none mt-1"
                />
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D9CC86]/50 text-center">
                <span className="text-[10px] font-bold text-[#765331] uppercase block">
                  Patents (Filed/Granted)
                </span>
                <input
                  type="text"
                  value={formData.patentsCount}
                  onChange={(e) => setFormData({ ...formData, patentsCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#B69A62] text-center w-full bg-transparent border-b border-[#D9CC86] focus:outline-none mt-1"
                />
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#D9CC86]/50 text-center">
                <span className="text-[10px] font-bold text-[#765331] uppercase block">
                  Funded Projects
                </span>
                <input
                  type="text"
                  value={formData.projectsCount}
                  onChange={(e) => setFormData({ ...formData, projectsCount: e.target.value })}
                  className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#765331] text-center w-full bg-transparent border-b border-[#D9CC86] focus:outline-none mt-1"
                />
              </div>
            </div>

            {/* Key Publications List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4A351F] uppercase tracking-wider">
                  Representative Research Publications
                </span>
                <button
                  type="button"
                  onClick={handleAddPublication}
                  className="inline-flex items-center gap-1 text-xs text-[#D83232] font-bold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Publication</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {formData.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3.5 rounded-lg border border-[#D9CC86]/60 bg-[#FAF8F5]"
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-[#292727] leading-snug">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-[#5B403D] mt-0.5">
                      {pub.venue} • {pub.authors}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[#765331] mt-1 font-mono">
                      <span>DOI: {pub.doi}</span>
                      <span className="text-[#D83232] font-semibold">{pub.citations}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Memberships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Academic Honors, Fellowships & Awards
                </label>
                <textarea
                  rows={2}
                  value={formData.awards}
                  onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#D9CC86] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                  Professional Society Memberships (IEEE, ACM, etc.)
                </label>
                <textarea
                  rows={2}
                  value={formData.memberships}
                  onChange={(e) => setFormData({ ...formData, memberships: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#D9CC86] rounded-lg"
                />
              </div>
            </div>

            {/* Bottom Actions for Step 3 with PREVIOUS / BACK TO EDIT */}
            <div className="pt-4 border-t border-[#EBE6DF] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#D9CC86] bg-white hover:bg-[#FAF8F5] text-[#765331] font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous: Back to Edit Step 2</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>Continue to Step 4: CV Upload & Final Submit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: CV UPLOAD & FINAL SUBMISSION (AT LAST OPTION CV)  */}
        {/* ======================================================== */}
        {currentStep === 4 && (
          <form
            onSubmit={handleFinalSubmit}
            className="p-5 sm:p-7 rounded-[14px] border border-[#D9CC86]/70 bg-white/80 shadow-[0_8px_25px_rgba(41,39,39,0.04)] space-y-6"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="border-b border-[#EBE6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D83232] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif-tnu font-bold text-base sm:text-lg text-[#292727]">
                  Step 4: CV Upload & Final Academic Dossier Lodgement
                </h3>
              </div>
              <p className="text-xs text-[#765331] mt-1 ml-8">
                Attach your comprehensive, updated Curriculum Vitae and complete the statutory institutional declaration.
              </p>
            </div>

            {/* MANDATORY CV UPLOAD AREA (AT LAST OPTION CV) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#4A351F] uppercase tracking-wider">
                Upload Updated Curriculum Vitae (PDF / DOC / DOCX) <span className="text-[#D83232]">*</span>
              </label>

              {formData.cvUploaded ? (
                <div className="p-4 rounded-xl border-2 border-emerald-500/50 bg-emerald-50/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#292727]">
                          {formData.cvFileName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          Ready for Review
                        </span>
                      </div>
                      <p className="text-[11px] text-[#765331] mt-0.5">
                        File Size: {formData.cvFileSize} • Attached to Dossier
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-[#765331] hover:text-[#D83232] px-3 py-1.5 bg-white border border-[#D9CC86] rounded-lg shadow-2xs cursor-pointer"
                    >
                      Replace File
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCv}
                      className="text-[#D83232] hover:bg-[#D83232]/10 p-2 rounded-lg cursor-pointer"
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
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#D83232] bg-[#D83232]/5'
                      : 'border-[#D9CC86] hover:border-[#D83232] bg-[#FAF8F5]'
                  }`}
                >
                  <UploadCloud className="w-10 h-10 text-[#D83232] mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-[#292727]">
                    Click to browse or drag and drop your updated CV here
                  </h4>
                  <p className="text-xs text-[#765331] mt-1">
                    Accepts PDF, DOC, or DOCX formats up to 10 MB. Include complete academic records, research publications, and dissertation titles.
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
              <label className="block text-[11px] font-bold text-[#765331] uppercase tracking-wider mb-1">
                Statement of Teaching Philosophy / Research Intent (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly state your academic objectives, pedagogical style, and research goals at The Neotia University..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2 border border-[#D9CC86] rounded-lg"
              />
            </div>

            {/* Dossier Quick Recap Summary */}
            <div className="p-4 rounded-xl border border-[#D9CC86]/50 bg-[#FAF8F5] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A351F] block">
                Candidature Summary Review
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[#765331] text-[10px] block">Applicant:</span>
                  <span className="font-bold text-[#292727]">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[#765331] text-[10px] block">Highest Degree:</span>
                  <span className="font-bold text-[#292727]">{formData.highestQualification}</span>
                </div>
                <div>
                  <span className="text-[#765331] text-[10px] block">Experience:</span>
                  <span className="font-bold text-[#292727]">{formData.totalExperience}</span>
                </div>
                <div>
                  <span className="text-[#765331] text-[10px] block">CV Attached:</span>
                  <span className="font-bold text-emerald-700">
                    {formData.cvUploaded ? '✓ Verified' : 'Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mandatory Academic Declaration */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-3.5 rounded-lg border border-[#D9CC86]/60 bg-white cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.declarationAccepted}
                  onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-[#D9CC86] text-[#D83232] focus:ring-[#D83232] cursor-pointer"
                />
                <span className="text-xs text-[#5B403D] leading-relaxed">
                  I hereby certify that all information, degrees, publication claims, and credentials lodged in this faculty application dossier are authentic, correct, and verifiable from original records. I agree to abide by the statutory recruitment procedures of The Neotia University.
                </span>
              </label>
            </div>

            {/* Bottom Actions with PREVIOUS / BACK TO EDIT & FINAL SUBMIT */}
            <div className="pt-4 border-t border-[#EBE6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-[#D9CC86] bg-white hover:bg-[#FAF8F5] text-[#765331] font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous: Back to Edit Step 3</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#D83232] hover:bg-[#C62828] active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap"
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
