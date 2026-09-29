import React, { useState, useRef } from 'react';
import {
  Home,
  ChevronRight,
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
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import {
  ApplicationFormData,
  LanguageRow,
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

  // Step 2: Qualifications & Experience
  highestQualification: 'Ph.D. in Computer Science & Engineering',
  qualifications: [
    {
      id: 'q1',
      level: 'Doctorate (Ph.D.)',
      degree: 'Ph.D. in Computer Science & Engineering',
      specialization: 'Artificial Intelligence & Deep Learning',
      institution: 'Jadavpur University',
      yearOfPassing: '2016',
      gradeScore: 'Awarded with Distinction',
      isVerified: true,
    },
    {
      id: 'q2',
      level: 'Postgraduate (M.Tech)',
      degree: 'M.Tech in Information Technology',
      specialization: 'Distributed Intelligent Systems',
      institution: 'IIEST Shibpur',
      yearOfPassing: '2011',
      gradeScore: '9.24 CGPA (1st Class)',
      isVerified: true,
    },
    {
      id: 'q3',
      level: 'Undergraduate (B.Tech)',
      degree: 'B.Tech in Computer Science & Engineering',
      specialization: 'Computer Systems',
      institution: 'Kalyani Government Engineering College',
      yearOfPassing: '2008',
      gradeScore: '8.76 DGPA (1st Class)',
      isVerified: true,
    },
  ],
  totalExperience: '11 Years 4 Months',
  teachingExperience: '8 Years',
  researchExperience: '6 Years',
  industryExperience: '3 Years 4 Months',
  currentOrganization: 'Kolkata Institute of Advanced Computing',
  currentDesignation: 'Associate Professor',
  currentGrossSalary: '₹1,68,000 / month (7th CPC Level 13A)',
  expectedSalary: 'As per TNU 7th CPC Professorial Matrix',
  noticePeriod: '30 Days',
  primarySpecialization: 'Artificial Intelligence & Machine Learning',
  extracurricular: 'Faculty Advisor for University IEEE Student Branch',
  additionalNotes: '',
  employmentHistory: [
    {
      id: 'e1',
      designation: 'Associate Professor',
      organization: 'Kolkata Institute of Advanced Computing',
      period: '2019 – Present',
      description: 'Department of Computer Science & Engineering',
      focus: 'Teaching UG/PG classes and mentoring Ph.D. scholars in deep learning',
      isCurrent: true,
    },
  ],
  languages: [
    { id: 'l1', language: 'English', read: true, write: true, speak: true },
    { id: 'l2', language: 'Bengali', read: true, write: true, speak: true },
    { id: 'l3', language: 'Hindi', read: true, write: true, speak: true },
  ],

  // Step 3: Research & Publications
  publicationsCount: '24',
  sciScopusCount: '16',
  patentsCount: '3',
  projectsCount: '2',
  hIndex: '11',
  i10Index: '14',
  citationsTotal: '580',
  publications: [
    {
      id: 'p1',
      title: 'Adaptive Neural Routing in Edge-Assisted Cyber-Physical Systems',
      venue: 'IEEE Transactions on Industrial Informatics (Q1, IF: 12.3)',
      doi: '10.1109/TII.2023.3289114',
      authors: 'D. Chatterjee, A. Roy, S. K. Das',
      citations: '48 Citations',
    },
    {
      id: 'p2',
      title: 'Zero-Shot Multi-Modal Representation Learning for Biomedical Diagnostics',
      venue: 'Expert Systems with Applications (Elsevier, Q1)',
      doi: '10.1016/j.eswa.2022.118942',
      authors: 'D. Chatterjee, P. Sen',
      citations: '34 Citations',
    },
    {
      id: 'p3',
      title: 'Federated Optimization Protocols for Autonomous Robotics Fleet Navigation',
      venue: 'ACM Transactions on Cyber-Physical Systems',
      doi: '10.1145/3549821',
      authors: 'D. Chatterjee, V. Sengupta',
      citations: '21 Citations',
    },
  ],
  awards: 'DST Early Career Research Award (2019); Best Faculty Researcher Medal (2022)',
  memberships: 'Senior Member, IEEE (Computer Society); Life Fellow, CSI India',
  references: [
    {
      id: 'r1',
      name: 'Prof. (Dr.) Asim Kumar Mukherjee',
      designation: 'Professor & Former Dean',
      organization: 'Jadavpur University',
      relationship: 'Doctoral Thesis Advisor',
      email: 'a.mukherjee@cse.jdvu.ac.in',
      phone: '+91 94330 18290',
    },
    {
      id: 'r2',
      name: 'Dr. Sunetra Sen',
      designation: 'Principal Scientist',
      organization: 'CSIR-CGCRI, Kolkata',
      relationship: 'Collaborative DST Project Co-PI',
      email: 'sunetra.sen@cgcri.res.in',
      phone: '+91 33 2473 3496',
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
      // fallback
    }
    return initialFormData;
  });

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor';
  const currentArea = position?.area || 'Artificial Intelligence & Machine Learning';

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('tnu_faculty_application_draft', JSON.stringify(formData));
      showNotification('✓ Draft application dossier saved successfully.');
    } catch {
      showNotification('Failed to save draft to browser storage.');
    }
  };

  const handleAddQualification = () => {
    const newQ: Qualification = {
      id: 'q_' + Date.now(),
      level: 'Master’s / Postgraduate',
      degree: '',
      specialization: '',
      institution: '',
      yearOfPassing: '',
      gradeScore: '',
      isVerified: false,
    };
    setFormData({ ...formData, qualifications: [...formData.qualifications, newQ] });
  };

  const handleRemoveQualification = (id: string) => {
    if (formData.qualifications.length <= 1) {
      showNotification('At least one academic qualification is mandatory.');
      return;
    }
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((q) => q.id !== id),
    });
  };

  const handleAddPublication = () => {
    const newPub: PublicationItem = {
      id: 'p_' + Date.now(),
      title: 'Title of research publication',
      venue: 'Journal / Conference proceedings',
      doi: '10.xxxx/xxxx',
      authors: 'Candidate, et al.',
      citations: '0 Citations',
    };
    setFormData({ ...formData, publications: [...formData.publications, newPub] });
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploadError(null);
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setUploadError('Invalid format. Please upload a PDF, DOC, or DOCX document.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5 MB limit. Please compress your document.');
      return;
    }

    const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    setFormData({
      ...formData,
      cvUploaded: true,
      cvFileName: file.name,
      cvFileSize: sizeStr,
    });
    showNotification(`✓ File attached: ${file.name}`);
  };

  const handleRemoveCv = () => {
    setFormData({
      ...formData,
      cvUploaded: false,
      cvFileName: '',
      cvFileSize: '',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    showNotification('CV document detached.');
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile) {
        showNotification('Please fill in mandatory personal fields (First, Last, Email, Mobile).');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cvUploaded) {
      showNotification('Please upload your comprehensive Curriculum Vitae before submitting.');
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
    <div className="w-full bg-[#F7F9FC] min-h-[calc(100vh-64px)] pb-20 select-none page-enter">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#003B68] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-[13px] font-medium animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#19B87A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Context Bar */}
      <div className="w-full bg-white border-b border-[#D9E2EC] px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[14px] text-[#52708A]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="breadcrumb-link gap-1 cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#0057B8]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
          <button
            type="button"
            onClick={onNavigateSchools}
            className="breadcrumb-link cursor-pointer"
          >
            Schools
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
          {onNavigateVacancies && (
            <>
              <button
                type="button"
                onClick={onNavigateVacancies}
                className="breadcrumb-link cursor-pointer"
              >
                School Posts
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
            </>
          )}
          <button
            type="button"
            onClick={onNavigateRequirement}
            className="breadcrumb-link cursor-pointer"
          >
            Post Details
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D9E2EC]" />
          <span className="text-[#0057B8] font-bold">Application Dossier</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-6">
        {/* Post Applied Summary Banner */}
        <div className="bg-white rounded-[14px] p-4 sm:p-5 border border-[#D9E2EC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EAF4FF] border border-[#BFDDF5] flex items-center justify-center text-[#0057B8] shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">
                Candidature Lodgement For
              </span>
              <h2 className="text-lg sm:text-xl text-[#003B68] font-bold leading-tight">
                {currentCadre}
              </h2>
              <span className="text-[13px] text-[#52708A] font-medium">{currentArea}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn-secondary-portal inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#0057B8]" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4-STEP PROGRESS TRACKER (DESIGN RULE 11)                  */}
        {/* Completed: #0057B8, Current: #0066CC, Upcoming: #D9E2EC  */}
        {/* ======================================================== */}
        <div className="bg-white rounded-[14px] p-4 border border-[#D9E2EC] shadow-xs">
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
                      ? 'bg-[#EAF4FF] border border-[#0066CC]'
                      : isDone
                      ? 'bg-white border border-[#0057B8] hover:bg-[#F5F9FD] cursor-pointer'
                      : 'bg-[#F7F9FC] border border-[#D9E2EC] opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-1 ${
                      isCurrent
                        ? 'bg-[#0066CC] text-white shadow-xs'
                        : isDone
                        ? 'bg-[#0057B8] text-white'
                        : 'bg-[#D9E2EC] text-[#71869A]'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] sm:text-[12px] font-bold leading-tight ${
                      isCurrent ? 'text-[#003B68]' : isDone ? 'text-[#0057B8]' : 'text-[#71869A]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-[#71869A] font-medium hidden sm:inline">
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
          <div className="bg-white p-5 sm:p-7 rounded-[14px] border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold">
                  Step 1: Personal & Contact Information
                </h3>
              </div>
              <p className="text-[14px] text-[#52708A] mt-1 ml-8 font-normal leading-relaxed">
                Provide applicant identity, primary academic email, telephone, and residential communication address.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  First Name <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Last Name <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Date of Birth <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Gender <span className="text-[#D64545]">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Nationality <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Academic / Work Email <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Mobile Number (with Country Code) <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Current Residential Address <span className="text-[#D64545]">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#52708A] uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="portal-input w-full text-sm px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#52708A] uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="portal-input w-full text-sm px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#52708A] uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="portal-input w-full text-sm px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#52708A] uppercase tracking-wider mb-1.5">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="portal-input w-full text-sm px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary-portal inline-flex items-center gap-2 px-6 py-2.5 text-sm cursor-pointer"
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
          <div className="bg-white p-5 sm:p-7 rounded-[14px] border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold">
                  Step 2: Educational Qualifications & Experience
                </h3>
              </div>
              <p className="text-[14px] text-[#52708A] mt-1 ml-8 font-normal leading-relaxed">
                Provide academic credentials, collegiate teaching/research experience, and current organizational affiliation.
              </p>
            </div>

            {/* Table of Qualifications (Rule 13: Tables) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider">
                  Academic Credentials (Ph.D., Master's, Bachelor's)
                </span>
                <button
                  type="button"
                  onClick={handleAddQualification}
                  className="inline-flex items-center gap-1 text-[13px] text-[#0057B8] font-semibold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree / Diploma</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.qualifications.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] relative flex flex-col sm:flex-row gap-3 items-start justify-between"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                      <div>
                        <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                          Degree Level
                        </label>
                        <input
                          type="text"
                          value={q.level}
                          onChange={(e) => {
                            const updated = [...formData.qualifications];
                            updated[idx].level = e.target.value;
                            setFormData({ ...formData, qualifications: updated });
                          }}
                          className="portal-input w-full text-xs px-3 py-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                          Degree / Discipline
                        </label>
                        <input
                          type="text"
                          value={q.degree}
                          onChange={(e) => {
                            const updated = [...formData.qualifications];
                            updated[idx].degree = e.target.value;
                            setFormData({ ...formData, qualifications: updated });
                          }}
                          className="portal-input w-full text-xs px-3 py-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                          University / Institution
                        </label>
                        <input
                          type="text"
                          value={q.institution}
                          onChange={(e) => {
                            const updated = [...formData.qualifications];
                            updated[idx].institution = e.target.value;
                            setFormData({ ...formData, qualifications: updated });
                          }}
                          className="portal-input w-full text-xs px-3 py-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                          Specialization Area
                        </label>
                        <input
                          type="text"
                          value={q.specialization}
                          onChange={(e) => {
                            const updated = [...formData.qualifications];
                            updated[idx].specialization = e.target.value;
                            setFormData({ ...formData, qualifications: updated });
                          }}
                          className="portal-input w-full text-xs px-3 py-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                          Passing Year
                        </label>
                        <input
                          type="text"
                          value={q.yearOfPassing}
                          onChange={(e) => {
                            const updated = [...formData.qualifications];
                            updated[idx].yearOfPassing = e.target.value;
                            setFormData({ ...formData, qualifications: updated });
                          }}
                          className="portal-input w-full text-xs px-3 py-1.5"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider mb-1">
                          CGPA / Marks %
                        </label>
                        <input
                          type="text"
                          value={q.gradeScore}
                          onChange={(e) => {
                            const updated = [...formData.qualifications];
                            updated[idx].gradeScore = e.target.value;
                            setFormData({ ...formData, qualifications: updated });
                          }}
                          className="portal-input w-full text-xs px-3 py-1.5"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveQualification(q.id)}
                      className="p-1.5 rounded-lg text-[#71869A] hover:text-[#D64545] hover:bg-white transition-colors cursor-pointer shrink-0 mt-1"
                      title="Remove qualification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Overview */}
            <div className="pt-2 border-t border-[#D9E2EC] space-y-4">
              <span className="text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider block">
                Collegiate & Industrial Experience
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F5F9FD] p-3 rounded-xl border border-[#D9E2EC]">
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider">
                    Total Experience
                  </label>
                  <input
                    type="text"
                    value={formData.totalExperience}
                    onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                    className="w-full text-sm font-semibold bg-transparent mt-1 border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] text-[#123B5D]"
                  />
                </div>

                <div className="bg-[#F5F9FD] p-3 rounded-xl border border-[#D9E2EC]">
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider">
                    Teaching Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.teachingExperience}
                    onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                    className="w-full text-sm font-semibold bg-transparent mt-1 border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] text-[#123B5D]"
                  />
                </div>

                <div className="bg-[#F5F9FD] p-3 rounded-xl border border-[#D9E2EC]">
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider">
                    Research Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.researchExperience}
                    onChange={(e) => setFormData({ ...formData, researchExperience: e.target.value })}
                    className="w-full text-sm font-semibold bg-transparent mt-1 border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] text-[#123B5D]"
                  />
                </div>

                <div className="bg-[#F5F9FD] p-3 rounded-xl border border-[#D9E2EC]">
                  <label className="block text-[11px] font-bold text-[#71869A] uppercase tracking-wider">
                    Industry Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.industryExperience}
                    onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })}
                    className="w-full text-sm font-semibold bg-transparent mt-1 border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] text-[#123B5D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                    Current Organization / University
                  </label>
                  <input
                    type="text"
                    value={formData.currentOrganization}
                    onChange={(e) => setFormData({ ...formData, currentOrganization: e.target.value })}
                    className="portal-input w-full text-sm px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                    Current Designation / Cadre
                  </label>
                  <input
                    type="text"
                    value={formData.currentDesignation}
                    onChange={(e) => setFormData({ ...formData, currentDesignation: e.target.value })}
                    className="portal-input w-full text-sm px-3.5 py-2.5"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions for Step 2 */}
            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary-portal inline-flex items-center gap-1.5 px-4 py-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Step 1</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary-portal inline-flex items-center gap-2 px-6 py-2.5 text-sm cursor-pointer"
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
          <div className="bg-white p-5 sm:p-7 rounded-[14px] border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold">
                  Step 3: Research Profile, Publications & Patents
                </h3>
              </div>
              <p className="text-[14px] text-[#52708A] mt-1 ml-8 font-normal leading-relaxed">
                Record indexed research papers (SCI/Scopus), registered patents, funded grants, and academic honors.
              </p>
            </div>

            {/* Research Metrics Quad */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F5F9FD] p-3.5 rounded-xl border border-[#D9E2EC] text-center">
                <span className="text-[11px] font-bold text-[#71869A] uppercase tracking-wider block">
                  Total Publications
                </span>
                <input
                  type="text"
                  value={formData.publicationsCount}
                  onChange={(e) => setFormData({ ...formData, publicationsCount: e.target.value })}
                  className="text-xl sm:text-2xl font-bold text-[#003B68] text-center w-full bg-transparent border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] mt-1"
                />
              </div>

              <div className="bg-[#F5F9FD] p-3.5 rounded-xl border border-[#D9E2EC] text-center">
                <span className="text-[11px] font-bold text-[#71869A] uppercase tracking-wider block">
                  SCI / Scopus Papers
                </span>
                <input
                  type="text"
                  value={formData.sciScopusCount}
                  onChange={(e) => setFormData({ ...formData, sciScopusCount: e.target.value })}
                  className="text-xl sm:text-2xl font-bold text-[#0057B8] text-center w-full bg-transparent border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] mt-1"
                />
              </div>

              <div className="bg-[#F5F9FD] p-3.5 rounded-xl border border-[#D9E2EC] text-center">
                <span className="text-[11px] font-bold text-[#71869A] uppercase tracking-wider block">
                  Patents (Filed/Granted)
                </span>
                <input
                  type="text"
                  value={formData.patentsCount}
                  onChange={(e) => setFormData({ ...formData, patentsCount: e.target.value })}
                  className="text-xl sm:text-2xl font-bold text-[#0066CC] text-center w-full bg-transparent border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] mt-1"
                />
              </div>

              <div className="bg-[#F5F9FD] p-3.5 rounded-xl border border-[#D9E2EC] text-center">
                <span className="text-[11px] font-bold text-[#71869A] uppercase tracking-wider block">
                  Funded Projects
                </span>
                <input
                  type="text"
                  value={formData.projectsCount}
                  onChange={(e) => setFormData({ ...formData, projectsCount: e.target.value })}
                  className="text-xl sm:text-2xl font-bold text-[#16865F] text-center w-full bg-transparent border-b border-[#D9E2EC] focus:outline-none focus:border-[#0057B8] mt-1"
                />
              </div>
            </div>

            {/* Key Publications List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider">
                  Representative Research Publications
                </span>
                <button
                  type="button"
                  onClick={handleAddPublication}
                  className="inline-flex items-center gap-1 text-[13px] text-[#0057B8] font-semibold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Publication</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {formData.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3.5 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC]"
                  >
                    <h4 className="font-semibold text-sm text-[#003B68] leading-snug">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-[#52708A] mt-0.5 font-normal">
                      {pub.venue} • {pub.authors}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#71869A] mt-1 font-mono">
                      <span>DOI: {pub.doi}</span>
                      <span className="text-[#0057B8] font-semibold">{pub.citations}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Memberships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Academic Honors, Fellowships & Awards
                </label>
                <textarea
                  rows={2}
                  value={formData.awards}
                  onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                  Professional Society Memberships (IEEE, ACM, etc.)
                </label>
                <textarea
                  rows={2}
                  value={formData.memberships}
                  onChange={(e) => setFormData({ ...formData, memberships: e.target.value })}
                  className="portal-input w-full text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            {/* Bottom Actions for Step 3 */}
            <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary-portal inline-flex items-center gap-1.5 px-4 py-2 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Step 2</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary-portal inline-flex items-center gap-2 px-6 py-2.5 text-sm cursor-pointer"
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
            className="bg-white p-5 sm:p-7 rounded-[14px] border border-[#D9E2EC] shadow-xs space-y-6"
          >
            <div className="border-b border-[#D9E2EC] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0057B8] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base sm:text-xl text-[#003B68] font-bold">
                  Step 4: CV Upload & Final Academic Dossier Lodgement
                </h3>
              </div>
              <p className="text-[14px] text-[#52708A] mt-1 ml-8 font-normal leading-relaxed">
                Attach your comprehensive, updated Curriculum Vitae and complete statutory institutional declaration.
              </p>
            </div>

            {/* CV UPLOAD AREA (Rule 8 & Rule 12) */}
            <div className="space-y-3">
              <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider">
                Upload your CV <span className="text-[#D64545]">*</span>
              </label>

              {uploadError && (
                <div className="flex items-center gap-2 text-xs text-[#D64545] bg-[#FCEAEA] border border-[#D64545]/25 p-3 rounded-lg font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {formData.cvUploaded ? (
                <div className="p-4 rounded-xl border border-[#19B87A]/40 bg-[#E8F8F2] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#16865F] flex items-center justify-center shrink-0 border border-emerald-200">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-[#003B68] truncate">
                          {formData.cvFileName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16865F] bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 tracking-wide uppercase">
                          <Check className="w-3.5 h-3.5" />
                          Ready for Review
                        </span>
                      </div>
                      <p className="text-xs text-[#52708A] mt-0.5 font-medium">
                        File Size: {formData.cvFileSize} • Attached to Dossier
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-[#52708A] hover:text-[#0057B8] px-3.5 py-1.5 bg-white border border-[#D9E2EC] rounded-lg shadow-2xs cursor-pointer hover:bg-[#F5F9FD] transition-colors"
                    >
                      Replace File
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCv}
                      className="text-[#71869A] hover:text-[#D64545] p-2 rounded-lg cursor-pointer hover:bg-white transition-colors"
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
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-[#0057B8] bg-[#EAF4FF] scale-[1.01]'
                      : 'border-[#D9E2EC] hover:border-[#0057B8] bg-[#F7F9FC]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white text-[#0057B8] mx-auto mb-3 flex items-center justify-center shadow-xs border border-[#D9E2EC]">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-[#003B68]">
                    Upload your CV
                  </h4>
                  <p className="text-xs text-[#71869A] mt-1 font-medium">
                    PDF, DOC or DOCX • Maximum 5 MB
                  </p>
                  <p className="text-xs text-[#52708A] mt-2 max-w-sm mx-auto font-normal">
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
              <label className="block text-[13px] font-semibold text-[#123B5D] uppercase tracking-wider mb-1.5">
                Statement of Teaching Philosophy / Research Intent (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly state your academic objectives, pedagogical style, and research goals at The Neotia University..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="portal-input w-full text-sm px-3.5 py-2.5"
              />
            </div>

            {/* Dossier Quick Recap Summary */}
            <div className="p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8] block">
                Candidature Summary Review
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[#71869A] text-[11px] font-medium block">Applicant:</span>
                  <span className="font-semibold text-[#123B5D]">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[#71869A] text-[11px] font-medium block">Highest Degree:</span>
                  <span className="font-semibold text-[#123B5D]">{formData.highestQualification}</span>
                </div>
                <div>
                  <span className="text-[#71869A] text-[11px] font-medium block">Experience:</span>
                  <span className="font-semibold text-[#123B5D]">{formData.totalExperience}</span>
                </div>
                <div>
                  <span className="text-[#71869A] text-[11px] font-medium block">CV Attached:</span>
                  <span className="font-bold text-[#16865F]">
                    {formData.cvUploaded ? '✓ Verified' : 'Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mandatory Academic Declaration */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  required
                  checked={formData.declarationAccepted}
                  onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-[#D9E2EC] text-[#0057B8] focus:ring-[#0057B8] cursor-pointer"
                />
                <span className="text-xs sm:text-[13px] text-[#52708A] leading-relaxed font-normal">
                  I hereby certify that all information, degrees, publication claims, and credentials lodged in this faculty application dossier are authentic, correct, and verifiable from original records. I agree to abide by the statutory recruitment procedures of The Neotia University.
                </span>
              </label>
            </div>

            {/* Bottom Actions with PREVIOUS & FINAL SUBMIT */}
            <div className="pt-4 border-t border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto btn-secondary-portal inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Step 3</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto btn-primary-portal inline-flex items-center justify-center gap-2 px-8 py-3 text-sm cursor-pointer whitespace-nowrap"
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
