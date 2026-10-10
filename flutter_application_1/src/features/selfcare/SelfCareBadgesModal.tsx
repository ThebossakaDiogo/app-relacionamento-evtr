import React from 'react';
import { Trophy, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { SELF_CARE_BADGES, SelfCareBadge } from '../../data/selfCareData';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';

interface SelfCareBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelfCareBadgesModal: React.FC<SelfCareBadgesModalProps> = ({ isOpen, onClose }) => {
  const stats = StorageService.getSelfCareStats();
  const noContactDays = StorageService.getNoContactDays();
  const favorites = StorageService.getFavoriteAffirmations();
  const completedLessons = StorageService.getCompletedLessons();

  const isUnlocked = (badgeId: string): boolean => {
    switch (badgeId) {
      case 'badge-inicio':
        return completedLessons.length > 0 || true;
      case 'badge-respiro':
        return stats.breathSessions > 0;
      case 'badge-carta':
        return stats.lettersReleased > 0;
      case 'badge-habitos':
        return stats.habitsDone > 0;
      case 'badge-3dias':
        return noContactDays >= 3 || StorageService.getNoContactBest() >= 3;
      case 'badge-7dias':
        return noContactDays >= 7 || StorageService.getNoContactBest() >= 7;
      case 'badge-guardia':
        return favorites.length >= 3;
      default:
        return false;
    }
  };

  const unlockedCount = SELF_CARE_BADGES.filter((b) => isUnlocked(b.id)).length;
  const progressPercent = Math.round((unlockedCount / SELF_CARE_BADGES.length) * 100);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Suas Conquistas de Soberania 👑">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Banner de Progresso Geral */}
        <div
          style={{
            padding: '16px 18px',
            borderRadius: '20px',
            background: 'var(--pink-gradient)',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-floating)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9, fontWeight: 700 }}>
              Jornada de Amor-Próprio
            </span>
            <h3 style={{ margin: '2px 0 0', fontSize: '20px', color: '#FFFFFF' }}>
              {unlockedCount} de {SELF_CARE_BADGES.length} Conquistas
            </h3>
          </div>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)',
              border: '2px solid rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 800,
            }}
          >
            {progressPercent}%
          </div>
        </div>

        {/* Lista de Medalhas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
          {SELF_CARE_BADGES.map((badge) => {
            const unlocked = isUnlocked(badge.id);
            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '18px',
                  border: unlocked ? '1.5px solid var(--rose-vibrant)' : '1px solid var(--border)',
                  background: unlocked ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  opacity: unlocked ? 1 : 0.65,
                  boxShadow: unlocked ? '0 4px 14px rgba(233, 30, 99, 0.08)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '16px',
                    background: unlocked ? badge.color : 'var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                    boxShadow: unlocked ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {badge.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text)', fontWeight: 700 }}>
                      {badge.title}
                    </h4>
                    {unlocked ? (
                      <CheckCircle2 size={14} color="var(--success)" />
                    ) : (
                      <Lock size={12} color="var(--text-subtle)" />
                    )}
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
