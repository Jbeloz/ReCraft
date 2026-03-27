import React, { useEffect, useCallback, useState } from 'react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* Keyframe animations injected once via a <style> tag */
const KEYFRAMES = `
  @keyframes modal-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modal-slide-up {
    from { transform: translateY(16px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;

const SIZE_MAP = {
  sm: '360px',
  md: '480px',
  lg: '680px',
};

export default function Modal({ isOpen, onClose, title, size = 'md', children, footer }) {
  const [closeBtnHovered, setCloseBtnHovered] = useState(false);

  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  const backdropStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
    animation: 'modal-fade-in 0.15s ease',
  };

  const dialogStyle = {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
    width: '100%',
    maxWidth: SIZE_MAP[size] || SIZE_MAP.md,
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    animation: 'modal-slide-up 0.18s ease',
    fontFamily: FONT,
  };

  const closeBtnStyle = {
    background: closeBtnHovered ? '#e5e7eb' : '#f3f4f6',
    border: 'none',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    color: closeBtnHovered ? '#1b1b1b' : '#6b7280',
    cursor: 'pointer',
    flexShrink: 0,
  };

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={backdropStyle}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div style={dialogStyle} role="dialog" aria-modal="true">

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.8rem 0' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1b1b1b', margin: 0 }}>{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              style={closeBtnStyle}
              onMouseEnter={() => setCloseBtnHovered(true)}
              onMouseLeave={() => setCloseBtnHovered(false)}
            >
              &#x2715;
            </button>
          </div>

          <div style={{ padding: '1.2rem 1.8rem 1.8rem', fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
            {children}
          </div>

          {footer && (
            <div style={{ padding: '0 1.8rem 1.6rem', display: 'flex', gap: '0.65rem', justifyContent: 'flex-end' }}>
              {footer}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
