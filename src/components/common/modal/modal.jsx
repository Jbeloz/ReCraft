import React, { useEffect, useCallback } from 'react';
import './modal.css';

/**
 * Modal
 * @param {boolean}  isOpen     controls visibility
 * @param {function} onClose    called when backdrop/X is clicked or Escape pressed
 * @param {string}   title      header text
 * @param {string}   size       sm | md | lg  (default: md)
 * @param {*}        children   modal body content
 * @param {*}        footer     optional footer content (buttons etc.)
 */
export default function Modal({ isOpen, onClose, title, size = 'md', children, footer }) {
  /* Close on Escape */
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

  const sizeClass = size !== 'md' ? ` modal--${size}` : '';

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`modal${sizeClass}`} role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            &#x2715;
          </button>
        </div>

        <div className="modal__body">{children}</div>

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
