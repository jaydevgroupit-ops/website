# Jaydev Group - website

Next.js 15 site for Jaydev Group, Ahmedabad. Two portfolios sold both across
India and for export to 30+ countries:

- **Industrial Chemicals** - 103 products
- **Pharma, Intermediates & APIs** - 209 products, 95 APIs across 15 therapeutic areas

Two entities: **Jaydev Multicomm Pvt. Ltd.** contracts all exports;
**Jaydev Pharma & Intermediates LLP** covers domestic supply.

**Stack**: Next.js 15 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Resend

---


## Pharma catalogue data

`lib/pharma.ts` is **generated** - do not edit it by hand.

```bash
python3 scripts/import_pharma.py            # reads ~/Downloads/Jaydev Group Product list.xlsx
python3 scripts/import_pharma.py path.xlsx  # or point it at another workbook
```

The workbook encodes therapeutic segment as **cell fill colour** and carries
section headers inline as rows, so the parser decodes both. Hand-maintained
corrections live outside the generated file and survive re-runs:

| File | Purpose |
|---|---|
| `data/pharma-cas-overrides.json` | CAS numbers the sheet left blank; also declares multi-isomer products |
| `data/pharma-short-names.json` | Short trade names for long IUPAC names |

Every CAS is validated against the official check-digit algorithm - the script
exits non-zero rather than emitting an invalid one.

Supplier names and plant locations from the workbook are **deliberately not
emitted**; they were internal sourcing research and would otherwise ship in the
client bundle.


## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Environment
- Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`
- `.env.local` is gitignored. **Never put a real key in `.env.example`** - it is committed
- Optional: `QUOTE_WEBHOOK_URL` mirrors quote submissions to a webhook

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

> If you prefer script-based startup, use `./start.sh` on macOS/Linux or `start.bat` on Windows after installing dependencies.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
jaydev-group/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (Header, Footer)
│   ├── page.tsx                      # Homepage
│   ├── products/
│   │   ├── page.tsx                  # Products catalog
│   │   └── [slug]/page.tsx          # Individual product detail (dynamic)
│   ├── markets/page.tsx              # Markets & corridors
│   ├── industries/page.tsx           # Industries served
│   ├── quality/page.tsx              # Quality assurance
│   ├── quote/
│   │   ├── page.tsx                  # Quote form page (server)
│   │   └── QuoteForm.tsx            # Quote form (client)
│   ├── api/
│   │   └── quote/route.ts           # Form submission endpoint
│   ├── globals.css                   # Global styles
│   ├── not-found.tsx                # 404 page
│   └── layout.tsx                    # Layout wrapper
│
├── components/
│   ├── Header.tsx                    # Navigation header (sticky)
│   ├── Footer.tsx                    # Footer with links/contact
│   └── [future components]/          # ProductCard, ScrollReveal, TrustBadge, etc.
│
├── lib/
│   ├── content.ts                    # Single source of truth (products, markets, copy)
│   ├── motion.ts                     # Framer Motion animation variants
│   ├── types.ts                      # TypeScript interfaces & types
│   └── utils.ts                      # Helper functions
│
├── public/
│   └── images/                       # WebP images (16 files)
│       ├── Product images (6): caustic-soda, sulphuricacid, pac, etc.
│       ├── Industry images (8): mining, textile, watertreatment, etc.
│       └── Market images (1): africa, etc.
│
├── skills/                           # Knowledge base (Phase 1)
│   ├── jaydev-business-skill.md
│   ├── chemical-trading-skill.md
│   ├── export-growth-skill.md
│   ├── manufacturer-validation-skill.md
│   ├── ui-ux-pro-max-skill.md
│   ├── motion-design-skill.md
│   ├── seo-aeo-skill.md
│   ├── conversion-optimization-skill.md
│   └── website-architecture-skill.md
│
├── legacy/                           # Archived original static HTML (reference only)
│   ├── index.html
│   ├── products.html
│   ├── industries.html
│   ├── markets.html
│   ├── quality.html
│   ├── quote.html
│   └── images/
│
├── AGENTS.md                         # Master coordination guide & 9-phase roadmap
├── PHASE-2-AUDIT-REPORT.md          # Comprehensive audit findings & fixes
├── tailwind.config.ts                # Tailwind design tokens (navy, teal, gold)
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── package-lock.json                 # Lock file
```

