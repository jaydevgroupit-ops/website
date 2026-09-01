import { Suspense } from 'react';
import ProductsClient from '@/components/ProductsClient';
import { products } from '@/lib/content';
import { pharmaProducts } from '@/lib/pharma';
import { SITE_URL as BASE } from '@/lib/site';

export const metadata = {
  title: 'Products - Chemicals, APIs & Intermediates',
  description: `${products.length} industrial chemicals and ${pharmaProducts.length} pharmaceutical products - human and veterinary APIs, intermediates, excipients and nutraceutical ingredients. Domestic supply and export.`,
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
      <Suspense fallback={
        <div className="min-h-screen bg-white pt-20">
          <div className="bg-surface">
            <div className="max-w-7xl mx-auto px-4 py-14 text-center">
              <span className="section-label mb-3">Catalogue</span>
              <h1 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-ink mb-2">
                {products.length + pharmaProducts.length} products, one enquiry
              </h1>
              <p className="text-ink-soft max-w-2xl mx-auto">
                Industrial chemicals and pharmaceutical APIs, in one catalogue.
              </p>
            </div>
          </div>
        </div>
      }>
        <ProductsClient />
      </Suspense>
    </>
  );
}
