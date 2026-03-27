# ReCraft — System Architecture

> **DIY Alchemy & Blueprint Hub**  
> A React-based upcycling platform that turns household waste into creative projects through AI-assisted blueprints, gamification, and a community gallery.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack](#2-tech-stack)
3. [Page & Route Map](#3-page--route-map)
4. [User Flow](#4-user-flow)
5. [Feature Breakdown](#5-feature-breakdown)
6. [Gamification System](#6-gamification-system)
7. [Content Moderation](#7-content-moderation)
8. [File Structure](#8-file-structure)
9. [Inline Styling Reference](#9-inline-styling-reference)
10. [Migration Roadmap — Inline Styles & Dynamic Components](#10-migration-roadmap--inline-styles--dynamic-components)

---

## 1. System Overview

ReCraft empowers users to reduce household waste by transforming everyday materials into creative upcycled projects. Users either scan an image of their materials or type them in manually. The platform returns AI-curated, step-by-step blueprints with a gamified reward system and a community gallery for sharing finished builds.

**Core capabilities:**

| Capability | Description |
|---|---|
| Material input | Scan an image or type materials manually |
| Blueprint generation | AI-curated step-by-step upcycling guides |
| Filtering | Browse by material type, difficulty, and category |
| Gamification | Earn Eco-Points and unlock badges per build |
| Community gallery | Share before/after photos with the community |
| User accounts | Sign in/up, profile page, progress tracking |

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 (Create React App) |
| Routing | React Router DOM v6 |
| Styling | Plain CSS (BEM naming, CSS custom properties) |
| State management | React useState + Context API (AuthContext) |
| Persistence | localStorage (auth session) |
| Data layer | Centralized blueprintsData.js (static, frontend) |
| Backend (planned) | Python / FastAPI |
| AI layer (planned) | Image recognition + material tagging model |

---

## 3. Page & Route Map

| Route | Component | Description |
|---|---|---|
| `/` | `pages/home` | Landing page — hero, featured blueprints, gallery, testimonials |
| `/blueprints` | `pages/blueprints` | Blueprint listing — search, filters, sortable cards |
| `/blueprint/:id` | `pages/blueprint` | Detail page — steps, materials, progress tracker, submit |
| `/scan` | `pages/scan` | Material input — image scan panel or manual text entry |
| `/gallery` | `pages/gallery` | Community gallery — before/after posts, likes, eco-points |
| `/auth` | `pages/auth` | Sign In / Sign Up (tabs) |
| `/profile` | `pages/profile` | User profile — badges, XP bar, saved blueprints |

---

## 4. User Flow

```
Landing (Home)
    |
    |-- Browse Blueprints --> Blueprint Listing --> Blueprint Detail
    |                                                      |
    |                                              Mark steps done
    |                                              (progress bar updates)
    |                                                      |
    |                                              Submit to Gallery --> Gallery
    |
    |-- Scan Materials --> Scan Page --> Blueprint Listing
    |        (image or text input)
    |
    `-- Sign In / Sign Up --> Auth Page --> Profile
```

---

## 5. Feature Breakdown

### 5.1 Material Input

Two entry points for users to describe their materials:

- **Option A — Image Scan:** User uploads or photographs their waste materials. AI Vision identifies items (e.g., "Glossy Paper", "Adhesive") and assigns material tags.
- **Option B — Manual Text Entry:** User types items like "Old Denim Jeans" or "Glass Jar". As they type, the AI suggests tags to classify material properties (e.g., Denim -> Textile/Fabric).

### 5.2 Blueprint Listing

- Grid of recipe cards, each showing title, difficulty, estimated time, and number of builds
- Sidebar filters: category (Home Decor, Gardening, etc.) and difficulty
- Sort by: most popular, newest, easiest
- Each card links to the Blueprint Detail page

### 5.3 Blueprint Detail

- Full materials list with quantities and icons
- Step-by-step guide — each step is clickable to mark as done
- Live progress bar and step counter in the sidebar
- Eco-Points awarded on completion
- "Submit to Gallery" section with before/after photo upload

### 5.4 Community Gallery

- Grid of user-submitted before/after posts
- Each post shows: images, username, project name, eco-points earned, likes
- Report button on every post (feeds into moderation system)
- Filter tabs: All, Most Liked, Newest, Most Points

---

## 6. Gamification System

| Element | How it works |
|---|---|
| **Eco-Points** | Awarded per blueprint completion, based on material type and project complexity |
| **Levels** | Every 100 Eco-Points = 1 level up |
| **Badges** | Unlocked by completing projects in specific categories (e.g., "Textile Tech", "Glass Guardian", "Green Thumb") |
| **Verification boost** | Posts that reach a community like threshold are "Verified" — granting bonus XP to the creator |
| **Profile display** | Level, Eco-Points total, XP progress bar, and badge grid shown on /profile |

---

## 7. Content Moderation

To maintain gallery quality and prevent spam:

1. **Auth gate** — Users must be signed in to post to the gallery or upload images.
2. **AI content filter** — Before a post goes public, an automated layer scans the image.
   - Pass: post goes live in the Community Gallery
   - Fail: user sees "Image does not appear to be a craft. Please try again!"
3. **Community reporting** — Every gallery post has a Report button. Flagged posts are reviewed.
4. **Shadow ban** — Accounts with consistently flagged or rejected posts are limited in gallery posting until cleared.

---

## 8. File Structure

```
src/
+-- App.js                          # Router + AuthProvider wrapper
+-- context/
|   `-- AuthContext.jsx             # useAuth hook, login/logout, localStorage
+-- components/
|   `-- layout/
|       `-- navbar/
|           +-- navbar.jsx          # Shared sticky navbar (auth-aware)
|           `-- navbar.css
+-- pages/
|   +-- home/                       # Landing page
|   +-- blueprints/                 # Blueprint listing + blueprintsData.js
|   +-- blueprint/                  # Blueprint detail + step tracker
|   +-- scan/                       # Material scan / manual input
|   +-- gallery/                    # Community gallery
|   +-- auth/                       # Sign In / Sign Up
|   `-- profile/                    # User profile, badges, XP
`-- utils/
    `-- formatDate.ts
```

> Single source of truth for blueprint data: `src/pages/blueprints/blueprintsData.js`
> All pages (Home, Blueprints listing, Blueprint detail, Profile) import from this one file.

---

## 9. Inline Styling Reference

> **Topic 3–4 · ReCraft Project Reference**  
> React Inline Styling, ES6 Modules & Props — Complete Reference Guide

---

### 9.1 What Is Inline Styling?

Inline styling in React uses **JavaScript objects** instead of CSS strings. This lets you write actual JavaScript logic directly inside your styles — including conditions, variables, and functions.

**Key difference from HTML:**

```
HTML inline:   style="color: red; font-size: 24px"
React inline:  style={{ color: "red", fontSize: "24px" }}
```

React uses an object `({})` not a string. Properties are **camelCase**, not kebab-case.

**Basic Syntax — Two ways:**

```jsx
// 1. Direct inline object
const element = <h1 style={{ color: "red", fontSize: "24px" }}>Hello!</h1>;

// 2. Style object variable (recommended)
function StyledHeader() {
  const headerStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
  };
  return <h1 style={headerStyle}>This is a styled header!</h1>;
}
```

**camelCase Rule:**

| CSS (kebab-case) | React (camelCase) |
|---|---|
| `font-size` | `fontSize` |
| `background-color` | `backgroundColor` |
| `border-radius` | `borderRadius` |
| `text-align` | `textAlign` |
| `padding-top` | `paddingTop` |
| `margin-left` | `marginLeft` |
| `box-shadow` | `boxShadow` |
| `z-index` | `zIndex` |

**Advantages vs Disadvantages:**

| Advantages | Disadvantages |
|---|---|
| Scoped — applies only to that element | Hard to maintain in large projects |
| Dynamic styles using JS logic (ternary, state) | No support for `:hover`, `:focus` pseudo-classes |
| Quick for small/one-off components | No media queries support natively |
| No class name conflicts | Cannot use CSS preprocessors like SASS/SCSS |
| Co-located with component logic | No CSS transitions/animations (limited) |

---

### 9.2 Dynamic Inline Styling with JavaScript

**Using Ternary Operators:**

```jsx
const isError = true;
const styles = {
  color: isError ? "red" : "green",  // changes based on isError
  fontSize: "20px",
};
const element = <h1 style={styles}>Dynamic Styling</h1>;
```

**State-Driven Styles — Toggle Button:**

```jsx
import React, { useState } from 'react';

function ToggleButton() {
  const [isActive, setIsActive] = useState(false);

  const buttonStyle = {
    backgroundColor: isActive ? "purple" : "gray",
    padding: "10px 15px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <button style={buttonStyle} onClick={() => setIsActive(!isActive)}>
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
```

**ReCraft Example — Active Nav Link:**

```jsx
function Navbar() {
  const [activePage, setActivePage] = useState("home");

  const linkStyle = (page) => ({
    fontSize: '13px',
    fontWeight: activePage === page ? '700' : '500',
    color: activePage === page ? '#0F6E56' : '#444',
    borderBottom: activePage === page ? '2px solid #0F6E56' : 'none',
    paddingBottom: '4px',
    cursor: 'pointer',
  });

  return (
    <nav style={{ display: 'flex', gap: '28px' }}>
      <span style={linkStyle('home')} onClick={() => setActivePage('home')}>Home</span>
      <span style={linkStyle('gallery')} onClick={() => setActivePage('gallery')}>Gallery</span>
      <span style={linkStyle('blueprints')} onClick={() => setActivePage('blueprints')}>Blueprints</span>
    </nav>
  );
}
```

**Pattern Summary — Dynamic Styles:**

1. Define a style object using `const` inside the component.
2. Use ternary (`condition ? valueA : valueB`) for conditional styles.
3. Reference state or props variables directly inside the object.
4. For multiple dynamic styles, use a style-generating function `(page) => ({...})`.

---

### 9.3 Reusable Styled Components with Props

Props let a parent component control a child component's appearance. This is the foundation of a component library.

**Generic Button Component:**

```jsx
import React from 'react';

function Button({ color = 'blue', text = 'Click Me' }) {
  const buttonStyle = {
    backgroundColor: color,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    margin: '5px',
  };
  return <button style={buttonStyle}>{text}</button>;
}

export default Button;

// Usage — parent controls color and text
const App = () => (
  <div>
    <Button color="blue" text="Click Me" />
    <Button color="green" text="Submit" />
    <Button color="#F5A23C" text="Start Recrafting!" />
  </div>
);
```

**ReCraft Button Component (inline-style variant):**

```jsx
// src/components/common/Button/Button.jsx
import React from 'react';
import './Button.css'; // keep for base reset only

function Button({ variant = 'primary', text = 'Click', onClick }) {
  const base = {
    padding: '11px 22px',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
  };

  const variants = {
    primary: { ...base, backgroundColor: '#F5A23C', color: '#fff', border: 'none' },
    outline: { ...base, backgroundColor: 'transparent', color: '#1a1a1a', border: '2px solid #1a1a1a' },
    ghost:   { ...base, backgroundColor: 'transparent', color: '#0F6E56', border: 'none' },
  };

  return (
    <button style={variants[variant]} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

// Usage
// <Button variant="primary" text="Start Recrafting!" />
// <Button variant="outline" text="Browse Blueprints" />
// <Button variant="ghost" text="Learn More" />
```

**Passing a Full Style Object as Props:**

```jsx
function Card({ backgroundColor, children }) {
  const cardStyle = {
    backgroundColor,
    padding: '20px',
    borderRadius: '10px',
    border: '0.5px solid #d4ede1',
  };
  return <div style={cardStyle}>{children}</div>;
}

function CustomBox({ customStyle, children }) {
  return <div style={customStyle}>{children}</div>;
}

const boxStyles = {
  border: '1px solid #0F6E56',
  padding: '20px',
  borderRadius: '12px',
  backgroundColor: '#E1F5EE',
};

// <CustomBox customStyle={boxStyles}><h2>Full styles via props!</h2></CustomBox>
```

**AlertBox Component — Type-Based Styles:**

```jsx
function AlertBox({ type = 'success', message }) {
  const colors = {
    success: { backgroundColor: '#E1F5EE', color: '#085041', border: '1px solid #9FE1CB' },
    error:   { backgroundColor: '#FFEBEE', color: '#B71C1C', border: '1px solid #FFCDD2' },
    warning: { backgroundColor: '#FFF8E1', color: '#7A4F00', border: '1px solid #FFE082' },
  };

  const alertStyle = {
    ...colors[type],
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  };

  return <div style={alertStyle}>{message}</div>;
}

// <AlertBox type="success" message="Blueprint saved successfully!" />
// <AlertBox type="error" message="Upload failed. Try again." />
// <AlertBox type="warning" message="Low resolution image detected." />
```

---

### 9.4 JavaScript ES6 Modules (Import & Export)

**Why Modules?** Traditional JS kept everything in one file — hard to maintain. Modules let you split code into small, focused files.

**Named Exports** — export multiple things; import with `{ }`:

```js
// src/utils/styleHelpers.js
export const addBorder = (style) => ({ ...style, border: '1px solid #d4ede1', borderRadius: '8px' });
export const addShadow = (style) => ({ ...style, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' });
export const addHoverBase = (style) => ({ ...style, transition: 'all 0.2s ease', cursor: 'pointer' });

// Importing
import { addBorder, addShadow } from '../utils/styleHelpers';
const cardStyle = addShadow(addBorder({ backgroundColor: '#fff', padding: '20px' }));
```

**Default Exports** — one main thing per file; import without `{ }`:

```js
// src/components/common/Button/Button.jsx
function Button({ variant, text }) { ... }
export default Button;

// Importing — any name works
import Button from '../components/common/Button/Button';
import Btn from '../components/common/Button/Button';
```

**Named vs Default — Summary:**

| | Named Export | Default Export |
|---|---|---|
| Syntax to export | `export const X = ...` | `export default X` |
| Syntax to import | `import { X } from '...'` | `import X from '...'` |
| How many per file | Many | Only one |
| Import name | Must match exactly | Any name you choose |
| Best used for | Utilities, multiple components | Main component of a file |

**ReCraft Module Structure Example:**

```js
// src/types/index.js
export const VARIANTS = ['primary', 'outline', 'ghost'];
export const BADGE_TYPES = ['success', 'error', 'warning'];

// src/constants/index.js
export const API_BASE = '/api';
export const USE_MOCK = true;

// src/api/users.js
import { API_BASE, USE_MOCK } from '../constants';
const getUsers = async () => { ... };
export default getUsers;

// src/pages/home/index.jsx
import Button from '../../components/common/Button/Button';
import { USE_MOCK } from '../../constants';
import getUsers from '../../api/users';
```

---

### 9.5 React Props: Passing Data Into Components

**What Are Props?** Props (short for 'properties') are arguments passed into React components. They flow one way: **parent → child**.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
<Welcome name="Alice" />
```

**Destructuring Props (Recommended):**

```jsx
// Without destructuring
function Button(props) {
  return <button style={{ backgroundColor: props.color }}>{props.text}</button>;
}

// With destructuring (cleaner)
function Button({ color = 'blue', text = 'Click Me' }) {
  return <button style={{ backgroundColor: color }}>{text}</button>;
}
```

**PropTypes — Type Validation:**

```jsx
import PropTypes from 'prop-types';

function Button({ color, text, onClick }) {
  return <button style={{ backgroundColor: color }} onClick={onClick}>{text}</button>;
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};
```

**ReCraft Props Example — BlueprintCard:**

```jsx
// src/components/common/BlueprintCard/BlueprintCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

function BlueprintCard({ title, materials, difficulty, duration, builds, accentColor = '#0F6E56' }) {
  const cardStyle = {
    backgroundColor: '#fff',
    border: '0.5px solid #d4ede1',
    borderRadius: '14px',
    overflow: 'hidden',
  };

  const headerStyle = {
    backgroundColor: accentColor + '22', // hex + opacity
    padding: '16px',
    borderBottom: '0.5px solid #d4ede1',
  };

  const difficultyStyle = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: '700',
    backgroundColor: difficulty === 'Easy' ? '#E1F5EE' : '#FFF8E1',
    color:           difficulty === 'Easy' ? '#085041' : '#7A4F00',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <p style={{ fontSize: '9px', fontWeight: '700', color: accentColor }}>{materials}</p>
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{title}</h3>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={difficultyStyle}>{difficulty}</span>
        <span style={{ fontSize: '11px', color: '#666' }}>{builds} builds</span>
        <span style={{ fontSize: '11px', color: '#666' }}>{duration}</span>
      </div>
    </div>
  );
}

BlueprintCard.propTypes = {
  title: PropTypes.string.isRequired,
  materials: PropTypes.string.isRequired,
  difficulty: PropTypes.oneOf(['Easy', 'Medium', 'Hard']),
  duration: PropTypes.string,
  builds: PropTypes.number,
  accentColor: PropTypes.string,
};

export default BlueprintCard;

// Usage
// <BlueprintCard title="Patchwork tote bag" materials="OLD DENIM" difficulty="Easy" duration="3 hrs" builds={31} accentColor="#1D9E75" />
```

---

### 9.6 Project Structure & Dynamic Data Flow

**Modular Project Structure:**

```
src/
├── api/
│   ├── index.js          // exports all API functions
│   ├── mockData.js       // USE_MOCK flag + fake data
│   └── users.js          // fetch calls
├── components/
│   ├── common/
│   │   ├── Button/       Button.jsx (no CSS — all inline)
│   │   ├── Input/        Input.jsx
│   │   ├── Modal/        Modal.jsx
│   │   └── BlueprintCard/ BlueprintCard.jsx
│   └── layout/
│       └── Navbar/       Navbar.jsx
├── pages/
│   ├── home/             index.jsx
│   ├── scan/             index.jsx
│   ├── gallery/          index.jsx
│   └── auth/             index.jsx
├── constants/            index.js
├── utils/                formatDate.js, styleHelpers.js
├── App.jsx
└── index.jsx
```

**3-Layer Dynamic Flow:**

| Layer | What Should Be Dynamic | ReCraft Example |
|---|---|---|
| UI Layer | Lists, forms, conditional display | Blueprint cards from `.map()` |
| Logic Layer | Filtering, sorting, state updates | Search filtering blueprintsData |
| Data Layer | API calls, not hardcoded data | `fetch('/api/blueprints')` |

```jsx
// WRONG — hardcoded data in React
const blueprints = [{ title: 'Tote Bag' }];

// CORRECT — fetched from API
useEffect(() => {
  fetch('/api/blueprints')
    .then(res => res.json())
    .then(data => setBlueprints(data));
}, []);

// Render dynamically
blueprints.map((item) => (
  <BlueprintCard key={item.id} {...item} />
));
```

**Complete Dynamic Flow:**

```
User Action (Scan / Save Blueprint)
        ↓
Update State (React)
        ↓
Update Database (API)
        ↓
Recompute Logic (stock, alerts)
        ↓
UI Updates Automatically
```

**Common Mistakes to Avoid:**

| Mistake | Fix |
|---|---|
| Stock/data manually edited | Always update state → triggers re-render |
| No filtering or search | Add `.filter()` with search state |
| Data hardcoded in component | Fetch from API with `useEffect` |
| UI not updating on data change | Ensure state is updated, not a local variable |
| No low-stock / status indicators | Use dynamic styles based on data values |
| Using kebab-case in style objects | Always use camelCase (`backgroundColor` not `background-color`) |

---

### 9.7 Quick Reference Cheatsheet

**Inline Style Patterns:**

```jsx
// 1. Static style object
const style = { color: 'red', fontSize: '14px' };

// 2. Conditional (ternary)
const style = { color: isError ? 'red' : 'green' };

// 3. State-based
const style = { backgroundColor: isActive ? '#0F6E56' : '#ccc' };

// 4. Prop-based
function Box({ bg = 'white' }) {
  return <div style={{ backgroundColor: bg }} />;
}

// 5. Style function
const linkStyle = (active) => ({
  color: active ? '#0F6E56' : '#444',
  fontWeight: active ? '700' : '400',
});

// 6. Spread merge
const base = { padding: '10px', borderRadius: '8px' };
const extended = { ...base, backgroundColor: '#F5A23C' };
```

**Export / Import Patterns:**

```js
// Named export
export const add = (a, b) => a + b;
import { add } from './math';

// Default export
export default Button;
import Button from './Button';

// Mixed
export default App;
export const helper = () => {};
import App, { helper } from './App';
```

**Props Patterns:**

```jsx
// Basic
function Comp({ name }) { return <p>{name}</p>; }

// Default values
function Button({ color = 'blue', text = 'Click' }) { ... }

// Spread all props
function Card({ style, ...rest }) { return <div style={style} {...rest} />; }

// Children prop
function Card({ children }) { return <div style={{ padding: '20px' }}>{children}</div>; }

// PropTypes validation
Comp.propTypes = { name: PropTypes.string.isRequired };
```

---

## 10. Migration Roadmap — Inline Styles & Dynamic Components

> **Goal:** Remove the dependency on per-page CSS files. Every page should use inline style objects (like the common components already do) and extract repeating UI patterns into reusable components so data flows from one source of truth.

**Current state:**
- ✅ `Button`, `Input`, `Modal`, `Table`, `Navbar` — fully inline, CSS deleted
- ❌ 8 page CSS files still exist (`auth.css`, `blueprint.css`, `projects.css`, `gallery.css`, `gallery-post.css`, `home.css`, `profile.css`, `scan.css`)
- ❌ Repeated card/chip/badge UI patterns are copy-pasted across pages instead of being shared components
- ❌ `POSTS` gallery data is hardcoded inside `gallery/index.jsx` (not a separate data file)

---

### Phase 1 — Extract Repeating UI into Shared Components

Before touching any CSS, pull out the patterns that appear on multiple pages so they can be styled once and reused everywhere.

#### Step 1.1 — `BlueprintCard`

| Used on | What it renders |
|---|---|
| `home` | Community gallery grid (4 cards) |
| `blueprints` | Full listing grid |
| `profile` | "My Builds" section |

**Create:** `src/components/common/BlueprintCard/BlueprintCard.jsx`

```jsx
function BlueprintCard({ title, category, difficulty, duration, builds, img, accentColor = '#0F6E56', id }) {
  const [hovered, setHovered] = useState(false);
  // card style, header style, difficulty badge — all inline
  // links to /blueprint/:id
}
```

Props to accept: `title`, `category`, `difficulty`, `duration`, `builds`, `img`, `accentColor`, `id`

---

#### Step 1.2 — `GalleryCard`

| Used on | What it renders |
|---|---|
| `gallery` | Full community gallery grid |
| `home` | Could reuse for gallery preview strip |

**Create:** `src/components/common/GalleryCard/GalleryCard.jsx`

```jsx
function GalleryCard({ post }) {
  // shows post.afterImg, post.blueprint, post.category
  // likes row, eco-points, verified badge
  // links to /gallery/:id
}
```

Props to accept: `post` object (`id`, `user`, `afterImg`, `blueprint`, `category`, `likes`, `ecoPoints`, `verified`)

---

#### Step 1.3 — `TagChip`

| Used on | What it renders |
|---|---|
| `scan` | Clickable suggested material tags |
| `blueprints` | Category + difficulty filter buttons |
| `gallery-post` | Category label |
| `blueprint` | Material/category labels |

**Create:** `src/components/common/TagChip/TagChip.jsx`

```jsx
function TagChip({ label, color = '#d8f3dc', textColor = '#2d6a4f', active = false, onClick }) {
  // pill shape, colored background+text, hover opacity
  // if onClick passed → cursor pointer + active highlight
}
```

---

#### Step 1.4 — `PageShell`

Every single page renders `<Navbar />` then a wrapper `<div className="page">`. Extract this:

**Create:** `src/components/layout/PageShell/PageShell.jsx`

```jsx
function PageShell({ children, style }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', fontFamily: FONT, ...style }}>
        {children}
      </main>
    </>
  );
}
```

Then every page becomes:
```jsx
return (
  <PageShell>
    {/* page content */}
  </PageShell>
);
```

---

#### Step 1.5 — `SectionHeader`

Every page section has a title + subtitle pattern. Extract it:

```jsx
function SectionHeader({ label, title, subtitle, align = 'left' }) {
  // label = small green uppercase tag (e.g. "COMMUNITY")
  // title = large bold heading
  // subtitle = muted paragraph
  // align: 'left' | 'center'
}
```

---

### Phase 2 — Convert Each Page to Inline Styles

Do pages in this order (simplest → most complex):

| # | Page | File | CSS file to delete | Notes |
|---|---|---|---|---|
| 1 | Auth | `pages/auth/index.jsx` | `auth.css` | Already uses `Button` + `Input` — mostly card/tab styles |
| 2 | Scan | `pages/scan/index.jsx` | `scan.css` | Replace `TagChip` for suggested tags |
| 3 | Blueprints | `pages/blueprints/index.jsx` | `projects.css` | Replace filter buttons with `TagChip`, cards with `BlueprintCard` |
| 4 | Blueprint | `pages/blueprint/index.jsx` | `blueprint.css` | Step tracker, materials list, progress bar |
| 5 | Gallery | `pages/gallery/index.jsx` | `gallery.css` | Replace cards with `GalleryCard` |
| 6 | Gallery Post | `pages/gallery-post/index.jsx` | `gallery-post.css` | Single post detail |
| 7 | Home | `pages/home/index.jsx` | `home.css` | Hero, blueprint strip, gallery strip — use `BlueprintCard` + `GalleryCard` |
| 8 | Profile | `pages/profile/index.jsx` | `profile.css` | XP bar, badges, builds — use `GalleryCard` |

**For each page, follow this pattern:**

```
1. Add FONT constant at top of file
2. Convert each className="x" to style={{ ... }} using the CSS rules from the .css file
3. Add useState for hover where needed (links, cards, buttons without the Button component)
4. Remove the import './page.css' line
5. Delete the .css file
6. Replace repeated card/chip JSX with the new shared components from Phase 1
```

---

### Phase 3 — Dynamic Data (No More Hardcoded Arrays in Page Files)

#### Step 3.1 — Move gallery data to its own file

`POSTS` is currently defined inside `gallery/index.jsx` and imported by other pages via side-effect imports. Move it:

```
src/api/mockData.ts   ← already exists, add POSTS here
  or
src/pages/gallery/galleryData.js   ← same pattern as blueprintsData.js
```

All pages (`gallery`, `gallery-post`, `profile`, `home`) then import from the same single source:
```js
import { POSTS } from '../gallery/galleryData';
```

#### Step 3.2 — Constants file

Following the reference guide's module structure:

**Create:** `src/constants/index.js`
```js
export const USE_MOCK = true;
export const API_BASE = '/api';
export const ACCENT   = '#2d6a4f';
export const FONT     = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
```

Import `FONT` and `ACCENT` into every component/page instead of repeating the string.

#### Step 3.3 — `styleHelpers.js` utilities

Following the reference guide:

**Create:** `src/utils/styleHelpers.js`
```js
export const card = (extra = {}) => ({
  background: '#fff',
  border: '0.5px solid #d4ede1',
  borderRadius: '14px',
  overflow: 'hidden',
  ...extra,
});

export const badge = (bg, color) => ({
  display: 'inline-block',
  padding: '3px 10px',
  borderRadius: '20px',
  fontSize: '10px',
  fontWeight: 700,
  backgroundColor: bg,
  color,
});

export const difficultyBadge = (difficulty) => badge(
  difficulty === 'Easy' ? '#E1F5EE' : '#FFF8E1',
  difficulty === 'Easy' ? '#085041' : '#7A4F00',
);
```

---

### Phase 4 — Final Cleanup

```
□ Confirm zero .css files remain in src/
□ Confirm zero className= remain on page-level elements (components may still accept className for layout overrides)
□ Confirm FONT string is imported from constants/index.js everywhere, not repeated
□ Confirm all card patterns use BlueprintCard or GalleryCard
□ Confirm POSTS imports from galleryData.js (not from gallery/index.jsx)
□ Run the app — check all 8 pages render correctly, hover/active states work
```

---

### Summary Table

| Phase | What | Output |
|---|---|---|
| 1 | Extract BlueprintCard, GalleryCard, TagChip, PageShell, SectionHeader | 5 new shared components |
| 2 | Convert 8 pages to inline styles, delete 8 CSS files | Zero CSS files in `src/pages/` |
| 3 | galleryData.js, constants/index.js, styleHelpers.js | Shared data + style utilities |
| 4 | Cleanup pass | Clean, consistent, no duplicate code |
