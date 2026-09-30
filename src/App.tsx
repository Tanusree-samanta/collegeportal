import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { SchoolsPage } from './components/SchoolsPage';
import { SchoolPostsPage } from './components/SchoolPostsPage';
import { RequirementPage } from './components/RequirementPage';
import { ApplicationFormPage } from './components/ApplicationFormPage';
import { SuccessPage } from './components/SuccessPage';
import { AmbientBackground } from './components/AmbientBackground';
import { CandidatePortal } from './components/candidate/CandidatePortal';
import { CandidateAuthModal } from './components/candidate/CandidateAuthModal';
import {
  ApplicationFormData,
  School,
  VacantPosition,
  CandidateProfile,
  CandidateApplication,
} from './types';
import { SCHOOLS_DATA } from './data/schools';
import { VACANT_POSITIONS_DATA } from './data/positions';
import { INITIAL_APPLICATIONS, INITIAL_CANDIDATE_PROFILE } from './data/candidateData';

type PageState =
  | 'landing'
  | 'schools'
  | 'posts'
  | 'requirement'
  | 'form'
  | 'success'
  | 'candidate-portal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(SCHOOLS_DATA[0]);
  const [selectedPosition, setSelectedPosition] = useState<VacantPosition | null>(
    VACANT_POSITIONS_DATA[0]
  );
  const [submittedApplicationId, setSubmittedApplicationId] = useState('TNU-APP-2026-00125');
  const [submittedData, setSubmittedData] = useState<ApplicationFormData | null>(null);

  // Candidate Authentication & Portal Activation Session
  const [isCandidateAuthenticated, setIsCandidateAuthenticated] = useState(false);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(INITIAL_CANDIDATE_PROFILE);
  const [candidateApplications, setCandidateApplications] = useState<CandidateApplication[]>(INITIAL_APPLICATIONS);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPendingAction, setAuthPendingAction] = useState<'apply' | 'portal'>('apply');

  // Navigation Handlers
  const navigateToLanding = () => setCurrentPage('landing');
  const navigateToSchools = () => setCurrentPage('schools');
  const navigateToPosts = () => setCurrentPage('posts');
  const navigateToRequirement = () => setCurrentPage('requirement');
  const navigateToForm = () => setCurrentPage('form');

  const navigateToCandidatePortal = () => {
    if (!isCandidateAuthenticated) {
      setAuthPendingAction('portal');
      setShowAuthModal(true);
      return;
    }
    setCurrentPage('candidate-portal');
  };

  // Step 1: When a School is selected, navigate to the Posts List Page for that School
  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    const matched =
      VACANT_POSITIONS_DATA.find((p) => p.schoolId === school.id) || VACANT_POSITIONS_DATA[0];
    setSelectedPosition(matched);
    setCurrentPage('posts');
  };

  // Step 2: When a Post is selected from the Posts List Page, navigate to the Post Requirements
  const handleSelectPosition = (position: VacantPosition) => {
    setSelectedPosition(position);
    setCurrentPage('requirement');
  };

  // Step 3: When Apply Now is clicked:
  // EXACT USER FLOW: Candidate Login / Create Account -> Complete Application
  const handleApplyNow = () => {
    if (!isCandidateAuthenticated) {
      setAuthPendingAction('apply');
      setShowAuthModal(true);
    } else {
      setCurrentPage('form');
    }
  };

  // Authentication Success Handler
  const handleLoginSuccess = (profile: CandidateProfile) => {
    setIsCandidateAuthenticated(true);
    setCandidateProfile(profile);
    setShowAuthModal(false);

    if (authPendingAction === 'apply') {
      setCurrentPage('form');
    } else {
      setCurrentPage('candidate-portal');
    }
  };

  // Step 4: When Form is submitted, activate Candidate Portal and link to Application ID!
  const handleFormSubmitted = (data: ApplicationFormData, appId: string) => {
    const formattedAppId = appId.startsWith('TNU-APP')
      ? appId
      : `TNU-APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const submissionDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const candidateName = `${data.firstName} ${data.lastName}`.trim();
    const initials =
      candidateName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'DC';

    // 1. Activate / update candidate profile
    const updatedProfile: CandidateProfile = {
      ...candidateProfile,
      fullName: candidateName,
      email: data.email,
      mobile: data.mobile,
      avatarInitials: initials,
      currentDesignation: data.currentDesignation || 'Academic Applicant',
      currentOrganization: data.currentOrganization || 'Applicant at The Neotia University',
      highestDegree: data.highestQualification || 'Doctor of Philosophy (Ph.D.)',
      totalExperienceYears: data.totalExperience || '10+ Years',
      location: `${data.city}, ${data.state}`,
    };
    setCandidateProfile(updatedProfile);
    setIsCandidateAuthenticated(true);

    // 2. Automatically create & activate the new Application linked to Application ID
    const newApplication: CandidateApplication = {
      id: formattedAppId,
      vacancyId: selectedPosition?.id || 'pos-gen',
      jobTitle: selectedPosition?.area || 'Assistant Professor — Computer Science & Engineering',
      schoolName: selectedSchool?.name || 'School of Technology',
      department: selectedPosition?.department || 'Department of Computer Science & Engineering',
      positionType: selectedPosition?.positionType || 'Faculty',
      location: 'Sarisha Campus, WB',
      appliedDate: submissionDate,
      lastUpdated: 'Just now (Submitted)',
      applicationStatus: 'Submitted',
      interviewStatus: 'Not Scheduled',
      selectionStatus: 'Pending',
      loiStatus: 'Not Issued',
      verificationStatus: 'Not Started',
      joiningStatus: 'Not Started',
      timeline: [
        {
          stageKey: 'submitted',
          label: 'Stage 1 — Application Submitted',
          date: submissionDate,
          description: 'Complete 4-Step Academic Application Dossier lodged via central recruitment portal.',
          status: 'COMPLETED',
        },
        {
          stageKey: 'received',
          label: 'Stage 2 — Application Received & Screening',
          date: 'Today',
          description: 'Dossier registered by Office of Academic Appointments & Central HR Scrutiny Cell.',
          status: 'CURRENT',
        },
        {
          stageKey: 'screening',
          label: 'Stage 2 — UGC Eligibility Screening',
          date: 'In Progress',
          description: 'HR screening for UGC/AICTE minimum qualifications and API/CAS score validation.',
          status: 'PENDING',
        },
        {
          stageKey: 'shortlisted',
          label: 'Stage 2 — Shortlist Notification',
          date: 'Pending Screening',
          description: 'Candidates meeting cutoff criteria will be invited for interview rounds.',
          status: 'PENDING',
        },
        {
          stageKey: 'interview',
          label: 'Stage 3 — Statutory Selection Committee Interview',
          date: 'Pending Shortlist',
          description: 'Formal interview with University Vice-Chancellor, Dean, and external subject experts.',
          status: 'PENDING',
        },
        {
          stageKey: 'selection',
          label: 'Stage 4 — Selection Status',
          date: 'Pending Interview',
          description: 'Statutory Selection Committee evaluation and Governing Body approval.',
          status: 'PENDING',
        },
        {
          stageKey: 'loi_issued',
          label: 'Stage 5 — Letter of Intent (LOI) Issuance',
          date: 'Pending Selection',
          description: 'Issuance of formal LOI detailing 7th CPC academic scale and designation.',
          status: 'PENDING',
        },
        {
          stageKey: 'loi_accepted',
          label: 'Stage 6 — LOI Acceptance',
          date: 'Pending LOI',
          description: 'Electronic signing of offer acceptance by candidate.',
          status: 'PENDING',
        },
        {
          stageKey: 'verification',
          label: 'Stage 8 — Document Verification',
          date: 'Pending LOI',
          description: 'Scrutiny cell authentication of degrees, transcripts, and experience records.',
          status: 'PENDING',
        },
        {
          stageKey: 'joining',
          label: 'Stage 10 — Pre-Onboarding & Joining',
          date: 'Pending Verification',
          description: 'Campus quarters allocation, department induction, and faculty ID issuance.',
          status: 'PENDING',
        },
      ],
      verificationChecklist: [
        { id: 'v1', docName: 'Curriculum Vitae (CV)', status: 'Uploaded', lastUpdated: 'Today' },
        { id: 'v2', docName: 'Identity Proof (Aadhaar / Passport)', status: 'Uploaded', lastUpdated: 'Today' },
        { id: 'v3', docName: 'Highest Educational Degree (Ph.D. / Master)', status: 'Uploaded', lastUpdated: 'Today' },
        { id: 'v4', docName: 'Teaching & Research Experience Certificates', status: 'Uploaded', lastUpdated: 'Today' },
        { id: 'v5', docName: 'Indexed Publications & Patents', status: 'Uploaded', lastUpdated: 'Today' },
      ],
      preOnboardingTasks: [
        { id: 't1', label: 'Application Submitted', isCompleted: true, completedAt: 'Today' },
        { id: 't2', label: 'Candidate Selected', isCompleted: false },
        { id: 't3', label: 'LOI Accepted', isCompleted: false },
        { id: 't4', label: 'Notice Period Submitted', isCompleted: false },
        { id: 't5', label: 'Documents Verified', isCompleted: false },
        { id: 't6', label: 'Joining Date Confirmed', isCompleted: false },
        { id: 't7', label: 'Pre-Onboarding Formalities', isCompleted: false },
        { id: 't8', label: 'Joining & Campus Induction', isCompleted: false },
      ],
    };

    // Prepend new application so it is active
    setCandidateApplications((prev) => [newApplication, ...prev]);
    setSubmittedData(data);
    setSubmittedApplicationId(formattedAppId);

    // Navigate to Success screen
    setCurrentPage('success');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#123B5D] font-sans antialiased selection:bg-[#0057B8]/15 selection:text-[#0057B8] relative">
      <AmbientBackground />
      <div className="relative z-10">
        {/* PAGE 1: CAREER LANDING PAGE */}
        {currentPage === 'landing' && (
          <LandingHero
            onNavigateToSchools={navigateToSchools}
            onApplyNow={navigateToSchools}
            onSelectSchool={handleSelectSchool}
            onOpenCandidatePortal={navigateToCandidatePortal}
          />
        )}

        {/* PAGE 2: 12 SCHOOLS DIRECTORY */}
        {currentPage === 'schools' && (
          <>
            <Header
              title="TNU Recruitment"
              subtitle="Explore Academic Schools"
              badge="HIRING 2026-27"
              showBack={true}
              onBack={navigateToLanding}
              onOpenCandidatePortal={navigateToCandidatePortal}
            />
            <SchoolsPage
              onSelectSchool={handleSelectSchool}
              onNavigateHome={navigateToLanding}
            />
          </>
        )}

        {/* PAGE 3: POSTS LIST PAGE FOR THE SELECTED SCHOOL */}
        {currentPage === 'posts' && (
          <>
            <Header
              title={selectedSchool ? selectedSchool.name : 'Open Positions'}
              subtitle="Available Academic Cadres & Vacancies"
              badge="ACTIVE VACANCIES"
              showBack={true}
              onBack={navigateToSchools}
              onOpenCandidatePortal={navigateToCandidatePortal}
            />
            <SchoolPostsPage
              school={selectedSchool}
              onSelectPosition={handleSelectPosition}
              onNavigateHome={navigateToLanding}
              onNavigateSchools={navigateToSchools}
            />
          </>
        )}

        {/* PAGE 4: POST REQUIREMENT & DETAILS */}
        {currentPage === 'requirement' && (
          <>
            <Header
              title={selectedPosition ? selectedPosition.area : 'Position Details'}
              subtitle={selectedSchool ? selectedSchool.name : 'TNU Faculty Hiring 2026-27'}
              badge="POST REQUIREMENTS"
              showBack={true}
              onBack={navigateToPosts}
              onOpenCandidatePortal={navigateToCandidatePortal}
            />
            <RequirementPage
              position={selectedPosition}
              onApplyNow={handleApplyNow}
              onNavigateHome={navigateToLanding}
              onNavigateSchools={navigateToSchools}
              onNavigateVacancies={navigateToPosts}
            />
          </>
        )}

        {/* PAGE 5: 4-STEP APPLICATION FORM */}
        {currentPage === 'form' && (
          <>
            <Header
              title="Application Dossier"
              subtitle="4-Step Academic Submission"
              badge="HIRING 2026-27"
              showBack={true}
              onBack={navigateToRequirement}
              onOpenCandidatePortal={navigateToCandidatePortal}
            />
            <ApplicationFormPage
              position={selectedPosition}
              onSubmitSuccess={handleFormSubmitted}
              onNavigateHome={navigateToLanding}
              onNavigateSchools={navigateToSchools}
              onNavigateVacancies={navigateToPosts}
              onNavigateRequirement={navigateToRequirement}
            />
          </>
        )}

        {/* PAGE 6: SUBMISSION SUCCESS & DIRECT PORTAL ACTIVATION */}
        {currentPage === 'success' && (
          <>
            <Header
              title="Submission Confirmation"
              subtitle="TNU Hiring 2026-27"
              badge="DOSSIER LODGED"
              showBack={false}
              onOpenCandidatePortal={navigateToCandidatePortal}
            />
            <SuccessPage
              applicationId={submittedApplicationId}
              formData={
                submittedData ||
                ({
                  firstName: candidateProfile.fullName.split(' ')[0] || 'Debashis',
                  lastName: candidateProfile.fullName.split(' ')[1] || 'Chatterjee',
                  email: candidateProfile.email,
                  mobile: candidateProfile.mobile,
                } as ApplicationFormData)
              }
              position={selectedPosition}
              school={selectedSchool}
              onGoToCandidatePortal={() => setCurrentPage('candidate-portal')}
              onTrackApplication={() => setCurrentPage('candidate-portal')}
              onBackToCareers={navigateToLanding}
            />
          </>
        )}

        {/* PAGE 7: COMPLETE CANDIDATE RECRUITMENT & RECRUITMENT JOURNEY PORTAL */}
        {currentPage === 'candidate-portal' && (
          <CandidatePortal
            onSwitchToPublicPortal={navigateToLanding}
            onLogout={() => {
              setIsCandidateAuthenticated(false);
              navigateToLanding();
            }}
            initialApplicationId={submittedApplicationId}
            initialApplications={candidateApplications}
            initialProfile={candidateProfile}
          />
        )}
      </div>

      {/* Global Candidate Authentication Modal */}
      {showAuthModal && (
        <CandidateAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
