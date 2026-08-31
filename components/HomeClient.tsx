'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ProcessFlow from './ProcessFlow';
import FeaturedCarousel from './FeaturedCarousel';
import { Icon } from './Icon';
import { industryData, INDUSTRY_IMAGE_MAP, BRANCHES, CERTIFICATIONS, products, categories , sectorProductCount } from '@/lib/content';
import { pharmaProducts, PHARMA_SECTIONS, THERAPEUTIC_SEGMENTS } from '@/lib/pharma';

const Philosophy = dynamic(() => import('./Philosophy'));


const WaIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  // WhatsApp is a third-party mark: #25D366 lives on the glyph and nowhere else.
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-[#25D366]`}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

export default function HomeClient({ news }: { news?: React.ReactNode }) {
  return (
    <>
      {/* ═══ HERO = CINEMATIC NARRATIVE - The Obsession. Opens the page; ends with
              the "From Gujarat → 30+ countries" finale + stats + CTA ═══ */}
      <Philosophy />

      {/* smooth bridge from the cinematic dark into the light sections */}
      <div className="h-10 bg-white" />

      {/* ═══ WHAT WE SUPPLY - named molecules, not category lists.
             The /products page does taxonomy; /about does structure.
             This section's only job is to show real product names fast. ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">What We Supply</span>
            <h2 className="font-jakarta text-3xl sm:text-[2.5rem] font-extrabold text-ink leading-tight">
              {products.length + pharmaProducts.length} products, ready to quote
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Two divisions, one structure: name, then formula / CAS in mono.
                Industrial carries both; pharma carries CAS. */}
            {[
              {
                href: '/products?division=industrial',
                title: 'Industrial Chemicals',
                count: products.length,
                surface: 'bg-white border border-line-soft',
                names: ['Caustic Soda', 'Sulphuric Acid', 'PAC', 'SMBS', 'Hydrogen Peroxide', 'Calcium Chloride'],
                lookup: (n: string) => products.find((p) => p.name === n || p.name.startsWith(n)),
              },
              {
                href: '/products?division=pharma',
                title: 'Pharma & APIs',
                count: pharmaProducts.length,
                surface: 'bg-lime-tint border border-lime/25',
                names: ['Paclitaxel', 'Azithromycin', 'Heparin Sodium', 'Budesonide', 'Acyclovir', 'Propofol'],
                lookup: (n: string) => pharmaProducts.find((p) => p.name.toLowerCase() === n.toLowerCase()),
              },
            ].map((col) => (
              <Link
                key={col.title}
                href={col.href}
                className={`group relative overflow-hidden rounded-3xl p-7 sm:p-8 transition-all hover:border-lime/40 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.22)] ${col.surface}`}
              >
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-jakarta font-extrabold text-ink text-2xl">{col.title}</span>
                  <span className="font-jakarta font-extrabold text-lime-text text-lg tabular-nums">{col.count}</span>
                </div>

                <ul className="grid grid-cols-2 gap-x-5 gap-y-3 mb-7">
                  {col.names.map((n) => {
                    const hit = col.lookup(n) as { formula?: string; cas?: string } | undefined;
                    const formula = hit?.formula && hit.formula !== '-' ? hit.formula : null;
                    const meta = [formula, hit?.cas ? `CAS ${hit.cas}` : null].filter(Boolean).join('  ');
                    return (
                      <li key={n} className="flex flex-col pb-1">
                        <span className="text-ink text-sm font-semibold leading-tight">{n}</span>
                        {meta && <span className="font-mono text-[11px] text-lime-text mt-0.5">{meta}</span>}
                      </li>
                    );
                  })}
                </ul>

                <span className="inline-flex items-center gap-2 font-jakarta font-bold text-ink text-sm group-hover:text-lime-text transition-colors">
                  See all {col.count}
                  <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <FeaturedCarousel />
          </div>
        </div>
      </section>

      {news}

      {/* ═══ PROCESS FLOW ═══ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">How We Work</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-ink mb-3">How an Order Works</h2>
          </div>
          <ProcessFlow />
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-label mb-3">Industries</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-ink mb-3">Sectors We Supply</h2>
            <p className="text-ink-soft max-w-xl mx-auto">Solutions for {industryData.length} sectors - water, mining, coatings, care, agro &amp; more</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industryData.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
              >
                <Link
                  href={`/industries/${ind.id}`}
                  className="group relative block rounded-2xl border border-line bg-white p-5 overflow-hidden hover:border-lime/40 hover:bg-white transition-all h-full"
                >
                  {INDUSTRY_IMAGE_MAP[ind.id] && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                      <Image src={INDUSTRY_IMAGE_MAP[ind.id]} alt={ind.name} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
                    </div>
                  )}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-lime/15 flex items-center justify-center mb-3 group-hover:bg-lime/25 transition-colors">
                      <Icon name={ind.icon} className="w-6 h-6 text-lime-text" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-jakarta font-bold text-ink text-sm mb-1 group-hover:text-lime-text transition-colors">{ind.name}</h3>
                    <p className="text-ink-subtle text-xs">{sectorProductCount(ind, pharmaProducts)} products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/industries" className="btn-lime px-8 py-3">View All Industries <Icon name="ArrowRight" className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* "Why Us" pillars merged into the Philosophy Source/Proof/Reach pillars */}




      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 bg-lime-tint relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(57,206,34,0.06),rgba(57,206,34,0.025)_35%,transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="section-label mb-4">Get Started</span>
          <h2 className="font-jakarta text-4xl font-extrabold text-ink mb-4">Need a Quote?</h2>
          <p className="text-ink-muted text-lg mb-8 max-w-xl mx-auto">
            Submit your RFQ and receive a detailed CIF quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-lime px-10 py-4 text-base">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a
              href="https://wa.me/919099796811?text=Hi%2C%20I%20need%20a%20quote%20for%20industrial%20chemicals"
              target="_blank" rel="noopener noreferrer"
              className="btn-ink px-8 py-4"
            >
              <WaIcon /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
