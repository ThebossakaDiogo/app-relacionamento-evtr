import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  Clock,
  RotateCcw,
  Heart,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { UserProfile, JourneyDay, DailyCheckin } from '../../types';
import { StorageService } from '../../services/storageService';
import { JOURNEY_DAYS } from '../../data/journeyData';
import { GoldenLotusIcon } from '../../components/GoldenLotusIcon';
import { Modal } from '../../components/Modal';
import { SelfCareSection } from '../selfcare/SelfCareSection';

// --- Thumbnails em SVG correspondentes ao Mockup ---

const SunsetWomanThumbnail: React.FC = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 68 68"
    fill="none"
    style={{
      borderRadius: '20px',
      flexShrink: 0,
      boxShadow: '0 6px 18px rgba(184, 56, 94, 0.18)',
    }}
  >
    <defs>
      <linearGradient id="sunset-sky" x1="34" y1="0" x2="34" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE1B8" />
        <stop offset="0.45" stopColor="#F5A096" />
        <stop offset="0.8" stopColor="#B34B73" />
        <stop offset="1" stopColor="#5D264E" />
      </linearGradient>
      <linearGradient id="sunset-sea" x1="34" y1="46" x2="34" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6C2D56" />
        <stop offset="1" stopColor="#3C1635" />
      </linearGradient>
      <radialGradient id="sun-glow" cx="34" cy="38" r="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF2D6" />
        <stop offset="0.5" stopColor="#FCD58E" stopOpacity="0.85" />
        <stop offset="1" stopColor="#F5A096" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="68" height="68" rx="20" fill="url(#sunset-sky)" />
    <circle cx="34" cy="38" r="12" fill="url(#sun-glow)" />
    <circle cx="34" cy="38" r="5" fill="#FFF7E6" />
    <rect y="46" width="68" height="22" fill="url(#sunset-sea)" />
    {/* Reflexos do mar */}
    <ellipse cx="34" cy="49" rx="10" ry="1.2" fill="#FCD58E" opacity="0.7" />
    <ellipse cx="34" cy="54" rx="6" ry="0.9" fill="#FCD58E" opacity="0.5" />
    {/* Silhueta feminina contemplando o horizonte */}
    <path
      d="M23 68C23 58 25 53 27 49C28.5 46 29.8 45 31 43C30 41 30 38 32 36C33.5 34.5 35.8 34.5 37.2 36C38.6 37.5 38.5 40.5 37.5 42.5C38.5 44 40.5 46.5 41.5 49C43.5 54 44.5 60 45.5 68H23Z"
      fill="#281026"
    />
    <path d="M31 36C28.5 36 24 38.5 22 43.5C24.5 42 27.5 41 30 40Z" fill="#281026" />
  </svg>
);

const BotanicalSproutThumbnail: React.FC = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 68 68"
    fill="none"
    style={{
      borderRadius: '20px',
      flexShrink: 0,
      boxShadow: '0 6px 18px rgba(50, 99, 79, 0.16)',
    }}
  >
    <defs>
      <linearGradient id="sprout-bg" x1="0" y1="0" x2="68" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EBF6EF" />
        <stop offset="1" stopColor="#D5ECDE" />
      </linearGradient>
      <linearGradient id="leaf-grad" x1="34" y1="16" x2="34" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E996C" />
        <stop offset="1" stopColor="#2E6945" />
      </linearGradient>
    </defs>
    <rect width="68" height="68" rx="20" fill="url(#sprout-bg)" />
    <path d="M34 54C34 44 34 32 34 22" stroke="#2E6945" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M34 22C34 22 41 16 46 19C48 24 43 30 34 26" fill="url(#leaf-grad)" />
    <path d="M34 34C34 34 24 30 21 37C20 42 27 45 34 38" fill="url(#leaf-grad)" />
    <path d="M34 40C34 40 44 36 46 43C47 48 40 50 34 44" fill="url(#leaf-grad)" />
    <circle cx="48" cy="18" r="1.5" fill="#E5C171" />
    <circle cx="18" cy="28" r="1.5" fill="#E5C171" />
  </svg>
);

