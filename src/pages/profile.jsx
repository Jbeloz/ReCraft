import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import GalleryCard from '../components/common/GalleryCard';
import { useAuth } from '../context/AuthContext';
import { POSTS } from './gallery';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";


const BREADCRUMB = { display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.85rem 8vw', fontSize: '0.78rem', color: '#6b7280', background: '#fff', borderBottom: '1px solid #f0f0f0' };
const BC_LINK = { color: '#6b7280', textDecoration: 'none' };
const BC_SEP  = { color: '#9ca3af' };

const HERO = { display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2.5rem 8vw', background: '#fff', borderBottom: '1px solid #f0f0f0' };
const AVATAR = { width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #2d6a4f, #52b788)', color: '#fff', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const HERO_INFO   = { flex: 1 };
const HERO_NAME   = { fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: '0 0 0.2rem' };
const HERO_EMAIL  = { fontSize: '0.82rem', color: '#6b7280', margin: '0 0 0.55rem' };
const LEVEL_BADGE = { display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, color: '#2d6a4f', background: '#d8f3dc', padding: '0.22rem 0.7rem', borderRadius: '999px' };
const LOGOUT_BASE = { padding: '0.55rem 1.1rem', background: 'none', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', cursor: 'pointer', fontFamily: FONT };
const LOGOUT_HOV  = { borderColor: '#2d6a4f', color: '#2d6a4f' };

const STATS = { display: 'flex', gap: 0, background: '#fff', borderBottom: '1px solid #f0f0f0' };
const STAT_ITEM = (last) => ({ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.2rem 1rem', borderRight: last ? 'none' : '1px solid #f0f0f0' });
const STAT_VAL = { fontSize: '1.5rem', fontWeight: 800, color: '#2d6a4f' };
const STAT_LBL = { fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.15rem', fontWeight: 500 };

const XP_WRAP  = { padding: '1.2rem 8vw', background: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #f0f0f0' };
const XP_LBL   = { fontSize: '0.78rem', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' };
const XP_BAR   = { flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '999px', overflow: 'hidden' };
const XP_FILL  = { height: '100%', background: 'linear-gradient(to right, #2d6a4f, #52b788)', borderRadius: '999px', transition: 'width 0.4s ease' };
const XP_PTS   = { fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' };

const SECTION  = { padding: '2rem 8vw' };
const SEC_TTL  = { fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 1.2rem' };

const BADGES_WRAP = { display: 'flex', flexWrap: 'wrap', gap: '1rem' };
const BADGE_BASE  = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', padding: '1rem 1.2rem', background: '#fff', border: '1.5px solid #d1fae5', borderRadius: '12px', minWidth: '90px', position: 'relative' };
const BADGE_LOCKED = { opacity: 0.45, borderColor: '#e5e7eb', filter: 'grayscale(1)' };
const BADGE_ICON  = { fontSize: '1.6rem' };
const BADGE_LBL   = { fontSize: '0.72rem', fontWeight: 600, color: '#374151', textAlign: 'center' };
const BADGE_LOCK  = { position: 'absolute', top: '4px', right: '6px', fontSize: '0.65rem' };

const CARDS_GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' };
const SEE_ALL    = { display: 'inline-block', marginTop: '1rem', fontSize: '0.82rem', fontWeight: 600, color: '#2d6a4f', textDecoration: 'none' };

const EMPTY      = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '6rem 2rem', textAlign: 'center' };
const EMPTY_P    = { color: '#6b7280' };
const SIGNIN_BTN = { padding: '0.65rem 1.5rem', background: '#2d6a4f', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' };

const BADGES = [
  { icon: '🌿', label: 'First Build',    earned: true },
  { icon: '♻️', label: 'Recycler',        earned: true },
  { icon: '🏆', label: 'Top Crafter',    earned: false },
  { icon: '🔥', label: '5-Day Streak',   earned: false },
  { icon: '🌟', label: 'Community Star', earned: false },
  { icon: '🎨', label: 'Artist',         earned: false },
];

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutHov, setLogoutHov] = useState(false);

  if (!user) {
    return (
      <PageShell style={{ background: '#f9fafb' }}>
        <div style={EMPTY}>
          <span style={{ fontSize: '3rem' }}>🔒</span>
          <p style={EMPTY_P}>You need to be signed in to view your profile.</p>
          <Link to="/auth" style={SIGNIN_BTN}>Sign In</Link>
        </div>
      </PageShell>
    );
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const level = Math.max(1, Math.floor(user.ecoPoints / 100) + 1);
  const progress = (user.ecoPoints % 100);

  return (
    <PageShell style={{ background: '#f9fafb' }}>

      {/* Breadcrumb */}
      <nav style={BREADCRUMB}>
        <Link to="/" style={BC_LINK}>Home</Link>
        <span style={BC_SEP}>›</span>
        <span>Profile</span>
      </nav>

      {/* Hero */}
      <div style={HERO}>
        <div style={AVATAR}>{user.initials}</div>
        <div style={HERO_INFO}>
          <h1 style={HERO_NAME}>{user.name}</h1>
          <p style={HERO_EMAIL}>{user.email}</p>
          <div style={LEVEL_BADGE}>Level {level} Crafter</div>
        </div>
        <button
          style={{ ...LOGOUT_BASE, ...(logoutHov ? LOGOUT_HOV : {}) }}
          onMouseEnter={() => setLogoutHov(true)} onMouseLeave={() => setLogoutHov(false)}
          onClick={handleLogout}
        >
          → Sign Out
        </button>
      </div>

      {/* Stats row */}
      <div style={STATS}>
        <div style={STAT_ITEM(false)}>
          <span style={STAT_VAL}>{user.ecoPoints}</span>
          <span style={STAT_LBL}>Eco-Points</span>
        </div>
        <div style={STAT_ITEM(false)}>
          <span style={STAT_VAL}>0</span>
          <span style={STAT_LBL}>Builds</span>
        </div>
        <div style={STAT_ITEM(false)}>
          <span style={STAT_VAL}>0</span>
          <span style={STAT_LBL}>Gallery Posts</span>
        </div>
        <div style={STAT_ITEM(true)}>
          <span style={STAT_VAL}>{level}</span>
          <span style={STAT_LBL}>Level</span>
        </div>
      </div>

      {/* XP bar */}
      <div style={XP_WRAP}>
        <span style={XP_LBL}>Progress to Level {level + 1}</span>
        <div style={XP_BAR}>
          <div style={{ ...XP_FILL, width: `${progress}%` }} />
        </div>
        <span style={XP_PTS}>{user.ecoPoints} / {level * 100} pts</span>
      </div>

      {/* Badges */}
      <section style={SECTION}>
        <h2 style={SEC_TTL}>Badges</h2>
        <div style={BADGES_WRAP}>
          {BADGES.map(b => (
            <div key={b.label} style={{ ...BADGE_BASE, ...(b.earned ? {} : BADGE_LOCKED) }}>
              <span style={BADGE_ICON}>{b.icon}</span>
              <span style={BADGE_LBL}>{b.label}</span>
              {!b.earned && <span style={BADGE_LOCK}>🔒</span>}
            </div>
          ))}
        </div>
      </section>

      {/* My Builds */}
      <section style={SECTION}>
        <h2 style={SEC_TTL}>My Builds</h2>
        <div style={CARDS_GRID}>
          {POSTS.slice(0, 3).map(post => <GalleryCard key={post.id} post={post} />)}
        </div>
        <Link to="/gallery" style={SEE_ALL}>See all in Community Gallery →</Link>
      </section>

    </PageShell>
  );
}

export default Profile;
