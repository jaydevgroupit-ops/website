'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from './Icon';

/**
 * Trade terms, drawn rather than tabulated.
 *
 * An incoterm is not a label - it is the point on the journey where cost and risk
 * stop being ours and start being the buyer's. That is a spatial fact, so the
 * section leads with a responsibility chart: six stages across, one bar per term
 * showing exactly how far we carry the shipment. A buyer reads their answer off
 * it in a second, which a label/value table can never do.
 */

const STAGES = ['Seller plant', 'Inland haulage', 'Load port', 'On board', 'Ocean freight', 'Destination port'];

type Term = { code: string; name: string; reach: number; note: string; insured?: boolean };
const TERMS: Term[] = [
  { code: 'EXW', name: 'Ex Works',                reach: 0, note: 'You collect from the plant. We hand over documents and loading assistance only.' },
  { code: 'FOB', name: 'Free On Board',           reach: 3, note: 'We carry it to the load port and across the ship’s rail. Freight and insurance are yours from there.' },
  { code: 'CFR', name: 'Cost & Freight',          reach: 5, note: 'We pay ocean freight through to your destination port. Marine insurance is yours.' },
  { code: 'CIF', name: 'Cost, Insurance & Freight', reach: 5, insured: true, note: 'Everything under CFR, plus marine insurance in your name for the voyage.' },
];

const FACTS = [
  { v: '25 MT', k: 'Minimum order', sub: 'per grade, per shipment' },
  { v: '24 h',  k: 'CIF quote',     sub: 'from a complete enquiry' },
  { v: '7–25', k: 'Days transit', sub: 'Gulf through West Africa' },
];

const DOCS = ['COA', 'MSDS', 'Certificate of Origin', 'Bill of Lading', 'Packing List', 'IMDG Declaration'];
const PACKING = ['25 kg HDPE', 'Drums', 'Jumbo bags', 'ISO tank', 'Flexitank'];
const PORTS = ['Mundra', 'JNPT', 'Hazira', 'Kandla'];

