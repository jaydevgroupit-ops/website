'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StatCounter from './StatCounter';
import { Icon } from './Icon';
import { COMPANY } from '@/lib/content';

const STATS = [
  { num: 5000, suffix: '+', label: 'MT / Month Capacity' },
  { num: 100, suffix: '+', label: 'Chemicals Supplied' },
  { num: 30, suffix: '+', label: 'Export Markets' },
  { num: 100, suffix: '+', label: 'Global Buyers' },
];

const VERBS = ['Sourced', 'Documented', 'Shipped', 'Delivered'];

/**
 * Cinematic dark narrative - "a single obsession, suspended in darkness".
 * A monumental radial-spoke disc (chemistry's geometry) rotates slowly, cropped
 * beyond the viewport, while numbered philosophy pillars reveal from shadow as
 * you descend. Engineering-notation left rail. Precision crosshair cursor.
 * Adapted for an industrial chemical exporter: The Source · The Proof · The Reach.
 */

// chemical product names that ride between the spokes of the rotating disc
const DISC_NAMES = [
  'Caustic Soda', 'Sulphuric Acid', 'Hydrogen Peroxide', 'Calcium Chloride',
  'Soda Ash', 'PAC', 'SMBS', 'Hydrochloric Acid',
  'Sodium Sulphate', 'Citric Acid', 'Zinc Sulphate', 'Potassium Hydroxide',
  'Sodium Hypochlorite', 'Aluminium Sulphate', 'Ferric Chloride', 'Acetic Acid',
  'Phosphoric Acid', 'Sodium Bicarbonate', 'Magnesium Sulphate', 'Copper Sulphate',
  'Boric Acid', 'Oxalic Acid', 'Potassium Carbonate', 'Sodium Silicate',
];

