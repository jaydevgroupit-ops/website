'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { products, categories, IMPORT_PRODUCTS } from '@/lib/content';
import { pharmaProducts, PHARMA_SECTIONS, THERAPEUTIC_SEGMENTS, displayName, type PharmaSection } from '@/lib/pharma';
import { DIVISIONS, PHARMA_DISCLAIMER, countMatches, type Division } from '@/lib/catalogue';
import { Icon } from './Icon';
import { CatalogueGrid, CatalogueTable } from './products/CatalogueViews';
import type { Row } from './products/types';
import { useEnquiry } from './products/EnquiryContext';

const catLabel: Record<string, string> = Object.fromEntries(categories.map((c) => [c.id, c.label]));
const sectionLabel: Record<string, string> = Object.fromEntries(PHARMA_SECTIONS.map((s) => [s.id, s.label]));
const segIdOf: Record<string, string> = Object.fromEntries(THERAPEUTIC_SEGMENTS.map((s) => [s.label, s.id]));

type View = 'grid' | 'table';

/* ── normalisation: both books become one row shape ───────────────────────── */

const industrialRow = (p: (typeof products)[number]): Row => ({
  id: p.id,
  name: p.name,
  formula: p.formula && p.formula !== '-' ? p.formula : undefined,
  cas: p.cas,
  meta: p.grade,
  group: catLabel[p.category] ?? p.category,
  href: `/products/${p.id}`,
  featured: p.featured,
  blurb: p.description,
});

const pharmaRow = (p: (typeof pharmaProducts)[number]): Row => ({
  id: p.id,
  name: displayName(p),
  cas: p.cas ?? p.casForms?.map((f) => f.cas).join(' · '),
  meta: p.therapeuticSegment,
  group: sectionLabel[p.section] ?? p.section,
  flag: p.investigational ? 'Investigational' : undefined,
});

const importRow = (p: (typeof IMPORT_PRODUCTS)[number]): Row => ({
  id: p.id,
  name: p.name,
  cas: 'cas' in p ? (p as { cas?: string }).cas : undefined,
  group: 'Import',
  flag: 'Import',
  blurb: 'description' in p ? (p as { description?: string }).description : undefined,
});

