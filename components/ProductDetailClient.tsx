'use client';

import Link from 'next/link';
import { Product, products } from '@/lib/content';
import { Icon } from './Icon';

export default function ProductDetailClient({ product }: { product: Product }) {
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const hasFormula = product.formula && product.formula !== '-';

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="bg-navy-pale border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="hover:text-navy transition-colors">Products</Link>
          <span className="text-gray-300">/</span>
          <span className="text-navy font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero card */}
            <div className="card-white overflow-hidden">
              {/* Formula header (no stock photo) */}
              <div className="relative bg-navy px-8 py-7 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(201,146,42,0.20),transparent_55%)]" />
                <div className="relative flex items-center gap-5">
                  <div className="h-20 min-w-[5rem] px-5 rounded-2xl bg-white/8 border border-white/15 flex items-center justify-center flex-shrink-0">
                    {hasFormula ? (
                      <span className="font-mono text-gold-light text-2xl font-bold whitespace-nowrap">{product.formula}</span>
                    ) : (
                      <Icon name="FlaskConical" className="w-9 h-9 text-gold-light" />
                    )}
                  </div>
                  <div>
                    <div className="text-gold-light text-xs font-bold uppercase tracking-wider mb-1 capitalize">{product.category.replace(/-/g, ' ')}</div>
                    <h1 className="text-white font-jakarta font-extrabold text-2xl leading-tight">{product.name}</h1>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gold-bg border border-gold/30 text-gold-dark text-sm font-bold">{product.grade}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-xs font-mono">CAS {product.cas}</span>
                  {product.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-navy-pale border border-navy-light text-navy text-xs font-semibold"><Icon name="Sparkles" className="w-3 h-3 text-gold" /> Featured</span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>

                {product.variants && product.variants.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-[#F1F5F9]">
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">Available Forms</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {product.variants.map(v => (
                        <div key={v.form} className="rounded-xl bg-navy-pale border border-navy-light px-4 py-3">
                          <div className="font-jakarta font-bold text-navy text-sm">{v.form}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{v.grade}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specs Table */}
            <div className="card-white overflow-hidden">
              <div className="px-6 py-4 bg-navy-pale border-b border-[#E5E7EB]">
                <h2 className="font-jakarta font-bold text-navy text-base">Technical Specifications</h2>
              </div>
              <table className="w-full">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className={`border-b border-[#F1F5F9] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                      <td className="px-6 py-3.5 text-gray-500 text-sm font-medium w-2/5">{spec.label}</td>
                      <td className="px-6 py-3.5 text-navy text-sm font-semibold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Applications */}
            <div className="card-white p-6">
              <h2 className="font-jakarta font-bold text-navy mb-4">Applications</h2>
              <div className="flex flex-wrap gap-2">
                {product.applications.map(app => (
                  <span key={app} className="px-3 py-1.5 rounded-lg bg-navy-pale border border-navy-light text-navy text-sm font-medium">{app}</span>
                ))}
              </div>
            </div>

            {/* Packaging */}
            <div className="card-white p-6">
              <h2 className="font-jakarta font-bold text-navy mb-4">Packaging Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.packaging.map(pkg => (
                  <div key={pkg} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    <Icon name="Package" className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-navy text-sm font-medium">{pkg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Manufacturers */}
            <div className="card-white p-6">
              <h2 className="font-jakarta font-bold text-navy mb-4">Available From</h2>
              <div className="flex flex-wrap gap-2">
                {product.manufacturers.map(m => (
                  <span key={m} className="px-4 py-2 rounded-xl bg-gold-bg border border-gold/30 text-gold-dark text-sm font-semibold">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">

            {/* Today's indicative price */}
            <div className="rounded-2xl bg-navy p-5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,146,42,0.18),transparent_60%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 text-gold-light text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Pricing
                </div>
                <p className="text-white font-jakarta font-bold mb-1">Today&apos;s Indicative Price</p>
                <p className="text-white/55 text-xs mb-4">Market-linked. Get the current CIF/FOB rate for {product.name}.</p>
                <a
                  href={`https://wa.me/919099796811?text=${encodeURIComponent(`Hi, please share today's indicative price for ${product.name} (CAS ${product.cas}).`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-gold w-full justify-center text-sm"
                >
                  Request Today&apos;s Price
                </a>
              </div>
            </div>

            {/* RFQ Card */}
            <div className="card-white p-6 border-2 border-gold/30">
              <h3 className="font-jakarta font-bold text-navy text-lg mb-1">Request a Quote</h3>
              <p className="text-gray-500 text-xs mb-5">Full CIF quote with COA &amp; documentation in 48 hours</p>
              <Link href={`/quote?product=${product.id}`} className="btn-gold w-full justify-center text-sm">
                Get CIF Quote Online <Icon name="ArrowRight" className="w-4 h-4" />
              </Link>
            </div>

            {/* Documentation */}
            <div className="card-white p-6">
              <h3 className="font-jakarta font-bold text-navy mb-4 text-sm">Documentation Available</h3>
              <div className="space-y-2.5">
                {['Certificate of Analysis (COA)', 'MSDS / Safety Data Sheet', 'Certificate of Origin', 'IMDG Declaration', 'Packing List & Invoice'].map(doc => (
                  <div key={doc} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Icon name="Check" className="w-4 h-4 text-green-600 flex-shrink-0" strokeWidth={2.5} />
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Markets */}
            <div className="card-white p-6">
              <h3 className="font-jakarta font-bold text-navy mb-4 text-sm">Key Markets</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'GCC & Middle East', time: '7–12 days' },
                  { label: 'East Africa', time: '15–20 days' },
                  { label: 'Southeast Asia', time: '12–18 days' },
                  { label: 'West Africa', time: '18–25 days' },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 inline-flex items-center gap-1.5"><Icon name="MapPin" className="w-3.5 h-3.5 text-gold" /> {m.label}</span>
                    <span className="text-navy font-semibold text-xs">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-jakarta text-2xl font-extrabold text-navy mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="card-white p-5 flex items-center gap-4 group">
                  <div className="h-12 min-w-[3rem] px-3 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                    {p.formula && p.formula !== '-'
                      ? <span className="font-mono text-gold-light font-bold text-sm whitespace-nowrap">{p.formula}</span>
                      : <Icon name="FlaskConical" className="w-5 h-5 text-gold-light" />}
                  </div>
                  <div className="min-w-0">
                    <div className="font-jakarta font-bold text-navy group-hover:text-gold transition-colors leading-snug">{p.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5 truncate">{p.grade}</div>
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
