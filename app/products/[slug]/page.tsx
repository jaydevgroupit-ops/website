import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, productImage } from '@/lib/content';
import ProductDetailClient from '@/components/ProductDetailClient';
import { SITE_URL as BASE } from '@/lib/site';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find((p) => p.id === slug);
  if (!product) return {};

  const hasFormula = product.formula && product.formula !== '-';
  const title = `${product.name}${hasFormula ? ` (${product.formula})` : ''} - Exporter & Supplier | CAS ${product.cas}`;
  const description =
    `Buy ${product.name}${hasFormula ? ` (${product.formula}, CAS ${product.cas})` : ''} from Jaydev Group - ${product.grade}. ` +
    `${product.description.slice(0, 100)} Manufacturer-direct export with COA, MSDS & full documentation. Request a CIF/FOB quote.`;
  const keywords = [
    `${product.name} exporter`, `${product.name} supplier India`, `${product.name} manufacturer`,
    `buy ${product.name}`, `${product.name} CIF price`, `CAS ${product.cas}`,
    ...(product.applications ?? []).slice(0, 6).map((a: string) => `${product.name} for ${a}`),
  ];
  const img = productImage(product);

  return {
    title,
    description: description.slice(0, 300),
    keywords,
    alternates: { canonical: `${BASE}/products/${product.id}` },
    openGraph: {
      type: 'website',
      url: `${BASE}/products/${product.id}`,
      title,
      description: description.slice(0, 200),
      images: [{ url: img, alt: product.name }],
    },
    twitter: { card: 'summary_large_image', title, description: description.slice(0, 200), images: [img] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const hasFormula = product.formula && product.formula !== '-';
  const imageUrl = `${BASE}${productImage(product)}`;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imageUrl,
    category: product.category?.replace(/-/g, ' '),
    sku: product.id,
    ...(product.cas ? { productID: `cas:${product.cas}`, mpn: product.cas } : {}),
    brand: { '@type': 'Brand', name: 'Jaydev Group' },
    manufacturer: (product.manufacturers ?? []).map((m: string) => ({ '@type': 'Organization', name: m })),
    additionalProperty: [
      ...(hasFormula ? [{ '@type': 'PropertyValue', name: 'Chemical Formula', value: product.formula }] : []),
      ...(product.cas ? [{ '@type': 'PropertyValue', name: 'CAS Number', value: product.cas }] : []),
      ...(product.grade ? [{ '@type': 'PropertyValue', name: 'Grade', value: product.grade }] : []),
      ...(product.applications ?? []).map((a: string) => ({ '@type': 'PropertyValue', name: 'Application', value: a })),
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      url: `${BASE}/quote?product=${product.id}`,
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
      { '@type': 'ListItem', position: 3, name: product.name, item: `${BASE}/products/${product.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProductDetailClient product={product} />
    </>
  );
}
