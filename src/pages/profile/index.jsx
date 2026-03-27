import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import Navbar from '../../components/layout/navbar/navbar';
import { useAuth } from '../../context/AuthContext';
import { ALL_PROJECTS } from '../blueprints/blueprintsData';
import { POSTS } from '../gallery/index';
import Button from '../../components/common/button/button';

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

  if (!user) {
    return (
      <div className="profile">
        <Navbar />
        <div className="profile__empty">
          <span>🔒</span>
          <p>You need to be signed in to view your profile.</p>
          <Link to="/auth" className="profile__signin-btn">Sign In</Link>
        </div>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const level = Math.max(1, Math.floor(user.ecoPoints / 100) + 1);
  const progress = (user.ecoPoints % 100);

  return (
    <div className="profile">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="profile__breadcrumb">
        <Link to="/">Home</Link>
        <span>&#x203A;</span>
        <span>Profile</span>
      </nav>

      {/* Hero */}
      <div className="profile__hero">
        <div className="profile__avatar">{user.initials}</div>
        <div className="profile__hero-info">
          <h1 className="profile__name">{user.name}</h1>
          <p className="profile__email">{user.email}</p>
          <div className="profile__level-badge">Level {level} Crafter</div>
        </div>
        <Button variant="ghost" className="profile__logout" onClick={handleLogout}>
          &#x2192; Sign Out
        </Button>
      </div>

      {/* Stats row */}
      <div className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-val">{user.ecoPoints}</span>
          <span className="profile__stat-label">Eco-Points</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-val">0</span>
          <span className="profile__stat-label">Builds</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-val">0</span>
          <span className="profile__stat-label">Gallery Posts</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-val">{level}</span>
          <span className="profile__stat-label">Level</span>
        </div>
      </div>

      {/* XP bar */}
      <div className="profile__xp-wrap">
        <span className="profile__xp-label">Progress to Level {level + 1}</span>
        <div className="profile__xp-bar">
          <div className="profile__xp-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="profile__xp-pts">{user.ecoPoints} / {level * 100} pts</span>
      </div>

      {/* Badges */}
      <section className="profile__section">
        <h2 className="profile__section-title">Badges</h2>
        <div className="profile__badges">
          {BADGES.map(b => (
            <div key={b.label} className={`profile__badge${b.earned ? '' : ' profile__badge--locked'}`}>
              <span className="profile__badge-icon">{b.icon}</span>
              <span className="profile__badge-label">{b.label}</span>
              {!b.earned && <span className="profile__badge-lock">🔒</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Saved blueprints */}
      <section className="profile__section">
        <h2 className="profile__section-title">My Builds</h2>
        <div className="profile__cards">
          {POSTS.slice(0, 3).map(post => {
            const project = ALL_PROJECTS.find(p => p.title === post.blueprint);
            return (
              <Link key={post.id} to={`/gallery/${post.id}`} className="profile__card">
                <img src={post.afterImg} alt={post.blueprint} className="profile__card-img" />
                <div className="profile__card-body">
                  <span className="profile__card-tag">{post.category}</span>
                  <h3 className="profile__card-title">{post.blueprint}</h3>
                  <div className="profile__card-meta">
                    <span className="profile__card-diff">&#x2665; {post.likes}</span>
                    <span className="profile__card-pts">+{post.ecoPoints} pts</span>
                    {post.verified && <span className="profile__card-verified">&#x2713; Verified</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/gallery" className="profile__see-all">See all in Community Gallery &#x2192;</Link>
      </section>

    </div>
  );
}

export default Profile;
