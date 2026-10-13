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
  NO_CONTACT_START: 'florecer_no_contact_start',
  NO_CONTACT_BEST: 'florecer_no_contact_best',
  SELFCARE_HABITS: 'florecer_selfcare',
  FAVORITE_AFFIRMATIONS: 'florecer_fav_affirmations',
  SELFCARE_STATS: 'florecer_selfcare_stats',
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

// Motor de Personalização Determinística
export function computeRelationshipContext(answers: OnboardingAnswers): RelationshipContext {
  if (answers.safetyFlag) {
    return {
      phase: 'safety',
      phaseName: 'Cuidado y Seguridad',
      focus: 'Proteger tu bienestar físico y emocional.',
      firstStep: 'Buscar apoyo profesional y mantener distancia segura de cualquier situación de riesgo.',
      explanation: 'Identificamos situaciones que exigen máxima prioridad en tu seguridad. El plan se enfoca en límites firmes y autocuidado.',
      ruleVersion: 'v1.0',
    };
  }

  const elapsed = answers.elapsedTime || '';
  const diff = answers.mainDifficulty || '';
  const contact = answers.contactPattern || '';
  const lastInt = answers.lastInteraction || '';
  const outcome = answers.desiredOutcome || '';
  const sit = answers.situation || '';

  if (
    elapsed === 'Menos de 7 dias' ||
    elapsed === 'Menos de 7 días' ||
    diff.includes('Resistir') ||
    diff.includes('Medo') ||
    diff.includes('Miedo')
  ) {
    return {
      phase: 'stabilize',
      phaseName: 'Fase 1: Estabilizar',
      focus: 'No buscar una respuesta inmediata para todo y reducir impulsos.',
      firstStep: '24 horas sin decisiones impulsivas de contacto o revisión del teléfono.',
      explanation: 'Estás viviendo el impacto inmediato o momentos de alta incertidumbre. Tu plan comienza calmando la urgencia y separando hechos de expectativas.',
      ruleVersion: 'v1.0',
    };
  }

  if (
    contact.includes('Nenhum contato') ||
    contact.includes('Sin contacto') ||
    elapsed === '1–3 meses' ||
    outcome.includes('Seguir em frente') ||
    outcome.includes('Seguir adelante')
  ) {
    return {
      phase: 'reposition',
      phaseName: 'Fase 2: Reposicionar',
      focus: 'Retomar tu rutina, autonomía y observar patrones reales.',
      firstStep: 'Definir una prioridad personal para esta semana que no dependa de él.',
      explanation: 'El momento pide recuperar tu rutina y fortalecer tu independencia emocional antes de cualquier paso de comunicación.',
      ruleVersion: 'v1.0',
    };
  }

  if (
    lastInt.includes('procurou') ||
    lastInt.includes('buscó') ||
    lastInt.includes('Conversa carinhosa') ||
    lastInt.includes('Conversación cariñosa') ||
    contact.includes('Ainda conversamos') ||
    contact.includes('Seguimos hablando')
  ) {
    return {
      phase: 'contact',
      phaseName: 'Fase 3: Contacto con Intención',
      focus: 'Decidir si, por qué y cómo mantener o responder a la comunicación.',
      firstStep: 'Aclarar el objetivo concreto de cualquier mensaje antes de escribir.',
      explanation: 'Hay apertura o interacciones recientes ocurriendo. El enfoque es responder con propósito y madurez, sin crear significado anticipado.',
      ruleVersion: 'v1.0',
    };
  }

  if (
    outcome.includes('reconstruir') ||
    sit.includes('recomeçar') ||
    sit.includes('recomenzar') ||
    sit.includes('empezar de nuevo')
  ) {
    return {
      phase: 'reciprocity',
      phaseName: 'Fase 4: Reciprocidad y Decisión',
      focus: 'Evaluar consistencia, cambios concretos y límites mutuos.',
      firstStep: 'Usar el checklist "Antes de Recomenzar" para analizar actitudes reales versus palabras.',
      explanation: 'Existe intención o posibilidad de recomenzar. Es fundamental analizar si hay responsabilidad mutua antes de reabrir la relación.',
      ruleVersion: 'v1.0',
    };
  }

  return {
    phase: 'stabilize',
    phaseName: 'Fase 1: Estabilizar',
    focus: 'Claridad paso a paso, un día a la vez.',
    firstStep: 'Organizar tus sentimientos y leer la primera lección de 4 minutos.',
    explanation: 'Tu plan fue configurado para ofrecer apoyo estructurado y sin complicaciones.',
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
      name: 'Tú',
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
      name: name && name.trim() ? name.trim() : (current.name && current.name !== 'Você' && current.name !== 'Tú' ? current.name : cleanEmail.split('@')[0]),
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
        category: draft.category || 'General',
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

  // --- Contador de dias sem contato ---
  getNoContactStart(): string | null {
    return localStorage.getItem(STORAGE_KEYS.NO_CONTACT_START) || CookieHelper.get(STORAGE_KEYS.NO_CONTACT_START);
  },

  getNoContactDays(): number {
    const start = this.getNoContactStart();
    if (!start) return 0;
    const diff = Date.now() - new Date(start).getTime();
    return Math.max(0, Math.floor(diff / 864e5));
  },

  getNoContactBest(): number {
    const raw = localStorage.getItem(STORAGE_KEYS.NO_CONTACT_BEST) || CookieHelper.get(STORAGE_KEYS.NO_CONTACT_BEST);
    return raw ? Number(raw) || 0 : 0;
  },

  startNoContact(): void {
    const iso = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.NO_CONTACT_START, iso);
    CookieHelper.set(STORAGE_KEYS.NO_CONTACT_START, iso);
  },

  resetNoContact(): void {
    const current = this.getNoContactDays();
    if (current > this.getNoContactBest()) {
      localStorage.setItem(STORAGE_KEYS.NO_CONTACT_BEST, String(current));
      CookieHelper.set(STORAGE_KEYS.NO_CONTACT_BEST, String(current));
    }
    this.startNoContact();
  },

  // --- Hábitos de autocuidado diários ---
  getSelfCareHabits(date: string): string[] {
    const key = `${STORAGE_KEYS.SELFCARE_HABITS}_${date}`;
    try {
      const raw = localStorage.getItem(key) || CookieHelper.get(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  toggleSelfCareHabit(date: string, habitId: string): string[] {
    const current = this.getSelfCareHabits(date);
    const updated = current.includes(habitId) ? current.filter((h) => h !== habitId) : [...current, habitId];
    const key = `${STORAGE_KEYS.SELFCARE_HABITS}_${date}`;
    const raw = JSON.stringify(updated);
    localStorage.setItem(key, raw);
    // Cookie com validade curta (30 dias) para não acumular um cookie por dia
    CookieHelper.set(key, raw, 30);
    return updated;
  },

  // --- Afirmações favoritas ---
  getFavoriteAffirmations(): number[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_AFFIRMATIONS) || CookieHelper.get(STORAGE_KEYS.FAVORITE_AFFIRMATIONS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  toggleFavoriteAffirmation(index: number): number[] {
    const current = this.getFavoriteAffirmations();
    const updated = current.includes(index) ? current.filter((i) => i !== index) : [...current, index];
    const raw = JSON.stringify(updated);
    localStorage.setItem(STORAGE_KEYS.FAVORITE_AFFIRMATIONS, raw);
    CookieHelper.set(STORAGE_KEYS.FAVORITE_AFFIRMATIONS, raw);
    return updated;
  },

  // --- Estatísticas de autocuidado (para conquistas) ---
  getSelfCareStats(): { breathSessions: number; lettersReleased: number; habitsDone: number } {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SELFCARE_STATS) || CookieHelper.get(STORAGE_KEYS.SELFCARE_STATS);
      if (raw) return { breathSessions: 0, lettersReleased: 0, habitsDone: 0, ...JSON.parse(raw) };
    } catch {}
    return { breathSessions: 0, lettersReleased: 0, habitsDone: 0 };
  },

  incrementSelfCareStat(stat: 'breathSessions' | 'lettersReleased' | 'habitsDone', amount = 1): void {
    const stats = this.getSelfCareStats();
    stats[stat] = Math.max(0, stats[stat] + amount);
    const raw = JSON.stringify(stats);
    localStorage.setItem(STORAGE_KEYS.SELFCARE_STATS, raw);
    CookieHelper.set(STORAGE_KEYS.SELFCARE_STATS, raw);
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
