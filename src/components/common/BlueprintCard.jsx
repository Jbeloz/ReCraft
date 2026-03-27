import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── Static style objects (module level) ── */

const CARD_BASE = {
  display: 'block',
  background: '#fff',
  border: '0.5px solid #d4ede1',
  borderRadius: '14px',
  overflow: 'hidden',
  textDecoration: 'none',
  color: 'inherit',
  fontFamily: FONT,
  transition: 'box-shadow 0.2s, transform 0.2s',
};

const IMG = {
  width: '100%',
  height: '160px',
  objectFit: 'cover',
  display: 'block',
};

const EMOJI_BOX = {
  width: '100%',
  height: '160px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f0f9f4',
  fontSize: '3rem',
};

const BODY = {
  padding: '12px 14px 14px',
};

const MAT_TAG = {
  display: 'inline-block',
  fontSize: '9px',
  fontWeight: 700,
  color: '#2d6a4f',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '4px',
};

const TITLE = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#1a1a1a',
  margin: '0 0 8px',
  lineHeight: 1.3,
};

const META_ROW = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
};

const META_TEXT = {
  fontSize: '11px',
  color: '#666',
};

const DIFF_BASE = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '20px',
  fontSize: '10px',
  fontWeight: 700,
};

const DIFF_VARIANTS = {
  Easy:   { backgroundColor: '#E1F5EE', color: '#085041' },
  Medium: { backgroundColor: '#FFF8E1', color: '#7A4F00' },
  Hard:   { backgroundColor: '#FFE4E6', color: '#be123c' },
};

const CHIPS_ROW = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  marginTop: '8px',
};

const CHIP = {
  fontSize: '10px',
  padding: '2px 7px',
  borderRadius: '20px',
  background: '#f0f9f4',
  color: '#2d6a4f',
  fontWeight: 500,
};

/* ── Component ── */

export default function BlueprintCard({
  id,
  title,
  category,
  matTag,
  diff = 'Easy',
  time,
  builds,
  img,
  emoji,
  materials = [],
  showChips = false,
}) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    ...CARD_BASE,
    boxShadow: hovered ? '0 6px 24px rgba(45,106,79,0.12)' : '0 2px 8px rgba(0,0,0,0.05)',
    transform:  hovered ? 'translateY(-2px)' : 'none',
  };

  const diffStyle = {
    ...DIFF_BASE,
    ...(DIFF_VARIANTS[diff] || DIFF_VARIANTS.Easy),
  };

  return (
    <Link
      to={`/blueprint/${id}`}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {img
        ? <img src={img} alt={title} style={IMG} />
        : <div style={EMOJI_BOX}>{emoji}</div>
      }

      <div style={BODY}>
        {matTag && <span style={MAT_TAG}>{matTag}</span>}
        <h3 style={TITLE}>{title}</h3>

        <div style={META_ROW}>
          <span style={diffStyle}>{diff}</span>
          {time      && <span style={META_TEXT}>⏱ {time}</span>}
          {builds != null && <span style={META_TEXT}>{builds} builds</span>}
          {category  && <span style={META_TEXT}>{category}</span>}
        </div>

        {showChips && materials.length > 0 && (
          <div style={CHIPS_ROW}>
            {materials.map(m => <span key={m} style={CHIP}>{m}</span>)}
          </div>
        )}
      </div>
    </Link>
  );
}
