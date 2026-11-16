# Lohmann Design System (LDS)

> A Minimalist Design Engineering Portfolio System built for narrative clarity, responsive rigor, and strict accessibility.

[![Design Tokens](https://img.shields.io/badge/Design%20Tokens-100%25%20Strict-E13C47?style=flat-square)](src/style)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA%20%2F%20AAA-brightgreen?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Storybook](https://img.shields.io/badge/Storybook-Living%20Styleguide-FF4785?style=flat-square)](storybook-static/index.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20Strict-blue?style=flat-square)](tsconfig.json)

---

## Table of Contents

1. [Design Philosophy & Identity](#1-design-philosophy--identity)
2. [Token Architecture](#2-token-architecture)
3. [Color System](#3-color-system)
   - [Core Palette Primitives](#core-palette-primitives)
   - [Semantic Surface & Text Tokens](#semantic-surface--text-tokens)
   - [WCAG Contrast Compliance Matrix](#wcag-contrast-compliance-matrix)
4. [Typographic System](#4-typographic-system)
   - [Typeface Trio & Roles](#typeface-trio--roles)
   - [Typographic Scale Hierarchy](#typographic-scale-hierarchy)
   - [Fluid Typography Clamps](#fluid-typography-clamps)
5. [Spacing & Layout Matrix](#5-spacing--layout-matrix)
   - [Harmonic 8-Point Spacing Scale](#harmonic-8-point-spacing-scale)
   - [Responsive Breakpoints & Grids](#responsive-breakpoints--grids)
6. [Elevation & Depth Layering](#6-elevation--depth-layering)
7. [Motion & Interaction System](#7-motion--interaction-system)
   - [Durations & Custom Cubic Beziers](#durations--custom-cubic-beziers)
   - [Micro-Interactions & Hover Effects](#micro-interactions--hover-effects)
   - [Keyboard Focus Indicator & High Contrast](#keyboard-focus-indicator--high-contrast)
8. [Accessibility (a11y) & Inclusivity](#8-accessibility-a11y--inclusivity)
9. [Component Architecture & Usage Guidelines](#9-component-architecture--usage-guidelines)
10. [Living Documentation (Storybook)](#10-living-documentation-storybook)

---

## 1. Design Philosophy & Identity

The Lohmann Design System is a **Minimalist Design Engineering Portfolio System** centered on editorial clarity, structural discipline, and high-contrast typography:

- **Asymmetric Tension**: Bold serif headlines counterbalanced against geometric condensed sans-serif navigation, anchored by ample whitespace and strict grid boundaries.
- **Content as Hero**: Typography and project imagery carry the interface without ornamental gradients, faux skeuomorphism, or unnecessary chrome.
- **Monochrome Foundation + Imperial Accent**: A deliberate, high-contrast monochrome canvas (`#000000` / `#ffffff`) punctuated with an authoritative flash of **Imperial Red** (`#e63746`).
- **Zero Magic Numbers**: All dimensions, scales, margins, timings, and z-indexes flow deterministically from centralized tokens in [`src/style/`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style).

---

## 2. Token Architecture

The design token system is tiered into three levels:

```
┌────────────────────────────────────────────────────────┐
│ 1. GLOBAL / PRIMITIVE TOKENS                          │
│    Raw color values, base font families, base 8pt units │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. SEMANTIC TOKENS                                     │
│    Role-based assignments (backgroundPrimary,          │
│    textHighlight, subtleBorder, query.mobile)          │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. COMPONENT IMPLEMENTATIONS                           │
│    Components strictly consume semantic tokens         │
│    (styled-components, zero hardcoded magic numbers)   │
└────────────────────────────────────────────────────────┘
```

All tokens are organized in [`src/style/`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style):

| Module | Source File | Description |
| :--- | :--- | :--- |
| **Colors** | [`src/style/colors.ts`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style/colors.ts) | Brand palette, semantic surface, text, and state tokens |
| **Sizes & Grid** | [`src/style/sizes.ts`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style/sizes.ts) | 8pt spacing scale, breakpoints, responsive column metrics, z-index |
| **Typography** | [`src/style/typography.ts`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style/typography.ts) | Font families, typographic scale (h1–h6, p, small), line heights |
| **Effects** | [`src/style/effects.ts`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style/effects.ts) | Focus outlines, high-contrast states, animated underline micro-interactions |
| **Animation** | [`src/style/animation.ts`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style/animation.ts) | Transition timings, cubic-bezier curves, entrance offsets |
| **Global** | [`src/style/global.ts`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/style/global.ts) | Global reset, box-sizing, text-wrap balancing, document canvas |

---

## 3. Color System

### Color Token Philosophy: Canonical Hex & Standard RGBA

To align with modern web engineering and design-tool interoperability (Figma, Design Tokens Community Group / W3C DTCG standards), color tokens follow a strict, dual-format standard:
1. **Solid Surfaces & Primitives**: Authored strictly in **canonical 6-digit Hex** (`#RRGGBB`). This guarantees unambiguous parsing across design tools, CSS-in-JS, SVGs, and automated tooling without redundant mathematical color-space conversions.
2. **Alpha Overlays & Tints**: Authored in **canonical RGBA** (`rgba(R, G, B, A)`) with human-readable normalized float decimals (`0.0` - `1.0`).

### Core Palette Primitives

```
■ Pure Black      [ #000000                   ]  -- Base canvas surface
■ Almost Black    [ #222222                   ]  -- Elevated cards & controls
■ Pure White      [ #ffffff                   ]  -- Primary text & foreground
■ Faded White     [ rgba(255, 255, 255, 0.5)  ]  -- Subtitle & secondary meta
■ Imperial Red    [ #e63746                   ]  -- Brand accent, CTA, focus ring
```

### Semantic Surface & Text Tokens

| Token Identifier | Value | Primary Role |
| :--- | :--- | :--- |
| `colors.backgroundPrimary` | `#000000` | Root canvas background (`html`, `body`) |
| `colors.backgroundSecondary`| `#ffffff` | Inverted card surfaces and light accents |
| `colors.backgroundTertiary` | `#e63746` | High-impact callout backgrounds |
| `colors.textPrimary` | `#ffffff` | Headings, hero prose, high-contrast labels |
| `colors.textSecondary` | `#000000` | Inverted text on light surfaces |
| `colors.textHighlight` | `#e63746` | CTA links, active navigation indicator, underlines |
| `colors.fadedWhite` | `rgba(255, 255, 255, 0.5)` | Dates, employer tenure, secondary subtitles |
| `colors.subtleBorder` | `rgba(255, 255, 255, 0.25)` | 25% white hairline dividers and card outlines |
| `colors.menuScrim` | `rgba(0, 0, 0, 0.85)` | 85% opacity backdrop dimming during open drawer |
| `colors.actionBackground` | `#cf2636` | Solid high-contrast fill for primary action and retry buttons |
| `colors.footerBackground` | `#cf2636` | Dedicated solid anchor surface for site footer |
| `colors.errorBackground` | `rgba(207, 38, 54, 0.1)` | Tinted feedback surface for error banners |
| `colors.loading` | `#333333` | Folding-cube loader geometry |
| `colors.timelineMarker` | `#808080` | Milestone indicators on career timeline |

### WCAG Contrast Compliance Matrix

| Foreground Element | Background Surface | Contrast Ratio | WCAG 2.1 Conformance |
| :--- | :--- | :--- | :--- |
| **Pure White** (`#ffffff`) | Pure Black (`#000000`) | **21.0:1** | **Pass AAA** (All text) |
| **Imperial Red** (`#e63746`) | Pure Black (`#000000`) | **5.0:1** | **Pass AA** (Normal text), **Pass AAA** (Large text) |
| **Faded White** (`rgba(255, 255, 255, 0.5)`) | Pure Black (`#000000`) | **5.3:1** | **Pass AA** (Normal text), **Pass AAA** (Large text) |
| **Pure White** (`#ffffff`) | Action / Footer Red (`#cf2636`) | **5.27:1** | **Pass AA** (All text), **Pass AAA** (Large text) |

---

## 4. Typographic System

### Typeface Trio & Roles

The system uses three self-hosted, subsetted webfonts configured in [`src/fonts.css`](file:///Users/Temp/Documents/Projects/Portfolio/portfolio-lohmann/src/fonts.css):

```
                   ┌───────────────────────────────────────────────┐
                   │               TYPOGRAPHIC STACK               │
                   └───────────────────────┬───────────────────────┘
           ┌───────────────────────────────┼───────────────────────────────┐
           ▼                               ▼                               ▼
     Oswald (Sans)               Quattrocento (Serif)           Source Sans Pro (Sans)
   ─────────────────             ────────────────────           ──────────────────────
   - Compressed Grotesque        - Renaissance Classic Serif    - Humanist UI Sans
   - Uppercase Display           - Editorial Prose              - Meta, Specs, Captions
   - Route Headers & Nav         - Introduction & Longform      - Secondary Links & Footers
```

### Typographic Scale Hierarchy

All font sizes are authored in rems relative to the `16px` base font size:

| Semantic Token | rem Value | px Equivalent | Line Height | Intended Usage |
| :--- | :--- | :--- | :--- | :--- |
| `typography.sizing.h1` | `10rem` | `160px` | `1.3` | Monumental display statements & hero accents |
| `typography.sizing.h2` | `7rem` | `112px` | `1.3` | Major section headers & project names |
| `typography.sizing.h3` | `4.25rem` | `68px` | `1.3` | Editorial lead titles |
| `typography.sizing.h4` | `2.75rem` | `44px` | `1.3` | Project card titles, error route status |
| `typography.sizing.h5` | `1.75rem` | `28px` | `1.3` | Section subheads, desktop navigation items |
| `typography.sizing.h6` | `1rem` | `16px` | `1.3` | Minor subheads, card captions |
| `typography.sizing.link` | `1rem` | `16px` | `1.3` | Standard link & button action text |
| `typography.sizing.p` | `1.25rem` | `20px` | `1.3` | Lead paragraph copy and editorial narratives |
| `typography.sizing.small`| `0.75rem` | `12px` | `1.3` | Timestamps, client tags, award badges |
| `typography.sizing.mobile.nav`| `2.75rem` | `44px` | `1.3` | High-impact full-screen mobile menu links |

### Typographic Weights

| Token Name | Numeric Value | Role / Intended Usage |
| :--- | :--- | :--- |
| `typography.weight.thin` | `100` | Refined hero introduction prose |
| `typography.weight.regular` | `400` | Standard body copy and paragraphs |
| `typography.weight.semibold` | `600` | Project card titles, action links (`LearnMoreLink`) |
| `typography.weight.bold` | `700` | Primary navigation route links (`NavLink`), bold headings |

### Fluid Typography Clamps

For critical responsive surfaces, fluid typography clamps smoothly adapt text size without discontinuous breakpoint jumps:

```css
/* Homepage Hero Introduction */
font-size: clamp(${typography.sizing.h5}, 4.7vw, ${typography.sizing.h3});

/* Homepage Supporting Narrative */
font-size: clamp(${typography.sizing.p}, 2.5vw, 2rem);

/* Mobile Persistent Navigation Header */
font-size: clamp(${typography.sizing.h5}, 8vw, ${typography.sizing.h4});
```

All paragraph elements implement `text-wrap: balance` to eliminate awkward single-word orphans in headings and editorial decks.

---

## 5. Spacing & Layout Matrix

### Harmonic 8-Point Spacing Scale

The spacing system is rooted in an **8-point harmonic grid**, with mathematically scaled mobile compression for small viewports:

| Token Name | Desktop Value | Mobile Value (`spacingMobile`) | Visual Representation |
| :--- | :--- | :--- | :--- |
| `sizes.spacing.xs` | `8px` | `6px` | `■` |
| `sizes.spacing.sm` | `16px` | `12px` | `■■` |
| `sizes.spacing.md` | `32px` | `20px` | `■■■■` |
| `sizes.spacing.lg` | `48px` | `32px` | `■■■■■■` |
| `sizes.spacing.xl` | `96px` | `64px` | `■■■■■■■■■■■■` |
| `sizes.spacing.xxl`| `182px` | `120px` | `■■■■■■■■■■■■■■■■■■■■■■■` |

### Responsive Breakpoints & Grids

The responsive layout is managed through 4 primary device tiers defined in `sizes.device`:

```
┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
│      MOBILE       │      TABLET       │      DESKTOP      │   LARGE DESKTOP   │
│    (<= 719px)     │   (720 - 959px)   │  (960 - 1399px)   │    (>= 1400px)    │
├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ Columns: 2        │ Columns: 2        │ Columns: 12       │ Columns: 12       │
│ Margin:  12px     │ Margin:  24px     │ MaxWidth: 760px   │ MaxWidth: 1200px  │
│ Gutter:  16px     │ Gutter:  16px     │ Gutter: 16px      │ Gutter: 16px      │
│ ColWidth: 310px   │ ColWidth: 310px   │ ColWidth: 48.5px  │ ColWidth: 85.25px │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

#### Media Query Shortcuts

```typescript
sizes.query.mobile       // @media (max-width: 719px)
sizes.query.tablet       // @media (min-width: 720px)
sizes.query.touch        // @media (max-width: 959px)
sizes.query.desktop      // @media (min-width: 960px)
sizes.query.largeDesktop // @media (min-width: 1400px)
```

---

## 6. Elevation & Depth Layering

Layering avoids arbitrary magic z-index values by routing all layering through `sizes.zIndex`:

```
┌────────────────────────────────────────────────────────┐
│  modal: 9999   Global loading cube & top-level overlays │
├────────────────────────────────────────────────────────┤
│  drawer: 1001  Full-screen navigation drawer overlay   │
├────────────────────────────────────────────────────────┤
│  nav: 1000     Persistent hamburger trigger & header   │
├────────────────────────────────────────────────────────┤
│  base: 1       Content surfaces, timeline dot markers, │
│                menu backdrop dim scrim (:before)       │
└────────────────────────────────────────────────────────┘
```

---

## 7. Motion & Interaction System

### Durations & Custom Cubic Beziers

Animation curves are tailored for an authoritative, smooth editorial feel without rubber-banding or excessive bounce:

| Token | Value | Intended Usage |
| :--- | :--- | :--- |
| `animation.shortTransition` | `0.1s` | Micro-state changes (hairline opacity) |
| `animation.fast` | `0.3s` | Quick micro-interaction triggers & underline expand |
| `animation.normal` | `0.4s` | Standard UI state changes |
| `animation.transition` | `0.5s` | Menu scrim fade and page transitions |
| `animation.slow` | `0.7s` | Deliberate editorial hover-out / unhover |
| `animation.drawer` | `0.8s` | Full-screen navigation drawer expansion |
| `animation.focus` | `1.0s` | Focus halo pulse glow duration |
| `animation.ease.standard` | `cubic-bezier(0.2, 1, 0.3, 1)` | Natural deceleration curve |
| `animation.ease.drawer` | `cubic-bezier(0.7, 0, 0.3, 1)` | High-momentum easing for drawer reveals |

### Micro-Interactions & Hover Effects

Interactive links use a directional, animated underline effect defined in `src/style/effects.ts`:

- **Resting / Hover-Out**: Line collapses rightwards into zero width (`scale3d(0.001, 1, 1)`), anchored to the right (`100% 50%`), transitioning in `${animation.transition} ${animation.ease.inOut}` with delayed opacity fade `${animation.shortTransition} ${animation.normal} linear`, so the line visibly slides and wipes away to the right.
- **Hover-In**: Expands left-to-right (`scaleX(1)`), anchored to the left (`0 50%`), transitioning in `${animation.transition} ${animation.ease.standard}` with immediate opacity.

```typescript
import { effects } from "@/style";

const NavLink = styled.a`
  position: relative;
  &:after {
    ${effects.beforeAfter}
    background: ${colors.highlight};
  }
  &:hover:after {
    ${effects.activeHover}
  }
`;
```

### Keyboard Focus Indicators & High Contrast

1. **Global Unstyled Focus Ring (`:focus-visible`)**:
   - Configured globally in `src/index.css` and `src/style/global.ts` so all native or unstyled interactive elements (`<a>`, `<button>`, `<input>`, `[tabindex]`) automatically conform to the design system on keyboard navigation:
     ```css
     :focus-visible {
       outline: 2px solid ${colors.highlight};
       outline-offset: 4px;
     }
     :focus:not(:focus-visible) {
       outline: none;
     }
     @media (forced-colors: active) {
       :focus-visible {
         outline: 2px solid Highlight;
         outline-offset: 4px;
       }
     }
     ```
2. **Explicit Focus Ring (`effects.focus`)**:
   - Styled interactive controls (e.g., CTA buttons, menu triggers) consume `effects.focus`, creating an inward-facing 4px halo in `${colors.highlight}` (`box-shadow: ${colors.highlight} 0px 0px 0px 4px`).
3. **Windows High Contrast Mode Support**:
   - Under `@media (forced-colors: active)`, box-shadows are suppressed by the OS. LDS enforces an explicit `outline: 2px solid Highlight; outline-offset: 4px;` across both global unstyled elements and custom components.

---

## 8. Accessibility (a11y) & Inclusivity

1. **Strict Contrast Compliance**:
   - Primary text achieves **21.0:1** contrast (exceeding WCAG AAA).
   - Accent CTA links achieve **4.8:1** on black (exceeding WCAG AA for normal text, AAA for large text).
2. **Prefers-Reduced-Motion**:
   - The navigation drawer and entrance animations automatically collapse transitions to `0s` when `@media (prefers-reduced-motion: reduce)` is signaled by the user's OS.
   - Smooth scrolling switches to instant positioning.
3. **Touch Targets**:
   - All interactive buttons and mobile call-to-action links maintain a minimum hit area of **44px** height.
4. **Accessible Landmarks & Semantics**:
   - Semantic landmarks `<nav>`, `<main id="main">`, and `<footer>`.
   - Complete `aria-expanded`, `aria-hidden`, and focus trapping across navigation drawer states.

---

## 9. Component Architecture & Usage Guidelines

### How to Style Components

Always import tokens from `@/style` rather than writing raw strings or numbers:

```typescript
// ✅ RECOMMENDED: Using Design Tokens
import styled from "styled-components";
import { colors, sizes, typography, effects } from "@/style";

export const CallToAction = styled.button`
  font-family: ${typography.font.nav};
  font-size: ${typography.sizing.link};
  color: ${colors.white};
  background: ${colors.actionBackground};
  padding: ${sizes.spacing.xs}px ${sizes.spacing.sm}px;
  min-height: 44px;
  border: none;
  cursor: pointer;
  ${effects.focus}

  ${sizes.query.mobile} {
    font-size: ${typography.sizing.small};
    padding: ${sizes.spacingMobile.xs}px ${sizes.spacingMobile.sm}px;
  }
`;
```

### Anti-Patterns to Avoid

```typescript
// ❌ ANTI-PATTERN 1: Hardcoded hex or rgba colors
background: #cf2636;              // Use ${colors.actionBackground} or ${colors.highlight}

// ❌ ANTI-PATTERN 2: Arbitrary token assignment by numeric coincidence
// NEVER use an unrelated token (e.g. tablet device margin or footer color) just because numbers match:
margin-right: ${sizes.device.tablet.margin}px; // ❌ WRONG: device margin on a button!
margin-right: ${sizes.spacing.sm}px;           // ✅ CORRECT: semantic 8pt spacing token
background: ${colors.footerBackground};        // ❌ WRONG: button styled as a footer!
background: ${colors.actionBackground};        // ✅ CORRECT: semantic action token

// ❌ ANTI-PATTERN 3: Magic px spacing
margin-bottom: 24px;              // Use ${sizes.spacing.sm}px or ${sizes.spacing.md}px

// ❌ ANTI-PATTERN 4: Magic z-indexes
z-index: 999;                     // Use ${sizes.zIndex.modal} or ${sizes.zIndex.nav}

// ❌ ANTI-PATTERN 5: Inline CSS font-families
font-family: 'Oswald', sans-serif;// Use ${typography.font.header}
```

---

## 10. Living Documentation (Storybook)

The design system includes interactive, living Storybook documentation with full token visualization.

### Running Storybook Locally

```sh
npm run storybook
```
Opens the living styleguide at `http://localhost:6006/` with the following stories:
- **Design System / Foundations / Colors**: Visual palette swatches, semantic tokens, and contrast ratios.
- **Design System / Foundations / Typography**: Font specimens (Oswald, Quattrocento, Source Sans Pro) and scale breakdown.
- **Design System / Foundations / Spacing & Grid**: 8pt harmonic grid visualizer and responsive breakpoints.
- **Design System / Foundations / Effects & Motion**: Interactive focus indicators, animated underlines, and animation curves.
- **Demo / TypeDemo**: Semantic heading and body typography showcase.
- **Demo / LayoutDemo**: 12-column responsive layout grid testing.

### Building Storybook Static Asset

```sh
npm run build-storybook
```
Builds the static styleguide into `storybook-static/` for offline review or deployment.
