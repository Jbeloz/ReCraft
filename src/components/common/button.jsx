import React, { useState } from 'react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.45rem',
  borderRadius: '10px',
  fontWeight: 700,
  cursor: 'pointer',
  border: '1.5px solid transparent',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  fontFamily: FONT,
  lineHeight: 1,
};

const SIZES = {
  sm: { padding: '0.4rem 0.9rem',  fontSize: '0.78rem', borderRadius: '8px'  },
  md: { padding: '0.65rem 1.5rem', fontSize: '0.9rem',  borderRadius: '10px' },
  lg: { padding: '0.75rem 2rem',   fontSize: '0.95rem', borderRadius: '10px' },
};

const VARIANTS = {
  primary:   { background: '#2d6a4f',    color: '#fff',     borderColor: '#2d6a4f'  },
  secondary: { background: 'transparent',color: '#2d6a4f',  borderColor: '#2d6a4f'  },
  ghost:     { background: '#f3f4f6',    color: '#6b7280',  borderColor: 'transparent' },
  outline:   { background: '#fff',       color: '#374151',  borderColor: '#d1d5db'  },
  danger:    { background: 'transparent',color: '#dc2626',  borderColor: '#fca5a5'  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [active,  setActive]  = useState(false);

  const style = {
    ...BASE,
    ...(SIZES[size]   || SIZES.md),
    ...(VARIANTS[variant] || VARIANTS.primary),
    ...(full     ? { width: '100%' }                                     : {}),
    ...(disabled ? { opacity: 0.35, cursor: 'default', pointerEvents: 'none' } : {}),
    ...(hovered && !disabled ? { opacity: 0.88 }                        : {}),
    ...(active  && !disabled ? { transform: 'scale(0.97)', opacity: 1 } : {}),
  };

  return (
    <button
      type={type}
      style={style}
      className={className}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {children}
    </button>
  );
}
