import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2, Sparkles, HeartHandshake, Check } from 'lucide-react';
import { OnboardingAnswers, UserProfile } from '../../types';
import { computeRelationshipContext, StorageService } from '../../services/storageService';
import { PurchaseConfirmationModal } from '../../components/PurchaseConfirmationModal';
import { GoldenLotusIcon } from '../../components/GoldenLotusIcon';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);


  const [answers, setAnswers] = useState<OnboardingAnswers>({
    situation: '',
    breakupInitiator: '',
    elapsedTime: '',
    contactPattern: '',
    lastInteraction: '',
    mainDifficulty: '',
    desiredOutcome: '',
    safetyFlag: false,
  });

  const [showResult, setShowResult] = useState<boolean>(false);

  // Total de pasos: Nombre (paso 0), 8 preguntas (pasos 1 a 8)
  const totalQuestions = 8;

  const handleSelectOption = (key: keyof OnboardingAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 0 && !name.trim()) return;
    if (step < totalQuestions) {
      setStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const context = computeRelationshipContext(answers);
    const profile: UserProfile = {
      name: name.trim() || 'Ana',
      hasCompletedOnboarding: true,
      onboardingAnswers: answers,
      relationshipContext: context,
      isPlus: false,
    };
    StorageService.saveUserProfile(profile);
    onComplete(profile);
  };

  // Si el resultado del mapa ya fue calculado
  if (showResult) {
    const context = computeRelationshipContext(answers);
    const isSafety = context.phase === 'safety';

    return (
      <div
        className="animate-fade-in"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg)',
          padding: '32px 20px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '620px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: isSafety ? 'var(--error-soft)' : 'var(--primary-soft)',
              color: isSafety ? 'var(--error)' : 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            {isSafety ? <ShieldAlert size={32} /> : <Sparkles size={32} />}
          </div>
          <span className="eyebrow">TU MAPA DEL MOMENTO</span>
          <h1 style={{ fontSize: '32px', margin: '8px 0 12px' }}>
            {name ? `${name}, tu plan está listo` : 'Tu plan está listo'}
          </h1>
          <p style={{ fontSize: '15px' }}>
            Organizamos tu momento actual para que sepas cuál es tu próximo paso consciente.
          </p>
        </div>

        <div
          className="card"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1.5px solid var(--border)',
            padding: '28px 24px',
            marginBottom: '28px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <span
              className={`pill ${isSafety ? 'pill-outline' : ''}`}
              style={{
                backgroundColor: isSafety ? 'var(--error-soft)' : 'var(--primary-soft)',
                color: isSafety ? 'var(--error)' : 'var(--primary)',
                marginBottom: '8px',
              }}
            >
              Fase actual: {context.phaseName}
            </span>
            <p style={{ fontSize: '15px', color: 'var(--text)', marginTop: '8px', lineHeight: '1.6' }}>
              {context.explanation}
            </p>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg)',
              borderRadius: '16px',
              marginBottom: '16px',
            }}
          >
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Foco ahora:
            </strong>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
              {context.focus}
            </p>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg)',
              borderRadius: '16px',
            }}
          >
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--gold-decorative)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Primer paso:
            </strong>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
              {context.firstStep}
            </p>
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleFinish} style={{ fontSize: '16px' }}>
          Comenzar mi plan <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // Pasos del Onboarding
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar with Progress */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
        }}
      >
        <button
          onClick={handleBack}
          disabled={step === 0}
          style={{
            background: 'none',
            border: 'none',
            color: step === 0 ? 'transparent' : 'var(--primary)',
            cursor: step === 0 ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
          {step === 0 ? 'Inicio' : `${step} de ${totalQuestions}`}
        </span>

        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            color: 'var(--primary)',
            fontWeight: 600,
          }}
        >
          florecer
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '3px', backgroundColor: 'var(--border)' }}>
        <div
          style={{
            height: '100%',
            backgroundColor: 'var(--primary)',
            width: `${((step + 1) / (totalQuestions + 1)) * 100}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Question Content */}
      <div
        style={{
          flex: 1,
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
          padding: '32px 20px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        className="animate-fade-in"
      >
        {/* Step 0: Nombre */}
        {step === 0 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <GoldenLotusIcon size={52} />
              <div
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontStyle: 'italic',
                  fontSize: '36px',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  marginTop: '4px',
                }}
              >
                Florecer
              </div>
              <small
                style={{
                  display: 'block',
                  color: 'var(--gold-decorative)',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                }}
              >
                Del fin, hacia un nuevo florecer ♡
              </small>
            </div>

            <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>
              TU GUÍA DE CLARIDAD PARA EL POST-RUPTURA
            </span>
            <h1 style={{ fontSize: '28px', margin: '8px 0 14px', textAlign: 'center' }}>
              El acompañamiento que necesitas para volver a empezar.
            </h1>
            <p style={{ marginBottom: '24px', fontSize: '14px', textAlign: 'center', lineHeight: '1.6' }}>
              Un espacio confidencial para salirte del modo desesperación, calmar la urgencia y devolverte el equilibrio, paso a paso.
            </p>

            <label htmlFor="user-name">¿Cómo podemos llamarte?</label>
            <input
              id="user-name"
              type="text"
              placeholder="Escribe tu primer nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && name.trim() && handleNext()}
              autoFocus
              style={{ marginBottom: '24px' }}
            />

            <button
              className="btn btn-primary btn-block"
              onClick={handleNext}
              disabled={!name.trim()}
              style={{ opacity: name.trim() ? 1 : 0.6, marginBottom: '14px' }}
            >
              Iniciar Mapa del Momento <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                padding: '8px 0',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              <Sparkles size={14} color="var(--gold-decorative)" /> ¿Ya compraste? Confirmar correo y activar acceso
            </button>
          </div>
        )}


        {/* Step 1: ¿Qué está pasando? */}
        {step === 1 && (
          <div>
            <span className="eyebrow">PREGUNTA 1 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Qué está pasando entre ustedes ahora?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Terminamos recientemente',
                'Él pidió espacio',
                'Estamos totalmente alejados',
                'Todavía hablamos con frecuencia',
                'Volvimos a hablar después de la ruptura',
                'Estamos intentando volver a empezar',
                'No sé exactamente dónde estamos',
              ].map((opt) => (
                <button
                  key={opt}
                  className={`card ${answers.situation === opt ? 'selected' : ''}`}
                  onClick={() => {
                    handleSelectOption('situation', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.situation === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.situation === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: answers.situation === opt ? 600 : 400,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: ¿Quién tomó la decisión? */}
        {step === 2 && (
          <div>
            <span className="eyebrow">PREGUNTA 2 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Quién tomó la decisión principal de la ruptura o el alejamiento?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Él decidió',
                'Yo decidí',
                'Ambos decidimos de común acuerdo',
                'No hubo una ruptura clara (alejamiento tácito)',
              ].map((opt) => (
                <button
                  key={opt}
                  className="card"
                  onClick={() => {
                    handleSelectOption('breakupInitiator', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.breakupInitiator === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.breakupInitiator === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: ¿Cuánto tiempo hace? */}
        {step === 3 && (
          <div>
            <span className="eyebrow">PREGUNTA 3 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Hace cuánto tiempo pasó esto?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Menos de 7 días',
                '1–2 semanas',
                '2–4 semanas',
                '1–3 meses',
                'Más de 3 meses',
              ].map((opt) => (
                <button
                  key={opt}
                  className="card"
                  onClick={() => {
                    handleSelectOption('elapsedTime', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.elapsedTime === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.elapsedTime === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: ¿Cómo está el contacto? */}
        {step === 4 && (
          <div>
            <span className="eyebrow">PREGUNTA 4 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Cómo está el patrón de contacto entre ustedes hoy?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Sin contacto (cero contacto)',
                'Solo cuestiones prácticas esenciales',
                'Conversaciones ocasionales',
                'Hablamos casi todos los días',
                'Él aparece y desaparece (inconstante)',
                'Yo busco más que él',
                'Él busca más que yo',
              ].map((opt) => (
                <button
                  key={opt}
                  className="card"
                  onClick={() => {
                    handleSelectOption('contactPattern', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.contactPattern === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.contactPattern === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Última interacción */}
        {step === 5 && (
          <div>
            <span className="eyebrow">PREGUNTA 5 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Cómo fue la última interacción de ustedes?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Sin contacto por un tiempo',
                'Conversación normal y amigable',
                'Discusión o malentendido',
                'Respuesta fría o monosilábica de él',
                'Conversación cariñosa o con nostalgia',
                'Él me buscó primero',
                'Yo lo busqué primero y me dejó en visto',
              ].map((opt) => (
                <button
                  key={opt}
                  className="card"
                  onClick={() => {
                    handleSelectOption('lastInteraction', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.lastInteraction === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.lastInteraction === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Mayor dificultad */}
        {step === 6 && (
          <div>
            <span className="eyebrow">PREGUNTA 6 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Cuál ha sido tu mayor dificultad ahora?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Resistir las ganas urgentes de enviar un mensaje',
                'Saber si debo esperar o seguir adelante',
                'Interpretar actitudes y señales virtuales',
                'Saber exactamente qué responder',
                'Miedo desesperador de ser olvidada',
                'Miedo de perder definitivamente la relación',
                'Saber si todavía hay espacio para una conversación',
                'Lograr volver a enfocarme en mi propia rutina',
              ].map((opt) => (
                <button
                  key={opt}
                  className="card"
                  onClick={() => {
                    handleSelectOption('mainDifficulty', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.mainDifficulty === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.mainDifficulty === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Objetivo */}
        {step === 7 && (
          <div>
            <span className="eyebrow">PREGUNTA 7 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>¿Qué te gustaría lograr más con este plan?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Entender si podemos hablar con madurez',
                'Intentar reconstruir la relación con nuevas bases',
                'Evaluar si existe reciprocidad real',
                'Todavía no sé, solo quiero tener claridad',
                'Seguir adelante y recuperar mi paz',
              ].map((opt) => (
                <button
                  key={opt}
                  className="card"
                  onClick={() => {
                    handleSelectOption('desiredOutcome', opt);
                    handleNext();
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderColor: answers.desiredOutcome === opt ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: answers.desiredOutcome === opt ? 'var(--primary-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Pregunta de Seguridad */}
        {step === 8 && (
          <div>
            <span className="eyebrow">PREGUNTA 8 DE 8 · SEGURIDAD</span>
            <h2 style={{ margin: '10px 0 16px', fontSize: '26px' }}>
              ¿Existe alguna situación de amenaza, coacción, acoso o miedo físico/emocional?
            </h2>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
              Esta pregunta nos ayuda a calibrar las orientaciones con total responsabilidad ética. Tus datos son 100% privados y guardados solo en tu dispositivo.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                className="card"
                onClick={() => {
                  handleSelectOption('safetyFlag', false);
                  handleNext();
                }}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
              >
                No, no hay ninguna situación de riesgo o amenaza.
              </button>

              <button
                className="card"
                onClick={() => {
                  handleSelectOption('safetyFlag', true);
                  handleNext();
                }}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  borderColor: 'var(--error)',
                  backgroundColor: 'var(--error-soft)',
                  color: 'var(--error)',
                  fontWeight: 600,
                }}
              >
                Sí, existe o existió amenaza o miedo.
              </button>

              <button
                className="card"
                onClick={() => {
                  handleSelectOption('safetyFlag', false);
                  handleNext();
                }}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
              >
                Prefiero no responder en este momento.
              </button>
            </div>
          </div>
        )}
      </div>

      <PurchaseConfirmationModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        initialEmail=""
        onSuccess={(confirmed) => {
          if (confirmed.name && confirmed.name !== 'Tú') {
            setName(confirmed.name);
          }
          // Avanza al mapa o concluye
          setIsPurchaseModalOpen(false);
          setStep(1);
        }}
      />
    </div>
  );
};

