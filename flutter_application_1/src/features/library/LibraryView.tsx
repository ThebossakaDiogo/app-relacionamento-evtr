import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  CheckSquare,
  Search,
  Sparkles,
  Clock,
  Bookmark,
  BookmarkCheck,
  Play,
  Pause,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { LibraryItem, LibraryItemType } from '../../types';
import { LIBRARY_ITEMS } from '../../data/libraryData';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';

interface LibraryViewProps {
  onShowToast: (msg: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onShowToast }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  // Favoritos
  const [favorites, setFavorites] = useState<string[]>(() => StorageService.getFavorites());

  // Player de Áudio simulado
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  // Checklists states
  const [checklistCompletedItems, setChecklistCompletedItems] = useState<string[]>([]);

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isNowFav = StorageService.toggleFavorite(id);
    setFavorites(StorageService.getFavorites());
    onShowToast(isNowFav ? 'Añadido a tus favoritos.' : 'Eliminado de favoritos.');
  };

  const handleOpenItem = (item: LibraryItem) => {
    setSelectedItem(item);
    setIsPlaying(false);
    setAudioProgress(0);
    if (item.type === 'checklist') {
      setChecklistCompletedItems(StorageService.getChecklistState(item.id));
    }
  };

  const handleToggleChecklist = (checklistId: string, itemId: string) => {
    const updated = StorageService.toggleChecklistItem(checklistId, itemId);
    setChecklistCompletedItems(updated);
  };

  // Simulação de progresso do áudio
  React.useEffect(() => {
    let interval: any;
    if (isPlaying && selectedItem?.type === 'audio') {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2 * playbackSpeed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, selectedItem]);

  // Filtros
  const filteredItems = LIBRARY_ITEMS.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const cleanSearch = searchQuery
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const cleanTitle = item.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const cleanSubtitle = item.subtitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const matchesSearch = cleanTitle.includes(cleanSearch) || cleanSubtitle.includes(cleanSearch);
    return matchesType && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro */}
      <div>
        <span className="eyebrow">PEQUEÑAS PAUSAS, NUEVAS PERSPECTIVAS</span>
        <h1 style={{ margin: '6px 0 8px', fontSize: '32px' }}>
          Biblioteca
        </h1>
        <p style={{ fontSize: '15px' }}>
          Contenidos para leer, escuchar y practicar a tu propio ritmo, sin juicios.
        </p>
      </div>

      {/* Barra de Busca e Filtros */}
      <div>
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY-50%',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Buscar por tema (nostalgia, silencio, límites, reconciliación)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '42px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { key: 'all', label: 'Todo' },
            { key: 'leitura', label: 'Lecturas (12)' },
            { key: 'audio', label: 'Audios Guiados (8)' },
            { key: 'checklist', label: 'Checklists (10)' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterType(cat.key)}
              style={{
                padding: '8px 16px',
                borderRadius: '99px',
                border: filterType === cat.key ? '1px solid var(--primary)' : '1px solid var(--border)',
                backgroundColor: filterType === cat.key ? 'var(--primary)' : 'var(--surface)',
                color: filterType === cat.key ? '#FFFDFA' : 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: filterType === cat.key ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Itens */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredItems.map((item) => {
          const isFav = favorites.includes(item.id);
          const isAudio = item.type === 'audio';
          const isChecklist = item.type === 'checklist';

          return (
            <div
              key={item.id}
              className="card card-interactive"
              onClick={() => handleOpenItem(item)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '22px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  className="pill"
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    backgroundColor: isAudio
                      ? 'var(--gold-soft)'
                      : isChecklist
                      ? 'var(--success-soft)'
                      : 'var(--primary-soft)',
                    color: isAudio
                      ? 'var(--gold-decorative)'
                      : isChecklist
                      ? 'var(--success)'
                      : 'var(--primary)',
                  }}
                >
                  {isAudio ? 'Audio Guiado' : isChecklist ? 'Checklist' : 'Artículo'} · {item.duration}
                </span>

                <button
                  onClick={(e) => handleToggleFavorite(item.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isFav ? 'var(--primary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title={isFav ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
                >
                  {isFav ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>

              <h3 style={{ margin: '0 0 8px', fontSize: '18px', lineHeight: '1.25' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', flex: 1, marginBottom: '16px', lineHeight: '1.5' }}>
                {item.subtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                  {isAudio ? 'Escuchar guión →' : isChecklist ? 'Completar →' : 'Leer artículo →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ margin: 0, fontSize: '15px' }}>
            No se encontró ningún contenido para los términos buscados.
          </p>
        </div>
      )}

      {/* MODAL DETALHE DO ITEM */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setIsPlaying(false);
          }}
          title={selectedItem.title}
          eyebrow={selectedItem.type.toUpperCase() + ' · ' + selectedItem.duration}
        >
          {/* Se for ÁUDIO */}
          {selectedItem.type === 'audio' && (
            <div>
              {/* Audio Player Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg)',
                  borderRadius: '20px',
                  padding: '24px 20px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '8px' }}>
                  <Volume2 size={24} />
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>AUDIO GUIADO</span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: '6px',
                    backgroundColor: 'var(--border)',
                    borderRadius: '99px',
                    margin: '18px 0 10px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--primary)',
                      width: `${audioProgress}%`,
                      borderRadius: '99px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <span>{Math.floor((audioProgress * 1.8) / 60)}:{(Math.floor(audioProgress * 1.8) % 60).toString().padStart(2, '0')}</span>
                  <span>{selectedItem.audioDuration || '03:30'}</span>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <button
                    onClick={() => {
                      setAudioProgress(0);
                      setIsPlaying(false);
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                    title="Reiniciar"
                  >
                    <RotateCcw size={18} />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: '#FFFDFA',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(102, 56, 74, 0.3)',
                    }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                  </button>

                  <button
                    onClick={() => {
                      const speeds = [0.75, 1, 1.25, 1.5];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(next);
                    }}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'var(--surface)',
                      cursor: 'pointer',
                    }}
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>

              {/* Transcrição integral */}
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
                  TRANSCRIPCIÓN COMPLETA DEL AUDIO
                </span>
                <div
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: 'var(--text)',
                    whiteSpace: 'pre-line',
                    backgroundColor: 'var(--surface)',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  {selectedItem.audioScript || selectedItem.content}
                </div>
              </div>
            </div>
          )}

          {/* Se for CHECKLIST */}
          {selectedItem.type === 'checklist' && (
            <div>
              <p style={{ fontSize: '15px', marginBottom: '18px', color: 'var(--text)' }}>
                {selectedItem.content}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedItem.checklistItems?.map((item) => {
                  const isChecked = checklistCompletedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleChecklist(selectedItem.id, item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        backgroundColor: isChecked ? 'var(--success-soft)' : 'var(--bg)',
                        border: isChecked ? '1px solid var(--success)' : '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // controlado pelo container click
                        style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--primary)' }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          color: 'var(--text)',
                          lineHeight: '1.5',
                          textDecoration: isChecked ? 'line-through' : 'none',
                          opacity: isChecked ? 0.8 : 1,
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <span className="pill pill-gold">
                  {checklistCompletedItems.length} de {selectedItem.checklistItems?.length || 0} completados
                </span>
              </div>
            </div>
          )}

          {/* Se for LEITURA */}
          {selectedItem.type === 'leitura' && (
            <div style={{ fontSize: '16px', lineHeight: '1.75', color: 'var(--text)', whiteSpace: 'pre-line' }}>
              {selectedItem.content}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
