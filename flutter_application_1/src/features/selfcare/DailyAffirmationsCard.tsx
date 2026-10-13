import React, { useState } from 'react';
import { Heart, Sparkles, Share2, ChevronRight, Bookmark } from 'lucide-react';
import { AFFIRMATIONS } from '../../data/selfCareData';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';

interface DailyAffirmationsCardProps {
  onShowToast: (msg: string) => void;
}

export const DailyAffirmationsCard: React.FC<DailyAffirmationsCardProps> = ({ onShowToast }) => {
  // Índice baseado no dia do ano para manter constante por dia, mas permitindo trocar
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 864e5
  );
  const initialIndex = dayOfYear % AFFIRMATIONS.length;

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [favorites, setFavorites] = useState<number[]>(() =>
    StorageService.getFavoriteAffirmations()
  );
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);
  const [fadeAnim, setFadeAnim] = useState<boolean>(false);

  const currentAffirmation = AFFIRMATIONS[currentIndex];
  const isFavorite = favorites.includes(currentIndex);

  const handleNext = () => {
    setFadeAnim(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
      setFadeAnim(false);
    }, 180);
  };

  const handleToggleFavorite = () => {
    const updated = StorageService.toggleFavoriteAffirmation(currentIndex);
    setFavorites(updated);
    if (!isFavorite) {
      onShowToast('¡Afirmación guardada en tus favoritas! 💗');
    } else {
      onShowToast('Afirmación eliminada de favoritas.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${currentAffirmation}" — Floreciendo con Florecer 🌸`
      );
      onShowToast('¡Afirmación copiada con cariño para que la compartas!');
    } catch {
      onShowToast('Selecciona y copia el texto manualmente.');
    }
  };

  return (
    <>
      <div
        className="card-dopamine"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 100%)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-hero)',
          padding: '20px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={16} />
            </span>
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                }}
              >
                Píldora de Amor Propio
              </span>
              <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text)' }}>
                Afirmación Para Tu Corazón
              </h4>
            </div>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={() => setIsFavoritesModalOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Bookmark size={13} /> {favorites.length} guardadas
            </button>
          )}
        </div>

        {/* Citação em Tipografia Sofisticada */}
        <div
          style={{
            padding: '16px 18px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid var(--border-light)',
            borderRadius: '18px',
            boxShadow: '0 2px 10px rgba(233, 30, 99, 0.05)',
            minHeight: '74px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: fadeAnim ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '17px',
              fontWeight: 500,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.45,
              margin: 0,
              textAlign: 'center',
            }}
          >
            "{currentAffirmation}"
          </p>
        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Eliminar de favoritas' : 'Guardar afirmación'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: isFavorite ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                background: isFavorite ? 'var(--primary-soft)' : '#FFFFFF',
                color: isFavorite ? 'var(--primary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart
                size={17}
                fill={isFavorite ? 'var(--primary)' : 'none'}
                strokeWidth={2}
              />
            </button>

            <button
              onClick={handleCopy}
              title="Copiar para compartir"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: '#FFFFFF',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Share2 size={16} />
            </button>
          </div>

          <button
            onClick={handleNext}
            style={{
              background: 'var(--pink-gradient-soft)',
              border: '1px solid var(--border)',
              borderRadius: '99px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            Otra afirmación <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal com as Afirmações Salvas */}
      <Modal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        title="Tus Afirmaciones Guardadas 💗"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Palabras de verdad y dignidad que guardaste para releer siempre que tu mente dude.
          </p>

          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-subtle)' }}>
              Ninguna afirmación guardada todavía.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto' }}>
              {favorites.map((favIdx) => (
                <div
                  key={favIdx}
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    position: 'relative',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-brand)',
                      fontStyle: 'italic',
                      fontSize: '15px',
                      color: 'var(--text)',
                      margin: '0 0 8px',
                      lineHeight: 1.4,
                    }}
                  >
                    "{AFFIRMATIONS[favIdx]}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`"${AFFIRMATIONS[favIdx]}"`);
                        onShowToast('¡Copiada!');
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Copiar
                    </button>
                    <button
                      onClick={() => {
                        const updated = StorageService.toggleFavoriteAffirmation(favIdx);
                        setFavorites(updated);
                        onShowToast('Eliminada.');
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--error)',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
