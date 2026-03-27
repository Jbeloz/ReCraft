import React from 'react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── Static style objects (module level) ── */

const WRAP_BASE = {
  fontFamily: FONT,
  marginBottom: '2rem',
};

const LABEL = {
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  color: '#2d6a4f',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  background: '#d8f3dc',
  padding: '3px 10px',
  borderRadius: '20px',
  marginBottom: '10px',
};

const TITLE = {
  fontSize: '1.6rem',
  fontWeight: 800,
  color: '#1a1a1a',
  margin: '0 0 8px',
  lineHeight: 1.2,
};

const SUBTITLE = {
  fontSize: '0.9rem',
  color: '#6b7280',
  margin: 0,
  lineHeight: 1.6,
};

/* ── Component ── */

export default function SectionHeader({ label, title, subtitle, align = 'left', style = {} }) {
  const wrapStyle = { ...WRAP_BASE, textAlign: align, ...style };

  return (
    <div style={wrapStyle}>
      {label    && <span style={LABEL}>{label}</span>}
      {title    && <h2 style={TITLE}>{title}</h2>}
      {subtitle && <p style={SUBTITLE}>{subtitle}</p>}
    </div>
  );
}
