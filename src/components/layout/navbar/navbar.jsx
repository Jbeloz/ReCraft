import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleLogout() {
    setOpen(false);
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">ReCraft</Link>
      <ul className="navbar__links">
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/blueprints">Blueprints</Link></li>
        <li><a href="/#how-it-works">How it Works</a></li>
      </ul>
      <div className="navbar__auth">
        {user ? (
          <div className="navbar__profile" ref={menuRef}>
            <button className="navbar__avatar" onClick={() => setOpen(o => !o)}>
              {user.initials}
            </button>
            {open && (
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-name">{user.name}</div>
                <div className="navbar__dropdown-email">{user.email}</div>
                <Link to="/profile" className="navbar__dropdown-item" onClick={() => setOpen(false)}>My Profile</Link>
                <Link to="/blueprints" className="navbar__dropdown-item" onClick={() => setOpen(false)}>Blueprints</Link>
                <button className="navbar__dropdown-logout" onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="navbar__signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

