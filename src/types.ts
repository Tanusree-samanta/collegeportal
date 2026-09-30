export interface CourseDetail {
  code: string;
  name: string;
  level: 'UG' | 'PG' | 'Ph.D.' | 'Diploma';
  duration: string;
  seats?: number;
}

export interface School {
  id: string;
  streamNumber: string;
  name: string;
  streamLabel: string;
  description: string;
  isActive: boolean;
  openPositionsCount?: number;
  openPositionsLabel?: string;
  iconName: string;
  // Rich school information details
  courseCount?: number;
  courses?: CourseDetail[];
  departments?: string[];
  facilities?: string[];
  highlights?: string[];
  studentFacultyRatio?: string;
  deanName?: string;
  deanNote?: string;
  accreditation?: string;
  labCount?: number;
}

export interface VacantPosition {
  id: string;
  schoolId?: string;
  cadre: string;
  area: string;
  department: string;
  vacancyCount: number;
  employmentType: string;
  location: string;
  status: string;
  deadline: string;
  qualificationsOverview: string;
  preferredSkills: string[];
  description: string;
  isFeatured?: boolean;
  // Candidate module extensions
  positionType?: 'Faculty' | 'Lab Technician' | 'Non-Faculty';
  experienceRequired?: string;
  minQualification?: string;
  salaryScale?: string;
  responsibilities?: string[];
  eligibilityNorms?: string[];
  requiredDocuments?: string[];
  importantDates?: {
    announced: string;
    deadline: string;
    interviewTentative?: string;
  };
}

export interface Qualification {
  id: string;
  level: string;
  degree: string;
  specialization: string;
  institution: string;
  yearOfPassing: string;
  gradeScore: string;
  isVerified?: boolean;
}

export interface PublicationItem {
  id: string;
  title: string;
  venue: string;
  doi: string;
  authors: string;
  citations: string;
}

export interface LanguageRow {
  id: string;
  language: string;
  read: boolean;
  write: boolean;
  speak: boolean;
}

export interface EmploymentRecord {
  id: string;
  designation: string;
  organization: string;
  period: string;
  description: string;
  focus: string;
  isCurrent?: boolean;
  startDate?: string;
  endDate?: string;
  employmentType?: string;
}

export interface ReferenceContact {
  id: string;
  name: string;
  designation: string;
  organization: string;
  relationship: string;
  email: string;
  phone: string;
}

export interface ApplicationFormData {
  // Section 1: Personal
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  email: string;
  mobile: string;
  alternatePhone: string;
  currentAddress: string;
  permanentAddress: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;

  // Section 2: Education
  highestQualification: string;
  qualifications: Qualification[];

  // Section 3: Professional
  currentOrganization: string;
  currentDesignation: string;
  totalExperience: string;
  teachingExperience: string;
  researchExperience: string;
  industryExperience: string;
  primarySpecialization: string;
  currentGrossSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;

  // Section 4: Research
  publicationsCount: string;
  sciScopusCount: string;
  patentsCount: string;
  projectsCount: string;
  hIndex?: string;
  i10Index?: string;
  citationsTotal?: string;
  publications: PublicationItem[];

  // Section 5: Languages
  languages: LanguageRow[];

  // Section 6: Extracurricular
  awards: string;
  memberships: string;
  extracurricular: string;
  additionalNotes: string;

  // Section 7: Employment
  employmentHistory: EmploymentRecord[];

  // Section 8: References
  references: ReferenceContact[];

  // CV / Resume
  cvFileName: string;
  cvFileSize: string;
  cvUploaded: boolean;

  // Declaration
  declarationAccepted: boolean;
}

// =========================================================
// CANDIDATE MODULE TYPES & MODELS
// =========================================================

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  avatarInitials: string;
  currentDesignation?: string;
  currentOrganization?: string;
  highestDegree?: string;
  totalExperienceYears?: string;
  location?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  pinCode?: string;
}

