import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailClient from '@/components/ProductDetailClient';
import { findProductDetail, allProductSlugs, pharmaFullName, type ProductDetail } from '@/lib/product-detail';
import { SITE_URL as BASE } from '@/lib/site';

export async function generateStaticParams() {
  return allProductSlugs.map((slug) => ({ slug }));
}

/** The one-line classification used in copy and schema, for either book. */
function classify(p: ProductDetail): string {
  if (p.book === 'industrial') return p.kicker;
  if (p.forApi) return `pharmaceutical intermediate for ${p.forApi}`;
  if (p.therapeuticSegment) return `${p.therapeuticSegment} API`;
  if (p.ingredientType) return p.ingredientType.toLowerCase();
  return p.kicker;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findProductDetail(slug);
  if (!p) return {};

  const casPart = p.cas ? ` | CAS ${p.cas}` : '';
  const title = `${p.name}${p.formula ? ` (${p.formula})` : ''} - Exporter & Supplier${casPart}`;

  // Pharma has no marketing description, so the description is built from what
  // the sheet does verify: classification, CAS, and how it is supplied.
  const description =
    p.book === 'industrial'
      ? `Buy ${p.name}${p.formula ? ` (${p.formula}, CAS ${p.cas})` : ''} from Jaydev Group - ${p.grade}. ` +
        `${(p.description ?? '').slice(0, 100)} Manufacturer-direct export with COA, MSDS & full documentation. Request a CIF/FOB quote.`
      : `${p.name}${p.cas ? ` (CAS ${p.cas})` : ''} - ${classify(p)} supplied by Jaydev Group from India. ` +
        `Pharmacopoeial grade, DMF/CEP status and GMP documentation confirmed per enquiry. Request a quote.`;

  const keywords = [
    `${p.name} exporter`, `${p.name} supplier India`, `${p.name} manufacturer`, `buy ${p.name}`,
    ...(p.cas ? [`CAS ${p.cas}`] : []),
    ...(p.forApi ? [`${p.forApi} intermediate`, `${p.forApi} intermediate supplier`] : []),
    ...(p.therapeuticSegment ? [`${p.therapeuticSegment} API supplier`] : []),
    ...p.applications.slice(0, 6).map((a) => `${p.name} for ${a}`),
  ];

  const og = {
    type: 'website' as const,
    url: `${BASE}/products/${p.id}`,
    title,
    description: description.slice(0, 200),
    ...(p.image ? { images: [{ url: p.image, alt: p.name }] } : {}),
  };

  return {
    title,
    description: description.slice(0, 300),
    keywords,
    alternates: { canonical: `${BASE}/products/${p.id}` },
    openGraph: og,
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 200),
      ...(p.image ? { images: [p.image] } : {}),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = findProductDetail(slug);
  if (!p) notFound();

  const fullName = p.book === 'pharma' ? pharmaFullName(slug) : undefined;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    ...(fullName ? { alternateName: fullName } : {}),
    description:
      p.description ??
      `${p.name}${p.cas ? ` (CAS ${p.cas})` : ''} - ${classify(p)} supplied by Jaydev Group. Grade and documentation confirmed per enquiry.`,
    ...(p.image ? { image: `${BASE}${p.image}` } : {}),
    category: p.kicker,
    sku: p.id,
    ...(p.cas ? { productID: `cas:${p.cas}`, mpn: p.cas } : {}),
    brand: { '@type': 'Brand', name: 'Jaydev Group' },
    ...(p.manufacturers.length
      ? { manufacturer: p.manufacturers.map((m) => ({ '@type': 'Organization', name: m })) }
      : {}),
    additionalProperty: [
      ...(p.formula ? [{ '@type': 'PropertyValue', name: 'Chemical Formula', value: p.formula }] : []),
      ...(p.cas ? [{ '@type': 'PropertyValue', name: 'CAS Number', value: p.cas }] : []),
      ...(p.casForms ?? []).map((f) => ({ '@type': 'PropertyValue', name: `CAS (${f.label})`, value: f.cas })),
      ...(p.grade ? [{ '@type': 'PropertyValue', name: 'Grade', value: p.grade }] : []),
      ...(p.therapeuticSegment ? [{ '@type': 'PropertyValue', name: 'Therapeutic Area', value: p.therapeuticSegment }] : []),
      ...(p.ingredientType ? [{ '@type': 'PropertyValue', name: 'Ingredient Type', value: p.ingredientType }] : []),
      ...(p.forApi ? [{ '@type': 'PropertyValue', name: 'Intermediate For', value: p.forApi }] : []),
      ...p.applications.map((a) => ({ '@type': 'PropertyValue', name: 'Application', value: a })),
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      url: `${BASE}/quote?product=${p.id}`,
      seller: { '@type': 'Organization', name: 'Jaydev Multicomm Pvt. Ltd.' },
      areaServed: ['East Africa', 'West Africa', 'GCC', 'Middle East', 'Southeast Asia'],
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${BASE}/products/${p.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProductDetailClient product={p} fullName={fullName} />
    </>
  );
}
