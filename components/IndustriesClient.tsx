'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { industryData, products, INDUSTRY_IMAGE_MAP } from '@/lib/content';
import { Icon } from './Icon';

export default function IndustriesClient() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () => (active === 'all' ? industryData : industryData.filter(i => i.id === active)),
    [active]
  );

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Header */}
      <div className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,146,42,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Industries</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">Solutions for Every Industry</h1>
          <p className="text-white/65 max-w-2xl mx-auto text-lg">
            Industrial chemicals mapped to {industryData.length} sectors - each with a curated product portfolio, documentation, and global sourcing support.
          </p>
        </div>
      </div>

      {/* Sector filter - one axis, the 12 sectors themselves */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActive('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              active === 'all' ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-[#E5E7EB] hover:border-navy hover:text-navy'
            }`}
          >
            All sectors
          </button>
          {industryData.map(i => (
            <button
              key={i.id}
              onClick={() => setActive(i.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                active === i.id ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-[#E5E7EB] hover:border-navy hover:text-navy'
              }`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((industry, idx) => {
            const industryProducts = industry.productIds.map(id => products.find(p => p.id === id)).filter(Boolean);
            const img = INDUSTRY_IMAGE_MAP[industry.id];
            return (
              <motion.section
                key={industry.id}
                id={industry.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="card-white rounded-2xl overflow-hidden scroll-mt-32"
              >
                {/* Banner */}
                <div className="relative h-44 bg-navy">
                  {img && <Image src={img} alt={industry.name} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover opacity-30" />}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
                  <div className="absolute inset-0 p-6 md:p-8 flex items-end">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                          <Icon name={industry.icon} className="w-7 h-7 text-gold-light" strokeWidth={1.5} />
                        </div>
                        <h2 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">{industry.name}</h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industry.markets.map(m => (
                          <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light font-semibold">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">{industry.description}</p>

                  <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-4">Primary Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
                    {industryProducts.map(product => product && (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-gold/40 hover:bg-gold-bg transition-all group"
                      >
                        <span className="text-gold font-mono text-xs shrink-0 font-bold">{product.formula}</span>
                        <span className="text-navy text-sm font-semibold group-hover:text-gold transition-colors leading-tight">{product.name}</span>
                      </Link>
                    ))}
                  </div>

                  {industry.additionalProducts.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">Also Sourced on Request</h3>
                      <div className="flex flex-wrap gap-2">
                        {industry.additionalProducts.map(p => (
                          <span key={p} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-medium border border-gray-200">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#F1F5F9]">
                    <Link
                      href={`/quote?industry=${industry.id}`}
                      className="group/cta inline-flex items-center gap-2.5 font-jakarta font-bold text-navy hover:text-gold-dark transition-colors"
                    >
                      Request a quote for {industry.name}
                      <span className="inline-flex w-7 h-7 rounded-full bg-gold/15 text-gold-dark items-center justify-center transition-all group-hover/cta:bg-gold group-hover/cta:text-white">
                        <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" />
                      </span>
                    </Link>
                    <a
                      href={`https://wa.me/919099796811?text=Hi%2C%20I%20need%20chemicals%20for%20the%20${encodeURIComponent(industry.name)}%20industry`}
                      target="_blank" rel="noopener noreferrer"
                      aria-label={`WhatsApp enquiry for ${industry.name}`}
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
                    </a>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
