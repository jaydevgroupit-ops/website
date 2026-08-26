# SEO & AEO Optimization Skill

## Purpose
Optimize Jaydev website for search engines (Google, Bing) and AI discovery (ChatGPT, Perplexity, Claude) to capture export buyers searching for reliable Indian chemical suppliers.

## SEO Strategy

### Keywords by Market & Product

#### High-Priority Keywords (Tier 1)
| Keyword | Search Intent | Target Page |
|---------|--------------|-------------|
| "bulk chemical exporter India" | B2B sourcing | Home, Products |
| "GACL caustic soda supplier" | Specific product + manufacturer | Products |
| "industrial chemicals export Africa" | Market-specific | Markets |
| "polyaluminium chloride PAC India" | Product-specific | Products |
| "sulphuric acid exporter GCC" | Region-specific | Markets |

#### Mid-Priority Keywords (Tier 2)
- "chemical export documentation India"
- "industrial supplier reliable timely"
- "SMBS sodium metabisulfite export"
- "caustic soda supplier east africa"
- "water treatment chemical PAC export"

#### Long-Tail Keywords (Tier 3)
- "where to buy caustic soda flakes India export"
- "reliable sulphuric acid supplier for mining"
- "PAC water treatment chemical Africa Kenya"

### On-Page SEO Checklist

#### Homepage (`/`)
```
Title: "Industrial Chemical Exporter India | GACL, Grasim Sourcing | Jaydev Group"
Meta Desc: "Reliable bulk chemical exporter to Africa & GCC. Manufacturer-backed sourcing from GACL, Grasim, Reliance. FOB India, export-ready docs, 24-48hr quotes."
H1: "Global Chemical Sourcing – Trusted. Timely. Premium."
Schema: Organization, FAQPage, BreadcrumbList
```

#### Products Page (`/products`)
```
Title: "Industrial Chemicals Export Catalog | GACL, Grasim, Reliance | Jaydev"
Meta Desc: "Browse caustic soda, sulphuric acid, SMBS, PAC, H2O2, calcium chloride. Manufacturer sourcing India. Export-ready, full compliance docs."
H1: "Product Catalog – Sourced Direct from Indian Manufacturers"
Schema: Product (for each product), FAQPage
```

#### Each Product Detail Page (e.g., `/products/caustic-soda`)
```
Title: "Caustic Soda Export – GACL Sourcing | 98% Purity | Jaydev"
Meta Desc: "GACL Caustic Soda in flakes, lye, pearl. 98% purity, export-ready. FOB India to Africa, GCC, SE Asia. Quote in 24 hrs."
H1: "Caustic Soda – GACL Export Grade"
Schema: Product, AggregateOffer
Content: 500–800 words covering specs, applications, sourcing, compliance
Images: 3–5 (product, facility, application images)
```

#### Markets Page (`/markets`)
```
Title: "Chemical Export Markets – Africa, GCC, SE Asia | Jaydev"
Meta Desc: "Specialized export to East Africa, West Africa, GCC, Southeast Asia. Market insights, lead times, compliance per region."
H1: "Global Markets – Tailored Chemical Solutions"
Schema: FAQPage, LocalBusiness
```

### Schema Markup (Structured Data)

#### Organization Schema (Site-wide)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jaydev Group",
  "url": "https://www.jaydevgroup.co.in",
  "description": "Industrial chemical exporter, sourcing from GACL, Grasim, Reliance",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "911 RK Supreme, 150 Ft Ring Road",
    "addressLocality": "Rajkot",
    "addressRegion": "Gujarat",
    "postalCode": "360005",
    "addressCountry": "IN"
  },
  "telephone": "+91 99875 39258",
  "email": "sales@jaydevgroup.co.in",
  "sameAs": ["https://linkedin.com/company/jaydev-group"]
}
```

#### Product Schema (Per Product)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Caustic Soda – GACL",
  "description": "98% purity caustic soda in flakes, lye, pearl form. Direct from GACL.",
  "manufacturer": { "@type": "Organization", "name": "GACL" },
  "aggregateOffer": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "priceRange": "300-400"
  }
}
```

#### FAQ Schema (Home, Products)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why choose Jaydev over direct manufacturer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We aggregate volume discounts, handle export docs, and provide timely logistics support."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum order quantity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "25 MT FOB India. Consolidation available for smaller orders."
      }
    }
  ]
}
```

### Technical SEO

#### URL Structure
- ✓ Clean: `/products/caustic-soda` (not `/product?id=1`)
- ✓ Keyword-rich: `/markets/east-africa` (includes market name)
- ✓ Consistent: No trailing slashes inconsistency

#### Mobile Optimization
- ✓ Responsive design (Tailwind mobile-first)
- ✓ Fast load time (Lighthouse 90+)
- ✓ Touch-friendly buttons (48px+)

#### XML Sitemap
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.jaydevgroup.co.in/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.jaydevgroup.co.in/products</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.jaydevgroup.co.in/products/caustic-soda</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

#### Robots.txt
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://www.jaydevgroup.co.in/sitemap.xml
```

#### Canonical Tags
```html
<link rel="canonical" href="https://www.jaydevgroup.co.in/products/caustic-soda" />
```

