# Jaydev Design System Skill

> Living source of truth for the Jaydev Group website's visual + technical system.
> **Self-maintenance protocol:** Whenever a design token, brand decision, component
> pattern, or tech-stack choice changes during a session, update THIS file in the same
> turn. Treat it as code - stale entries are bugs. Append a dated line to the Changelog.

## Brand

- **Group**: Jaydev Group - founded by **Jitesh Vajir** (Founder & MD), HQ Rajkot, Gujarat.
- **Business units**: Jaydev Multicomm Pvt. Ltd. (export & import) · Jaydev Pharma & Intermediates LLP (domestic).
- **Branches**: Rajkot (HQ), Ahmedabad, Mumbai, Lagos (Nigeria).
- **Tagline**: "Connecting Chemistry, Creating Solutions".
- **Logo (LOCKED - exact file, no recreation)**: use the PNG at
  `public/brand/jaydev-group-logo.png` (dark wordmark, for light backgrounds) and
  `public/brand/jaydev-group-logo-light.png` (white wordmark, for ink backgrounds).
  Favicon `app/icon.png`, Apple icon `app/apple-icon.png`. Rendered via `<Image>` in
  `components/brand/Logo.tsx` (`LogoLockup({dark})`). Do NOT substitute an SVG
  recreation, the JM monogram, or any AI-generated mark.
  **The mark is `#14B04A`.** It was `#26FF00` (neon lime, 1.36:1 on white - unusable);
  the PNGs were remapped on 2026-08-30. Pre-rebrand originals are kept in
  `brand-source/pre-green-rebrand/`. `brand-source/*.jpg` is a lossy JPEG master and
  was deliberately left untouched - a vector/lossless master is still wanted.

## Color tokens (white-first, lime + pure-neutral ink)

Source of truth is `tailwind.config.ts`.

| Token | Hex | Use |
|-------|-----|-----|
| lime.DEFAULT | #39CE22 | the logo mark's own hue (112 deg). Fills and marks only on light (2.09:1) |
| lime.text | #1B7D1D | all lime text on light + fills under white text (5.25:1) |
| lime.light | #6DE250 | text/icons on the dark surfaces (11.5:1) |
| lime.hover / bright / deep | #33B81E / #8DEF6C / #15561A | hover, gradient head, pressed |
| lime.tint | #EAF8E7 | pale brand plate - the light alternative to a dark band |
| ink.deep / DEFAULT / raised / mid | #080808 / #101010 / #1A1A1A / #242424 | **0% saturation**, matching the black wordmark |
| ink.muted / soft / subtle | #454545 / #5C5C5C / #6E6E6E | text ramp, 9.6 / 6.7 / 5.1 on white |
| line.* | #E5E5E5 / #EBEBEB / #F2F2F2 | borders |
| surface.* | #F7F7F6 / #FAFAFA | alternating section grounds |
| gold.* | #C9922A #E8B84B #A0751F #FEF3E2 | **accreditation badges ONLY** |
| white | #FFFFFF | the default ground |

### THE HUE IS THE BRAND. Do not drift off it.
The logo mark is a **lime at hue 111**. An earlier build used an emerald at 141 -
thirty degrees away, a different green family - and no amount of lightening ever
made it read as the logo. If a new green is ever needed, derive it at 108-124.

### THE SITE IS LIGHT. There are no dark section grounds.
This was the real fix, and it took three rounds to find because each one adjusted
the *colour* of the dark bands instead of questioning whether they should exist.

Measured on the home page before: **46% of its 20,000px height was a dark surface** -
the cinematic hero alone was 5,726px (29%), the footer 2,803px (14%). No colour
choice survives that ratio; the page reads dark whatever the hex is.

Now: **0% on every page.** The hero is white with the faintest lime breath
(`--grad-hero`), the footer is `surface` with a 2px ink top rule, the final CTA is a
`lime.tint` plate. Section grounds are, in order of preference: `white`, `surface`,
`lime.tint`.

Dark survives only at small scale, where it is an accent rather than a ground:
`.btn-ink`, filter chips, the product formula badge, the price card, and the
photographic slug-page heroes where a scrim is needed for legibility over an image.

A new full-width dark band needs a real argument. The brand's logo is black type on
white; the site matches it.

