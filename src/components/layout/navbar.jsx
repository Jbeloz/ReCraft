import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function NavLink({ to, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        fontSize: '0.88rem',
        fontWeight: 500,
        color: hovered ? '#2d6a4f' : '#6b7280',
        textDecoration: 'none',
        transition: 'color 0.15s',
        fontFamily: FONT,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

function DropdownItem({ to, onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        display: 'block',
        padding: '0.5rem 1rem',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: hovered ? '#2d6a4f' : '#374151',
        background: hovered ? '#f9fafb' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.12s',
        fontFamily: FONT,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [signinHovered, setSigninHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);
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
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8vw',
      height: '58px',
      background: '#fff',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      fontFamily: FONT,
    }}>

      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          color: '#2d6a4f',
          letterSpacing: '-0.02em',
          textDecoration: 'none',
          opacity: logoHovered ? 0.75 : 1,
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        ReCraft
      </Link>

      {/* Nav links */}
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '2rem' }}>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/blueprints">Blueprints</NavLink></li>
        <li>
          <a
            href="/#how-it-works"
            style={{ fontSize: '0.88rem', fontWeight: 500, color: '#6b7280', textDecoration: 'none', fontFamily: FONT }}
          >
            How it Works
          </a>
        </li>
      </ul>

      {/* Auth / Profile */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <div style={{ position: 'relative' }} ref={menuRef}>

            {/* Avatar */}
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: avatarHovered ? 0.85 : 1,
                transition: 'opacity 0.15s',
                fontFamily: FONT,
              }}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
            >
              {user.initials}
            </button>

            {/* Dropdown */}
            {open && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                minWidth: '200px',
                padding: '0.5rem 0',
                zIndex: 200,
                fontFamily: FONT,
              }}>
                <div style={{ padding: '0.5rem 1rem 0.1rem', fontSize: '0.88rem', fontWeight: 700, color: '#111827' }}>
                  {user.name}
                </div>
                <div style={{ padding: '0 1rem 0.6rem', fontSize: '0.75rem', color: '#9ca3af', borderBottom: '1px solid #f0f0f0', marginBottom: '0.4rem' }}>
                  {user.email}
                </div>
                <DropdownItem to="/profile"    onClick={() => setOpen(false)}>My Profile</DropdownItem>
                <DropdownItem to="/blueprints" onClick={() => setOpen(false)}>Blueprints</DropdownItem>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#dc2626',
                    background: logoutHovered ? '#fef2f2' : 'none',
                    border: 'none',
                    borderTop: '1px solid #f0f0f0',
                    marginTop: '0.4rem',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                    fontFamily: FONT,
                  }}
                  onMouseEnter={() => setLogoutHovered(true)}
                  onMouseLeave={() => setLogoutHovered(false)}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#fff',
              background: signinHovered ? '#235c42' : '#2d6a4f',
              padding: '0.4rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.15s',
              fontFamily: FONT,
            }}
            onMouseEnter={() => setSigninHovered(true)}
            onMouseLeave={() => setSigninHovered(false)}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

