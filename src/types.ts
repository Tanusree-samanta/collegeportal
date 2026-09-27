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

  // Section 4: Research
  publicationsCount: string;
  sciScopusCount: string;
  patentsCount: string;
  projectsCount: string;
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
