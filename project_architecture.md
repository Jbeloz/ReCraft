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
