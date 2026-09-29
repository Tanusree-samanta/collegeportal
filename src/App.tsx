import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { SchoolsPage } from './components/SchoolsPage';
import { VacantPositionsPage } from './components/VacantPositionsPage';
import { RequirementPage } from './components/RequirementPage';
import { ApplicationFormPage } from './components/ApplicationFormPage';
import { SuccessPage } from './components/SuccessPage';
import { AmbientBackground } from './components/AmbientBackground';
import { ApplicationFormData, School, VacantPosition } from './types';
import { SCHOOLS_DATA } from './data/schools';
import { VACANT_POSITIONS_DATA } from './data/positions';

type PageState = 'landing' | 'schools' | 'vacancies' | 'requirement' | 'form' | 'success';

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
  const navigateToVacancies = () => setCurrentPage('vacancies');
  const navigateToRequirement = () => setCurrentPage('requirement');
  const navigateToForm = () => setCurrentPage('form');

  // School Click Handler: Directly opens vacant positions in selected school
  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    setCurrentPage('vacancies');
  };

  // Position Click Handler: Shows details about the post!
  const handleSelectPosition = (pos: VacantPosition) => {
    setSelectedPosition(pos);
    setCurrentPage('requirement');
  };

  // Form Submitted
  const handleFormSubmitted = (data: ApplicationFormData, appId: string) => {
    setSubmittedData(data);
    setSubmittedApplicationId(appId);
    setCurrentPage('success');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#241F20] font-sans antialiased selection:bg-[#6B1F2A]/15 selection:text-[#6B1F2A] relative">
      <AmbientBackground />
      <div className="relative z-10">
      {/* PAGE 1: CAREER LANDING PAGE */}
      {currentPage === 'landing' && (
        <LandingHero onNavigateToSchools={navigateToSchools} />
      )}

      {/* PAGE 2: 12 SCHOOLS DIRECTORY */}
      {currentPage === 'schools' && (
        <>
          <Header
            title="TNU Recruitment"
            subtitle="Explore Schools"
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

      {/* PAGE 3: VACANT / OPENED POSITIONS IN SELECTED SCHOOL */}
      {currentPage === 'vacancies' && (
        <>
          <Header
            title={selectedSchool ? selectedSchool.name : 'School of Technology'}
            subtitle="Faculty Vacancies (7th CPC Scale)"
            badge="HIRING 2026-27"
            showBack={true}
            onBack={navigateToSchools}
          />
          <VacantPositionsPage
            school={selectedSchool}
            onSelectPosition={handleSelectPosition}
            onNavigateHome={navigateToLanding}
            onNavigateSchools={navigateToSchools}
          />
        </>
      )}

      {/* PAGE 4: REQUIREMENT / POST DETAILS */}
      {currentPage === 'requirement' && (
        <>
          <Header
            title="Position Details"
            subtitle="TNU Hiring 2026-27"
            badge="HIRING 2026-27"
            showBack={true}
            onBack={navigateToVacancies}
          />
          <RequirementPage
            position={selectedPosition}
            onApplyNow={navigateToForm}
            onNavigateHome={navigateToLanding}
            onNavigateSchools={navigateToSchools}
            onNavigateVacancies={navigateToVacancies}
          />
        </>
      )}

      {/* PAGE 4: 4-STEP APPLICATION FORM (WITH PREVIOUS/BACK TO EDIT & LAST STEP CV UPLOAD) */}
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
            onNavigateVacancies={navigateToVacancies}
            onNavigateRequirement={navigateToRequirement}
          />
        </>
      )}

      {/* PAGE 5: SUBMISSION SUCCESS */}
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
            onBackToCareers={navigateToVacancies}
          />
        </>
      )}
      </div>
    </div>
  );
}
