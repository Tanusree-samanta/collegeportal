import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { SchoolsPage } from './components/SchoolsPage';
import { VacantPositionsPage } from './components/VacantPositionsPage';
import { RequirementPage } from './components/RequirementPage';
import { ApplicationFormPage } from './components/ApplicationFormPage';
import { SuccessPage } from './components/SuccessPage';
import { VoiceConversationModal } from './components/VoiceConversationModal';
import { VoiceFloatingTrigger } from './components/VoiceFloatingTrigger';
import { AmbientBackground } from './components/AmbientBackground';
import { ApplicationFormData, School, VacantPosition } from './types';
import { VACANT_POSITIONS_DATA } from './data/positions';

type PageState = 'landing' | 'schools' | 'vacancies' | 'requirement' | 'form' | 'success';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [selectedPosition, setSelectedPosition] = useState<VacantPosition | null>(
    VACANT_POSITIONS_DATA[0]
  );
  const [submittedApplicationId, setSubmittedApplicationId] = useState('FAC-2026-8942');
  const [submittedData, setSubmittedData] = useState<ApplicationFormData | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Navigation Handlers
  const navigateToLanding = () => setCurrentPage('landing');
  const navigateToSchools = () => setCurrentPage('schools');
  const navigateToVacancies = () => setCurrentPage('vacancies');
  const navigateToRequirement = () => setCurrentPage('requirement');
  const navigateToForm = () => setCurrentPage('form');

  // School of Technology Click Handler
  const handleSelectSchool = (school: School) => {
    if (school.isActive) {
      setCurrentPage('vacancies');
    }
  };

  // Position Click Handler
  const handleSelectPosition = (pos: VacantPosition) => {
    setSelectedPosition(pos);
    setCurrentPage('requirement');
  };

  const handleFormSubmitted = (data: ApplicationFormData, appId: string) => {
    setSubmittedData(data);
    setSubmittedApplicationId(appId);
    setCurrentPage('success');
  };

  const handleOpenVoice = () => {
    setIsVoiceModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#292727] font-sans antialiased selection:bg-[#D83232]/20 selection:text-[#D83232] relative overflow-x-hidden">
      {/* GLOBAL AMBIENT BACKGROUND LAYER (3 Subtle Organic Glows) */}
      <AmbientBackground />

      {/* PAGE 1: CAREER LANDING PAGE */}
      {currentPage === 'landing' && (
        <main key="landing" className="page-enter">
          <LandingHero
            onNavigateToSchools={navigateToSchools}
            onOpenVoice={handleOpenVoice}
          />
        </main>
      )}

      {/* PAGE 2: 12 SCHOOLS DIRECTORY */}
      {currentPage === 'schools' && (
        <main key="schools" className="page-enter">
          <Header
            title="TNU Recruitment"
            subtitle="Explore Schools"
            badge="HIRING 2026-27"
            showBack={true}
            onBack={navigateToLanding}
            onOpenVoice={handleOpenVoice}
          />
          <SchoolsPage
            onSelectSchool={handleSelectSchool}
            onNavigateHome={navigateToLanding}
          />
        </main>
      )}

      {/* PAGE 2.5: VACANT / OPENED POSITIONS IN SELECTED SCHOOL */}
      {currentPage === 'vacancies' && (
        <main key="vacancies" className="page-enter">
          <Header
            title="School of Technology"
            subtitle="Faculty Vacancies (8 Openings)"
            badge="HIRING 2026-27"
            showBack={true}
            onBack={navigateToSchools}
            onOpenVoice={handleOpenVoice}
          />
          <VacantPositionsPage
            onSelectPosition={handleSelectPosition}
            onNavigateHome={navigateToLanding}
            onNavigateSchools={navigateToSchools}
          />
        </main>
      )}

      {/* PAGE 3: REQUIREMENT / POST DETAILS */}
      {currentPage === 'requirement' && (
        <main key="requirement" className="page-enter">
          <Header
            title="Position Details"
            subtitle="TNU Hiring 2026-27"
            badge="HIRING 2026-27"
            showBack={true}
            onBack={navigateToVacancies}
            onOpenVoice={handleOpenVoice}
          />
          <RequirementPage
            position={selectedPosition}
            onApplyNow={navigateToForm}
            onNavigateHome={navigateToLanding}
            onNavigateSchools={navigateToSchools}
            onNavigateVacancies={navigateToVacancies}
          />
        </main>
      )}

      {/* PAGE 4: APPLICATION FORM */}
      {currentPage === 'form' && (
        <main key="form" className="page-enter">
          <Header
            title="Application Dossier Form"
            subtitle="TNU Hiring 2026-27"
            badge="HIRING 2026-27"
            showBack={true}
            onBack={navigateToRequirement}
            onOpenVoice={handleOpenVoice}
          />
          <ApplicationFormPage
            position={selectedPosition}
            onSubmitSuccess={handleFormSubmitted}
            onNavigateHome={navigateToLanding}
            onNavigateSchools={navigateToSchools}
            onNavigateVacancies={navigateToVacancies}
            onNavigateRequirement={navigateToRequirement}
          />
        </main>
      )}

      {/* PAGE 5: SUBMISSION SUCCESS */}
      {currentPage === 'success' && (
        <main key="success" className="page-enter">
          <Header
            title="Submission Confirmation"
            subtitle="TNU Hiring 2026-27"
            badge="DOSSIER LODGED"
            showBack={false}
            onOpenVoice={handleOpenVoice}
          />
          <SuccessPage
            applicationId={submittedApplicationId}
            formData={
              submittedData || {
                firstName: 'Debashis',
                lastName: 'Chatterjee',
                email: 'd.chatterjee@research.tnu.ac.in',
              } as ApplicationFormData
            }
            onBackToCareers={navigateToVacancies}
          />
        </main>
      )}

      {/* Global Floating Voice Conversation Trigger on Sub-pages */}
      {currentPage !== 'landing' && (
        <VoiceFloatingTrigger onOpen={handleOpenVoice} />
      )}

      {/* Gemini 3.8 Live API Voice Conversation Modal */}
      <VoiceConversationModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
}
