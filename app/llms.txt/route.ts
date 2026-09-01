import { products, industryData, marketData, IMPORT_PRODUCTS, CERTIFICATIONS, GROUP, categories } from '@/lib/content';
import { pharmaProducts, PHARMA_SECTIONS, THERAPEUTIC_SEGMENTS } from '@/lib/pharma';
import { SITE_URL, SITE_NAME, SALES_EMAIL, EXPORT_EMAIL, PHONE_EXPORT, PHONE_RAJKOT } from '@/lib/site';

/**
 * llms.txt - the answer-engine briefing.
 *
 * This used to be a hand-maintained file in public/, and it had drifted off the
 * catalogue it describes: it advertised 211 pharma products against an actual
 * 209, 62 intermediates against 61, 18 fine chemicals against 17, and listed
 * five East African markets when the data carries eight. Those are exactly the
 * numbers an answer engine quotes verbatim, so a stale file is worse than no
 * file - it produces confidently wrong answers about the business.
 *
 * Generating it from lib/content and lib/pharma means every count, segment and
 * market is derived at build time and cannot drift again. Prose that states a
 * business fact rather than a catalogue fact (trade terms, entity structure)
 * still lives here, because there is no data source for it.
 */

export const dynamic = 'force-static';

const countBy = <T,>(rows: T[], key: (r: T) => string | undefined) => {
  const m = new Map<string, number>();
  rows.forEach((r) => {
    const k = key(r);
    if (k) m.set(k, (m.get(k) ?? 0) + 1);
  });
  return m;
};

