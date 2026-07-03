import ProductsClient from '@/components/ProductsClient';

export const metadata = {
  title: 'Products - Chemicals We Export & Import',
  description: 'Browse 100+ industrial chemicals Jaydev Multicomm exports from India - Caustic Soda, Sulphuric Acid, PAC, SMBS and more - plus raw materials we import into India (Zircon Sand, Lauric & Decanoic Acid). Full specs, COA & MSDS.',
  alternates: { canonical: 'https://www.jaydevmulticomm.com/products' },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