export default function TradeTerms() {
  const [active, setActive] = useState(2); // CFR - the most common ask

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* hexagon lattice - the benzene ring, tiled. Structure, not wallpaper:
          it sits behind the chart and fades out where the type begins. */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full" style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 70% 30%, #000 20%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 70% 30%, #000 20%, transparent 75%)' }}>
        <defs>
          <pattern id="tt-hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(.8)">
            <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="#39CE22" strokeWidth="1.1" opacity=".34" />
            <path d="M28 64 L56 80 L56 112 L28 128 L0 112 L0 80 Z" fill="none" stroke="#39CE22" strokeWidth="1.1" opacity=".34" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tt-hex)" />
      </svg>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="mb-8 max-w-2xl">
          <span className="section-label mb-2">Trade Terms</span>
          <h2 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-ink mb-2">Where our responsibility ends</h2>
          <p className="text-ink-soft text-sm sm:text-base">
            Pick the incoterm and the chart shows exactly how far we carry the shipment &mdash; and where cost and risk pass to you.
          </p>
        </div>

        {/* ── responsibility chart ── */}
        <div className="rounded-2xl border border-line bg-white p-5 sm:p-7">
          {/* stage scale */}
          <div className="hidden sm:grid grid-cols-6 gap-1 mb-2 pl-[104px]">
            {STAGES.map((s, i) => (
              <div key={s} className="text-[9.5px] font-mono uppercase tracking-[0.1em] text-ink-subtle leading-tight">
                <span className="block h-3 w-px bg-line mb-1.5" aria-hidden="true" />
                {s}
              </div>
            ))}
          </div>

          <ul className="space-y-2">
            {TERMS.map((t, i) => {
              const on = active === i;
              const pct = ((t.reach + 1) / STAGES.length) * 100;
              return (
                <li key={t.code}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`w-full text-left flex items-center gap-3 sm:gap-4 rounded-xl px-3 py-2.5 transition-colors ${on ? 'bg-lime-tint' : 'hover:bg-ink-pale'}`}
                  >
                    <span className="w-[76px] sm:w-[88px] flex-shrink-0">
                      <span className={`font-mono font-bold text-sm ${on ? 'text-lime-text' : 'text-ink'}`}>{t.code}</span>
                      <span className="block text-[10px] text-ink-subtle leading-tight truncate">{t.name}</span>
                    </span>

                    {/* the bar - how far we carry it */}
                    <span className="relative flex-1 h-7 rounded-md bg-ink-pale overflow-hidden" aria-hidden="true">
                      <span
                        className={`absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out ${on ? 'bg-lime' : 'bg-ink/15'}`}
                        style={{ width: `${pct}%` }}
                      />
                      {/* stage ticks */}
                      {STAGES.slice(1).map((_, k) => (
                        <span key={k} className="absolute inset-y-0 w-px bg-white/60" style={{ left: `${((k + 1) / STAGES.length) * 100}%` }} />
                      ))}
                      {/* CIF reaches exactly as far as CFR - the difference is cover,
                          not distance - so it reads as a hatched overlay, not a longer bar. */}
                      {t.insured && (
                        <>
                          <span
                            className="absolute inset-y-0 left-0 rounded-md"
                            style={{
                              width: `${pct}%`,
                              backgroundImage:
                                'repeating-linear-gradient(135deg, rgba(255,255,255,.55) 0 3px, transparent 3px 8px)',
                            }}
                          />
                          <span className={`absolute inset-y-0 right-2 flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider ${on ? 'text-ink' : 'text-ink-subtle'}`}>
                            <Icon name="ShieldCheck" className="w-3.5 h-3.5" />
                            Insured
                          </span>
                        </>
                      )}
                    </span>

                    <span className={`hidden sm:block w-24 flex-shrink-0 text-[10px] font-mono uppercase tracking-wider text-right ${on ? 'text-lime-text' : 'text-ink-subtle'}`}>
                      {t.reach === 0 ? 'at our gate' : t.reach === 3 ? 'on board' : t.insured ? 'your port + cover' : 'your port'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 pt-4 border-t border-line-faint text-sm text-ink-muted min-h-[2.5rem]">
            <span className="font-mono font-bold text-ink text-xs mr-2">{TERMS[active].code}</span>
            {TERMS[active].note}
          </p>
        </div>

        {/* ── the three numbers a buyer decides on ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {FACTS.map((f) => (
            <div key={f.k} className="rounded-2xl border border-line bg-white px-5 py-4">
              <div className="font-jakarta font-extrabold text-ink text-2xl leading-none tabular-nums">{f.v}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mt-2">{f.k}</div>
              <div className="text-ink-soft text-xs mt-0.5">{f.sub}</div>
            </div>
          ))}
        </div>

        {/* ── payment: the commercial headline, given its own weight ── */}
        <div className="mt-4 rounded-2xl border-2 border-ink bg-white overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-44 flex-shrink-0 bg-ink px-5 py-4 flex items-center gap-2">
              <Icon name="ShieldCheck" className="w-4 h-4 text-lime-light" strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-white">Payment</span>
            </div>
            <div className="flex-1 px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-lime-text mb-1">Option A</div>
                <p className="text-ink text-sm font-semibold leading-snug">Irrevocable, confirmed, non-transferable LC 100% at sight</p>
              </div>
              <div className="md:border-l md:border-line md:pl-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-lime-text mb-1">Option B</div>
                <p className="text-ink text-sm font-semibold leading-snug">30% cash in advance, 70% against clearance documents</p>
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5 bg-surface border-t border-line text-xs text-ink-soft">
            Established buyers: LC, TT or DA/DP.
          </div>
        </div>

        {/* ── the rest, compact ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Load ports', items: PORTS, icon: 'Anchor' },
            { label: 'Packing', items: PACKING, icon: 'Boxes' },
            { label: 'Documents', items: DOCS, icon: 'FileText' },
          ].map((g) => (
            <div key={g.label} className="rounded-2xl border border-line bg-white px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name={g.icon} className="w-4 h-4 text-lime-text" strokeWidth={1.8} />
                <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle">{g.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-ink-pale border border-line text-ink-muted font-medium">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/quote" className="btn-lime text-sm">Get a CIF quote</Link>
          <span className="text-ink-subtle text-xs">Priced within 24 hours of a complete enquiry.</span>
        </div>
      </div>
    </section>
  );
}
