# Jaydev Group - AI Agents & Working Norms

This document defines the strategic, design, and technical guidelines for rebuilding the Jaydev Group website into a premium, export-focused industrial B2B platform.

---

## Company Overview

**Jaydev Group**  
- **Location**: 911 RK Supreme, 150 Ft Ring Road, Rajkot, Gujarat 360005 · India
- **Founders**: Jitesh Vajir (Chairman/Founder), Darsh (Business Development), Meet Sheth (Director International Export)
- **IEC Code**: AAKCM4483G (Export-Import Registered)
- **GST**: 24AAKCM4483G1ZB (Available for B2B)
- **Contact**: +91 99875 39258 | +91 99784 79258 (WhatsApp preferred)  
  Email: sales@jaydevgroup.co.in

---

## Business Model

**Core Positioning**: India-based industrial chemical exporter and sourcing partner for global buyers.

- **Who We Are**: Premium manufacturer-backed sourcing partner (NOT a trader, NOT a reseller). We source exclusively from India's top-tier chemical manufacturers (GACL, Grasim, Reliance, DCM Shriram, Kutch industries).
- **What We Do**: Aggregate, certify, and logistics-manage bulk chemical exports to Africa, Middle East (GCC), Southeast Asia, and Europe.
- **Why Buyers Choose Us**: Reliability (long-standing relationships), volume capacity, export expertise, compliance & documentation, competitive pricing, timely shipments.

---

## Product Portfolio

### **Tier 1: Core Export Products** (High-volume, manufacturer-certified)
1. **Caustic Soda** - Source: Grasim, GACL, Reliance. Forms: Flakes (98%), Lye (48-50%), Pearl.
2. **Sulphuric Acid** - Source: GACL. Grades: 98%, 80%, 70%. Primary: Fertilizer, Mining, Metal Processing.
3. **SMBS (Sodium Metabisulfite)** - Source: GACL. Grades: Food, Tech, Photo. Key: Africa mining, Food preservation.
4. **Hydrogen Peroxide** - Source: Reliance. Concentrations: 35%, 50%. Applications: Textile, Paper, Electronics.
5. **PAC (Polyaluminium Chloride)** - Source: Kutch manufacturers. Forms: Liquid, Powder. Key: Water treatment, WTP projects Africa/GCC.
6. **Calcium Chloride** - Source: DCM Shriram, Reliance. Grades: Industrial, Oilfield, Food. Key: Oil & Gas, GCC drilling, Construction.

### **Tier 2: Specialty/Import Products**
- Zircon Sand (sourced/imported)
- Lauric Acid
- Decanoic Acid
- Epichlorohydrin (ECH)
- Chlor-alkali products (Liquid Chlorine, HCl 33%, Sodium Hypochlorite)
- Petrochemicals (Benzene, Hexane, MTO, Ethylene Glycol, Bitumen)
- PU systems (MDI, TDI, Polyols)
- Advanced materials (Refined Glycerine, Epoxy Resins)

---

## Target Markets & Corridors

1. **East Africa** (Kenya, Tanzania, Uganda, DRC, Zambia, Rwanda)
   - Industries: Mining (gold/silver), food processing, water treatment, textiles.
   - Key Products: SMBS (cyanide leaching), PAC (WTP), Caustic (mining).

