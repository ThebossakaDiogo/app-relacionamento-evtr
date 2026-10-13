import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { JourneyDay } from '../../types';
import { JOURNEY_DAYS } from '../../data/journeyData';
import { StorageService } from '../../services/storageService';

interface JourneyViewProps {
  currentDay: number;
  completedDays: number[];
  onOpenLesson: (dayNumber: number) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({
  currentDay,
  completedDays,
  onOpenLesson,
}) => {
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    '01. Estabilizar': true,
    '02. Reposicionar': true,
    '03. Contacto con intención': true,
    '04. Reciprocidad y decisión': true,
  });

  const togglePhase = (phaseName: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseName]: !prev[phaseName] }));
  };

  const phases = [
    {
      name: '01. Estabilizar',
      subtitle: 'Reducir decisiones automáticas y organizar los hechos',
      days: JOURNEY_DAYS.slice(0, 7),
    },
    {
      name: '02. Reposicionar',
      subtitle: 'Retomar rutina, autonomía y observar patrones reales',
      days: JOURNEY_DAYS.slice(7, 14),
    },
    {
      name: '03. Contacto con intención',
      subtitle: 'Decidir si, por qué y cómo mantener la comunicación',
      days: JOURNEY_DAYS.slice(14, 21),
    },
    {
      name: '04. Reciprocidad y decisión',
      subtitle: 'Evaluar consistencia, límites, reconciliación o continuidad',
      days: JOURNEY_DAYS.slice(21, 28),
    },
  ];

  const totalCompleted = completedDays.length;
  const progressPercent = Math.round((totalCompleted / 28) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro */}
      <div>
        <span className="eyebrow">TU JORNADA</span>
        <h1 style={{ margin: '6px 0 8px', fontSize: '32px' }}>
          Tu plan de 28 días.
        </h1>
        <p style={{ fontSize: '15px' }}>
          Cuatro fases estructuradas para guiar decisiones, comunicación y reciprocidad a tu propio ritmo.
        </p>
      </div>

      {/* Progress Summary Card */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
        }}
      >
        <div>
          <strong style={{ fontSize: '16px', display: 'block', color: 'var(--text)' }}>
            Has completado {totalCompleted} de 28 pasos
          </strong>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {progressPercent}% de tu viaje recorrido
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="pill pill-gold">{progressPercent}% Completado</span>
        </div>
      </div>

      {/* Phases Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {phases.map((phase, pIdx) => {
          const isExpanded = expandedPhases[phase.name];
          const phaseCompletedCount = phase.days.filter((d) => completedDays.includes(d.dayNumber)).length;

          return (
            <div
              key={phase.name}
              className="card"
              style={{
                padding: '20px 22px',
                border: '1px solid var(--border)',
              }}
            >
              {/* Header da Fase */}
              <div
                onClick={() => togglePhase(phase.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '22px', margin: 0 }}>{phase.name}</h2>
                    <span
                      className="pill pill-outline"
                      style={{ fontSize: '11px', padding: '3px 8px' }}
                    >
                      {phaseCompletedCount} de 7
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', margin: '4px 0 0', color: 'var(--text-muted)' }}>
                    {phase.subtitle}
                  </p>
                </div>

                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                  aria-label="Alternar fase"
                >
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Lista dos Dias da Fase */}
              {isExpanded && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '16px',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '8px',
                  }}
                >
                  {phase.days.map((day) => {
                    const isCompleted = completedDays.includes(day.dayNumber);
                    const isCurrent = day.dayNumber === currentDay;

                    return (
                      <button
                        key={day.dayNumber}
                        onClick={() => onOpenLesson(day.dayNumber)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '14px 6px',
                          border: 'none',
                          borderBottom: '1px solid var(--border-light)',
                          backgroundColor: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                          borderRadius: '12px',
                        }}
                      >
                        {/* Day Number Badge */}
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '13px',
                            fontWeight: 700,
                            backgroundColor: isCompleted
                              ? 'var(--success-soft)'
                              : isCurrent
                              ? 'var(--primary)'
                              : 'transparent',
                            color: isCompleted
                              ? 'var(--success)'
                              : isCurrent
                              ? '#FFFDFA'
                              : 'var(--text-muted)',
                            border: isCompleted || isCurrent ? 'none' : '1px solid var(--border)',
                          }}
                        >
                          {isCompleted ? <CheckCircle2 size={18} /> : day.dayNumber}
                        </div>

                        {/* Title and duration */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <strong
                            style={{
                              display: 'block',
                              fontSize: '14px',
                              color: 'var(--text)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {day.title}
                          </strong>
                          <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                            Día {day.dayNumber} · {day.durationMinutes} min de lectura
                            {isCurrent ? ' · (Tu día actual)' : ''}
                          </small>
                        </div>

                        <ArrowRight size={15} color="var(--primary)" style={{ opacity: 0.6 }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
