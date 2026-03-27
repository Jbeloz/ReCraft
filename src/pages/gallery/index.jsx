import React from 'react';
import { Link } from 'react-router-dom';
import './gallery.css';
import Navbar from '../../components/layout/navbar/navbar';

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
  return (
    <div className="gallery">

      <Navbar />

      {/* Nav */}
      <nav className="gallery__nav">
        <Link to="/">Home</Link>
        <span>&#x203A;</span>
        <span>Community Gallery</span>
      </nav>

      {/* Hero */}
      <header className="gallery__hero">
        <span className="gallery__hero-badge">&#x1F465; Community</span>
        <h1 className="gallery__hero-title">Community Gallery</h1>
        <p className="gallery__hero-sub">
          Real builds from real makers. Get inspired and share your own upcycled creations.
        </p>
        <Link to="/scan" className="gallery__upload-btn">&#x2B06; Share Your Build</Link>
      </header>

      {/* Stats bar */}
      <div className="gallery__stats">
        <div className="gallery__stat">
          <span className="gallery__stat-num">1,284</span>
          <span className="gallery__stat-label">Creations Shared</span>
        </div>
        <div className="gallery__stat-divider" />
        <div className="gallery__stat">
          <span className="gallery__stat-num">48 kg</span>
          <span className="gallery__stat-label">Waste Diverted</span>
        </div>
        <div className="gallery__stat-divider" />
        <div className="gallery__stat">
          <span className="gallery__stat-num">632</span>
          <span className="gallery__stat-label">Active Makers</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="gallery__filters">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            className={`gallery__filter-btn${i === 0 ? ' gallery__filter-btn--active' : ''}`}
          >{f}</button>
        ))}
      </div>

      {/* Grid */}
      <main className="gallery__grid-wrap">
        <div className="gallery__grid">
          {POSTS.map(post => (
            <article key={post.id} className="gallery__card">

              {/* Single image */}
              <Link to={`/gallery/${post.id}`} className="gallery__before-after">
                <img src={post.afterImg} alt={post.blueprint} className="gallery__single-img" />
              </Link>

              {/* Card body */}
              <div className="gallery__card-body">
                <div className="gallery__card-top">
                  <div className="gallery__author">
                    <span className="gallery__avatar" style={{ background: post.avatarBg }}>{post.avatar}</span>
                    <div>
                      <span className="gallery__author-name">
                        {post.user}
                        {post.verified && <span className="gallery__verified">&#x2713;</span>}
                      </span>
                      <span className="gallery__blueprint-link">{post.blueprint}</span>
                    </div>
                  </div>
                  <span className="gallery__cat">{post.category}</span>
                </div>

                <p className="gallery__caption">{post.caption}</p>

                <div className="gallery__card-footer">
                  <div className="gallery__card-actions">
                    <button className="gallery__like-btn">&#x2665; {post.likes}</button>
                    <span className="gallery__eco">+{post.ecoPoints} pts</span>
                  </div>
                  <button className="gallery__report-btn" title="Report this post">&#x26A0; Report</button>
                </div>
              </div>

            </article>
          ))}
        </div>
      </main>

    </div>
  );
}

export default Gallery;
