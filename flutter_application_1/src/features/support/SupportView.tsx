import React, { useState } from 'react';
import {
  MessageCircle,
  Clock,
  Compass,
  Copy,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  FileText,
  AlertCircle,
  HelpCircle,
  BookmarkPlus,
} from 'lucide-react';
import { MESSAGE_TEMPLATES } from '../../data/messagesData';
import { SUPPORT_SCENARIOS } from '../../data/scenariosData';
import { StorageService } from '../../services/storageService';
import { Modal } from '../../components/Modal';

interface SupportViewProps {
  initialTool?: string;
  onShowToast: (msg: string) => void;
  onNavigateTab: (tab: 'hoje' | 'jornada' | 'apoio' | 'biblioteca' | 'voce') => void;
}

export const SupportView: React.FC<SupportViewProps> = ({
  initialTool,
  onShowToast,
  onNavigateTab,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(initialTool || null);

  // Estados da ferramenta: Devo mandar mensagem?
  const [dmStep, setDmStep] = useState<number>(1);
  const [dmAnswers, setDmAnswers] = useState({
    reason: '',
    expectation: '',
    ifNoResponse: '',
    isPractical: false,
    hasClearGoal: false,
  });
  const [dmResult, setDmResult] = useState<'wait' | 'prepare' | 'conversation' | null>(null);

  // Estados da ferramenta: SOS 90 segundos
  const [sosSeconds, setSosSeconds] = useState<number>(90);
  const [sosTimerActive, setSosTimerActive] = useState<boolean>(false);
  const [sosDraft, setSosDraft] = useState<string>('');

  // Estados da ferramenta: Ele me chamou
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(1);

  // Estados da ferramenta: Laboratório de Mensagens
  const [msgCategory, setMsgCategory] = useState<string>('Tudo');
  const [msgSearch, setMsgSearch] = useState<string>('');
  const [editingMsg, setEditingMsg] = useState<{ id: number; text: string; title: string } | null>(null);

  // Estados da ferramenta: Fato ou Interpretação
  const [factMode, setFactMode] = useState<'preset' | 'custom'>('preset');
  const [customSituation, setCustomSituation] = useState({
    fact: '',
    interpretation: '',
    unknown: '',
    observe: '',
  });

  // Categorias do Laboratório de mensagens
  const msgCategories = ['Tudo', 'Respostas Curtas', 'Prático e Limites', 'Respostas com Calma', 'Abertura de Diálogo', 'Saudade e Emoções', 'Encontros', 'Reconciliação'];

  const filteredMessages = MESSAGE_TEMPLATES.filter((m) => {
    const matchesCategory = msgCategory === 'Tudo' || m.category === msgCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.template.toLowerCase().includes(msgSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onShowToast('Mensagem copiada para a área de transferência.');
    } catch {
      onShowToast('Selecione e copie o texto manualmente.');
    }
  };

  const handleSaveDraft = (title: string, content: string) => {
    StorageService.saveMessageDraft({
      title,
      content,
      category: 'Apoio',
    });
    onShowToast('Mensagem guardada nos seus Rascunhos (aba Você).');
  };

  // Cálculo da decisão: Devo mandar mensagem?
  const handleCalculateDm = () => {
    if (!dmAnswers.hasClearGoal || dmAnswers.ifNoResponse === 'Ficaria desesperada') {
      setDmResult('wait');
    } else if (dmAnswers.isPractical) {
      setDmResult('prepare');
    } else {
      setDmResult('conversation');
    }
  };

  // Timer SOS
  React.useEffect(() => {
    let interval: any;
    if (sosTimerActive && sosSeconds > 0) {
      interval = setInterval(() => {
        setSosSeconds((s) => s - 1);
      }, 1000);
    } else if (sosSeconds === 0) {
      setSosTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [sosTimerActive, sosSeconds]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro */}
      <div>
        <span className="eyebrow">UM ESPAÇO PARA ORGANIZAR</span>
        <h1 style={{ margin: '6px 0 8px', fontSize: '32px' }}>
          O que aconteceu agora?
        </h1>
        <p style={{ fontSize: '15px' }}>
          Quando algo muda, você não precisa decidir sozinha no impulso. Escolha a ferramenta ideal para o seu momento.
        </p>
      </div>

      {/* Grid de Ferramentas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Card 1: Devo mandar mensagem? */}
        <div
          className="card card-interactive"
          onClick={() => {
            setDmStep(1);
            setDmResult(null);
            setActiveModal('devo-mandar');
          }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'var(--primary-soft)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Compass size={22} />
            </div>
            <div>
              <span className="eyebrow">FLUXO DE DECISÃO</span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Devo mandar mensagem?</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Descubra se o contato agora faz sentido ou se é melhor aguardar para preservar sua paz.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Avaliar minha intenção <ArrowRight size={15} />
          </span>
        </div>

        {/* Card 2: SOS Quero falar agora */}
        <div
          className="card card-interactive"
          onClick={() => {
            setSosSeconds(90);
            setSosTimerActive(true);
            setActiveModal('90-segundos');
          }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'var(--gold-soft)',
                color: 'var(--gold-decorative)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flame size={22} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-decorative)' }}>
                PAUSA DE 90 SEGUNDOS
              </span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Quero falar com ele agora</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Interrompa o pico de ansiedade, respire e descarregue o que sente em um espaço seguro sem envio.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold-decorative)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Iniciar pausa de 90s <ArrowRight size={15} />
          </span>
        </div>

        {/* Card 3: Ele me chamou */}
        <div
          className="card card-interactive"
          onClick={() => setActiveModal('ele-me-chamou')}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'var(--primary-soft)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageCircle size={22} />
            </div>
            <div>
              <span className="eyebrow">ANÁLISE DE CONTATO</span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Ele me chamou</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Organize o que ele realmente disse antes de responder, evitando cair em ilusões ou impulsos.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Analisar mensagem dele <ArrowRight size={15} />
          </span>
        </div>

        {/* Card 4: Encontre as palavras (Laboratório) */}
        <div
          className="card card-interactive"
          onClick={() => setActiveModal('laboratorio')}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'var(--success-soft)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: 'var(--success)' }}>
                24 MODELOS EDITORIAIS
              </span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Encontre as palavras</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Modelos de mensagens elegantes e maduras para cada situação. Copie ou edite com a sua voz.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Ver modelos de mensagem <ArrowRight size={15} />
          </span>
        </div>

        {/* Card 5: Fato ou interpretação? */}
        <div
          className="card card-interactive"
          onClick={() => setActiveModal('fato-interpretacao')}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'var(--primary-soft)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <span className="eyebrow">LUCIDEZ EMOCIONAL</span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Fato ou interpretação?</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Separe o que uma câmera filmaria daquilo que o seu medo ou desejo está supondo.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Abrir analisador <ArrowRight size={15} />
          </span>
        </div>

        {/* Card 6: Assistente de Clareza (Magnética Plus) */}
        <div
          className="card card-interactive"
          onClick={() => setActiveModal('assistente-plus')}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: '#FAF0E6',
                color: '#8B4513',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: '#8B4513' }}>
                FLORECER PLUS
              </span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Assistente de Clareza</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Estruture uma conversa delicada ou organize seus pensamentos com auxílio guiado.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#8B4513', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Acessar Assistente <ArrowRight size={15} />
          </span>
        </div>
      </div>

      {/* MODAL 1: Devo mandar mensagem? */}
      <Modal
        isOpen={activeModal === 'devo-mandar'}
        onClose={() => setActiveModal(null)}
        title="Devo mandar mensagem?"
        eyebrow="FLUXO DE DECISÃO"
      >
        {!dmResult ? (
          <div>
            {dmStep === 1 && (
              <div>
                <p style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '16px' }}>
                  1. O que fez você sentir vontade de entrar em contato neste exato momento?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Um assunto prático ou inadiável (coisas, documentos, pet)',
                    'Um pico repentino de saudade ou solidão',
                    'Vi algo em redes sociais ou lembrei de nós dois',
                    'Quero pedir desculpas por algo específico que fiz',
                    'Quero saber se ainda existe abertura entre nós',
                  ].map((opt) => (
                    <button
                      key={opt}
                      className="card"
                      onClick={() => {
                        setDmAnswers((prev) => ({
                          ...prev,
                          reason: opt,
                          isPractical: opt.includes('prático'),
                        }));
                        setDmStep(2);
                      }}
                      style={{ textAlign: 'left', padding: '14px 18px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {dmStep === 2 && (
              <div>
                <p style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '16px' }}>
                  2. O que você espera secretamente que aconteça após o envio?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Apenas resolver o assunto prático com rapidez',
                    'Que ele me responda dizendo que se arrependeu e quer voltar',
                    'Aliviar a minha angústia e saber que ele não me esqueceu',
                    'Ter uma resposta madura e tranquila',
                  ].map((opt) => (
                    <button
                      key={opt}
                      className="card"
                      onClick={() => {
                        setDmAnswers((prev) => ({ ...prev, expectation: opt }));
                        setDmStep(3);
                      }}
                      style={{ textAlign: 'left', padding: '14px 18px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {dmStep === 3 && (
              <div>
                <p style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '16px' }}>
                  3. Se ele não responder ou demorar mais de 24 horas, como você ficaria?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Ficaria desesperada, checando o celular a cada minuto',
                    'Ficaria chateada, mas consigo seguir com meus afazeres em paz',
                    'Tranquila: o assunto é objetivo e o silêncio já será uma resposta',
                  ].map((opt) => (
                    <button
                      key={opt}
                      className="card"
                      onClick={() => {
                        setDmAnswers((prev) => ({
                          ...prev,
                          ifNoResponse: opt,
                          hasClearGoal: opt.includes('Tranquila') || opt.includes('chateada'),
                        }));
                        handleCalculateDm();
                      }}
                      style={{ textAlign: 'left', padding: '14px 18px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {dmResult === 'wait' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <span className="pill pill-gold" style={{ marginBottom: '12px', fontSize: '13px' }}>
                  RECOMENDAÇÃO: ESPERE UM POUCO
                </span>
                <h3 style={{ fontSize: '22px', margin: '12px 0 10px', color: 'var(--primary)' }}>
                  Aguarde antes de iniciar contato.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Sua motivação principal agora parece ser aliviar a angústia da incerteza. Enviar uma mensagem nesse estado transfere o controle da sua paz para a resposta dele. Dê a si mesma 24 horas de trégua.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveModal('90-segundos');
                    }}
                  >
                    Fazer pausa de 90 segundos agora
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onNavigateTab('voce');
                      setActiveModal(null);
                    }}
                  >
                    Escrever no Diário Privado
                  </button>
                </div>
              </div>
            )}

            {dmResult === 'prepare' && (
              <div>
                <span className="pill pill-success" style={{ marginBottom: '12px', fontSize: '13px' }}>
                  RECOMENDAÇÃO: PREPARE ANTES DE ENVIAR
                </span>
                <h3 style={{ fontSize: '22px', margin: '12px 0 10px', color: 'var(--primary)' }}>
                  Há um assunto concreto. Mantenha o texto objetivo.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Você tem um assunto prático para resolver. A melhor estratégia é ser breve, educada e direta, sem misturar lembranças emocionais com recados práticos.
                </p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setActiveModal('laboratorio');
                  }}
                >
                  Ver modelos de Assunto Prático
                </button>
              </div>
            )}

            {dmResult === 'conversation' && (
              <div>
                <span className="pill" style={{ marginBottom: '12px', fontSize: '13px' }}>
                  RECOMENDAÇÃO: UMA CONVERSA PODE FAZER SENTIDO
                </span>
                <h3 style={{ fontSize: '22px', margin: '12px 0 10px', color: 'var(--primary)' }}>
                  Objetivo claro e maturidade para lidar com a resposta.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Você avaliou seu estado emocional e demonstrou preparo para qualquer desfecho. Escolha um modelo respeitoso e envie com tranquilidade.
                </p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setActiveModal('laboratorio');
                  }}
                >
                  Preparar mensagem no Laboratório
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* MODAL 2: SOS 90 Segundos */}
      <Modal
        isOpen={activeModal === '90-segundos'}
        onClose={() => setActiveModal(null)}
        title="Quero falar com ele agora"
        eyebrow="PAUSA DE 90 SEGUNDOS"
      >
        <div>
          {/* Timer Display */}
          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: 'var(--bg)',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '44px',
                color: 'var(--primary)',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {Math.floor(sosSeconds / 60)}:{(sosSeconds % 60).toString().padStart(2, '0')}
            </div>
            <small style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '6px', display: 'block' }}>
              {sosSeconds > 0
                ? 'Puxe o ar em 4 segundos... segure em 2... solte em 6 segundos.'
                : 'Tempo concluído. Respire e avalie como está o seu corpo.'}
            </small>
          </div>

          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Escreva abaixo absolutamente tudo o que você gostaria de dizer agora. Descarregue o texto sem filtro: nada daqui será enviado para ninguém.
          </p>

          <textarea
            placeholder="Se eu pudesse falar qualquer coisa sem consequências agora..."
            value={sosDraft}
            onChange={(e) => setSosDraft(e.target.value)}
            style={{ minHeight: '130px', marginBottom: '16px' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                if (sosDraft.trim()) {
                  handleSaveDraft('Desabafo SOS (90 segundos)', sosDraft.trim());
                  setSosDraft('');
                  setActiveModal(null);
                } else {
                  onShowToast('Escreva algo antes de guardar.');
                }
              }}
            >
              Guardar no Diário sem enviar
            </button>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => setActiveModal(null)}
            >
              Concluir pausa
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL 3: Ele me chamou */}
      <Modal
        isOpen={activeModal === 'ele-me-chamou'}
        onClose={() => setActiveModal(null)}
        title="Ele me chamou"
        eyebrow="ANÁLISE DE CONTATO"
      >
        <div>
          <label htmlFor="select-scenario" style={{ marginBottom: '8px', display: 'block' }}>
            Selecione o tipo de mensagem que ele enviou:
          </label>
          <select
            id="select-scenario"
            value={selectedScenarioId}
            onChange={(e) => setSelectedScenarioId(Number(e.target.value))}
            style={{ marginBottom: '20px' }}
          >
            {SUPPORT_SCENARIOS.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.title}
              </option>
            ))}
          </select>

          {(() => {
            const sc = SUPPORT_SCENARIOS.find((s) => s.id === selectedScenarioId) || SUPPORT_SCENARIOS[0];
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '16px' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    O que é fato observável:
                  </strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatIsFact}</p>
                </div>

                <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '16px' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    O que ainda não sabemos:
                  </strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatWeDontKnow}</p>
                </div>

                <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '16px' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--gold-decorative)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    O que observar em seguida:
                  </strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatToObserve}</p>
                </div>

                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--primary-soft)',
                    borderRadius: '16px',
                  }}
                >
                  <strong style={{ fontSize: '13px', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                    Ação recomendada:
                  </strong>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>{sc.suggestedAction}</p>
                </div>

                {sc.relatedMessageTemplate && (
                  <div
                    className="card"
                    style={{
                      border: '1px solid var(--border)',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="eyebrow">MODELO SUGERIDO</span>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleCopyText(sc.relatedMessageTemplate!)}
                      >
                        <Copy size={13} /> Copiar
                      </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', color: 'var(--text)' }}>
                      "{sc.relatedMessageTemplate}"
                    </p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </Modal>

      {/* MODAL 4: Laboratório de Mensagens */}
      <Modal
        isOpen={activeModal === 'laboratorio'}
        onClose={() => {
          setActiveModal(null);
          setEditingMsg(null);
        }}
        title="Laboratório de Mensagens"
        eyebrow="24 MODELOS EDITORIAIS"
        maxWidth="680px"
      >
        <div>
          {/* Se estiver editando uma mensagem com a voz da usuária */}
          {editingMsg ? (
            <div className="animate-fade-in">
              <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>
                EDITAR COM A SUA VOZ
              </span>
              <h3 style={{ margin: '0 0 14px', fontSize: '20px' }}>{editingMsg.title}</h3>

              <textarea
                value={editingMsg.text}
                onChange={(e) => setEditingMsg({ ...editingMsg, text: e.target.value })}
                style={{ minHeight: '140px', marginBottom: '16px' }}
              />

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleCopyText(editingMsg.text);
                  }}
                >
                  <Copy size={16} /> Copiar para o WhatsApp
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    handleSaveDraft(editingMsg.title, editingMsg.text);
                  }}
                >
                  <BookmarkPlus size={16} /> Guardar nos Rascunhos
                </button>
                <button
                  className="btn btn-soft"
                  onClick={() => setEditingMsg(null)}
                >
                  Voltar à lista
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Filtros e Busca */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  />
                  <input
                    type="text"
                    placeholder="Buscar modelo por tema ou palavra..."
                    value={msgSearch}
                    onChange={(e) => setMsgSearch(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
                  {msgCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setMsgCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '99px',
                        border: '1px solid var(--border)',
                        backgroundColor: msgCategory === cat ? 'var(--primary)' : 'transparent',
                        color: msgCategory === cat ? '#FFFDFA' : 'var(--text-muted)',
                        fontSize: '12px',
                        fontWeight: msgCategory === cat ? 700 : 500,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista dos Modelos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto' }}>
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="card"
                    style={{ padding: '18px 20px', border: '1px solid var(--border)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span className="pill pill-outline" style={{ fontSize: '10px', padding: '2px 8px' }}>
                        {msg.category}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleCopyText(msg.template)}
                          title="Copiar texto"
                        >
                          <Copy size={13} /> Copiar
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setEditingMsg({ id: msg.id, text: msg.template, title: msg.title })}
                          title="Personalizar texto"
                        >
                          Personalizar
                        </button>
                      </div>
                    </div>

                    <h4 style={{ margin: '4px 0 6px', fontSize: '16px', color: 'var(--text)' }}>
                      {msg.title}
                    </h4>
                    <p style={{ fontSize: '13px', margin: '0 0 10px', color: 'var(--text-muted)' }}>
                      {msg.context}
                    </p>

                    <div
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'var(--bg)',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        color: 'var(--text)',
                        marginBottom: '8px',
                      }}
                    >
                      "{msg.template}"
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--error)' }}>
                      <strong>Evite:</strong> {msg.avoidTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL 5: Fato ou Interpretação */}
      <Modal
        isOpen={activeModal === 'fato-interpretacao'}
        onClose={() => setActiveModal(null)}
        title="Fato ou Interpretação?"
        eyebrow="LUCIDEZ EMOCIONAL"
      >
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
            <button
              className={`btn btn-sm ${factMode === 'preset' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFactMode('preset')}
            >
              Cenários comuns
            </button>
            <button
              className={`btn btn-sm ${factMode === 'custom' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFactMode('custom')}
            >
              Minha própria situação
            </button>
          </div>

          {factMode === 'preset' ? (
            <div>
              <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                Selecione uma situação comum para exercitar o filtro de lucidez:
              </p>
              <select
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(Number(e.target.value))}
                style={{ marginBottom: '16px' }}
              >
                {SUPPORT_SCENARIOS.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.title}
                  </option>
                ))}
              </select>

              {(() => {
                const sc = SUPPORT_SCENARIOS.find((s) => s.id === selectedScenarioId) || SUPPORT_SCENARIOS[0];
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ padding: '14px', backgroundColor: 'var(--success-soft)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--success)', textTransform: 'uppercase' }}>
                        1. Fato (o que a câmera filmou):
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatIsFact}</p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'var(--error-soft)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--error)', textTransform: 'uppercase' }}>
                        2. O que a mente supõe no medo:
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatHappened}</p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        3. O que ainda não sabemos:
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatWeDontKnow}</p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'var(--primary-soft)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>
                        4. O que observar em seguida:
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatToObserve}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                Preencha os campos para desacelerar o pensamento e enxergar a situação com clareza:
              </p>
              <label>1. O que aconteceu de fato (apenas fatos comprováveis):</label>
              <textarea
                placeholder="Ex: Ele me ligou ontem às 21h e conversamos por 10 minutos..."
                value={customSituation.fact}
                onChange={(e) => setCustomSituation({ ...customSituation, fact: e.target.value })}
                style={{ minHeight: '70px', marginBottom: '12px' }}
              />

              <label>2. O significado que a minha mente está dando:</label>
              <textarea
                placeholder="Ex: Estou achando que ele quer voltar / estou com medo de que ele já esteja com outra..."
                value={customSituation.interpretation}
                onChange={(e) => setCustomSituation({ ...customSituation, interpretation: e.target.value })}
                style={{ minHeight: '70px', marginBottom: '12px' }}
              />

              <label>3. O que eu ainda NÃO posso provar com certeza:</label>
              <textarea
                placeholder="Ex: Não sei qual é a real intenção dele porque ele não expressou isso..."
                value={customSituation.unknown}
                onChange={(e) => setCustomSituation({ ...customSituation, unknown: e.target.value })}
                style={{ minHeight: '70px', marginBottom: '16px' }}
              />

              <button
                className="btn btn-primary btn-block"
                onClick={() => {
                  if (customSituation.fact.trim()) {
                    StorageService.saveJournalEntry({
                      date: new Date().toISOString(),
                      content: `Fato: ${customSituation.fact}\nInterpretação: ${customSituation.interpretation}\nO que não sei: ${customSituation.unknown}`,
                      promptUsed: 'Exercício: Fato ou Interpretação',
                    });
                    onShowToast('Exercício salvo com sucesso no seu Diário!');
                    setActiveModal(null);
                  } else {
                    onShowToast('Preencha pelo menos o campo de fatos.');
                  }
                }}
              >
                Salvar exercício no Diário
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL 6: Assistente de Clareza (Plus) */}
      <Modal
        isOpen={activeModal === 'assistente-plus'}
        onClose={() => setActiveModal(null)}
        title="Assistente de Clareza"
        eyebrow="FLORECER PLUS"
      >
        <div>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--primary-soft)',
              borderRadius: '16px',
              marginBottom: '16px',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--primary)', lineHeight: '1.6' }}>
              O Assistente de Clareza opera com princípios éticos rigorosos: ele não promete volta de ex, não diagnostica comportamentos de terceiros e ajuda você a estruturar mensagens e pensamentos com elegância e maturidade.
            </p>
          </div>

          <label>Qual situação você gostaria de estruturar hoje?</label>
          <textarea
            placeholder="Ex: Ele me convidou para sair no fim de semana, mas eu tenho medo de ceder e voltar para os mesmos problemas de antes..."
            style={{ minHeight: '110px', marginBottom: '16px' }}
          />

          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              onShowToast('Modo de auxílio interativo ativo para esta sessão.');
              setActiveModal(null);
            }}
          >
            Organizar meus pontos com o Assistente
          </button>
        </div>
      </Modal>
    </div>
  );
};
