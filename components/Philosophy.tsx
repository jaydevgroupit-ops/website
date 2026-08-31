'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StatCounter from './StatCounter';
import { Icon } from './Icon';
import MoleculeField from './MoleculeField';
import { COMPANY } from '@/lib/content';

const STATS = [
  { num: 5000, suffix: '+', label: 'MT / Month Capacity' },
  { num: 100, suffix: '+', label: 'Chemicals Supplied' },
  { num: 30, suffix: '+', label: 'Export Markets' },
  { num: 100, suffix: '+', label: 'Global Buyers' },
];

const PANEL_COUNT = 4; // 3 pillars + the finale
const VERBS = ['Bought direct', 'Documented', 'Shipped', 'Delivered'];

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
    image: '/images/plant.jpg', alt: 'Chemical manufacturing plant',
    lede: 'We buy direct from the producer',
    body: 'GACL, Grasim, Reliance, IOCL, Tata Chemicals and Nirma. No middlemen, so you get factory price and we can trace every tonne back to the plant that made it.',
    metrics: [['Manufacturer-direct', 'GACL & Grasim authorized'], ['9', 'Foundational producers']],
  },
  {
    n: '02', tag: 'Craft', title: 'The Proof', icon: 'ShieldCheck',
    image: '/images/bags-drums.png', alt: 'Packed drums and bags awaiting despatch',
    lede: 'Every batch ships with its papers',
    body: 'COA, MSDS, Bill of Lading, Certificate of Origin, Packing List and IMDG declaration as standard. Our systems are audited to ISO 9001, 14001 and 45001.',
    metrics: [['ISO 9001 · 14001 · 45001', 'Certified systems'], ['COA / MSDS', 'On every batch']],
  },
  {
    n: '03', tag: 'Reach', title: 'The Reach', icon: 'Globe',
    image: '/images/logistics-port.png', alt: 'Container port loading operations',
    lede: 'We ship to 30+ countries',
    body: 'FCL out of Mundra, JNPT, Hazira and Kandla. East Africa, the Gulf, Southeast Asia, and others.',
    metrics: [['30+', 'Export markets'], ['5000+ MT', 'Moved monthly']],
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  /** Pinned = the four panels advance in place on one screen instead of stacking
   *  vertically. Costs one screen of scroll rather than six. Off for reduced
   *  motion, where the panels fall back to the plain stacked layout. */
  const [pinned, setPinned] = useState(false);
  const [cross, setCross] = useState({ x: 0, y: 0, on: false });
  const [verb, setVerb] = useState(0); // compact looping action-word sequence

  useEffect(() => {
    const id = setInterval(() => setVerb((v) => (v + 1) % VERBS.length), 1100);
    return () => clearInterval(id);
  }, []);

  // Decide whether to pin, and drive `active` from scroll progress when we do.
  useEffect(() => {
    // Width via matchMedia rather than innerWidth: it is event-driven, needs no
    // resize listener, and does not read 0 in headless contexts.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 768px)');
    // ?motion forces the pin on - the preview browser always reports reduced motion.
    const forced = new URLSearchParams(window.location.search).has('motion');
    const apply = () => setPinned((forced || !reduce.matches) && (forced || wide.matches));
    apply();
    reduce.addEventListener('change', apply);
    wide.addEventListener('change', apply);
    return () => { reduce.removeEventListener('change', apply); wide.removeEventListener('change', apply); };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = trackRef.current;
        if (!el) return;
        const travel = el.offsetHeight - window.innerHeight;
        if (travel <= 0) return;
        const progress = (window.scrollY - el.offsetTop) / travel;
        const i = Math.floor(progress * PANEL_COUNT);
        setActive(Math.min(PANEL_COUNT - 1, Math.max(0, i)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [pinned]);

  useEffect(() => {
    if (pinned) return; // stacked fallback only
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
  }, [pinned]);

  /** Rail navigation: seek the track when pinned, scroll the panel when stacked. */
  const goTo = (i: number) => {
    if (pinned && trackRef.current) {
      const el = trackRef.current;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: el.offsetTop + (travel * (i + 0.5)) / PANEL_COUNT, behavior: 'smooth' });
    } else {
      panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
      className="relative bg-white cursor-crosshair"
      style={{ background: 'var(--grad-hero)' }}
    >
      {/* clip layer - holds the bleeding disc so the section itself has no overflow:hidden
          (which would break the sticky rail) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* phones get drifting molecules instead of the disc */}
        <MoleculeField />
        {/* monumental radial-spoke disc - cropped, bleeds beyond viewport, slow rotation */}
        <div className="absolute hidden sm:block sm:-right-[28%] sm:top-1/2 sm:-translate-y-1/2 md:-right-[22%]">
          <div className="relative w-[100vw] md:w-[78vw] h-[100vw] md:h-[78vw] max-w-[1100px] max-h-[1100px] animate-[jd-spin_160s_linear_infinite]">
            {/* radial spokes */}
            <div
              className="absolute inset-0 opacity-[0.24] md:opacity-[0.22]"
              style={{
                background:
                  'repeating-conic-gradient(from 0deg, rgba(16,16,16,0.30) 0deg 0.25deg, transparent 0.25deg 7.5deg)',
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
                  className="absolute hidden sm:inline font-mono text-[11px] lg:text-sm uppercase tracking-[0.14em] text-ink/20 whitespace-nowrap"
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
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 160px 44px rgba(57,206,34,0.05)' }} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(57,206,34,0.06),rgba(57,206,34,0.025)_35%,transparent_45%)]" />
      </div>

      {/* precision crosshair cursor */}
      {cross.on && (
        <div className="pointer-events-none absolute inset-0 z-30 hidden md:block overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-lime/20" style={{ top: cross.y }} />
          <div className="absolute top-0 bottom-0 w-px bg-lime/20" style={{ left: cross.x }} />
          <div
            className="absolute w-5 h-5 border border-lime/50 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: cross.x, top: cross.y }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* page h1 for SEO/a11y - visually hidden, the cinematic panels carry the visual headline */}
        <h1 className="sr-only">
          Jaydev Group supplies industrial chemicals and pharmaceutical APIs from India - across the country and to 30+ export markets.
        </h1>

        {/* compact looping action-word sequence - opens the page with motion */}
        <div className="pt-28 sm:pt-32 pb-8 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2">
          {VERBS.map((v, i) => (
            <span key={v} className="flex items-center gap-3 sm:gap-5">
              <motion.span
                animate={{ opacity: verb === i ? 1 : 0.55, y: verb === i ? -2 : 0 }}
                transition={{ duration: 0.45 }}
                className={`font-mono text-[11px] sm:text-sm uppercase tracking-[0.3em] ${verb === i ? 'text-gradient-lime' : 'text-ink-muted'}`}
              >
                {v}
              </motion.span>
              {i < VERBS.length - 1 && <span className="w-1 h-1 rounded-full bg-lime/40" />}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] gap-8">
          {/* ── numbered engineering-notation rail ── */}
          <div className="hidden lg:block">
            <div className="sticky top-1/2 -translate-y-1/2 py-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-ink-subtle mb-6">The Obsession</div>
              <ul className="space-y-5">
                {pillars.map((p, i) => (
                  <li key={p.n}>
                    <button
                      onClick={() => goTo(i)}
                      className="group flex items-baseline gap-3 text-left"
                    >
                      <span className={`font-mono text-sm transition-colors ${active === i ? 'text-lime-text' : 'text-ink-subtle'}`}>{p.n}</span>
                      <span className={`font-jakarta text-sm font-semibold transition-colors ${active === i ? 'text-ink' : 'text-ink-soft group-hover:text-ink-soft'}`}>
                        {p.title}
                      </span>
                      <span className={`h-px transition-all duration-500 ${active === i ? 'w-8 bg-lime' : 'w-3 bg-line'}`} />
                    </button>
                  </li>
                ))}
                {/* 4th point - the finale */}
                <li>
                  <button
                    onClick={() => goTo(3)}
                    className="group flex items-baseline gap-3 text-left"
                  >
                    <span className={`font-mono text-sm transition-colors ${active === 3 ? 'text-lime-text' : 'text-ink-subtle'}`}>04</span>
                    <span className={`font-jakarta text-sm font-semibold transition-colors ${active === 3 ? 'text-ink' : 'text-ink-soft group-hover:text-ink-soft'}`}>Worldwide</span>
                    <span className={`h-px transition-all duration-500 ${active === 3 ? 'w-8 bg-lime' : 'w-3 bg-line'}`} />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* ── full-bleed reveal panels ── */}
          <div ref={trackRef} style={pinned ? { height: `${PANEL_COUNT * 80}vh` } : undefined}>
            <div className={pinned ? "sticky top-0 h-screen overflow-hidden" : ""}>
              <div className={pinned ? "relative w-full h-full" : ""}>
            {pillars.map((p, i) => (
              <div
                key={p.n}
                ref={(el) => { panelRefs.current[i] = el; }}
                className={pinned
                    ? 'absolute inset-0 flex flex-col justify-center transition-opacity duration-[600ms] ease-out'
                    : 'min-h-[56vh] sm:min-h-[72vh] flex flex-col justify-center py-12 sm:py-16'}
                style={pinned ? { opacity: active === i ? 1 : 0, pointerEvents: active === i ? 'auto' : 'none' } : undefined}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-20%' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-8 lg:gap-12 items-center"
                >
                  <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-lime-text text-sm">{p.n}</span>
                    <span className="h-px w-10 bg-lime/40" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">{p.tag}</span>
                  </div>

                  <h2 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light text-ink leading-[0.95] mb-6 tracking-[-0.02em]">
                    {p.title}
                  </h2>

                  <p className="text-lime-text text-xl sm:text-2xl font-light leading-snug mb-5 max-w-xl">{p.lede}</p>
                  <p className="text-ink-muted text-base leading-relaxed max-w-lg mb-9">{p.body}</p>

                  <div className="flex flex-wrap gap-x-12 gap-y-5">
                    {p.metrics.map(([k, label]) => (
                      <div key={label}>
                        <div className="font-jakarta text-2xl font-extrabold text-gradient-lime leading-none">{k}</div>
                        <div className="text-ink-soft text-xs mt-1.5 uppercase tracking-wider">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* producer marquee - merged in from the old "Sourcing Ecosystem" section */}
                  {i === 0 && (
                    <div className="mt-11 max-w-xl">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-subtle mb-3">Our producers</div>
                      <div className="marquee-mask overflow-hidden">
                        <div className="flex w-max animate-jd-marquee" style={{ animationDuration: '32s' }}>
                          {[...COMPANY.manufacturers, ...COMPANY.manufacturers].map((m, k) => (
                            <span key={k} className="flex items-center gap-1.5 px-5 whitespace-nowrap font-jakarta font-bold text-ink-soft">
                              {m.name}
                              {m.badge && <Icon name="BadgeCheck" className="w-3.5 h-3.5 text-gold-dark" />}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* the panel's photograph - what the words are actually describing */}
                  {p.image && (
                    <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-line bg-ink-pale">
                      <Image
                        src={p.image}
                        alt={p.alt ?? ''}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
                    </div>
                  )}
                </motion.div>
              </div>
            ))}

            {/* ── 04 · Finale - the journey resolves: from Gujarat to the world ── */}
            <div
              ref={(el) => { panelRefs.current[3] = el; }}
              className={pinned
                  ? 'absolute inset-0 flex flex-col justify-center transition-opacity duration-[600ms] ease-out'
                  : 'min-h-[72vh] sm:min-h-[88vh] flex flex-col justify-center py-12 sm:py-16'}
              style={pinned ? { opacity: active === 3 ? 1 : 0, pointerEvents: active === 3 ? 'auto' : 'none' } : undefined}
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
                  <span className="font-mono text-lime-text text-sm">04</span>
                  <span className="h-px w-10 bg-lime/40" />
                  <span className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Buy · Document · Ship</span>
                </div>

                <h2 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light text-ink leading-[0.95] mb-6 tracking-[-0.02em]">
                  From Gujarat to <span className="text-gradient-lime not-italic font-jakarta font-extrabold">30+ countries</span>
                </h2>
                <p className="text-ink-muted text-lg leading-relaxed max-w-lg mb-10">
                  300+ products - industrial chemicals and pharmaceutical APIs. Sold across India and exported to 30+ countries.
                </p>

                {/* stats strip (moved in from the old hero band) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 mb-11 max-w-2xl items-start">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-gradient-lime leading-none whitespace-nowrap">
                        <StatCounter end={s.num} suffix={s.suffix} />
                      </div>
                      <div className="text-ink-soft text-xs mt-2 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <Link href="/quote" className="btn-lime px-7 py-3.5 text-base">
                    Get CIF Quote <Icon name="ArrowRight" className="w-4 h-4" />
                  </Link>
                  <a href="/Jaydev-Multicomm-Catalogue.pdf" download className="btn-ink px-7 py-3.5 text-base">
                    <Icon name="Download" className="w-4 h-4" /> Catalogue
                  </a>
                </div>
              </motion.div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
