# Audit Workflow

This document defines the auditing process for Jaydev Group.
It is the baseline for understanding content, structure, UX, and technical gaps before migration.

## Purpose

- Capture the current website content and business context.
- Identify structural, UX, SEO, and conversion issues.
- Create a prioritized roadmap for redesign and migration.

## Audit Steps

1. Inventory pages and assets
   - `index.html`, `products.html`, `industries.html`, `markets.html`, `quality.html`, `quote.html`
   - `images/` folder and any scripts or CSS embedded in pages
2. Extract business messaging
   - Company name, IEC, contact details, export claims, manufacturers, products, markets, certifications.
3. Analyze page intent
   - Homepage: hero, overview, trust, product preview, markets.
   - Products: detailed products, specifications, packaging, sourcing, CTAs.
   - Industries: use cases, sector mapping, product fit.
   - Markets: export corridors, ports, regional strength.
   - Quality: documentation, compliance, process flows, FAQs.
   - Quote: lead form, contact capture, WhatsApp links.
4. Evaluate UX and conversion
   - CTA placement and clarity
   - Trust signals and validation
   - Navigation, mobile behavior, page structure
5. Review SEO and metadata
   - Page titles, headings, content structure, internal links
   - Existing keyword usage and market relevance
6. Identify technical debt
   - Inline CSS/JS, duplicate content, non-responsive elements, form stub behavior
   - Missing modern architecture and static-export readiness

## Audit Deliverables

- Content inventory with page-level summaries
- Gap analysis for UX, design, SEO, and performance
- Recommended architecture and migration plan
- Quick wins for trust and conversion

## Audit Priorities

1. Preserve export-business context and manufacturer sourcing claims.
2. Keep all product and market detail accurate.
3. Eliminate duplicated content while maintaining SEO coverage.
4. Prioritize fast-loading, accessible, and mobile-first layout.
5. Define a modern page structure suitable for Next.js App Router.

## Notes

- Use the existing copy as source material, but rewrite for modern tone and clarity.
- Retain critical export/legal details like IEC code, GST, shipping terms, and documentation pack.
- Document any sensitive or unverifiable claims for later review.
- Prefer structured data and markup in the final implementation.
