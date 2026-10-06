import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  BookMarked,
  ShieldAlert,
  Flame,
  RotateCcw,
} from 'lucide-react';
import { UserProfile, JourneyDay, DailyCheckin } from '../../types';
import { StorageService } from '../../services/storageService';
import { JOURNEY_DAYS } from '../../data/journeyData';

interface TodayViewProps {
  userProfile: UserProfile;
  currentDay: number;
  completedDays: number[];
  onOpenLesson: (dayNumber: number) => void;
  onNavigateTab: (tab: 'hoje' | 'jornada' | 'apoio' | 'biblioteca' | 'voce') => void;
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
    onShowToast('Check-in de hoje registrado com sucesso.');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro Header */}
      <div>
        <span className="eyebrow">SEU MOMENTO DE HOJE</span>
        <h1 style={{ margin: '6px 0 8px', fontSize: '32px' }}>
          O próximo passo começa com clareza.
        </h1>
        <p style={{ fontSize: '15px' }}>
          Olá, {userProfile.name || 'você'}. Veja a sua missão e o que faz sentido fazer hoje.
        </p>
      </div>

      {/* Hero Card: Missão de Hoje */}
      <div
        className="hero"
        style={{
          background: 'linear-gradient(135deg, #66384A 0%, #4A2333 100%)',
          borderRadius: 'var(--radius-hero)',
          padding: '28px 24px',
          color: '#FFFDFA',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-floating)',
        }}
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: 'absolute',
            right: '-30px',
            top: '-30px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '20px',
            bottom: '-40px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#EFE3E7',
              }}
            >
              {activeDay.phase.toUpperCase()} · DIA {activeDay.dayNumber}
            </span>
            <span
              style={{
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#EFE3E7',
                backgroundColor: 'rgba(255,255,255,0.12)',
                padding: '4px 10px',
                borderRadius: '12px',
              }}
            >
              <Clock size={13} /> {activeDay.durationMinutes} min
            </span>
          </div>

          <h2
            style={{
              fontSize: '28px',
              color: '#FFFDFA',
              margin: '0 0 10px',
              lineHeight: 1.2,
              maxWidth: '520px',
            }}
          >
            {activeDay.title}
          </h2>

          <p
            style={{
              color: '#F1E2E8',
              fontSize: '14px',
              lineHeight: 1.5,
              marginBottom: '22px',
              maxWidth: '480px',
            }}
          >
            {activeDay.objective}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <button
              className="btn btn-light"
              onClick={() => onOpenLesson(activeDay.dayNumber)}
              style={{ padding: '12px 22px', fontSize: '14px' }}
            >
              {isLessonCompleted ? (
                <>
                  <CheckCircle size={17} color="#32634F" /> Rever missão de hoje
                </>
              ) : (
                <>
                  Começar missão · {activeDay.durationMinutes} min <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '10px' }}>
            <div
              style={{
                height: '4px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '99px',
                overflow: 'hidden',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: '#E1C5CD',
                  width: `${progressPercent}%`,
                  borderRadius: '99px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#EFE3E7' }}>
              <span>{completedDays.length} de 28 passos concluídos</span>
              <span>{progressPercent}% da jornada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Evento Rápido */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <span className="eyebrow">ACONTECIMENTO RECENTE</span>
            <h3 style={{ margin: '4px 0 0', fontSize: '18px' }}>Algo mudou entre vocês?</h3>
          </div>
          {quickEvent && (
            <button
              onClick={() => handleSelectQuickEvent(quickEvent)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
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
                  padding: '9px 16px',
                  borderRadius: '999px',
                  border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--primary-soft)' : 'var(--surface)',
                  color: isSelected ? 'var(--primary)' : 'var(--text)',
                  fontSize: '13px',
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
      </div>

      {/* Card Adaptativo baseado no acontecimento selecionado */}
      {quickEvent === 'Ele me chamou' && (
        <div
          className="card animate-fade-in"
          style={{
            backgroundColor: '#FFFDFA',
            border: '1.5px solid var(--rose-decorative)',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill pill-gold" style={{ fontSize: '11px' }}>
              ORIENTAÇÃO DE CONTATO
            </span>
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: 'var(--primary)' }}>
            Antes de responder: separe fatos de interpretações
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
            Uma mensagem dele pode despertar uma enxurrada de expectativas. Antes de digitar, vamos separar o que ele realmente disse do que o seu coração espera que isso signifique.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => onOpenSupportTool ? onOpenSupportTool('ele-me-chamou') : onNavigateTab('apoio')}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            Analisar contato no Apoio <ArrowRight size={15} />
          </button>
        </div>
      )}

      {quickEvent === 'Eu mandei mensagem' && (
        <div
          className="card animate-fade-in"
          style={{
            backgroundColor: '#FFFDFA',
            border: '1.5px solid var(--rose-decorative)',
            padding: '24px',
          }}
        >
          <span className="pill" style={{ marginBottom: '8px' }}>
            ACOLHIMENTO E PAUSA
          </span>
          <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: 'var(--primary)' }}>
            Você enviou. Agora dê tempo ao tempo.
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
            Evite checar a conversa a cada dois minutos ou mandar novas mensagens para justificar o que escreveu. A sua dignidade permanece intacta. Descanse o celular.
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => onOpenSupportTool ? onOpenSupportTool('90-segundos') : onNavigateTab('apoio')}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            Fazer pausa de 90 segundos <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Check-in Diário */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Como você está chegando hoje?</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {todayCheckin ? 'Check-in de hoje registrado' : 'Seu termômetro de bem-estar'}
            </span>
          </div>
          <span className="pill pill-outline">Diário</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            marginTop: '8px',
          }}
        >
          {[
            { label: 'Muito difícil', symbol: '◡' },
            { label: 'Difícil', symbol: '◔' },
            { label: 'Neutro', symbol: '○' },
            { label: 'Bem', symbol: '◕' },
            { label: 'Muito bem', symbol: '●' },
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
                  padding: '12px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface)',
                    color: isSelected ? '#FFFDFA' : 'var(--text)',
                  }}
                >
                  {item.symbol}
                </span>
                <span style={{ fontSize: '11px', textAlign: 'center', lineHeight: '1.2' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Atalhos Rápidos de Apoio */}
      <div className="card">
        <span className="eyebrow">NO SEU TEMPO</span>
        <h3 style={{ margin: '6px 0 16px', fontSize: '20px' }}>Ferramentas para agora</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => onOpenSupportTool ? onOpenSupportTool('devo-mandar') : onNavigateTab('apoio')}
            className="card-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text)' }}>
                  Devo mandar mensagem?
                </strong>
                <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Entenda a sua intenção antes de iniciar contato
                </small>
              </div>
            </div>
            <ArrowRight size={16} color="var(--primary)" />
          </button>

          <button
            onClick={() => onOpenSupportTool ? onOpenSupportTool('90-segundos') : onNavigateTab('apoio')}
            className="card-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--gold-soft)',
                  color: 'var(--gold-decorative)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flame size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text)' }}>
                  Quero falar com ele agora
                </strong>
                <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Pausa de 90 segundos para interromper o impulso
                </small>
              </div>
            </div>
            <ArrowRight size={16} color="var(--primary)" />
          </button>

          <button
            onClick={() => onNavigateTab('voce')}
            className="card-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--success-soft)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BookMarked size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text)' }}>
                  Meu Diário Privado
                </strong>
                <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Um espaço seguro para expressar sentimentos
                </small>
              </div>
            </div>
            <ArrowRight size={16} color="var(--primary)" />
          </button>
        </div>
      </div>
    </div>
  );
};