export interface CandidateDocument {
  id: string;
  name: string;
  type: 'cv' | 'degree' | 'experience' | 'id_proof' | 'other';
  required: boolean;
  fileName: string;
  fileSize: string;
  status: 'uploaded' | 'pending' | 'under_review' | 'verified' | 'rejected';
  uploadedDate: string;
  version: string;
  rejectionReason?: string;
}

export interface InterviewDetails {
  round:
    | 'Technical Round'
    | 'HR Round'
    | 'Selection Committee Meeting'
    | 'Management Round'
    | 'Selection Committee Technical Interview'
    | string;
  date: string;
  time: string;
  mode: 'Online' | 'Offline';
  venue: string;
  instructions: string;
  calendarLink?: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled';
}

export interface LetterOfIntent {
  refNumber: string;
  position: string;
  schoolName: string;
  candidateName: string;
  issueDate: string;
  acceptanceDeadline: string;
  basicPay: string;
  scale: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  acceptedDate?: string;
  declineReason?: string;
}

export interface NoticePeriodDetails {
  currentOrganization: string;
  currentlyEmployed: boolean;
  noticePeriodDays: number;
  lastWorkingDate: string;
  expectedJoiningDate: string;
  submittedAt?: string;
}

export interface VerificationItem {
  id: string;
  docName: string;
  status: 'Pending' | 'Uploaded' | 'Under Verification' | 'Verified' | 'Rejected';
  remarks?: string;
  lastUpdated: string;
}

export interface PreOnboardingTask {
  id: string;
  label: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface ApplicationTimelineStage {
  stageKey:
    | 'submitted'
    | 'received'
    | 'screening'
    | 'shortlisted'
    | 'interview'
    | 'selection'
    | 'loi_issued'
    | 'loi_accepted'
    | 'verification'
    | 'joining';
  label: string;
  date: string;
  description: string;
  status: 'COMPLETED' | 'CURRENT' | 'PENDING';
}

export interface CandidateApplication {
  id: string;
  vacancyId: string;
  jobTitle: string;
  schoolName: string;
  department: string;
  positionType: 'Faculty' | 'Lab Technician' | 'Non-Faculty';
  location: string;
  appliedDate: string;
  lastUpdated: string;
  applicationStatus:
    | 'Submitted'
    | 'Under Review'
    | 'Shortlisted'
    | 'Interview Scheduled'
    | 'Selected'
    | 'LOI Issued'
    | 'LOI Accepted'
    | 'Verification'
    | 'Yet to Join'
    | 'Joined'
    | 'Not Selected';
  interviewStatus: 'Not Scheduled' | 'Scheduled' | 'Completed' | 'Not Required';
  selectionStatus: 'Pending' | 'Selected' | 'Not Selected';
  loiStatus: 'Not Issued' | 'Issued' | 'Accepted' | 'Declined';
  verificationStatus: 'Not Started' | 'Under Verification' | 'In Progress' | 'Verified' | 'Action Required' | 'Rejected — Re-upload Required';
  joiningStatus: 'Not Started' | 'Notice Period Active' | 'Notice Period Submitted' | 'Pre-Onboarding' | 'Yet to Join' | 'Joined';
  timeline: ApplicationTimelineStage[];
  interviewDetails?: InterviewDetails;
  loiDetails?: LetterOfIntent;
  noticePeriodDetails?: NoticePeriodDetails;
  verificationChecklist: VerificationItem[];
  preOnboardingTasks: PreOnboardingTask[];
  formDataSnapshot?: Partial<ApplicationFormData>;
}

export interface DraftApplication {
  id: string;
  vacancyId: string;
  jobTitle: string;
  schoolName: string;
  positionType: string;
  currentStep: number;
  totalSteps: number;
  lastSaved: string;
  formData: Partial<ApplicationFormData>;
}

export interface CandidateNotification {
  id: string;
  type: 'status' | 'interview' | 'loi' | 'document' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionTarget?: string;
}
