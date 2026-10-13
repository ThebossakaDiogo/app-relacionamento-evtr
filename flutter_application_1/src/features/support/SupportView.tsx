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
  const [msgCategory, setMsgCategory] = useState<string>('Todo');
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
  const msgCategories = ['Todo', 'Respuestas Cortas', 'Práctico y Límites', 'Respuestas con Calma', 'Apertura de Diálogo', 'Nostalgia y Emociones', 'Encuentros', 'Reconciliación'];

  const filteredMessages = MESSAGE_TEMPLATES.filter((m) => {
    const matchesCategory = msgCategory === 'Todo' || m.category === msgCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.template.toLowerCase().includes(msgSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onShowToast('Mensaje copiado al portapapeles.');
    } catch {
      onShowToast('Selecciona y copia el texto manualmente.');
    }
  };

  const handleSaveDraft = (title: string, content: string) => {
    StorageService.saveMessageDraft({
      title,
      content,
      category: 'Apoyo',
    });
    onShowToast('Mensaje guardado en tus Borradores (pestaña Tú).');
  };

  // Cálculo da decisão: Devo mandar mensagem?
  const handleCalculateDm = () => {
    if (!dmAnswers.hasClearGoal || dmAnswers.ifNoResponse.includes('desesperaría')) {
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
        <span className="eyebrow">UN ESPACIO PARA ORGANIZAR</span>
        <h1 style={{ margin: '6px 0 8px', fontSize: '32px' }}>
          ¿Qué pasó ahora?
        </h1>
        <p style={{ fontSize: '15px' }}>
          Cuando algo cambia, no tienes que decidir sola por impulso. Elige la herramienta ideal para tu momento.
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
              <span className="eyebrow">FLUJO DE DECISIÓN</span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>¿Debo enviar un mensaje?</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Descubre si el contacto ahora tiene sentido o si es mejor esperar para preservar tu paz.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Evaluar mi intención <ArrowRight size={15} />
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
              <span className="eyebrow">ANÁLISIS DE CONTACTO</span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Él me escribió</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Organiza lo que realmente dijo antes de responder, evitando caer en ilusiones o impulsos.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Analizar su mensaje <ArrowRight size={15} />
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
                24 MODELOS EDITORIALES
              </span>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Encuentra las palabras</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Modelos de mensajes elegantes y maduros para cada situación. Copia o edita con tu propia voz.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Ver modelos de mensaje <ArrowRight size={15} />
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
              <h3 style={{ margin: 0, fontSize: '18px' }}>¿Hecho o interpretación?</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Separa lo que una cámara filmaría de lo que tu miedo o deseo está suponiendo.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Abrir analizador <ArrowRight size={15} />
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
              <h3 style={{ margin: 0, fontSize: '18px' }}>Asistente de Claridad</h3>
            </div>
          </div>
          <p style={{ fontSize: '14px', flex: 1, marginBottom: '16px' }}>
            Estructura una conversación delicada u organiza tus pensamientos con apoyo guiado.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#8B4513', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Acceder al Asistente <ArrowRight size={15} />
          </span>
        </div>
      </div>

      {/* MODAL 1: Devo mandar mensagem? */}
      <Modal
        isOpen={activeModal === 'devo-mandar'}
        onClose={() => setActiveModal(null)}
        title="¿Debo enviar un mensaje?"
        eyebrow="FLUJO DE DECISIÓN"
      >
        {!dmResult ? (
          <div>
            {dmStep === 1 && (
              <div>
                <p style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '16px' }}>
                  1. ¿Qué hizo que sintieras ganas de ponerte en contacto en este preciso momento?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Un asunto práctico o impostergable (cosas, documentos, mascota)',
                    'Un pico repentino de nostalgia o soledad',
                    'Vi algo en redes sociales o me acordé de los dos',
                    'Quiero pedir disculpas por algo específico que hice',
                    'Quiero saber si todavía hay apertura entre nosotros',
                  ].map((opt) => (
                    <button
                      key={opt}
                      className="card"
                      onClick={() => {
                        setDmAnswers((prev) => ({
                          ...prev,
                          reason: opt,
                          isPractical: opt.includes('práctico'),
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
                  2. ¿Qué esperas secretamente que suceda después de enviarlo?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Solo resolver el asunto práctico con rapidez',
                    'Que me responda diciendo que se arrepintió y quiere volver',
                    'Aliviar mi angustia y saber que no me ha olvidado',
                    'Tener una respuesta madura y tranquila',
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
                  3. Si no responde o tarda más de 24 horas, ¿cómo te sentirías?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Me desesperaría, revisando el celular a cada minuto',
                    'Me sentiría triste, pero puedo seguir con mis cosas en paz',
                    'Tranquila: el tema es objetivo y el silencio ya será una respuesta',
                  ].map((opt) => (
                    <button
                      key={opt}
                      className="card"
                      onClick={() => {
                        setDmAnswers((prev) => ({
                          ...prev,
                          ifNoResponse: opt,
                          hasClearGoal: opt.includes('Tranquila') || opt.includes('triste'),
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
                  RECOMENDACIÓN: ESPERA UN POCO
                </span>
                <h3 style={{ fontSize: '22px', margin: '12px 0 10px', color: 'var(--primary)' }}>
                  Espera antes de iniciar contacto.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Tu motivación principal ahora parece ser aliviar la angustia de la incertidumbre. Enviar un mensaje en este estado transfiere el control de tu paz a su respuesta. Date a ti misma 24 horas de tregua.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveModal('90-segundos');
                    }}
                  >
                    Hacer pausa de 90 segundos ahora
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onNavigateTab('voce');
                      setActiveModal(null);
                    }}
                  >
                    Escribir en el Diario Privado
                  </button>
                </div>
              </div>
            )}

            {dmResult === 'prepare' && (
              <div>
                <span className="pill pill-success" style={{ marginBottom: '12px', fontSize: '13px' }}>
                  RECOMENDACIÓN: PREPARA ANTES DE ENVIAR
                </span>
                <h3 style={{ fontSize: '22px', margin: '12px 0 10px', color: 'var(--primary)' }}>
                  Hay un asunto concreto. Mantén el texto objetivo.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Tienes un asunto práctico que resolver. La mejor estrategia es ser breve, educada y directa, sin mezclar recuerdos emocionales con recados prácticos.
                </p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setActiveModal('laboratorio');
                  }}
                >
                  Ver modelos de Asunto Práctico
                </button>
              </div>
            )}

            {dmResult === 'conversation' && (
              <div>
                <span className="pill" style={{ marginBottom: '12px', fontSize: '13px' }}>
                  RECOMENDACIÓN: UNA CONVERSACIÓN PUEDE TENER SENTIDO
                </span>
                <h3 style={{ fontSize: '22px', margin: '12px 0 10px', color: 'var(--primary)' }}>
                  Objetivo claro y madurez para lidiar con la respuesta.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Evaluaste tu estado emocional y demostraste estar preparada para cualquier desenlace. Elige un modelo respetuoso y envía con tranquilidad.
                </p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setActiveModal('laboratorio');
                  }}
                >
                  Preparar mensaje en el Laboratorio
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
        title="Quiero hablar con él ahora"
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
                ? 'Inhala en 4 segundos... sostén en 2... exhala en 6 segundos.'
                : 'Tiempo completado. Respira y evalúa cómo se siente tu cuerpo.'}
            </small>
          </div>

          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Escribe a continuación absolutamente todo lo que te gustaría decir ahora. Descarga el texto sin filtro: nada de esto se enviará a nadie.
          </p>

          <textarea
            placeholder="Si pudiera decir cualquier cosa sin consecuencias ahora..."
            value={sosDraft}
            onChange={(e) => setSosDraft(e.target.value)}
            style={{ minHeight: '130px', marginBottom: '16px' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                if (sosDraft.trim()) {
                  handleSaveDraft('Desahogo SOS (90 segundos)', sosDraft.trim());
                  setSosDraft('');
                  setActiveModal(null);
                } else {
                  onShowToast('Escribe algo antes de guardar.');
                }
              }}
            >
              Guardar en el Diario sin enviar
            </button>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => setActiveModal(null)}
            >
              Terminar pausa
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL 3: Ele me chamou */}
      <Modal
        isOpen={activeModal === 'ele-me-chamou'}
        onClose={() => setActiveModal(null)}
        title="Él me escribió"
        eyebrow="ANÁLISIS DE CONTACTO"
      >
        <div>
          <label htmlFor="select-scenario" style={{ marginBottom: '8px', display: 'block' }}>
            Selecciona el tipo de mensaje que él envió:
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
                    Lo que es un hecho observable:
                  </strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatIsFact}</p>
                </div>

                <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '16px' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Lo que todavía no sabemos:
                  </strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatWeDontKnow}</p>
                </div>

                <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '16px' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--gold-decorative)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Qué observar a continuación:
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
                    Acción recomendada:
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
        title="Laboratorio de Mensajes"
        eyebrow="24 MODELOS EDITORIALES"
        maxWidth="680px"
      >
        <div>
          {/* Se estiver editando uma mensagem com a voz da usuária */}
          {editingMsg ? (
            <div className="animate-fade-in">
              <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>
                EDITAR CON TU VOZ
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
                  <Copy size={16} /> Copiar para WhatsApp
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    handleSaveDraft(editingMsg.title, editingMsg.text);
                  }}
                >
                  <BookmarkPlus size={16} /> Guardar en Borradores
                </button>
                <button
                  className="btn btn-soft"
                  onClick={() => setEditingMsg(null)}
                >
                  Volver a la lista
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
                    placeholder="Buscar modelo por tema o palabra..."
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
                      <strong>Evita:</strong> {msg.avoidTip}
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
        title="¿Hecho o interpretación?"
        eyebrow="LUCIDEZ EMOCIONAL"
      >
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
            <button
              className={`btn btn-sm ${factMode === 'preset' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFactMode('preset')}
            >
              Escenarios comunes
            </button>
            <button
              className={`btn btn-sm ${factMode === 'custom' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFactMode('custom')}
            >
              Mi propia situación
            </button>
          </div>

          {factMode === 'preset' ? (
            <div>
              <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                Selecciona una situación común para ejercitar el filtro de lucidez:
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
                        1. Hecho (lo que filmó la cámara):
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatIsFact}</p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'var(--error-soft)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--error)', textTransform: 'uppercase' }}>
                        2. Lo que la mente supone por miedo:
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatHappened}</p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'var(--bg)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        3. Lo que todavía no sabemos:
                      </strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text)' }}>{sc.whatWeDontKnow}</p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: 'var(--primary-soft)', borderRadius: '14px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase' }}>
                        4. Qué observar a continuación:
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
                Completa los campos para desacelerar el pensamiento y ver la situación con claridad:
              </p>
              <label>1. Lo que sucedió de hecho (solo hechos comprobables):</label>
              <textarea
                placeholder="Ej: Me llamó ayer a las 21:00 y hablamos durante 10 minutos..."
                value={customSituation.fact}
                onChange={(e) => setCustomSituation({ ...customSituation, fact: e.target.value })}
                style={{ minHeight: '70px', marginBottom: '12px' }}
              />

              <label>2. El significado que mi mente le está dando:</label>
              <textarea
                placeholder="Ej: Creo que quiere volver / tengo miedo de que ya esté con otra persona..."
                value={customSituation.interpretation}
                onChange={(e) => setCustomSituation({ ...customSituation, interpretation: e.target.value })}
                style={{ minHeight: '70px', marginBottom: '12px' }}
              />

              <label>3. Lo que todavía NO puedo demostrar con certeza:</label>
              <textarea
                placeholder="Ej: No sé cuál es su verdadera intención porque no lo ha expresado..."
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
                      content: `Hecho: ${customSituation.fact}\nInterpretación: ${customSituation.interpretation}\nLo que no sé: ${customSituation.unknown}`,
                      promptUsed: 'Ejercicio: Hecho o Interpretación',
                    });
                    onShowToast('¡Ejercicio guardado con éxito en tu Diario!');
                    setActiveModal(null);
                  } else {
                    onShowToast('Completa al menos el campo de hechos.');
                  }
                }}
              >
                Guardar ejercicio en el Diario
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* MODAL 6: Assistente de Clareza (Plus) */}
      <Modal
        isOpen={activeModal === 'assistente-plus'}
        onClose={() => setActiveModal(null)}
        title="Asistente de Claridad"
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
              El Asistente de Claridad opera con principios éticos rigurosos: no promete el regreso de una expareja, no diagnostica conductas de terceros y te ayuda a estructurar mensajes y pensamientos con elegancia y madurez.
            </p>
          </div>

          <label>¿Qué situación te gustaría estructurar hoy?</label>
          <textarea
            placeholder="Ej: Me invitó a salir el fin de semana, pero tengo miedo de ceder y volver a los mismos problemas de antes..."
            style={{ minHeight: '110px', marginBottom: '16px' }}
          />

          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              onShowToast('Modo de asistencia interactiva activo para esta sesión.');
              setActiveModal(null);
            }}
          >
            Organizar mis puntos con el Asistente
          </button>
        </div>
      </Modal>
    </div>
  );
};
