import React, { useState } from 'react';
import {
  Calendar,
  BookMarked,
  Clock,
  Trash2,
  Copy,
  Plus,
  Shield,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  UserProfile,
  JournalEntry,
  TimelineEvent,
  MessageDraft,
  TimelineEventType,
} from '../../types';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';
import { PurchaseConfirmationModal } from '../../components/PurchaseConfirmationModal';

interface YouViewProps {
  userProfile: UserProfile;
  completedDays: number[];
  onResetOnboarding: () => void;
  onShowToast: (msg: string) => void;
  onProfileUpdated?: (updated: UserProfile) => void;
}

export const YouView: React.FC<YouViewProps> = ({
  userProfile,
  completedDays,
  onResetOnboarding,
  onShowToast,
  onProfileUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'diario' | 'timeline' | 'rascunhos' | 'conta'>('diario');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);


  // Diário
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() =>
    StorageService.getJournalEntries()
  );
  const [newJournalText, setNewJournalText] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  // Linha do tempo
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() =>
    StorageService.getTimelineEvents()
  );
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [eventForm, setEventForm] = useState<{
    type: TimelineEventType;
    title: string;
    description: string;
    howIFelt: string;
    date: string;
  }>({
    type: 'message_received',
    title: '',
    description: '',
    howIFelt: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Rascunhos
  const [drafts, setDrafts] = useState<MessageDraft[]>(() => StorageService.getMessageDrafts());

  // Prompts do diário
  const journalPrompts = [
    'Se eu pudesse mandar qualquer coisa agora, escreveria...',
    'O que eu gostaria que ele entendesse sobre mim?',
    'O que aconteceu de fato vs o que estou supondo?',
    'Qual resposta estou secretamente esperando?',
    'O que mudou em mim desde a última semana?',
    'O que eu não quero mais repetir em uma relação?',
  ];

  // Métricas
  const totalCompletedDays = completedDays.length;
  const progressPercent = Math.round((totalCompletedDays / 28) * 100);
  const totalCheckins = StorageService.getDailyCheckins().length;

  const handleSaveJournal = () => {
    if (!newJournalText.trim()) return;
    StorageService.saveJournalEntry({
      date: new Date().toISOString(),
      content: newJournalText.trim(),
      promptUsed: selectedPrompt || undefined,
    });

    setJournalEntries(StorageService.getJournalEntries());
    setNewJournalText('');
    setSelectedPrompt('');
    onShowToast('Entrada salva com sucesso no seu Diário Privado.');
  };

  const handleDeleteJournal = (id: string) => {
    StorageService.deleteJournalEntry(id);
    setJournalEntries(StorageService.getJournalEntries());
    onShowToast('Entrada excluída do diário.');
  };

  const handleAddTimelineEvent = () => {
    if (!eventForm.title.trim()) return;
    StorageService.addTimelineEvent({
      type: eventForm.type,
      title: eventForm.title.trim(),
      description: eventForm.description.trim(),
      howIFelt: eventForm.howIFelt.trim(),
      date: new Date(eventForm.date).toISOString(),
    });
    setTimelineEvents(StorageService.getTimelineEvents());
    setIsAddingEvent(false);
    setEventForm({
      type: 'message_received',
      title: '',
      description: '',
      howIFelt: '',
      date: new Date().toISOString().split('T')[0],
    });
    onShowToast('Acontecimento adicionado à sua Linha do Tempo.');
  };

  const handleDeleteTimelineEvent = (id: string) => {
    StorageService.deleteTimelineEvent(id);
    setTimelineEvents(StorageService.getTimelineEvents());
    onShowToast('Evento removido da linha do tempo.');
  };

  const handleCopyDraft = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onShowToast('Rascunho copiado para a área de transferência.');
    } catch {
      onShowToast('Selecione e copie o texto.');
    }
  };

  const handleDeleteDraft = (id: string) => {
    StorageService.deleteMessageDraft(id);
    setDrafts(StorageService.getMessageDrafts());
    onShowToast('Rascunho excluído.');
  };

  const handleExportData = () => {
    const backup = {
      profile: userProfile,
      completedDays,
      checkins: StorageService.getDailyCheckins(),
      journal: journalEntries,
      timeline: timelineEvents,
      drafts,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `magnetica_dados_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Seus dados foram exportados com segurança.');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro Header */}
      <div>
        <span className="eyebrow">SUA HISTÓRIA, SEU RITMO</span>
        <h1 style={{ margin: '6px 0 8px', fontSize: '32px' }}>
          {userProfile.name || 'Você'}
        </h1>
        <p style={{ fontSize: '15px' }}>
          Acompanhe suas estatísticas, seu diário confidencial e a linha do tempo dos seus acontecimentos.
        </p>
      </div>

      {/* Estatísticas Principais */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
      >
        <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--primary)', lineHeight: 1 }}>
            {totalCompletedDays}
          </div>
          <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '6px', display: 'block' }}>
            Dias concluídos
          </small>
        </div>

        <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--primary)', lineHeight: 1 }}>
            {totalCheckins}
          </div>
          <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '6px', display: 'block' }}>
            Check-ins feitos
          </small>
        </div>

        <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--gold-decorative)', lineHeight: 1 }}>
            {progressPercent}%
          </div>
          <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '6px', display: 'block' }}>
            Da jornada
          </small>
        </div>
      </div>

      {/* Abas Internas da Área Pessoal */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}
      >
        {[
          { key: 'diario', label: 'Diário Privado' },
          { key: 'timeline', label: 'Linha do Tempo' },
          { key: 'rascunhos', label: `Rascunhos (${drafts.length})` },
          { key: 'conta', label: 'Privacidade & Conta' },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ABA 1: DIÁRIO PRIVADO */}
      {activeTab === 'diario' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--primary-soft)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: 'var(--primary)',
            }}
          >
            <Shield size={16} />
            <span>Espaço estritamente confidencial. Seus textos ficam salvos apenas neste aparelho.</span>
          </div>

          {/* Prompts Sugeridos */}
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              PROMPTS GUIADOS PARA DESABAFAR
            </span>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
              {journalPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPrompt(p);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '99px',
                    border: '1px solid var(--border)',
                    backgroundColor: selectedPrompt === p ? 'var(--primary)' : 'var(--surface)',
                    color: selectedPrompt === p ? '#FFFDFA' : 'var(--text-muted)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Campo de Escrita */}
          <div className="card">
            {selectedPrompt && (
              <div style={{ marginBottom: '10px', color: 'var(--primary)', fontStyle: 'italic', fontSize: '13px' }}>
                Prompt: "{selectedPrompt}"
              </div>
            )}
            <textarea
              placeholder="O que está acontecendo dentro de você hoje? Escreva livremente..."
              value={newJournalText}
              onChange={(e) => setNewJournalText(e.target.value)}
              style={{ minHeight: '140px', marginBottom: '14px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {selectedPrompt && (
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setSelectedPrompt('')}
                >
                  Limpar prompt
                </button>
              )}
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveJournal}
                disabled={!newJournalText.trim()}
                style={{ opacity: newJournalText.trim() ? 1 : 0.6 }}
              >
                Guardar no Diário
              </button>
            </div>
          </div>

          {/* Histórico de Entradas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Suas anotações anteriores</h3>
            {journalEntries.map((entry) => (
              <div key={entry.id} className="card" style={{ padding: '18px 20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    {new Date(entry.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </small>
                  <button
                    onClick={() => handleDeleteJournal(entry.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '4px' }}
                    title="Excluir anotação"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                {entry.promptUsed && (
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px' }}>
                    {entry.promptUsed}
                  </div>
                )}
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                  {entry.content}
                </p>
              </div>
            ))}

            {journalEntries.length === 0 && (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                Nenhuma anotação gravada ainda. Escreva acima quando sentir vontade de organizar seus pensamentos.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ABA 2: LINHA DO TEMPO */}
      {activeTab === 'timeline' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
              Veja o que aconteceu sem depender apenas da memória do momento.
            </p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsAddingEvent(true)}
            >
              <Plus size={15} /> Novo evento
            </button>
          </div>

          {/* Form de adicionar evento */}
          {isAddingEvent && (
            <div className="card animate-fade-in" style={{ border: '1.5px solid var(--primary)', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 14px' }}>Registrar novo acontecimento</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label>Data:</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  />
                </div>
                <div>
                  <label>Tipo:</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as any })}
                  >
                    <option value="message_received">Mensagem recebida</option>
                    <option value="message_sent">Mensagem enviada</option>
                    <option value="meeting">Encontro presencial</option>
                    <option value="breakup">Término / Conversa difícil</option>
                    <option value="space_request">Pedido de espaço</option>
                    <option value="argument">Discussão</option>
                    <option value="apology">Pedido de desculpas</option>
                    <option value="reconciliation">Conversa de reconciliação</option>
                    <option value="custom">Outro acontecimento</option>
                  </select>
                </div>
              </div>

              <label>O que aconteceu (título curto):</label>
              <input
                type="text"
                placeholder="Ex: Ele me ligou à noite / Nos encontramos no parque..."
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                style={{ marginBottom: '12px' }}
              />

              <label>Fatos observáveis (o que aconteceu concretamente):</label>
              <textarea
                placeholder="Descreva apenas o que uma câmera filmaria..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                style={{ minHeight: '80px', marginBottom: '12px' }}
              />

              <label>Como eu me senti naquele momento:</label>
              <input
                type="text"
                placeholder="Ex: Ansiosa, aliviada, confusa, calma..."
                value={eventForm.howIFelt}
                onChange={(e) => setEventForm({ ...eventForm, howIFelt: e.target.value })}
                style={{ marginBottom: '16px' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsAddingEvent(false)}>
                  Cancelar
                </button>
                <button className="btn btn-sm btn-primary" onClick={handleAddTimelineEvent}>
                  Salvar na Linha do Tempo
                </button>
              </div>
            </div>
          )}

          {/* Lista da Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {timelineEvents.map((evt) => (
              <div
                key={evt.id}
                className="card"
                style={{
                  padding: '20px',
                  borderLeft: '4px solid var(--primary)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <span className="pill pill-outline" style={{ fontSize: '10px', padding: '2px 8px', marginBottom: '6px' }}>
                      {new Date(evt.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '17px' }}>{evt.title}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteTimelineEvent(evt.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                    title="Remover evento"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {evt.description && (
                  <p style={{ margin: '8px 0', fontSize: '14px', color: 'var(--text)', lineHeight: '1.5' }}>
                    {evt.description}
                  </p>
                )}

                {evt.howIFelt && (
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontStyle: 'italic', marginTop: '6px' }}>
                    Como me senti: {evt.howIFelt}
                  </div>
                )}
              </div>
            ))}

            {timelineEvents.length === 0 && !isAddingEvent && (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>
                Nenhum evento registrado ainda. Clique em "Novo evento" para registrar fatos importantes.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ABA 3: RASCUNHOS DE MENSAGENS */}
      {activeTab === 'rascunhos' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
            Mensagens que você preparou e salvou para consultar ou copiar para o WhatsApp.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {drafts.map((d) => (
              <div key={d.id} className="card" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '15px', color: 'var(--text)' }}>{d.title}</strong>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleCopyDraft(d.content)}
                      title="Copiar mensagem"
                    >
                      <Copy size={13} /> Copiar
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(d.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '4px' }}
                      title="Excluir rascunho"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg)',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: 'var(--text)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  "{d.content}"
                </div>

                <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '8px', display: 'block' }}>
                  Salvo em {new Date(d.createdAt).toLocaleDateString('pt-BR')}
                </small>
              </div>
            ))}

            {drafts.length === 0 && (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>
                Você ainda não tem rascunhos guardados. Salve modelos no Laboratório de Mensagens na aba Apoio.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ABA 4: PRIVACIDADE E CONTA */}
      {activeTab === 'conta' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Card de Status da Compra / Ativação VIP */}
          <div
            className="card"
            style={{
              padding: '22px',
              border: '1.5px solid var(--gold-decorative)',
              backgroundColor: 'var(--surface)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow" style={{ color: 'var(--gold-decorative)' }}>
                {userProfile.isPurchased ? '★ COMPRA ATIVA & VITALÍCIA' : 'VALIDAÇÃO DE COMPRA'}
              </span>
              <span
                className={`pill ${userProfile.isPurchased ? 'pill-gold' : 'pill-outline'}`}
                style={{ fontSize: '11px' }}
              >
                {userProfile.isPurchased ? 'Acesso Confirmado' : 'Aguardando validação'}
              </span>
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>
              {userProfile.isPurchased ? 'Plano Magnética 2.0 Desbloqueado' : 'Confirmar e-mail de compra'}
            </h3>

            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              {userProfile.isPurchased
                ? `Acesso vinculado ao e-mail ${userProfile.email || 'comprador'}. Sua licença (${userProfile.licenseCode || 'MAG-VIP'}) e todo o seu progresso estão salvos em cookies seguros de 365 dias no seu celular.`
                : 'Confirme o e-mail utilizado na compra para validar seu acesso vitalício e ativar a sincronização em cookies.'}
            </p>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsPurchaseModalOpen(true)}
            >
              <Sparkles size={14} /> {userProfile.isPurchased ? 'Rever comprovante / Animação de compra' : 'Confirmar e-mail e ativar'}
            </button>
          </div>

          {/* Card de Persistência e Cookies */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Shield size={18} color="var(--success)" />
              <h3 style={{ margin: 0, fontSize: '18px' }}>Sincronização em Cookies (365 Dias)</h3>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Todos os seus processos (respostas do Mapa do Momento, 28 lições concluídas, check-ins emocionais, diário privado e rascunhos) são salvos com dupla redundância: no armazenamento interno e em cookies com duração de 365 dias. Isso garante que seus dados não se percam mesmo ao fechar o navegador no celular.
            </p>
            <button className="btn btn-secondary btn-sm" onClick={handleExportData}>
              <Download size={15} /> Exportar todos os meus dados (Backup JSON)
            </button>
          </div>

          {/* Card de Recalibrar o Momento */}
          <div className="card" style={{ padding: '22px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>Recalibrar meu momento</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Se o status da sua relação mudou ou se você deseja refazer as 8 perguntas do Mapa do Momento para receber novas recomendações:
            </p>
            <button className="btn btn-primary btn-sm" onClick={onResetOnboarding}>
              <RotateCcw size={15} /> Refazer Mapa do Momento
            </button>
          </div>
        </div>
      )}

      {/* Modal com animação de confirmação de e-mail e compra */}
      <PurchaseConfirmationModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        initialEmail={userProfile.email || ''}
        onSuccess={(confirmed) => {
          setIsPurchaseModalOpen(false);
          if (onProfileUpdated) {
            onProfileUpdated(confirmed);
          }
          onShowToast('Acesso confirmado com sucesso! Cookies atualizados.');
        }}
      />
    </div>
  );
};

