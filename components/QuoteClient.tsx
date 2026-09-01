'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { products, industryData, marketData, IMPORT_PRODUCTS } from '@/lib/content';
import { pharmaProducts } from '@/lib/pharma';
import { Icon } from './Icon';

const popularProducts = [
  'Caustic Soda (NaOH)', 'Sulphuric Acid', 'PAC - Poly Aluminium Chloride',
  'SMBS - Sodium Metabisulphite', 'Hydrogen Peroxide', 'Calcium Chloride',
];
const incoterms = ['CIF', 'FOB', 'CFR', 'EXW'];
const units = ['MT', 'KG', 'Liters', 'Drums', 'FCL'];

const WaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  // WhatsApp is a third-party mark: #25D366 lives on the glyph and nowhere else.
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-[#25D366]`}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

/** One product line. A quote can cover several. */
interface LineItem { product: string; quantity: string; unit: string }

interface FormData {
  lines: LineItem[]; destinationPort: string;
  incoterm: string; packaging: string; name: string; company: string;
  email: string; phone: string; country: string; notes: string;
}
const emptyLine = (): LineItem => ({ product: '', quantity: '', unit: 'MT' });
const defaultForm: FormData = {
  lines: [emptyLine()], destinationPort: '', incoterm: 'CIF',
  packaging: '', name: '', company: '', email: '', phone: '', country: '', notes: '',
};

const steps = [
  { title: 'Product', icon: 'FlaskConical' },
  { title: 'Shipping', icon: 'Ship' },
  { title: 'Your Details', icon: 'Handshake' },
];

export default function QuoteClient() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  /** Honeypot. Uncontrolled on purpose - it must never re-render or be touched
   *  by the real form state; only a bot autofilling the DOM will populate it. */
  const botField = useRef<HTMLInputElement>(null);

  const submitQuote = async () => {
    if (!stepValid(2) || sending) return;
    setSending(true);
    setSubmitError(false);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company_website: botField.current?.value ?? '' }),
      });
      if (!res.ok) throw new Error('request failed');
      setSubmitted(true);
    } catch {
      // Email/API failed - surface a non-blocking error; WhatsApp stays available.
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const productId = searchParams.get('product');
    // ?products=a,b,c - the multi-select basket from the catalogue page
    const productIds = (searchParams.get('products') ?? '').split(',').filter(Boolean);
    const industryId = searchParams.get('industry');
    const marketId = searchParams.get('market');
    setForm(f => {
      const next = { ...f };
      /** Resolve an id from either book into a display name. */
      const nameOf = (id: string) => {
        const pr = products.find((x) => x.id === id);
        if (pr) return pr.formula && pr.formula !== '-' ? `${pr.name} (${pr.formula})` : pr.name;
        const imp = IMPORT_PRODUCTS.find((x) => x.id === id);
        if (imp) return `${imp.name} [import]`;
        const ph = pharmaProducts.find((x) => x.id === id);
        if (ph) return ph.cas ? `${ph.name} (CAS ${ph.cas})` : ph.name;
        return null;
      };

      // One line per product - the basket can carry several.
      const ids = productIds.length ? productIds : productId ? [productId] : [];
      if (ids.length) {
        const named = ids.map(nameOf).filter(Boolean) as string[];
        if (named.length) next.lines = named.map((n) => ({ product: n, quantity: '', unit: 'MT' }));

        const ph = ids.length === 1 ? pharmaProducts.find((x) => x.id === ids[0]) : undefined;
        if (ph) {
          const kind = ph.section === 'apis' ? 'API' : 'pharmaceutical';
          next.notes = `${kind} enquiry${ph.therapeuticSegment ? ` - ${ph.therapeuticSegment}` : ''}. Please confirm pharmacopoeial grade and DMF availability.`;
        }
        const imp = ids.length === 1 ? IMPORT_PRODUCTS.find((x) => x.id === ids[0]) : undefined;
        if (imp) next.notes = 'Import enquiry (into India).';
      }
      if (industryId) { const i = industryData.find(x => x.id === industryId); if (i) next.notes = `Enquiry for the ${i.name} industry.${next.notes ? ' ' + next.notes : ''}`; }
      if (marketId) { const m = marketData.find(x => x.id === marketId); if (m) { next.country = next.country || m.name; next.notes = `Shipping to ${m.name}.${next.notes ? ' ' + next.notes : ''}`; } }
      return next;
    });
  }, [searchParams]);

  const filledLines = form.lines.filter((l) => l.product.trim() !== '');
  const waMessage = encodeURIComponent(
    [
      `Hi, I need a ${form.incoterm} quote for:`,
      '',
      ...(filledLines.length
        ? filledLines.map((l) => `• ${l.product} - ${l.quantity || 'qty TBD'} ${l.unit}`)
        : ['• TBD']),
      '',
      `Destination: ${form.destinationPort || 'TBD'}`,
      `Incoterm: ${form.incoterm}`,
    ].join('\n'),
  );

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const setLine = (i: number, key: keyof LineItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, lines: f.lines.map((l, k) => (k === i ? { ...l, [key]: e.target.value } : l)) }));
  const addLine = () => setForm(f => ({ ...f, lines: [...f.lines, emptyLine()] }));
  const removeLine = (i: number) =>
    setForm(f => ({ ...f, lines: f.lines.length === 1 ? f.lines : f.lines.filter((_, k) => k !== i) }));

  const stepValid = (s: number) => {
    if (s === 0) return form.lines.some(l => l.product.trim() !== '') && form.lines.every(l => l.product.trim() === '' || l.quantity.trim() !== '');
    if (s === 1) return form.destinationPort.trim() !== '';
    if (s === 2) return form.name.trim() !== '' && /\S+@\S+\.\S+/.test(form.email);
    return true;
  };

  const go = (d: number) => { setDir(d); setStep(s => Math.min(2, Math.max(0, s + d))); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white border border-line text-ink placeholder-ink-subtle text-sm focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all shadow-sm";
  const labelClass = "block text-ink-muted text-xs font-semibold mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-lime-tint flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" className="w-10 h-10 text-lime-text" strokeWidth={2.5} />
          </div>
          <h1 className="font-jakarta text-2xl font-extrabold text-ink mb-3">Quote Request Received!</h1>
          <p className="text-ink-soft mb-8">We&apos;ll respond within 48 hours with a detailed quote. For a faster response, reach us on WhatsApp.</p>
          <a href={`https://wa.me/919099796811?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-ink-pale border border-line text-ink font-semibold mb-4 hover:bg-line-faint transition-all">
            <WaIcon className="w-5 h-5" /> Follow Up on WhatsApp
          </a>
          <Link href="/" className="text-ink-subtle text-sm hover:text-ink transition-colors">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <div className="bg-surface py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Get Quote</span>
          <h1 className="font-jakarta text-4xl font-extrabold text-ink mb-3">Request a Quote in 3 Steps</h1>
          <p className="text-ink-soft">Tell us what you need - a detailed CIF/FOB quote follows within 48 hours.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── WIZARD ── */}
          <div className="lg:col-span-2">
            {/* Stepper */}
            <div className="flex items-center mb-8">
              {steps.map((s, i) => {
                const done = i < step, current = i === step;
                return (
                  <Fragment key={s.title}>
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      className={`flex items-center gap-2.5 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-jakarta font-bold text-sm transition-all ${
                        done ? 'bg-lime-text text-white' : current ? 'bg-ink text-white ring-4 ring-ink/10' : 'bg-ink-pale text-ink-subtle'
                      }`}>
                        {done ? <Icon name="Check" className="w-5 h-5" strokeWidth={2.5} /> : i + 1}
                      </span>
                      <span className={`hidden sm:block text-sm font-semibold ${current ? 'text-ink' : done ? 'text-lime-text' : 'text-ink-subtle'}`}>{s.title}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-3 rounded-full bg-ink-pale overflow-hidden">
                        <div className={`h-full bg-lime transition-all duration-500 ${i < step ? 'w-full' : 'w-0'}`} />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="card-white p-6 sm:p-8 rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                {/* STEP 1 - PRODUCT */}
                {step === 0 && (
                  <motion.div key="s0" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-jakarta font-extrabold text-ink text-lg mb-1">What do you need?</h2>
                    <p className="text-ink-subtle text-sm mb-5">Product and quantity.</p>
                    {/* One row per product. A buyer quoting six grades should not
                        have to file six enquiries - the catalogue basket lands here. */}
                    <div className="space-y-3 mb-4">
                      {form.lines.map((line, i) => (
                        <div key={i} className="rounded-xl border border-line bg-surface p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle">
                              Product {form.lines.length > 1 ? i + 1 : ''}
                            </span>
                            {form.lines.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeLine(i)}
                                aria-label={`Remove product ${i + 1}`}
                                className="text-ink-subtle hover:text-ink text-xs font-semibold inline-flex items-center gap-1"
                              >
                                <Icon name="X" className="w-3.5 h-3.5" /> Remove
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            list="products-list"
                            value={line.product}
                            onChange={setLine(i, 'product')}
                            placeholder="e.g. Caustic Soda or Paclitaxel"
                            className={inputClass}
                          />
                          <div className="grid grid-cols-3 gap-3 mt-3">
                            <div className="col-span-2">
                              <label className={labelClass}>Quantity *</label>
                              <input type="number" value={line.quantity} onChange={setLine(i, 'quantity')} placeholder="25" className={inputClass} min="1" />
                            </div>
                            <div>
                              <label className={labelClass}>Unit</label>
                              <select value={line.unit} onChange={setLine(i, 'unit')} className={inputClass}>
                                {units.map(u => <option key={u} value={u}>{u}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                      <datalist id="products-list">
                        {products.map(p => <option key={p.id} value={p.name} />)}
                        {pharmaProducts.map(p => <option key={p.id} value={p.name} />)}
                      </datalist>
                      <button
                        type="button"
                        onClick={addLine}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-lime-text hover:underline"
                      >
                        <span className="grid place-items-center w-5 h-5 rounded-md border border-lime/50 text-lime-text">+</span>
                        Add another product
                      </button>
                    </div>

                    <div className="mb-5">
                      <p className="text-ink-soft text-xs font-medium mb-2">Popular:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularProducts.map(pp => (
                          <button
                            key={pp}
                            type="button"
                            onClick={() => setForm(f => {
                              const idx = f.lines.findIndex(l => l.product.trim() === '');
                              if (idx >= 0) return { ...f, lines: f.lines.map((l, k) => k === idx ? { ...l, product: pp } : l) };
                              return { ...f, lines: [...f.lines, { product: pp, quantity: '', unit: 'MT' }] };
                            })}
                            className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all bg-white border-line text-ink-muted hover:border-lime/45 hover:text-ink"
                          >
                            {pp}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className={labelClass}>Packaging Preference</label>
                      <input type="text" value={form.packaging} onChange={set('packaging')} placeholder="e.g. 50 kg HDPE Bags, ISO Tank" className={inputClass} />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 - SHIPPING */}
                {step === 1 && (
                  <motion.div key="s1" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-jakarta font-extrabold text-ink text-lg mb-1">Where is it going?</h2>
                    <p className="text-ink-subtle text-sm mb-5">Destination &amp; trade terms.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelClass}>Destination Port *</label>
                        <input type="text" value={form.destinationPort} onChange={set('destinationPort')} placeholder="e.g. Mombasa, Kenya" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Country</label>
                        <input type="text" value={form.country} onChange={set('country')} placeholder="e.g. Kenya" className={inputClass} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className={labelClass}>Incoterm</label>
                      <div className="flex flex-wrap gap-2">
                        {incoterms.map(t => (
                          <button key={t} type="button" onClick={() => setForm(f => ({ ...f, incoterm: t }))}
                            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${form.incoterm === t ? 'bg-ink text-white border-ink' : 'bg-white border-line text-ink-muted hover:border-lime hover:text-lime-text'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Additional Notes</label>
                      <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Specific grades, certifications, delivery window…" className={`${inputClass} resize-none`} />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 - CONTACT + REVIEW */}
                {step === 2 && (
                  <motion.div key="s2" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-jakarta font-extrabold text-ink text-lg mb-1">How do we reach you?</h2>
                    <p className="text-ink-subtle text-sm mb-5">We&apos;ll send your quote here.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Company</label>
                        <input type="text" value={form.company} onChange={set('company')} placeholder="Company name" className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone / WhatsApp</label>
                        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" className={inputClass} />
                      </div>
                    </div>
                    {/* Review summary */}
                    <div className="rounded-xl bg-ink-pale border border-ink-light p-4">
                      <div className="text-ink-subtle text-[11px] font-bold uppercase tracking-wider mb-2">Review your request</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                        {filledLines.length === 0 ? (
                          <>
                            <div className="text-ink-soft">Product</div>
                            <div className="text-ink font-semibold text-right">-</div>
                          </>
                        ) : (
                          filledLines.map((l, k) => (
                            <Fragment key={k}>
                              <div className="text-ink-soft">{filledLines.length > 1 ? `Product ${k + 1}` : 'Product'}</div>
                              <div className="text-ink font-semibold text-right">
                                {l.product}
                                {l.quantity && <span className="text-ink-soft font-normal"> · {l.quantity} {l.unit}</span>}
                              </div>
                            </Fragment>
                          ))
                        )}
                        <div className="text-ink-soft">Destination</div><div className="text-ink font-semibold text-right">{form.destinationPort || '-'}</div>
                        <div className="text-ink-soft">Incoterm</div><div className="text-ink font-semibold text-right">{form.incoterm}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-line-faint">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={step === 0}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-ink hover:bg-ink-pale'}`}
                >
                  <Icon name="ChevronRight" className="w-4 h-4 rotate-180" /> Back
                </button>

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => stepValid(step) && go(1)}
                    disabled={!stepValid(step)}
                    className="btn-lime px-7 py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    Continue <Icon name="ArrowRight" className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitQuote}
                    disabled={!stepValid(2) || sending}
                    className="btn-lime px-7 py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {sending ? 'Sending…' : <>Submit Request <Icon name="ArrowRight" className="w-4 h-4" /></>}
                  </button>
                )}
              </div>

              {/* Honeypot. Positioned off-screen rather than display:none, because
                  the crawlers worth catching skip fields they can see are hidden.
                  aria-hidden + tabIndex=-1 keep it away from real users entirely. */}
              <input
                ref={botField}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] top-0 h-px w-px opacity-0"
              />

              {submitError && (
                <p className="mt-4 text-sm text-red-600">
                  Couldn&apos;t send your request just now.{' '}
                  <a href={`https://wa.me/919099796811?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    Send it on WhatsApp instead
                  </a>{' '}or try again.
                </p>
              )}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">
            <div className="bg-ink-pale border border-line rounded-xl px-4 py-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse flex-shrink-0" />
              <p className="text-ink text-xs font-semibold">Quotes typically sent within 48 hours</p>
            </div>

            <div className="relative h-32 rounded-2xl overflow-hidden border border-line">
              <Image
                src="/images/logistics-truck.png"
                alt="Bulk chemical transport leaving the plant"
                fill
                sizes="360px"
                className="object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 text-white text-xs font-semibold leading-snug">
                Priced, packed and documented from our desk to your port.
              </p>
            </div>

            <div className="card-white p-6 rounded-2xl border-2 border-line">
              <h3 className="font-jakarta font-extrabold text-ink mb-2">Prefer WhatsApp?</h3>
              <p className="text-ink-soft text-xs mb-4">Skip the form - your entries auto-fill the message. Fastest response.</p>
              <a href={`https://wa.me/919099796811?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-ink-pale border border-line text-ink text-sm font-semibold hover:bg-line-faint transition-all">
                <WaIcon /> WhatsApp +91 90997 96811
              </a>
            </div>

            <div className="card-white p-6 rounded-2xl">
              <h3 className="font-jakarta font-extrabold text-ink mb-4 text-sm">Every Quote Includes</h3>
              <div className="space-y-2.5">
                {['CIF/FOB pricing', 'Certificate of Analysis (COA)', 'MSDS / Safety Data Sheet', 'Certificate of Origin', 'Lead time estimate', 'Packaging options'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <Icon name="Check" className="w-4 h-4 text-lime-text flex-shrink-0" strokeWidth={2.5} /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-white p-6 rounded-2xl">
              <h3 className="font-jakarta font-extrabold text-ink mb-3 text-sm">Direct Contact</h3>
              <div className="space-y-2.5 text-sm text-ink-muted">
                <div className="flex items-center gap-2"><Icon name="Mail" className="w-4 h-4 text-lime-text flex-shrink-0" /> <a href="mailto:exports@jaydevgroup.co.in" className="hover:text-ink transition-colors">exports@jaydevgroup.co.in</a></div>
                <div className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-lime-text flex-shrink-0" /> +91 90997 96811</div>
                <div className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-lime-text flex-shrink-0" /> +91 99875 39258</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
