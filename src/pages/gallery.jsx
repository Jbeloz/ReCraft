import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import GalleryCard from '../components/common/GalleryCard';
import TagChip from '../components/common/TagChip';


const NAV = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '1rem 8vw', fontSize: '0.8rem',
  background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
};
const NAV_LINK = { color: '#2d6a4f', textDecoration: 'none', fontWeight: 500 };
const NAV_SEP  = { color: '#9ca3af' };

const HERO = {
  textAlign: 'center', padding: '3.5rem 8vw 2.5rem',
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
};
const HERO_BADGE = {
  display: 'inline-block', fontSize: '0.7rem', fontWeight: 700,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2d6a4f',
  background: '#d8f3dc', padding: '0.3rem 0.9rem', borderRadius: '999px',
};
const HERO_TITLE = { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#1a2e22', margin: 0 };
const HERO_SUB   = { fontSize: '1rem', color: '#4b5563', maxWidth: '480px', lineHeight: 1.7, margin: '0 0 0.5rem' };
const UPLOAD_BTN = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  background: '#f4a261', color: '#fff', textDecoration: 'none',
  fontSize: '0.9rem', fontWeight: 700, padding: '0.75rem 2rem',
  borderRadius: '12px', boxShadow: '0 4px 14px rgba(244,162,97,0.3)',
};

const STATS_BAR = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)',
  borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '1.2rem 8vw',
};
const STAT_ITEM = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem', padding: '0 3rem' };
const STAT_NUM  = { fontSize: '1.6rem', fontWeight: 900, color: '#2d6a4f', lineHeight: 1 };
const STAT_LBL  = { fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 };
const STAT_DIV  = { width: '1px', height: '40px', background: '#e5e7eb' };

const FILTERS_ROW = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '1.4rem 8vw', overflowX: 'auto',
};

const GRID_WRAP = { padding: '0 8vw 5rem' };
const GRID = {
  display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '1.6rem', maxWidth: '1300px', margin: '0 auto',
};


export const POSTS = [
  {
    id: 1, user: 'Maya R.',   avatar: '\u{1F469}', avatarBg: '#d8f3dc', blueprint: 'Geometric Wall Shelf',  category: 'Home Decor',
    beforeImg: 'https://picsum.photos/seed/cardboardboxes/400/300',
    afterImg:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGYpj7bgZOKm7sENbvPuNpzrnrECoQyc2lrA&s',
    caption: 'Turned 4 cardboard boxes from a delivery into this shelf! Took about 2 hours.',
    likes: 84, ecoPoints: 120, badge: 'Storage Guru', verified: true,
  },
  {
    id: 2, user: 'Carlos T.', avatar: '\u{1F468}', avatarBg: '#dbeafe', blueprint: 'Vertical Herb Garden',  category: 'Gardening',
    beforeImg: 'https://picsum.photos/seed/plasticbottles/400/300',
    afterImg:  'https://picsum.photos/seed/herbgarden/400/300',
    caption: 'My balcony now grows basil, mint and parsley year-round with just old plastic bottles!',
    likes: 212, ecoPoints: 95, badge: 'Green Thumb', verified: true,
  },
  {
    id: 3, user: 'Priya S.',  avatar: '\u{1F469}', avatarBg: '#ede9fe', blueprint: 'Patchwork Tote Bag',    category: 'Textile',
    beforeImg: 'https://picsum.photos/seed/denimjeans/400/300',
    afterImg:  'https://picsum.photos/seed/totebag/400/300',
    caption: 'Five pairs of old jeans became these gorgeous tote bags. Gave two away as gifts!',
    likes: 57, ecoPoints: 110, badge: 'Textile Tech', verified: false,
  },
  {
    id: 4, user: 'Jordan K.', avatar: '\u{1F9D1}', avatarBg: '#fef9c3', blueprint: 'Terrarium Garden',      category: 'Gardening',
    beforeImg: 'https://picsum.photos/seed/glassjars/400/300',
    afterImg:  'https://picsum.photos/seed/terrarium/400/300',
    caption: 'Four mason jars from pasta sauce transformed into a mini zen garden on my desk.',
    likes: 143, ecoPoints: 80, badge: 'Glass Guardian', verified: true,
  },
  {
    id: 5, user: 'Aisha M.',  avatar: '\u{1F469}', avatarBg: '#ffedd5', blueprint: 'Cork Bath Mat',         category: 'Home Decor',
    beforeImg: 'https://picsum.photos/seed/winecorks/400/300',
    afterImg:  'https://picsum.photos/seed/corkmat/400/300',
    caption: '87 wine corks from the past two years finally have a purpose. The mat is surprisingly sturdy!',
    likes: 99, ecoPoints: 75, badge: 'Repurpose Pro', verified: true,
  },
  {
    id: 6, user: 'Lena B.',   avatar: '\u{1F469}', avatarBg: '#f8bbd0', blueprint: 'Braided Rug',           category: 'Textile',
    beforeImg: 'https://picsum.photos/seed/oldshirts/400/300',
    afterImg:  'https://picsum.photos/seed/braidedrug/400/300',
    caption: 'Cut up 12 old t-shirts and braided them into this cozy bathroom rug. Zero cost!',
    likes: 38, ecoPoints: 130, badge: 'Textile Tech', verified: false,
  },
];

const FILTERS = ['All', 'Home Decor', 'Gardening', 'Textile', 'Storage', 'Lighting'];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const shown = activeFilter === 'All' ? POSTS : POSTS.filter(p => p.category === activeFilter);

  return (
    <PageShell style={{ background: '#f0f9f4', color: '#1b1b1b' }}>

      {/* Breadcrumb */}
      <nav style={NAV}>
        <Link to="/" style={NAV_LINK}>Home</Link>
        <span style={NAV_SEP}>›</span>
        <span>Community Gallery</span>
      </nav>

      {/* Hero */}
      <header style={HERO}>
        <span style={HERO_BADGE}>👥 Community</span>
        <h1 style={HERO_TITLE}>Community Gallery</h1>
        <p style={HERO_SUB}>
          Real builds from real makers. Get inspired and share your own upcycled creations.
        </p>
        <Link to="/scan" style={UPLOAD_BTN}>⬆ Share Your Build</Link>
      </header>

      {/* Stats bar */}
      <div style={STATS_BAR}>
        <div style={STAT_ITEM}>
          <span style={STAT_NUM}>1,284</span>
          <span style={STAT_LBL}>Creations Shared</span>
        </div>
        <div style={STAT_DIV} />
        <div style={STAT_ITEM}>
          <span style={STAT_NUM}>48 kg</span>
          <span style={STAT_LBL}>Waste Diverted</span>
        </div>
        <div style={STAT_DIV} />
        <div style={STAT_ITEM}>
          <span style={STAT_NUM}>632</span>
          <span style={STAT_LBL}>Active Makers</span>
        </div>
      </div>

      {/* Filter bar */}
      <div style={FILTERS_ROW}>
        {FILTERS.map(f => (
          <TagChip
            key={f}
            label={f}
            active={activeFilter === f}
            onClick={() => setActiveFilter(f)}
          />
        ))}
      </div>

      {/* Grid */}
      <div style={GRID_WRAP}>
        <div style={GRID}>
          {shown.map(post => <GalleryCard key={post.id} post={post} />)}
        </div>
      </div>

    </PageShell>
  );
}

export default Gallery;