const GlowingHeartThumbnail: React.FC = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 68 68"
    fill="none"
    style={{
      borderRadius: '20px',
      flexShrink: 0,
      boxShadow: '0 6px 18px rgba(226, 88, 122, 0.22)',
    }}
  >
    <defs>
      <linearGradient id="heart-bg" x1="0" y1="0" x2="68" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF0F3" />
        <stop offset="1" stopColor="#FCDCE3" />
      </linearGradient>
      <linearGradient id="heart-grad" x1="34" y1="18" x2="34" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F56285" />
        <stop offset="1" stopColor="#B32549" />
      </linearGradient>
      <radialGradient id="heart-aura" cx="34" cy="34" r="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA6BC" stopOpacity="0.55" />
        <stop offset="1" stopColor="#FFA6BC" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="68" height="68" rx="20" fill="url(#heart-bg)" />
    <circle cx="34" cy="34" r="21" fill="url(#heart-aura)" />
    <path
      d="M34 49C34 49 18 39 18 29C18 23 22.5 19 28 19C31.5 19 33.5 21 34 22C34.5 21 36.5 19 40 19C45.5 19 50 23 50 29C50 39 34 49 34 49Z"
      fill="url(#heart-grad)"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(179, 37, 73, 0.35))' }}
    />
    <ellipse cx="27" cy="24" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 27 24)" />
  </svg>
);

const DiaryBookThumbnail: React.FC = () => (
  <svg
    width="68"
    height="68"
    viewBox="0 0 68 68"
    fill="none"
    style={{
      borderRadius: '20px',
      flexShrink: 0,
      boxShadow: '0 6px 18px rgba(156, 42, 71, 0.18)',
    }}
  >
    <defs>
      <linearGradient id="diary-bg" x1="0" y1="0" x2="68" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF2F5" />
        <stop offset="1" stopColor="#F8DCE3" />
      </linearGradient>
      <linearGradient id="book-cover" x1="20" y1="16" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9C2A47" />
        <stop offset="1" stopColor="#6A162D" />
      </linearGradient>
    </defs>
    <rect width="68" height="68" rx="20" fill="url(#diary-bg)" />
    <rect x="20" y="16" width="28" height="36" rx="4" fill="url(#book-cover)" style={{ filter: 'drop-shadow(0 4px 8px rgba(106, 22, 45, 0.3))' }} />
    <line x1="23" y1="16" x2="23" y2="52" stroke="#E5C171" strokeWidth="1.5" />
    <rect x="26" y="20" width="18" height="28" rx="2" stroke="#E5C171" strokeWidth="0.9" fill="none" opacity="0.8" />
    <circle cx="35" cy="34" r="3" fill="#E5C171" opacity="0.9" />
    <path d="M38 48V56L36 54L34 56V48" fill="#E5C171" />
    <path d="M14 42C12 40 13 36 16 37C18 38 18 42 16 43C15 43.5 14 43 14 42Z" fill="#F2A6B8" opacity="0.8" />
    <path d="M52 26C54 28 53 32 50 31C48 30 48 26 50 25C51 24.5 52 25 52 26Z" fill="#F2A6B8" opacity="0.8" />
  </svg>
);

// --- Componente Principal TodayView ---