### Ink is 0% saturation
Tinting the darks toward the accent was tried twice and failed twice: it makes the
dark read as coloured, and it shrinks the chroma gap so the accent stops popping.
Same rule for glows - they are pale (`rgba(238,246,236,…)`), never saturated, because
near-black has no base colour to dilute an overlay and a saturated glow just stains it.

### Contrast rules (measured)
- `lime.DEFAULT` 2.09:1 on white - fill colour, never text, never behind white text.
- Lime text on light -> `lime.text`. Lime on dark -> `lime.light`.
- `.btn-lime` is engraved `#101010` on the lime gradient; worst stop 9.08:1.
- Focus rings on light use `lime.text`.
- No `gray-*` anywhere - use the ink ramp.

## Named gradients (`globals.css :root`)
Never inline a brand gradient in a component - add it here and reference the var.
- `--grad-hero` - the cinematic dark hero. Its **final stop #0B1C13 is a contract**:
  `--grad-bridge` must start on it or a seam appears at the join.
- `--grad-bridge` - dark->white. Never a 2-stop black->white (sRGB muds through
  grey); the mid stops hold the transition on the green hue line. **Carries no text.**
- `--grad-ink`, `--grad-ink-panel` - dark panels and `.btn-ink`.
- `--grad-cta` / `--grad-cta-hover` - the primary button.
- `--grad-text` (on light) / `--grad-text-dark` (on ink) - `.text-gradient-green`.
- `--grad-rule`, `--grad-progress` - divider and ProcessFlow line.
- `--glow-lg/md/sm` - radial glows over dark. Two stops, not one: a single-stop
  green->transparent gives a hard chromatic edge because saturated green
  desaturates toward grey abruptly. The mid stop lands it softly.

Ink is ~3x darker in luminance than the old navy, so shadow alphas are stepped
down one notch from the navy-era values (`rgba(6,18,11,x)`).

## Typography
- Headings: **Plus Jakarta Sans** (`font-jakarta`), extrabold.
- Body: **Inter** (`font-inter`).

## Iconography (NO EMOJI)
- All icons come from **lucide-react** via `components/Icon.tsx` (`<Icon name="..." />`).
- Emojis are banned everywhere (UI, data files, content). Data objects carry an `icon`
  string = a lucide component name (e.g. `'Droplets'`), never an emoji.
- When adding an icon, register it in the `MAP` inside `components/Icon.tsx`.

