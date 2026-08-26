'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ProcessFlow from './ProcessFlow';
import FeaturedCarousel from './FeaturedCarousel';
import { Icon } from './Icon';
import { industryData, INDUSTRY_IMAGE_MAP, BRANCHES, CERTIFICATIONS, products, categories } from '@/lib/content';
import { pharmaProducts, PHARMA_SECTIONS, THERAPEUTIC_SEGMENTS } from '@/lib/pharma';

const Philosophy = dynamic(() => import('./Philosophy'));


const WaIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

export default function HomeClient() {
  return (
    <>
      {/* ═══ HERO = CINEMATIC NARRATIVE - The Obsession. Opens the page; ends with
              the "From Gujarat → 30+ countries" finale + stats + CTA ═══ */}
      <Philosophy />

      {/* smooth bridge from the cinematic dark into the light sections */}
      <div className="h-20 bg-gradient-to-b from-[#0B1B38] to-white" />

      {/* ═══ WHAT WE SUPPLY - named molecules, not category lists.
             The /products page does taxonomy; /about does structure.
             This section's only job is to show real product names fast. ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">What We Supply</span>
            <h2 className="font-jakarta text-3xl sm:text-[2.5rem] font-extrabold text-navy leading-tight">
              {products.length + pharmaProducts.length} products, ready to quote
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Industrial */}
            <Link
              href="/products?division=industrial"
              className="group relative overflow-hidden rounded-3xl border border-[#EAEEF3] bg-white p-7 sm:p-8 transition-all hover:border-gold/40 hover:shadow-[0_20px_50px_-24px_rgba(14,32,64,0.3)]"
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-jakarta font-extrabold text-navy text-2xl">Industrial Chemicals</span>
                <span className="font-jakarta font-extrabold text-gold-dark text-lg tabular-nums">{products.length}</span>
              </div>

              <ul className="grid grid-cols-2 gap-x-5 gap-y-3 mb-7">
                {['Caustic Soda', 'Sulphuric Acid', 'PAC', 'SMBS', 'Hydrogen Peroxide', 'Calcium Chloride'].map((n) => {
                  const hit = products.find((p) => p.name === n || p.name.startsWith(n));
                  return (
                    <li key={n} className="flex items-baseline gap-2 border-b border-[#F1F5F9] pb-2.5">
                      <span className="text-navy text-sm font-semibold">{n}</span>
                      {hit?.formula && hit.formula !== '-' && (
                        <span className="font-mono text-[11px] text-gold-dark">{hit.formula}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <span className="inline-flex items-center gap-2 font-jakarta font-bold text-navy text-sm group-hover:text-gold-dark transition-colors">
                See all {products.length}
                <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Pharma */}
            <Link
              href="/products?division=pharma"
              className="group relative overflow-hidden rounded-3xl bg-navy p-7 sm:p-8 transition-all hover:shadow-[0_20px_50px_-24px_rgba(14,32,64,0.6)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full transition-transform duration-500 group-hover:scale-110"
                style={{ background: 'radial-gradient(circle, rgba(38,255,0,0.10), transparent 70%)' }}
              />
              <div className="relative flex items-baseline gap-3 mb-6">
                <span className="font-jakarta font-extrabold text-white text-2xl">Pharma &amp; APIs</span>
                <span className="font-jakarta font-extrabold text-gold-light text-lg tabular-nums">{pharmaProducts.length}</span>
              </div>

              <ul className="relative grid grid-cols-2 gap-x-5 gap-y-3 mb-7">
                {['Paclitaxel', 'Azithromycin', 'Heparin Sodium', 'Budesonide', 'Acyclovir', 'Propofol'].map((n) => {
                  const hit = pharmaProducts.find((p) => p.name.toLowerCase() === n.toLowerCase());
                  return (
                    <li key={n} className="flex flex-col border-b border-white/10 pb-2.5">
                      <span className="text-white/90 text-sm font-semibold leading-tight">{n}</span>
                      {hit?.cas && <span className="font-mono text-[11px] text-gold-light/70 mt-0.5">CAS {hit.cas}</span>}
                    </li>
                  );
                })}
              </ul>

              <span className="relative inline-flex items-center gap-2 font-jakarta font-bold text-white text-sm group-hover:text-gold-light transition-colors">
                See all {pharmaProducts.length}
                <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <div className="mt-14">
            <FeaturedCarousel />
          </div>
        </div>
      </section>

      {/* ═══ PROCESS FLOW ═══ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">How We Work</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">How an Order Works</h2>
          </div>
          <ProcessFlow />
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-14 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-label mb-3">Industries</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-white mb-3">Sectors We Supply</h2>
            <p className="text-white/60 max-w-xl mx-auto">Solutions for {industryData.length} sectors - water, mining, coatings, care, agro &amp; more</p>
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
                  className="group relative block rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden hover:border-gold/40 hover:bg-white/[0.08] transition-all h-full"
                >
                  {INDUSTRY_IMAGE_MAP[ind.id] && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                      <Image src={INDUSTRY_IMAGE_MAP[ind.id]} alt={ind.name} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
                    </div>
                  )}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center mb-3 group-hover:bg-gold/25 transition-colors">
                      <Icon name={ind.icon} className="w-6 h-6 text-gold-light" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-jakarta font-bold text-white text-sm mb-1 group-hover:text-gold-light transition-colors">{ind.name}</h3>
                    <p className="text-white/40 text-xs">{ind.productIds.length} core products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/industries" className="btn-gold px-8 py-3">View All Industries <Icon name="ArrowRight" className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* "Why Us" pillars merged into the Philosophy Source/Proof/Reach pillars */}


      {/* ═══ TRADE & PAYMENT TERMS ═══ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="section-label mb-3">Trade Terms</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">Trade Terms</h2>
            <p className="text-gray-500 max-w-xl mx-auto">LC at sight, or 30% advance and 70% against documents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Payment terms - featured */}
            <div className="card-white p-7 md:row-span-2 border-2 border-gold/30">
              <div className="w-12 h-12 rounded-xl bg-gold-bg flex items-center justify-center mb-4">
                <Icon name="ShieldCheck" className="w-6 h-6 text-gold-dark" strokeWidth={1.6} />
              </div>
              <h3 className="font-jakarta font-bold text-navy text-lg mb-3">Terms of Payment</h3>
              <div className="space-y-4">
                <div className="rounded-xl bg-navy-pale border border-navy-light p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-1">Option A - Letter of Credit</div>
                  <p className="text-navy text-sm leading-relaxed">
                    Irrevocable, Confirmed, Non-Transferable <strong>LC 100% at Sight</strong>
                  </p>
                </div>
                <div className="rounded-xl bg-navy-pale border border-navy-light p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-1">Option B - Advance & Balance</div>
                  <p className="text-navy text-sm leading-relaxed">
                    <strong>30% Cash in Advance</strong> and <strong>70% balance</strong> against Clearance Documents.
                  </p>
                </div>
                <p className="text-gray-400 text-xs">Established buyers: LC, TT or DA/DP.</p>
              </div>
            </div>

            {[
              { icon: 'Ship', title: 'Incoterms', body: 'EXW, FOB, CFR or CIF from Mundra, JNPT, Hazira and Kandla.' },
              { icon: 'FileText', title: 'Full Documentation', body: 'COA, MSDS, Certificate of Origin, Bill of Lading, Packing List, Commercial Invoice and IMDG declaration.' },
              { icon: 'Boxes', title: 'MOQ & Packing', body: 'MOQ from 25 MT. HDPE bags, drums, jumbo bags, ISO tanks or flexitanks.' },
              { icon: 'Clock', title: 'Lead Times', body: 'Gulf 7-12 days. East Africa 15-20. SE Asia 12-18. West Africa 18-25.' },
            ].map((t) => (
              <div key={t.title} className="card-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gold-bg flex items-center justify-center">
                    <Icon name={t.icon} className="w-5 h-5 text-gold-dark" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-jakarta font-bold text-navy">{t.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAND - Presence + Certifications (merged) ═══ */}
      <section className="py-12 bg-navy border-y border-navy-mid">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {/* Presence */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="lg:w-60 flex-shrink-0">
              <span className="section-label mb-2">Our Presence</span>
              <p className="text-white/55 text-sm leading-relaxed">Offices in India and Nigeria.</p>
            </div>
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {BRANCHES.map(b => (
                <div key={b.city} className={`rounded-xl border bg-white/[0.04] px-4 py-3 ${b.hq ? 'border-gold/40' : 'border-white/10'}`}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon name="MapPin" className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="font-jakarta font-bold text-white text-sm">{b.city}</span>
                    {b.hq && <span className="text-[9px] bg-gold text-white px-1.5 py-0.5 rounded-full font-semibold">HQ</span>}
                  </div>
                  <div className="text-white/45 text-[11px] pl-5">{b.country} · {b.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Certifications */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="lg:w-60 flex-shrink-0">
              <span className="section-label mb-2">Certified &amp; Compliant</span>
              <p className="text-white/55 text-sm leading-relaxed">Audited systems. Papers with every shipment.</p>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CERTIFICATIONS.map((c) => (
                <div key={c.code} className="flex flex-col items-center text-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-4">
                  <Icon name="BadgeCheck" className="w-5 h-5 text-gold-light mb-1.5" />
                  <span className="text-white font-jakarta font-bold text-xs leading-tight">{c.code}</span>
                  <span className="text-white/45 text-[10px] mt-0.5 leading-tight">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-14 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,146,42,0.12),transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="section-label mb-4">Get Started</span>
          <h2 className="font-jakarta text-4xl font-extrabold text-white mb-4">Need a Quote?</h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
            Submit your RFQ and receive a detailed CIF quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-gold px-10 py-4 text-base">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a
              href="https://wa.me/919099796811?text=Hi%2C%20I%20need%20a%20quote%20for%20industrial%20chemicals"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-500/15 border border-green-500/35 text-green-300 font-semibold hover:bg-green-500/25 transition-all"
            >
              <WaIcon /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
