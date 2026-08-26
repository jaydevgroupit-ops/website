'use client';

import Link from 'next/link';
import { marketData, BRANCHES } from '@/lib/content';
import { Icon } from './Icon';

const WaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const LOAD_PORTS = {
  west: ['Mundra', 'JNPT (Nhava Sheva)', 'Hazira', 'Kandla'],
  east: ['Visakhapatnam', 'Chennai', 'Krishnapatnam', 'Kolkata / Haldia'],
};
const INCOTERMS = ['EXW', 'FOB', 'CFR', 'CIF'];
const DOCS = ['COA', 'MSDS', 'Certificate of Origin', 'Bill of Lading', 'Packing List', 'IMDG Declaration'];

/** One label + value row inside a region card. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-2 border-t border-[#F1F5F9]">
      <span className="w-16 flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-gray-400 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-navy-mid leading-relaxed">{children}</span>
    </div>
  );
}

export default function MarketsClient() {
  const indiaOffices = BRANCHES.filter((b) => b.country === 'India');
  const totalCountries = marketData.reduce((n, m) => n + m.countries.length, 0);

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* ── Hero ── */}
      <div className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Where We Supply</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">
            India &amp; Global Markets
          </h1>
          <p className="text-white/65 max-w-xl mx-auto text-lg">
            We sell across India and export to four regions. Full documentation either way.
          </p>

          {/* summary strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mt-10 max-w-3xl mx-auto">
            {[
              ['Pan-India', 'Domestic supply'],
              ['4', 'Export regions'],
              [`${totalCountries}+`, 'Countries served'],
              ['7-25', 'Days transit'],
            ].map(([v, l]) => (
              <div key={l} className="bg-navy px-4 py-4">
                <div className="font-jakarta font-extrabold text-gold-light text-xl sm:text-2xl leading-none">{v}</div>
                <div className="text-white/45 text-[11px] uppercase tracking-wider mt-1.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-14">
        {/* ── Domestic ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 sm:gap-4 mb-5">
            <h2 className="font-jakarta text-2xl font-extrabold text-navy">Domestic - India</h2>
            <span className="text-gray-400 text-sm">Jaydev Pharma &amp; Intermediates LLP</span>
          </div>

          <div className="rounded-2xl border border-[#EAEEF3] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EAEEF3]">
              {indiaOffices.map((b) => (
                <div key={b.city} className="bg-white px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-jakarta font-bold text-navy">{b.city}</span>
                    {b.hq && (
                      <span className="text-[9px] bg-gold text-white px-2 py-0.5 rounded-full font-bold tracking-wide">HQ</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{b.role}</div>
                </div>
              ))}
            </div>
            <div className="bg-navy-pale px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-navy-mid text-sm leading-relaxed max-w-2xl">
                Both portfolios to manufacturers nationwide - chemicals, intermediates, APIs and excipients.
                Bulk and spot, with credit terms.
              </p>
              <Link href="/quote" className="btn-navy px-6 py-2.5 text-sm flex-shrink-0">
                Domestic enquiry <Icon name="ArrowRight" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Export regions ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 sm:gap-4 mb-5">
            <h2 className="font-jakarta text-2xl font-extrabold text-navy">Export regions</h2>
            <span className="text-gray-400 text-sm">Jaydev Multicomm Pvt. Ltd.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {marketData.map((m) => (
              <article
                key={m.id}
                id={m.id}
                className="scroll-mt-24 rounded-2xl border border-[#EAEEF3] bg-white p-6 transition-all hover:border-gold/40 hover:shadow-[0_18px_44px_-22px_rgba(14,32,64,0.28)]"
              >
                <header className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-jakarta font-extrabold text-navy text-xl leading-tight">{m.name}</h3>
                    <span className="text-gray-400 text-xs">{m.countries.length} countries</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-jakarta font-extrabold text-gold-dark text-2xl leading-none tabular-nums">
                      {m.leadTime.replace(/\s*days?/i, '')}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">days transit</div>
                  </div>
                </header>

                <Row label="Markets">{m.countries.join(' · ')}</Row>
                <Row label="Ports">{m.ports.map((p) => p.replace(/\s*\(.*\)/, '')).join(' · ')}</Row>
                <Row label="Sending">
                  <span className="text-navy font-medium">{m.keyProducts.slice(0, 4).join(' · ')}</span>
                </Row>

                <div className="flex items-center justify-between gap-3 pt-4 mt-1 border-t border-[#F1F5F9]">
                  <Link
                    href={`/quote?market=${m.id}`}
                    className="group inline-flex items-center gap-2 font-jakarta font-bold text-navy text-sm hover:text-gold-dark transition-colors"
                  >
                    Quote for {m.name}
                    <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`https://wa.me/919099796811?text=Hi%2C%20I%20need%20chemicals%20for%20${encodeURIComponent(m.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp enquiry for ${m.name}`}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-50 border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                  >
                    <WaIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── How we ship ── */}
        <section>
          <h2 className="font-jakarta text-2xl font-extrabold text-navy mb-5">How we ship</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Load ports - split by coast, since the coast decides the routing */}
            <div className="rounded-2xl border border-[#EAEEF3] p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <Icon name="Anchor" className="w-5 h-5 text-gold" strokeWidth={1.7} />
                <h3 className="font-jakarta font-bold text-navy">Load ports</h3>
              </div>
              <div className="space-y-3.5">
                {[
                  { coast: 'West coast', note: 'Africa, GCC', items: LOAD_PORTS.west },
                  { coast: 'East coast', note: 'SE Asia', items: LOAD_PORTS.east },
                ].map((g) => (
                  <div key={g.coast}>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{g.coast}</span>
                      <span className="text-[10px] text-gray-300">{g.note}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-navy-pale border border-navy-light text-navy-mid font-medium">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {[
              { icon: 'Ship', title: 'Incoterms', items: INCOTERMS },
              { icon: 'FileText', title: 'Documents', items: DOCS },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-[#EAEEF3] p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon name={b.icon} className="w-5 h-5 text-gold" strokeWidth={1.7} />
                  <h3 className="font-jakarta font-bold text-navy">{b.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {b.items.map((i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-navy-pale border border-navy-light text-navy-mid font-medium"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4">
            MOQ typically from 25 MT. HDPE bags, drums, jumbo bags, ISO tanks or flexitanks.
            Payment by LC at sight, or 30% advance and 70% against documents.
          </p>
        </section>

        {/* ── CTA ── */}
        <section className="bg-navy rounded-2xl p-10 text-center">
          <h2 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Shipping somewhere else?
          </h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Send us the product, quantity and destination port. We reply within 48 hours.
          </p>
          <Link href="/quote" className="btn-gold px-8 py-3">
            Request a Quote <Icon name="ArrowRight" className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
