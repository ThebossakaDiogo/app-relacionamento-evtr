import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#2E2529',
        color: '#FFFDFA',
        padding: '12px 24px',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 30px rgba(46, 37, 41, 0.25)',
        zIndex: 9999,
        maxWidth: '90%',
        textAlign: 'center',
        animation: 'fadeIn 0.2s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>{message}</span>
    </div>
  );
};
