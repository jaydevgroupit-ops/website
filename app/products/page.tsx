import { Suspense } from 'react';
import ProductsClient from '@/components/ProductsClient';
import { products } from '@/lib/content';
import { pharmaProducts } from '@/lib/pharma';
import { SITE_URL as BASE } from '@/lib/site';

export const metadata = {
  title: 'Products - Chemicals, APIs & Intermediates',
  description: `Browse ${products.length}+ industrial chemicals and ${pharmaProducts.length} pharmaceutical products from Jaydev Group - APIs across 15 therapeutic areas, intermediates, excipients and fine chemicals. Domestic supply and export.`,
  alternates: { canonical: `${BASE}/products` },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Industrial chemicals supplied by Jaydev Group',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/products/${p.id}`,
      name: p.name,
    })),
  },
];

export default function ProductsPage() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Suspense fallback={<div className="min-h-screen bg-white pt-24" />}>
        <ProductsClient />
      </Suspense>
    </>
  );
}
