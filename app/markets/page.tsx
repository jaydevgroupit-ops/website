import MarketsClient from '@/components/MarketsClient';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Where We Supply - India & Export Markets',
  description: 'Domestic supply across India plus chemical and pharmaceutical exports to East Africa, West Africa, GCC & Middle East and Southeast Asia. CIF pricing, full documentation, 7-25 day delivery.',
  alternates: { canonical: `${SITE_URL}/markets` },
};

export default function MarketsPage() {
  return <MarketsClient />;
}
