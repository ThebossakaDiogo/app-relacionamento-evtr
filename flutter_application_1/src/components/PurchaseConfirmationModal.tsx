import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Mail,
  ArrowRight,
  Lock,
  X,
  CreditCard,
  Check,
  HeartHandshake,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { UserProfile } from '../types';
import { GoldenLotusIcon } from './GoldenLotusIcon';

interface PurchaseConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
  initialEmail?: string;
}

export const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState<string>(initialEmail);
  const [step, setStep] = useState<'input' | 'verifying' | 'confirmed'>('input');
  const [verificationProgress, setVerificationProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Conectando al sistema...');
  const [licenseCode, setLicenseCode] = useState<string>('');
  const [confirmedProfile, setConfirmedProfile] = useState<UserProfile | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Efecto de confeti en canvas al confirmar la compra
  useEffect(() => {
    if (step !== 'confirmed' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const colors = ['#A17C43', '#66384A', '#D5B7BE', '#32634F', '#F5EFE2', '#EFE3E7'];
    const confettiCount = 70;
    const particles = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
    }));

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        // Reposicionar si sale de la pantalla en los primeros segundos
        if (p.y > canvas.height && frame < 180) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      frame++;
      if (frame < 240) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [step]);

  if (!isOpen) return null;

  const handleStartVerification = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setStep('verifying');
    setVerificationProgress(5);
    setStatusMessage('Localizando datos de la compra en el servidor seguro...');

    // Timeline de la animación cinematográfica
    const t1 = setTimeout(() => {
      setVerificationProgress(30);
      setStatusMessage('Pago identificado: Acceso Vitalicio Aprobado...');
    }, 700);

    const t2 = setTimeout(() => {
      setVerificationProgress(65);
      setStatusMessage('Validando clave de licencia en cookies seguros...');
    }, 1500);

    const t3 = setTimeout(() => {
      setVerificationProgress(90);
      setStatusMessage('Desbloqueando los 28 Días del Plan Florecer...');
    }, 2200);

    const t4 = setTimeout(() => {
      setVerificationProgress(100);
      setStatusMessage('¡Todo listo! Tu acceso está 100% confirmado.');

      // Efectiva la compra en storage y cookies de 365 días
      const profile = StorageService.confirmPurchase(trimmed);
      setConfirmedProfile(profile);
      setLicenseCode(profile.licenseCode || 'FLO-VIP-2026');

      setTimeout(() => {
        setStep('confirmed');
      }, 500);
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  const handleFinish = () => {
    if (confirmedProfile) {
      onSuccess(confirmedProfile);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(46, 37, 41, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        role="dialog"
        style={{
          position: 'relative',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-modal)',
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '520px',
          boxShadow: 'var(--shadow-floating)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
        }}
      >
        {/* Canvas de Confetti transparente sobrepuesto */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />

        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--primary-soft)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--primary)',
            zIndex: 30,
            transition: 'all 0.2s',
          }}
        >
          <X size={18} />
        </button>

        {/* ESTADO 1: FORMULARIO DE INGRESO DEL CORREO */}
        {step === 'input' && (
          <div style={{ padding: '36px 28px 32px' }} className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ marginBottom: '10px' }}>
                <GoldenLotusIcon size={46} />
              </div>

              <span className="eyebrow" style={{ color: 'var(--gold-decorative)' }}>
                CONFIRMACIÓN DE ACCESO VIP
              </span>

              <h2 style={{ fontSize: '26px', margin: '8px 0 10px', lineHeight: 1.2 }}>
                Confirmar compra y correo
              </h2>

              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Ingresa el correo que usaste al adquirir Florecer para desbloquear y sincronizar tu plan completo.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="purchase-email" style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
                Tu correo registrado en la compra:
              </label>

              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--primary)',
                  }}
                />
                <input
                  id="purchase-email"
                  type="email"
                  placeholder="ejemplo: tucorreo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartVerification()}
                  style={{
                    paddingLeft: '44px',
                    fontSize: '15px',
                    borderColor: 'var(--primary)',
                  }}
                  autoFocus
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '10px',
                  fontSize: '12px',
                  color: 'var(--success)',
                }}
              >
                <ShieldCheck size={15} />
                <span>Tus datos se guardan en cookies cifrados de 365 días en tu dispositivo.</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleStartVerification}
              style={{ fontSize: '15px', padding: '14px 20px' }}
            >
              Verificar y Desbloquear Acceso <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* ESTADO 2: ANIMACIÓN DE VERIFICACIÓN EN CURSO */}
        {step === 'verifying' && (
          <div
            style={{
              padding: '48px 28px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className="animate-fade-in"
          >
            {/* Círculo pulsante animado */}
            <div
              style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-soft)',
                  animation: 'pulse 1.8s infinite ease-in-out',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gold-soft)',
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFDFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(102, 56, 74, 0.35)',
                }}
              >
                <Lock size={24} />
              </div>
            </div>

            <span className="eyebrow" style={{ color: 'var(--primary)', marginBottom: '6px' }}>
              SISTEMA DE SEGURIDAD FLORECER
            </span>

            <h3 style={{ fontSize: '22px', margin: '0 0 10px', color: 'var(--text)' }}>
              Verificando tu compra...
            </h3>

            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', minHeight: '40px' }}>
              {statusMessage}
            </p>

            {/* Barra de progreso animada */}
            <div
              style={{
                width: '100%',
                maxWidth: '340px',
                height: '8px',
                backgroundColor: 'var(--border)',
                borderRadius: '99px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--primary)',
                  width: `${verificationProgress}%`,
                  borderRadius: '99px',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            <small style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '12px' }}>
              {verificationProgress}% Completado
            </small>
          </div>
        )}

        {/* ESTADO 3: CELEBRACIÓN DE COMPRA CONFIRMADA CON ÉXITO */}
        {step === 'confirmed' && (
          <div style={{ padding: '36px 24px 32px' }} className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              {/* Ícono de Éxito con Brillo */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-soft)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: '0 8px 24px rgba(50, 99, 79, 0.25)',
                  border: '2px solid var(--success)',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <span
                className="pill pill-gold"
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  padding: '4px 12px',
                  marginBottom: '6px',
                }}
              >
                ★ COMPRA CONFIRMADA CON ÉXITO ★
              </span>

              <h2 style={{ fontSize: '26px', margin: '8px 0 6px', color: 'var(--text)' }}>
                ¡Acceso Vitalicio Liberado!
              </h2>

              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                Tu correo fue validado y sincronizado con las cookies de tu dispositivo.
              </p>
            </div>

            {/* Tarjeta de Miembro VIP / Comprobante Digital */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1.5px solid var(--gold-decorative)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 8px 24px rgba(161, 124, 67, 0.1)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '12px',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GoldenLotusIcon size={26} />
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-decorative)', fontWeight: 700 }}>
                      PASAPORTE VIP
                    </span>
                    <div style={{ fontFamily: 'var(--font-brand)', fontStyle: 'italic', fontSize: '19px', fontWeight: 600, color: 'var(--primary)' }}>
                      Florecer
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: 'var(--success-soft)',
                    color: 'var(--success)',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '99px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Check size={13} /> Activo
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div>
                  <small style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Correo de la Compradora:</small>
                  <strong style={{ color: 'var(--text)', wordBreak: 'break-all' }}>{email}</strong>
                </div>

                <div>
                  <small style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Código de Licencia:</small>
                  <strong style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>{licenseCode}</strong>
                </div>

                <div>
                  <small style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Plan:</small>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>Plan Personalizado 28 Días</span>
                </div>

                <div>
                  <small style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Sincronización:</small>
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>Cookies Activas (365 días)</span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleFinish}
              style={{ fontSize: '15px', padding: '14px 22px' }}
            >
              Acceder a Mi Plan Ahora <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};
