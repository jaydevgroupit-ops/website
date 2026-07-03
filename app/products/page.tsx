import ProductsClient from '@/components/ProductsClient';
import { products } from '@/lib/content';

const BASE = 'https://www.jaydevmulticomm.com';

export const metadata = {
  title: 'Products - Chemicals We Export & Import',
  description: 'Browse 100+ industrial chemicals Jaydev Multicomm exports from India - Caustic Soda, Sulphuric Acid, PAC, SMBS and more - plus raw materials we import into India (Zircon Sand, Lauric & Decanoic Acid). Full specs, COA & MSDS.',
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
    name: 'Industrial chemicals exported by Jaydev Multicomm',
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
      <ProductsClient />
    </>
  );
}