## AEO (AI Engine Optimization)

### AI Discovery Strategy

**Goal**: Ensure Jaydev shows up in ChatGPT, Perplexity, Claude, and other AI responses to queries about Indian chemical exporters.

### Content Structure for AI Engines

1. **Clear, Factual Content**
   - AI prioritizes direct answers: "Jaydev Group is an India-based chemical exporter sourcing from GACL, Grasim, Reliance."
   - Avoid marketing fluff; use active voice.

2. **Structured Information**
   - Use headers (H1, H2, H3) consistently.
   - Bullet points for product specs.
   - Tables for comparison (e.g., product grades, markets).

3. **FAQ Sections**
   - AI tools pull from FAQ schemas.
   - Aim for 10–15 common buyer questions with short answers.
   - Example questions:
     - "What does Jaydev Group export?"
     - "How long does export take from India?"
     - "What certifications do your products have?"
     - "Do you offer payment terms for established buyers?"

### Blog/Content Strategy

#### Blog Topics (1–2 posts/month)

| Topic | Keyword Focus | Format |
|-------|---------------|--------|
| "GACL vs Reliance Caustic Soda: Export Buyer's Guide" | GACL, caustic, comparison | 1,200 words |
| "Mining Chemicals Export to East Africa: SMBS & PAC" | mining, SMBS, Africa | 1,500 words |
| "Oil & Gas Drilling Chemicals: Calcium Chloride Export to GCC" | calcium chloride, drilling, GCC | 1,200 words |
| "Export Documentation Checklist for Industrial Chemicals" | documentation, export, compliance | 1,000 words |
| "Water Treatment: PAC Supply for African Utilities" | PAC, water treatment, Africa | 1,200 words |

#### Blog Post Template
```markdown
# [KEYWORD-RICH TITLE]

## Introduction
- Hook: Industry insight or buyer pain point
- What this post covers (3–5 key points)
- Call-to-action preview ("Get a quote at the end")

## Section 1: [Topic]
### Subsection 1a
[Content with examples, data, links]

### Subsection 1b
[Content with tables, lists, or case studies]

## Section 2: [Topic]
[Continue pattern]

## FAQ Section
**Q: [Common buyer question]**
A: [Direct answer, 1–2 sentences]

**Q: [Another question]**
A: [Answer]

## Call-to-Action
"Ready to source [product]? Get a quote from Jaydev."
[Link to RFQ form]

## Author & Date
By Jaydev Group | Published: [Date]
```

### Backlink Strategy

**Goal**: Build domain authority by earning links from relevant sites.

1. **Industry Directories**
   - Register on: AliBaba (premium), Kompass, TradeKey, Global Sources
   - Ensure NAP (Name, Address, Phone) consistency

2. **Manufacturer Partner Links**
   - Request links from GACL, Grasim distributor pages (if applicable)
   - "Jaydev Group – Authorized Distributor/Export Partner"

3. **Trade Association Links**
   - Join Indian Chemical Exporters Association; request directory link
   - Register on chambers of commerce (e.g., Rajkot Chamber)

4. **Guest Blogging**
   - Pitch articles to industry blogs (mining, textiles, water treatment)
   - Example title: "Emerging Trends in Indian Chemical Exports to Africa"

### Internal Linking Strategy

**Goal**: Distribute page authority and keep visitors engaged.

```
Home → Products (nav link)
       → Markets (nav link)
       → Blog (nav link)

Products → Caustic Soda (product detail)
        → SMBS (product detail)
        → Markets (related markets)

Product Detail (Caustic) → Blog post: "Caustic Soda in Textiles"
                        → Related Product: SMBS
                        → Market: "East Africa"

Blog → Related Blog Post
    → Related Product
    → CTA to Quote Form
```

## Local SEO (Minor: India-Focused)

### Google Business Profile
- **Business Name**: Jaydev Group
- **Address**: 911 RK Supreme, 150 Ft Ring Road, Rajkot, Gujarat 360005
- **Phone**: +91 99875 39258
- **Website**: jaydevgroup.co.in
- **Category**: Export-Import Merchant, Bulk Chemical Supplier
- **Description**: "India-based chemical exporter sourcing from GACL, Grasim, Reliance. Export-ready bulk chemicals to Africa, GCC, SE Asia."

## Analytics & Monitoring

### Key Metrics to Track
| Metric | Target |
|--------|--------|
| Organic traffic (monthly) | 2,000+ visitors |
| Top 10 keyword rankings | 5+ |
| Click-through rate (CTR) | 3–5% |
| Average session duration | 2+ minutes |
| RFQ form conversion (from organic) | 2–5% |

### Tools
- Google Search Console: Monitor indexing, CTR, keywords
- Google Analytics 4: Track traffic, user behavior, conversions
- Ahrefs/SEMrush: Monitor backlinks, competitor keywords

---

## Integration Points

- **Next.js**: Use `next/head` for meta tags, `next-sitemap` for XML sitemap
- **Tailwind CSS**: Semantic HTML for better SEO (proper heading hierarchy)
- **Content**: Store blog in separate pages or CMS; link from home