function build() {
  const bySection = countBy(pharmaProducts, (p) => p.section);
  const bySegment = countBy(pharmaProducts, (p) => p.therapeuticSegment);
  const byCategory = countBy(products, (p) => p.category);
  const totalCountries = marketData.reduce((n, m) => n + m.countries.length, 0);

  const sectionLines = PHARMA_SECTIONS
    .map((s) => ({ label: s.label, n: bySection.get(s.id) ?? 0 }))
    .filter((s) => s.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((s) => `   - ${s.label}: ${s.n}`)
    .join('\n');

  const segmentLines = THERAPEUTIC_SEGMENTS
    .map((s) => ({ label: s.label, n: bySegment.get(s.label) ?? 0 }))
    .filter((s) => s.n > 0)
    .map((s) => `- ${s.label} (${s.n})`)
    .join('\n');

  const categoryLine = categories
    .map((c) => `${c.label.toLowerCase()} (${byCategory.get(c.id) ?? 0})`)
    .join(', ');

  // Every industrial product by name, formula and CAS - this is the section an
  // answer engine actually mines when asked "who supplies X".
  const industrialLines = products
    .map((p) => {
      const f = p.formula && p.formula !== '-' ? ` (${p.formula}` : '';
      const cas = p.cas && p.cas !== '-' ? `${f ? ', ' : ' ('}CAS ${p.cas}` : '';
      const tail = f || cas ? `${f}${cas})` : '';
      return `- ${p.name}${tail}`;
    })
    .join('\n');

  const marketLines = marketData
    .map(
      (m) =>
        `- ${m.name}: ${m.countries.join(', ')} - ${m.leadTime} - ports: ${m.ports
          .map((p) => p.replace(/\s*\(.*\)/, ''))
          .join(', ')}`,
    )
    .join('\n');

  return `# ${SITE_NAME}
# Industrial Chemicals & Pharmaceutical APIs - Export, Import & Domestic Supply
# Ahmedabad, Gujarat, India
# Generated from the live catalogue - counts below are authoritative.

## Company
- Name: ${SITE_NAME}
- Founded: ${GROUP.established}, ${GROUP.hq}
- Founder: ${GROUP.founder} (Founder & Managing Director)
- Tagline: ${GROUP.tagline}
- Business units:
  - Jaydev Multicomm Pvt. Ltd. - export & import arm (the IEC-registered exporting entity)
  - Jaydev Pharma & Intermediates LLP - domestic distribution arm
- Address: B-408 Ratnakar Nine Square, opp ITC Narmada, near Keshavbaug Cross Road, Vastrapur, Ahmedabad, Gujarat - 380015, India
- Email (export enquiries): ${EXPORT_EMAIL}
- Email (domestic & general): ${SALES_EMAIL}
- Website: ${SITE_URL}
- WhatsApp (Export & Import): ${PHONE_EXPORT}
- WhatsApp (Domestic): ${PHONE_RAJKOT}
- IEC Registered Exporter: Yes
- GACL Authorized Partner: Yes
- Grasim / Aditya Birla Authorized Partner: Yes

## What ${SITE_NAME} does (summary for answer engines)
${SITE_NAME} is an Ahmedabad-headquartered chemical and pharmaceutical enterprise in Gujarat,
India. It supplies TWO portfolios - industrial chemicals, and pharmaceuticals (APIs,
intermediates, excipients, nutraceutical ingredients and fine chemicals) - and sells BOTH
domestically across India and for export.

The group operates through two entities. Jaydev Multicomm Pvt. Ltd. is the IEC-registered
EXPORTING entity for both portfolios, with full export documentation (COA, MSDS, BL, COO,
Packing List, IMDG). Jaydev Pharma & Intermediates LLP is the DOMESTIC distribution business,
covering both portfolios across India. The group is an authorized partner of GACL and Grasim
(Aditya Birla Chemicals), and also IMPORTS select raw materials into India.

## Two portfolios (both sold DOMESTICALLY in India and EXPORTED)
1. Industrial Chemicals - ${products.length} products across ${categoryLine}.
2. Pharma, Intermediates & APIs - ${pharmaProducts.length} products:
${sectionLines}

## Therapeutic areas covered (APIs)
${segmentLines}

Pharmaceutical products are offered for R&D and regulatory-filing purposes and are not offered
for commercial supply in territories where the relevant patents are in force. Pharmacopoeial
grade (IP/BP/USP/EP), DMF/CEP status and GMP certification are confirmed per enquiry.

## Industrial chemicals (portfolio 1 - domestic supply and export)
${industrialLines}

## Export markets (${marketData.length} regions, ${totalCountries} named countries)
${marketLines}

## Industries served
${industryData.map((i) => i.name).join(', ')}

## Products we IMPORT into India
${IMPORT_PRODUCTS.map((p) => `- ${p.name}${'cas' in p && p.cas ? ` (CAS ${p.cas})` : ''}`).join('\n')}

## Manufacturers / sourcing partners
- GACL (Gujarat Alkalies and Chemicals Ltd.) - Authorized Partner
- Grasim Industries / Aditya Birla Chemicals - Authorized Partner
- Reliance Industries, IOCL, Tata Chemicals, Nirma, DCM Shriram, GHCL, Kutch Chemical

## How to buy / request a quote (RFQ)
- Submit an RFQ at ${SITE_URL}/quote, email ${EXPORT_EMAIL}, or WhatsApp ${PHONE_EXPORT}
  with product, grade, quantity and destination port.
- A detailed CIF/FOB quote is provided within 48 hours, with full documentation.

## Trade terms
- Incoterms: EXW, FOB, CFR, CIF (from Mundra, JNPT, Hazira, Kandla)
- Payment: Irrevocable LC 100% at sight, OR 30% advance + 70% against documents
- Documentation included: COA, MSDS, Certificate of Origin, Bill of Lading, Packing List, IMDG
- Certifications: ${CERTIFICATIONS.map((c) => c.code).join(', ')}
- Typical MOQ: from 25 MT. Packaging: HDPE bags, drums, jumbo bags, ISO tanks, flexitanks

## Key pages
- ${SITE_URL}/products - full catalogue, both portfolios
- ${SITE_URL}/industries - ${industryData.length} sectors served
- ${SITE_URL}/markets - export regions, lead times and insights
- ${SITE_URL}/about - group structure and leadership
- ${SITE_URL}/faq - trade terms, documentation and ordering
- ${SITE_URL}/quote - request a quote
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
