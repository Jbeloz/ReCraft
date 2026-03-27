import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/button/button';
import Input from '../../components/common/input/input';

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
    <div className="auth">
      <div className="auth__card">
        <Link to="/" className="auth__logo">ReCraft</Link>
        <p className="auth__tagline">Turn waste into wonders</p>

        <div className="auth__tabs">
          <button
            className={`auth__tab${tab === 'signin' ? ' auth__tab--active' : ''}`}
            onClick={() => setTab('signin')}
          >Sign In</button>
          <button
            className={`auth__tab${tab === 'signup' ? ' auth__tab--active' : ''}`}
            onClick={() => setTab('signup')}
          >Sign Up</button>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
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
            <div className="auth__forgot"><a href="#!">Forgot password?</a></div>
          )}

          <Button type="submit" full>
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="auth__divider"><span>or continue with</span></div>

        <Button variant="outline" full className="auth__google">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.3z"/><path fill="#34A853" d="M24 48c6.5 0 12-2.2 16-5.8l-7.9-6c-2.2 1.5-5 2.3-8.1 2.3-6.2 0-11.5-4.2-13.4-9.9H2.5v6.2C6.5 42.5 14.7 48 24 48z"/><path fill="#FBBC05" d="M10.6 28.6A14.8 14.8 0 0 1 10 24c0-1.6.3-3.1.6-4.6v-6.2H2.5A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.1-6.2z"/><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.2 30.4 0 24 0 14.7 0 6.5 5.5 2.5 13.2l8.1 6.2C12.5 13.7 17.8 9.5 24 9.5z"/></svg>
          Continue with Google
        </Button>

        <p className="auth__switch">
          {tab === 'signin'
            ? <><span>New to ReCraft? </span><button type="button" onClick={() => setTab('signup')}>Create an account</button></>
            : <><span>Already have an account? </span><button type="button" onClick={() => setTab('signin')}>Sign in</button></>
          }
        </p>
      </div>

      <div className="auth__panel">
        <div className="auth__panel-content">
          <span className="auth__panel-emoji">♻️</span>
          <h2>Join 12,000+ crafters turning trash into treasure.</h2>
          <ul>
            <li>📦 Scan materials and get instant blueprints</li>
            <li>🏆 Earn Eco-Points for every build</li>
            <li>🖼 Share your creations in the gallery</li>
            <li>⭐ Unlock badges as you level up</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Auth;
