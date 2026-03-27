import React from 'react';
import './input.css';

/**
 * Input / Textarea
 * @param {string}  label
 * @param {boolean} required    shows * next to label
 * @param {string}  error       error message (turns border red)
 * @param {string}  hint        helper text below the field
 * @param {boolean} multiline   renders a <textarea> instead of <input>
 * @param {number}  rows        rows for textarea (default: 4)
 * @param {string}  className   extra class names for the wrapper
 * All other props (type, value, onChange, placeholder, disabled…) are forwarded.
 */
export default function Input({
  label,
  required = false,
  error,
  hint,
  multiline = false,
  rows = 4,
  className = '',
  id,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const controlClass = ['field__control', error ? 'field__control--error' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`field ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className={`field__label${required ? ' field__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea id={fieldId} className={controlClass} rows={rows} {...rest} />
      ) : (
        <input id={fieldId} className={controlClass} {...rest} />
      )}
      {error && <span className="field__error">{error}</span>}
      {hint && !error && <span className="field__hint">{hint}</span>}
    </div>
  );
}
