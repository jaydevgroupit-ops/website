# UI/UX Pro-Max B2B Website Design Skill

## Purpose
Create premium, enterprise-grade B2B website design that builds trust, accelerates buyer decision-making, and emphasizes export/industrial credibility.

## Design Principles

### 1. Trust Through Clarity
- **Clear hierarchy**: Headline → subheader → CTA → details.
- **No ambiguity**: Every element explains "What is this?" and "Why should I care?"
- **Manufacturer transparency**: Always attribute sourcing, certifications, specs.

### 2. Enterprise Aesthetic
- **Professional**: Navy (#0E2040) + Teal (#0B7A72) + Gold (#B8720A).
- **Not playful**: No emojis, no animated characters, no cutesy illustrations.
- **Imagery**: Real industrial/commercial photography; no generic stock photos.

### 3. Conversion-Focused
- **CTAs prominent**: "Request Quote", "Download Catalog", "WhatsApp Us" – visible above fold & repeated.
- **Form friction minimal**: RFQ form should be 5–7 fields, not 20. Keep it scannable.
- **Social proof**: Testimonials, case studies, certifications, manufacturer logos visible.

## Layout Patterns

### Homepage Architecture

```
HERO SECTION (Full-width above fold)
├─ Background: Subtle gradient (Navy to Teal) + overlay
├─ Headline: "Global Chemical Sourcing – Trusted. Timely. Premium."
├─ Subheader: "Sourced directly from India's top manufacturers (GACL, Grasim, Reliance)"
├─ CTA Button: "Get a Quote" (Teal, size 56px, prominent)
├─ Optional: Scrolling stats: "30+ Countries | 10+ Years | 10,000+ MT/Year"
└─ Visual: Manufacturer logos OR high-res industrial facility image

TRUST SECTION
├─ Cards (3–4 columns):
│  ├─ "Manufacturer-Backed" + certification icon
│  ├─ "30+ Countries Served" + world map icon
│  ├─ "24–48 Hour Quotes" + clock icon
│  ├─ "Full Compliance Docs" + checkmark icon
└─ Smaller text under each explaining benefit

FEATURED PRODUCTS SECTION
├─ Headline: "Core Export Products"
├─ Grid of 3–4 product cards (mobile: 1 col, tablet: 2, desktop: 3)
│  ├─ Product image (real product or facility)
│  ├─ Product name + manufacturer
│  ├─ 1-line description (e.g., "GACL Caustic – 98% purity, available in flakes, lye, pearl")
│  ├─ "View Details" link
│  └─ "Request Quote" button (secondary, outline style)
└─ "Explore Full Catalog" link at bottom

MARKETS SECTION
├─ Headline: "Serving Africa, GCC, and SE Asia"
├─ 3–5 interactive boxes (click to expand or hover):
│  ├─ East Africa (Kenya, Tanzania, DRC): Key products, industries, lead times
│  ├─ GCC (UAE, Saudi): Key products, industries, lead times
│  ├─ SE Asia: Key products, industries, lead times
│  └─ etc.
└─ Optional: Interactive world map (advanced; future phase)

SOCIAL PROOF SECTION
├─ Testimonials carousel (3–5 customer quotes, anonymized):
│  ├─ "XYZ company saved 20% on supply costs using Jaydev"
│  ├─ Author: Procurement Manager, XYZ Industries (Country withheld)
│  └─ Star rating (optional)
├─ Certifications: IEC Code, GST, Manufacturer partner logos
└─ "View Case Studies" link

CTA SECTION
├─ Headline: "Ready to partner with a reliable exporter?"
├─ Three parallel paths:
│  ├─ "Get a Quote" (Primary) → RFQ form
│  ├─ "Download Catalog" (Secondary) → PDF catalog
│  └─ "WhatsApp Us" (Tertiary) → WhatsApp Business link
└─ Phone number + email (clickable on mobile)

FOOTER
├─ Quick Links: Products | Markets | About | Contact | Blog
├─ Company Info: Address, IEC Code, GST
├─ Contact: Email, Phone, WhatsApp link
├─ Social: LinkedIn, maybe Twitter
└─ Copyright + Privacy Policy
```

### Products Page

```
HERO (Smaller than homepage)
├─ Headline: "Product Catalog"
├─ Subheader: "Sourced from GACL, Grasim, Reliance, DCM Shriram"
└─ Search/filter bar (by product name or category)

PRODUCT FILTER BAR
├─ Category buttons: "Tier 1 Products" | "Tier 2 Products" | "All"
├─ Optional: Sort by "Popularity" | "New" | "Price"
└─ Active filter highlighted in Teal

PRODUCT GRID
├─ Cards (desktop: 3 cols, tablet: 2, mobile: 1):
│  ├─ Product image (high-res, 400x300px)
│  ├─ Product name + Grade
│  ├─ Manufacturer: "Source: GACL"
│  ├─ 1-line description
│  ├─ Specs overview (HTML, Purity, Packaging)
│  ├─ "View Details" button (Teal)
│  └─ "Request Quote" button (Outline)
└─ Pagination or "Load More" if 20+ products

PRODUCT DETAIL VIEW (Click "View Details")
├─ Left column (60%):
│  ├─ Large product image (carousel if multiple angles)
│  ├─ Manufacturer info: "Sourced from GACL"
│  ├─ Specifications table:
│  │  ├─ Purity %
│  │  ├─ Available Grades
│  │  ├─ Packaging Options
│  │  ├─ CAS Number
│  │  ├─ HS Code
│  │  └─ Safety Certifications
│  └─ Applications list (bullet points)
│     └─ "Caustic for textile mercerizing, mining operations, alkali production..."
├─ Right column (40%):
│  ├─ Price indicator: "FOB India – Contact for quote"
│  ├─ MOQ: "Minimum 25 MT"
│  ├─ Lead time: "2–3 weeks FOB Hazira"
│  ├─ Incoterms: "FOB, CIF available"
│  ├─ Primary CTA: "Request Quote" (Large, Teal)
│  ├─ Secondary: "Download Spec Sheet" (PDF icon)
│  ├─ Social proof: "COA available | MSDS included | Export ready"
│  └─ "Need bulk? Contact sales team" link
└─ Related products section at bottom

EXTENDED CATALOG (Tier 2)
├─ Heading: "Specialty & Import Products"
├─ Explanation: "Available on request for bulk orders"
└─ Simple list (not full cards; more minimal):
   ├─ Zircon Sand
   ├─ Lauric Acid
   ├─ Epichlorohydrin (ECH)
   └─ CTA: "Contact us for specialty sourcing"
```

### Quote/RFQ Page

```
HERO
├─ Headline: "Quick Quote Request"
├─ Subheader: "We'll respond within 24 hours"
└─ Optional: Graphic showing quote turnaround time

FORM SECTION
├─ Left: Form (50%) | Right: Info box (50%)
├─
│  FORM (Clean, minimal):
│  ├─ Company Name (text input, required)
│  ├─ Contact Person (text input, required)
│  ├─ Email (email input, required)
│  ├─ Phone (tel input, required)
│  ├─ Product(s) (dropdown multi-select, required)
│  ├─ Quantity (number input, required, unit: "MT")
│  ├─ Destination (country dropdown, required)
│  ├─ Delivery Window (date input, required)
│  ├─ Special Requirements (textarea, optional)
│  ├─ Payment Terms (radio: "LC" | "TT" | "Other", optional)
│  ├─ Submit button (Large, Teal, "Get Quote")
│  └─ Privacy note: "Your info is confidential. We won't share it."
│
└─ INFO BOX (Right side):
   ├─ "What happens next?"
   ├─ "1. Our team verifies product availability with manufacturer"
   ├─ "2. COA & export docs reviewed"
   ├─ "3. Quote sent via email + WhatsApp within 24 hrs"
   ├─ "Typical FOB price range: ..."
   ├─ Certifications: "IEC | GST | GACL Certified"
   └─ Direct contact: "Need urgent help? WhatsApp +91 99875 39258"

SUCCESS PAGE (After submission)
├─ Large checkmark icon (Teal)
├─ Headline: "Quote request received!"
├─ Message: "Our sales team will contact you within 24 hours."
├─ Auto-email confirmation sent to [email]
├─ WhatsApp alert sent to our team
├─ Secondary CTA: "Explore more products" → Products page
└─ Contact info: "Not hearing back? Email sales@jaydevgroup.co.in"
```

## Component Patterns

### Product Card
```jsx
<div className="bg-white border border-slate-200 rounded-lg shadow-soft p-6 hover:shadow-lg transition-shadow">
  <img src="product.webp" alt="Caustic Soda" className="w-full h-48 object-cover rounded" />
  <h3 className="mt-4 text-navy font-semibold">Caustic Soda</h3>
  <p className="text-sm text-slate-600">Source: GACL</p>
  <p className="text-xs text-slate-500 mt-2">98% purity, available in flakes, lye, pearl</p>
  <div className="mt-4 flex gap-2">
    <button className="flex-1 bg-teal text-white py-2 rounded">Request Quote</button>
    <button className="flex-1 border border-teal text-teal py-2 rounded">View Details</button>
  </div>
</div>
```

### Trust Badge
```jsx
<div className="flex items-center gap-2 text-sm">
  <CheckCircleIcon className="w-5 h-5 text-teal" />
  <span className="text-slate-700">30+ countries | 10+ years | IEC verified</span>
</div>
```

### CTA Button Variants
- **Primary (Teal)**: "Request Quote", "Get Started", "Download"
- **Secondary (Outline Teal)**: "View Details", "Learn More"
- **Tertiary (Gold)**: "Contact Sales", "Schedule Call"

## Responsive Design

### Breakpoints
- **Mobile** (< 640px): 1 column, stacked layout, large touch targets (48px+).
- **Tablet** (640px – 1024px): 2 columns, adjusted spacing.
- **Desktop** (> 1024px): 3+ columns, full layout.

### Mobile-First Rules
- **Typography**: Base 16px (body), 24px (headings), min. line-height 1.5.
- **Spacing**: Consistent grid (8px base unit: 8, 16, 24, 32, 48px).
- **Buttons**: Min. 48x48px tap target (iOS/Android standard).
- **Forms**: Full-width inputs on mobile; label on top.

### Example: Product Grid Responsiveness
```css
/* Mobile */
.product-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }

/* Tablet */
@media (min-width: 640px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 32px; }
}
```

## Color & Spacing Reference

### Color Palette
| Use | Color | Hex | Tailwind |
|-----|-------|-----|---------|
| Primary brand | Navy | #0E2040 | navy |
| Accent | Teal | #0B7A72 | teal |
| Premium | Gold | #B8720A | gold |
| Background | Off-white | #F4F7FB | off |
| Text | Slate | #475569 | slate-700 |

### Spacing Scale (Tailwind)
- `px-4` / `py-4` = 16px (base)
- `gap-6` = 24px (between grid items)
- `mb-8` = 32px (section spacing)

---

## Integration Points

- **Framer Motion**: Animations on card hover, scroll reveals (motion-design-skill.md).
- **Accessibility**: WCAG 2.1 AA; buttons labeled, forms have associated labels.
- **Performance**: Images WebP format, lazy-load below fold, aim for Lighthouse 90+.