## Motion / 3D
- **Hero (CURRENT)**: **scroll-driven living particle field** - `components/ScrollHero.tsx`.
  GSAP ScrollTrigger pins the scene; ~760 additive-blended Canvas 2D particles morph through
  four collective states (tent-blend of weights from scroll progress) that enact the verbs:
  Sourced = phyllotaxis cluster · Documented = ordered lattice **+ blueprint-blue constellation
  links along grid neighbours** · Shipped = time-advanced rivers of light with leader trails ·
  Delivered = fan-out clusters. **Per-act colour shift** (via
  `STATE_COL` blended by weights). Action words stamp in over it; resolves into the
  "From Rajkot to 30+ countries" CTA. NO map / arc / single ship (user rejected that as generic).
  Headline is full opacity on load and fades out as scrolling begins (`1 - ramp(p,0.02,0.12)`),
  NOT a fade-in (regression: don't key it to `ramp(p,0,…)` - that hides it at the top). Stats
  moved to a separate ink band right after the hero in `HomeClient`.
  - **Pin pattern (do not regress):** pin the scene element itself with `pin:true` + `end:'+=2600'`.
    Do NOT use a tall outer track div + `pin:innerChild` + `end:'bottom bottom'` - the pin-spacer
    overflows the track and the scrub range collapses (progress jumps to 1 immediately).
  - **StrictMode leak (do not regress):** the GSAP import is async; guard with a `cancelled` flag
    and kill the trigger if cancelled, else dev double-mount stacks two pins (pin-spacer = 5200).
  - Wire `lenis.on('scroll', ScrollTrigger.update)` (Lenis exposed at `window.__lenis` by
    `SmoothScroll`) so the pin tracks smooth scroll.
  - Reduced-motion: `progress=1` static (ship arrived + CTA shown), no pin. The Claude Preview
    browser forces `prefers-reduced-motion: reduce`, so to verify the animation append `?motion`
    to the URL (escape hatch in the `reduce` check) and drive `window.scrollTo` over 0→2600.
- **Cinematic narrative**: `components/Philosophy.tsx` - dark "single obsession in darkness"
  section (adapted from a carbon-wheel reference to chemistry). Monumental radial-spoke disc
  (repeating-conic-gradient masked to a rim, `jd-spin` 140s) cropped off the right edge; numbered
  engineering-notation left rail (01 The Source / 02 The Proof / 03 The Reach) whose active item
  tracks scroll via IntersectionObserver; full-bleed panels reveal from blur as you descend
  (serif-italic titles, green lede, metrics); precision crosshair cursor on mousemove. Placed
  right after the hero/stats, before Sourcing Ecosystem. Reverence-first copy, specs second.
  - Disc carries **chemical product names orbiting between the spokes** (`DISC_NAMES`, positioned
    by trig % inside the spinning container so they rotate with it).
  - **Sticky rail (do not regress):** the section must NOT have `overflow-hidden` (breaks
    `position: sticky`). The bleeding disc is clipped by an inner `absolute inset-0 overflow-hidden`
    wrapper instead. Rail is `sticky top-1/2 -translate-y-1/2`; active pillar tracked by an
    IntersectionObserver with a centre-line `rootMargin: '-50% 0px -50% 0px'`.
- **Featured carousel**: `components/FeaturedCarousel.tsx` - auto-scrolling CSS marquee
  (`animate-jd-marquee`, pause on hover, `motion-reduce:animate-none`) of the 6 featured products.
  Sits BEFORE the Sourcing Ecosystem section. Uses `featuredImage()` (editorial art:
  `FEATURED_IMAGE` map in `lib/content.ts` → `/images/{causticsoda,sulphuricacid,pac,smbs,h2o2,
  calciumchloride}.webp`); product cards / detail pages keep their real photo via `productImage()`.
- **Mobile**: ScrollHero pin uses shorter `end:'+=1700'` + `pinType:'fixed'` + `anticipatePin:1`
  under 768px; Philosophy panels `min-h-[60vh] sm:min-h-[78vh]`; hero verb-recap wraps.
- **Hero finale moved (do not re-add):** the old hero "resolved CTA" (From Gujarat → 30+ countries
  + Sourced·Documented·Shipped·Delivered recap + buttons) AND the separate navy Stats band were
  removed and merged into Philosophy as a **4th panel** ("04 / Worldwide", after The Reach) with the
  4 StatCounters + CTA buttons. ScrollHero now ends on the settling particle field (no CTA). Killed
  the dead space. The Philosophy IntersectionObserver/rail now tracks 4 panels.
- **ScrollHero retired from home (do not re-add unasked):** the particle hero was removed; the page
  now OPENS on the Philosophy section (its first panel gets `pt-32 sm:pt-36` to clear the fixed
  header). `ScrollHero.tsx` kept on disk but no longer imported. Disc carries 24 product names now
  (was 12) so the spoke wheel reads full, not empty.
- **Philosophy additions**: compact looping action-word band (Sourced→Documented→Shipped→Delivered,
  1.1s cycle) at the very top; producer marquee ("Backed by India's leading producers") merged into
  the "01 The Source" pillar (old white Sourcing Ecosystem section deleted). Section background is
  `--grad-hero` (green-tinted ink). Disc names: radius
  25% + smaller font so none overflow the rim.
- **Claim honesty**: "Countries Served" → "Export Markets" everywhere (the "served" claim was
  flagged as overstated). "From Gujarat to 30+ countries" headline stays (reads as reach, not a
  served-count). Watch for "served" creeping back into stats/markets copy.
- **Business Units ("Two Arms, One Standard") removed from home** - lives on the Group page only.
- **Footer compressed**: grid is now 6-col on lg (brand span-2 + Products + Markets + Company + RFQ);
  Company moved beside Markets instead of stacked under it.
- **Group page**: Jitesh filtered out of the Leadership & Team grid (he's the founder card up top,
  which now has a "Connect on LinkedIn" link to https://www.linkedin.com/in/jitesh-vajir-2471993b6/).
- **Markets cards**: removed `min-h` reservation hacks; equal height comes from grid-stretch +
  `flex-col h-full` + `mt-auto` CTA, killing the dead space between High-Demand and Main Ports.
- **Products page = Export/Import toggle** (`ProductsClient.tsx`): segmented control in the navy
  header switches `mode: 'export' | 'import'`. Export = full `products` catalog (search + category
  pills). Import = `IMPORT_PRODUCTS` (Zircon Sand, Lauric C12, Decanoic C10) with search, "Import"
  badges, "Enquire to Import" CTA (no detail page - import items aren't in `products`). The old
  "Import Portfolio" grid was removed from the Group page (AboutClient) → replaced with a one-line
  callout linking to /products. `QuoteClient` now resolves import ids too (prefills name + adds an
  "Import enquiry (into India)" note). Products metadata updated for export+import.
- **Why Us merged into Philosophy**: the standalone "Why Global Buyers Choose Jaydev" section was
  removed; each Source/Proof/Reach pillar now carries a `points: string[]` (checkmark list) drawn
  from the old Why-Us cards (incl. the 24-hour CIF quote promise on The Reach).
- **Home order (final)**: Philosophy (action band → 01 Source [+points +producer marquee] → 02 Proof
  [+points] → 03 Reach [+points] → 04 finale +stats +CTA) → bridge → Featured carousel → Process
  Flow → Industries → Trade Terms → Trust band (Presence+Certs) → Final CTA. (~8 sections, down from ~13.)
- **Optional remaining merge**: Process Flow could become a dark "05 The Passage" panel inside
  Philosophy, but it's a distinct interactive component (not redundant) so left as its own section.
- **Home order (current)**: Philosophy (opens page; ends with 04 finale + stats + CTA) → bridge → Featured carousel →
  Sourcing Ecosystem → Business Units → Process Flow → Industries → Why Us (4 pillars) →
  **merged Trust band (Presence + Certifications on one ink section)** → Trade Terms → Final CTA.
  (Export Reach/TradeRouteMap section removed; Presence + Certifications merged for compression.)
- **DELETED (unused, do not recreate)**: `HeroVisual.tsx`, `ScrollHero.tsx`, `TradeRouteMap.tsx`
  and `public/world-land.json` + `public/world-countries.json` were removed in the cleanup pass -
  none were imported anymore. The hero is now the Philosophy section; there is no particle/map hero.
- **History/why (do not regress):** A true WebGL R3F hero was attempted but `@react-three/fiber`
  threw `Cannot read properties of undefined (reading 'ReactCurrentOwner')` at runtime - a
  React 18/19 internals mismatch (Next 15 + react-reconciler). We removed three.js/R3F entirely.
  If true WebGL is ever revisited, fully align React + react-dom + react-reconciler versions
  first and test in the browser, not just the build.
- Canvas/visual components must be `dynamic(() => import(...), { ssr: false })`.
- Animated flows: `components/ProcessFlow.tsx` (scroll-driven sourcing→export journey).
  Build more of these per use-case as the site grows.

## Catalogue download
- PDF lives at `public/Jaydev-Multicomm-Catalogue.pdf` (compressed WhatsApp catalog).
- "Download Catalogue" CTA appears in: header (desktop + mobile), home hero, home final CTA,
  products CTA, footer Quick-RFQ. Uses `<a download>` + `<Icon name="Download" />`.

## Component conventions
- `.card-white` = white card on light bg (default). `.product-card` = catalog grid card.
  (`.card-navy`, `.card-premium`, `.btn-outline`, `.hero-grid` were dead and are deleted.)
- Buttons: `.btn-green` (primary), `.btn-ink`, `.btn-ghost-white` (on dark).
- **Add `on-ink` to every dark section wrapper** - it flips `.section-label`,
  `.text-gradient-green` and focus rings to their on-dark variants automatically,
  instead of overriding them inline at ~40 call sites.
- Section intro pattern: `<span className="section-label">` → extrabold ink `<h2>` → gray sub.
- Floating WhatsApp button bottom-right on key pages.

## Information architecture
- Nav: Home · Group (/about) · Products · Industries · Markets · Get Quote.
- **Industries** use PCIPL-style super-group filtering (`superGroups` in `lib/content.ts`):
  Water/Mining/Energy · Chemical Synthesis · Coatings/Adhesives/Polymers (CASE) ·
  Home & Personal Care (CARE) · Agro/Food/Pharma · Textile/Pulp/Paper.
- Each industry has `icon`, `superGroup`, `seoKeywords`, `productIds`, `additionalProducts`.
- Target: cover ALL sourceable chemicals, mapped to industries, SEO-friendly.

## Data layer (`lib/content.ts`)
- `GROUP`, `BUSINESS_UNITS`, `BRANCHES`, `IMPORT_PRODUCTS` (Zircon Sand, Lauric C12, Decanoic C10).
- `products` (export catalog), `categories`, `industryData`, `superGroups`, `marketData`.
- `IMAGE_MAP` / `INDUSTRY_IMAGE_MAP` map ids → `/images/*.webp`; unmapped → icon fallback.

## Positioning tagline
- "Your Single-Source Supply Partner for Industrial Chemicals, Minerals, Solvents, Acids,
  Alkalis, Water Treatment Chemicals & Specialty Raw Materials." Used on: home tagline strip
  (below stats), products page header, footer blurb. Reuse where it fits.

## Stock imagery (sourcing method)
- When local photos run out, source from **Wikimedia Commons API** (license-safe):
  `commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap+<q>&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json`.
  Filter results whose file title contains the keyword to avoid junk, then download the
  thumburl. Verified images live in `public/images/` (fertilizer, paint, plastic, plant,
  zircon). Always eyeball each before committing - top search hits are often off-topic.

## World map (Export Reach)
- `components/TradeRouteMap.tsx` draws real land from `public/world-land.json` (Natural Earth
  110m land, simplified to ~67KB) under animated trade arcs, region-cropped to India↔Africa↔
  GCC↔SE Asia. Fetched at runtime, not bundled.

## SEO
- Standalone industry pages at `/industries/[slug]` (SSG) with per-page `generateMetadata`
  (title, description, keywords from `seoKeywords`, canonical) + Service JSON-LD + internal
  cross-links. Listed in `sitemap.ts`. Home tiles link straight to these.

## Buttons (premium)
- `.btn-green` = bright emerald gradient with engraved dark text + inset highlights + green
  glow (the molten-gold construction, recoloured). `.btn-ink` = deep ink gradient.
  `.btn-ghost-white` = frosted glass (backdrop-blur) for dark bg. All share a hover sheen
  sweep + spring lift. Defined in `globals.css`. Keep this premium feel for any new buttons.

## Product images
- ~35 products have unique real photos in `public/images/products/<id>.jpg` (sourced via
  Wikimedia API, each visually verified). Mapped in `IMAGE_MAP`. Remaining commodities fall
  back to `CATEGORY_IMAGE` (some intra-category repeats - replace as real photos are found).
  Never auto-trust a Commons title; structure diagrams & wrong chemicals slip through.

## Exporter conventions (benchmarked vs aljabalglobal.com)
- **Top utility bar** in Header (address · email · WhatsApp · LinkedIn), collapses on scroll.
- **Hero** = full-bleed industrial port photo (`/images/logistics-port.png`) + molecule canvas
  (mix-blend-screen) + navy gradients. Combine "real exporter" imagery with the chemistry signature.
- **Trade & Payment Terms** section on home: LC 100% at sight via Dubai / 30%+70%; incoterms;
  documentation; MOQ & packing; lead times. Payment terms are a key B2B-exporter trust signal.
- Still worth adding (from competitor): Past-Shipments gallery (use EXIM data files), Today's
  indicative price / "request price", Articles/Blog, Chairman's message, fixed social rail.

## Blog, FAQ, bundling & CTA policy
- **Blog/Insights**: `lib/articles.ts` → `/articles` (listing) + `/articles/[slug]` (SSG, Article
  JSON-LD). Add posts to the array. **FAQ**: `lib/faqs.ts` → `/faq` with FAQPage JSON-LD (AEO).
- **Product bundling**: variant forms (flakes/lye/prills) live on ONE product via the `variants`
  field (e.g. `caustic-soda`, `caustic-potash`). Don't split forms into separate products.
- **CTA policy (targeted, not everywhere)**: each section gets ONE primary forward action.
  Catalogue lives in header + hero + footer only. WhatsApp = global floating button + social
  rail + header (not repeated inline in every section). Product detail = "Request Today's Price"
  (WhatsApp) + "Get CIF Quote" (form). Don't re-add removed duplicate buttons.
- **Today's price**: per-product "Request Today's Price" widget (WhatsApp, prefilled) in
  ProductDetailClient sidebar.
- **Social rail**: `components/SocialRail.tsx` fixed left edge (LinkedIn/WhatsApp/Email), global.
- **Founder's message**: signed block on the Group page (AboutClient).

## Card CTA pattern (industries & markets)
- Do NOT put identical full button pairs on every card. Use the editorial pattern:
  one directional text-CTA ("Request a quote for {X}" with a circular arrow that fills on
  hover) + a compact icon-only WhatsApp circle. Lighter, less templated.

## Catalogue scale
- 103 products across 9 categories (added `surfactants` + `minerals`). New products use
  CATEGORY_IMAGE fallbacks (no unique photos). 139 total static pages. Keep expanding the
  `products` array; each entry auto-generates an SSG page + sitemap entry.

## Product display (image-free, formula-led)
- Products listing, product detail hero, related products, and industry-page product cards
  use an **ink formula badge** (the chemical formula in green mono) as the visual identity -
  NOT photos. Reason: most commodities only had generic/duplicate fallback images. Keep this.
- Home featured products keep their (good, unique) photos. Don't strip those.
- Products page has **two filter axes**: By Category + By Industry (reverse map built from
  `industryData.productIds`). All new products are mapped into industries so the filter works.
- Founder/team photos: `GROUP.founderImage` + `COMPANY.team[].image` → render `<Image>` when
  present, else initials. Jitesh's photo path: `public/brand/jitesh-vajir.png`.

## Integrity note - EXIM data is NOT our shipments
- The `Exim data/*.xlsx` files are purchased MARKET trade-intelligence (other exporters'
  shipments; seller column ≠ Jaydev). NEVER present them as Jaydev's own past shipments.
  A real Past-Shipments gallery needs the client's own invoices/BLs. Do not fabricate.

## Founder photo
- `GROUP.founderImage` = `/brand/jitesh-vajir.png`; also on COMPANY.team[0].image. The file
  must be placed at `public/brand/jitesh-vajir.png` (user-supplied portrait). Renders in the
  founder card, founder's-message block, and team grid (AboutClient).

## Products page (final form)
- Single smart filter: search (name/CAS/formula/use) + ONE category dropdown. No industry
  filter (Industries is its own page). Cards are editorial: large faint watermark formula,
  category accent dot, inline formula·CAS, no navy "token" badges, no photos. Detail pages &
  industry product lists also use formula-led layout, not stock photos.

## Hero (restructured - premium molecular centerpiece, NO stock photo)
- Deep-ink hero: layered radial glows + `.hero-grid` dot pattern. Left = eyebrow,
  gradient headline, sub, 2 CTAs, trust chips. Right (lg) = `HeroVisual` honeycomb molecule
  inside a glowing containment with two dashed orbit rings (`animate-jd-spin` / `-rev`) + two
  floating glass intel cards (`animate-jd-float`). Integrated glass stats bar at the bottom
  (replaced the old separate white stats section). Hero ≈ 1011px (one viewport).
- **HeroVisual canvas gotcha (fixed):** ResizeObserver re-fires after first paint and
  `canvas.width=` CLEARS the canvas; if rAF is throttled the molecule vanishes. Fix: `resize()`
  bails when dimensions are unchanged AND calls `paint()` once so a frame survives. Keep this.
- Verified via Claude Preview at 1440px: molecule glows, cards positioned, stats integrated.

## Hero refinements (keep)
- NO hard circle outlines behind the molecule - only soft blurred green halos
  (`bg-green/[0.08] blur-[110px]`). The user disliked the bright ring; do not re-add solid/dashed
  rings around `HeroVisual`.
- Left column is intentionally lean: uppercase eyebrow tagline, tight headline, ONE concise
  sub-sentence (no founder bio in hero - that's on /about), 2 CTAs, 3 trust chips under a
  hairline divider. Don't pad it back into a long paragraph.
- Preview-tool caveat: the Claude Preview headless capture throttles rAF + framer-motion mount
  animations, so home screenshots often come back blank/white even though the DOM is correct.
  Verify via `preview_inspect`/`preview_eval` (check h1 + section bg), not just screenshots.

## RFQ journey (guided wizard)
- `/quote` (`QuoteClient.tsx`) is a 3-step wizard: 1) Product (name, quick-select, qty, unit,
  packaging) 2) Shipping (port, country, incoterm pills, notes) 3) Your Details (name, company,
  email, phone) + a live review summary. Stepper with green check-marks + progress lines,
  per-step validation gating the Continue/Submit button, framer-motion slide transitions,
  prefill from `?product=/industry=/market=`, and a WhatsApp fallback that auto-fills from form
  state. Keep the wizard; don't revert to a single long form.

## Premium polish pass
- **Lenis** smooth scroll: `components/SmoothScroll.tsx` (rAF loop, disabled on reduced-motion),
  mounted globally in `layout.tsx`.
- **Marquee** logo strip for Sourcing Ecosystem (`.animate-jd-marquee` + `.marquee-mask`,
  duplicated list, pause-on-hover). No grid.
- **Palette restraint**: removed rainbow category colors - featured cards use one neutral
  `catChip`; ProductsClient uses a single green accent dot. Keep palette to ink + green +
  neutrals (gold only for accreditation, #25D366 only for WhatsApp).
- All `<Image fill>` now carry `sizes`; OG/Twitter image = `/brand/logo.png`.
- Deferred (bigger lifts): GSAP ScrollTrigger pinned story, bento layouts, display typeface,
  real photography. Do these next for the final 10%.

## Changelog
- 2026-06-18: White-first redesign locked. Molecular-square logo locked. Group-hub scope
  locked. Emojis removed → lucide icon system. Industries expanded to 12 across 6 super-groups.
  Import portfolio added.
- 2026-06-18 (later): Removed WebGL R3F hero after runtime ReactCurrentOwner crash; replaced
  with bulletproof Canvas pseudo-3D `HeroVisual.tsx`. Uninstalled three/@react-three/*.
  Added catalogue PDF download across header, hero, CTAs, products, footer.
- 2026-06-18 (later 2): Logo switched to exact PNG (`public/brand/logo.png`) everywhere, no
  SVG/AI recreation. Fixed StatCounter (animation was cancelled by a stale dep → showed 0).
  Every product/industry now gets a photo via `productImage()` + `CATEGORY_IMAGE` +
  `INDUSTRY_IMAGE_MAP` (all 12). Buttons forced single-line (`whitespace-nowrap`). Markets
  cards equalised (flex h-full, CTA mt-auto). Team contacts: Meet→mailto marketing@, Darsh→
  WhatsApp with prefilled enquiry.
- 2026-06-18 (later 4): Real world-map backdrop in TradeRouteMap (world-land.json). Standalone
  SEO industry pages with metadata + JSON-LD + sitemap. Sourced real stock images (fertilizer,
  paint, plastic-pellets, refinery, zircon) via Wikimedia API; remapped agro/paints/plastics/
  intermediates. Market grid min-height bumped to 17.5rem so all card sections align. Removed
  dead BUSINESS_UNITS href field.
- 2026-06-18 (later 3): Hero molecule redesigned as structured honeycomb/graphene lattice
  (`HeroVisual.tsx`) - reads as a real chemical structure. TradeRouteMap rebuilt: responsive
  DPR canvas, dotted-grid backdrop, region-zoomed projection, glowing animated arcs,
  de-collided labels. Markets card sections aligned via min-heights. Positioning tagline added.
  Global `FloatingWhatsApp` (was home-only). `.no-scrollbar` utility added. Quote form now
  prefills from `?industry=` and `?market=` params.
- 2026-08-30: **Green/ink rebrand.** navy #0E2040 -> ink #08150E (green-tinted
  near-black, same hue line as the green); gold #C9922A -> green #0FA043 as the
  accent; gold demoted to accreditation badges only. Tokens renamed
  `navy.*`->`ink.*`, `gold.*`->`green.*` (423 class sites); `navy.mid` split into
  `ink.muted` (text on light) and `ink.mid` (dark surface). Added a named gradient
  system in `:root` + the `.on-ink` scoping class. Neutral borders retuned off the
  slate tint onto `line.*`/`surface.*`. Semantic-green collisions resolved (see the
  three-greens rules above). Logo/favicon remapped #26FF00 -> #0FA043; added
  `app/manifest.ts`, `app/apple-icon.png`, and a `viewport.themeColor`.
  Replaced all 103 `gray-*` uses with the four-step ink ramp (`ink-subtle`/`ink-soft`/
  `ink-muted`/`ink`), clearing the pre-existing `gray-300`/`gray-400` failures
  (1.47:1 / 2.54:1) and the same bug in the RFQ email. Verified 0 contrast failures
  across 8 routes by composited-background sweep.
  Fixed six live WCAG failures the gold palette had been carrying (`text-gold` 2.75:1,
  `bg-gold text-white` 2.75:1, `.section-label` 2.75:1, `.text-gradient-gold`,
  `text-gold-dark` 4.15:1, and the focus ring). Rewrote `app/not-found.tsx`, whose
  CTA had no background at all (`bg-teal`/`shadow-soft` were never defined).
- 2026-08-30 (later): Brand green lightened `#0FA043` -> **`#14B04A`** to match the
  logo - the first pick read too dark. Knock-on: `green.DEFAULT` drops to 2.86:1 on
  white, so the 14 on-white green icons moved to `green.dark`, and the focus ring
  moved to `green.dark` (1.4.11 needs 3:1). The CTA gradient tail lifted with it and
  its worst stop actually improved to 6.03:1. Logo/favicon/apple-icon re-derived from
  `brand-source/pre-green-rebrand/` so the artwork and the UI green stay identical.
- 2026-08-30 (later 2): `green.dark` `#0A6E2E` -> `#0B8136`. The two prior attempts
  lightened `green.DEFAULT`, which barely moved anything - measuring the live DOM
  showed `green.dark` was rendering ~95 of ~100 visible green elements and DEFAULT
  only ~20 fills. Now at the AA floor (see above). **Gotcha: this project does not
  hot-reload `tailwind.config.ts`** - a colour change there needs the dev server
  restarted and `.next` cleared, or the old bundle keeps serving and the change
  looks like it did nothing.
- 2026-08-30 (later 3): **Dark surfaces de-tinted.** The green-tinted inks read as
  dark green and killed the accent (see above). Ink ramp rebuilt neutral
  (#080909 / #0F1211 / #151917 / #202423), light neutrals and the text ramp
  neutralised to match, `--grad-hero` / `--grad-bridge` / `--grad-ink` /
  `--grad-ink-panel` redrawn without hue, shadows neutralised, glow alphas cut ~45%,
  favicon/apple-icon re-derived on the neutral ink. Green tokens unchanged - the
  accent did not need fixing, its background did.
- 2026-08-30 (later 4): De-tinting the inks was necessary but not sufficient - the
  hero still read green because the radial glows and the spoke disc were saturated
  green over a near-black ground, compositing back to ~30% saturation. Glows and disc
  moved to pale `#C8EBD6`; composited surface now ~9%. See the glow table above.
- 2026-08-30 (later 5): **Brand foundation rebuilt.** Root cause of every previous
  round: the accent was an emerald at hue 141 while the logo mark is a lime at 111.
  Rebuilt on the logo's hue (`#39CE22`), ink taken to pure 0% neutral, and the
  structure changed from eight dark page-bands to two (hero + footer) - every page
  header is now light. Logo, favicon and apple-icon re-derived to the lime.
  Brand foundation page: https://claude.ai/code/artifact/50c4d14f-4c6d-4291-b77e-68dd10000140
- 2026-08-30 (later 6): **Dark grounds removed entirely.** Measurement showed 46% of
  the home page was dark surface; the hero (5,726px) was the single biggest block and
  had survived three recolours untouched. Philosophy hero converted to a light
  "technical drawing" treatment - white ground, ink linework for the spoke disc, ink
  serif display, lime lede. Footer converted to `surface` with an ink top rule (and
  switched to the dark-wordmark logo). Final CTA became a `lime.tint` plate. Bridge
  gradient retired to a plain spacer. `gold.dark` darkened to #7A5816 so accreditation
  pills still pass on light. Every page now measures 0% dark ground, 0 contrast failures.

## Trade terms - drawn, not tabulated (`components/TradeTerms.tsx`)
An incoterm is not a label, it is the point on the journey where cost and risk pass
to the buyer. That is spatial, so the section leads with a **responsibility chart**:
six stages across (plant -> inland -> load port -> on board -> ocean -> destination),
one bar per term showing how far we carry the shipment. Clicking a term explains it.
- EXW reaches stage 0, FOB stage 3, CFR and CIF stage 5.
- **CIF reaches exactly as far as CFR** - the difference is cover, not distance - so
  it renders as a hatched overlay plus an INSURED badge, never a longer bar. Drawing
  it longer would be wrong.
- Below the chart: the three numbers a buyer decides on (MOQ, quote turnaround,
  transit), then payment as its own bordered block, then ports/packing/documents as
  compact chips.
- Hexagon lattice watermark (benzene, tiled) behind the chart, radial-masked so it
  fades out where type begins. Structure, not wallpaper.
