// ─────────────────────────────────────────────
//  The two portfolios, and one search index across both.
//
//  Division is a CATALOGUE concept (what we sell).
//  Channel is an ENTITY concept (who contracts):
//    export   -> Jaydev Multicomm Pvt. Ltd.
//    domestic -> Jaydev Pharma & Intermediates LLP
//  Both divisions are sold through both channels.
// ─────────────────────────────────────────────

import { products } from './content';
import { pharmaProducts, displayName, THERAPEUTIC_SEGMENTS } from './pharma';

export type Division = 'industrial' | 'pharma';

export const DIVISIONS: {
  id: Division;
  label: string;
  short: string;
  icon: string;
  blurb: string;
  count: number;
}[] = [
  {
    id: 'industrial',
    label: 'Industrial Chemicals',
    short: 'Industrial',
    icon: 'Beaker',
    blurb: 'Chlor-alkali, acids, solvents and water treatment - direct from the producer.',
    count: products.length,
  },
  {
    id: 'pharma',
    label: 'Pharma, Intermediates & APIs',
    short: 'Pharma & APIs',
    icon: 'FlaskConical',
    blurb: `Human and veterinary APIs, intermediates and excipients across ${THERAPEUTIC_SEGMENTS.length} therapeutic areas.`,
    count: pharmaProducts.length,
  },
];

/** Shown on the pharma tab and on every API page. */
export const PHARMA_DISCLAIMER =
  'Pharmaceutical products are offered for R&D and regulatory filing. They are not offered for commercial supply where the relevant patents are in force. Grade, documentation and availability are confirmed per enquiry.';

/** Lightweight row used only for cross-division search counts. */
export type CatalogueEntry = {
  id: string;
  name: string;
  division: Division;
  cas?: string;
  href?: string;
  haystack: string;
};

const norm = (s: string) => s.toLowerCase();

export const catalogue: CatalogueEntry[] = [
  ...products.map((p) => ({
    id: p.id,
    name: p.name,
    division: 'industrial' as Division,
    cas: p.cas,
    href: `/products/${p.id}`,
    haystack: norm(
      [p.name, p.cas, p.formula, p.description, ...p.applications].filter(Boolean).join(' '),
    ),
  })),
  // Pharma items have no detail page - they are enquiry rows on /products.
  ...pharmaProducts.map((p) => ({
    id: p.id,
    name: displayName(p),
    division: 'pharma' as Division,
    cas: p.cas,
    href: undefined,
    // Index the full chemical name too, so a buyer can search either.
    haystack: norm(
      [p.name, p.shortName, p.cas, ...(p.casForms ?? []).map((f) => f.cas),
       p.therapeuticSegment, p.ingredientType, p.forApi]
        .filter(Boolean)
        .join(' '),
    ),
  })),
];

/** How many items in `division` match `query`. Powers the "also in…" hint. */
export const countMatches = (query: string, division: Division) => {
  const q = norm(query.trim());
  if (!q) return 0;
  return catalogue.filter((e) => e.division === division && e.haystack.includes(q)).length;
};
