import React, { useState } from 'react';
import { Flame, RotateCcw, Trophy } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { NO_CONTACT_MILESTONES, getMilestoneMessage } from '../../data/selfCareData';

interface NoContactCounterProps {
  onShowToast: (msg: string) => void;
}

export const NoContactCounter: React.FC<NoContactCounterProps> = ({ onShowToast }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(() => !!StorageService.getNoContactStart());
  const [days, setDays] = useState<number>(() => StorageService.getNoContactDays());
  const [best, setBest] = useState<number>(() => StorageService.getNoContactBest());
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const nextMilestone = NO_CONTACT_MILESTONES.find((m) => m > days) || days + 30;
  const prevMilestone = [...NO_CONTACT_MILESTONES].reverse().find((m) => m <= days) || 0;
  const progress = Math.min(100, Math.round(((days - prevMilestone) / (nextMilestone - prevMilestone)) * 100));

  const handleStart = () => {
    StorageService.startNoContact();
    setHasStarted(true);
    setDays(0);
    onShowToast('Contador iniciado! Cada dia é uma vitória sua. 💗');
  };

  const handleReset = () => {
    StorageService.resetNoContact();
    setBest(StorageService.getNoContactBest());
    setDays(0);
    setConfirmReset(false);
    onShowToast('Tudo bem recomeçar. O que importa é que você voltou para você.');
  };

  return (
    <div
      style={{
        background: 'var(--pink-gradient)',
        borderRadius: 'var(--radius-hero)',
        padding: '22px 20px',
        color: '#FFFFFF',
        boxShadow: 'var(--shadow-floating)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Brilhos decorativos */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.14)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-30px',
          bottom: '-50px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: 0.95,
          }}
        >
          Dias se escolhendo
        </span>

        {!hasStarted ? (
          <div style={{ marginTop: '10px' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '22px', margin: '0 0 8px' }}>
              Comece seu contador de dias sem contato
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
              Acompanhe cada dia que você escolhe a sua paz em vez de mandar mensagem ou olhar o perfil dele.
            </p>
            <button
              className="btn btn-light"
              onClick={handleStart}
              style={{ fontWeight: 700 }}
            >
              <Flame size={18} /> Começar hoje
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0 10px' }}>
              <div
                className="soft-pulse"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  border: '2px solid rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Flame size={36} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-brand)', fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
                  {days}
                  <span style={{ fontSize: '18px', fontWeight: 600, marginLeft: '6px' }}>
                    {days === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
                <small style={{ fontSize: '12px', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <Trophy size={13} /> Seu recorde: {Math.max(best, days)} {Math.max(best, days) === 1 ? 'dia' : 'dias'}
                </small>
              </div>
            </div>

            <p style={{ color: '#FFFFFF', fontSize: '14px', margin: '0 0 12px', lineHeight: 1.5, fontWeight: 500 }}>
              {getMilestoneMessage(days)}
            </p>

            {/* Barra até o próximo marco */}
            <div
              style={{
                height: '8px',
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '99px',
                overflow: 'hidden',
                marginBottom: '6px',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#FFFFFF',
                  borderRadius: '99px',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ opacity: 0.95 }}>Próximo marco: {nextMilestone} dias 🌸</span>

              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#FFFFFF',
                    borderRadius: '99px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <RotateCcw size={12} /> Tive contato
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={handleReset}
                    style={{
                      background: '#FFFFFF',
                      color: 'var(--primary)',
                      border: 'none',
                      borderRadius: '99px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Recomeçar
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    style={{
                      background: 'transparent',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.5)',
                      borderRadius: '99px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
