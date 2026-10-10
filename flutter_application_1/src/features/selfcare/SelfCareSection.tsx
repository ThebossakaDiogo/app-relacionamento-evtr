import React, { useState } from 'react';
import { Wind, Mail, Trophy, Zap, Sparkles } from 'lucide-react';
import { NoContactCounter } from './NoContactCounter';
import { DailyAffirmationsCard } from './DailyAffirmationsCard';
import { DailyHabitsTracker } from './DailyHabitsTracker';
import { BreathingCircleModal } from './BreathingCircleModal';
import { UnsentLetterModal } from './UnsentLetterModal';
import { SelfCareBadgesModal } from './SelfCareBadgesModal';

interface SelfCareSectionProps {
  onShowToast: (msg: string) => void;
  onOpenSupportTool?: (toolId: string) => void;
}

export const SelfCareSection: React.FC<SelfCareSectionProps> = ({
  onShowToast,
  onOpenSupportTool,
}) => {
  const [isBreathingOpen, setIsBreathingOpen] = useState<boolean>(false);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Contador de Dias Sem Contato / Dias se Escolhendo */}
      <NoContactCounter onShowToast={onShowToast} />

      {/* 2. Grid de Ferramentas Rápidas de Alívio Emocional */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={13} />
            Ferramentas Rápidas de Soberania
          </span>

          <button
            onClick={() => setIsBadgesOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--gold-decorative)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Trophy size={14} /> Conquistas
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <button
            type="button"
            className="tool-tile"
            onClick={() => setIsBreathingOpen(true)}
          >
            <div className="tool-tile-icon">
              <Wind size={22} />
            </div>
            <strong style={{ fontSize: '13px', lineHeight: 1.2 }}>Respiração Serena</strong>
            <small style={{ fontSize: '11px', color: 'var(--text-muted)' }}>4-7-8 Guiado</small>
          </button>

          <button
            type="button"
            className="tool-tile"
            onClick={() => setIsLetterOpen(true)}
          >
            <div className="tool-tile-icon" style={{ background: 'linear-gradient(135deg, #EC407A 0%, #AB47BC 100%)' }}>
              <Mail size={22} />
            </div>
            <strong style={{ fontSize: '13px', lineHeight: 1.2 }}>Carta Para Soltar</strong>
            <small style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sem Enviar</small>
          </button>

          <button
            type="button"
            className="tool-tile"
            onClick={() => {
              if (onOpenSupportTool) {
                onOpenSupportTool('90-segundos');
              } else {
                setIsBreathingOpen(true);
              }
            }}
          >
            <div className="tool-tile-icon" style={{ background: 'linear-gradient(135deg, #F06292 0%, #D81B60 100%)' }}>
              <Zap size={22} />
            </div>
            <strong style={{ fontSize: '13px', lineHeight: 1.2 }}>SOS 90s</strong>
            <small style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pausa Anti-Impulso</small>
          </button>
        </div>
      </div>

      {/* 3. Afirmação do Dia Interativa */}
      <DailyAffirmationsCard onShowToast={onShowToast} />

      {/* 4. Rastreador de Micro-Hábitos de Autocuidado */}
      <DailyHabitsTracker onShowToast={onShowToast} />

      {/* Modais das Ferramentas */}
      <BreathingCircleModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
        onShowToast={onShowToast}
      />

      <UnsentLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        onShowToast={onShowToast}
      />

      <SelfCareBadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
      />
    </div>
  );
};
