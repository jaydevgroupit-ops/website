import { Suspense } from 'react';
import QuoteClient from '@/components/QuoteClient';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Request a Quote - Price in 48 Hours',
  description: 'Request a price for industrial chemicals or pharmaceutical APIs. We reply within 48 hours with grade, documentation and lead time.',
  alternates: { canonical: `${SITE_URL}/quote` },
};

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-white/40">Loading...</div>
      </div>
    }>
      <QuoteClient />
    </Suspense>
  );
}
