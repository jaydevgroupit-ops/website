'use client';

import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { products, industryData, marketData, IMPORT_PRODUCTS } from '@/lib/content';
import { pharmaProducts } from '@/lib/pharma';
import { Icon } from './Icon';

const popularProducts = [
  'Caustic Soda (NaOH)', 'Sulphuric Acid', 'PAC – Poly Aluminium Chloride',
  'SMBS – Sodium Metabisulphite', 'Hydrogen Peroxide', 'Calcium Chloride',
];
const incoterms = ['CIF', 'FOB', 'CFR', 'EXW'];
const units = ['MT', 'KG', 'Liters', 'Drums', 'FCL'];

const WaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

interface FormData {
  product: string; quantity: string; unit: string; destinationPort: string;
  incoterm: string; packaging: string; name: string; company: string;
  email: string; phone: string; country: string; notes: string;
}
const defaultForm: FormData = {
  product: '', quantity: '', unit: 'MT', destinationPort: '', incoterm: 'CIF',
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

  const submitQuote = async () => {
    if (!stepValid(2) || sending) return;
    setSending(true);
    setSubmitError(false);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('request failed');
      setSubmitted(true);
    } catch {
      // Email/API failed — surface a non-blocking error; WhatsApp stays available.
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const productId = searchParams.get('product');
    const industryId = searchParams.get('industry');
    const marketId = searchParams.get('market');
    setForm(f => {
      const next = { ...f };
      if (productId) {
        const p = products.find(x => x.id === productId);
        const imp = IMPORT_PRODUCTS.find(x => x.id === productId);
        const ph = pharmaProducts.find(x => x.id === productId);
        if (p) next.product = p.name;
        else if (imp) { next.product = imp.name; next.notes = `Import enquiry (into India).${next.notes ? ' ' + next.notes : ''}`; }
        else if (ph) {
          next.product = ph.cas ? `${ph.name} (CAS ${ph.cas})` : ph.name;
          const kind = ph.section === 'apis' ? 'API' : 'pharmaceutical';
          next.notes = `${kind} enquiry${ph.therapeuticSegment ? ` - ${ph.therapeuticSegment}` : ''}. Please confirm pharmacopoeial grade, DMF/CEP status and packaging.${next.notes ? ' ' + next.notes : ''}`;
        }
      }
      if (industryId) { const i = industryData.find(x => x.id === industryId); if (i) next.notes = `Enquiry for the ${i.name} industry.${next.notes ? ' ' + next.notes : ''}`; }
      if (marketId) { const m = marketData.find(x => x.id === marketId); if (m) { next.country = next.country || m.name; next.notes = `Shipping to ${m.name}.${next.notes ? ' ' + next.notes : ''}`; } }
      return next;
    });
  }, [searchParams]);

  const waMessage = encodeURIComponent(
    `Hi, I need a ${form.incoterm} quote for:\n\nProduct: ${form.product || 'TBD'}\nQty: ${form.quantity} ${form.unit}\nDestination: ${form.destinationPort}\nIncoterm: ${form.incoterm}\nPackaging: ${form.packaging || 'Std'}\n\nContact: ${form.name}, ${form.company}, ${form.country}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nNotes: ${form.notes || 'None'}`
  );

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const stepValid = (s: number) => {
    if (s === 0) return form.product.trim() !== '' && form.quantity.trim() !== '';
    if (s === 1) return form.destinationPort.trim() !== '';
    if (s === 2) return form.name.trim() !== '' && /\S+@\S+\.\S+/.test(form.email);
    return true;
  };

  const go = (d: number) => { setDir(d); setStep(s => Math.min(2, Math.max(0, s + d))); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-sm";
  const labelClass = "block text-gray-700 text-xs font-semibold mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" className="w-10 h-10 text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="font-jakarta text-2xl font-extrabold text-navy mb-3">Quote Request Received!</h1>
          <p className="text-gray-500 mb-8">We&apos;ll respond within 48 hours with a detailed quote. For a faster response, reach us on WhatsApp.</p>
          <a href={`https://wa.me/919099796811?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold mb-4 hover:bg-green-100 transition-all">
            <WaIcon className="w-5 h-5" /> Follow Up on WhatsApp
          </a>
          <Link href="/" className="text-gray-400 text-sm hover:text-navy transition-colors">← Back to Home</Link>
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
      <div className="bg-navy py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Get Quote</span>
          <h1 className="font-jakarta text-4xl font-extrabold text-white mb-3">Request a Quote in 3 Steps</h1>
          <p className="text-white/65">Tell us what you need - a detailed CIF/FOB quote follows within 48 hours.</p>
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
                        done ? 'bg-gold text-white' : current ? 'bg-navy text-white ring-4 ring-navy/10' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {done ? <Icon name="Check" className="w-5 h-5" strokeWidth={2.5} /> : i + 1}
                      </span>
                      <span className={`hidden sm:block text-sm font-semibold ${current ? 'text-navy' : done ? 'text-gold-dark' : 'text-gray-400'}`}>{s.title}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-3 rounded-full bg-gray-100 overflow-hidden">
                        <div className={`h-full bg-gold transition-all duration-500 ${i < step ? 'w-full' : 'w-0'}`} />
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
                    <h2 className="font-jakarta font-extrabold text-navy text-lg mb-1">What do you need?</h2>
                    <p className="text-gray-400 text-sm mb-5">Product and quantity.</p>
                    <div className="mb-4">
                      <label className={labelClass}>Product Name *</label>
                      <input type="text" list="products-list" value={form.product} onChange={set('product')} placeholder="e.g. Caustic Soda or Paclitaxel" className={inputClass} />
                      <datalist id="products-list">
                        {products.map(p => <option key={p.id} value={p.name} />)}
                        {pharmaProducts.map(p => <option key={p.id} value={p.name} />)}
                      </datalist>
                    </div>
                    <div className="mb-5">
                      <p className="text-gray-400 text-xs font-medium mb-2">Popular:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularProducts.map(p => (
                          <button key={p} type="button" onClick={() => setForm(f => ({ ...f, product: p }))}
                            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${form.product === p ? 'bg-navy text-white border-navy' : 'bg-white border-[#E5E7EB] text-gray-600 hover:border-gold hover:text-gold'}`}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className={labelClass}>Quantity *</label>
                        <input type="number" value={form.quantity} onChange={set('quantity')} placeholder="25" className={inputClass} min="1" />
                      </div>
                      <div>
                        <label className={labelClass}>Unit</label>
                        <select value={form.unit} onChange={set('unit')} className={inputClass}>{units.map(u => <option key={u} value={u}>{u}</option>)}</select>
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
                    <h2 className="font-jakarta font-extrabold text-navy text-lg mb-1">Where is it going?</h2>
                    <p className="text-gray-400 text-sm mb-5">Destination &amp; trade terms.</p>
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
                            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${form.incoterm === t ? 'bg-navy text-white border-navy' : 'bg-white border-[#E5E7EB] text-gray-600 hover:border-gold hover:text-gold'}`}>
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
                    <h2 className="font-jakarta font-extrabold text-navy text-lg mb-1">How do we reach you?</h2>
                    <p className="text-gray-400 text-sm mb-5">We&apos;ll send your quote here.</p>
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
                    <div className="rounded-xl bg-navy-pale border border-navy-light p-4">
                      <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Review your request</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                        <div className="text-gray-500">Product</div><div className="text-navy font-semibold text-right">{form.product || '-'}</div>
                        <div className="text-gray-500">Quantity</div><div className="text-navy font-semibold text-right">{form.quantity ? `${form.quantity} ${form.unit}` : '-'}</div>
                        <div className="text-gray-500">Destination</div><div className="text-navy font-semibold text-right">{form.destinationPort || '-'}</div>
                        <div className="text-gray-500">Incoterm</div><div className="text-navy font-semibold text-right">{form.incoterm}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={step === 0}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-navy hover:bg-navy-pale'}`}
                >
                  <Icon name="ChevronRight" className="w-4 h-4 rotate-180" /> Back
                </button>

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => stepValid(step) && go(1)}
                    disabled={!stepValid(step)}
                    className="btn-gold px-7 py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    Continue <Icon name="ArrowRight" className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitQuote}
                    disabled={!stepValid(2) || sending}
                    className="btn-gold px-7 py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {sending ? 'Sending…' : <>Submit Request <Icon name="ArrowRight" className="w-4 h-4" /></>}
                  </button>
                )}
              </div>

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
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-green-800 text-xs font-semibold">Quotes typically sent within 48 hours</p>
            </div>

            <div className="card-white p-6 rounded-2xl border-2 border-green-200">
              <h3 className="font-jakarta font-extrabold text-navy mb-2">Prefer WhatsApp?</h3>
              <p className="text-gray-500 text-xs mb-4">Skip the form - your entries auto-fill the message. Fastest response.</p>
              <a href={`https://wa.me/919099796811?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold hover:bg-green-100 transition-all">
                <WaIcon /> WhatsApp +91 90997 96811
              </a>
            </div>

            <div className="card-white p-6 rounded-2xl">
              <h3 className="font-jakarta font-extrabold text-navy mb-4 text-sm">Every Quote Includes</h3>
              <div className="space-y-2.5">
                {['CIF/FOB pricing', 'Certificate of Analysis (COA)', 'MSDS / Safety Data Sheet', 'Certificate of Origin', 'Lead time estimate', 'Packaging options'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Icon name="Check" className="w-4 h-4 text-green-600 flex-shrink-0" strokeWidth={2.5} /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-white p-6 rounded-2xl">
              <h3 className="font-jakarta font-extrabold text-navy mb-3 text-sm">Direct Contact</h3>
              <div className="space-y-2.5 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Icon name="Mail" className="w-4 h-4 text-gold flex-shrink-0" /> <a href="mailto:exports@jaydevgroup.co.in" className="hover:text-navy transition-colors">exports@jaydevgroup.co.in</a></div>
                <div className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-gold flex-shrink-0" /> +91 90997 96811</div>
                <div className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-gold flex-shrink-0" /> +91 99875 39258</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