2. **West Africa** (Nigeria, Ghana, Côte d'Ivoire, Senegal)
   - Industries: Food processing, textiles, construction, pharmaceuticals.
   - Key Products: Caustic (soap, detergent), SMBS (food), Calcium Chloride (food).

3. **GCC & Middle East** (UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman)
   - Industries: Oil & gas (drilling), desalination, construction, food processing.
   - Key Products: Calcium Chloride (drilling), PAC (desalination), Caustic (chemicals).

4. **Southeast Asia** (Indonesia, Malaysia, Thailand, Vietnam, Philippines)
   - Industries: Textiles, pulp & paper, food processing, petrochemicals.
   - Key Products: Caustic (textile, paper), H2O2 (bleaching), SMBS (food).

5. **Europe** (limited but growing; compliance-sensitive)
   - Industries: Fine chemicals, specialty applications, research.
   - Key Products: Specialty acids, advanced materials.

---

## Marketing & Brand Positioning

### **Core Brand Values**
- **Reliability**: Decade-long relationships with manufacturers; consistent quality.
- **Export Excellence**: Proven track record of timely, compliant shipments to 30+ countries.
- **Transparency**: Full COA, MSDS, manufacturer certifications, no hidden trader markups.
- **Global Logistics**: Hazira, Mundra, JNPT ports; Incoterms flexibility (FOB, CIF, CFR, EXW).

### **Visual & Messaging Rules**
- **Logo**: Use provided Jaydev Group logo (with network/hub motif) as primary brand asset.
- **Color Palette**: 
  - Primary: Navy (#0E2040) - Trust, professionalism.
  - Accent: Teal (#0B7A72) - Energy, chemistry.
  - Secondary: Gold (#B8720A) - Premium, partnership.
  - Neutrals: Off-white (#F4F7FB), Slate (#475569).
- **Typography**: Modern, clean sans-serif (e.g. Inter, Poppins). No decorative fonts.
- **Imagery**: Show **manufacturers only** (GACL, Grasim logos when used). No trader, no generic stock photos. Emphasize industrial/export authenticity.
- **Messaging**: Always link back to **manufacturer sourcing**, **export expertise**, and **compliance**. Avoid "middleman" language.

---

## 9-Phase Implementation Roadmap

### Phase 1: Knowledge Base Foundation ✅
**Deliverable**: Complete business model, positioning, and technical guidelines.
- Create/update AGENTS.md (this file)
- Create 9 skill files in `skills/` folder:
  1. jaydev-business-skill.md - Business model, value props, RFQ strategy
  2. chemical-trading-skill.md - Supplier management, pricing, compliance
  3. export-growth-skill.md - Market entry, lead generation, retention
  4. manufacturer-validation-skill.md - Authenticity, sourcing transparency
  5. ui-ux-pro-max-skill.md - B2B design patterns, layouts, responsiveness
  6. motion-design-skill.md - Framer Motion animations, performance
  7. seo-aeo-skill.md - Search optimization, AI discovery, schema
  8. conversion-optimization-skill.md - Forms, follow-up, retention
  9. website-architecture-skill.md - Tech stack, code organization, deployment

### Phase 2: Comprehensive Audit
**Deliverable**: Identify all gaps, issues, and opportunities.
- Review current Next.js codebase and content
- Audit products, markets, pages, images
- Identify UX issues (forms, CTAs, navigation)
- Identify design gaps (animations, 3D, visual hierarchy)
- Identify SEO gaps (metadata, schema, keywords)
- Compile audit report with prioritized fixes

### Phase 3: Architecture & Migration Planning
**Deliverable**: Validate structure and plan any needed reorganization.
- Confirm Next.js App Router setup aligns with vision
- Plan content model updates (if needed)
- Design component library patterns
- Map content migration path
- Prepare database schema (if blog/CMS planned)

### Phase 4: Design System & UI/UX
**Deliverable**: Premium visual system with brand tokens and component specs.
- Finalize color palette (navy, teal, gold, neutrals)
- Define typography scale (headings, body, labels)
- Create Tailwind custom config with brand tokens
- Build reusable component library (buttons, cards, forms)
- Design responsive layouts (hero, grid, sidebar patterns)
- Implement Framer Motion animation variants

### Phase 5: Content Rewrite & SEO Optimization
**Deliverable**: Export-focused, trust-building copy; metadata and schema.
- Rewrite homepage: headline, hero, trust section, CTA
- Rewrite product pages: specs, sourcing, applications, CTAs
- Create market/industry pages with regional insights
- Add SEO metadata (titles, descriptions, keywords)
- Implement schema markup (Organization, Product, FAQ)
- Create blog/content strategy outline

### Phase 6: Product Browsing & Details
**Deliverable**: Interactive product catalog with filtering and detail views.
- Implement product grid with filters (category, product type)
- Create product detail pages (dynamic routes)
- Add related product recommendations
- Implement image galleries with WebP optimization
- Add "Request Quote" CTAs per product
- Create extended catalog (Tier 2 products) section

### Phase 7: Advanced Features & Animations
**Deliverable**: Premium interactions, 3D effects, and visual appeal.
- Implement scroll reveal animations (Framer Motion)
- Add hover effects on cards and buttons
- Create page transitions (smooth fade between routes)
- Implement sticky header/navigation
- Add trust badge animations (float, pulse)
- Optional: 3D product visualizer or interactive world map
- Optimize animations for 60 FPS, accessibility

### Phase 8: SEO, AEO & Performance
**Deliverable**: Search visibility, AI discoverability, and speed optimization.
- Configure Google Search Console integration
- Set up GA4 tracking and conversion goals
- Implement XML sitemap generation
- Add internal linking strategy
- Create 5-10 blog posts (keyword-targeted)
- Optimize images: WebP, lazy-load, responsive sizing
- Run Lighthouse audit: target 90+ on all metrics
- Implement Web Vitals monitoring

### Phase 9: QA & Deployment
**Deliverable**: Production-ready site with quality assurance and launch.
- Accessibility audit (WCAG 2.1 AA)
- Mobile responsiveness testing (iOS, Android, tablets)
- Form testing (RFQ submission, error handling, success)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Security review (HTTPS, CSP headers, input validation)
- Performance profiling (bundle size, image optimization)
- Staging deployment + user testing
- Production deployment to Vercel
- Post-launch monitoring and support

---

## Skill Files Organization

Each skill file follows this structure:
1. **Purpose** - Why this skill matters
2. **Key Concepts** - Core knowledge
3. **Implementation Guide** - Step-by-step how-to
4. **Examples/Templates** - Ready-to-use code/copy
5. **Integration Points** - How it connects to other skills

### How to Use Skills
- **Reference Before Starting**: Before working on a task (e.g., "design homepage"), read the relevant skill(s).
- **Follow Patterns**: Use templates and examples as starting points.
- **Cite Principles**: Decisions should align with skill guidelines.
- **Iterate**: Skill files can be updated as learnings accumulate.

---

## Working Norms

### Code Quality
- ✓ TypeScript strict mode (catch bugs early)
- ✓ Component-driven design (reusable, testable)
- ✓ Semantic HTML (SEO, accessibility)
- ✓ Consistent naming (camelCase for JS, kebab-case for CSS classes)
- ✓ Meaningful commit messages ("Add product detail page" not "fix")

### Content Management
- ✓ Single source of truth (lib/content.ts)
- ✓ Data-driven components (render from JSON, not hard-coded HTML)
- ✓ Avoid duplication (link, don't copy-paste)
- ✓ Update dates on content changes (freshness signal for SEO)

### Design & Animation
- ✓ Purpose-driven motion (no animation just for looks)
- ✓ 60 FPS target (use GPU-accelerated properties)
- ✓ Accessibility first (respect prefers-reduced-motion)
- ✓ Brand consistency (use Tailwind tokens, not inline colors)

### Performance
- ✓ WebP images, lazy-load by default
- ✓ Code split by route (each page loads only its code)
- ✓ Monitor bundle size (aim for <200KB per route)
- ✓ Lighthouse 90+ (performance, accessibility, SEO)

### SEO & Content
- ✓ Metadata on every page (title, description, OG tags)
- ✓ Schema markup (Organization, Product, FAQ)
- ✓ Keyword research before writing
- ✓ Internal linking (strategic, contextual)

### Collaboration
- ✓ Consult AGENTS.md before starting a task
- ✓ Read relevant skill file(s) for context
- ✓ Ask questions (this document) rather than guessing
- ✓ Document decisions (why did we choose this approach?)

---

## Key Metrics (Success Criteria)

| Metric | Target | Reason |
|--------|--------|--------|
| Organic monthly visitors | 2,000+ | Growth signal; SEO working |
| RFQ form submissions | 20-30/month | Lead generation |
| Quote-to-order conversion | 20-30% | Sales effectiveness |
| Lighthouse score | 90+ (all categories) | Performance + accessibility |
| Page load time | <2 seconds | User experience |
| Repeat customer rate (6mo) | 40%+ | Product/service satisfaction |
| Mobile traffic % | 50%+ | Mobile-first market |

---

## Files & Ownership

- **AGENTS.md** - This file. Master coordination guide.
- **README.md** - Quick start, build commands, deployment.
- **skills/** - Knowledge base (9 skill files).
- **app/** - Next.js pages and routes.
- **components/** - Reusable React components.
- **lib/content.ts** - Single source of truth (products, markets, copy).
- **public/images/** - Product, market, industry imagery (WebP format).
- **legacy/** - Archive of original static HTML (reference only).

---

## Future Updates

This document will be updated as:
- New skills or patterns emerge
- Decisions are made (document the "why")
- Best practices evolve (e.g., new animation technique)
- Market conditions shift (e.g., new target regions)

**Last Updated**: [Current Date]  
**Next Review**: [Planned Review Date]

---

## Questions & Support

Refer to the relevant skill file for detailed guidance. If an issue spans multiple areas, consult:
1. **Business**: jaydev-business-skill.md
2. **Sales/Pricing**: chemical-trading-skill.md
3. **Growth/Markets**: export-growth-skill.md
4. **Design/UX**: ui-ux-pro-max-skill.md + motion-design-skill.md
5. **Tech/Performance**: website-architecture-skill.md
6. **Content/SEO**: seo-aeo-skill.md
7. **Forms/Conversions**: conversion-optimization-skill.md
  - QA checklist
  - Performance recommendations
  - Final acceptance report

## Working Norms

- Always read the workspace contents before editing.
- Prefer small targeted changes over broad rewrites.
- Use reusable data structures and avoid hard-coded copies when possible.
- Keep outputs concise and actionable.
- Prioritize business goals: export leads, RFQ conversion, trust, and modern branding.

## Files and Ownership

- `AGENTS.md` - this coordination guide.
- `skills/*.md` - process instructions for each discipline.
- `README.md` - project operating notes and quick run instructions.
- `index.html`, `products.html`, `industries.html`, `markets.html`, `quality.html`, `quote.html` - source content to migrate.

## Future Use

When working on this repository, first consult `AGENTS.md` and the relevant `skills/*.md` file before starting a change.

This ensures consistent quality across website redesign, migration, SEO, and performance work.