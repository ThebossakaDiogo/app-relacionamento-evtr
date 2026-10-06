import React from 'react';
import { House, Route, MessagesSquare, BookOpen, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

export type NavTab = 'hoje' | 'jornada' | 'apoio' | 'biblioteca' | 'voce';

interface AppShellProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  userProfile: UserProfile;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onTabChange,
  userProfile,
  children,
}) => {
  const navItems = [
    { key: 'hoje' as NavTab, label: 'Hoje', icon: House },
    { key: 'jornada' as NavTab, label: 'Jornada', icon: Route },
    { key: 'apoio' as NavTab, label: 'Apoio', icon: MessagesSquare },
    { key: 'biblioteca' as NavTab, label: 'Biblioteca', icon: BookOpen },
    { key: 'voce' as NavTab, label: 'Você', icon: User },
  ];

  const phaseName = userProfile.relationshipContext?.phaseName || 'Plano Personalizado';
  const initialLetter = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'V';

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Desktop Sidebar (visible on >= 1024px) */}
      <aside
        className="desktop-sidebar"
        style={{
          width: '260px',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'none',
          flexDirection: 'column',
          padding: '36px 24px',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '34px',
              fontWeight: 600,
              color: 'var(--primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            magnética
          </div>
          <small
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginTop: '4px',
              fontWeight: 700,
            }}
          >
            clareza para o próximo passo
          </small>
          {userProfile.isPurchased && (
            <div
              style={{
                marginTop: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                color: 'var(--gold-decorative)',
                border: '1px solid var(--gold-decorative)',
                borderRadius: '99px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <Sparkles size={12} /> Acesso VIP Vitalício
            </div>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary-soft)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '15px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Motivational note on desktop */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '19px',
              color: 'var(--primary)',
              lineHeight: 1.3,
            }}
          >
            Seu ritmo.
            <br />
            Suas escolhas.
          </div>
          <small style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block', marginTop: '6px' }}>
            Um passo consciente de cada vez.
          </small>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className="main-layout"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Top Header */}
        <header
          style={{
            height: 'var(--header-height)',
            backgroundColor: 'rgba(247, 243, 239, 0.92)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--primary)',
                letterSpacing: '-0.02em',
              }}
            >
              magnética
            </span>
            <span
              className="pill pill-outline"
              style={{ fontSize: '11px', padding: '3px 10px', height: '24px' }}
            >
              {phaseName}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userProfile.isPurchased && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  color: 'var(--gold-decorative)',
                  border: '1px solid var(--gold-decorative)',
                  borderRadius: '99px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={12} /> VIP
              </span>
            )}
            <button
              onClick={() => onTabChange('voce')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-soft)',
                color: 'var(--primary)',
                border: '1.5px solid var(--rose-decorative)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
              title="Meu perfil"
            >
              {initialLetter}
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main
          style={{
            flex: 1,
            maxWidth: '1020px',
            width: '100%',
            margin: '0 auto',
            padding: '20px 16px calc(var(--bottom-nav-height) + 24px + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (fixed bottom, active on mobile) */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          backgroundColor: 'rgba(255, 253, 250, 0.98)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 999,
          boxShadow: '0 -4px 20px rgba(46, 37, 41, 0.05)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                onTabChange(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                height: '100%',
                border: 'none',
                background: 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px 0',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '28px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive ? 'var(--primary-soft)' : 'transparent',
                  transition: 'background-color 0.2s',
                }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.01em',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Media Query CSS for Desktop vs Mobile Layout */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-sidebar {
            display: flex !important;
          }
          .main-layout {
            margin-left: 260px !important;
          }
          .mobile-bottom-nav {
            display: none !important;
          }
          main {
            padding-bottom: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};
