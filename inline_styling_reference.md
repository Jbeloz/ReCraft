SECTION 1 — What Is Inline Styling?

Definition
Inline styling in React uses JavaScript objects instead of CSS strings. This lets you write actual JavaScript logic directly inside your styles — including conditions, variables, and functions.

Key Difference from HTML
HTML inline:   style="color: red; font-size: 24px"
React inline:  style={{ color: "red", fontSize: "24px" }}

React uses an object ({}) not a string. Properties are camelCase, not kebab-case.

Basic Syntax
Two ways to write inline styles in React:

1. Direct inline object
const element = <h1 style={{ color: "red", fontSize: "24px" }}>
  Hello, Inline Styles!
</h1>;

2. Style object variable (recommended)
import React from 'react';

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

export default StyledHeader;

camelCase Rule
All CSS properties must be written in camelCase in React:

CSS (kebab-case)	React (camelCase)
font-size	fontSize
background-color	backgroundColor
border-radius	borderRadius
text-align	textAlign
padding-top	paddingTop
margin-left	marginLeft
box-shadow	boxShadow
z-index	zIndex

Advantages vs Disadvantages

Advantages	Disadvantages
Scoped — applies only to that element	Hard to maintain in large projects
Dynamic styles using JS logic (ternary, state)	No support for :hover, :focus pseudo-classes
Quick for small/one-off components	No media queries support natively
No class name conflicts	Cannot use CSS preprocessors like SASS/SCSS
Co-located with component logic	No CSS transitions/animations (limited)

SECTION 2 — Dynamic Inline Styling with JavaScript

Using Ternary Operators
Since styles are just JS objects, you can use any JavaScript expression inside them:

const isError = true;

const styles = {
  color: isError ? "red" : "green",   // changes based on isError
  fontSize: "20px",
};

const element = <h1 style={styles}>Dynamic Styling</h1>;

State-Driven Styles — Toggle Button
One of the most common patterns: change styles based on component state using useState.

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

ReCraft Example — Active Nav Link
Applied to ReCraft: highlight the active navbar link dynamically.

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

Pattern Summary — Dynamic Styles
1. Define a style object using const inside the component.
2. Use ternary (condition ? valueA : valueB) for conditional styles.
3. Reference state or props variables directly inside the object.
4. For multiple dynamic styles, use a style-generating function (page) => ({...}).

SECTION 3 — Reusable Styled Components with Props

Passing Style as Props
Props let a parent component control a child component's appearance. This is the foundation of a component library.

Generic Button Component (from PDF)
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

// Usage in App.jsx — parent controls color and text
const App = () => (
  <div>
    <Button color="blue" text="Click Me" />
    <Button color="green" text="Submit" />
    <Button color="#F5A23C" text="Start Recrafting!" />
  </div>
);

ReCraft Button Component
Applying the same pattern to your actual ReCraft project:

// src/components/common/Button/Button.jsx
import React from 'react';
import './Button.css';   // keep for base reset only

