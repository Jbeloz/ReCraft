import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from '../../components/layout/navbar/navbar';
import { ALL_PROJECTS } from '../../pages/blueprints/blueprintsData';

function Home() {
  return (
    <div className="home">

      <Navbar />

      {/* ── Hero ── */}
      <section className="home__hero">
        <div className="home__hero-content">
          <span className="home__hero-tag">DIY Alchemy &amp; Blueprint Hub</span>
          <h1 className="home__hero-title">Turn Trash<br />Into Treasure</h1>
          <p className="home__hero-subtitle">
            Scan or type in your materials and get AI-curated,<br />
            step-by-step upcycling blueprints &mdash; tailored to<br />
            exactly what you have at home.
          </p>
          <div className="home__hero-actions">
            <Link to="/scan" className="btn btn--primary">Start Recrafting!</Link>
            <Link to="/blueprints" className="btn btn--ghost">Browse Blueprints</Link>
          </div>
        </div>

        <div className="home__hero-visual">
          <div className="home__visual-grid">
            {/* Row 1 */}
            <div className="home__visual-materials">
              <p className="home__visual-label">Your materials</p>
              <div className="home__visual-items">
                <span className="home__visual-item">&#x1F455;</span>
                <span className="home__visual-item">&#x1FAD9;</span>
                <span className="home__visual-item">&#x1F4E6;</span>
              </div>
            </div>
            <div className="home__visual-arrow-circle">&#x2192;</div>
            <div className="home__visual-scan">
              <div className="home__visual-scan-bar"><span /><span /><span /></div>
              <p className="home__visual-scan-title">AI Scanning...</p>
              <ul className="home__visual-checklist">
                <li><span className="home__check">&#x2713;</span> Denim jeans</li>
                <li><span className="home__check">&#x2713;</span> Glass jar</li>
                <li><span className="home__check">&#x2713;</span> Cardboard</li>
              </ul>
            </div>
            {/* Row 2 */}
            <div />
            <div />
            <div className="home__visual-arrow-v">&#x2193;</div>
            {/* Row 3 */}
            <div />
            <div />
            <div className="home__visual-creation">
              <p className="home__visual-label home__visual-label--light">Your creation</p>
              <span className="home__visual-creation-emoji">&#x1F45C;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What do you have? ── */}
      <section className="home__input-section">
        <h2 className="home__input-title">What do you have?</h2>
        <p className="home__input-sub">Add your materials and we&rsquo;ll find the perfect project for you.</p>
        <div className="home__input-options">
          <div className="home__input-card">
            <span className="home__input-icon">&#x270F;&#xFE0F;</span>
            <h3>Type it in</h3>
            <p>Manually enter materials like &ldquo;old jeans&rdquo; or &ldquo;glass jar&rdquo;</p>
            <div className="home__search-bar">
              <input type="text" placeholder="e.g. Old denim jeans, glass jar..." />
              <button className="btn btn--primary">Find Projects</button>
            </div>
          </div>
          <div className="home__input-divider">OR</div>
          <div className="home__input-card">
            <span className="home__input-icon">&#x1F4F7;</span>
            <h3>Scan an image</h3>
            <p>Take a photo of your materials and let AI identify them for you</p>
            <button className="btn btn--secondary">Open Scanner</button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="home__how" id="how-it-works">
        <span className="home__section-label">How It Works</span>
        <h2 className="home__section-title">3 steps to your next creation</h2>
        <p className="home__section-sub">No experience needed &mdash; just the stuff in your house</p>
        <div className="home__steps">
          <div className="home__step">
            <span className="home__step-num">1</span>
            <span className="home__step-icon">&#x1F4F7;</span>
            <h3>Scan your materials</h3>
            <p>Point your camera or type what you have. Our AI instantly identifies each item and its upcycling potential.</p>
          </div>
          <div className="home__step">
            <span className="home__step-num">2</span>
            <span className="home__step-icon">&#x1F4CB;</span>
            <h3>Follow AI blueprints</h3>
            <p>Get step-by-step guides matched to exactly what you have. No store runs, no extra tools required.</p>
          </div>
          <div className="home__step">
            <span className="home__step-num">3</span>
            <span className="home__step-icon">&#x1F3C6;</span>
            <h3>Earn badges &amp; Eco-Points</h3>
            <p>Every completed project earns you points and unlocks collector badges.</p>
            <div className="home__step-badges">
              <span className="home__badge-chip">Textile Tech</span>
              <span className="home__badge-chip">Glass Guardian</span>
              <span className="home__badge-chip">Wood Wizard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Blueprints ── */}
      <section className="home__featured">
        <span className="home__section-label">Featured Blueprints</span>
        <h2 className="home__section-title">Trending this week</h2>
        <p className="home__section-sub">Community favorites from recycled materials</p>
        <div className="home__cards-grid">
          {ALL_PROJECTS.slice(0, 3).map((p) => (
            <Link to={`/blueprint/${p.id}`} className="home__project-card" key={p.title}>
              <img className="home__card-img" src={p.img} alt={p.title} />
              <div className="home__card-body">
                <span className="home__card-mat-tag">{p.matTag}</span>
                <h3 className="home__card-title">{p.title}</h3>
                <div className="home__card-meta">
                  <span>{p.builds} builds</span>
                  <span className={`home__diff home__diff--${p.diff.toLowerCase()}`}>{p.diff}</span>
                  <span>{p.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Community Gallery ── */}
      <section className="home__gallery">
        <span className="home__section-label">Community Gallery</span>
        <h2 className="home__section-title">Recent upcycles from the community</h2>
        <p className="home__section-sub">Real people, real trash turned into real treasure</p>
        <div className="home__gallery-grid">
          {ALL_PROJECTS.slice(0, 4).map((g) => (
            <Link to={`/blueprint/${g.id}`} className="home__gallery-card" key={g.id}>
              <div className="home__gallery-imgs">
                <img src={g.img} alt={g.title} className="home__gallery-single-img" />
              </div>
              <div className="home__gallery-info">
                <span className="home__gallery-user">{g.emoji} {g.title}</span>
                <span className="home__gallery-project">{g.category}</span>
                <span className="home__gallery-points">{g.builds} builds &nbsp;&middot;&nbsp; {g.diff}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="home__testimonials">
        <span className="home__section-label">Community Love</span>
        <h2 className="home__section-title">What crafters are saying</h2>
        <div className="home__testimonials-grid">
          {[
            { quote: '\u201cI had a pile of wine corks for years. Within 10 minutes I had a blueprint for a bath mat \u2014 came out amazing.\u201d', initials: 'JL', name: 'Jess L.', badge: 'Textile Tech badge', location: 'Manila' },
            { quote: '\u201cThe scan feature is wild. Just pointed at my pile of stuff and it gave me 6 project ideas instantly. Already at 800 Eco-Points.\u201d', initials: 'MR', name: 'Marco R.', badge: 'Glass Guardian badge', location: 'Cebu' },
          ].map((t) => (
            <div className="home__testimonial-card" key={t.name}>
              <p className="home__testimonial-quote">{t.quote}</p>
              <div className="home__testimonial-author">
                <div className="home__testimonial-avatar">{t.initials}</div>
                <div className="home__testimonial-info">
                  <span className="home__testimonial-name">{t.name}</span>
                  <span className="home__testimonial-meta">{t.badge} &middot; {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home__cta">
        <h2 className="home__cta-title">Ready to start upcycling?</h2>
        <p className="home__cta-sub">
          Join thousands of crafters turning everyday trash into something beautiful.<br />
          Free to start. No credit card needed.
        </p>
        <button className="btn btn--cta">Get started free &#x2192;</button>
        <div className="home__cta-stats">
          <div className="home__cta-stat"><strong>12,400+</strong><span>Active crafters</span></div>
          <div className="home__cta-stat"><strong>3,800+</strong><span>Blueprints shared</span></div>
          <div className="home__cta-stat"><strong>98%</strong><span>Would recommend</span></div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home__footer">
        <div className="home__footer-top">
          <div className="home__footer-brand">
            <span className="home__footer-logo">ReCraft</span>
            <p>Turning everyday trash into<br />something beautiful since 2024.</p>
          </div>
          <div className="home__footer-col">
            <h4>Explore</h4>
            <a href="/gallery">Gallery</a>
            <a href="/blueprints">Blueprints</a>
            <a href="/scan">Scan Materials</a>
            <a href="/leaderboard">Leaderboard</a>
          </div>
          <div className="home__footer-col">
            <h4>Account</h4>
            <a href="/auth">Sign Up</a>
            <a href="/auth">Log In</a>
            <a href="/profile">My Profile</a>
            <a href="/profile">My Badges</a>
          </div>
          <div className="home__footer-col">
            <h4>Legal</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/moderation">AI Moderation</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
        <div className="home__footer-bottom">
          <span>&#169; 2024 ReCraft. All rights reserved.</span>
          <div className="home__footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
