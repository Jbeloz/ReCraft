import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';
import SectionHeader from '../components/common/SectionHeader';
import BlueprintCard from '../components/common/BlueprintCard';
import GalleryCard from '../components/common/GalleryCard';
import { ALL_PROJECTS } from './blueprints/blueprintsData';
import { POSTS } from './gallery';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";


const BTN_PRIMARY   = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.7rem 1.6rem', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', border: '2px solid #f4a261', background: '#f4a261', color: '#fff', textDecoration: 'none', fontFamily: FONT };
const BTN_GHOST     = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.7rem 1.6rem', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', border: '2px solid #2d6a4f', background: 'transparent', color: '#2d6a4f', textDecoration: 'none', fontFamily: FONT };
const BTN_SECONDARY = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.7rem 1.6rem', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', border: '2px solid #2d6a4f', background: '#2d6a4f', color: '#fff', fontFamily: FONT };
const BTN_CTA       = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem 2.2rem', borderRadius: '14px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', fontFamily: FONT };

const HERO = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', padding: '5rem 8vw 4.5rem', minHeight: 'calc(100vh - 58px)', background: 'linear-gradient(150deg, #e8f5e9 0%, #f0f9f4 65%)' };
const HERO_CONTENT = { flex: 1, maxWidth: '500px' };
const HERO_TAG = { display: 'inline-block', background: '#d8f3dc', color: '#2d6a4f', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.9rem', borderRadius: '999px', marginBottom: '1.3rem' };
const HERO_TITLE = { fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, color: '#1b1b1b', margin: '0 0 1.2rem' };
const HERO_SUB   = { fontSize: '0.98rem', lineHeight: 1.75, color: '#6b7280', margin: 0 };
const HERO_ACTIONS = { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.8rem' };

const HERO_VIS = { flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '420px' };
const VIS_GRID = { display: 'grid', gridTemplateColumns: '1fr 44px 1fr', gap: '10px', alignItems: 'center', width: '100%' };
const VIS_MAT  = { background: '#fff', borderRadius: '20px', padding: '1.2rem', boxShadow: '0 6px 24px rgba(0,0,0,0.10)' };
const VIS_LBL  = { fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' };
const VIS_ITEMS = { display: 'flex', gap: '0.5rem' };
const VIS_ITEM  = { width: '50px', height: '50px', background: '#f0f9f4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' };
const VIS_ARR  = { width: '36px', height: '36px', background: '#f4a261', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', fontWeight: 700, justifySelf: 'center', boxShadow: '0 2px 8px rgba(244,162,97,0.45)' };
const VIS_SCAN = { background: '#1a2e22', borderRadius: '20px', padding: '1.1rem 1.2rem', color: '#fff' };
const VIS_SCAN_BAR = { display: 'flex', gap: '5px', marginBottom: '0.65rem' };
const VIS_DOT_BASE = { width: '8px', height: '8px', borderRadius: '50%' };
const VIS_SCAN_TTL = { fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', margin: '0 0 0.65rem', fontWeight: 500 };
const VIS_LIST = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.38rem' };
const VIS_LI   = { fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 };
const VIS_CHK  = { color: '#52b788', marginRight: '0.35rem', fontWeight: 700 };
const VIS_ARR_V = { display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem', color: '#6b7280', padding: '2px 0' };
const VIS_CREAT = { background: '#1a2e22', borderRadius: '20px', padding: '1.1rem 1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' };
const VIS_LBL_LT = { fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 };

const INPUT_SEC  = { padding: '5rem 8vw', background: '#fff', textAlign: 'center' };
const INPUT_TTL  = { fontSize: '2rem', fontWeight: 800, color: '#2d6a4f', margin: '0 0 0.35rem' };
const INPUT_SUB  = { fontSize: '0.92rem', color: '#6b7280', margin: '0 0 2.5rem' };
const INPUT_OPTS = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap', maxWidth: '860px', margin: '0 auto' };
const INPUT_CARD = { flex: 1, minWidth: '280px', background: '#f0f9f4', borderRadius: '20px', padding: '2.2rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' };
const INPUT_ICON = { fontSize: '1.8rem', lineHeight: 1 };
const INPUT_H3   = { fontSize: '1rem', fontWeight: 700, margin: 0, color: '#1b1b1b' };
const INPUT_P    = { fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.6rem', textAlign: 'center' };
const INPUT_DIV  = { padding: '0 2rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: '#6b7280' };
const SEARCH_BAR = { display: 'flex', gap: '0.5rem', width: '100%', flexWrap: 'wrap' };
const SEARCH_INPUT = { flex: 1, minWidth: 0, padding: '0.6rem 1rem', border: '1.5px solid #d1d5db', borderRadius: '14px', fontSize: '0.88rem', outline: 'none', background: '#fff', color: '#1b1b1b', fontFamily: FONT };

const HOW = { padding: '5rem 8vw', background: '#fff' };
const STEPS_GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' };
const STEP_CARD  = { background: '#f0f9f4', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' };
const STEP_NUM   = { width: '30px', height: '30px', background: '#52b788', color: '#fff', borderRadius: '50%', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' };
const STEP_ICON  = { fontSize: '1.6rem', lineHeight: 1, marginBottom: '0.25rem' };
const STEP_H3    = { fontSize: '1rem', fontWeight: 700, margin: 0, color: '#1b1b1b' };
const STEP_P     = { fontSize: '0.86rem', lineHeight: 1.65, color: '#6b7280', margin: 0 };
const BADGE_ROW  = { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' };
const BADGE_CHIP = { background: '#d8f3dc', color: '#2d6a4f', fontSize: '0.7rem', fontWeight: 600, padding: '0.22rem 0.6rem', borderRadius: '999px' };

const FEAT  = { padding: '5rem 8vw', background: '#f0f9f4' };
const CARDS_GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' };

const GAL_SEC = { padding: '5rem 8vw', background: '#fff' };
const GAL_GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' };

const TEST_SEC   = { padding: '5rem 8vw', background: '#f0f9f4' };
const TEST_GRID  = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' };
const TEST_CARD  = { background: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '1.2rem' };
const TEST_QUOTE = { fontSize: '0.93rem', lineHeight: 1.72, color: '#1b1b1b', margin: 0 };
const TEST_AUTH  = { display: 'flex', alignItems: 'center', gap: '0.8rem' };
const TEST_AVAT  = { width: '40px', height: '40px', borderRadius: '50%', background: '#52b788', color: '#fff', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const TEST_INFO_ST  = { display: 'flex', flexDirection: 'column' };
const TEST_NAME  = { fontSize: '0.88rem', fontWeight: 700, color: '#1b1b1b' };
const TEST_META_ST  = { fontSize: '0.74rem', color: '#6b7280' };

const CTA_SEC   = { background: '#0d2818', padding: '5.5rem 8vw', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' };
const CTA_TTL   = { fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#fff', margin: 0 };
const CTA_SUB   = { fontSize: '0.94rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: 0, maxWidth: '440px' };
const CTA_STATS = { display: 'flex', gap: '3.5rem', marginTop: '1.8rem', flexWrap: 'wrap', justifyContent: 'center' };
const CTA_STAT  = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' };
const CTA_STRONG = { fontSize: '1.9rem', fontWeight: 800, color: '#fff' };
const CTA_SPAN  = { fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.07em' };

const FOOTER     = { background: '#0d2818', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '0 8vw' };
const FOOTER_TOP = { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2.5rem', padding: '3rem 0 2rem' };
const FOOTER_LOGO = { fontSize: '1.2rem', fontWeight: 800, color: '#52b788', display: 'block', marginBottom: '0.5rem' };
const FOOTER_BRAND_P = { fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 };
const FOOTER_COL = { display: 'flex', flexDirection: 'column', gap: '0.48rem' };
const FOOTER_H4  = { fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.35rem' };
const FOOTER_A   = { fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' };
const FOOTER_BOT = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 0', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '0.76rem', color: 'rgba(255,255,255,0.3)' };
const FOOTER_LINKS_ROW = { display: 'flex', gap: '1.2rem' };
const FOOTER_LINK_SM   = { color: 'rgba(255,255,255,0.3)', fontSize: '0.76rem', textDecoration: 'none' };

const TESTIMONIALS = [
  { quote: '"I had a pile of wine corks for years. Within 10 minutes I had a blueprint for a bath mat — came out amazing."', initials: 'JL', name: 'Jess L.', badge: 'Textile Tech badge', location: 'Manila' },
  { quote: '"The scan feature is wild. Just pointed at my pile of stuff and it gave me 6 project ideas instantly. Already at 800 Eco-Points."', initials: 'MR', name: 'Marco R.', badge: 'Glass Guardian badge', location: 'Cebu' },
];

function Home() {
  return (
    <PageShell style={{ background: '#f0f9f4', color: '#1b1b1b' }}>

      {/* Hero */}
      <section style={HERO}>
        <div style={HERO_CONTENT}>
          <span style={HERO_TAG}>DIY Alchemy &amp; Blueprint Hub</span>
          <h1 style={HERO_TITLE}>Turn Trash<br />Into Treasure</h1>
          <p style={HERO_SUB}>
            Scan or type in your materials and get AI-curated,<br />
            step-by-step upcycling blueprints — tailored to<br />
            exactly what you have at home.
          </p>
          <div style={HERO_ACTIONS}>
            <Link to="/scan" style={BTN_PRIMARY}>Start Recrafting!</Link>
            <Link to="/blueprints" style={BTN_GHOST}>Browse Blueprints</Link>
          </div>
        </div>

        <div style={HERO_VIS}>
          <div style={VIS_GRID}>
            <div style={VIS_MAT}>
              <p style={VIS_LBL}>Your materials</p>
              <div style={VIS_ITEMS}>
                <span style={VIS_ITEM}>👕</span>
                <span style={VIS_ITEM}>🫙</span>
                <span style={VIS_ITEM}>📦</span>
              </div>
            </div>
            <div style={VIS_ARR}>→</div>
            <div style={VIS_SCAN}>
              <div style={VIS_SCAN_BAR}>
                <span style={{ ...VIS_DOT_BASE, background: '#ff5f57' }} />
                <span style={{ ...VIS_DOT_BASE, background: '#febc2e' }} />
                <span style={{ ...VIS_DOT_BASE, background: '#28c840' }} />
              </div>
              <p style={VIS_SCAN_TTL}>AI Scanning...</p>
              <ul style={VIS_LIST}>
                <li style={VIS_LI}><span style={VIS_CHK}>✓</span>Denim jeans</li>
                <li style={VIS_LI}><span style={VIS_CHK}>✓</span>Glass jar</li>
                <li style={VIS_LI}><span style={VIS_CHK}>✓</span>Cardboard</li>
              </ul>
            </div>
            <div /><div />
            <div style={VIS_ARR_V}>↓</div>
            <div /><div />
            <div style={VIS_CREAT}>
              <p style={VIS_LBL_LT}>Your creation</p>
              <span style={{ fontSize: '2rem' }}>👜</span>
            </div>
          </div>
        </div>
      </section>

      {/* What do you have? */}
      <section style={INPUT_SEC}>
        <h2 style={INPUT_TTL}>What do you have?</h2>
        <p style={INPUT_SUB}>Add your materials and we'll find the perfect project for you.</p>
        <div style={INPUT_OPTS}>
          <div style={INPUT_CARD}>
            <span style={INPUT_ICON}>✏️</span>
            <h3 style={INPUT_H3}>Type it in</h3>
            <p style={INPUT_P}>Manually enter materials like "old jeans" or "glass jar"</p>
            <div style={SEARCH_BAR}>
              <input style={SEARCH_INPUT} type="text" placeholder="e.g. Old denim jeans, glass jar..." />
              <button style={BTN_PRIMARY}>Find Projects</button>
            </div>
          </div>
          <div style={INPUT_DIV}>OR</div>
          <div style={INPUT_CARD}>
            <span style={INPUT_ICON}>📷</span>
            <h3 style={INPUT_H3}>Scan an image</h3>
            <p style={INPUT_P}>Take a photo of your materials and let AI identify them for you</p>
            <button style={BTN_SECONDARY}>Open Scanner</button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={HOW} id="how-it-works">
        <SectionHeader label="How It Works" title="3 steps to your next creation" subtitle="No experience needed — just the stuff in your house" />
        <div style={STEPS_GRID}>
          <div style={STEP_CARD}>
            <span style={STEP_NUM}>1</span>
            <span style={STEP_ICON}>📷</span>
            <h3 style={STEP_H3}>Scan your materials</h3>
            <p style={STEP_P}>Point your camera or type what you have. Our AI instantly identifies each item and its upcycling potential.</p>
          </div>
          <div style={STEP_CARD}>
            <span style={STEP_NUM}>2</span>
            <span style={STEP_ICON}>📋</span>
            <h3 style={STEP_H3}>Follow AI blueprints</h3>
            <p style={STEP_P}>Get step-by-step guides matched to exactly what you have. No store runs, no extra tools required.</p>
          </div>
          <div style={STEP_CARD}>
            <span style={STEP_NUM}>3</span>
            <span style={STEP_ICON}>🏆</span>
            <h3 style={STEP_H3}>Earn badges &amp; Eco-Points</h3>
            <p style={STEP_P}>Every completed project earns you points and unlocks collector badges.</p>
            <div style={BADGE_ROW}>
              <span style={BADGE_CHIP}>Textile Tech</span>
              <span style={BADGE_CHIP}>Glass Guardian</span>
              <span style={BADGE_CHIP}>Wood Wizard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blueprints */}
      <section style={FEAT}>
        <SectionHeader label="Featured Blueprints" title="Trending this week" subtitle="Community favorites from recycled materials" />
        <div style={CARDS_GRID}>
          {ALL_PROJECTS.slice(0, 3).map(p => <BlueprintCard key={p.id} {...p} />)}
        </div>
      </section>

      {/* Community Gallery */}
      <section style={GAL_SEC}>
        <SectionHeader label="Community Gallery" title="Recent upcycles from the community" subtitle="Real people, real trash turned into real treasure" />
        <div style={GAL_GRID}>
          {POSTS.slice(0, 4).map(post => <GalleryCard key={post.id} post={post} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section style={TEST_SEC}>
        <SectionHeader label="Community Love" title="What crafters are saying" />
        <div style={TEST_GRID}>
          {TESTIMONIALS.map(t => (
            <div style={TEST_CARD} key={t.name}>
              <p style={TEST_QUOTE}>{t.quote}</p>
              <div style={TEST_AUTH}>
                <div style={TEST_AVAT}>{t.initials}</div>
                <div style={TEST_INFO_ST}>
                  <span style={TEST_NAME}>{t.name}</span>
                  <span style={TEST_META_ST}>{t.badge} · {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={CTA_SEC}>
        <h2 style={CTA_TTL}>Ready to start upcycling?</h2>
        <p style={CTA_SUB}>
          Join thousands of crafters turning everyday trash into something beautiful.<br />
          Free to start. No credit card needed.
        </p>
        <button style={BTN_CTA}>Get started free →</button>
        <div style={CTA_STATS}>
          <div style={CTA_STAT}><strong style={CTA_STRONG}>12,400+</strong><span style={CTA_SPAN}>Active crafters</span></div>
          <div style={CTA_STAT}><strong style={CTA_STRONG}>3,800+</strong><span style={CTA_SPAN}>Blueprints shared</span></div>
          <div style={CTA_STAT}><strong style={CTA_STRONG}>98%</strong><span style={CTA_SPAN}>Would recommend</span></div>
        </div>
      </section>

      {/* Footer */}
      <footer style={FOOTER}>
        <div style={FOOTER_TOP}>
          <div>
            <span style={FOOTER_LOGO}>ReCraft</span>
            <p style={FOOTER_BRAND_P}>Turning everyday trash into<br />something beautiful since 2024.</p>
          </div>
          <div style={FOOTER_COL}>
            <h4 style={FOOTER_H4}>Explore</h4>
            <a href="/gallery" style={FOOTER_A}>Gallery</a>
            <a href="/blueprints" style={FOOTER_A}>Blueprints</a>
            <a href="/scan" style={FOOTER_A}>Scan Materials</a>
            <a href="/leaderboard" style={FOOTER_A}>Leaderboard</a>
          </div>
          <div style={FOOTER_COL}>
            <h4 style={FOOTER_H4}>Account</h4>
            <a href="/auth" style={FOOTER_A}>Sign Up</a>
            <a href="/auth" style={FOOTER_A}>Log In</a>
            <a href="/profile" style={FOOTER_A}>My Profile</a>
            <a href="/profile" style={FOOTER_A}>My Badges</a>
          </div>
          <div style={FOOTER_COL}>
            <h4 style={FOOTER_H4}>Legal</h4>
            <a href="/privacy" style={FOOTER_A}>Privacy Policy</a>
            <a href="/terms" style={FOOTER_A}>Terms of Service</a>
            <a href="/moderation" style={FOOTER_A}>AI Moderation</a>
            <a href="/contact" style={FOOTER_A}>Contact Us</a>
          </div>
        </div>
        <div style={FOOTER_BOT}>
          <span>© 2024 ReCraft. All rights reserved.</span>
          <div style={FOOTER_LINKS_ROW}>
            <a href="/privacy" style={FOOTER_LINK_SM}>Privacy</a>
            <a href="/terms" style={FOOTER_LINK_SM}>Terms</a>
            <a href="/cookies" style={FOOTER_LINK_SM}>Cookies</a>
          </div>
        </div>
      </footer>

    </PageShell>
  );
}

export default Home;