function Button({ variant = 'primary', text = 'Click', onClick }) {
  const base = {
    padding: '11px 22px',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
  };

  const variants = {
    primary: {
      ...base,
      backgroundColor: '#F5A23C',
      color: '#fff',
      border: 'none',
    },
    outline: {
      ...base,
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      border: '2px solid #1a1a1a',
    },
    ghost: {
      ...base,
      backgroundColor: 'transparent',
      color: '#0F6E56',
      border: 'none',
    },
  };

  return (
    <button style={variants[variant]} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

// Usage
<Button variant="primary" text="Start Recrafting!" />
<Button variant="outline" text="Browse Blueprints" />
<Button variant="ghost" text="Learn More" />

Passing a Full Style Object as Props
For maximum flexibility, pass the entire style object as a prop — the child just applies it:

// Card.jsx — accepts full customStyle prop
function Card({ backgroundColor, children }) {
  const cardStyle = {
    backgroundColor,
    padding: '20px',
    borderRadius: '10px',
    border: '0.5px solid #d4ede1',
  };

  return <div style={cardStyle}>{children}</div>;
}

// CustomBox — even more flexible
function CustomBox({ customStyle, children }) {
  return <div style={customStyle}>{children}</div>;
}

const boxStyles = {
  border: '1px solid #0F6E56',
  padding: '20px',
  borderRadius: '12px',
  backgroundColor: '#E1F5EE',
};

// Usage
<CustomBox customStyle={boxStyles}>
  <h2>This box accepts full styles via props!</h2>
</CustomBox>

AlertBox Component — Type-Based Styles
From the PDF activity: change background color based on a type prop.

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

// Usage
<AlertBox type="success" message="Blueprint saved successfully!" />
<AlertBox type="error"   message="Upload failed. Try again." />
<AlertBox type="warning" message="Low resolution image detected." />

SECTION 4 — JavaScript ES6 Modules (Import & Export)

Why Modules?
Traditional JS kept everything in one file — hard to maintain. Modules let you split code into small, focused files that import only what they need.

Named Exports
Export multiple things from one file. Import with curly braces { }.

// src/utils/styleHelpers.js
export const addBorder = (style) => ({
  ...style,
  border: '1px solid #d4ede1',
  borderRadius: '8px',
});

export const addShadow = (style) => ({
  ...style,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
});

export const addHoverBase = (style) => ({
  ...style,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
});

// Importing named exports
import { addBorder, addShadow } from '../utils/styleHelpers';

const cardStyle = addShadow(addBorder({
  backgroundColor: '#fff',
  padding: '20px',
}));

Default Exports
Export one main thing per file. Import without curly braces — you choose the name.

// src/components/common/Button/Button.jsx
function Button({ variant, text }) { ... }

export default Button;          // default export

// Importing a default export
import Button from '../components/common/Button/Button';
import Btn from '../components/common/Button/Button';    // any name works

Named vs Default — Summary

	Named Export	Default Export
Syntax to export	export const X = ...	export default X
Syntax to import	import { X } from '...'	import X from '...'
How many per file	Many	Only one
Import name	Must match exactly	Any name you choose
Best used for	Utilities, multiple components	Main component of a file

ReCraft Module Structure Example
How modules connect across your project:

// src/types/index.js — named exports of all types
export const VARIANTS  = ['primary', 'outline', 'ghost'];
export const BADGE_TYPES = ['success', 'error', 'warning'];

// src/constants/index.js — named exports
export const API_BASE  = '/api';
export const USE_MOCK  = true;

// src/api/users.js — default export
import { API_BASE, USE_MOCK } from '../constants';

const getUsers = async () => { ... };
export default getUsers;

// src/pages/home/index.jsx — imports from multiple modules
import Button   from '../../components/common/Button/Button';
import { USE_MOCK } from '../../constants';
import getUsers from '../../api/users';

SECTION 5 — React Props: Passing Data Into Components

What Are Props?
Props (short for 'properties') are arguments passed into React components. They flow one way: parent → child. Props let you customize components with data from outside.

// Basic props
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

<Welcome name="Alice" />

Destructuring Props (Recommended)
Instead of accessing props.x every time, destructure in the function signature:

// Without destructuring
function Button(props) {
  return <button style={{ backgroundColor: props.color }}>{props.text}</button>;
}

// With destructuring (cleaner)
function Button({ color = 'blue', text = 'Click Me' }) {
  return <button style={{ backgroundColor: color }}>{text}</button>;
}

PropTypes — Type Validation
propTypes let you define what type each prop should be, and warn in the console if wrong values are passed:

import PropTypes from 'prop-types';

function Button({ color, text, onClick }) {
  return <button style={{ backgroundColor: color }} onClick={onClick}>{text}</button>;
}

Button.propTypes = {
  color:   PropTypes.string.isRequired,
  text:    PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

ReCraft Props Example — BlueprintCard
A real-world card component for ReCraft that uses props for all data and styles:

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
    backgroundColor: accentColor + '22',   // hex + opacity
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
    color: difficulty === 'Easy' ? '#085041' : '#7A4F00',
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
  title:       PropTypes.string.isRequired,
  materials:   PropTypes.string.isRequired,
  difficulty:  PropTypes.oneOf(['Easy', 'Medium', 'Hard']),
  duration:    PropTypes.string,
  builds:      PropTypes.number,
  accentColor: PropTypes.string,
};

export default BlueprintCard;

// Usage in pages/home/index.jsx
<BlueprintCard
  title="Patchwork tote bag"
  materials="OLD DENIM"
  difficulty="Easy"
  duration="3 hrs"
  builds={31}
  accentColor="#1D9E75"
/>

SECTION 6 — Project Structure & Dynamic Data Flow

Modular Project Structure
From the PDF — parent/child component architecture with props flowing downward:

src/
├── api/
│   ├── index.js          // exports all API functions
│   ├── mockData.js       // USE_MOCK flag + fake data
│   └── users.js          // fetch calls
├── components/
│   ├── common/
│   │   ├── Button/       Button.jsx  (no CSS — all inline)
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

3-Layer Dynamic Flow

Layer	What Should Be Dynamic	ReCraft Example
UI Layer	Lists, forms, conditional display	Blueprint cards from .map()
Logic Layer	Filtering, sorting, state updates	Search filtering blueprints
Data Layer	API calls, not hardcoded data	fetch('/api/blueprints')

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
))

Complete Dynamic Flow (from PDF)

User Action (Scan / Save Blueprint)
           ↓
    Update State (React)
           ↓
    Update Database (API)
           ↓
  Recompute Logic (stock, alerts)
           ↓
   UI Updates Automatically

Common Mistakes to Avoid

Mistake	Fix
Stock/data manually edited	Always update state → triggers re-render
No filtering or search	Add .filter() with search state
Data hardcoded in component	Fetch from API with useEffect
UI not updating on data change	Ensure state is updated, not a local variable
No low-stock / status indicators	Use dynamic styles based on data values
Using kebab-case in style objects	Always use camelCase (backgroundColor not background-color)

QUICK REFERENCE CHEATSHEET

Inline Style Patterns

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

Export / Import Patterns

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

Props Patterns

// Basic
function Comp({ name }) { return <p>{name}</p>; }

// Default values
function Button({ color = 'blue', text = 'Click' }) { ... }

// Spread all props
function Card({ style, ...rest }) {
  return <div style={style} {...rest} />;
}

// Children prop
function Card({ children }) {
  return <div style={{ padding: '20px' }}>{children}</div>;
}

// PropTypes validation
Comp.propTypes = { name: PropTypes.string.isRequired };
