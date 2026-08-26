# Tailwind + Motion Design System

This document defines the premium visual system for the Jaydev Group migration.
It focuses on responsive layout, motion-driven experience, and modern industrial brand expression.

## Design Goals

- Premium, technical, and export-focused aesthetic.
- Clean industrial palette with teal accents, deep navy, and gold highlights.
- Motion-driven micro-interactions for trust and clarity.
- Strong mobile-first responsiveness.

## Brand Tokens

- Primary: `#0B7A72`, `#0EA5A0`
- Dark: `#0E2040`, `#163566`
- Neutral: `#F4F7FB`, `#E2E8F0`, `#F8FAFC`
- Accent: `#B8720A`, `#0D9466`

## Typography

- Headings: strong, geometric sans-serif with distinct letter spacing.
- Body: clean, readable sans-serif with moderate line height.
- Use a minimum of 1.4 line height for paragraphs.
- Keep font scale clear: hero, section title, card heading, body.

## Layout Patterns

- Hero with left-aligned content and companion visual summary.
- Split feature rows with bullet-like value cards.
- Horizontal product/market sections with fluid card grids.
- Full-width trust sections and concise FAQ.
- Use whitespace generously; avoid cramped content.

## Tailwind Strategy

- Configure brand colors in `tailwind.config.js`.
- Define custom spacing values where needed.
- Use `container` plus responsive padding for page width control.
- Create utility classes for repeatable patterns when needed.
- Avoid long custom CSS when Tailwind utilities cover the case.

## Motion Principles

- Use Framer Motion for:
  - Hero entrance animation
  - feature card reveal
  - section fade-in on scroll
  - CTA hover and tap states
- Keep motion subtle and purposeful.
- Avoid excessive animation that distracts from content.

## Component Styles

- `Card`: white background, subtle shadow, border ring, soft rounded corners.
- `Badge`: uppercase, compact, strong contrast.
- `Button`: primary teal button, secondary outlined white/neutral button.
- `Stat`: numeric value with a small label and supporting copy.
- `Grid`: consistent gap spacing and responsive column count.

## Accessibility

- Maintain at least 4.5:1 contrast for body text.
- Use visible focus ring styles for buttons and links.
- Ensure motion respects reduced motion preferences.
- Use semantic HTML and accessible button semantics.

## Page Experience

- Homepage: authoritative hero, product preview, markets, trust.
- Products: clear product hierarchy, packaging & specs, RFQ CTA.
- Industries: sector stories, product fit, buyer impact.
- Markets: export lanes, port advantage, trade corridors.
- Quality: documentation, compliance, process clarity.
- Quote: lead conversion flow with contact details and WhatsApp.