---

## 🎨 Brand Colors & Design Tokens

Defined in `tailwind.config.ts`:

| Token | Color | Hex | Use |
|-------|-------|-----|-----|
| Navy | Primary brand | #0E2040 | Headings, CTAs, backgrounds |
| Teal | Accent | #0B7A72 | Buttons, highlights, accents |
| Gold | Premium | #B8720A | Logos, premium indicators |
| Off-white | Background | #F4F7FB | Body backgrounds |
| Slate | Text | #475569 | Body text, secondary info |

---

## 📦 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server (requires build first)
npm start

# Run linter (if configured)
npm run lint
```

---

## 🌐 Pages & Routes

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Homepage (hero, products preview, markets) | ✅ Complete |
| `/products` | Product catalog grid (6 core products) | ✅ Complete |
| `/products/[slug]` | Individual product detail | 🔄 In Progress (Phase 3) |
| `/markets` | Export markets & corridors | ⚠️ Needs expansion |
| `/industries` | Industries served | ⚠️ Needs expansion |
| `/quote` | RFQ form for export inquiries | ✅ Complete |
| `/blog` | Blog listing | 📋 Planned (Phase 8) |
| `/blog/[slug]` | Individual blog post | 📋 Planned (Phase 8) |

---

## 📊 Company Information

| Field | Value |
|-------|-------|
| **Company** | Jaydev Group |
| **IEC Code** | AAKCM4483G |
| **GST Number** | 24AAKCM4483G1ZB |
| **Location** | 911 RK Supreme, 150 Ft Ring Road, Rajkot, Gujarat 360005, India |
| **Phone** | +91 99875 39258 |
| **Email** | sales@jaydevgroup.co.in |
| **WhatsApp** | +91 99875 39258 (preferred) |

---

## 🛒 Products

### Tier 1: Core Export Products (Manufacturer-Backed)
1. **Caustic Soda** – GACL, Grasim, Reliance
2. **Sulphuric Acid** – GACL
3. **SMBS (Sodium Metabisulfite)** – GACL
4. **Hydrogen Peroxide** – Reliance
5. **PAC (Polyaluminium Chloride)** – Kutch manufacturers
6. **Calcium Chloride** – DCM Shriram, Reliance

### Tier 2: Specialty Products
- Zircon Sand, Lauric Acid, Decanoic Acid, Epichlorohydrin
- Chlor-alkali products, Petrochemicals, PU systems, Advanced materials

---

## 🌍 Target Markets

| Region | Countries | Key Industries |
|--------|-----------|-----------------|
| East Africa | Kenya, Tanzania, DRC, Zambia, Rwanda | Mining, food, water treatment |
| West Africa | Nigeria, Ghana, Côte d'Ivoire | Food, textiles, construction |
| GCC & Middle East | UAE, Saudi Arabia, Kuwait, Qatar | Oil & gas, desalination |
| SE Asia | Indonesia, Malaysia, Thailand, Vietnam | Textiles, pulp & paper |
| Europe | Various | Fine chemicals, specialty |

---

## ✅ Current Features

### ✓ Implemented
- ✅ Next.js App Router with TypeScript
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Framer Motion animations (hover effects, staggered reveals)
- ✅ Hero sections with gradients
- ✅ Product catalog grid (6 products)
- ✅ RFQ form (partially functional)
- ✅ Header/Footer with navigation
- ✅ Tailwind CSS with custom brand tokens
- ✅ WebP image optimization

### 🔄 In Progress
- 🔄 Product detail pages (dynamic routing)
- 🔄 Market detail pages
- 🔄 Form validation & submission
- 🔄 SEO metadata & schema markup

### 📋 Planned (Phase 3+)
- 📋 Blog section with posts
- 📋 Industry detail pages
- 📋 Advanced animations & 3D effects
- 📋 Customer testimonials
- 📋 Google Analytics & conversion tracking
- 📋 Deployment to Vercel

---

## 🚢 Deployment

### Recommended: Vercel (Zero-Config for Next.js)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# 2. Connect to Vercel
# Go to https://vercel.com
# Select GitHub repo
# Vercel auto-detects Next.js and deploys
```

