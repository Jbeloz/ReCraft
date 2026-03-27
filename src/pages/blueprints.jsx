import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import BlueprintCard from '../components/common/BlueprintCard';
import TagChip from '../components/common/TagChip';
import { ALL_PROJECTS, CATEGORIES, DIFFICULTIES } from './blueprints/blueprintsData';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";


const BREADCRUMB = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '0.75rem 8vw', fontSize: '0.8rem',
  background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
};
const BC_LINK = { color: '#2d6a4f', textDecoration: 'none', fontWeight: 500 };
const BC_SEP  = { color: '#9ca3af' };

const HEADER = {
  background: 'linear-gradient(150deg, #e8f5e9 0%, #f0f9f4 70%)',
  padding: '2.5rem 8vw 3rem',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
};

const HEADER_LABEL = {
  display: 'inline-block', fontSize: '0.68rem', fontWeight: 700,
  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#52b788', marginBottom: '0.5rem',
};

const HEADER_TITLE    = { fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, lineHeight: 1.12, color: '#1b1b1b', margin: '0 0 0.5rem' };
const HEADER_SUBTITLE = { fontSize: '0.92rem', color: '#6b7280', margin: '0 0 2rem' };

const SEARCH_WRAP = { position: 'relative', maxWidth: '560px' };
const SEARCH_ICON = {
  position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
  fontSize: '1rem', pointerEvents: 'none',
};
const SEARCH_INPUT = {
  width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem',
  border: '1.5px solid #d1d5db', borderRadius: '12px',
  fontSize: '0.92rem', background: '#fff', color: '#1b1b1b',
  outline: 'none', boxSizing: 'border-box', fontFamily: FONT,
};

const BODY = {
  display: 'flex', alignItems: 'flex-start', gap: '2rem',
  padding: '2.5rem 8vw', maxWidth: '1400px', margin: '0 auto',
};

const SIDEBAR = {
  width: '200px', flexShrink: 0, display: 'flex', flexDirection: 'column',
  gap: '2rem', position: 'sticky', top: '1.5rem',
};

const FILTER_GROUP  = { display: 'flex', flexDirection: 'column', gap: '0.4rem' };
const FILTER_LABEL  = {
  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: '#6b7280', margin: '0 0 0.35rem',
};

const MAIN    = { flex: 1, minWidth: 0 };
const TOOLBAR = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem',
};
const COUNT   = { fontSize: '0.88rem', color: '#6b7280', fontWeight: 500 };
const SORT    = { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#6b7280' };
const SORT_SELECT = {
  padding: '0.35rem 0.7rem', border: '1.5px solid #d1d5db', borderRadius: '8px',
  fontSize: '0.82rem', background: '#fff', color: '#1b1b1b', cursor: 'pointer', outline: 'none',
};

const GRID    = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.4rem' };
const EMPTY   = { gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af', fontSize: '0.9rem' };


function Projects() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDiff, setActiveDiff] = useState('All');

  const filtered = ALL_PROJECTS.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeDiff !== 'All' && p.diff !== activeDiff) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.matTag.toLowerCase().includes(q) ||
      p.materials.some(m => m.toLowerCase().includes(q))
    );
  });

  const activeFilters = [activeCategory, activeDiff].filter(f => f !== 'All');
  const filterSuffix = activeFilters.length ? ` (${activeFilters.join(', ')})` : '';

  return (
    <PageShell style={{ background: '#f0f9f4', color: '#1b1b1b' }}>

      {/* Breadcrumb */}
      <nav style={BREADCRUMB}>
        <Link to="/" style={BC_LINK}>Home</Link>
        <span style={BC_SEP}>›</span>
        <span>Blueprints</span>
      </nav>

      {/* Header */}
      <header style={HEADER}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={HEADER_LABEL}>Blueprints</span>
          <h1 style={HEADER_TITLE}>Find Your Next Creation</h1>
          <p style={HEADER_SUBTITLE}>Browse {ALL_PROJECTS.length} upcycling blueprints. Filter by your materials or category.</p>
        </div>

        {/* Search */}
        <div style={SEARCH_WRAP}>
          <span style={SEARCH_ICON}>🔍</span>
          <input
            style={SEARCH_INPUT}
            type="text"
            placeholder="Search by project name or material..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div style={BODY}>

        {/* Sidebar filters */}
        <aside style={SIDEBAR}>
          <div style={FILTER_GROUP}>
            <h4 style={FILTER_LABEL}>Category</h4>
            {CATEGORIES.map(c => (
              <TagChip
                key={c}
                label={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
              />
            ))}
          </div>
          <div style={FILTER_GROUP}>
            <h4 style={FILTER_LABEL}>Difficulty</h4>
            {DIFFICULTIES.map(d => (
              <TagChip
                key={d}
                label={d}
                active={activeDiff === d}
                onClick={() => setActiveDiff(d)}
              />
            ))}
          </div>
        </aside>

        {/* Main grid */}
        <div style={MAIN}>
          <div style={TOOLBAR}>
            <span style={COUNT}>{filtered.length} blueprint{filtered.length !== 1 ? 's' : ''}{query.trim() ? ` for "${query}"` : ''}{filterSuffix}</span>
            <div style={SORT}>
              <label>Sort by</label>
              <select style={SORT_SELECT} defaultValue="popular">
                <option value="popular">Most Popular</option>
                <option value="easy">Easiest First</option>
                <option value="quick">Quickest First</option>
              </select>
            </div>
          </div>

          <div style={GRID}>
            {filtered.length === 0 ? (
              <p style={EMPTY}>No blueprints found{query.trim() ? ` for "${query}"` : ''}{filterSuffix}. Try adjusting your filters.</p>
            ) : filtered.map(p => (
              <BlueprintCard key={p.id} {...p} showChips />
            ))}
          </div>
        </div>

      </div>
    </PageShell>
  );
}

export default Projects;
