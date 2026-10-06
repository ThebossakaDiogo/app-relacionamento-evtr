import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2, Sparkles, HeartHandshake, Check } from 'lucide-react';
import { OnboardingAnswers, UserProfile } from '../../types';
import { computeRelationshipContext, StorageService } from '../../services/storageService';
import { PurchaseConfirmationModal } from '../../components/PurchaseConfirmationModal';

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

  // Total steps: Name (step 0), 8 questions (steps 1 to 8)
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

  // Se o resultado do mapa já foi calculado
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
          <span className="eyebrow">SEU MAPA DO MOMENTO</span>
          <h1 style={{ fontSize: '32px', margin: '8px 0 12px' }}>
            {name ? `${name}, seu plano está pronto` : 'Seu plano está pronto'}
          </h1>
          <p style={{ fontSize: '15px' }}>
            Organizamos o seu momento atual para que você saiba qual é o seu próximo passo consciente.
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
              Fase atual: {context.phaseName}
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
              Foco agora:
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
              Primeiro passo:
            </strong>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
              {context.firstStep}
            </p>
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleFinish} style={{ fontSize: '16px' }}>
          Começar meu plano <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // Passos do Onboarding
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
          <ArrowLeft size={18} /> Voltar
        </button>

        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
          {step === 0 ? 'Início' : `${step} de ${totalQuestions}`}
        </span>

        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            color: 'var(--primary)',
            fontWeight: 600,
          }}
        >
          magnética
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
        {/* Step 0: Nome */}
        {step === 0 && (
          <div>
            <span className="eyebrow">BEM-VINDA AO MAGNÉTICA</span>
            <h1 style={{ fontSize: '32px', margin: '10px 0 16px' }}>
              Clareza para saber seu próximo passo.
            </h1>
            <p style={{ marginBottom: '28px', fontSize: '15px' }}>
              Este não é um curso genérico nem uma receita mágica para controlar sentimentos de ninguém. É um plano prático, passo a passo, para você saber o que fazer agora — sem agir no desespero.
            </p>

            <label htmlFor="user-name">Como podemos te chamar?</label>
            <input
              id="user-name"
              type="text"
              placeholder="Digite seu primeiro nome"
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
              Iniciar Mapa do Momento <ArrowRight size={18} />
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
              <Sparkles size={14} color="var(--gold-decorative)" /> Já comprou? Confirmar e-mail e ativar acesso
            </button>
          </div>
        )}


        {/* Step 1: O que está acontecendo? */}
        {step === 1 && (
          <div>
            <span className="eyebrow">PERGUNTA 1 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>O que está acontecendo entre vocês agora?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Terminamos recentemente',
                'Ele pediu espaço',
                'Estamos totalmente afastados',
                'Ainda conversamos com frequência',
                'Voltamos a conversar depois do término',
                'Estamos tentando recomeçar',
                'Não sei exatamente onde estamos',
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

        {/* Step 2: Quem tomou a decisão? */}
        {step === 2 && (
          <div>
            <span className="eyebrow">PERGUNTA 2 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>Quem tomou a decisão principal do término ou afastamento?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Ele decidiu',
                'Eu decidi',
                'Ambos decidimos em comum acordo',
                'Não houve um término claro (afastamento tácito)',
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

        {/* Step 3: Há quanto tempo? */}
        {step === 3 && (
          <div>
            <span className="eyebrow">PERGUNTA 3 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>Há quanto tempo isso aconteceu?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Menos de 7 dias',
                '1–2 semanas',
                '2–4 semanas',
                '1–3 meses',
                'Mais de 3 meses',
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

        {/* Step 4: Como está o contato? */}
        {step === 4 && (
          <div>
            <span className="eyebrow">PERGUNTA 4 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>Como está o padrão de contato entre vocês hoje?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Nenhum contato (contato zero)',
                'Apenas questões práticas essenciais',
                'Conversas ocasionais',
                'Conversamos quase todos os dias',
                'Ele aparece e desaparece (inconstante)',
                'Eu procuro mais do que ele',
                'Ele procura mais do que eu',
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

        {/* Step 5: Última interação */}
        {step === 5 && (
          <div>
            <span className="eyebrow">PERGUNTA 5 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>Como foi a última interação de vocês?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Sem contato há algum tempo',
                'Conversa normal e amigável',
                'Discussão ou desentendimento',
                'Resposta fria ou monossilábica dele',
                'Conversa carinhosa ou com saudade',
                'Ele me procurou primeiro',
                'Eu procurei primeiro e fiquei no vácuo',
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

        {/* Step 6: Maior dificuldade */}
        {step === 6 && (
          <div>
            <span className="eyebrow">PERGUNTA 6 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>Qual tem sido a sua maior dificuldade agora?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Resistir à vontade urgente de mandar mensagem',
                'Saber se devo esperar ou seguir em frente',
                'Interpretar atitudes e sinais virtuais',
                'Saber exatamente o que responder',
                'Medo desesperador de ser esquecida',
                'Medo de perder de vez a relação',
                'Saber se ainda existe espaço para uma conversa',
                'Conseguir voltar a focar na minha própria rotina',
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
            <span className="eyebrow">PERGUNTA 7 DE 8</span>
            <h2 style={{ margin: '10px 0 24px', fontSize: '26px' }}>O que você mais gostaria de alcançar com este plano?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Entender se podemos conversar com maturidade',
                'Tentar reconstruir a relação com novas bases',
                'Avaliar se existe reciprocidade real',
                'Ainda não sei, quero apenas ter clareza',
                'Seguir em frente e resgatar a minha paz',
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

        {/* Step 8: Pergunta de Segurança */}
        {step === 8 && (
          <div>
            <span className="eyebrow">PERGUNTA 8 DE 8 · SEGURANÇA</span>
            <h2 style={{ margin: '10px 0 16px', fontSize: '26px' }}>
              Existe alguma situação de ameaça, coerção, perseguição ou medo físico/emocional?
            </h2>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
              Esta pergunta nos ajuda a calibrar as orientações com total responsabilidade ética. Seus dados são 100% privados e salvos apenas no seu aparelho.
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
                Não, não há nenhuma situação de risco ou ameaça.
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
                Sim, existe ou existiu ameaça ou medo.
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
                Prefiro não responder neste momento.
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
          if (confirmed.name && confirmed.name !== 'Você') {
            setName(confirmed.name);
          }
          // Avança para o mapa ou conclui
          setIsPurchaseModalOpen(false);
          setStep(1);
        }}
      />
    </div>
  );
};

