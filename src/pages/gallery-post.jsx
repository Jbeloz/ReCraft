import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import TagChip from '../components/common/TagChip';
import { POSTS } from './gallery';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";


const NAV = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '1rem 8vw', fontSize: '0.8rem',
  background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
};
const NAV_LINK  = { color: '#2d6a4f', textDecoration: 'none', fontWeight: 500 };
const NAV_SEP   = { color: '#9ca3af' };
const NAV_CUR   = { color: '#1b1b1b', fontWeight: 600 };

const LAYOUT = {
  display: 'flex', alignItems: 'flex-start', gap: '2.5rem',
  padding: '2.5rem 8vw', maxWidth: '1200px', margin: '0 auto',
};

/* ── Images column ── */
const IMAGES_COL = {
  flex: 1, display: 'flex', flexDirection: 'column', gap: 0,
  borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
};
const IMG_WRAP = { position: 'relative', width: '100%', height: '300px', overflow: 'hidden' };
const IMG_EL   = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const TAG_BASE = {
  position: 'absolute', top: '14px', left: '14px',
  fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em',
  textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '999px',
  backdropFilter: 'blur(4px)',
};
const TAG_BEFORE  = { ...TAG_BASE, background: 'rgba(0,0,0,0.48)', color: '#fff' };
const TAG_AFTER   = { ...TAG_BASE, background: 'rgba(45,106,79,0.82)', color: '#fff' };
const FADE_DIV    = {
  display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0 1.4rem',
  height: '40px', background: '#f9fafb',
  borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb',
};
const FADE_LINE   = { flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #d1d5db, transparent)' };
const FADE_LABEL  = { fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.06em' };

/* ── Aside ── */
const ASIDE = { width: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' };

const AUTHOR_BOX  = { display: 'flex', alignItems: 'center', gap: '0.85rem', background: '#fff', borderRadius: '14px', padding: '1rem 1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };
const AVATAR      = { width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 };
const AUTH_NAME   = { display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.95rem', fontWeight: 800, color: '#1b1b1b' };
const VERIFIED    = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', background: '#2d6a4f', color: '#fff', borderRadius: '50%', fontSize: '0.6rem', fontWeight: 800 };
const AUTH_SUB    = { display: 'block', fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.1rem' };

const META_ROW    = { display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' };

const BP_BOX      = { background: '#fff', borderRadius: '12px', padding: '0.9rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const BP_LBL      = { fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
const BP_LINK     = { fontSize: '0.88rem', fontWeight: 700, color: '#2d6a4f', textDecoration: 'none' };

const CAP_CARD    = { background: '#fff', borderRadius: '12px', padding: '1rem 1.2rem', display: 'flex', alignItems: 'flex-start', gap: '0.7rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const CAP_ICON    = { fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' };
const CAP_TEXT    = { fontSize: '0.88rem', lineHeight: 1.7, color: '#374151', margin: 0 };

const STATS_ROW   = { display: 'flex', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' };
const STAT_ITEM   = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.9rem 0.5rem', gap: '0.15rem' };
const STAT_VAL    = { fontSize: '1rem', fontWeight: 800, color: '#2d6a4f' };
const STAT_LBL    = { fontSize: '0.65rem', color: '#9ca3af', textAlign: 'center' };
const STAT_DIV    = { width: '1px', background: '#f0f0f0', alignSelf: 'stretch' };

const ACTIONS     = { display: 'flex', gap: '0.7rem' };
const LIKE_BASE   = { flex: 1, padding: '0.6rem 0', borderRadius: '8px', border: '1.5px solid #2d6a4f', background: 'none', color: '#2d6a4f', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: FONT };
const LIKE_HOVER  = { background: '#2d6a4f', color: '#fff' };
const RPT_BASE    = { padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1.5px solid #e5e7eb', background: 'none', color: '#9ca3af', fontSize: '0.82rem', cursor: 'pointer', fontFamily: FONT };
const RPT_HOVER   = { borderColor: '#dc2626', color: '#dc2626' };
const TRY_BASE    = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#2d6a4f', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, padding: '0.8rem', borderRadius: '10px', textAlign: 'center' };
const TRY_HOVER   = { background: '#235c42' };

/* ── More section ── */
const MORE_WRAP   = { padding: '0 8vw 5rem', maxWidth: '1200px', margin: '0 auto' };
const MORE_TITLE  = { fontSize: '1.2rem', fontWeight: 800, color: '#1b1b1b', margin: '0 0 1.2rem' };
const MORE_GRID   = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' };
const MORE_CARD_BASE  = { borderRadius: '14px', overflow: 'hidden', background: '#fff', textDecoration: 'none', color: 'inherit', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', display: 'block' };
const MORE_IMGS   = { height: '110px', display: 'flex', overflow: 'hidden' };
const MORE_IMG_EL = { flex: 1, objectFit: 'cover', display: 'block' };
const MORE_FADE   = { width: '32px', flexShrink: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.15), transparent)', marginLeft: '-16px', marginRight: '-16px', zIndex: 1, pointerEvents: 'none' };
const MORE_INFO   = { padding: '0.65rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' };
const MORE_USER   = { fontSize: '0.72rem', color: '#9ca3af', fontWeight: 500 };
const MORE_NAME   = { fontSize: '0.82rem', fontWeight: 700, color: '#1b1b1b' };

function MoreCard({ p }) {
  const [hov, setHov] = useState(false);
  const card = { ...MORE_CARD_BASE, ...(hov ? { transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' } : {}), transition: 'transform 0.15s, box-shadow 0.15s' };
  return (
    <Link key={p.id} to={`/gallery/${p.id}`} style={card} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={MORE_IMGS}>
        <img src={p.beforeImg} alt="Before" style={MORE_IMG_EL} />
        <div style={MORE_FADE} />
        <img src={p.afterImg} alt="After" style={MORE_IMG_EL} />
      </div>
      <div style={MORE_INFO}>
        <span style={MORE_USER}>{p.user}</span>
        <span style={MORE_NAME}>{p.blueprint}</span>
      </div>
    </Link>
  );
}

function GalleryPost() {
  const { id } = useParams();
  const post = POSTS.find(p => p.id === Number(id)) || POSTS[0];
  const [likeHov, setLikeHov] = useState(false);
  const [rptHov, setRptHov]   = useState(false);
  const [tryHov, setTryHov]   = useState(false);

  return (
    <PageShell style={{ background: '#f0f9f4', color: '#1b1b1b' }}>

      {/* Breadcrumb */}
      <nav style={NAV}>
        <Link to="/" style={NAV_LINK}>Home</Link>
        <span style={NAV_SEP}>›</span>
        <Link to="/gallery" style={NAV_LINK}>Gallery</Link>
        <span style={NAV_SEP}>›</span>
        <span style={NAV_CUR}>{post.blueprint}</span>
      </nav>

      <div style={LAYOUT}>

        {/* Left: images */}
        <div style={IMAGES_COL}>
          <div style={IMG_WRAP}>
            <img src={post.beforeImg} alt="Before" style={IMG_EL} />
            <span style={TAG_BEFORE}>Before</span>
          </div>

          <div style={FADE_DIV}>
            <div style={FADE_LINE} />
            <span style={FADE_LABEL}>→</span>
            <div style={FADE_LINE} />
          </div>

          <div style={IMG_WRAP}>
            <img src={post.afterImg} alt="After" style={IMG_EL} />
            <span style={TAG_AFTER}>After</span>
          </div>
        </div>

        {/* Right: aside */}
        <aside style={ASIDE}>

          {/* Author */}
          <div style={AUTHOR_BOX}>
            <span style={{ ...AVATAR, background: post.avatarBg }}>{post.avatar}</span>
            <div>
              <span style={AUTH_NAME}>
                {post.user}
                {post.verified && <span style={VERIFIED}>✓</span>}
              </span>
              <span style={AUTH_SUB}>Community Maker</span>
            </div>
          </div>

          {/* Meta */}
          <div style={META_ROW}>
            <TagChip label={post.category} />
            {post.verified && <TagChip label="✓ Verified Build" />}
          </div>

          {/* Blueprint link */}
          <div style={BP_BOX}>
            <span style={BP_LBL}>Blueprint used</span>
            <Link to="/blueprints" style={BP_LINK}>{post.blueprint} →</Link>
          </div>

          {/* Caption */}
          <div style={CAP_CARD}>
            <span style={CAP_ICON}>💬</span>
            <p style={CAP_TEXT}>{post.caption}</p>
          </div>

          {/* Stats */}
          <div style={STATS_ROW}>
            <div style={STAT_ITEM}>
              <span style={STAT_VAL}>♥ {post.likes}</span>
              <span style={STAT_LBL}>Likes</span>
            </div>
            <div style={STAT_DIV} />
            <div style={STAT_ITEM}>
              <span style={STAT_VAL}>+{post.ecoPoints}</span>
              <span style={STAT_LBL}>Eco-Points</span>
            </div>
            <div style={STAT_DIV} />
            <div style={STAT_ITEM}>
              <span style={STAT_VAL}>🏅</span>
              <span style={STAT_LBL}>{post.badge}</span>
            </div>
          </div>

          {/* Actions */}
          <div style={ACTIONS}>
            <button
              style={{ ...LIKE_BASE, ...(likeHov ? LIKE_HOVER : {}) }}
              onMouseEnter={() => setLikeHov(true)} onMouseLeave={() => setLikeHov(false)}
            >♥ Like this build</button>
            <button
              style={{ ...RPT_BASE, ...(rptHov ? RPT_HOVER : {}) }}
              onMouseEnter={() => setRptHov(true)} onMouseLeave={() => setRptHov(false)}
            >⚠ Report</button>
          </div>

          {/* Try CTA */}
          <Link
            to="/blueprints"
            style={{ ...TRY_BASE, ...(tryHov ? TRY_HOVER : {}) }}
            onMouseEnter={() => setTryHov(true)} onMouseLeave={() => setTryHov(false)}
          >
            🛠 Try This Blueprint
          </Link>

        </aside>
      </div>

      {/* More posts */}
      <section style={MORE_WRAP}>
        <h2 style={MORE_TITLE}>More from the Community</h2>
        <div style={MORE_GRID}>
          {POSTS.filter(p => p.id !== post.id).slice(0, 3).map(p => (
            <MoreCard key={p.id} p={p} />
          ))}
        </div>
      </section>

    </PageShell>
  );
}

export default GalleryPost;
