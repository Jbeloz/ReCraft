import React, { useState } from 'react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const wrapStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
};

const labelStyle = {
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#374151',
  fontFamily: FONT,
};

const controlBase = {
  padding: '0.65rem 0.85rem',
  border: '1.5px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '0.9rem',
  color: '#111827',
  background: '#fff',
  outline: 'none',
  width: '100%',
  fontFamily: FONT,
  resize: 'vertical',
  boxSizing: 'border-box',
};

export default function Input({
  label,
  required = false,
  error,
  hint,
  multiline = false,
  rows = 4,
  className = '',
  id,
  disabled,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const controlStyle = {
    ...controlBase,
    ...(error
      ? {
          borderColor: focused ? '#dc2626' : '#f87171',
          boxShadow: focused ? '0 0 0 3px rgba(220,38,38,0.1)' : 'none',
        }
      : {
          borderColor: focused ? '#2d6a4f' : '#d1d5db',
          boxShadow: focused ? '0 0 0 3px rgba(45,106,79,0.1)' : 'none',
        }),
    ...(disabled ? { background: '#f3f4f6', color: '#9ca3af', cursor: 'default' } : {}),
  };

  const sharedProps = {
    id: fieldId,
    style: controlStyle,
    disabled,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    ...rest,
  };

  return (
    <div style={wrapStyle} className={className}>
      {label && (
        <label htmlFor={fieldId} style={labelStyle}>
          {label}
          {required && <span style={{ color: '#dc2626' }}> *</span>}
        </label>
      )}
      {multiline
        ? <textarea rows={rows} {...sharedProps} />
        : <input {...sharedProps} />
      }
      {error     && <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.1rem' }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.1rem' }}>{hint}</span>}
    </div>
  );
}
