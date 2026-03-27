import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import TagChip from '../components/common/TagChip';
import { ALL_PROJECTS } from './blueprints/blueprintsData';
import Button from '../components/common/button';
import Input from '../components/common/input';


const NAV = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '1rem 8vw', fontSize: '0.8rem',
  background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
};
const NAV_LINK = { color: '#2d6a4f', textDecoration: 'none', fontWeight: 500 };
const NAV_SEP  = { color: '#9ca3af' };

const HEADER_BASE = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  gap: '2rem', padding: '3.5rem 8vw', position: 'relative', overflow: 'hidden',
};
const HEADER_CONTENT = { flex: 1, maxWidth: '680px' };
const TITLE_H1 = { fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, color: '#1a2e22', margin: '0 0 0.8rem' };
const DESC_P   = { fontSize: '0.95rem', lineHeight: 1.72, color: '#374151', margin: '0 0 1.4rem', maxWidth: '560px' };
const META_ROW = { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' };
const META_ITEM = { fontSize: '0.82rem', color: '#374151', background: 'rgba(255,255,255,0.55)', padding: '0.22rem 0.65rem', borderRadius: '8px', fontWeight: 500 };
const DIFF_BASE = { fontSize: '0.72rem', fontWeight: 700, padding: '0.22rem 0.65rem', borderRadius: '999px' };
const DIFF_VARIANTS = {
  easy:   { background: '#d8f3dc', color: '#2d6a4f' },
  medium: { background: '#ffe5cc', color: '#c05621' },
  hard:   { background: '#fee2e2', color: '#b91c1c' },
};
const HEADER_IMG = {
  position: 'relative', width: '340px', height: '260px', flexShrink: 0,
  borderRadius: '16px', overflow: 'hidden',
};
const HEADER_IMG_INNER = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const HEADER_FADE = { position: 'absolute', inset: 0, pointerEvents: 'none' };

const BODY = {
  display: 'flex', alignItems: 'flex-start', gap: '2rem',
  padding: '2.5rem 8vw', maxWidth: '1400px', margin: '0 auto',
};
const ASIDE = {
  width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column',
  gap: '1.4rem', position: 'sticky', top: '1.5rem',
};
const CARD_BOX = {
  background: '#fff', borderRadius: '18px', padding: '1.4rem 1.5rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};
const CARD_TITLE = { fontSize: '0.88rem', fontWeight: 700, color: '#1b1b1b', margin: '0 0 1rem' };
const MAT_LIST = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const MAT_ITEM = { display: 'flex', alignItems: 'center', gap: '0.75rem' };
const MAT_ICON = {
  width: '36px', height: '36px', background: '#f0f9f4', borderRadius: '8px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0,
};
const MAT_NAME = { display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#1b1b1b' };
const MAT_QTY  = { display: 'block', fontSize: '0.72rem', color: '#6b7280' };
const PROG_BAR  = { height: '8px', background: '#e5e7eb', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.55rem' };
const PROG_FILL = { height: '100%', background: 'linear-gradient(90deg, #52b788, #2d6a4f)', borderRadius: '999px', transition: 'width 0.4s ease' };
const PROG_LBL  = { fontSize: '0.78rem', color: '#6b7280', margin: 0 };
const TIPS_LIST = { margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const TIPS_LI   = { fontSize: '0.82rem', lineHeight: 1.6, color: '#4b5563' };

const WIZARD = {
  flex: 1, minWidth: 0, background: '#fff', borderRadius: '20px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden',
  display: 'flex', flexDirection: 'column',
};
const WIZ_IMG    = { position: 'relative', width: '100%', height: '280px', overflow: 'hidden', flexShrink: 0 };
const WIZ_IMG_EL = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const WIZ_CHIP   = {
  position: 'absolute', top: '14px', left: '14px',
  background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.72rem',
  fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '999px', letterSpacing: '0.04em',
};
const WIZ_DOTS   = { display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1.2rem 1.6rem 0' };
const DOT_BASE   = { width: '8px', height: '8px', borderRadius: '50%', border: 'none', background: '#d1d5db', cursor: 'pointer', padding: 0 };
const DOT_ACTIVE = { background: '#2d6a4f', width: '22px', borderRadius: '999px' };
const DOT_DONE   = { background: '#52b788' };
const WIZ_CONTENT = { padding: '1.4rem 2rem 0.8rem', flex: 1 };
const WIZ_TITLE   = { fontSize: '1.2rem', fontWeight: 800, color: '#1b1b1b', margin: '0 0 0.7rem' };
const WIZ_DESC    = { fontSize: '0.92rem', lineHeight: 1.75, color: '#4b5563', margin: 0 };
const WIZ_NAV     = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 2rem 1.8rem', gap: '1rem' };

const SUBMIT_WRAP  = { padding: '0 8vw 5rem' };
const SUBMIT_INNER = {
  maxWidth: '860px', margin: '0 auto', background: '#fff', borderRadius: '24px',
  padding: '2.5rem 2.8rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  display: 'flex', flexDirection: 'column', gap: '2rem', border: '2px solid #d8f3dc',
};
const CONGRATS     = {
  display: 'flex', alignItems: 'flex-start', gap: '1.1rem',
  background: 'linear-gradient(135deg, #d8f3dc, #b7e4c7)',
  borderRadius: '14px', padding: '1.4rem 1.6rem', border: '1.5px solid #52b788',
};
const CONGRATS_EMOJI = { fontSize: '2.2rem', lineHeight: 1, flexShrink: 0 };
const CONGRATS_TTL   = { fontSize: '1.15rem', fontWeight: 900, color: '#1a2e22', margin: '0 0 0.3rem' };
const CONGRATS_SUB   = { fontSize: '0.85rem', color: '#2d6a4f', margin: 0, lineHeight: 1.6 };
const SUBMIT_HDR     = { display: 'flex', alignItems: 'flex-start', gap: '1.2rem' };
const SUBMIT_ICON    = { fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 };
const SUBMIT_TTL     = { fontSize: '1.35rem', fontWeight: 900, color: '#1a2e22', margin: '0 0 0.35rem' };
const SUBMIT_SUB     = { fontSize: '0.87rem', color: '#4b5563', lineHeight: 1.65, margin: 0, maxWidth: '520px' };
const UPLOADS_ROW    = { display: 'flex', alignItems: 'center', gap: '1rem' };
const UPLOAD_CARD    = { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const UPLOAD_ZONE_BASE = {
  border: '2px dashed #d1d5db', borderRadius: '16px', padding: '2rem 1rem',
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
  textAlign: 'center', fontSize: '2.2rem',
};
const UZ_BEFORE = { ...UPLOAD_ZONE_BASE, background: '#f9fafb', borderColor: '#d1d5db' };
const UZ_AFTER  = { ...UPLOAD_ZONE_BASE, background: '#f0fdf4', borderColor: '#52b788' };
const UZ_LABEL  = { fontSize: '0.9rem', fontWeight: 700, color: '#374151', margin: 0 };
const UZ_HINT   = { fontSize: '0.72rem', color: '#9ca3af' };
const UPLOAD_ARROW = { fontSize: '1.6rem', color: '#9ca3af', flexShrink: 0, paddingBottom: '2.5rem' };
const ECO_PREVIEW  = {
  display: 'flex', alignItems: 'center', gap: '1rem',
  background: '#f0fdf4', borderRadius: '14px', padding: '1rem 1.4rem', border: '1px solid #d8f3dc',
};
const ECO_ICON  = { fontSize: '1.8rem', lineHeight: 1 };
const ECO_LBL   = { display: 'block', fontSize: '0.72rem', color: '#6b7280', fontWeight: 500 };
const ECO_VAL   = { display: 'block', fontSize: '1.1rem', fontWeight: 900, color: '#2d6a4f' };
const ECO_BADGE = {
  marginLeft: 'auto', background: '#2d6a4f', color: '#fff',
  fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.8rem',
  borderRadius: '999px', letterSpacing: '0.04em',
};
const SUBMIT_BTN_LINK = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
  background: '#f4a261', color: '#fff', textDecoration: 'none',
  fontSize: '1rem', fontWeight: 800, padding: '1rem', borderRadius: '14px',
  boxShadow: '0 4px 18px rgba(244,162,97,0.35)',
};

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
    <PageShell style={{ background: '#f0f9f4', color: '#1b1b1b' }}>

      {/* Breadcrumb */}
      <nav style={NAV}>
        <Link to="/" style={NAV_LINK}>Home</Link>
        <span style={NAV_SEP}>›</span>
        <Link to="/blueprints" style={NAV_LINK}>Blueprints</Link>
        <span style={NAV_SEP}>›</span>
        <span style={{ color: '#1b1b1b', fontWeight: 600 }}>{blueprint.title}</span>
      </nav>

      {/* Header */}
      <header style={{ ...HEADER_BASE, background: blueprint.bg }}>
        <div style={HEADER_CONTENT}>
          <TagChip label={blueprint.matTag} size="sm" />
          <h1 style={TITLE_H1}>{blueprint.title}</h1>
          <p style={DESC_P}>{blueprint.description}</p>
          <div style={META_ROW}>
            <span style={{ ...DIFF_BASE, ...DIFF_VARIANTS[blueprint.diff.toLowerCase()] }}>{blueprint.diff}</span>
            <span style={META_ITEM}>⏱ {blueprint.time}</span>
            <span style={META_ITEM}>🛠 {blueprint.builds} builds</span>
            <span style={META_ITEM}>📍 {blueprint.category}</span>
          </div>
        </div>
        <div style={HEADER_IMG}>
          <img style={HEADER_IMG_INNER} src={blueprintImg} alt={blueprint.title} />
          <div style={{ ...HEADER_FADE, background: `linear-gradient(to right, ${blueprint.bg}, transparent)` }} />
        </div>
      </header>

      {!finished ? (
        <div style={BODY}>

          {/* Left column */}
          <aside style={ASIDE}>

            {/* Materials */}
            <div style={CARD_BOX}>
              <h2 style={CARD_TITLE}>📋 Materials</h2>
              <ul style={MAT_LIST}>
                {blueprint.materials.map(m => (
                  <li key={m.name} style={MAT_ITEM}>
                    <span style={MAT_ICON}>{m.icon}</span>
                    <div>
                      <span style={MAT_NAME}>{m.name}</span>
                      <span style={MAT_QTY}>{m.qty}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress */}
            <div style={CARD_BOX}>
              <h2 style={CARD_TITLE}>📊 Your Progress</h2>
              <div style={PROG_BAR}>
                <div style={{ ...PROG_FILL, width: `${progressPct}%` }} />
              </div>
              <p style={PROG_LBL}>Step {currentStep + 1} of {totalSteps} — {progressPct}%</p>
            </div>

            {/* Tips */}
            <div style={CARD_BOX}>
              <h2 style={CARD_TITLE}>💡 Pro Tips</h2>
              <ul style={TIPS_LIST}>
                {blueprint.tips.map((t, i) => (
                  <li key={i} style={TIPS_LI}>{t}</li>
                ))}
              </ul>
            </div>

          </aside>

          {/* Wizard */}
          <section style={WIZARD}>

            {/* Step image */}
            <div style={WIZ_IMG}>
              <img style={WIZ_IMG_EL} src={blueprintImg} alt={step.title} />
              <div style={WIZ_CHIP}>Step {currentStep + 1} of {totalSteps}</div>
            </div>

            {/* Dot indicators */}
            <div style={WIZ_DOTS}>
              {blueprint.steps.map((_, i) => (
                <button
                  key={i}
                  style={{ ...DOT_BASE, ...(i === currentStep ? DOT_ACTIVE : i < currentStep ? DOT_DONE : {}) }}
                  onClick={() => setCurrentStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Step content */}
            <div style={WIZ_CONTENT}>
              <h2 style={WIZ_TITLE}>{step.title}</h2>
              <p style={WIZ_DESC}>{step.desc}</p>
            </div>

            {/* Navigation buttons */}
            <div style={WIZ_NAV}>
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={currentStep === 0}
              >
                ← Back
              </Button>
              <Button onClick={goNext}>
                {currentStep === totalSteps - 1 ? '✓ Finish' : 'Next →'}
              </Button>
            </div>

          </section>

        </div>
      ) : null}

      {/* Submit to Gallery — only shown after finishing all steps */}
      {finished && (
      <section style={SUBMIT_WRAP}>
        <div style={SUBMIT_INNER}>

          {/* Congrats banner */}
          <div style={CONGRATS}>
            <span style={CONGRATS_EMOJI}>🎉</span>
            <div>
              <h2 style={CONGRATS_TTL}>You did it! All steps complete.</h2>
              <p style={CONGRATS_SUB}>You just earned <strong>+{blueprint.ecoPoints} Eco-Points</strong> and the <strong>{blueprint.badge}</strong> badge. Now share your creation with the community!</p>
            </div>
          </div>

          {/* Back to steps */}
          <Button
            variant="ghost"
            onClick={() => { setFinished(false); setCurrentStep(totalSteps - 1); }}
          >
            ← Back to steps
          </Button>

          <div style={SUBMIT_HDR}>
            <span style={SUBMIT_ICON}>🏆</span>
            <div>
              <h2 style={SUBMIT_TTL}>Share your build!</h2>
              <p style={SUBMIT_SUB}>Upload a before &amp; after photo and get your Eco-Points. Your creation will appear in the Community Gallery.</p>
            </div>
          </div>

          <div style={UPLOADS_ROW}>

            {/* Before */}
            <div style={UPLOAD_CARD}>
              <div style={UZ_BEFORE}>
                <span>📷</span>
                <p style={UZ_LABEL}>Before Photo</p>
                <span style={UZ_HINT}>Your raw materials</span>
              </div>
              <Button variant="outline">Choose File</Button>
            </div>

            <div style={UPLOAD_ARROW}>→</div>

            {/* After */}
            <div style={UPLOAD_CARD}>
              <div style={UZ_AFTER}>
                <span>🎨</span>
                <p style={UZ_LABEL}>After Photo</p>
                <span style={UZ_HINT}>Your finished creation</span>
              </div>
              <Button variant="outline">Choose File</Button>
            </div>

          </div>

          {/* Caption */}
          <Input
            multiline
            rows={3}
            label="Add a caption"
            placeholder="Tell the community about your build! What did you use? Any tips?"
            readOnly
          />

          {/* Eco-points preview */}
          <div style={ECO_PREVIEW}>
            <span style={ECO_ICON}>🌿</span>
            <div>
              <span style={ECO_LBL}>You&apos;ll earn</span>
              <span style={ECO_VAL}>+{blueprint.ecoPoints} Eco-Points</span>
            </div>
            <span style={ECO_BADGE}>{blueprint.badge}</span>
          </div>

          {/* Submit */}
          <Link to="/gallery" style={SUBMIT_BTN_LINK}>
            ⬆ Submit to Community Gallery
          </Link>

        </div>
      </section>
      )}

    </PageShell>
  );
}

export default Blueprint;
