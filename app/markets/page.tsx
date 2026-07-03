import MarketsClient from '@/components/MarketsClient';

export const metadata = {
  title: 'Export Markets - East Africa, GCC, SE Asia, West Africa',
  description: 'Chemical exports to East Africa, West Africa, GCC & Middle East, and Southeast Asia. CIF pricing, full documentation, 7-25 day delivery.',
  alternates: { canonical: 'https://www.jaydevmulticomm.com/markets' },
};

export default function MarketsPage() {
  return <MarketsClient />;
}
