# Design Brief

## Purpose & Emotional Context
Dual-sided restaurant platform balancing customer hunger (urgency) with owner confidence (trust). Mobile-first, transaction-focused yet inviting.

## Tone & Visual Identity
**Warm Contemporary Hospitality** — premium QSR aesthetic. Minimal yet inviting. Elevated through intentional depth and warm accent colors, not through rusticity clichés.

## Differentiation
Cohesive dual interface: restaurant owners and customers share visual language yet experience role-tailored flows. Color hierarchy and surface elevation create trust and clarity.

## Palette & Semantics

| Token | OKLCH (Light) | OKLCH (Dark) | Purpose |
|-------|---------------|--------------|---------|
| Primary | 0.55 0.18 33 | 0.65 0.16 33 | Terracotta: energetic, grounded, CTA emphasis |
| Secondary | 0.6 0.08 155 | 0.45 0.06 155 | Sage green: trust, freshness, status positive |
| Accent | 0.7 0.15 38 | 0.75 0.14 38 | Warm gold: highlights, moments of delight |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Alert red: cancel, delete, errors |
| Foreground | 0.12 0.03 30 | 0.92 0.02 65 | Deep brown-grey on light; warm white on dark |
| Background | 0.99 0.01 70 | 0.14 0.01 35 | Cream on light; charcoal on dark |
| Border | 0.88 0.01 70 | 0.26 0.01 35 | Subtle, warm-tinted neutrals |

## Typography

| Role | Font | Usage | Traits |
|------|------|-------|--------|
| Display | DM Sans | Headers, CTAs, restaurant names | Geometric, bold, friendly yet professional |
| Body | Lora | Menu descriptions, order details, body copy | Elegant serifs, premium feel, excellent readability |
| Mono | Geist Mono | Order IDs, timestamps, codes | Technical, clean, monospace |

## Structural Zones

| Zone | Surface | Treatment | Purpose |
|------|---------|-----------|---------|
| Header/Nav | Card elevated | `shadow-card`, terracotta accent underline | Navigation clarity, brand presence |
| Content Cards | Elevated | `shadow-card`, sage green borders for status | Restaurant items, order cards, form inputs |
| CTA Buttons | Primary accent | Gold/warm accent with smooth transitions | Drive key actions (order, submit, confirm) |
| Footer | Muted subtle | Light border, reduced opacity text | Trust signals, secondary links, legal |

## Spacing & Rhythm
Density varies by zone: compact input fields (12px gap), generous card spacing (20px), relaxed footer (16px). Vertical rhythm reinforced via heading weights and color depth.

## Component Patterns
- Buttons: primary (terracotta), secondary (sage), outline (border-only), ghost (text-only). All use `transition-smooth`.
- Cards: shadow-card default; shadow-elevated on hover. Sage borders for status changes.
- Forms: muted backgrounds, primary focus ring, accent success feedback.
- Lists: alternating row backgrounds (muted/40), compact spacing, sage checkmarks for selection.

## Motion & Interaction
Smooth `cubic-bezier(0.4, 0, 0.2, 1)` transitions on all interactive elements. No bouncing or playful motion — transactions demand confidence. Subtle scale shifts (1.02x) on button hover, color fade on state change.

## Theme
Light mode default (warm cream background, deep foreground). Dark mode available — tuned for readability, not inverted lightness. Sage and gold accents remain vibrant in dark.

## Signature Detail
Warm-tinted neutral palette with sage trust accent. Primary terracotta CTA paired with gold highlights. Every interactive element uses `transition-smooth` for unified motion language. No generic gradients or neon shadows.
