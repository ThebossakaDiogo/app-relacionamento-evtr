import React, { useState } from 'react';
import { Send, Sparkles, Flame, Shield, RotateCcw, Heart } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';

interface UnsentLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const UnsentLetterModal: React.FC<UnsentLetterModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [content, setContent] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('Para ele');
  const [isReleasing, setIsReleasing] = useState<boolean>(false);
  const [isReleasedDone, setIsReleasedDone] = useState<boolean>(false);

  const handleRelease = () => {
    if (!content.trim()) return;
    setIsReleasing(true);

    // Duração da animação letterRelease definida no theme.css (2.2s)
    setTimeout(() => {
      StorageService.incrementSelfCareStat('lettersReleased', 1);
      setIsReleasing(false);
      setIsReleasedDone(true);
      onShowToast('As palavras foram soltas no vento. Sua dignidade foi preservada. 🌸');
    }, 2200);
  };

  const handleReset = () => {
    setContent('');
    setIsReleasedDone(false);
    setIsReleasing(false);
  };

  // Pétalas geradas dinamicamente com direções angulares
  const petals = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * 2 * Math.PI;
    const distance = 90 + Math.random() * 80;
    const dx = `${Math.cos(angle) * distance}px`;
    const dy = `${Math.sin(angle) * distance}px`;
    return { dx, dy, delay: `${(i * 0.08).toFixed(2)}s` };
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isReleasing) {
          handleReset();
          onClose();
        }
      }}
      title="Carta Para Deixar Ir ✉️"
    >
      <div style={{ position: 'relative' }}>
        {!isReleasedDone ? (
          <div
            className={isReleasing ? 'letter-releasing' : ''}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '14px',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <Shield size={16} />
              <span>Esta carta NUNCA será enviada. Ela existe apenas para tirar o peso do seu peito.</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['Para ele', 'Para mim mesma', 'Para o passado'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRecipient(opt)}
                  disabled={isReleasing}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    border: recipient === opt ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    background: recipient === opt ? 'var(--primary-soft)' : '#FFFFFF',
                    color: recipient === opt ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '12px',
                    fontWeight: recipient === opt ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isReleasing}
              placeholder="Escreva tudo o que você queria gritar, explicar ou desabafar... Sem filtros, sem medo. Deixe a dor sair dos seus dedos."
              rows={8}
              style={{
                width: '100%',
                borderRadius: '18px',
                border: '1.5px solid var(--border)',
                padding: '14px 16px',
                fontSize: '14px',
                lineHeight: 1.6,
                fontFamily: 'var(--font-sans)',
                color: 'var(--text)',
                backgroundColor: '#FFFFFF',
                resize: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                {content.length} caracteres escritos
              </span>

              <button
                className="btn btn-primary"
                onClick={handleRelease}
                disabled={!content.trim() || isReleasing}
                style={{
                  fontWeight: 700,
                  padding: '12px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={16} /> Soltar & Florescer
              </button>
            </div>
          </div>
        ) : (
          <div className="badge-pop" style={{ textAlign: 'center', padding: '24px 12px' }}>
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
                boxShadow: 'var(--shadow-floating)',
              }}
            >
              <Heart size={36} fill="#FFFFFF" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '26px',
                color: 'var(--primary)',
                margin: '0 0 10px',
              }}
            >
              O peso foi entregue ao vento
            </h3>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '14px',
                lineHeight: 1.6,
                maxWidth: '340px',
                margin: '0 auto 24px',
              }}
            >
              Você expressou o que sentia sem se diminuir e sem mendigar atenção. A sua paz voltou a ser o seu maior tesouro.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                className="btn btn-secondary"
                onClick={handleReset}
              >
                <RotateCcw size={15} /> Escrever outra
              </button>
              <button
                className="btn btn-primary"
                onClick={onClose}
              >
                Concluir com dignidade 🌸
              </button>
            </div>
          </div>
        )}

        {/* Efeito de Pétalas Explodindo ao Soltar */}
        {isReleasing && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {petals.map((p, idx) => (
              <div
                key={idx}
                className="petal-burst"
                style={
                  {
                    '--dx': p.dx,
                    '--dy': p.dy,
                    animationDelay: p.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
