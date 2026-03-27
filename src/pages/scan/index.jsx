import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scan.css';
import Navbar from '../../components/layout/navbar/navbar';
import Button from '../../components/common/button/button';

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
    <div className="scan">

      <Navbar />

      {/* Breadcrumb */}
      <nav className="scan__nav">
        <Link to="/">Home</Link>
        <span>&#x203A;</span>
        <span>Scan Materials</span>
      </nav>

      {/* Hero */}
      <header className="scan__hero">
        <span className="scan__hero-badge">&#x1F916; AI-Powered</span>
        <h1 className="scan__hero-title">What do you have?</h1>
        <p className="scan__hero-sub">
          Tell us what materials you have lying around and we&apos;ll find the perfect upcycling blueprints for you.
        </p>
      </header>

      <div className="scan__body">

        {/* Option A — Camera Scan */}
        <section className="scan__option">
          <div className="scan__option-header">
            <span className="scan__option-icon">&#x1F4F7;</span>
            <div>
              <h2 className="scan__option-title">Scan with Camera</h2>
              <p className="scan__option-desc">Point your camera at your materials and our AI will identify them instantly.</p>
            </div>
          </div>

          <div className={`scan__viewfinder${scanning ? ' scan__viewfinder--scanning' : ''}`}>
            {scanning ? (
              <>
                <div className="scan__scan-line" />
                <p className="scan__scan-status">&#x1F50D; Scanning materials…</p>
              </>
            ) : (
              <>
                <span className="scan__viewfinder-icon">&#x1F4F7;</span>
                <p className="scan__viewfinder-label">Camera preview</p>
                <p className="scan__viewfinder-hint">Click the button below to scan</p>
              </>
            )}
          </div>

          <Button
            variant="secondary"
            className="scan__camera-btn"
            onClick={handleCameraScan}
            disabled={scanning}
          >
            {scanning ? '&#x23F3; Scanning…' : <><span>&#x1F4F7;</span> Open Camera &amp; Scan</>}
          </Button>
        </section>

        {/* OR divider */}
        <div className="scan__or">
          <span>OR</span>
        </div>

        {/* Option B — Type it in */}
        <section className="scan__option">
          <div className="scan__option-header">
            <span className="scan__option-icon">&#x270F;&#xFE0F;</span>
            <div>
              <h2 className="scan__option-title">Type it in</h2>
              <p className="scan__option-desc">Describe what you have and our AI will suggest relevant material tags.</p>
            </div>
          </div>

          <div className="scan__input-wrap">
            <textarea
              className="scan__textarea"
              placeholder="e.g. I have a stack of old magazines, some wire, and a few glass jars..."
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <div className="scan__tags-section">
            <p className="scan__tags-label">&#x2728; Tap a tag to add it</p>
            <div className="scan__tags">
              {SUGGESTED_TAGS.map(t => (
                <span
                  key={t.label}
                  className="scan__tag"
                  style={{ background: t.color, color: t.text, cursor: 'pointer' }}
                  onClick={() => appendTag(t.label)}
                >{t.label}</span>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* CTA */}
      <div className="scan__cta">
        <Button
          className="scan__cta-btn"
          onClick={handleFind}
          disabled={!text.trim()}
        >
          &#x1F50E; Find My Blueprints
        </Button>
        <p className="scan__cta-hint">We&apos;ll match you with upcycling ideas based on your materials</p>
      </div>

    </div>
  );
}

export default Scan;
