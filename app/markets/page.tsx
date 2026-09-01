import MarketsClient from '@/components/MarketsClient';
import MarketNews from '@/components/MarketNews';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Where We Supply - India & Export Markets',
  description: 'Chemical and pharmaceutical supply across India, plus export to East and West Africa, the GCC and Southeast Asia. CIF pricing, full docs, 7-25 day transit.',
  alternates: { canonical: `${SITE_URL}/markets` },
};

export default function MarketsPage() {
  return <MarketsClient news={<MarketNews />} />;
}
