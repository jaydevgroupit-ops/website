import Link from 'next/link';
import type { Metadata } from 'next';
import { faqs } from '@/lib/faqs';
import FaqAccordion from '@/components/FaqAccordion';
import { Icon } from '@/components/Icon';
import { SITE_URL } from '@/lib/site';
import { breadcrumb, jsonLdScript } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'FAQ - Export, Payment & Documentation',
  description:
    'Answers on Jaydev Group products, export markets, payment terms (LC at sight / 30-70), MOQ, lead times, documentation, and how to request a quote.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-white pt-16 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script {...jsonLdScript(breadcrumb([{ name: 'FAQ', path: '/faq' }]))} />

      <div className="bg-surface py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(238,246,236,0.10),rgba(238,246,236,0.04)_35%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="section-label mb-3">FAQ</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-ink mb-4">Frequently Asked Questions</h1>
          <p className="text-ink-soft text-lg">Everything buyers ask about products, payment, shipping &amp; documentation.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <FaqAccordion />

        <div className="on-ink bg-ink rounded-2xl p-8 text-center mt-10">
          <h2 className="font-jakarta text-xl font-extrabold text-white mb-2">Still have a question?</h2>
          <p className="text-white/60 mb-5 text-sm">Our trade desk responds within 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-lime px-7 py-3">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a href="https://wa.me/919099796811" target="_blank" rel="noopener noreferrer" className="btn-ghost-white px-7 py-3">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
