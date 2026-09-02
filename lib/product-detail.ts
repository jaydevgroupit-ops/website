import { products, productImage, categories, type Product } from './content';
import {
  pharmaProducts,
  PHARMA_SECTIONS,
  displayName,
  type PharmaProduct,
} from './pharma';

/**
 * One shape for a product page, whichever book the product came from.
 *
 * The two catalogues are genuinely different: an industrial product carries a
 * formula, grade, specs, applications and named manufacturers, while a pharma
 * product carries a CAS, a classification and - for intermediates - the
 * finished drug it feeds. Rendering them from two components would have meant
 * two sets of breadcrumbs, schema and RFQ wiring drifting apart, so both are
 * normalised into this view model and one component renders it. Fields the
 * source does not have stay absent; the page hides what is absent rather than
 * inventing a placeholder.
 */

export type DetailSpec = { label: string; value: string };
export type RelatedItem = { id: string; name: string; sub?: string; formula?: string };

export type ProductDetail = {
  id: string;
  name: string;
  book: 'industrial' | 'pharma';
  /** Small label above the title: category or section. */
  kicker: string;
  formula?: string;
  cas?: string;
  casForms?: { label: string; cas: string }[];
  /** Industrial products state a grade; pharma grade is confirmed per enquiry. */
  grade?: string;
  description?: string;
  specs: DetailSpec[];
  applications: string[];
  manufacturers: string[];
  packaging: string[];
  variants?: { form: string; grade: string }[];
  featured?: boolean;
  /** Pharma classification, shown as chips and used in the schema. */
  therapeuticSegment?: string;
  ingredientType?: string;
  /** Intermediates: the finished drug this feeds. */
  forApi?: string;
  investigational?: boolean;
  /** Same category / segment. */
  related: RelatedItem[];
  /** Other intermediates feeding the same API - the strongest link we can draw. */
  sameTarget: RelatedItem[];
  /** An intermediate's target API, when we also sell that API. */
  targetApiId?: string;
  /** OG image; pharma has no artwork of its own. */
  image?: string;
  /** Pharma only: the buyer-facing facts the sheet has not supplied yet, so
   *  the page can name them as "confirmed per enquiry" instead of listing
   *  every one unconditionally. Empty once the sheet carries them all. */
  pendingConfirmation: string[];
};

const catLabel = new Map(categories.map((c) => [c.id, c.label]));
const sectionLabel = new Map(PHARMA_SECTIONS.map((s) => [s.id, s.label]));

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Pharma products are keyed by name so an intermediate's `forApi` string can
 *  be matched against the APIs we actually sell. Only a couple resolve today,
 *  but the link is real where it does. */
const apiByName = new Map(
  pharmaProducts.filter((p) => p.section.startsWith('apis')).map((p) => [norm(p.name), p]),
);

/** Three peers from around `name` in the list, wrapping - so neighbouring
 *  products do not all surface the same three links. */
function relatedWindow<T extends { name: string }>(pool: T[], name: string): T[] {
  if (pool.length <= 3) return pool;
  const at = pool.findIndex((x) => x.name.localeCompare(name) > 0);
  const start = at === -1 ? Math.max(0, pool.length - 3) : at;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

const pharmaSub = (p: PharmaProduct) =>
  p.therapeuticSegment ?? p.ingredientType ?? (p.forApi ? `For ${p.forApi}` : undefined);

function fromIndustrial(p: Product): ProductDetail {
  return {
    id: p.id,
    name: p.name,
    book: 'industrial',
    kicker: catLabel.get(p.category) ?? p.category.replace(/-/g, ' '),
    formula: p.formula && p.formula !== '-' ? p.formula : undefined,
    cas: p.cas && p.cas !== '-' ? p.cas : undefined,
    grade: p.grade,
    description: p.description,
    specs: p.specs ?? [],
    applications: p.applications ?? [],
    manufacturers: p.manufacturers ?? [],
    packaging: p.packaging ?? [],
    variants: p.variants,
    featured: p.featured,
    related: relatedWindow(
      products.filter((x) => x.category === p.category && x.id !== p.id),
      p.name,
    ).map((x) => ({ id: x.id, name: x.name, sub: x.grade, formula: x.formula })),
    sameTarget: [],
    image: productImage(p),
    pendingConfirmation: [],
  };
}

function fromPharma(p: PharmaProduct): ProductDetail {
  // Prefer siblings that share the narrowest classification the product has.
  const sameClass = pharmaProducts.filter(
    (x) =>
      x.id !== p.id &&
      (p.therapeuticSegment
        ? x.therapeuticSegment === p.therapeuticSegment
        : p.ingredientType
          ? x.ingredientType === p.ingredientType
          : x.section === p.section),
  );

  const sameTarget = p.forApi
    ? pharmaProducts.filter(
        (x) => x.id !== p.id && x.forApi && norm(x.forApi) === norm(p.forApi!),
      )
    : [];

  const target = p.forApi ? apiByName.get(norm(p.forApi)) : undefined;

  // Take the window of peers *around* this product rather than the first three
  // of its class. slice(0, 3) would hand every intermediate the same three
  // alphabetical neighbours - one identical link module repeated across 70
  // pages, which is useless to a buyer and reads as boilerplate to a crawler.
  const window = relatedWindow(sameClass, p.name);

  // Whatever the sheet has supplied becomes a real spec row, rendered in the
  // same table an industrial product uses. Whatever it has not is named below
  // as pending, so the page never implies a value it does not hold.
  const specSources: [string, string | undefined][] = [
    ['Pharmacopoeial Grade', p.pharmacopoeia ?? p.grade],
    ['DMF', p.dmf],
    ['CEP', p.cep],
    ['GMP', p.gmp],
    ['Minimum Order', p.moq],
  ];
  const specs = specSources
    .filter(([, v]) => v)
    .map(([label, value]) => ({ label, value: value as string }));
  const pendingConfirmation = specSources.filter(([, v]) => !v).map(([label]) => label);

  return {
    id: p.id,
    name: displayName(p),
    book: 'pharma',
    kicker: sectionLabel.get(p.section) ?? p.section,
    cas: p.cas,
    casForms: p.casForms,
    grade: p.grade,
    description: p.description,
    specs,
    applications: p.applications ?? [],
    manufacturers: [],
    packaging: p.packaging ?? [],
    therapeuticSegment: p.therapeuticSegment,
    ingredientType: p.ingredientType,
    forApi: p.forApi,
    investigational: p.investigational,
    related: window.map((x) => ({ id: x.id, name: displayName(x), sub: pharmaSub(x) })),
    sameTarget: sameTarget.map((x) => ({ id: x.id, name: displayName(x), sub: x.cas ? `CAS ${x.cas}` : undefined })),
    targetApiId: target?.id,
    pendingConfirmation,
  };
}

/** Resolve a slug against both books. Ids are unique across the two. */
export function findProductDetail(slug: string): ProductDetail | undefined {
  const ind = products.find((p) => p.id === slug);
  if (ind) return fromIndustrial(ind);
  const ph = pharmaProducts.find((p) => p.id === slug);
  if (ph) return fromPharma(ph);
  return undefined;
}

/** Every product page the site builds - both books. */
export const allProductSlugs = [
  ...products.map((p) => p.id),
  ...pharmaProducts.map((p) => p.id),
];

/** The full chemical name, when a trade short name is displayed instead. */
export function pharmaFullName(slug: string): string | undefined {
  const p = pharmaProducts.find((x) => x.id === slug);
  return p && p.shortName && p.shortName !== p.name ? p.name : undefined;
}
