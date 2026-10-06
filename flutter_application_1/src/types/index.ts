export type JourneyPhaseKey = 'stabilize' | 'reposition' | 'contact' | 'reciprocity' | 'safety';

export interface OnboardingAnswers {
  situation: string;
  breakupInitiator: string;
  elapsedTime: string;
  contactPattern: string;
  lastInteraction: string;
  mainDifficulty: string;
  desiredOutcome: string;
  safetyFlag: boolean;
}

export interface RelationshipContext {
  phase: JourneyPhaseKey;
  phaseName: string;
  focus: string;
  firstStep: string;
  explanation: string;
  ruleVersion: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  isPurchased?: boolean;
  purchaseDate?: string;
  licenseCode?: string;
  hasCompletedOnboarding: boolean;
  onboardingAnswers: OnboardingAnswers | null;
  relationshipContext: RelationshipContext | null;
  isPlus: boolean;
}


export interface JourneyDay {
  dayNumber: number; // 1 to 28
  phase: string;
  phaseKey: JourneyPhaseKey;
  title: string;
  objective: string;
  durationMinutes: number;
  bodyText: string;
  example: string;
  exercise: string;
  action: string;
  reflectionPrompt: string;
  recommendedTool: string;
}

export interface DailyCheckin {
  date: string; // YYYY-MM-DD
  mindLoad: 'Muito difícil' | 'Difícil' | 'Neutro' | 'Bem' | 'Muito bem';
  dominantFeeling: string;
  contactState: string;
  needToday?: string;
  createdAt: string;
}

export type TimelineEventType =
  | 'breakup'
  | 'space_request'
  | 'message_received'
  | 'message_sent'
  | 'meeting'
  | 'argument'
  | 'important_talk'
  | 'apology'
  | 'reconciliation'
  | 'closure'
  | 'custom';

export interface TimelineEvent {
  id: string;
  date: string; // ISO
  type: TimelineEventType;
  title: string;
  description: string;
  howIFelt: string;
  interpretation?: string;
}

export interface MessageDraft {
  id: string;
  title: string;
  content: string;
  category: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  promptUsed?: string;
}

export interface MessageTemplate {
  id: number;
  title: string;
  category: string;
  context: string;
  template: string;
  avoidTip: string;
  observeTip: string;
}

export interface SupportScenario {
  id: number;
  title: string;
  whatHappened: string;
  whatIsFact: string;
  whatWeDontKnow: string;
  whatToObserve: string;
  suggestedAction: string;
  relatedMessageTitle?: string;
  relatedMessageTemplate?: string;
  isSafetyAlert?: boolean;
}

export type LibraryItemType = 'leitura' | 'audio' | 'pratica' | 'checklist';

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface LibraryItem {
  id: string;
  type: LibraryItemType;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  tags: string[];
  content: string;
  audioDuration?: string;
  audioScript?: string;
  checklistItems?: ChecklistItem[];
}
