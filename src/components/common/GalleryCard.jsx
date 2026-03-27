import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── Static style objects (module level) ── */

const CARD_BASE = {
  background: '#fff',
  border: '0.5px solid #d4ede1',
  borderRadius: '14px',
  overflow: 'hidden',
  fontFamily: FONT,
  transition: 'box-shadow 0.2s',
};

const IMG_BASE = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.3s',
};

const BODY = {
  padding: '12px 14px 14px',
};

const TOP_ROW = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '8px',
};

const AUTHOR = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const AVATAR_BASE = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  flexShrink: 0,
};

const AUTHOR_NAME = {
  fontSize: '0.82rem',
  fontWeight: 700,
  color: '#1a1a1a',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const VERIFIED_BADGE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  background: '#2d6a4f',
  color: '#fff',
  fontSize: '8px',
  fontWeight: 800,
};

const BLUEPRINT_LABEL = {
  fontSize: '0.75rem',
  color: '#6b7280',
  display: 'block',
};

const CAT_CHIP = {
  fontSize: '10px',
  fontWeight: 700,
  color: '#2d6a4f',
  background: '#d8f3dc',
  padding: '2px 8px',
  borderRadius: '20px',
  whiteSpace: 'nowrap',
};

const CAPTION = {
  fontSize: '0.8rem',
  color: '#374151',
  lineHeight: 1.5,
  margin: '0 0 10px',
};

const FOOTER = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid #f0f0f0',
  paddingTop: '8px',
};

const ACTIONS = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const LIKE_BASE = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontFamily: FONT,
  padding: '2px 6px',
  borderRadius: '6px',
  transition: 'background 0.15s, color 0.15s',
};

const ECO = {
  fontSize: '0.75rem',
  color: '#2d6a4f',
  fontWeight: 600,
};

const REPORT_BASE = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.75rem',
  fontFamily: FONT,
  transition: 'color 0.15s',
};

/* ── Component ── */

export default function GalleryCard({ post }) {
  const [cardHovered,   setCardHovered]   = useState(false);
  const [likeHovered,   setLikeHovered]   = useState(false);
  const [reportHovered, setReportHovered] = useState(false);

  const { id, user, avatar, avatarBg, blueprint, category, afterImg, caption, likes, ecoPoints, verified } = post;

  const cardStyle   = { ...CARD_BASE, boxShadow: cardHovered ? '0 6px 24px rgba(45,106,79,0.12)' : '0 2px 8px rgba(0,0,0,0.05)' };
  const imgStyle    = { ...IMG_BASE,  transform: cardHovered ? 'scale(1.03)' : 'scale(1)' };
  const avatarStyle = { ...AVATAR_BASE, background: avatarBg || '#d8f3dc' };
  const likeStyle   = { ...LIKE_BASE, background: likeHovered ? '#fce7f3' : 'none', color: likeHovered ? '#be185d' : '#6b7280' };
  const reportStyle = { ...REPORT_BASE, color: reportHovered ? '#dc2626' : '#9ca3af' };

  return (
    <article
      style={cardStyle}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <Link to={`/gallery/${id}`} style={{ display: 'block', overflow: 'hidden' }}>
        <img src={afterImg} alt={blueprint} style={imgStyle} />
      </Link>

      <div style={BODY}>
        <div style={TOP_ROW}>
          <div style={AUTHOR}>
            <span style={avatarStyle}>{avatar}</span>
            <div>
              <span style={AUTHOR_NAME}>
                {user}
                {verified && <span style={VERIFIED_BADGE}>✓</span>}
              </span>
              <span style={BLUEPRINT_LABEL}>{blueprint}</span>
            </div>
          </div>
          <span style={CAT_CHIP}>{category}</span>
        </div>

        {caption && <p style={CAPTION}>{caption}</p>}

        <div style={FOOTER}>
          <div style={ACTIONS}>
            <button
              style={likeStyle}
              onMouseEnter={() => setLikeHovered(true)}
              onMouseLeave={() => setLikeHovered(false)}
            >
              ♥ {likes}
            </button>
            <span style={ECO}>+{ecoPoints} pts</span>
          </div>
          <button
            style={reportStyle}
            title="Report this post"
            onMouseEnter={() => setReportHovered(true)}
            onMouseLeave={() => setReportHovered(false)}
          >
            ⚠ Report
          </button>
        </div>
      </div>
    </article>
  );
}

