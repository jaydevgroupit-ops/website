'use client';

import Link from 'next/link';
import type { ProductDetail } from '@/lib/product-detail';
import { PHARMA_DISCLAIMER } from '@/lib/site';
import { Icon } from './Icon';

/**
 * One product page for both catalogues. Every block is conditional on the
 * source actually carrying that field, so an industrial product renders its
 * specs, applications and manufacturers exactly as before, while a pharma
 * product renders its classification, target API and sibling intermediates -
 * and neither shows an empty card for what it does not have.
 */
export default function ProductDetailClient({
  product,
  fullName,
}: {
  product: ProductDetail;
  fullName?: string;
}) {
  const isPharma = product.book === 'pharma';
  const casLine = product.cas ?? product.casForms?.map((f) => `${f.cas} (${f.label})`).join(' · ');

  const priceAsk = `Hi, please share your best offer for ${product.name}${product.cas ? ` (CAS ${product.cas})` : ''}.`;

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="bg-ink-pale border-b border-line">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="text-ink-subtle">/</span>
          <Link href="/products" className="hover:text-ink transition-colors">Products</Link>
          <span className="text-ink-subtle">/</span>
          <span className="text-ink font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero card */}
            <div className="card-white overflow-hidden">
              <div className="on-ink relative bg-ink px-8 py-7 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(238,246,236,0.15),rgba(238,246,236,0.04)_35%,transparent_55%)]" />
                <div className="relative flex items-center gap-5">
                  <div className="h-20 min-w-[5rem] px-5 rounded-2xl bg-white/8 border border-white/15 flex items-center justify-center flex-shrink-0">
                    {product.formula ? (
                      <span className="font-mono text-lime-light text-2xl font-bold whitespace-nowrap">{product.formula}</span>
                    ) : (
                      <Icon name="FlaskConical" className="w-9 h-9 text-lime-light" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lime-light text-xs font-bold uppercase tracking-wider mb-1">{product.kicker}</div>
                    <h1 className="text-white font-jakarta font-extrabold text-2xl leading-tight">{product.name}</h1>
                    {/* Cards show the trade name; the full chemical name still
                        belongs on the page, for buyers and for search. */}
                    {fullName && (
                      <p className="text-white/55 text-xs mt-1.5 leading-snug break-words">{fullName}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  {product.grade && (
                    <span className="px-3 py-1 rounded-full bg-lime-tint border border-lime/30 text-lime-text text-sm font-bold">{product.grade}</span>
                  )}
                  {casLine && (
                    <span className="px-3 py-1 rounded-full bg-surface border border-line text-ink-soft text-xs font-mono">CAS {casLine}</span>
                  )}
                  {product.therapeuticSegment && (
                    <span className="px-3 py-1 rounded-full bg-ink-pale border border-ink-light text-ink text-xs font-semibold">{product.therapeuticSegment}</span>
                  )}
                  {product.ingredientType && (
                    <span className="px-3 py-1 rounded-full bg-ink-pale border border-ink-light text-ink text-xs font-semibold">{product.ingredientType}</span>
                  )}
                  {product.investigational && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
                      <Icon name="FlaskConical" className="w-3 h-3" /> Investigational - R&amp;D supply only
                    </span>
                  )}
                  {product.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink-pale border border-ink-light text-ink text-xs font-semibold"><Icon name="Sparkles" className="w-3 h-3 text-lime-text" /> Featured</span>
                  )}
                </div>

                {product.description && (
                  <p className="text-ink-muted leading-relaxed text-base">{product.description}</p>
                )}

                {/* The intermediate's reason for existing: the drug it feeds. */}
                {product.forApi && (
                  <div className="rounded-xl bg-lime-tint border border-lime/30 px-5 py-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-lime-text mb-1">Intermediate for</div>
                    {product.targetApiId ? (
                      <Link href={`/products/${product.targetApiId}`} className="font-jakarta font-extrabold text-ink text-lg hover:text-lime-text transition-colors inline-flex items-center gap-1.5">
                        {product.forApi} <Icon name="ArrowRight" className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="font-jakarta font-extrabold text-ink text-lg">{product.forApi}</div>
                    )}
                    <p className="text-ink-soft text-xs mt-1">
                      Supplied to API manufacturers for {product.forApi} synthesis.
                    </p>
                  </div>
                )}

                {product.variants && product.variants.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-line-faint">
                    <h3 className="text-ink-subtle text-xs uppercase tracking-wider font-bold mb-3">Available Forms</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {product.variants.map(v => (
                        <div key={v.form} className="rounded-xl bg-ink-pale border border-ink-light px-4 py-3">
                          <div className="font-jakarta font-bold text-ink text-sm">{v.form}</div>
                          <div className="text-ink-soft text-xs mt-0.5">{v.grade}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specs Table */}
            {product.specs.length > 0 && (
              <div className="card-white overflow-hidden">
                <div className="px-6 py-4 bg-ink-pale border-b border-line">
                  <h2 className="font-jakarta font-bold text-ink text-base">Technical Specifications</h2>
                </div>
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={i} className={`border-b border-line-faint ${i % 2 === 0 ? 'bg-white' : 'bg-surface-alt'}`}>
                        <td className="px-6 py-3.5 text-ink-soft text-sm font-medium w-2/5">{spec.label}</td>
                        <td className="px-6 py-3.5 text-ink text-sm font-semibold">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* What a pharma buyer needs before ordering. The sheet does not
                carry any of it, so the page says so plainly instead of
                printing a specification nobody has verified. */}
            {isPharma && (
              <div className="card-white overflow-hidden">
                <div className="px-6 py-4 bg-ink-pale border-b border-line">
                  <h2 className="font-jakarta font-bold text-ink text-base">Grade &amp; Documentation</h2>
                </div>
                <div className="p-6">
                  <p className="text-ink-muted text-sm leading-relaxed mb-4">
                    Confirmed per enquiry against the batch offered - we do not publish a
                    specification we have not verified for your consignment.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Pharmacopoeial grade (IP / BP / USP / EP)',
                      'DMF / CEP status',
                      'GMP certification',
                      'Certificate of Analysis (COA)',
                      'MSDS / Safety Data Sheet',
                      'Packaging & MOQ',
                    ].map((d) => (
                      <div key={d} className="flex items-center gap-2.5 text-sm text-ink-muted">
                        <Icon name="Check" className="w-4 h-4 text-lime-text flex-shrink-0" strokeWidth={2.5} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications.length > 0 && (
              <div className="card-white p-6">
                <h2 className="font-jakarta font-bold text-ink mb-4">Applications</h2>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map(app => (
                    <span key={app} className="px-3 py-1.5 rounded-lg bg-ink-pale border border-ink-light text-ink text-sm font-medium">{app}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging */}
            {product.packaging.length > 0 && (
              <div className="card-white p-6">
                <h2 className="font-jakarta font-bold text-ink mb-4">Packaging Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.packaging.map(pkg => (
                    <div key={pkg} className="flex items-center gap-3 p-3.5 rounded-xl bg-surface border border-line">
                      <Icon name="Package" className="w-5 h-5 text-lime-text flex-shrink-0" />
                      <span className="text-ink text-sm font-medium">{pkg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manufacturers */}
            {product.manufacturers.length > 0 && (
              <div className="card-white p-6">
                <h2 className="font-jakarta font-bold text-ink mb-4">Available From</h2>
                <div className="flex flex-wrap gap-2">
                  {product.manufacturers.map(m => (
                    <span key={m} className="px-4 py-2 rounded-xl bg-lime-tint border border-lime/30 text-lime-text text-sm font-semibold">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {isPharma && (
              <p className="text-ink-subtle text-xs leading-relaxed border-t border-line-faint pt-5">
                {PHARMA_DISCLAIMER}
              </p>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">

            <div className="on-ink rounded-2xl bg-ink p-5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(238,246,236,0.12),rgba(238,246,236,0.04)_35%,transparent_60%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 text-lime-light text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-light animate-pulse" />
                  {isPharma ? 'Direct Desk' : 'Live Pricing'}
                </div>
                <p className="text-white font-jakarta font-bold mb-1">
                  {isPharma ? 'Talk to the Pharma Desk' : "Today's Indicative Price"}
                </p>
                <p className="text-white/55 text-xs mb-4">
                  {isPharma
                    ? `Grade, DMF status and availability for ${product.name}.`
                    : `Market-linked. Get the current CIF/FOB rate for ${product.name}.`}
                </p>
                <a
                  href={`https://wa.me/919099796811?text=${encodeURIComponent(priceAsk)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-lime w-full justify-center text-sm"
                >
                  {isPharma ? 'Ask on WhatsApp' : "Request Today's Price"}
                </a>
              </div>
            </div>

            {/* RFQ Card */}
            <div className="card-white p-6 border-2 border-lime/30">
              <h3 className="font-jakarta font-bold text-ink text-lg mb-1">Request a Quote</h3>
              <p className="text-ink-soft text-xs mb-5">
                {isPharma
                  ? 'Grade, documentation and lead time in 48 hours'
                  : 'Full CIF quote with COA & documentation in 48 hours'}
              </p>
              <Link href={`/quote?product=${product.id}`} className="btn-lime w-full justify-center text-sm">
                {isPharma ? 'Request a Quote' : 'Get CIF Quote Online'} <Icon name="ArrowRight" className="w-4 h-4" />
              </Link>
            </div>

            {/* Other intermediates feeding the same drug - the most useful jump
                a buyer sourcing one synthesis route can make. */}
            {product.sameTarget.length > 0 && (
              <div className="card-white p-6">
                <h3 className="font-jakarta font-bold text-ink mb-1 text-sm">
                  More for {product.forApi}
                </h3>
                <p className="text-ink-subtle text-xs mb-4">
                  {product.sameTarget.length} other {product.sameTarget.length === 1 ? 'intermediate' : 'intermediates'} we supply for this route
                </p>
                <div className="space-y-2">
                  {product.sameTarget.map((r) => (
                    <Link key={r.id} href={`/products/${r.id}`} className="block rounded-xl border border-line px-3.5 py-2.5 hover:border-lime/50 hover:bg-lime-tint/40 transition-colors group">
                      <div className="text-ink text-sm font-semibold leading-snug group-hover:text-lime-text transition-colors line-clamp-2">{r.name}</div>
                      {r.sub && <div className="text-ink-subtle text-[11px] font-mono mt-0.5">{r.sub}</div>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!isPharma && (
              <div className="card-white p-6">
                <h3 className="font-jakarta font-bold text-ink mb-4 text-sm">Documentation Available</h3>
                <div className="space-y-2.5">
                  {['Certificate of Analysis (COA)', 'MSDS / Safety Data Sheet', 'Certificate of Origin', 'IMDG Declaration', 'Packing List & Invoice'].map(doc => (
                    <div key={doc} className="flex items-center gap-2.5 text-sm text-ink-muted">
                      <Icon name="Check" className="w-4 h-4 text-lime-text flex-shrink-0" strokeWidth={2.5} />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Markets */}
            <div className="card-white p-6">
              <h3 className="font-jakarta font-bold text-ink mb-4 text-sm">Key Markets</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'GCC & Middle East', time: '7-12 days' },
                  { label: 'East Africa', time: '15-20 days' },
                  { label: 'Southeast Asia', time: '12-18 days' },
                  { label: 'West Africa', time: '18-25 days' },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between text-sm">
                    <span className="text-ink-muted inline-flex items-center gap-1.5"><Icon name="MapPin" className="w-3.5 h-3.5 text-lime-text" /> {m.label}</span>
                    <span className="text-ink font-semibold text-xs">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-jakarta text-2xl font-extrabold text-ink mb-6">
              {isPharma && product.therapeuticSegment
                ? `More in ${product.therapeuticSegment}`
                : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {product.related.map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="card-white p-5 flex items-center gap-4 group">
                  <div className="h-12 min-w-[3rem] px-3 rounded-xl bg-ink flex items-center justify-center flex-shrink-0">
                    {p.formula && p.formula !== '-'
                      ? <span className="font-mono text-lime-light font-bold text-sm whitespace-nowrap">{p.formula}</span>
                      : <Icon name="FlaskConical" className="w-5 h-5 text-lime-light" />}
                  </div>
                  <div className="min-w-0">
                    <div className="font-jakarta font-bold text-ink group-hover:text-lime-text transition-colors leading-snug line-clamp-2">{p.name}</div>
                    {p.sub && <div className="text-ink-subtle text-xs mt-0.5 truncate">{p.sub}</div>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
