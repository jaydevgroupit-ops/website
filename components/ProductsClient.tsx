'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { products, categories, IMPORT_PRODUCTS } from '@/lib/content';
import { pharmaProducts, PHARMA_SECTIONS, THERAPEUTIC_SEGMENTS, displayName, type PharmaSection } from '@/lib/pharma';
import { DIVISIONS, PHARMA_DISCLAIMER, countMatches, type Division } from '@/lib/catalogue';
import { Icon } from './Icon';

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const catLabel: Record<string, string> = Object.fromEntries(categories.map((c) => [c.id, c.label]));
const segLabel: Record<string, string> = Object.fromEntries(THERAPEUTIC_SEGMENTS.map((s) => [s.id, s.label]));
const segIdOf: Record<string, string> = Object.fromEntries(THERAPEUTIC_SEGMENTS.map((s) => [s.label, s.id]));

const pill = (active: boolean) =>
  `inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
    active ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-[#E5E7EB] hover:border-navy hover:text-navy'
  }`;

export default function ProductsClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [division, setDivision] = useState<Division>((params.get('division') as Division) || 'industrial');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(params.get('category') || 'all');
  const [section, setSection] = useState<PharmaSection | 'all'>((params.get('section') as PharmaSection) || 'all');
  const [segment, setSegment] = useState(params.get('segment') || 'all');
  const [showImports, setShowImports] = useState(false);

  // Keep the URL in step so any filtered view is shareable and linkable.
  useEffect(() => {
    const q = new URLSearchParams();
    if (division !== 'industrial') q.set('division', division);
    if (division === 'industrial' && activeCategory !== 'all') q.set('category', activeCategory);
    if (division === 'pharma' && section !== 'all') q.set('section', section);
    if (division === 'pharma' && segment !== 'all') q.set('segment', segment);
    const qs = q.toString();
    router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
  }, [division, activeCategory, section, segment, router]);

  const q = search.toLowerCase().trim();

  const industrialFiltered = useMemo(
    () =>
      products.filter((p) => {
        const matchCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.cas.includes(q) ||
          p.formula.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.applications.some((a) => a.toLowerCase().includes(q));
        return matchCategory && matchSearch;
      }),
    [q, activeCategory],
  );

  const pharmaFiltered = useMemo(
    () =>
      pharmaProducts.filter((p) => {
        const matchSection = section === 'all' || p.section === section;
        const matchSegment =
          segment === 'all' || (p.therapeuticSegment && segIdOf[p.therapeuticSegment] === segment);
        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          (p.shortName ?? '').toLowerCase().includes(q) ||
          (p.cas ?? '').includes(q) ||
          (p.casForms ?? []).some((f) => f.cas.includes(q)) ||
          (p.therapeuticSegment ?? '').toLowerCase().includes(q);
        return matchSection && matchSegment && matchSearch;
      }),
    [q, section, segment],
  );

  const otherDivision: Division = division === 'industrial' ? 'pharma' : 'industrial';
  const otherMatches = q ? countMatches(q, otherDivision) : 0;

  const switchDivision = useCallback((d: Division) => {
    setDivision(d);
    setSearch('');
    setActiveCategory('all');
    setSection('all');
    setSegment('all');
  }, []);

  const clearAll = () => {
    setSearch('');
    setActiveCategory('all');
    setSection('all');
    setSegment('all');
  };

  const resultCount = division === 'industrial' ? industrialFiltered.length : pharmaFiltered.length;
  const isFiltered = Boolean(q) || activeCategory !== 'all' || section !== 'all' || segment !== 'all';
  const active = DIVISIONS.find((d) => d.id === division)!;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* ── Header + division tabs ── */}
      <div className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Product Portfolio</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">{active.label}</h1>
          <p className="text-white/65 max-w-2xl mx-auto text-lg">{active.blurb}</p>

          <div className="inline-flex flex-col sm:flex-row mt-8 p-1 rounded-2xl sm:rounded-full bg-white/[0.08] border border-white/15 gap-1">
            {DIVISIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => switchDivision(d.id)}
                aria-pressed={division === d.id}
                className={`inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  division === d.id ? 'bg-gold text-white shadow' : 'text-white/65 hover:text-white'
                }`}
              >
                <Icon name={d.icon} className="w-4 h-4" /> {d.short}
                <span className={`text-xs ${division === d.id ? 'text-white/80' : 'text-white/40'}`}>{d.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* ── Sticky filter bar ── */}
        <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/95 backdrop-blur border-b border-[#EAEEF3]">
          <div className="max-w-lg mx-auto relative mb-3">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                division === 'industrial'
                  ? 'Search by name, CAS, formula or use…'
                  : 'Search APIs by name, CAS or therapeutic area…'
              }
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-sm"
            />
          </div>

          {division === 'industrial' ? (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              <button onClick={() => setActiveCategory('all')} className={pill(activeCategory === 'all')}>
                All ({products.length})
              </button>
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.id).length;
                return (
                  <button key={c.id} onClick={() => setActiveCategory(c.id)} className={pill(activeCategory === c.id)}>
                    <Icon name={c.icon} className="w-4 h-4" /> {c.label} ({count})
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
                <button
                  onClick={() => { setSection('all'); setSegment('all'); }}
                  className={pill(section === 'all')}
                >
                  All ({pharmaProducts.length})
                </button>
                {PHARMA_SECTIONS.map((s) => {
                  const count = pharmaProducts.filter((p) => p.section === s.id).length;
                  if (!count) return null;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setSection(s.id); setSegment('all'); }}
                      className={pill(section === s.id)}
                    >
                      {s.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Therapeutic areas — only meaningful inside APIs */}
              {section === 'apis' && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5 mt-2">
                  <button onClick={() => setSegment('all')} className={pill(segment === 'all')}>
                    All areas
                  </button>
                  {THERAPEUTIC_SEGMENTS.map((s) => {
                    const count = pharmaProducts.filter((p) => p.therapeuticSegment === s.label).length;
                    if (!count) return null;
                    return (
                      <button key={s.id} onClick={() => setSegment(s.id)} className={pill(segment === s.id)}>
                        {s.label} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-gray-400">
              {resultCount} product{resultCount !== 1 ? 's' : ''}
            </span>
            {otherMatches > 0 && (
              <button
                onClick={() => { const s = search; switchDivision(otherDivision); setSearch(s); }}
                className="inline-flex items-center gap-1 text-navy font-semibold hover:text-gold-dark hover:underline"
              >
                {otherMatches} also in {DIVISIONS.find((d) => d.id === otherDivision)!.short}
                <Icon name="ArrowRight" className="w-3.5 h-3.5" />
              </button>
            )}
            {isFiltered && (
              <button onClick={clearAll} className="inline-flex items-center gap-1 text-gold-dark font-semibold hover:underline">
                <Icon name="X" className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Industrial ── */}
        {division === 'industrial' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              {industrialFiltered.map((product) => {
                const hasFormula = product.formula && product.formula !== '-';
                return (
                  <article
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-2xl border border-[#EAEEF3] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_46px_-18px_rgba(14,32,64,0.25)]"
                  >
                    {hasFormula && (
                      <span className="pointer-events-none absolute top-4 right-5 font-mono font-bold text-3xl text-navy/[0.05] group-hover:text-gold/[0.10] transition-colors select-none">
                        {product.formula}
                      </span>
                    )}
                    <div className="p-6 flex-1 flex flex-col relative">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">{catLabel[product.category]}</span>
                        {product.featured && <Icon name="Sparkles" className="w-3.5 h-3.5 text-gold ml-auto" />}
                      </div>
                      <h3 className="font-jakarta font-extrabold text-navy text-xl leading-tight mb-2 pr-16">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        {hasFormula && <span className="font-mono text-gold-dark text-sm font-bold">{product.formula}</span>}
                        <span className="text-gray-400 text-xs font-mono">CAS {product.cas}</span>
                      </div>
                      <p className="text-navy-mid text-xs font-semibold mb-3">{product.grade}</p>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-6">{product.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] mt-auto">
                        <Link
                          href={`/products/${product.id}`}
                          className="group/cta inline-flex items-center gap-2 font-jakarta font-bold text-navy text-sm hover:text-gold-dark transition-colors"
                        >
                          View product
                          <span className="inline-flex w-6 h-6 rounded-full bg-gold/12 text-gold-dark items-center justify-center transition-all group-hover/cta:bg-gold group-hover/cta:text-white">
                            <Icon name="ArrowRight" className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                          </span>
                        </Link>
                        <Link href={`/quote?product=${product.id}`} className="px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-colors">
                          Quote
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Imports — a section, not a top-level mode */}
            <div className="mt-14 rounded-2xl border border-[#EAEEF3] bg-navy-pale/40 p-6">
              <button
                onClick={() => setShowImports((v) => !v)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={showImports}
              >
                <span className="flex items-center gap-3">
                  <Icon name="Anchor" className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>
                    <span className="font-jakarta font-extrabold text-navy">We also import into India</span>
                    <span className="block text-gray-500 text-sm">
                      {IMPORT_PRODUCTS.length} raw materials we bring into India
                    </span>
                  </span>
                </span>
                <Icon name={showImports ? 'ChevronUp' : 'ChevronDown'} className="w-5 h-5 text-navy flex-shrink-0" />
              </button>
              {showImports && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {IMPORT_PRODUCTS.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl border border-[#EAEEF3] p-5">
                      <h3 className="font-jakarta font-bold text-navy mb-1">{p.name}</h3>
                      {p.cas && <p className="text-gray-400 text-xs font-mono mb-2">CAS {p.cas}</p>}
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                      <Link href={`/quote?product=${p.id}`} className="text-navy font-bold text-sm hover:text-gold-dark">
                        Enquire →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Pharma ── */}
        {division === 'pharma' && (
          <>
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pharmaFiltered.map((p) => {
                return (
                  <article
                    key={p.id}
                    className="flex flex-col bg-white rounded-xl border border-[#EAEEF3] p-5 transition-all hover:border-gold/40 hover:shadow-[0_14px_36px_-18px_rgba(14,32,64,0.22)]"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-jakarta font-bold text-navy leading-tight break-words line-clamp-3" title={p.name}>{displayName(p)}</h3>
                      {p.investigational && (
                        <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 border border-gold/30 rounded-full px-2 py-0.5">
                          Investigational
                        </span>
                      )}
                    </div>
                    {p.casForms?.length ? (
                      <p className="text-gray-400 text-xs font-mono mb-2 leading-relaxed">
                        {p.casForms.map((f, i) => (
                          <span key={f.cas}>
                            {i > 0 && <span className="text-gray-300"> · </span>}
                            {f.cas} <span className="not-italic text-gray-300">({f.label})</span>
                          </span>
                        ))}
                      </p>
                    ) : (
                      p.cas && <p className="text-gray-400 text-xs font-mono mb-2">CAS {p.cas}</p>
                    )}
                    {p.therapeuticSegment && (
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-2">{p.therapeuticSegment}</p>
                    )}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F1F5F9] mt-auto">
                      <span className="text-gray-400 text-xs">Grade on enquiry</span>
                      <Link href={`/quote?product=${p.id}`} className="px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-colors flex-shrink-0">
                        Enquire
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-10 text-xs text-gray-400 leading-relaxed max-w-3xl border-t border-[#F1F5F9] pt-5">
              {PHARMA_DISCLAIMER}
            </p>
          </>
        )}

        {resultCount === 0 && (
          <div className="text-center py-20">
            <Icon name="Search" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nothing matched. Try another name or CAS.</p>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-16 bg-navy rounded-2xl p-10 text-center">
          <h2 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Not in the list?
          </h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            {division === 'industrial'
              ? 'Not listed? Send us the product, grade and destination port.'
              : 'Send us the molecule, grade and quantity. We confirm availability and lead time.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-gold px-8 py-3">
              Request a Quote <Icon name="ArrowRight" className="w-4 h-4" />
            </Link>
            <a href="/Jaydev-Multicomm-Catalogue.pdf" download className="btn-ghost-white px-8 py-3">
              <Icon name="Download" className="w-4 h-4" /> Download Catalogue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
