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
      <div className="min-h-screen bg-white pt-20 pb-20">
        <div className="bg-surface py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <span className="section-label mb-3">Get Quote</span>
            <h1 className="font-jakarta text-4xl font-extrabold text-ink mb-3">Request a Quote in 3 Steps</h1>
            <p className="text-ink-soft">
              Tell us what you need - a detailed CIF/FOB quote follows within 48 hours.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-10 text-ink-subtle text-sm">Loading the quote form…</div>
      </div>
    }>
      <QuoteClient />
    </Suspense>
  );
}
