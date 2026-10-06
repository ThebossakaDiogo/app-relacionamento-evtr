import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { StorageService } from './services/storageService';
import { AppShell, NavTab } from './components/AppShell';
import { Toast } from './components/Toast';
import { OnboardingFlow } from './features/onboarding/OnboardingFlow';
import { TodayView } from './features/today/TodayView';
import { JourneyView } from './features/journey/JourneyView';
import { LessonReader } from './features/journey/LessonReader';
import { SupportView } from './features/support/SupportView';
import { LibraryView } from './features/library/LibraryView';
import { YouView } from './features/you/YouView';
import { JOURNEY_DAYS } from './data/journeyData';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.getUserProfile());
  const [currentTab, setCurrentTab] = useState<NavTab>('hoje');
  const [completedDays, setCompletedDays] = useState<number[]>(() => StorageService.getCompletedLessons());
  const [currentDay, setCurrentDay] = useState<number>(() => StorageService.getCurrentDay());
  const [readingDayNumber, setReadingDayNumber] = useState<number | null>(null);
  const [supportInitialTool, setSupportInitialTool] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Recalcular dia atual baseado nas lições incompletas
  useEffect(() => {
    const nextIncomplete = StorageService.getCurrentDay();
    setCurrentDay(nextIncomplete);
  }, [completedDays]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleCompleteOnboarding = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    setCurrentTab('hoje');
    showToast(`Bem-vinda, ${newProfile.name}! Seu plano personalizado está pronto.`);
  };

  const handleResetOnboarding = () => {
    const updated: UserProfile = {
      ...userProfile,
      hasCompletedOnboarding: false,
    };
    StorageService.saveUserProfile(updated);
    setUserProfile(updated);
  };

  const handleToggleLessonComplete = (dayNum: number, completed: boolean) => {
    const updated = StorageService.setLessonCompleted(dayNum, completed);
    setCompletedDays(updated);
  };

  const handleOpenSupportTool = (toolId: string) => {
    setSupportInitialTool(toolId);
    setCurrentTab('apoio');
  };

  // Se o usuário ainda não completou o Onboarding
  if (!userProfile.hasCompletedOnboarding) {
    return (
      <>
        <OnboardingFlow onComplete={handleCompleteOnboarding} />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  // Obter o objeto da lição atualmente aberta no leitor
  const activeReadingLesson = readingDayNumber
    ? JOURNEY_DAYS.find((d) => d.dayNumber === readingDayNumber) || null
    : null;

  return (
    <AppShell
      currentTab={currentTab}
      onTabChange={(tab) => {
        setSupportInitialTool(undefined);
        setCurrentTab(tab);
      }}
      userProfile={userProfile}
    >
      {/* Visualização da Aba Atual */}
      {currentTab === 'hoje' && (
        <TodayView
          userProfile={userProfile}
          currentDay={currentDay}
          completedDays={completedDays}
          onOpenLesson={(dayNum) => setReadingDayNumber(dayNum)}
          onNavigateTab={(tab) => setCurrentTab(tab)}
          onOpenSupportTool={handleOpenSupportTool}
          onShowToast={showToast}
        />
      )}

      {currentTab === 'jornada' && (
        <JourneyView
          currentDay={currentDay}
          completedDays={completedDays}
          onOpenLesson={(dayNum) => setReadingDayNumber(dayNum)}
        />
      )}

      {currentTab === 'apoio' && (
        <SupportView
          key={supportInitialTool || 'apoio-default'}
          initialTool={supportInitialTool}
          onShowToast={showToast}
          onNavigateTab={(tab) => setCurrentTab(tab)}
        />
      )}

      {currentTab === 'diario' && (
        <YouView
          key="diario-view"
          initialTab="diario"
          userProfile={userProfile}
          completedDays={completedDays}
          onResetOnboarding={handleResetOnboarding}
          onShowToast={showToast}
          onProfileUpdated={(updated) => setUserProfile(updated)}
        />
      )}

      {currentTab === 'biblioteca' && (
        <LibraryView onShowToast={showToast} />
      )}

      {currentTab === 'voce' && (
        <YouView
          key="voce-view"
          initialTab="conta"
          userProfile={userProfile}
          completedDays={completedDays}
          onResetOnboarding={handleResetOnboarding}
          onShowToast={showToast}
          onProfileUpdated={(updated) => setUserProfile(updated)}
        />
      )}

      {/* Leitor de Lição Imersivo (Modal de tela inteira) */}
      {activeReadingLesson && (
        <LessonReader
          day={activeReadingLesson}
          isCompleted={completedDays.includes(activeReadingLesson.dayNumber)}
          onToggleComplete={handleToggleLessonComplete}
          onClose={() => setReadingDayNumber(null)}
          onNavigateDay={(nextDay) => setReadingDayNumber(nextDay)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Flutuante de Notificação */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </AppShell>
  );
}
