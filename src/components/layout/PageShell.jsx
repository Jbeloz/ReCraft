import React from 'react';
import Navbar from './navbar';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── Static style objects (module level) ── */

const MAIN_BASE = {
  minHeight: '100vh',
  fontFamily: FONT,
  background: '#fafafa',
};

/* ── Component ── */

export default function PageShell({ children, style = {} }) {
  const mainStyle = { ...MAIN_BASE, ...style };

  return (
    <>
      <Navbar />
      <main style={mainStyle}>{children}</main>
    </>
  );
}
