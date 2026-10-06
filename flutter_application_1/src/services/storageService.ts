import {
  UserProfile,
  DailyCheckin,
  TimelineEvent,
  MessageDraft,
  JournalEntry,
  RelationshipContext,
  JourneyPhaseKey,
  OnboardingAnswers,
} from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'florecer_user_profile',
  COMPLETED_LESSONS: 'florecer_completed_lessons',
  CURRENT_DAY: 'florecer_current_day',
  DAILY_CHECKINS: 'florecer_daily_checkins',
  TIMELINE_EVENTS: 'florecer_timeline_events',
  JOURNAL_ENTRIES: 'florecer_journal_entries',
  MESSAGE_DRAFTS: 'florecer_message_drafts',
  FAVORITES: 'florecer_favorites',
  CHECKLIST_PROGRESS: 'florecer_checklist_progress',
  QUICK_EVENT: 'florecer_today_quick_event',
  PURCHASE_VERIFIED: 'florecer_purchase_verified',
};

const LEGACY_STORAGE_KEYS = {
  USER_PROFILE: 'magnetica_user_profile',
  COMPLETED_LESSONS: 'magnetica_completed_lessons',
  CURRENT_DAY: 'magnetica_current_day',
  DAILY_CHECKINS: 'magnetica_daily_checkins',
  TIMELINE_EVENTS: 'magnetica_timeline_events',
  JOURNAL_ENTRIES: 'magnetica_journal_entries',
  MESSAGE_DRAFTS: 'magnetica_message_drafts',
  FAVORITES: 'magnetica_favorites',
  CHECKLIST_PROGRESS: 'magnetica_checklist_progress',
  QUICK_EVENT: 'magnetica_today_quick_event',
  PURCHASE_VERIFIED: 'magnetica_purchase_verified',
};

// --- COOKIE HELPER (Persistência em Cookies de Longa Duração - 365 Dias) ---
export const CookieHelper = {
  set(name: string, value: string, days = 365): void {
    if (typeof document === 'undefined') return;
    try {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    } catch (e) {
      console.warn('Erro ao salvar cookie:', e);
    }
  },

  get(name: string): string | null {
    if (typeof document === 'undefined') return null;
    try {
      const cookies = document.cookie ? document.cookie.split('; ') : [];
      for (const c of cookies) {
        const parts = c.split('=');
        const key = decodeURIComponent(parts[0]);
        if (key === name) {
          return decodeURIComponent(parts.slice(1).join('='));
        }
      }
    } catch (e) {
      console.warn('Erro ao ler cookie:', e);
    }
    return null;
  },

  delete(name: string): void {
    if (typeof document === 'undefined') return;
    try {
      document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    } catch (e) {
      console.warn('Erro ao deletar cookie:', e);
    }
  },
};

// Motor de Personalização Determinística (PRD Seção 11 e Arquitetura)
export function computeRelationshipContext(answers: OnboardingAnswers): RelationshipContext {
  if (answers.safetyFlag) {
    return {
      phase: 'safety',
      phaseName: 'Cuidado e Segurança',
      focus: 'Proteger seu bem-estar físico e emocional.',
      firstStep: 'Buscar apoio profissional e manter distância segura de qualquer situação de risco.',
      explanation: 'Identificamos relatos que exigem prioridade máxima na sua segurança. O plano foca em limites firmes e autocuidado.',
      ruleVersion: 'v1.0',
    };
  }

  if (answers.elapsedTime === 'Menos de 7 dias' || answers.mainDifficulty.includes('Resistir') || answers.mainDifficulty.includes('Medo')) {
    return {
      phase: 'stabilize',
      phaseName: 'Fase 1: Estabilizar',
      focus: 'Não buscar uma resposta imediata para tudo e reduzir impulsos.',
      firstStep: '24 horas sem decisões impulsivas de contato ou checagem de telefone.',
      explanation: 'Você está vivenciando o impacto imediato ou momentos de alta incerteza. Seu plano começa acalmando a urgência e separando fatos de expectativas.',
      ruleVersion: 'v1.0',
    };
  }

  if (answers.contactPattern === 'Nenhum contato' || answers.elapsedTime === '1–3 meses' || answers.desiredOutcome === 'Seguir em frente') {
    return {
      phase: 'reposition',
      phaseName: 'Fase 2: Reposicionar',
      focus: 'Retomar a sua rotina, autonomia e observar padrões reais.',
      firstStep: 'Definir uma prioridade pessoal para esta semana que não dependa dele.',
      explanation: 'O momento pede recuperação da sua rotina e fortalecimento da sua independência emocional antes de qualquer passo de comunicação.',
      ruleVersion: 'v1.0',
    };
  }

  if (answers.lastInteraction.includes('procurou') || answers.lastInteraction.includes('Conversa carinhosa') || answers.contactPattern.includes('Ainda conversamos')) {
    return {
      phase: 'contact',
      phaseName: 'Fase 3: Contato com Intenção',
      focus: 'Decidir se, por que e como manter ou responder à comunicação.',
      firstStep: 'Esclarecer o objetivo concreto de qualquer mensagem antes de digitar.',
      explanation: 'Há abertura ou interações recentes acontecendo. O foco é responder com propósito e maturidade, sem criar significado antecipado.',
      ruleVersion: 'v1.0',
    };
  }

  if (answers.desiredOutcome.includes('reconstruir') || answers.situation.includes('recomeçar')) {
    return {
      phase: 'reciprocity',
      phaseName: 'Fase 4: Reciprocidade e Decisão',
      focus: 'Avaliar consistência, mudanças concretas e limites mútuos.',
      firstStep: 'Usar o checklist "Antes de Recomeçar" para analisar atitudes reais versus palavras.',
      explanation: 'Existe intenção ou possibilidade de recomeço. É fundamental analisar se há responsabilidade mútua antes de reabrir o relacionamento.',
      ruleVersion: 'v1.0',
    };
  }

  return {
    phase: 'stabilize',
    phaseName: 'Fase 1: Estabilizar',
    focus: 'Clareza passo a passo, um dia de cada vez.',
    firstStep: 'Organizar seus sentimentos e ler a primeira lição de 4 minutos.',
    explanation: 'Seu plano foi configurado para oferecer apoio estruturado e descomplicado.',
    ruleVersion: 'v1.0',
  };
}

