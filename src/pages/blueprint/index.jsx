import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './blueprint.css';
import Navbar from '../../components/layout/navbar/navbar';
import { ALL_PROJECTS } from '../blueprints/blueprintsData';
import Button from '../../components/common/button/button';
import Input from '../../components/common/input/input';

const BLUEPRINTS = {
  1: {
    title: 'Geometric Wall Shelf',
    category: 'Home Decor',
    diff: 'Easy',
    time: '2 hrs',
    builds: 42,
    emoji: '\u{1F5C4}',
    bg: '#c8e6c9',
    matTag: 'CARDBOARD + TAPE',
    description: 'Transform corrugated cardboard and tape into a stylish geometric wall shelf. No tools required — just patience and creativity. Perfect for displaying small plants, books, or trinkets.',
    materials: [
      { name: 'Corrugated Cardboard', qty: '4 large sheets', icon: '\u{1F4E6}' },
      { name: 'Strong Tape / Duck Tape', qty: '1 roll',        icon: '\u{1F4CB}' },
      { name: 'Craft Knife',           qty: '1',              icon: '\u{1F52A}' },
      { name: 'Ruler',                 qty: '1',              icon: '\u{1F4CF}' },
      { name: 'Acrylic Paint',         qty: '2–3 colors',     icon: '\u{1F3A8}' },
      { name: 'Paintbrush',            qty: '1 medium',       icon: '\u{1FAA3}' },
    ],
    steps: [
      { title: 'Measure & cut panels',        desc: 'Use the ruler and craft knife to cut 12 identical rectangles (20×8 cm) and 6 squares (8×8 cm) from the cardboard. Keep edges clean for a polished look.' },
      { title: 'Score the fold lines',        desc: 'Lightly score (do not cut through) each rectangle at the 8 cm mark. This creates clean fold lines for the shelf structure.' },
      { title: 'Assemble the hex frames',     desc: 'Fold each scored rectangle and tape the edges together to form open hexagonal or triangular frames. Use generous tape on all internal seams.' },
      { title: 'Stack & tape the structure',  desc: 'Arrange frames in your desired geometric pattern on a flat surface. Tape adjacent frames together securely at every contact point.' },
      { title: 'Reinforce edges',             desc: 'Run tape along all outer edges for extra rigidity. Stack 2–3 layers of cardboard on the shelf bottom panel for weight support.' },
      { title: 'Paint & decorate',            desc: 'Apply 2 coats of acrylic paint. Try a two-tone or ombre effect by painting alternating sections different colors. Let dry fully between coats.' },
      { title: 'Mount on wall',               desc: 'Once dry, use adhesive strips or two small nails through the back panel to hang. Check level before committing. Done!' },
    ],
    tips: [
      'Double-layering the shelf base makes it strong enough for small books.',
      'A gold or metallic paint finish makes it look store-bought.',
      'Seal with Mod Podge for water resistance.',
    ],
    ecoPoints: 120,
    badge: 'Textile Tech',
  },
  2: {
    title: 'Vertical Herb Garden',
    category: 'Gardening',
    diff: 'Medium',
    time: '4 hrs',
    builds: 89,
    emoji: '\u{1F331}',
    bg: '#b2dfdb',
    matTag: 'PLASTIC BOTTLES',
    description: 'Repurpose plastic bottles into a space-saving vertical herb garden. Mount it on a sunny wall or fence and grow fresh basil, mint, and parsley year-round.',
    materials: [
      { name: 'Plastic Bottles (2L)',  qty: '6–8',           icon: '\u{1F9F4}' },
      { name: 'Potting Soil',          qty: '1 bag',          icon: '\u{1FAB4}' },
      { name: 'Herb Seeds / Seedlings',qty: 'Assorted',       icon: '\u{1F33F}' },
      { name: 'Rope or Twine',         qty: '2 meters',       icon: '\u{1FAA2}' },
      { name: 'Craft Knife',           qty: '1',              icon: '\u{1F52A}' },
      { name: 'Drill or Nail',         qty: '1',              icon: '\u{1F528}' },
    ],
    steps: [
      { title: 'Clean & prep bottles',     desc: 'Rinse bottles thoroughly. Remove labels. Cut a large rectangular window in the side of each bottle — this is where the plants will grow.' },
      { title: 'Poke drainage holes',      desc: 'Use a nail or drill to poke 4–6 small holes in the bottle cap area. This prevents waterlogging and root rot.' },
      { title: 'Thread the rope',          desc: 'Pierce two holes near the top and bottom of each bottle on opposite sides. Thread a continuous rope through all bottles vertically, spacing them 20cm apart.' },
      { title: 'Fill with soil',           desc: 'Hold each bottle horizontal (window up) and fill 2/3 with potting soil mixed with a little compost for nutrients.' },
      { title: 'Plant your herbs',         desc: 'Place seedlings or press seeds into the soil through the window opening. Pat soil firm around the roots. Label each bottle.' },
      { title: 'Mount & water',            desc: 'Hang the rope from a wall hook, fence rail, or balcony railing. Water from the top — it drains through each level down.' },
    ],
    tips: [
      'South or west-facing walls get the most sun — ideal for herbs.',
      'Add a small pebble layer at the bottom before soil for better drainage.',
      'Mint spreads fast — keep it in its own bottle.',
    ],
    ecoPoints: 95,
    badge: 'Green Thumb',
  },
};

