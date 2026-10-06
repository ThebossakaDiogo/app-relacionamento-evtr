import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookMarked,
  HelpCircle,
} from 'lucide-react';
import { JourneyDay } from '../../types';
import { StorageService } from '../../services/storageService';

interface LessonReaderProps {
  day: JourneyDay;
  isCompleted: boolean;
  onToggleComplete: (dayNumber: number, completed: boolean) => void;
  onClose: () => void;
  onNavigateDay: (dayNumber: number) => void;
  onOpenDiaryWithPrompt?: (prompt: string) => void;
  onShowToast: (msg: string) => void;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  day,
  isCompleted,
  onToggleComplete,
  onClose,
  onNavigateDay,
  onOpenDiaryWithPrompt,
  onShowToast,
}) => {
  const [reflectionAnswer, setReflectionAnswer] = useState<string>('');

  const handleToggle = () => {
    const nextState = !isCompleted;
    onToggleComplete(day.dayNumber, nextState);
    if (nextState) {
      onShowToast(`Dia ${day.dayNumber} concluído! Parabéns pelo seu avanço.`);
    }
  };

  const handleSaveReflection = () => {
    if (!reflectionAnswer.trim()) return;
    StorageService.saveJournalEntry({
      date: new Date().toISOString(),
      content: reflectionAnswer.trim(),
      promptUsed: day.reflectionPrompt,
    });
    setReflectionAnswer('');
    onShowToast('Reflexão guardada no seu Diário Privado com sucesso!');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg)',
        zIndex: 9500,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="animate-fade-in"
    >
      {/* Top Bar Sticky */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(247, 243, 239, 0.96)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--primary)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} /> Voltar à Jornada
        </button>

        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
          DIA {day.dayNumber} DE 28
        </span>

        <button
          onClick={handleToggle}
          style={{
            background: isCompleted ? 'var(--success-soft)' : 'var(--primary-soft)',
            color: isCompleted ? 'var(--success)' : 'var(--primary)',
            border: 'none',
            borderRadius: '99px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {isCompleted ? <CheckCircle2 size={15} /> : null}
          {isCompleted ? 'Concluído' : 'Marcar concluído'}
        </button>
      </div>

      {/* Main Reading Container (Max reading width 680px for luxury editorial comfort) */}
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          margin: '0 auto',
          padding: '36px 20px 80px',
          lineHeight: '1.7',
        }}
      >
        {/* Lesson Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="eyebrow">{day.phase}</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> {day.durationMinutes} min de leitura
            </span>
          </div>

          <h1
            style={{
              fontSize: '34px',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            {day.title}
          </h1>

          {/* Objective Box */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderLeft: '3px solid var(--primary)',
              padding: '16px 20px',
              borderRadius: '0 16px 16px 0',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--primary)', marginBottom: '4px' }}>
              Objetivo de hoje
            </strong>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--text)' }}>
              {day.objective}
            </p>
          </div>
        </div>

        {/* Body Text */}
        <div
          style={{
            fontSize: '16px',
            color: 'var(--text)',
            whiteSpace: 'pre-line',
            marginBottom: '32px',
          }}
        >
          {day.bodyText}
        </div>

        {/* Example Box */}
        {day.example && (
          <div
            className="card"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '22px',
              marginBottom: '28px',
            }}
          >
            <span className="eyebrow" style={{ color: 'var(--gold-decorative)', display: 'block', marginBottom: '8px' }}>
              EXEMPLO CONCRETO
            </span>
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--text)', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
              "{day.example}"
            </p>
          </div>
        )}

        {/* Exercise Box */}
        {day.exercise && (
          <div
            className="card"
            style={{
              backgroundColor: '#FAF6F4',
              border: '1.5px solid var(--rose-decorative)',
              padding: '24px',
              marginBottom: '28px',
            }}
          >
            <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              EXERCÍCIO DE HOJE
            </span>
            <div style={{ fontSize: '15px', color: 'var(--text)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
              {day.exercise}
            </div>
          </div>
        )}

        {/* Action Box */}
        {day.action && (
          <div
            style={{
              backgroundColor: 'var(--primary-soft)',
              padding: '20px 22px',
              borderRadius: 'var(--radius-card)',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}
          >
            <Sparkles size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '14px', color: 'var(--primary)', marginBottom: '4px' }}>
                Ação do dia
              </strong>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
                {day.action}
              </p>
            </div>
          </div>
        )}

        {/* Reflection Section */}
        {day.reflectionPrompt && (
          <div
            className="card"
            style={{
              padding: '24px',
              marginBottom: '36px',
            }}
          >
            <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              REFLEXÃO OPCIONAL
            </span>
            <h3 style={{ fontSize: '18px', margin: '0 0 12px' }}>
              "{day.reflectionPrompt}"
            </h3>
            <textarea
              placeholder="Escreva sua reflexão sincera aqui (salva no seu diário privado)..."
              value={reflectionAnswer}
              onChange={(e) => setReflectionAnswer(e.target.value)}
              style={{ marginBottom: '14px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveReflection}
                disabled={!reflectionAnswer.trim()}
                style={{ opacity: reflectionAnswer.trim() ? 1 : 0.6 }}
              >
                Salvar no Diário
              </button>
            </div>
          </div>
        )}

        {/* Complete Lesson CTA */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button
            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleToggle}
            style={{ minWidth: '260px', fontSize: '15px' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Lição Concluída (Clique para desmarcar)' : 'Concluir Meu Passo de Hoje'}
          </button>
        </div>

        {/* Bottom Navigation between days */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
          }}
        >
          <button
            onClick={() => onNavigateDay(day.dayNumber - 1)}
            disabled={day.dayNumber <= 1}
            style={{
              background: 'none',
              border: 'none',
              color: day.dayNumber <= 1 ? 'var(--text-subtle)' : 'var(--primary)',
              cursor: day.dayNumber <= 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} /> Dia anterior
          </button>

          <button
            onClick={() => onNavigateDay(day.dayNumber + 1)}
            disabled={day.dayNumber >= 28}
            style={{
              background: 'none',
              border: 'none',
              color: day.dayNumber >= 28 ? 'var(--text-subtle)' : 'var(--primary)',
              cursor: day.dayNumber >= 28 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Próximo dia <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