export default function ProductsClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [division, setDivision] = useState<Division>((params.get('division') as Division) || 'industrial');
  const [search, setSearch] = useState(params.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(params.get('category') || 'all');
  const [section, setSection] = useState<PharmaSection | 'all'>((params.get('section') as PharmaSection) || 'all');
  const [segment, setSegment] = useState(params.get('segment') || 'all');
  const [showImports, setShowImports] = useState(false);
  const [view, setView] = useState<View>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [facetQuery, setFacetQuery] = useState(''); // mobile only - the rail is always shown from lg up
  const { ids, has, toggle } = useEnquiry();
  const selected = useMemo(() => new Set(ids), [ids]);

  // Keep the URL in step so any filtered view is shareable. The search term is
  // included so a result set can be linked to (and so the WebSite SearchAction
  // in the root layout points at a URL that genuinely filters) - debounced,
  // because without it every keystroke would fire its own router.replace.
  useEffect(() => {
    const t = setTimeout(() => {
      const q = new URLSearchParams();
      if (division !== 'industrial') q.set('division', division);
      if (division === 'industrial' && activeCategory !== 'all') q.set('category', activeCategory);
      if (division === 'pharma' && section !== 'all') q.set('section', section);
      if (division === 'pharma' && segment !== 'all') q.set('segment', segment);
      if (search.trim()) q.set('q', search.trim());
      const qs = q.toString();
      router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
    }, 350);
    return () => clearTimeout(t);
  }, [division, activeCategory, section, segment, search, router]);

  const q = search.toLowerCase().trim();

  const matchIndustrial = useCallback(
    (p: (typeof products)[number]) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.cas.includes(q) ||
      p.formula.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.applications.some((a) => a.toLowerCase().includes(q)),
    [q],
  );

  const matchPharma = useCallback(
    (p: (typeof pharmaProducts)[number]) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.shortName ?? '').toLowerCase().includes(q) ||
      (p.cas ?? '').includes(q) ||
      (p.casForms ?? []).some((f) => f.cas.includes(q)) ||
      (p.therapeuticSegment ?? '').toLowerCase().includes(q),
    [q],
  );

  /* Facet counts reflect the current search but not the facet itself, so a
     buyer can see how many results each option would give before clicking. */
  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = {};
    products.filter(matchIndustrial).forEach((p) => { m[p.category] = (m[p.category] ?? 0) + 1; });
    return m;
  }, [matchIndustrial]);

  const sectionCounts = useMemo(() => {
    const m: Record<string, number> = {};
    pharmaProducts.filter(matchPharma).forEach((p) => {
      if (segment !== 'all' && (!p.therapeuticSegment || segIdOf[p.therapeuticSegment] !== segment)) return;
      m[p.section] = (m[p.section] ?? 0) + 1;
    });
    return m;
  }, [matchPharma, segment]);

  const segmentCounts = useMemo(() => {
    const m: Record<string, number> = {};
    pharmaProducts.filter(matchPharma).forEach((p) => {
      if (section !== 'all' && p.section !== section) return;
      if (!p.therapeuticSegment) return;
      const id = segIdOf[p.therapeuticSegment];
      if (id) m[id] = (m[id] ?? 0) + 1;
    });
    return m;
  }, [matchPharma, section]);

  const rows: Row[] = useMemo(() => {
    if (division === 'industrial') {
      const base = products
        .filter((p) => (activeCategory === 'all' || p.category === activeCategory) && matchIndustrial(p))
        .map(industrialRow);
      return showImports ? [...base, ...IMPORT_PRODUCTS.map(importRow)] : base;
    }
    return pharmaProducts
      .filter((p) => {
        const okSection = section === 'all' || p.section === section;
        const okSegment = segment === 'all' || (p.therapeuticSegment && segIdOf[p.therapeuticSegment] === segment);
        return okSection && okSegment && matchPharma(p);
      })
      .map(pharmaRow);
  }, [division, activeCategory, section, segment, matchIndustrial, matchPharma, showImports]);

  const otherDivision: Division = division === 'industrial' ? 'pharma' : 'industrial';
  const otherMatches = q ? countMatches(q, otherDivision) : 0;

  const switchDivision = (d: Division) => {
    setDivision(d); setSearch(''); setActiveCategory('all'); setSection('all'); setSegment('all');
  };
  const clearAll = () => { setSearch(''); setActiveCategory('all'); setSection('all'); setSegment('all'); };

  const isFiltered = Boolean(q) || activeCategory !== 'all' || section !== 'all' || segment !== 'all';
  const active = DIVISIONS.find((d) => d.id === division)!;

  /* ── facet rail ── */
  const Facet = ({ label, count, on, onClick }: { label: string; count: number; on: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-left text-sm transition-colors ${
        on ? 'bg-lime-tint text-ink font-semibold' : 'text-ink-muted hover:bg-ink-pale'
      }`}
    >
      <span className="truncate">{label}</span>
      <span className={`font-mono text-[11px] tabular-nums flex-shrink-0 ${on ? 'text-lime-text' : 'text-ink-subtle'}`}>{count}</span>
    </button>
  );

  return (
    <div className="bg-white min-h-screen pt-20 pb-28">
      {/* ── header ── */}
      <div className="relative bg-surface border-b border-line overflow-hidden">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full" style={{ maskImage: 'radial-gradient(ellipse 60% 80% at 85% 30%, #000 10%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 85% 30%, #000 10%, transparent 70%)' }}>
          <defs>
            <pattern id="pc-hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(.7)">
              <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="#39CE22" strokeWidth="1.1" opacity=".3" />
              <path d="M28 64 L56 80 L56 112 L28 128 L0 112 L0 80 Z" fill="none" stroke="#39CE22" strokeWidth="1.1" opacity=".3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pc-hex)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 py-14 text-center">
          <span className="section-label mb-3">Catalogue</span>
          <h1 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-ink mb-2">
            {products.length + pharmaProducts.length} products, one enquiry
          </h1>
          <p className="text-ink-soft max-w-2xl mx-auto mb-7">{active.blurb}</p>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3 text-left">
            <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-xl">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 312 products by name, CAS, formula or use…"
                aria-label="Search the catalogue"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-line text-ink placeholder-ink-subtle text-sm focus:border-lime/50 outline-none transition-colors"
              />
            </div>
            <div className="inline-flex p-1 rounded-xl bg-white border border-line gap-1 self-center lg:self-auto">
              {DIVISIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => switchDivision(d.id)}
                  aria-pressed={division === d.id}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                    division === d.id ? 'bg-lime-text text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Icon name={d.icon} className="w-4 h-4" />
                  {d.short}
                  <span className="font-mono text-[11px] tabular-nums opacity-70">{d.count}</span>
                </button>
              ))}
            </div>
          </div>

          {q && otherMatches > 0 && (
            <button type="button" onClick={() => switchDivision(otherDivision)} className="mt-4 text-sm text-lime-text font-semibold hover:underline">
              {otherMatches} more match “{search}” in {DIVISIONS.find((d) => d.id === otherDivision)!.short} →
            </button>
          )}
        </div>
      </div>

      {/* ── body ── */}
      {/* mobile: the rail is a disclosure, not a wall of options above the results */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 pt-6">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-line bg-white text-sm font-semibold text-ink"
        >
          <span className="inline-flex items-center gap-2">
            <Icon name="SlidersHorizontal" className="w-4 h-4 text-lime-text" />
            Filters
            {isFiltered && <span className="text-[10px] font-bold uppercase tracking-wider text-lime-text bg-lime-tint px-2 py-0.5 rounded">On</span>}
          </span>
          <Icon name="ChevronRight" className={`w-4 h-4 text-ink-subtle transition-transform ${filtersOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6 lg:gap-8">

        {/* facet rail */}
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto rounded-xl border border-line p-4 lg:p-0 lg:border-0 lg:rounded-none`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle">Filter</h2>
            {isFiltered && (
              <button type="button" onClick={clearAll} className="text-[11px] font-semibold text-lime-text hover:underline">Clear</button>
            )}
          </div>

          {division === 'industrial' ? (
            <>
              <div className="space-y-0.5 mb-6">
                <Facet label="All categories" count={products.filter(matchIndustrial).length} on={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
                {categories.map((c) => (
                  <Facet key={c.id} label={c.label} count={categoryCounts[c.id] ?? 0} on={activeCategory === c.id} onClick={() => setActiveCategory(c.id)} />
                ))}
              </div>
              <label className="flex items-center gap-2 px-3 text-sm text-ink-muted cursor-pointer">
                <input type="checkbox" checked={showImports} onChange={(e) => setShowImports(e.target.checked)} className="accent-lime-text" />
                Include import portfolio
              </label>
            </>
          ) : (
            <>
              <div className="space-y-0.5 mb-6">
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle">Section</div>
                <Facet label="All sections" count={pharmaProducts.filter(matchPharma).length} on={section === 'all'} onClick={() => setSection('all')} />
                {PHARMA_SECTIONS.map((s) => (
                  <Facet key={s.id} label={s.label} count={sectionCounts[s.id] ?? 0} on={section === s.id} onClick={() => setSection(s.id)} />
                ))}
              </div>
              <div className="space-y-0.5">
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle">Therapeutic area</div>
                <div className="px-1 pb-1.5">
                  <input
                    type="search"
                    value={facetQuery}
                    onChange={(e) => setFacetQuery(e.target.value)}
                    placeholder="Narrow areas…"
                    aria-label="Filter therapeutic areas"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-line text-xs text-ink placeholder-ink-subtle focus:border-lime/50 outline-none"
                  />
                </div>
                <Facet label="All areas" count={pharmaProducts.filter(matchPharma).length} on={segment === 'all'} onClick={() => setSegment('all')} />
                {THERAPEUTIC_SEGMENTS.filter((s) => (segmentCounts[s.id] ?? 0) > 0 && s.label.toLowerCase().includes(facetQuery.toLowerCase())).map((s) => (
                  <Facet key={s.id} label={s.label} count={segmentCounts[s.id] ?? 0} on={segment === s.id} onClick={() => setSegment(s.id)} />
                ))}
              </div>
            </>
          )}
        </aside>

        {/* results */}
        <div>
          {isFiltered && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle">Active</span>
              {q && (
                <button type="button" onClick={() => setSearch('')} className="group inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-lime-tint border border-lime/35 text-ink font-medium">
                  “{search}” <Icon name="X" className="w-3 h-3 text-ink-subtle group-hover:text-ink" />
                </button>
              )}
              {activeCategory !== 'all' && (
                <button type="button" onClick={() => setActiveCategory('all')} className="group inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-lime-tint border border-lime/35 text-ink font-medium">
                  {catLabel[activeCategory]} <Icon name="X" className="w-3 h-3 text-ink-subtle group-hover:text-ink" />
                </button>
              )}
              {section !== 'all' && (
                <button type="button" onClick={() => setSection('all')} className="group inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-lime-tint border border-lime/35 text-ink font-medium">
                  {sectionLabel[section]} <Icon name="X" className="w-3 h-3 text-ink-subtle group-hover:text-ink" />
                </button>
              )}
              {segment !== 'all' && (
                <button type="button" onClick={() => setSegment('all')} className="group inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-lime-tint border border-lime/35 text-ink font-medium">
                  {THERAPEUTIC_SEGMENTS.find((x) => x.id === segment)?.label} <Icon name="X" className="w-3 h-3 text-ink-subtle group-hover:text-ink" />
                </button>
              )}
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-ink-subtle hover:text-ink underline ml-1">Clear all</button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-line">
            <p className="text-sm text-ink-muted">
              <strong className="text-ink font-jakarta font-extrabold tabular-nums">{rows.length}</strong>{' '}
              {rows.length === 1 ? 'product' : 'products'}
              {isFiltered && <span className="text-ink-subtle"> · filtered</span>}
            </p>
            <div className="inline-flex p-0.5 rounded-lg bg-ink-pale border border-line gap-0.5">
              {(['grid', 'table'] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                    view === v ? 'bg-white text-ink shadow-sm' : 'text-ink-subtle hover:text-ink'
                  }`}
                >
                  <Icon name={v === 'grid' ? 'LayoutGrid' : 'List'} className="w-3.5 h-3.5" />
                  {v}
                </button>
              ))}
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="Search" className="w-10 h-10 text-ink-subtle mx-auto mb-3" />
              <p className="font-jakarta font-bold text-ink mb-1">No products match that</p>
              <p className="text-ink-soft text-sm mb-4">Try a CAS number, a formula, or clear the filters.</p>
              <button type="button" onClick={clearAll} className="btn-lime text-sm">Clear filters</button>
            </div>
          ) : view === 'grid' ? (
            <CatalogueGrid rows={rows} selected={selected} toggle={toggle} />
          ) : (
            <CatalogueTable rows={rows} selected={selected} toggle={toggle} />
          )}

          {division === 'pharma' && (
            <p className="mt-8 text-xs text-ink-subtle leading-relaxed max-w-3xl border-t border-line-faint pt-5">
              {PHARMA_DISCLAIMER}
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
