import React from 'react';
import './button.css';

/**
 * Button
 * @param {string}  variant   primary | secondary | ghost | outline | danger  (default: primary)
 * @param {string}  size      sm | md | lg  (default: md)
 * @param {boolean} full      stretch to 100% width
 * @param {boolean} disabled
 * @param {string}  type      button | submit | reset  (default: button)
 * @param {*}       children
 * @param {string}  className  extra class names
 * All other props (onClick, href, etc.) are forwarded.
 */
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
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    full ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
