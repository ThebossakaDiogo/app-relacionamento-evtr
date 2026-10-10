import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { SELF_CARE_HABITS } from '../../data/selfCareData';
import { StorageService } from '../../services/storageService';

interface DailyHabitsTrackerProps {
  onShowToast: (msg: string) => void;
}

export const DailyHabitsTracker: React.FC<DailyHabitsTrackerProps> = ({ onShowToast }) => {
  const today = new Date().toISOString().split('T')[0];
  const [completedHabits, setCompletedHabits] = useState<string[]>(() =>
    StorageService.getSelfCareHabits(today)
  );

  const total = SELF_CARE_HABITS.length;
  const count = completedHabits.length;
  const percent = Math.round((count / total) * 100);

  const handleToggle = (id: string, label: string) => {
    const isNowCompleted = !completedHabits.includes(id);
    const updated = StorageService.toggleSelfCareHabit(today, id);
    setCompletedHabits(updated);

    if (isNowCompleted) {
      if (updated.length === total) {
        StorageService.incrementSelfCareStat('habitsDone', 1);
        onShowToast('Incrível! Você completou todos os 6 hábitos de autocuidado hoje! 🌸👑');
      } else {
        onShowToast(`Feito: ${label}! Você está cuidando de você. 💗`);
      }
    }
  };

  return (
    <div
      className="card"
      style={{
        background: 'var(--surface)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--rose-vibrant)',
            }}
          >
            Rotina de Regeneração
          </span>
          <h3 style={{ margin: '2px 0 0', fontSize: '17px', color: 'var(--text)' }}>
            Seus Micro-Hábitos de Hoje
          </h3>
        </div>

        <span
          className="pill pill-gold"
          style={{ fontSize: '11px', fontWeight: 700 }}
        >
          {count}/{total} concluídos
        </span>
      </div>

      {/* Barra de Progresso com Gradiente Rosa */}
      <div
        style={{
          height: '8px',
          background: 'var(--border-light)',
          borderRadius: '99px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'var(--pink-gradient)',
            borderRadius: '99px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Grid de 6 Hábitos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
        }}
      >
        {SELF_CARE_HABITS.map((habit) => {
          const isDone = completedHabits.includes(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => handleToggle(habit.id, habit.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: '16px',
                border: isDone ? '1.5px solid var(--rose-vibrant)' : '1px solid var(--border)',
                background: isDone ? 'var(--primary-soft)' : '#FFFFFF',
                color: isDone ? 'var(--primary)' : 'var(--text)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isDone ? '0 2px 8px rgba(236, 64, 122, 0.15)' : 'none',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: isDone ? 'none' : '1.5px solid var(--input-border)',
                  background: isDone ? 'var(--pink-gradient)' : 'transparent',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : habit.emoji}
              </div>

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: isDone ? 700 : 500,
                  textDecoration: isDone ? 'line-through' : 'none',
                  opacity: isDone ? 0.95 : 1,
                  lineHeight: 1.25,
                }}
              >
                {habit.label}
              </span>
            </button>
          );
        })}
      </div>

      {count === total && (
        <div
          className="badge-pop"
          style={{
            marginTop: '14px',
            padding: '12px 14px',
            background: 'var(--pink-gradient-soft)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--primary)',
          }}
        >
          <Sparkles size={18} />
          <span>Você se priorizou hoje em todos os detalhes. Que mulher maravilhosa! 🌸</span>
        </div>
      )}
    </div>
  );
};