export const StorageService = {
  // --- Perfil & Autenticação de Compra ---
  getUserProfile(): UserProfile {
    try {
      // 1. Tenta recuperar do LocalStorage (chave nova ou antiga)
      const localData = localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || localStorage.getItem(LEGACY_STORAGE_KEYS.USER_PROFILE);
      if (localData) {
        const parsed = JSON.parse(localData);
        // Sincroniza nos cookies em background
        CookieHelper.set(STORAGE_KEYS.USER_PROFILE, localData);
        if (parsed.email) CookieHelper.set('florecer_auth_email', parsed.email);
        if (parsed.isPurchased) CookieHelper.set('florecer_is_purchased', 'true');
        return parsed;
      }

      // 2. Fallback resiliente: recupera dos Cookies
      const cookieData = CookieHelper.get(STORAGE_KEYS.USER_PROFILE) || CookieHelper.get(LEGACY_STORAGE_KEYS.USER_PROFILE);
      if (cookieData) {
        const parsed = JSON.parse(cookieData);
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, cookieData);
        return parsed;
      }

      // 3. Fallback de cookie simples de compra
      const cookieEmail = CookieHelper.get('florecer_auth_email') || CookieHelper.get('magnetica_auth_email');
      const cookiePurchased = CookieHelper.get('florecer_is_purchased') === 'true' || CookieHelper.get('magnetica_is_purchased') === 'true';
      if (cookieEmail) {
        return {
          name: cookieEmail.split('@')[0],
          email: cookieEmail,
          isPurchased: cookiePurchased,
          hasCompletedOnboarding: false,
          onboardingAnswers: null,
          relationshipContext: null,
          isPlus: false,
        };
      }
    } catch (e) {
      console.error(e);
    }

    return {
      name: 'Você',
      hasCompletedOnboarding: false,
      onboardingAnswers: null,
      relationshipContext: null,
      isPlus: false,
    };
  },

  saveUserProfile(profile: UserProfile): void {
    const raw = JSON.stringify(profile);
    // Salva no LocalStorage
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, raw);

    // Salva em Cookies (365 dias)
    CookieHelper.set(STORAGE_KEYS.USER_PROFILE, raw);
    if (profile.email) CookieHelper.set('florecer_auth_email', profile.email);
    if (profile.isPurchased) CookieHelper.set('florecer_is_purchased', 'true');
    if (profile.licenseCode) CookieHelper.set('florecer_license_code', profile.licenseCode);
  },

  // Confirmação e Ativação de Compra por E-mail
  confirmPurchase(email: string, name?: string): UserProfile {
    const current = this.getUserProfile();
    const cleanEmail = email.trim().toLowerCase();
    const generatedLicense = `FLO-${Math.floor(10000 + Math.random() * 90000)}-VIP`;

    const updatedProfile: UserProfile = {
      ...current,
      name: name && name.trim() ? name.trim() : (current.name && current.name !== 'Você' ? current.name : cleanEmail.split('@')[0]),
      email: cleanEmail,
      isPurchased: true,
      purchaseDate: new Date().toISOString(),
      licenseCode: current.licenseCode || generatedLicense,
    };

    this.saveUserProfile(updatedProfile);
    CookieHelper.set('florecer_auth_email', cleanEmail);
    CookieHelper.set('florecer_is_purchased', 'true');
    CookieHelper.set('florecer_purchase_date', updatedProfile.purchaseDate!);
    CookieHelper.set('florecer_license_code', updatedProfile.licenseCode!);

    return updatedProfile;
  },

  // --- Lições da Jornada ---
  getCompletedLessons(): number[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS) || localStorage.getItem(LEGACY_STORAGE_KEYS.COMPLETED_LESSONS);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.COMPLETED_LESSONS) || CookieHelper.get(LEGACY_STORAGE_KEYS.COMPLETED_LESSONS);
      if (cookieVal) {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, cookieVal);
        return JSON.parse(cookieVal);
      }
    } catch {
      return [];
    }
    return [];
  },

  setLessonCompleted(dayNumber: number, completed: boolean): number[] {
    const current = this.getCompletedLessons();
    const updated = completed
      ? Array.from(new Set([...current, dayNumber])).sort((a, b) => a - b)
      : current.filter((d) => d !== dayNumber);

    const raw = JSON.stringify(updated);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, raw);
    CookieHelper.set(STORAGE_KEYS.COMPLETED_LESSONS, raw);
    return updated;
  },

  getCurrentDay(): number {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.CURRENT_DAY);
      if (local) return Number(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.CURRENT_DAY);
      if (cookieVal) return Number(cookieVal);
    } catch {}

    const completed = this.getCompletedLessons();
    for (let day = 1; day <= 28; day++) {
      if (!completed.includes(day)) return day;
    }
    return 1;
  },

  setCurrentDay(day: number): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, String(day));
    CookieHelper.set(STORAGE_KEYS.CURRENT_DAY, String(day));
  },

  // --- Check-ins Diários ---
  getDailyCheckins(): DailyCheckin[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.DAILY_CHECKINS);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.DAILY_CHECKINS);
      if (cookieVal) return JSON.parse(cookieVal);
    } catch {
      return [];
    }
    return [];
  },

  getTodayCheckin(): DailyCheckin | null {
    const today = new Date().toISOString().split('T')[0];
    const list = this.getDailyCheckins();
    return list.find((c) => c.date === today) || null;
  },

  saveCheckin(checkin: Omit<DailyCheckin, 'createdAt'>): DailyCheckin {
    const list = this.getDailyCheckins();
    const existingIndex = list.findIndex((c) => c.date === checkin.date);
    const fullCheckin: DailyCheckin = {
      ...checkin,
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      list[existingIndex] = fullCheckin;
    } else {
      list.unshift(fullCheckin);
    }

    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.DAILY_CHECKINS, raw);
    // Salva também nos cookies o último checkin e lista
    CookieHelper.set('florecer_last_checkin', JSON.stringify(fullCheckin));
    CookieHelper.set(STORAGE_KEYS.DAILY_CHECKINS, raw);
    return fullCheckin;
  },

  // --- Evento Rápido na Home ---
  getQuickEvent(): string | null {
    return localStorage.getItem(STORAGE_KEYS.QUICK_EVENT) || CookieHelper.get(STORAGE_KEYS.QUICK_EVENT);
  },

  setQuickEvent(event: string | null): void {
    if (event) {
      localStorage.setItem(STORAGE_KEYS.QUICK_EVENT, event);
      CookieHelper.set(STORAGE_KEYS.QUICK_EVENT, event);
    } else {
      localStorage.removeItem(STORAGE_KEYS.QUICK_EVENT);
      CookieHelper.delete(STORAGE_KEYS.QUICK_EVENT);
    }
  },

  // --- Linha do Tempo ---
  getTimelineEvents(): TimelineEvent[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.TIMELINE_EVENTS);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.TIMELINE_EVENTS);
      if (cookieVal) return JSON.parse(cookieVal);
    } catch {
      return [];
    }
    return [];
  },

  addTimelineEvent(event: Omit<TimelineEvent, 'id'>): TimelineEvent {
    const list = this.getTimelineEvents();
    const newEvent: TimelineEvent = {
      ...event,
      id: 'tle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    };
    list.unshift(newEvent);

    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.TIMELINE_EVENTS, raw);
    CookieHelper.set(STORAGE_KEYS.TIMELINE_EVENTS, raw);
    return newEvent;
  },

  deleteTimelineEvent(id: string): void {
    const list = this.getTimelineEvents().filter((e) => e.id !== id);
    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.TIMELINE_EVENTS, raw);
    CookieHelper.set(STORAGE_KEYS.TIMELINE_EVENTS, raw);
  },

  // --- Diário Privado ---
  getJournalEntries(): JournalEntry[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (cookieVal) return JSON.parse(cookieVal);
    } catch {
      return [];
    }
    return [];
  },

  saveJournalEntry(entry: Omit<JournalEntry, 'id'> & { id?: string }): JournalEntry {
    const list = this.getJournalEntries();
    const id = entry.id || 'jrn_' + Date.now();
    const newEntry: JournalEntry = {
      id,
      date: entry.date || new Date().toISOString(),
      content: entry.content,
      promptUsed: entry.promptUsed,
    };
    const index = list.findIndex((e) => e.id === id);
    if (index >= 0) {
      list[index] = newEntry;
    } else {
      list.unshift(newEntry);
    }

    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, raw);
    CookieHelper.set(STORAGE_KEYS.JOURNAL_ENTRIES, raw);
    return newEntry;
  },

  deleteJournalEntry(id: string): void {
    const list = this.getJournalEntries().filter((e) => e.id !== id);
    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, raw);
    CookieHelper.set(STORAGE_KEYS.JOURNAL_ENTRIES, raw);
  },

  // --- Rascunhos de Mensagens ---
  getMessageDrafts(): MessageDraft[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.MESSAGE_DRAFTS);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.MESSAGE_DRAFTS);
      if (cookieVal) return JSON.parse(cookieVal);
    } catch {
      return [];
    }
    return [];
  },

  saveMessageDraft(draft: Omit<MessageDraft, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): MessageDraft {
    const list = this.getMessageDrafts();
    const now = new Date().toISOString();
    const id = draft.id || 'drf_' + Date.now();
    const existingIndex = list.findIndex((d) => d.id === id);

    let fullDraft: MessageDraft;
    if (existingIndex >= 0) {
      fullDraft = {
        ...list[existingIndex],
        ...draft,
        updatedAt: now,
      };
      list[existingIndex] = fullDraft;
    } else {
      fullDraft = {
        id,
        title: draft.title,
        content: draft.content,
        category: draft.category || 'Geral',
        notes: draft.notes,
        createdAt: now,
        updatedAt: now,
      };
      list.unshift(fullDraft);
    }

    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.MESSAGE_DRAFTS, raw);
    CookieHelper.set(STORAGE_KEYS.MESSAGE_DRAFTS, raw);
    return fullDraft;
  },

  deleteMessageDraft(id: string): void {
    const list = this.getMessageDrafts().filter((d) => d.id !== id);
    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.MESSAGE_DRAFTS, raw);
    CookieHelper.set(STORAGE_KEYS.MESSAGE_DRAFTS, raw);
  },

  // --- Favoritos ---
  getFavorites(): string[] {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(STORAGE_KEYS.FAVORITES);
      if (cookieVal) return JSON.parse(cookieVal);
    } catch {
      return [];
    }
    return [];
  },

  toggleFavorite(id: string): boolean {
    const list = this.getFavorites();
    const exists = list.includes(id);
    const updated = exists ? list.filter((i) => i !== id) : [...list, id];
    const raw = JSON.stringify(updated);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, raw);
    CookieHelper.set(STORAGE_KEYS.FAVORITES, raw);
    return !exists;
  },

  // --- Checklists da Biblioteca ---
  getChecklistState(checklistId: string): string[] {
    try {
      const key = `${STORAGE_KEYS.CHECKLIST_PROGRESS}_${checklistId}`;
      const local = localStorage.getItem(key);
      if (local) return JSON.parse(local);

      const cookieVal = CookieHelper.get(key);
      if (cookieVal) return JSON.parse(cookieVal);
    } catch {
      return [];
    }
    return [];
  },

  toggleChecklistItem(checklistId: string, itemId: string): string[] {
    const checked = this.getChecklistState(checklistId);
    const updated = checked.includes(itemId) ? checked.filter((i) => i !== itemId) : [...checked, itemId];
    const key = `${STORAGE_KEYS.CHECKLIST_PROGRESS}_${checklistId}`;
    const raw = JSON.stringify(updated);
    localStorage.setItem(key, raw);
    CookieHelper.set(key, raw);
    return updated;
  },

  // Limpeza total de dados (Cookies + LocalStorage)
  clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
      CookieHelper.delete(key);
    });
    Object.values(LEGACY_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
      CookieHelper.delete(key);
    });
    CookieHelper.delete('florecer_auth_email');
    CookieHelper.delete('florecer_is_purchased');
    CookieHelper.delete('florecer_license_code');
    CookieHelper.delete('magnetica_auth_email');
    CookieHelper.delete('magnetica_is_purchased');
    CookieHelper.delete('magnetica_license_code');
  },
};