**Benefits**:
- Auto-deploy on Git push
- CDN included
- Preview deployments for PRs
- Free tier available

### Alternative: Self-Hosted (AWS, DigitalOcean, etc.)

```bash
# Build production bundle
npm run build

# Deploy .next/ folder + public/ to server
# Run: npm start
```

---

## 🔍 Quality & Performance

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 100

### Run Audit
```bash
# Build first
npm run build

# Audit homepage
npx lighthouse http://localhost:3000 --view
```

---

## 📚 Documentation

### Master Guides
- **AGENTS.md** – Company overview, business model, 9-phase roadmap
- **PHASE-2-AUDIT-REPORT.md** – Comprehensive audit findings & fixes
- **skills/*** – 9 skill files (business, design, technical, SEO, etc.)

### How to Use Skills
1. Before starting a task, read the relevant skill file
2. Follow patterns & examples provided
3. Update skill as learnings emerge

---

## 🛠️ Development Workflow

### Adding a New Page
1. Create folder in `app/` (e.g., `app/about/`)
2. Add `page.tsx` file
3. Import components & content from `lib/`
4. Add metadata (title, description)
5. Test in dev server: `npm run dev`

### Updating Products
1. Edit `lib/content.ts`
2. Update `products` array
3. Changes auto-reflect on `/products` and homepage
4. No page refresh needed (HMR)

### Adding Images
1. Save WebP images to `public/images/`
2. Reference in `lib/content.ts` (filename only)
3. Use in JSX: `src={`/images/${product.image}`}`

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Images Not Loading
- Verify path: `/images/filename.webp` (not root level)
- Check file exists in `public/images/`
- Browser DevTools → Network → check for 404s

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Verify all imports exist
```

---

## 📞 Support & Questions

- **Business**: See `AGENTS.md` for company context
- **Design**: See `skills/ui-ux-pro-max-skill.md` & `motion-design-skill.md`
- **Technical**: See `skills/website-architecture-skill.md`
- **SEO**: See `skills/seo-aeo-skill.md`
- **Forms/Conversion**: See `skills/conversion-optimization-skill.md`

---

## 📄 License & Credits

**Owner**: Jaydev Group  
**Built with**: Next.js, React, Tailwind CSS, Framer Motion  
**Last Updated**: 2026-06-18

---

## Next Phase: Phase 3 - Architecture & Migration Planning

**Entrance Checklist**:
- ✅ CRITICAL fixes applied (image paths, metadata, form)
- ✅ Code reviewed & organized
- ✅ Lighthouse baseline measured
- ✅ Component library planned

**Phase 3 Deliverables**:
- Validate architecture changes
- Expand content model (markets, industries)
- Create dynamic product detail pages
- Design responsive component system

```javascript
async function handleSub(btn) {
  const data = {
    company: document.getElementById('co').value,
    email:   document.getElementById('em').value,
    product: document.getElementById('pr').value,
    // ... etc
  };
  const res = await fetch('https://your-api.com/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  // handle response
}
```

**Easy options:** Formspree, EmailJS, Netlify Forms, or any backend API.

---

## 🎨 Design Tokens (CSS Variables)

```css
--navy:   #0E2040   /* Dark navy - headings */
--navy2:  #163566   /* Medium navy - nav, cards */
--teal:   #0B7A72   /* Brand teal - primary accent */
--teal2:  #0EA5A0   /* Lighter teal - hover states */
--gold:   #B8720A   /* Gold - secondary accent */
--green:  #0D9466   /* Active/success indicator */
--off:    #F4F7FB   /* Off-white section backgrounds */
--border: #E2E8F0   /* Card/section borders */
```

---

## 📞 WhatsApp Integration

WhatsApp links use pre-filled messages for fast lead capture:
```
https://wa.me/919099796811?text=Hello%2C+I+need+a+quote...
```
Update the phone number in all 6 HTML files if it changes.

---
*Built for Jaydev Group - Rajkot, Gujarat, India*