interface TodayViewProps {
  userProfile: UserProfile;
  currentDay: number;
  completedDays: number[];
  onOpenLesson: (dayNumber: number) => void;
  onNavigateTab: (tab: 'hoje' | 'jornada' | 'apoio' | 'diario' | 'biblioteca' | 'voce') => void;
  onOpenSupportTool?: (toolId: string) => void;
  onShowToast: (msg: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  userProfile,
  currentDay,
  completedDays,
  onOpenLesson,
  onNavigateTab,
  onOpenSupportTool,
  onShowToast,
}) => {
  const [quickEvent, setQuickEvent] = useState<string | null>(() => StorageService.getQuickEvent());
  const [todayCheckin, setTodayCheckin] = useState<DailyCheckin | null>(() => StorageService.getTodayCheckin());
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState<boolean>(false);

  const activeDay: JourneyDay =
    JOURNEY_DAYS.find((d) => d.dayNumber === currentDay) || JOURNEY_DAYS[0];

  const totalDays = 28;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);
  const isLessonCompleted = completedDays.includes(currentDay);

  const handleSelectQuickEvent = (evt: string) => {
    const updated = quickEvent === evt ? null : evt;
    setQuickEvent(updated);
    StorageService.setQuickEvent(updated);
    if (updated) {
      onShowToast(`Acontecimento registrado: "${updated}"`);
    }
  };

  const handleSelectMood = (mood: DailyCheckin['mindLoad']) => {
    const today = new Date().toISOString().split('T')[0];
    const saved = StorageService.saveCheckin({
      date: today,
      mindLoad: mood,
      dominantFeeling: mood,
      contactState: quickEvent || 'Não registrado',
    });
    setTodayCheckin(saved);
    onShowToast('Seu acolhimento de hoje foi registrado com carinho.');
  };

  const userName = userProfile.name && userProfile.name !== 'Você' ? userProfile.name : '';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* 🌸 HEADER PRINCIPAL (Exatamente como o Topo do Mockup) */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px 18px 20px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 244, 242, 0.75) 100%)',
          borderRadius: 'var(--radius-hero)',
          border: '1.5px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Emblema Dourado da Flor de Lótus */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
          <GoldenLotusIcon size={46} />
        </div>

        {/* Título Florecer em Tipografia Editorial */}
        <h1
          className="brand-title"
          style={{
            fontSize: '38px',
            margin: '0 0 4px',
            lineHeight: 1.1,
            color: 'var(--primary)',
          }}
        >
          Florecer
        </h1>

        {/* Frase Acolhedora do Mockup */}
        <p
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '17px',
            color: 'var(--text)',
            margin: '0 0 10px',
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {userName ? `Oi, ${userName}! ` : 'Oi, '}você está fazendo um lindo trabalho. ♡
        </p>

        {/* Slogan com Dourado */}
        <small
          style={{
            display: 'block',
            color: 'var(--gold-decorative)',
            fontStyle: 'italic',
            fontSize: '13px',
            letterSpacing: '0.02em',
            marginBottom: '16px',
            fontWeight: 600,
          }}
        >
          Do fim, para um novo florescer ♡
        </small>

        {/* Pill de Status da Jornada */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border)',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--primary)',
            boxShadow: '0 2px 8px rgba(156, 42, 71, 0.05)',
          }}
        >
          <Clock size={13} />
          <span>Dia {currentDay} de 28 • {progressPercent}% concluído</span>
          {isLessonCompleted && <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓ Feito</span>}
        </div>
      </div>

      {/* 🧭 OS 4 CARDS DOPAMINÉRGICOS PRINCIPAIS (Idênticos ao Mockup do Celular) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* CARD 1: MAPA DO SEU MOMENTO */}
        <div
          className="card-dopamine"
          onClick={() => setIsDiagnosticModalOpen(true)}
          role="button"
          tabIndex={0}
        >
          <SunsetWomanThumbnail />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
              Mapa do Seu Momento
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Entenda o que você sente e onde quer chegar.
            </p>
            {userProfile.relationshipContext && (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--gold-decorative)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {userProfile.relationshipContext.phaseName}
              </span>
            )}
          </div>
          <div className="dopamine-arrow-btn">
            <ChevronRight size={19} />
          </div>
        </div>

        {/* CARD 2: JORNADA DE 28 DIAS */}
        <div
          className="card-dopamine"
          onClick={() => onOpenLesson(currentDay)}
          role="button"
          tabIndex={0}
        >
          <BotanicalSproutThumbnail />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
              Jornada de 28 Dias
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Pequenos passos para um grande recomeço.
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary)',
              }}
            >
              Missão de hoje: Dia {activeDay.dayNumber} ({activeDay.durationMinutes} min)
            </span>
          </div>
          <div className="dopamine-arrow-btn">
            <ChevronRight size={19} />
          </div>
        </div>

        {/* CARD 3: SOS EMOCIONAL */}
        <div
          className="card-dopamine"
          onClick={() => onNavigateTab('apoio')}
          role="button"
          tabIndex={0}
        >
          <GlowingHeartThumbnail />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
              SOS Emocional
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Acolhimento imediato quando você mais precisa.
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--rose-vibrant)',
              }}
            >
              Respiração • Modelos de Mensagem • Análises
            </span>
          </div>
          <div className="dopamine-arrow-btn">
            <ChevronRight size={19} />
          </div>
        </div>

        {/* CARD 4: DIÁRIO ÍNTIMO */}
        <div
          className="card-dopamine"
          onClick={() => onNavigateTab('diario')}
          role="button"
          tabIndex={0}
        >
          <DiaryBookThumbnail />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
              Diário Íntimo
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Um espaço só seu para sentir, escrever e se libertar.
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary)',
              }}
            >
              100% Confidencial no seu celular
            </span>
          </div>
          <div className="dopamine-arrow-btn">
            <ChevronRight size={19} />
          </div>
        </div>
      </div>

      {/* 🌸 ESPAÇO DE AUTOCUIDADO & SOBERANIA (Dopaminérgico) */}
      <SelfCareSection
        onShowToast={onShowToast}
        onOpenSupportTool={onOpenSupportTool}
      />

      {/* 💭 CHECK-IN EMOCIONAL INTERATIVO (Termômetro do Coração) */}
      <div
        className="card"
        style={{
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--rose-vibrant)' }}>TERMÔMETRO DO CORAÇÃO</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '17px' }}>Como seu peito está agora?</h3>
          </div>
          <span className="pill pill-gold" style={{ fontSize: '10px' }}>
            {todayCheckin ? 'Registrado hoje' : 'Toque para acolher'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
          {[
            { label: 'Muito difícil', emoji: '💔', text: 'Machucada' },
            { label: 'Difícil', emoji: '⚡', text: 'Ansiosa' },
            { label: 'Neutro', emoji: '💭', text: 'Pensativa' },
            { label: 'Bem', emoji: '🕊️', text: 'Serena' },
            { label: 'Muito bem', emoji: '🌸', text: 'Florescendo' },
          ].map((item) => {
            const isSelected = todayCheckin?.mindLoad === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleSelectMood(item.label as any)}
                style={{
                  background: isSelected ? 'var(--primary-soft)' : 'transparent',
                  border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '10px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  color: isSelected ? 'var(--primary)' : 'var(--text)',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: '22px', lineHeight: 1 }}>{item.emoji}</span>
                <span style={{ fontSize: '11px', textAlign: 'center', lineHeight: 1.2 }}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ⚡ REGISTRO DE ACONTECIMENTO RECENTE (Interativo) */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span className="eyebrow">ACONTECIMENTO RECENTE</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '17px' }}>Algo novo aconteceu hoje?</h3>
          </div>
          {quickEvent && (
            <button
              onClick={() => handleSelectQuickEvent(quickEvent)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '11px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RotateCcw size={12} /> Limpar
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            'Ele me chamou',
            'Eu mandei mensagem',
            'Não houve contato',
            'Tivemos uma conversa',
            'Nada mudou',
          ].map((item) => {
            const isSelected = quickEvent === item;
            return (
              <button
                key={item}
                onClick={() => handleSelectQuickEvent(item)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--primary-soft)' : 'var(--surface)',
                  color: isSelected ? 'var(--primary)' : 'var(--text)',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Card Adaptativo de Resposta Imediata */}
        {quickEvent === 'Ele me chamou' && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '14px',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-soft)',
              border: '1px solid var(--rose-decorative)',
            }}
          >
            <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: 'var(--primary)' }}>
              Antes de responder: separe fatos de expectativas
            </h4>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
              Respire fundo. Não responda no calor do momento. Vamos escolher a postura mais consciente e elegante para o seu caso.
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onOpenSupportTool ? onOpenSupportTool('ele-me-chamou') : onNavigateTab('apoio')}
            >
              Analisar contato no SOS <ArrowRight size={14} />
            </button>
          </div>
        )}

        {quickEvent === 'Eu mandei mensagem' && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '14px',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'var(--gold-soft)',
              border: '1px solid var(--gold-decorative)',
            }}
          >
            <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: 'var(--warning)' }}>
              Você enviou. Agora dê tempo e proteja sua paz.
            </h4>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
              Evite olhar o WhatsApp a cada 2 minutos. A sua dignidade permanece intacta. Descanse o telefone por alguns instantes.
            </p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenSupportTool ? onOpenSupportTool('90-segundos') : onNavigateTab('apoio')}
            >
              Pausa guiada de 90 segundos <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* 🪷 OS 4 PILARES DO FLORECER (Idênticos aos badges do poster na imagem) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          padding: '14px 10px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--gold-decorative)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--gold-soft)',
            }}
          >
            <GoldenLotusIcon size={22} hasGlow={false} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--primary)', lineHeight: 1.2 }}>
            MAIS EQUILÍBRIO
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--rose-decorative)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary)',
            }}
          >
            <Heart size={20} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--primary)', lineHeight: 1.2 }}>
            MAIS AUTOESTIMA
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--gold-decorative)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--gold-soft)',
              color: 'var(--gold-decorative)',
            }}
          >
            <Sparkles size={20} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--primary)', lineHeight: 1.2 }}>
            MAIS CLAREZA
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--success-soft)',
              color: 'var(--success)',
            }}
          >
            <Compass size={20} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--primary)', lineHeight: 1.2 }}>
            MAIS RECOMEÇOS
          </span>
        </div>
      </div>

      {/* ♡ BANNER DE AFIRMAÇÃO FINAL (Frase do Poster) */}
      <div
        style={{
          textAlign: 'center',
          padding: '18px 16px',
          background: 'linear-gradient(135deg, #9C2A47 0%, #6A162D 100%)',
          borderRadius: '24px',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-floating)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-brand)',
            fontStyle: 'italic',
            fontSize: '16px',
            display: 'block',
            marginBottom: '4px',
            letterSpacing: '0.02em',
          }}
        >
          Um novo capítulo sempre é possível ♡
        </span>
        <small
          style={{
            display: 'block',
            fontSize: '9px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: 0.85,
            fontWeight: 700,
          }}
        >
          Cura • Clareza • Autoconexão • Recomeço • Você de Novo
        </small>
      </div>

      {/* MODAL DETALHADO DO MAPA DO SEU MOMENTO */}
      <Modal
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
        title="Mapa do Seu Momento"
        eyebrow="SEU DIAGNÓSTICO ATUAL"
      >
        {userProfile.relationshipContext ? (
          <div>
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--primary-soft)',
                borderRadius: '16px',
                marginBottom: '16px',
                border: '1px solid var(--rose-decorative)',
              }}
            >
              <span className="pill pill-gold" style={{ marginBottom: '8px' }}>
                {userProfile.relationshipContext.phaseName}
              </span>
              <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                {userProfile.relationshipContext.explanation}
              </p>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <strong style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                Foco Principal Agora:
              </strong>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
                {userProfile.relationshipContext.focus}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong style={{ fontSize: '12px', color: 'var(--gold-decorative)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                Primeiro Passo Recomendado:
              </strong>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
                {userProfile.relationshipContext.firstStep}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsDiagnosticModalOpen(false);
                  onNavigateTab('voce');
                }}
              >
                Refazer questionário
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setIsDiagnosticModalOpen(false);
                  onOpenLesson(currentDay);
                }}
              >
                Continuar lição de hoje <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '14px' }}>
              Você ainda não respondeu as 8 perguntas do Mapa do Momento.
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsDiagnosticModalOpen(false);
                onNavigateTab('voce');
              }}
            >
              Iniciar Mapa do Momento
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
