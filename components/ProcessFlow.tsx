'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

/**
 * How an order works - an interactive stepper rather than five static tiles.
 *
 * Selecting a stage shows what actually happens at it, the paperwork it
 * produces, and a photograph of the real thing. The old version said the same
 * words in five equal boxes, which gave a buyer nothing to explore and made the
 * documentation - the part they care most about - invisible.
 */

const steps = [
  {
    icon: 'Handshake', title: 'Enquiry & RFQ', short: 'Enquiry',
    desc: 'Send product, grade, quantity and destination port. We confirm availability and price directly with the manufacturer before quoting.',
    outputs: ['CIF / FOB quote', 'Grade confirmation', 'Lead-time estimate'],
    image: '/images/aboutus.webp', alt: 'Trade desk reviewing an enquiry',
    time: 'Within 24 h',
  },
  {
    icon: 'BadgeCheck', title: 'Manufacturer sourcing', short: 'Sourcing',
    desc: 'Direct allocation from GACL, Grasim, Reliance, IOCL and partner plants. No middlemen, so the price is the factory price and every tonne is traceable.',
    outputs: ['Producer allocation', 'Batch reservation'],
    image: '/images/plant.jpg', alt: 'Chemical manufacturing plant',
    time: '1–3 days',
  },
  {
    icon: 'ShieldCheck', title: 'Quality & documentation', short: 'Documents',
    desc: 'Every batch ships with its papers. Systems audited to ISO 9001, 14001 and 45001, with pharmacopoeial grade confirmed where it applies.',
    outputs: ['Batch COA', 'MSDS', 'Certificate of Origin', 'IMDG declaration'],
    image: '/images/pharma.webp', alt: 'Laboratory quality control',
    time: 'Before despatch',
  },
  {
    icon: 'Container', title: 'Packing & stuffing', short: 'Packing',
    desc: 'HDPE bags, drums, jumbo bags, ISO tanks or flexitanks, packed to IMDG for the class of cargo and stuffed under supervision.',
    outputs: ['Packing list', 'Container stuffing report', 'Seal numbers'],
    image: '/images/bags-drums.png', alt: 'Packed drums and bags ready for stuffing',
    time: '2–4 days',
  },
  {
    icon: 'Ship', title: 'Export & delivery', short: 'Shipping',
    desc: 'FOB or CIF out of Mundra, JNPT, Hazira or Kandla, with the bill of lading and tracking sent the day the vessel sails.',
    outputs: ['Bill of Lading', 'Vessel tracking', 'Arrival notice'],
    image: '/images/logistics-port.png', alt: 'Container port loading operations',
    time: '7–25 days',
  },
];

export default function ProcessFlow() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div>
      {/* ── stage rail ── */}
      <div className="relative mb-6">
        <span aria-hidden="true" className="hidden sm:block absolute top-5 left-0 right-0 h-0.5 bg-line" />
        <span
          aria-hidden="true"
          className="hidden sm:block absolute top-5 left-0 h-0.5 bg-lime transition-all duration-500 ease-out"
          style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
        />
        <ol className="relative grid grid-cols-5 gap-1 sm:gap-2">
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={on ? 'step' : undefined}
                  className="group w-full flex flex-col items-center gap-2 text-center"
                >
                  <span
                    className={`grid place-items-center w-10 h-10 rounded-xl border-2 transition-all duration-300 ${
                      on ? 'bg-lime border-lime scale-110' : done ? 'bg-lime-tint border-lime/50' : 'bg-white border-line group-hover:border-lime/50'
                    }`}
                  >
                    {done ? (
                      <Icon name="Check" className="w-4 h-4 text-lime-text" strokeWidth={3} />
                    ) : (
                      <Icon name={s.icon} className={`w-[18px] h-[18px] ${on ? 'text-ink' : 'text-ink-subtle group-hover:text-lime-text'}`} strokeWidth={1.8} />
                    )}
                  </span>
                  <span className={`text-[10px] sm:text-xs font-semibold leading-tight ${on ? 'text-ink' : 'text-ink-subtle group-hover:text-ink'}`}>
                    {s.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── the selected stage ── */}
      <div className="rounded-2xl border border-line bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="p-6 sm:p-8 order-2 md:order-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[11px] text-ink-subtle tabular-nums">
                  {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </span>
                <span className="h-px w-8 bg-lime/50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-lime-text">{step.time}</span>
              </div>

              <h3 className="font-jakarta font-extrabold text-ink text-xl sm:text-2xl mb-2">{step.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-5 max-w-prose">{step.desc}</p>

              <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">You receive</div>
              <div className="flex flex-wrap gap-1.5">
                {step.outputs.map((o) => (
                  <span key={o} className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-ink-pale border border-line text-ink-muted font-medium">
                    <Icon name="Check" className="w-3 h-3 text-lime-text" strokeWidth={3} />
                    {o}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="px-3 py-1.5 rounded-lg border border-line text-xs font-semibold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:border-lime/45"
                >
                  Back
                </button>
                {active === steps.length - 1 ? (
                  /* the sequence is finished - the button becomes the thing it was
                     leading to, rather than a dead grey control */
                  <Link href="/quote" className="btn-lime text-xs px-4 py-1.5">
                    Start an enquiry
                    <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive((a) => a + 1)}
                    className="px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-ink-mid transition-colors"
                  >
                    Next stage
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative min-h-[180px] md:min-h-full order-1 md:order-2 bg-ink-pale">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.image}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image src={step.image} alt={step.alt} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
