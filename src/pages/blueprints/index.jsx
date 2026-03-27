import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './projects.css';
import Navbar from '../../components/layout/navbar/navbar';
import { ALL_PROJECTS, CATEGORIES, DIFFICULTIES } from './blueprintsData';
import Button from '../../components/common/button/button';

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
    <div className="projects">

      <Navbar />

      {/* Breadcrumb */}
      <nav className="projects__breadcrumb">
        <Link to="/">Home</Link>
        <span>&#x203A;</span>
        <span>Blueprints</span>
      </nav>

      {/* Header */}
      <header className="projects__header">
        <div className="projects__header-content">
          <span className="projects__label">Blueprints</span>
          <h1 className="projects__title">Find Your Next Creation</h1>
          <p className="projects__subtitle">Browse {ALL_PROJECTS.length} upcycling blueprints. Filter by your materials or category.</p>
        </div>

        {/* Search */}
        <div className="projects__search-wrap">
          <span className="projects__search-icon">&#x1F50D;</span>
          <input
            className="projects__search"
            type="text"
            placeholder="Search by project name or material..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="projects__body">

        {/* Sidebar filters */}
        <aside className="projects__sidebar">
          <div className="projects__filter-group">
            <h4 className="projects__filter-label">Category</h4>
            {CATEGORIES.map(c => (
              <Button
                key={c}
                variant="ghost"
                size="sm"
                className={`projects__filter-btn${activeCategory === c ? ' projects__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >{c}</Button>
            ))}
          </div>
          <div className="projects__filter-group">
            <h4 className="projects__filter-label">Difficulty</h4>
            {DIFFICULTIES.map(d => (
              <Button
                key={d}
                variant="ghost"
                size="sm"
                className={`projects__filter-btn${activeDiff === d ? ' projects__filter-btn--active' : ''}`}
                onClick={() => setActiveDiff(d)}
              >{d}</Button>
            ))}
          </div>
        </aside>

        {/* Main grid */}
        <main className="projects__main">
          <div className="projects__toolbar">
            <span className="projects__count">{filtered.length} blueprint{filtered.length !== 1 ? 's' : ''}{query.trim() ? ` for "${query}"` : ''}{filterSuffix}</span>
            <div className="projects__sort">
              <label>Sort by</label>
              <select defaultValue="popular">
                <option value="popular">Most Popular</option>
                <option value="easy">Easiest First</option>
                <option value="quick">Quickest First</option>
              </select>
            </div>
          </div>

          <div className="projects__grid">
              {filtered.length === 0 ? (
                <p className="projects__empty">No blueprints found{query.trim() ? ` for "${query}"` : ''}{filterSuffix}. Try adjusting your filters.</p>
              ) : filtered.map(p => (
                <Link to={`/blueprint/${p.id}`} className="projects__card" key={p.id}>
                  <img className="projects__card-img" src={p.img} alt={p.title} />
                  <div className="projects__card-body">
                    <span className="projects__card-mat">{p.matTag}</span>
                    <h3 className="projects__card-title">{p.title}</h3>
                    <div className="projects__card-tags">
                      <span className={`projects__diff projects__diff--${p.diff.toLowerCase()}`}>{p.diff}</span>
                      <span className="projects__card-time">&#x23F1; {p.time}</span>
                      <span className="projects__card-builds">{p.builds} builds</span>
                    </div>
                    <div className="projects__card-materials">
                      {p.materials.map(m => (
                        <span key={m} className="projects__mat-chip">{m}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </main>

      </div>
    </div>
  );
}

export default Projects;
