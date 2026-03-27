import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import TagChip from '../components/common/TagChip';
import Button from '../components/common/button';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const KEYFRAMES = `
@keyframes scan-pulse { from { opacity: 0.6; } to { opacity: 1; } }
@keyframes scan-sweep { 0% { top: 10%; } 50% { top: 85%; } 100% { top: 10%; } }
`;


const NAV = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '1rem 8vw', fontSize: '0.8rem',
  background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
};

const NAV_LINK = { color: '#2d6a4f', textDecoration: 'none', fontWeight: 500 };
const NAV_SEP  = { color: '#9ca3af' };
const NAV_CURR = { color: '#1b1b1b', fontWeight: 600 };

const HERO = { textAlign: 'center', padding: '3.5rem 8vw 2rem' };

const HERO_BADGE = {
  display: 'inline-block', fontSize: '0.7rem', fontWeight: 700,
  letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#2d6a4f', background: '#d8f3dc',
  padding: '0.3rem 0.9rem', borderRadius: '999px', marginBottom: '1rem',
};

const HERO_TITLE = { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#1a2e22', margin: '0 0 0.75rem' };
const HERO_SUB   = { fontSize: '1rem', color: '#4b5563', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 };

const BODY = {
  display: 'flex', alignItems: 'flex-start', gap: 0,
  padding: '2rem 8vw 1rem', maxWidth: '1100px', margin: '0 auto',
};

const OPTION_CARD = {
  flex: 1, background: '#fff', borderRadius: '20px', padding: '2rem',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  display: 'flex', flexDirection: 'column', gap: '1.4rem',
};

const OPTION_HEADER = { display: 'flex', alignItems: 'flex-start', gap: '1rem' };
const OPTION_ICON  = { fontSize: '2rem', lineHeight: 1, flexShrink: 0, marginTop: '0.1rem' };
const OPTION_TITLE = { fontSize: '1.2rem', fontWeight: 800, color: '#1b1b1b', margin: '0 0 0.3rem' };
const OPTION_DESC  = { fontSize: '0.85rem', color: '#6b7280', margin: 0, lineHeight: 1.6 };

const VIEWFINDER_BASE = {
  border: '2px dashed #52b788', borderRadius: '16px', background: '#f0fdf4',
  padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column',
  alignItems: 'center', gap: '0.65rem', textAlign: 'center',
  minHeight: '160px', justifyContent: 'center',
  position: 'relative', overflow: 'hidden',
};
const VIEWFINDER_SCANNING = { background: '#e6f4ea', borderColor: '#2d6a4f' };

const VF_ICON    = { fontSize: '2.2rem' };
const VF_LABEL   = { fontSize: '0.92rem', fontWeight: 600, color: '#374151', margin: 0 };
const VF_HINT    = { fontSize: '0.75rem', color: '#9ca3af', margin: 0 };
const VF_STATUS  = { fontSize: '0.9rem', fontWeight: 600, color: '#2d6a4f', margin: 0, animation: 'scan-pulse 1s ease-in-out infinite alternate' };
const VF_SCANLINE = { position: 'absolute', left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #52b788, transparent)', animation: 'scan-sweep 1.4s ease-in-out infinite' };

const OR_WRAP = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', flexShrink: 0 };
const OR_PILL = {
  width: '42px', height: '42px', background: '#fff', borderRadius: '50%',
  border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center',
  justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700,
  color: '#6b7280', boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
};

const TEXTAREA = {
  width: '100%', border: '2px solid #e5e7eb', borderRadius: '14px',
  padding: '1rem', fontSize: '0.9rem', lineHeight: 1.7, color: '#1b1b1b',
  resize: 'none', background: '#fff', boxSizing: 'border-box', fontFamily: FONT,
};

const TAGS_SECTION = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const TAGS_LABEL   = { fontSize: '0.78rem', fontWeight: 600, color: '#6b7280', margin: 0 };
const TAGS_WRAP    = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' };

const CTA_WRAP = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', padding: '2.5rem 8vw 4rem' };
const CTA_HINT = { fontSize: '0.82rem', color: '#6b7280', margin: 0 };

const SUGGESTED_TAGS = [
  { label: 'Cardboard', color: '#d8f3dc', text: '#2d6a4f' },
  { label: 'Glass Jar',  color: '#dbeafe', text: '#1d4ed8' },
  { label: 'Old Denim', color: '#ede9fe', text: '#6d28d9' },
  { label: 'Plastic Bottle', color: '#fef9c3', text: '#a16207' },
  { label: 'Tin Can',   color: '#ffe4e6', text: '#be123c' },
  { label: 'Wine Cork', color: '#ffedd5', text: '#c2410c' },
];

const SCAN_RESULTS = [
  'Cardboard boxes',
  'Old',
  'Glass',
];

function Scan() {
  const [text, setText] = useState('');
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  function handleCameraScan() {
    setScanning(true);
    setTimeout(() => {
      const result = SCAN_RESULTS[Math.floor(Math.random() * SCAN_RESULTS.length)];
      setText(prev => prev ? prev + '\n' + result : result);
      setScanning(false);
    }, 2200);
  }

  function appendTag(label) {
    setText(prev => prev ? prev + ', ' + label : label);
  }

  function handleFind() {
    navigate(`/blueprints?q=${encodeURIComponent(text.trim())}`);
  }

  return (
    <PageShell style={{ background: '#f0f9f4', color: '#1b1b1b' }}>
      <style>{KEYFRAMES}</style>

      {/* Breadcrumb */}
      <nav style={NAV}>
        <Link to="/" style={NAV_LINK}>Home</Link>
        <span style={NAV_SEP}>›</span>
        <span style={NAV_CURR}>Scan Materials</span>
      </nav>

      {/* Hero */}
      <header style={HERO}>
        <span style={HERO_BADGE}>🤖 AI-Powered</span>
        <h1 style={HERO_TITLE}>What do you have?</h1>
        <p style={HERO_SUB}>
          Tell us what materials you have lying around and we&apos;ll find the perfect upcycling blueprints for you.
        </p>
      </header>

      <div style={BODY}>

        {/* Option A — Camera Scan */}
        <section style={OPTION_CARD}>
          <div style={OPTION_HEADER}>
            <span style={OPTION_ICON}>📷</span>
            <div>
              <h2 style={OPTION_TITLE}>Scan with Camera</h2>
              <p style={OPTION_DESC}>Point your camera at your materials and our AI will identify them instantly.</p>
            </div>
          </div>

          <div style={{ ...VIEWFINDER_BASE, ...(scanning ? VIEWFINDER_SCANNING : {}) }}>
            {scanning ? (
              <>
                <div style={VF_SCANLINE} />
                <p style={VF_STATUS}>🔍 Scanning materials…</p>
              </>
            ) : (
              <>
                <span style={VF_ICON}>📷</span>
                <p style={VF_LABEL}>Camera preview</p>
                <p style={VF_HINT}>Click the button below to scan</p>
              </>
            )}
          </div>

          <Button
            variant="secondary"
            onClick={handleCameraScan}
            disabled={scanning}
          >
            {scanning ? '⏳ Scanning…' : <><span>📷</span> Open Camera &amp; Scan</>}
          </Button>
        </section>

        {/* OR divider */}
        <div style={OR_WRAP}>
          <span style={OR_PILL}>OR</span>
        </div>

        {/* Option B — Type it in */}
        <section style={OPTION_CARD}>
          <div style={OPTION_HEADER}>
            <span style={OPTION_ICON}>✏️</span>
            <div>
              <h2 style={OPTION_TITLE}>Type it in</h2>
              <p style={OPTION_DESC}>Describe what you have and our AI will suggest relevant material tags.</p>
            </div>
          </div>

          <div>
            <textarea
              style={TEXTAREA}
              placeholder="e.g. I have a stack of old magazines, some wire, and a few glass jars..."
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <div style={TAGS_SECTION}>
            <p style={TAGS_LABEL}>✨ Tap a tag to add it</p>
            <div style={TAGS_WRAP}>
              {SUGGESTED_TAGS.map(t => (
                <TagChip
                  key={t.label}
                  label={t.label}
                  color={t.color}
                  textColor={t.text}
                  onClick={() => appendTag(t.label)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* CTA */}
      <div style={CTA_WRAP}>
        <Button
          onClick={handleFind}
          disabled={!text.trim()}
        >
          🔎 Find My Blueprints
        </Button>
        <p style={CTA_HINT}>We&apos;ll match you with upcycling ideas based on your materials</p>
      </div>

    </PageShell>
  );
}

export default Scan;
