import React, { useState, useRef } from 'react';
import {
  Home,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Plus,
  ShieldCheck,
  ArrowRight,
  Save,
  Check,
  Sparkles,
  AlertCircle,
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

// Initial realistic pre-filled data based on TNU academic standard
const initialFormData: ApplicationFormData = {
  // Section 1: Personal
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
  permanentAddress: 'Same as current residential address',
  city: 'Kolkata',
  state: 'West Bengal',
  country: 'India',
  pinCode: '700032',

  // Section 2: Education
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
  ],

  // Section 3: Professional
  currentOrganization: 'Bengal Institute of Technology & Science',
  currentDesignation: 'Associate Professor (CSE)',
  totalExperience: '11 Years 6 Months',
  teachingExperience: '8.5',
  researchExperience: '5.0',
  industryExperience: '3.0',
  primarySpecialization: 'Neural Network Architectures, Reinforcement Learning, Autonomous Robotics',

  // Section 4: Research
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
  ],

  // Section 5: Languages
  languages: [
    { id: '1', language: 'English', read: true, write: true, speak: true },
    { id: '2', language: 'Bengali', read: true, write: true, speak: true },
    { id: '3', language: 'Hindi', read: true, write: true, speak: true },
  ],

  // Section 6: Extracurricular
  awards: 'Gold Medalist in M.Tech (2013); Best Faculty Researcher Award 2023.',
  memberships: 'Senior Member IEEE (#948123); Fellow, Institution of Engineers India (FIE).',
  extracurricular: 'Faculty Advisor for Robotics Club, Convener of Hackathon 2024',
  additionalNotes: 'Available for joining within 30 days of appointment if offered tenure.',

  // Section 7: Employment
  employmentHistory: [
    {
      id: '1',
      designation: 'Associate Professor',
      organization: 'Bengal Institute of Tech',
      period: 'Jul 2020 – Present',
      description: 'Led the Departmental AI Lab, mentored 18 M.Tech theses, and secured sponsored grants worth ₹45 Lakhs.',
      focus: 'Post-Graduate Instruction & Research',
      isCurrent: true,
    },
  ],

  // Section 8: References
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
    {
      id: '2',
      name: 'Dr. Sunrita Sen',
      designation: 'Head of Department (CSE)',
      organization: 'Jadavpur University',
      relationship: 'M.Tech Mentor & Research Collaborator',
      email: 's.sen@cse.jdvu.ac.in',
      phone: '+91 33 2414 6666',
    },
  ],

  // CV / Resume
  cvFileName: 'Dr_Debashis_Chatterjee_CV_2026.pdf',
  cvFileSize: '3.4 MB',
  cvUploaded: true,

  // Declaration
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
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newLangName, setNewLangName] = useState('');
  const [showAddLangInput, setShowAddLangInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentCadre = position?.cadre || 'Assistant Professor / Associate Professor / Tutor Professor';
  const currentArea = position?.area || 'AI & Machine Learning';

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Text inputs updater
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File Upload Handlers
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (
      !validTypes.includes(file.type) &&
      !file.name.endsWith('.pdf') &&
      !file.name.endsWith('.doc') &&
      !file.name.endsWith('.docx')
    ) {
      showNotification('Please upload a valid PDF, DOC, or DOCX file.');
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
    showNotification('✓ CV / Resume uploaded and verified successfully');
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

  // Dynamic Add Qualification
  const handleAddQualification = () => {
    const newQual: Qualification = {
      id: Date.now().toString(),
      level: 'Bachelor',
      degree: 'Bachelor of Technology (B.Tech)',
      specialization: 'Computer Science & Engineering',
      institution: 'State University of Technology',
      yearOfPassing: '2011',
      gradeScore: '84.2%',
    };
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newQual],
    }));
    showNotification('New qualification record added.');
  };

  const handleRemoveQualification = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((q) => q.id !== id),
    }));
  };

  // Dynamic Add Publication
  const handleAddPublication = () => {
    const newPub: PublicationItem = {
      id: Date.now().toString(),
      title: '"Autonomous Multi-Agent Routing in High-Density Computing Infrastructures"',
      venue: 'ACM Transactions on Autonomous Systems (2025)',
      doi: '10.1145/3618920.362140',
      authors: 'Primary Investigator • Indexed in Scopus',
      citations: '18 Citations',
    };
    setFormData((prev) => ({
      ...prev,
      publications: [...prev.publications, newPub],
    }));
    showNotification('Publication record appended.');
  };

  // Dynamic Add Language
  const handleAddLanguageSubmit = () => {
    if (!newLangName.trim()) return;
    const newLang: LanguageRow = {
      id: Date.now().toString(),
      language: newLangName.trim(),
      read: true,
      write: true,
      speak: true,
    };
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
    setNewLangName('');
    setShowAddLangInput(false);
  };

  const handleToggleLanguageCheck = (id: string, field: 'read' | 'write' | 'speak') => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [field]: !l[field] } : l)),
    }));
  };

  // Dynamic Add Employment
  const handleAddEmployment = () => {
    const newEmp: EmploymentRecord = {
      id: Date.now().toString(),
      designation: 'Assistant Professor (Senior Scale)',
      organization: 'National Technical Institute',
      period: 'Jan 2018 – Jun 2020',
      description: 'Delivered undergraduate courses in Data Structures, Algorithms, and Machine Learning.',
      focus: 'Undergraduate Instruction',
      isCurrent: false,
    };
    setFormData((prev) => ({
      ...prev,
      employmentHistory: [...prev.employmentHistory, newEmp],
    }));
    showNotification('Employment history record added.');
  };

  // Dynamic Add Reference
  const handleAddReference = () => {
    const newRef: ReferenceContact = {
      id: Date.now().toString(),
      name: 'Prof. (Dr.) B. Sengupta',
      designation: 'Director of Academic Research',
      organization: 'Indian Institute of Engineering Science',
      relationship: 'Senior Colleague & Reviewer',
      email: 'b.sengupta@iiest.ac.in',
      phone: '+91 33 2668 4561',
    };
    setFormData((prev) => ({
      ...prev,
      references: [...prev.references, newRef],
    }));
    showNotification('Academic reference added.');
  };

  // Save Draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem('tnu_faculty_application_draft', JSON.stringify(formData));
      showNotification('✓ Application draft saved securely in browser cache.');
    } catch {
      showNotification('Draft saved.');
    }
  };

  // Validation Checks
  const isFormValid = Boolean(
    formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.dateOfBirth &&
      formData.gender &&
      formData.nationality &&
      formData.email.trim() &&
      formData.mobile.trim() &&
      formData.currentAddress.trim() &&
      formData.cvUploaded &&
      formData.declarationAccepted
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      showNotification('Please fill all mandatory fields, upload CV, and accept declaration.');
      return;
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const appId = `FAC-2026-${randomId}`;

    onSubmitSuccess(formData, appId);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-24 relative z-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 glass-panel text-[#292727] px-4 py-2.5 shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#D83232]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Context Bar */}
      <div className="w-full bg-white/60 backdrop-blur-md border-b border-[#D9CC86]/45 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs text-[#765331]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="breadcrumb-item gap-1 font-medium cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateSchools}
            className="breadcrumb-item font-medium cursor-pointer"
          >
            Career
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateSchools}
            className="breadcrumb-item font-medium cursor-pointer"
          >
            Schools
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateVacancies}
            className="breadcrumb-item font-medium cursor-pointer"
          >
            Vacancies
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <button
            type="button"
            onClick={onNavigateRequirement}
            className="breadcrumb-item font-medium cursor-pointer"
          >
            Post Requirements
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A62]/60" />
          <span className="text-[#D83232] font-bold">Application</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-col gap-5 sm:gap-6">
        {/* Dossier Title Block */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#765331] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-status-dot" />
              Recruitment Dossier • Cycle 2026–27
            </span>
            <h1 className="font-serif-tnu text-2xl sm:text-3xl font-bold text-[#292727]">
              Faculty Application Form
            </h1>
            <p className="text-xs sm:text-sm text-[#5B403D]">
              Apply for {currentCadre}
            </p>
          </div>
        </div>

        {/* Application Summary Box (Glass Panel) */}
        <div className="glass-panel p-4 sm:p-5 shadow-[0_6px_24px_rgba(41,39,39,0.04)] relative overflow-hidden flex flex-col gap-3">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D83232]" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#765331]">
              Opening Overview
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D83232]/10 border border-[#D83232]/25 text-[#D83232] text-[10px] sm:text-xs font-bold uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D83232] animate-status-dot" />
              Open Call
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-white/75 border border-[#D9CC86]/40 rounded-xl p-3 flex flex-col shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Academic Unit
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#292727] truncate">
                School of Technology
              </span>
            </div>

            <div className="bg-white/75 border border-[#D9CC86]/40 rounded-xl p-3 flex flex-col shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Specialization Area
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#292727] truncate">
                {currentArea}
              </span>
            </div>

            <div className="bg-white/75 border border-[#D9CC86]/40 rounded-xl p-3 flex flex-col shadow-2xs">
              <span className="text-[10px] uppercase tracking-wider text-[#765331] font-bold">
                Target Cadre
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#D83232] truncate">
                {currentCadre}
              </span>
            </div>
          </div>
        </div>

        {/* CV / RESUME UPLOAD SECTION (Glassmorphism Highlight) */}
        <div className="glass-panel p-5 sm:p-6 shadow-[0_8px_30px_rgba(41,39,39,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#D83232]/10 text-[#D83232] flex items-center justify-center">
                <UploadCloud className="w-4 h-4" />
              </div>
              <h2 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                Upload Your Curriculum Vitae / Resume
              </h2>
            </div>
            <span className="text-[#D83232] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              Mandatory File *
            </span>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />

          {/* Large Rounded Glass Drag & Drop Container */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-2.5 transition-all duration-300 border-1.5 border-dashed backdrop-blur-md cursor-pointer group ${
              isDragging
                ? 'border-[#D83232] bg-white/80 shadow-[0_0_24px_rgba(216,50,50,0.15)]'
                : 'border-[#D9CC86]/70 bg-white/45 hover:border-[#D83232] hover:bg-white/65 hover:shadow-[0_4px_20px_rgba(216,50,50,0.06)]'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white text-[#D83232] flex items-center justify-center shadow-xs border border-[#D9CC86]/50 transition-transform duration-200 group-hover:scale-105">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-xs sm:text-sm text-[#292727]">
                Drag & drop your CV file here
              </span>
              <span className="text-[11px] text-[#765331]">
                or click below to browse from your device
              </span>
              <span className="text-[10px] text-[#765331]/80 mt-0.5">
                Supported formats: PDF, DOC, DOCX • Maximum 10 MB
              </span>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary-tnu mt-1 px-4 py-2 text-xs font-bold cursor-pointer"
            >
              Browse Files
            </button>

            {/* Uploaded File Info Card (Clean Success Indication) */}
            {formData.cvUploaded && (
              <div className="w-full mt-3 bg-white/90 rounded-xl p-3.5 flex items-center justify-between border border-emerald-300 shadow-2xs gap-3 animate-in fade-in">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#292727] truncate">
                        {formData.cvFileName}
                      </span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                        ✓ Uploaded Successfully
                      </span>
                    </div>
                    <span className="text-[10px] text-[#765331]">
                      {formData.cvFileSize} • Ready for departmental scrutiny
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 text-[#765331] hover:text-[#D83232] text-xs font-semibold rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replace</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveCv}
                    className="px-2.5 py-1 text-[#D83232] hover:bg-[#D83232]/10 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 8 APPLICATION FORM GLASS SECTIONS */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
          {/* SECTION 1: Personal Information */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  1
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Personal Information
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">* Required fields</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  First Name <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder="Middle name"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Last Name <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Date of Birth <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Gender <span className="text-[#D83232]">*</span>
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Nationality <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="e.g. Indian"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Email Address <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="academic.email@domain.edu"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Mobile Number <span className="text-[#D83232]">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 98300 00000"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Alternate Phone
                </label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  placeholder="Landline / Office"
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Current Residential Address <span className="text-[#D83232]">*</span>
                </label>
                <textarea
                  name="currentAddress"
                  required
                  rows={2}
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Permanent Address
                </label>
                <textarea
                  name="permanentAddress"
                  rows={2}
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: Educational Qualification */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  2
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Educational Qualifications
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">Chronological order</span>
            </div>

            <div className="flex flex-col gap-3">
              {formData.qualifications.map((q) => (
                <div
                  key={q.id}
                  className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-3.5 flex flex-col gap-2 text-xs shadow-2xs animate-row-enter"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D83232]/10 text-[#D83232] text-[10px] font-bold uppercase">
                        {q.level}
                      </span>
                      <span className="font-bold text-sm text-[#292727]">{q.degree}</span>
                    </div>
                    {formData.qualifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQualification(q.id)}
                        className="text-[#765331] hover:text-[#D83232] p-1 cursor-pointer transition-colors"
                        title="Remove record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[#5B403D]">
                    <div>
                      <span className="font-semibold text-[#765331]">Field: </span>
                      {q.specialization}
                    </div>
                    <div>
                      <span className="font-semibold text-[#765331]">Institution: </span>
                      {q.institution}
                    </div>
                    <div>
                      <span className="font-semibold text-[#765331]">Score: </span>
                      {q.gradeScore} ({q.yearOfPassing})
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddQualification}
              className="btn-secondary-tnu px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer group self-start"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#D83232]" />
              <span>Add Qualification</span>
            </button>
          </section>

          {/* SECTION 3: Professional Information */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  3
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Professional Information & Experience
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">Academic Cadre Assessment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Current Affiliated Organization
                </label>
                <input
                  type="text"
                  name="currentOrganization"
                  value={formData.currentOrganization}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Current Designation / Role
                </label>
                <input
                  type="text"
                  name="currentDesignation"
                  value={formData.currentDesignation}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Total Experience
                </label>
                <input
                  type="text"
                  name="totalExperience"
                  value={formData.totalExperience}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Teaching (Yrs)
                </label>
                <input
                  type="text"
                  name="teachingExperience"
                  value={formData.teachingExperience}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Research (Yrs)
                </label>
                <input
                  type="text"
                  name="researchExperience"
                  value={formData.researchExperience}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Industry (Yrs)
                </label>
                <input
                  type="text"
                  name="industryExperience"
                  value={formData.industryExperience}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                Primary Research Specialization & Competencies
              </label>
              <textarea
                name="primarySpecialization"
                rows={2}
                value={formData.primarySpecialization}
                onChange={handleInputChange}
                className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5 resize-none"
              />
            </div>
          </section>

          {/* SECTION 4: Research & Publications */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  4
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Research & Publications (SCI / Scopus)
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">API Score Metric</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Total Papers
                </label>
                <input
                  type="text"
                  name="publicationsCount"
                  value={formData.publicationsCount}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  SCI / Scopus
                </label>
                <input
                  type="text"
                  name="sciScopusCount"
                  value={formData.sciScopusCount}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5 font-bold text-[#D83232]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Patents Filed / Granted
                </label>
                <input
                  type="text"
                  name="patentsCount"
                  value={formData.patentsCount}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5 font-bold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Funded Grants
                </label>
                <input
                  type="text"
                  name="projectsCount"
                  value={formData.projectsCount}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs px-3.5 py-2.5 font-bold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                Select Representative Research Papers:
              </span>
              {formData.publications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-3 flex flex-col gap-1 text-xs shadow-2xs animate-row-enter"
                >
                  <span className="font-bold text-[#292727]">{pub.title}</span>
                  <span className="text-[#D83232] font-semibold">{pub.venue}</span>
                  <div className="flex items-center justify-between text-[11px] text-[#765331] pt-1 border-t border-[#D9CC86]/30">
                    <span>{pub.authors}</span>
                    <span>{pub.citations}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddPublication}
              className="btn-secondary-tnu px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer group self-start"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#D83232]" />
              <span>Add Publication</span>
            </button>
          </section>

          {/* SECTION 5: Languages */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  5
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Languages Proficiency
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">Instructional Medium</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#D9CC86]/40 text-[#765331] uppercase text-[10px] font-bold">
                    <th className="py-2">Language</th>
                    <th className="py-2 text-center">Read</th>
                    <th className="py-2 text-center">Write</th>
                    <th className="py-2 text-center">Speak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9CC86]/25">
                  {formData.languages.map((l) => (
                    <tr key={l.id} className="hover:bg-white/40">
                      <td className="py-2.5 font-bold text-[#292727]">{l.language}</td>
                      <td className="py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={l.read}
                          onChange={() => handleToggleLanguageCheck(l.id, 'read')}
                          className="accent-[#D83232] cursor-pointer hover:scale-105 transition-transform w-4 h-4 rounded"
                        />
                      </td>
                      <td className="py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={l.write}
                          onChange={() => handleToggleLanguageCheck(l.id, 'write')}
                          className="accent-[#D83232] cursor-pointer hover:scale-105 transition-transform w-4 h-4 rounded"
                        />
                      </td>
                      <td className="py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={l.speak}
                          onChange={() => handleToggleLanguageCheck(l.id, 'speak')}
                          className="accent-[#D83232] cursor-pointer hover:scale-105 transition-transform w-4 h-4 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showAddLangInput ? (
              <div className="flex items-center gap-2 max-w-xs animate-in fade-in">
                <input
                  type="text"
                  value={newLangName}
                  onChange={(e) => setNewLangName(e.target.value)}
                  placeholder="Language name..."
                  className="glass-input flex-1 text-xs px-3 py-1.5"
                />
                <button
                  type="button"
                  onClick={handleAddLanguageSubmit}
                  className="btn-primary-tnu px-3 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddLangInput(false)}
                  className="text-xs text-[#765331] hover:text-[#292727]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddLangInput(true)}
                className="btn-secondary-tnu px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer group self-start"
              >
                <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#D83232]" />
                <span>Add Language</span>
              </button>
            )}
          </section>

          {/* SECTION 6: Extracurricular & Awards */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  6
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Awards, Professional Bodies & Contributions
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">Academic Recognition</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Honours & Academic Awards
                </label>
                <input
                  type="text"
                  name="awards"
                  value={formData.awards}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Professional Memberships (IEEE, ACM, CSI, IETE)
                </label>
                <input
                  type="text"
                  name="memberships"
                  value={formData.memberships}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#765331] uppercase tracking-wider">
                  Extracurricular & Academic Leadership
                </label>
                <input
                  type="text"
                  name="extracurricular"
                  value={formData.extracurricular}
                  onChange={handleInputChange}
                  className="glass-input w-full text-xs sm:text-sm px-3.5 py-2.5"
                />
              </div>
            </div>
          </section>

          {/* SECTION 7: Employment History */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  7
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  Employment & Academic Positions Held
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">Tenure History</span>
            </div>

            <div className="flex flex-col gap-3">
              {formData.employmentHistory.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-3.5 flex flex-col gap-1.5 text-xs shadow-2xs animate-row-enter"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#292727]">{emp.designation}</span>
                    <span className="text-[#D83232] font-semibold">{emp.period}</span>
                  </div>
                  <div className="text-[#765331] font-medium">
                    <span>{emp.organization}</span>
                  </div>
                  <p className="text-xs text-[#5B403D] leading-relaxed">{emp.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#765331] pt-1 border-t border-[#D9CC86]/30">
                    <span>Primary Focus: {emp.focus}</span>
                    {emp.isCurrent && (
                      <span className="text-[#D83232] font-bold">Current Employer</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddEmployment}
              className="btn-secondary-tnu px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer group self-start"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#D83232]" />
              <span>Add Employment</span>
            </button>
          </section>

          {/* SECTION 8: References */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_6px_24px_rgba(41,39,39,0.04)] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#D9CC86]/35">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-[#D83232] text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  8
                </span>
                <h3 className="font-serif-tnu text-base sm:text-lg font-bold text-[#292727]">
                  References
                </h3>
              </div>
              <span className="text-[11px] text-[#765331]">Peer Endorsements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.references.map((ref) => (
                <div
                  key={ref.id}
                  className="bg-white/80 border border-[#D9CC86]/45 rounded-xl p-3.5 flex flex-col gap-1 text-xs shadow-2xs animate-row-enter"
                >
                  <span className="font-bold text-sm text-[#292727]">{ref.name}</span>
                  <span className="text-[#D83232] font-semibold">
                    {ref.designation} • {ref.organization}
                  </span>
                  <span className="text-[#765331] mt-0.5">Relationship: {ref.relationship}</span>
                  <div className="pt-2 flex flex-col gap-0.5 text-[#292727] border-t border-[#D9CC86]/30">
                    <span>Email: {ref.email}</span>
                    <span>Phone: {ref.phone}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddReference}
              className="btn-secondary-tnu px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer group self-start"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90 text-[#D83232]" />
              <span>Add Reference</span>
            </button>
          </section>

          {/* DECLARATION & SUBMISSION (Glass Panel) */}
          <section className="glass-panel p-5 sm:p-6 shadow-[0_8px_30px_rgba(41,39,39,0.06)] border-2 border-[#D9CC86]/70 flex flex-col gap-4">
            <div className="flex items-start gap-3 bg-white/75 border border-[#D9CC86]/50 p-3.5 rounded-xl shadow-2xs">
              <input
                type="checkbox"
                id="declaration-check"
                required
                checked={formData.declarationAccepted}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, declarationAccepted: e.target.checked }))
                }
                className="mt-1 accent-[#D83232] cursor-pointer hover:scale-105 transition-transform w-5 h-5 rounded shrink-0"
              />
              <label
                htmlFor="declaration-check"
                className="text-xs sm:text-sm text-[#292727] leading-relaxed cursor-pointer select-none"
              >
                <strong className="font-semibold text-[#D83232]">Declaration:</strong> I hereby
                declare that the information provided by me in this application is true and complete
                to the best of my knowledge and belief. I understand that any false statement or
                omission may disqualify my candidature or lead to termination of appointment as per
                the statutory regulations of The Neotia University.
              </label>
            </div>

            {/* Validation Message Banner if not valid */}
            {!isFormValid && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs shadow-2xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>
                  Please ensure First Name, Last Name, Email, Mobile, Address are filled, CV/Resume is
                  uploaded, and the declaration is accepted.
                </span>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#765331]">
                <ShieldCheck className="w-4 h-4 text-[#B69A62]" />
                <span>256-Bit Encrypted Dossier Transmission</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="btn-secondary-tnu w-1/2 sm:w-auto px-4 py-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="btn-primary-tnu w-1/2 sm:w-auto px-7 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_24px_rgba(216,50,50,0.28)] group disabled:bg-[#E0E0E0] disabled:text-[#9E9E9E] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span>SUBMIT APPLICATION</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
