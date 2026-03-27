import React, { useState } from 'react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── Static style objects (module level) ── */

const BASE = {
  display: 'inline-block',
  fontFamily: FONT,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  userSelect: 'none',
  border: 'none',
  outline: 'none',
  transition: 'background 0.15s, color 0.15s, opacity 0.15s',
  borderRadius: '20px',
};

const SIZES = {
  sm: { fontSize: '10px', padding: '2px 8px'  },
  md: { fontSize: '12px', padding: '4px 12px' },
};

/* ── Component ── */

export default function TagChip({
  label,
  color     = '#d8f3dc',
  textColor = '#2d6a4f',
  active    = false,
  onClick,
  size      = 'md',
}) {
  const [hovered, setHovered] = useState(false);
  const isInteractive = Boolean(onClick);

  const style = {
    ...BASE,
    ...(SIZES[size] || SIZES.md),
    backgroundColor: active ? textColor : color,
    color:           active ? '#fff'    : textColor,
    cursor:          isInteractive ? 'pointer' : 'default',
    opacity:         hovered && isInteractive && !active ? 0.85 : 1,
    boxShadow:       active ? `0 0 0 2px ${textColor}55` : 'none',
  };

  if (isInteractive) {
    return (
      <button
        style={style}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </button>
    );
  }

  return <span style={style}>{label}</span>;
}