const pillars = [
  {
    n: '01', tag: 'Philosophy', title: 'The Source', icon: 'Factory',
    lede: 'No intermediaries between the molecule and your manifest',
    body: 'We draw direct from India’s foundational producers - GACL, Grasim, Reliance, IOCL, Tata Chemicals, Nirma & others. Best factory price, no middlemen, every tonne traced to its furnace.',
    metrics: [['Manufacturer-direct', 'GACL & Grasim authorized'], ['9', 'Foundational producers']],
  },
  {
    n: '02', tag: 'Craft', title: 'The Proof', icon: 'ShieldCheck',
    lede: 'Documentation is not paperwork. It is our signature',
    body: 'Every batch ships with its own certificate of truth - COA, MSDS, BL, COO, Packing List & IMDG, as standard. Quality systems audited to ISO 9001, 14001 & 45001. Nothing ships unverified.',
    metrics: [['ISO 9001 · 14001 · 45001', 'Certified systems'], ['COA + MSDS', 'On every batch']],
  },
  {
    n: '03', tag: 'Reach', title: 'The Reach', icon: 'Globe',
    lede: 'Chemistry in motion, across oceans',
    body: 'From Mundra and JNPT to thirty nations - East Africa, the Gulf, Southeast Asia. Regular FCL & LCL, fully documented, export-ready and on schedule, consistently.',
    metrics: [['30+', 'Export markets'], ['5000+ MT', 'Moved monthly']],
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [cross, setCross] = useState({ x: 0, y: 0, on: false });
  const [verb, setVerb] = useState(0); // compact looping action-word sequence

  useEffect(() => {
    const id = setInterval(() => setVerb((v) => (v + 1) % VERBS.length), 1100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = panelRefs.current.findIndex((el) => el === e.target);
            if (i >= 0) setActive(i);
          }
        });
      },
      // zero-height band at the exact viewport centre - exactly one stacked
      // panel crosses it at a time, so the active index is always correct
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    panelRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    setCross({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={() => setCross((c) => ({ ...c, on: false }))}
      className="relative bg-[#0A1730] cursor-crosshair"
      style={{ background: 'linear-gradient(180deg,#0A1730 0%,#0A1730 70%,#0B1B38 100%)' }}
    >
      {/* clip layer - holds the bleeding disc so the section itself has no overflow:hidden
          (which would break the sticky rail) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* monumental radial-spoke disc - cropped, bleeds beyond viewport, slow rotation */}
        <div className="absolute -right-[22%] top-1/2 -translate-y-1/2 hidden md:block">
          <div className="relative w-[78vw] h-[78vw] max-w-[1100px] max-h-[1100px] animate-[jd-spin_160s_linear_infinite]">
            {/* radial spokes */}
            <div
              className="absolute inset-0 opacity-[0.22]"
              style={{
                background:
                  'repeating-conic-gradient(from 0deg, rgba(232,184,75,0.55) 0deg 0.25deg, transparent 0.25deg 7.5deg)',
                borderRadius: '50%',
                WebkitMaskImage:
                  'radial-gradient(circle, transparent 30%, #000 31%, #000 68%, transparent 71%)',
                maskImage:
                  'radial-gradient(circle, transparent 30%, #000 31%, #000 68%, transparent 71%)',
              }}
            />
            {/* chemical product names written between the spokes - orbit with the disc */}
            {DISC_NAMES.map((name, i) => {
              // spokes sit every 7.5° (conic gradient); +3.75° centres each name
              // in the middle of a wedge gap rather than on a spoke line
              const ang = (i / DISC_NAMES.length) * 360 + 3.75;
              const rad = (ang * Math.PI) / 180;
              return (
                <span
                  key={name}
                  className="absolute font-mono text-[11px] lg:text-sm uppercase tracking-[0.14em] text-gold-light/25 whitespace-nowrap"
                  style={{
                    // anchor each name's INNER edge at the same radius (16%) and let it
                    // read outward along the spoke - so every name starts on the same line
                    left: `${50 + Math.cos(rad) * 16}%`,
                    top: `${50 + Math.sin(rad) * 16}%`,
                    transformOrigin: '0 0',
                    transform: `rotate(${ang}deg) translateY(-50%)`,
                  }}
                >
                  {name}
                </span>
              );
            })}
          </div>
          {/* glowing hub + rim */}
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 140px 40px rgba(201,146,42,0.06)' }} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(201,146,42,0.10),transparent_45%)]" />
      </div>

      {/* precision crosshair cursor */}
      {cross.on && (
        <div className="pointer-events-none absolute inset-0 z-30 hidden md:block overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-gold/20" style={{ top: cross.y }} />
          <div className="absolute top-0 bottom-0 w-px bg-gold/20" style={{ left: cross.x }} />
          <div
            className="absolute w-5 h-5 border border-gold/50 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: cross.x, top: cross.y }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* page h1 for SEO/a11y - visually hidden, the cinematic panels carry the visual headline */}
        <h1 className="sr-only">
          Jaydev Multicomm - Industrial Chemical Exporter in India. 100+ chemicals shipped to 30+ countries.
        </h1>

        {/* compact looping action-word sequence - opens the page with motion */}
        <div className="pt-28 sm:pt-32 pb-8 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2">
          {VERBS.map((v, i) => (
            <span key={v} className="flex items-center gap-3 sm:gap-5">
              <motion.span
                animate={{ opacity: verb === i ? 1 : 0.55, y: verb === i ? -2 : 0 }}
                transition={{ duration: 0.45 }}
                className={`font-mono text-[11px] sm:text-sm uppercase tracking-[0.3em] ${verb === i ? 'text-gradient-gold' : 'text-white/55'}`}
              >
                {v}
              </motion.span>
              {i < VERBS.length - 1 && <span className="w-1 h-1 rounded-full bg-gold/40" />}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] gap-8">
          {/* ── numbered engineering-notation rail ── */}
          <div className="hidden lg:block">
            <div className="sticky top-1/2 -translate-y-1/2 py-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">The Obsession</div>
              <ul className="space-y-5">
                {pillars.map((p, i) => (
                  <li key={p.n}>
                    <button
                      onClick={() => panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      className="group flex items-baseline gap-3 text-left"
                    >
                      <span className={`font-mono text-sm transition-colors ${active === i ? 'text-gold' : 'text-white/25'}`}>{p.n}</span>
                      <span className={`font-jakarta text-sm font-semibold transition-colors ${active === i ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>
                        {p.title}
                      </span>
                      <span className={`h-px transition-all duration-500 ${active === i ? 'w-8 bg-gold' : 'w-3 bg-white/15'}`} />
                    </button>
                  </li>
                ))}
                {/* 4th point - the finale */}
                <li>
                  <button
                    onClick={() => panelRefs.current[3]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="group flex items-baseline gap-3 text-left"
                  >
                    <span className={`font-mono text-sm transition-colors ${active === 3 ? 'text-gold' : 'text-white/25'}`}>04</span>
                    <span className={`font-jakarta text-sm font-semibold transition-colors ${active === 3 ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>Worldwide</span>
                    <span className={`h-px transition-all duration-500 ${active === 3 ? 'w-8 bg-gold' : 'w-3 bg-white/15'}`} />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* ── full-bleed reveal panels ── */}
          <div>
            {pillars.map((p, i) => (
              <div
                key={p.n}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="min-h-[56vh] sm:min-h-[72vh] flex flex-col justify-center py-12 sm:py-16"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-20%' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-gold text-sm">{p.n}</span>
                    <span className="h-px w-10 bg-gold/40" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-white/40">{p.tag}</span>
                  </div>

                  <h2 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[0.95] mb-6 tracking-[-0.02em]">
                    {p.title}
                  </h2>

                  <p className="text-gold-light/90 text-xl sm:text-2xl font-light leading-snug mb-5 max-w-xl">{p.lede}</p>
                  <p className="text-white/55 text-base leading-relaxed max-w-lg mb-9">{p.body}</p>

                  <div className="flex flex-wrap gap-x-12 gap-y-5">
                    {p.metrics.map(([k, label]) => (
                      <div key={label}>
                        <div className="font-jakarta text-2xl font-extrabold text-gradient-gold leading-none">{k}</div>
                        <div className="text-white/40 text-xs mt-1.5 uppercase tracking-wider">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* producer marquee - merged in from the old "Sourcing Ecosystem" section */}
                  {i === 0 && (
                    <div className="mt-11 max-w-xl">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-3">Backed by India&apos;s leading producers</div>
                      <div className="marquee-mask overflow-hidden">
                        <div className="flex w-max animate-jd-marquee" style={{ animationDuration: '32s' }}>
                          {[...COMPANY.manufacturers, ...COMPANY.manufacturers].map((m, k) => (
                            <span key={k} className="flex items-center gap-1.5 px-5 whitespace-nowrap font-jakarta font-bold text-white/45">
                              {m.name}
                              {m.badge && <Icon name="BadgeCheck" className="w-3.5 h-3.5 text-gold/70" />}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}

            {/* ── 04 · Finale - the journey resolves: from Gujarat to the world ── */}
            <div
              ref={(el) => { panelRefs.current[3] = el; }}
              className="min-h-[72vh] sm:min-h-[88vh] flex flex-col justify-center py-12 sm:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                {/* four-verb recap of the journey just witnessed */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-gold text-sm">04</span>
                  <span className="h-px w-10 bg-gold/40" />
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/40">Sourced · Documented · Shipped · Delivered</span>
                </div>

                <h2 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[0.95] mb-6 tracking-[-0.02em]">
                  From Gujarat to <span className="text-gradient-gold not-italic font-jakarta font-extrabold">30+ countries</span>
                </h2>
                <p className="text-white/55 text-lg leading-relaxed max-w-lg mb-10">
                  Manufacturer-backed, fully documented, export-ready. 100+ industrial chemicals, one trusted partner.
                </p>

                {/* stats strip (moved in from the old hero band) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 mb-11 max-w-2xl items-start">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-gradient-gold leading-none whitespace-nowrap">
                        <StatCounter end={s.num} suffix={s.suffix} />
                      </div>
                      <div className="text-white/40 text-xs mt-2 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <Link href="/quote" className="btn-gold px-7 py-3.5 text-base">
                    Get CIF Quote <Icon name="ArrowRight" className="w-4 h-4" />
                  </Link>
                  <a href="/Jaydev-Multicomm-Catalogue.pdf" download className="btn-ghost-white px-7 py-3.5 text-base">
                    <Icon name="Download" className="w-4 h-4" /> Catalogue
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
