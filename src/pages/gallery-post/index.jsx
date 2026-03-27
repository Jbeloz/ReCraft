import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './gallery-post.css';
import Navbar from '../../components/layout/navbar/navbar';
import { POSTS } from '../gallery/index';
import Button from '../../components/common/button/button';

function GalleryPost() {
  const { id } = useParams();
  const post = POSTS.find(p => p.id === Number(id)) || POSTS[0];

  return (
    <div className="gpost">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="gpost__nav">
        <Link to="/">Home</Link>
        <span>&#x203A;</span>
        <Link to="/gallery">Gallery</Link>
        <span>&#x203A;</span>
        <span>{post.blueprint}</span>
      </nav>

      <div className="gpost__layout">

        {/* ── Left: images ── */}
        <div className="gpost__images">

          <div className="gpost__img-wrap gpost__img-wrap--before">
            <img src={post.beforeImg} alt="Before" />
            <span className="gpost__img-tag gpost__img-tag--before">Before</span>
          </div>

          {/* Fade divider */}
          <div className="gpost__fade-divider">
            <div className="gpost__fade-line" />
            <span className="gpost__fade-label">&#x2192;</span>
            <div className="gpost__fade-line" />
          </div>

          <div className="gpost__img-wrap gpost__img-wrap--after">
            <img src={post.afterImg} alt="After" />
            <span className="gpost__img-tag gpost__img-tag--after">After</span>
          </div>

        </div>

        {/* ── Right: post details ── */}
        <aside className="gpost__aside">

          {/* Author */}
          <div className="gpost__author">
            <span className="gpost__avatar" style={{ background: post.avatarBg }}>{post.avatar}</span>
            <div>
              <span className="gpost__author-name">
                {post.user}
                {post.verified && <span className="gpost__verified">&#x2713;</span>}
              </span>
              <span className="gpost__author-sub">Community Maker</span>
            </div>
          </div>

          {/* Meta */}
          <div className="gpost__meta">
            <span className="gpost__cat">{post.category}</span>
            {post.verified && <span className="gpost__verified-badge">&#x2713; Verified Build</span>}
          </div>

          {/* Blueprint link */}
          <div className="gpost__blueprint-row">
            <span className="gpost__blueprint-label">Blueprint used</span>
            <Link to="/blueprints" className="gpost__blueprint-link">{post.blueprint} &#x2192;</Link>
          </div>

          {/* Caption */}
          <div className="gpost__caption-card">
            <span className="gpost__caption-icon">&#x1F4AC;</span>
            <p className="gpost__caption">{post.caption}</p>
          </div>

          {/* Stats */}
          <div className="gpost__stats">
            <div className="gpost__stat">
              <span className="gpost__stat-val">&#x2665; {post.likes}</span>
              <span className="gpost__stat-label">Likes</span>
            </div>
            <div className="gpost__stat-divider" />
            <div className="gpost__stat">
              <span className="gpost__stat-val">+{post.ecoPoints}</span>
              <span className="gpost__stat-label">Eco-Points</span>
            </div>
            <div className="gpost__stat-divider" />
            <div className="gpost__stat">
              <span className="gpost__stat-val">&#x1F3C5;</span>
              <span className="gpost__stat-label">{post.badge}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="gpost__actions">
            <Button className="gpost__like-btn">&#x2665; Like this build</Button>
            <Button variant="danger" className="gpost__report-btn">&#x26A0; Report</Button>
          </div>

          {/* Try blueprint CTA */}
          <Link to="/blueprints" className="gpost__try-btn">
            &#x1F6E0; Try This Blueprint
          </Link>

        </aside>
      </div>

      {/* Other posts */}
      <section className="gpost__more">
        <h2 className="gpost__more-title">More from the Community</h2>
        <div className="gpost__more-grid">
          {POSTS.filter(p => p.id !== post.id).slice(0, 3).map(p => (
            <Link key={p.id} to={`/gallery/${p.id}`} className="gpost__more-card">
              <div className="gpost__more-imgs">
                <img src={p.beforeImg} alt="Before" />
                <div className="gpost__more-fade" />
                <img src={p.afterImg} alt="After" />
              </div>
              <div className="gpost__more-info">
                <span className="gpost__more-user">{p.user}</span>
                <span className="gpost__more-name">{p.blueprint}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

export default GalleryPost;
