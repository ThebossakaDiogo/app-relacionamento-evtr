import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';

interface BreathingCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'done';

export const BreathingCircleModal: React.FC<BreathingCircleModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const totalCycles = 4;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fases e durações (4-7-8)
  const PHASE_CONFIG = {
    inhale: { duration: 4, label: 'Inspire pelo nariz...', tip: 'Enchendo o peito de amor-próprio', scale: 1.35 },
    hold: { duration: 7, label: 'Segure o ar...', tip: 'Sentindo sua presença e dignidade', scale: 1.35 },
    exhale: { duration: 8, label: 'Expire devagar...', tip: 'Soltando a pressa e a angústia', scale: 1.0 },
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startBreathing = () => {
    setPhase('inhale');
    setSecondsLeft(PHASE_CONFIG.inhale.duration);
    setCurrentCycle(1);
  };

  const handleStop = () => {
    clearTimer();
    setPhase('idle');
  };

  useEffect(() => {
    if (!isOpen) {
      clearTimer();
      setPhase('idle');
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Muda para a próxima fase
          if (phase === 'inhale') {
            setPhase('hold');
            return PHASE_CONFIG.hold.duration;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return PHASE_CONFIG.exhale.duration;
          } else if (phase === 'exhale') {
            if (currentCycle >= totalCycles) {
              setPhase('done');
              StorageService.incrementSelfCareStat('breathSessions', 1);
              onShowToast('Sessão concluída! Seu coração está mais sereno. 🌸');
              return 0;
            } else {
              setCurrentCycle((c) => c + 1);
              setPhase('inhale');
              return PHASE_CONFIG.inhale.duration;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [phase, currentCycle, isOpen]);

  const activeScale =
    phase === 'inhale' ? 1.35 : phase === 'hold' ? 1.35 : phase === 'exhale' ? 1.0 : 1.0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleStop();
        onClose();
      }}
      title="Respiração da Mulher Serena 🌸"
    >
      <div style={{ textAlign: 'center', padding: '10px 0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '340px', margin: '0 auto 28px', lineHeight: 1.5 }}>
          O método 4-7-8 desacelera os batimentos, desliga o impulso de mandar mensagem e devolve o controle para você.
        </p>

        {phase !== 'done' ? (
          <>
            {/* Indicador de Ciclos */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '99px',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '32px',
              }}
            >
              <Heart size={13} fill="var(--primary)" />
              <span>Ciclo {currentCycle} de {totalCycles}</span>
            </div>

            {/* Círculo de Respiração Animado */}
            <div
              style={{
                position: 'relative',
                width: '240px',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0 30px',
              }}
            >
              <div
                className="breath-circle"
                style={{
                  transform: `scale(${activeScale})`,
                  transition: `transform ${
                    phase === 'inhale' ? '4s ease-out' : phase === 'exhale' ? '8s ease-in-out' : '0.5s ease'
                  }`,
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '38px', fontFamily: 'var(--font-brand)', lineHeight: 1 }}>
                    {phase === 'idle' ? '🌸' : secondsLeft}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.95, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {phase === 'idle'
                      ? 'Pronta?'
                      : phase === 'inhale'
                      ? 'Inspire'
                      : phase === 'hold'
                      ? 'Segure'
                      : 'Expire'}
                  </div>
                </div>
              </div>
            </div>

            {/* Mensagem Guiada */}
            <div style={{ minHeight: '50px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '18px', color: 'var(--primary)', margin: '0 0 4px', fontFamily: 'var(--font-brand)' }}>
                {phase === 'idle'
                  ? 'Reserve 1 minuto só seu'
                  : PHASE_CONFIG[phase as 'inhale' | 'hold' | 'exhale']?.label}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                {phase === 'idle'
                  ? 'Coloque a mão no peito e sinta sua respiração antes de iniciar.'
                  : PHASE_CONFIG[phase as 'inhale' | 'hold' | 'exhale']?.tip}
              </p>
            </div>

            {/* Controles */}
            {phase === 'idle' ? (
              <button
                className="btn btn-primary"
                onClick={startBreathing}
                style={{ padding: '14px 32px', fontSize: '16px', fontWeight: 700 }}
              >
                <Play size={18} /> Começar Respiração
              </button>
            ) : (
              <button
                className="btn btn-light"
                onClick={handleStop}
                style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600 }}
              >
                <Pause size={15} /> Pausar
              </button>
            )}
          </>
        ) : (
          /* Conclusão */
          <div className="badge-pop" style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'var(--pink-gradient)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', color: 'var(--primary)', margin: '0 0 8px' }}>
              Seu centro foi restabelecido
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5, marginBottom: '24px', maxWidth: '320px', margin: '0 auto 24px' }}>
              Você acabou de ensinar ao seu corpo que você não precisa correr atrás de nada. A sua calma é o seu maior poder.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                className="btn btn-secondary"
                onClick={startBreathing}
              >
                <RotateCcw size={15} /> Repetir ciclo
              </button>
              <button
                className="btn btn-primary"
                onClick={onClose}
              >
                Voltar serena <Sparkles size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
