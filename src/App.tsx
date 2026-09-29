import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { SchoolsPage } from './components/SchoolsPage';
import { SchoolPostsPage } from './components/SchoolPostsPage';
import { RequirementPage } from './components/RequirementPage';
import { ApplicationFormPage } from './components/ApplicationFormPage';
import { SuccessPage } from './components/SuccessPage';
import { AmbientBackground } from './components/AmbientBackground';
import { ApplicationFormData, School, VacantPosition } from './types';
import { SCHOOLS_DATA } from './data/schools';
import { VACANT_POSITIONS_DATA } from './data/positions';

type PageState = 'landing' | 'schools' | 'posts' | 'requirement' | 'form' | 'success';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(SCHOOLS_DATA[0]);
  const [selectedPosition, setSelectedPosition] = useState<VacantPosition | null>(
    VACANT_POSITIONS_DATA[0]
  );
  const [submittedApplicationId, setSubmittedApplicationId] = useState('FAC-2026-8942');
  const [submittedData, setSubmittedData] = useState<ApplicationFormData | null>(null);

  // Navigation Handlers
  const navigateToLanding = () => setCurrentPage('landing');
  const navigateToSchools = () => setCurrentPage('schools');
  const navigateToPosts = () => setCurrentPage('posts');
  const navigateToRequirement = () => setCurrentPage('requirement');
  const navigateToForm = () => setCurrentPage('form');

  // Step 1: When a School is selected, navigate to the Posts List Page for that School!
  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    const matched = VACANT_POSITIONS_DATA.find((p) => p.schoolId === school.id) || VACANT_POSITIONS_DATA[0];
    setSelectedPosition(matched);
    setCurrentPage('posts');
  };

  // Step 2: When a Post is selected from the Posts List Page, navigate to the Post Requirements!
  const handleSelectPosition = (position: VacantPosition) => {
    setSelectedPosition(position);
    setCurrentPage('requirement');
  };

  // Step 3: When Apply Now is clicked on Requirements, navigate to Form
  const handleApplyNow = () => {
    setCurrentPage('form');
  };

  // Step 4: When Form is submitted, navigate to Success Confirmation
  const handleFormSubmitted = (data: ApplicationFormData, appId: string) => {
    setSubmittedData(data);
    setSubmittedApplicationId(appId);
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

        {/* PAGE 6: SUBMISSION SUCCESS */}
        {currentPage === 'success' && (
          <>
            <Header
              title="Submission Confirmation"
              subtitle="TNU Hiring 2026-27"
              badge="DOSSIER LODGED"
              showBack={false}
            />
            <SuccessPage
              applicationId={submittedApplicationId}
              formData={
                submittedData || ({
                  firstName: 'Debashis',
                  lastName: 'Chatterjee',
                  email: 'd.chatterjee@research.tnu.ac.in',
                } as ApplicationFormData)
              }
              onBackToCareers={navigateToLanding}
            />
          </>
        )}
      </div>
    </div>
  );
}