const DEFAULT = BLUEPRINTS[1];

function Blueprint() {
  const { id } = useParams();
  const blueprint = BLUEPRINTS[id] || DEFAULT;
  const projectData = ALL_PROJECTS.find(p => p.id === Number(id));
  const blueprintImg = projectData?.img || ALL_PROJECTS[0]?.img;

  const totalSteps = blueprint.steps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const step = blueprint.steps[currentStep];
  const progressPct = Math.round(((finished ? totalSteps : currentStep) / totalSteps) * 100);

  function goNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setFinished(true);
    }
  }

  function goBack() {
    if (finished) {
      setFinished(false);
    } else if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  }

  return (
    <div className="blueprint">

      <Navbar />

      {/* Breadcrumb */}
      <nav className="blueprint__nav">
        <Link to="/">Home</Link>
        <span>&#x203A;</span>
        <Link to="/blueprints">Blueprints</Link>
        <span>&#x203A;</span>
        <span>{blueprint.title}</span>
      </nav>

      {/* Header */}
      <header className="blueprint__header" style={{ background: blueprint.bg }}>
        <div className="blueprint__header-content">
          <span className="blueprint__cat-tag">{blueprint.matTag}</span>
          <h1 className="blueprint__title">{blueprint.title}</h1>
          <p className="blueprint__desc">{blueprint.description}</p>
          <div className="blueprint__meta">
            <span className={`blueprint__diff blueprint__diff--${blueprint.diff.toLowerCase()}`}>{blueprint.diff}</span>
            <span className="blueprint__meta-item">&#x23F1; {blueprint.time}</span>
            <span className="blueprint__meta-item">&#x1F6E0; {blueprint.builds} builds</span>
            <span className="blueprint__meta-item">&#x1F4CD; {blueprint.category}</span>
          </div>
        </div>
        <div className="blueprint__header-img">
          <img src={blueprintImg} alt={blueprint.title} />
          <div className="blueprint__header-img-fade" style={{ background: `linear-gradient(to right, ${blueprint.bg}, transparent)` }} />
        </div>
      </header>

      {!finished ? (
        <div className="blueprint__body">

          {/* Left column */}
          <aside className="blueprint__aside">

            {/* Materials */}
            <div className="blueprint__card">
              <h2 className="blueprint__card-title">&#x1F4CB; Materials</h2>
              <ul className="blueprint__materials">
                {blueprint.materials.map(m => (
                  <li key={m.name} className="blueprint__material">
                    <span className="blueprint__material-icon">{m.icon}</span>
                    <div>
                      <span className="blueprint__material-name">{m.name}</span>
                      <span className="blueprint__material-qty">{m.qty}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress */}
            <div className="blueprint__card">
              <h2 className="blueprint__card-title">&#x1F4CA; Your Progress</h2>
              <div className="blueprint__progress-bar">
                <div className="blueprint__progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="blueprint__progress-label">Step {currentStep + 1} of {totalSteps} &mdash; {progressPct}%</p>
            </div>

            {/* Tips */}
            <div className="blueprint__card">
              <h2 className="blueprint__card-title">&#x1F4A1; Pro Tips</h2>
              <ul className="blueprint__tips">
                {blueprint.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

          </aside>

          {/* Wizard */}
          <main className="blueprint__wizard">

            {/* Step image */}
            <div className="blueprint__wizard-img">
              <img src={blueprintImg} alt={step.title} />
              <div className="blueprint__wizard-step-chip">Step {currentStep + 1} of {totalSteps}</div>
            </div>

            {/* Dot indicators */}
            <div className="blueprint__wizard-dots">
              {blueprint.steps.map((_, i) => (
                <button
                  key={i}
                  className={`blueprint__dot${i === currentStep ? ' blueprint__dot--active' : i < currentStep ? ' blueprint__dot--done' : ''}`}
                  onClick={() => setCurrentStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="blueprint__wizard-content">
              <h2 className="blueprint__wizard-title">{step.title}</h2>
              <p className="blueprint__wizard-desc">{step.desc}</p>
            </div>

            {/* Navigation buttons */}
            <div className="blueprint__wizard-nav">
              <Button
                variant="ghost"
                className="blueprint__wizard-btn blueprint__wizard-btn--back"
                onClick={goBack}
                disabled={currentStep === 0}
              >
                &#x2190; Back
              </Button>
              <Button
                className="blueprint__wizard-btn blueprint__wizard-btn--next"
                onClick={goNext}
              >
                {currentStep === totalSteps - 1 ? '✓ Finish' : 'Next →'}
              </Button>
            </div>

          </main>

        </div>
      ) : null}

      {/* Submit to Gallery — only shown after finishing all steps */}
      {finished && (
      <section className="blueprint__submit">
        <div className="blueprint__submit-inner">

          {/* Congrats banner */}
          <div className="blueprint__congrats">
            <span className="blueprint__congrats-emoji">🎉</span>
            <div>
              <h2 className="blueprint__congrats-title">You did it! All steps complete.</h2>
              <p className="blueprint__congrats-sub">You just earned <strong>+{blueprint.ecoPoints} Eco-Points</strong> and the <strong>{blueprint.badge}</strong> badge. Now share your creation with the community!</p>
            </div>
          </div>

          {/* Back to steps */}
          <Button
            variant="ghost"
            className="blueprint__back-steps"
            onClick={() => { setFinished(false); setCurrentStep(totalSteps - 1); }}
          >
            &#x2190; Back to steps
          </Button>

          <div className="blueprint__submit-header">
            <span className="blueprint__submit-icon">&#x1F3C6;</span>
            <div>
              <h2 className="blueprint__submit-title">Share your build!</h2>
              <p className="blueprint__submit-sub">Upload a before &amp; after photo and get your Eco-Points. Your creation will appear in the Community Gallery.</p>
            </div>
          </div>

          <div className="blueprint__submit-uploads">

            {/* Before */}
            <div className="blueprint__upload-card">
              <div className="blueprint__upload-zone blueprint__upload-zone--before">
                <span>&#x1F4F7;</span>
                <p>Before Photo</p>
                <span className="blueprint__upload-hint">Your raw materials</span>
              </div>
              <Button variant="outline" className="blueprint__upload-btn">Choose File</Button>
            </div>

            <div className="blueprint__upload-arrow">&#x2192;</div>

            {/* After */}
            <div className="blueprint__upload-card">
              <div className="blueprint__upload-zone blueprint__upload-zone--after">
                <span>&#x1F3A8;</span>
                <p>After Photo</p>
                <span className="blueprint__upload-hint">Your finished creation</span>
              </div>
              <Button variant="outline" className="blueprint__upload-btn">Choose File</Button>
            </div>

          </div>

          {/* Caption */}
          <Input
            multiline
            rows={3}
            label="Add a caption"
            className="blueprint__caption-wrap"
            placeholder="Tell the community about your build! What did you use? Any tips?"
            readOnly
          />

          {/* Eco-points preview */}
          <div className="blueprint__eco-preview">
            <span className="blueprint__eco-icon">&#x1F33F;</span>
            <div>
              <span className="blueprint__eco-label">You&apos;ll earn</span>
              <span className="blueprint__eco-value">+{blueprint.ecoPoints} Eco-Points</span>
            </div>
            <span className="blueprint__eco-badge">{blueprint.badge}</span>
          </div>

          {/* Submit */}
          <Link to="/gallery" className="blueprint__submit-btn">
            &#x2B06; Submit to Community Gallery
          </Link>

        </div>
      </section>
      )}

    </div>
  );
}

export default Blueprint;
