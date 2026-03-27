import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageShell from '../components/layout/PageShell';
import Button from '../components/common/button';
import Input from '../components/common/input';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const WRAP = { minHeight: 'calc(100vh - 58px)', display: 'flex', fontFamily: FONT };

const CARD = {
  width: '480px', minWidth: '320px', padding: '3rem 3.5rem',
  display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff',
};

const LOGO = {
  fontSize: '1.5rem', fontWeight: 900, color: '#2d6a4f',
  textDecoration: 'none', letterSpacing: '-0.02em', marginBottom: '0.25rem',
};

const TAGLINE = { fontSize: '0.82rem', color: '#9ca3af', margin: '0 0 2rem' };

const TABS_ROW = { display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '1.8rem' };

const TAB_BASE = {
  flex: 1, padding: '0.65rem 0', background: 'none', border: 'none',
  fontSize: '0.9rem', fontWeight: 600, color: '#9ca3af', cursor: 'pointer',
  borderBottom: '2px solid transparent', marginBottom: '-2px', fontFamily: FONT,
};

const TAB_ACTIVE = { color: '#2d6a4f', borderBottomColor: '#2d6a4f' };

const FORM = { display: 'flex', flexDirection: 'column', gap: '1.1rem' };

const FORGOT_WRAP = { textAlign: 'right', marginTop: '-0.5rem' };

const FORGOT_LINK = { fontSize: '0.78rem', color: '#6b7280', textDecoration: 'none' };

const DIVIDER_WRAP = {
  display: 'flex', alignItems: 'center', gap: '0.75rem',
  margin: '1.4rem 0 1rem', color: '#9ca3af', fontSize: '0.78rem',
};

const DIVIDER_LINE = { flex: 1, height: '1px', background: '#e5e7eb' };

const SWITCH_P = { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: '#6b7280' };

const SWITCH_BTN = {
  background: 'none', border: 'none', color: '#2d6a4f', fontWeight: 700,
  cursor: 'pointer', fontSize: '0.82rem', padding: 0, fontFamily: FONT,
};

const PANEL = {
  flex: 1,
  background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #52b788 100%)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem',
};

const PANEL_CONTENT = { color: '#fff', maxWidth: '360px' };

const PANEL_EMOJI = { fontSize: '3rem', display: 'block', marginBottom: '1.2rem' };

const PANEL_H2 = { fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.25, margin: '0 0 1.5rem' };

const PANEL_UL = {
  listStyle: 'none', padding: 0, margin: 0,
  display: 'flex', flexDirection: 'column', gap: '0.85rem',
};

const PANEL_LI = { fontSize: '0.95rem', opacity: 0.9 };

function Auth() {
  const [tab, setTab] = useState('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const name = tab === 'signup' ? form.name || 'Maker' : form.email.split('@')[0];
    login({ name, email: form.email });
    navigate('/');
  }

  return (
    <PageShell style={{ background: '#fff' }}>
      <div style={WRAP}>
        <div style={CARD}>
        <Link to="/" style={LOGO}>ReCraft</Link>
        <p style={TAGLINE}>Turn waste into wonders</p>

        <div style={TABS_ROW}>
          <button
            style={{ ...TAB_BASE, ...(tab === 'signin' ? TAB_ACTIVE : {}) }}
            onClick={() => setTab('signin')}
          >Sign In</button>
          <button
            style={{ ...TAB_BASE, ...(tab === 'signup' ? TAB_ACTIVE : {}) }}
            onClick={() => setTab('signup')}
          >Sign Up</button>
        </div>

        <form style={FORM} onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Jess Lopez"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />

          {tab === 'signup' && (
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
              required
            />
          )}

          {tab === 'signin' && (
            <div style={FORGOT_WRAP}>
              <a href="#!" style={FORGOT_LINK}>Forgot password?</a>
            </div>
          )}

          <Button type="submit" full>
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div style={DIVIDER_WRAP}>
          <div style={DIVIDER_LINE} />
          <span>or continue with</span>
          <div style={DIVIDER_LINE} />
        </div>

        <Button variant="outline" full>
          <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
            <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.3z"/>
            <path fill="#34A853" d="M24 48c6.5 0 12-2.2 16-5.8l-7.9-6c-2.2 1.5-5 2.3-8.1 2.3-6.2 0-11.5-4.2-13.4-9.9H2.5v6.2C6.5 42.5 14.7 48 24 48z"/>
            <path fill="#FBBC05" d="M10.6 28.6A14.8 14.8 0 0 1 10 24c0-1.6.3-3.1.6-4.6v-6.2H2.5A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.1-6.2z"/>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.2 30.4 0 24 0 14.7 0 6.5 5.5 2.5 13.2l8.1 6.2C12.5 13.7 17.8 9.5 24 9.5z"/>
          </svg>
          Continue with Google
        </Button>

        <p style={SWITCH_P}>
          {tab === 'signin'
            ? <><span>New to ReCraft? </span><button type="button" style={SWITCH_BTN} onClick={() => setTab('signup')}>Create an account</button></>
            : <><span>Already have an account? </span><button type="button" style={SWITCH_BTN} onClick={() => setTab('signin')}>Sign in</button></>
          }
        </p>
      </div>

        <div style={PANEL}>
          <div style={PANEL_CONTENT}>
            <span style={PANEL_EMOJI}>♻️</span>
            <h2 style={PANEL_H2}>Join 12,000+ crafters turning trash into treasure.</h2>
            <ul style={PANEL_UL}>
              <li style={PANEL_LI}>📦 Scan materials and get instant blueprints</li>
              <li style={PANEL_LI}>🏆 Earn Eco-Points for every build</li>
              <li style={PANEL_LI}>🖼 Share your creations in the gallery</li>
              <li style={PANEL_LI}>⭐ Unlock badges as you level up</li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default Auth;
