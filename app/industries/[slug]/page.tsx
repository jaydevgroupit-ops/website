import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { industryData, products, INDUSTRY_IMAGE_MAP , sectorProductCount } from '@/lib/content';
import { pharmaProducts, PHARMA_SECTIONS, displayName } from '@/lib/pharma';
import { Icon } from '@/components/Icon';
import { SITE_URL as BASE } from '@/lib/site';

export function generateStaticParams() {
  return industryData.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = industryData.find((i) => i.id === slug);
  if (!ind) return { title: 'Industry' };
  const title = `${ind.name} Chemicals - Exporter & Supplier`;
  const desc = `${ind.description} Jaydev Group supplies ${sectorProductCount(ind, pharmaProducts)}+ products for ${ind.name.toLowerCase()} with full COA, MSDS & export documentation to Africa, GCC & SE Asia.`;
  return {
    title,
    description: desc,
    keywords: ind.seoKeywords.split(',').map((s) => s.trim()),
    alternates: { canonical: `${BASE}/industries/${ind.id}` },
    openGraph: { title: `${title} | Jaydev Group`, description: desc, type: 'website' },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industryData.find((i) => i.id === slug);
  if (!ind) notFound();

  const sectorPharma = (ind.pharmaSections ?? []).flatMap((sec) =>
    pharmaProducts.filter((p) => p.section === sec).slice(0, 8).map((p) => ({ ...p, sec })),
  );
  const industryProducts = ind.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;
  const img = INDUSTRY_IMAGE_MAP[ind.id];
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: `${ind.name} Chemicals Supply`,
      provider: { '@type': 'Organization', name: 'Jaydev Multicomm Pvt. Ltd.' },
      areaServed: ind.markets,
      description: ind.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: `${BASE}/industries` },
        { '@type': 'ListItem', position: 3, name: `${ind.name} Chemicals`, item: `${BASE}/industries/${ind.id}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Chemicals for ${ind.name}`,
      itemListElement: industryProducts.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${BASE}/products/${p.id}`,
        name: p.name,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-16 pb-20">
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <div className="on-ink relative bg-ink overflow-hidden">
        {img && <Image src={img} alt={ind.name} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" priority />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/industries" className="hover:text-white">Industries</Link><span>/</span>
            <span className="text-white/80">{ind.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-lime/20 border border-lime/30 flex items-center justify-center">
              <Icon name={ind.icon} className="w-8 h-8 text-lime-light" strokeWidth={1.5} />
            </div>
            <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white">{ind.name} Chemicals</h1>
          </div>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{ind.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {ind.markets.map((m) => (
              <span key={m} className="text-xs px-3 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime-light font-semibold">{m}</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href={`/quote?industry=${ind.id}`} className="btn-lime px-7 py-3.5">
              Request a Quote <Icon name="ArrowRight" className="w-4 h-4" />
            </Link>
            <a href="/Jaydev-Multicomm-Catalogue.pdf" download className="btn-ghost-white px-7 py-3.5">
              <Icon name="Download" className="w-4 h-4" /> Catalogue
            </a>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="font-jakarta text-2xl font-extrabold text-ink mb-2">Products for {ind.name}</h2>
        <p className="text-ink-soft mb-8">Manufacturer-backed chemicals with COA, MSDS &amp; full export documentation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industryProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="product-card p-5 flex items-center gap-4 group">
              <div className="h-14 min-w-[3.5rem] px-3 rounded-xl bg-ink flex items-center justify-center flex-shrink-0">
                {p.formula && p.formula !== '-'
                  ? <span className="font-mono text-lime-light font-bold text-sm whitespace-nowrap">{p.formula}</span>
                  : <Icon name="FlaskConical" className="w-5 h-5 text-lime-light" />}
              </div>
              <div className="min-w-0">
                <h3 className="font-jakarta font-bold text-ink group-hover:text-lime-text transition-colors leading-snug">{p.name}</h3>
                <div className="text-ink-subtle text-xs mt-0.5 font-mono">CAS {p.cas}</div>
                <p className="text-lime-text text-xs font-semibold mt-0.5">{p.grade}</p>
              </div>
            </Link>
          ))}
        </div>

        {sectorPharma.length > 0 && (
          <div className="mt-12">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-jakarta font-extrabold text-ink text-lg">From the pharma book</h3>
              <Link href="/products?division=pharma" className="text-xs font-semibold text-lime-text hover:underline">
                See all {pharmaProducts.length}
              </Link>
            </div>
            {(ind.pharmaSections ?? []).map((sec) => {
              const items = sectorPharma.filter((p) => p.sec === sec);
              if (!items.length) return null;
              return (
                <div key={sec} className="mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">
                    {PHARMA_SECTIONS.find((s2) => s2.id === sec)?.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((p) => (
                      <Link
                        key={p.id}
                        href={`/quote?product=${p.id}`}
                        className="group inline-flex items-baseline gap-2 text-sm px-3 py-1.5 rounded-full bg-white border border-line hover:border-lime/45 transition-colors"
                      >
                        <span className="text-ink font-medium group-hover:text-lime-text transition-colors">{displayName(p)}</span>
                        {p.cas && <span className="font-mono text-[10px] text-ink-subtle">CAS {p.cas}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {ind.additionalProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-ink-subtle text-xs uppercase tracking-wider font-bold mb-3">Also Sourced on Request</h3>
            <div className="flex flex-wrap gap-2">
              {ind.additionalProducts.map((p) => (
                <span key={p} className="text-sm px-3 py-1.5 rounded-full bg-surface border border-line text-ink font-medium">{p}</span>
              ))}
            </div>
          </div>
        )}

        {/* Cross-links (internal SEO) */}
        <div className="mt-14 pt-10 border-t border-line-faint">
          <h3 className="font-jakarta font-bold text-ink mb-4">Other Industries We Serve</h3>
          <div className="flex flex-wrap gap-2">
            {industryData.filter((o) => o.id !== ind.id).map((o) => (
              <Link key={o.id} href={`/industries/${o.id}`} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-line text-ink-muted hover:border-lime hover:text-lime-text transition-colors">
                <Icon name={o.icon} className="w-4 h-4" /> {o.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="on-ink bg-ink rounded-2xl p-10 text-center">
          <h2 className="font-jakarta text-2xl font-extrabold text-white mb-3">Sourcing for {ind.name}?</h2>
          <p className="text-white/60 mb-6">Get a CIF quote within 48 hours - full documentation included.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/quote?industry=${ind.id}`} className="btn-lime px-8 py-3">Request a Quote</Link>
            <a href={`https://wa.me/919099796811?text=Hi%2C%20I%20need%20chemicals%20for%20the%20${encodeURIComponent(ind.name)}%20industry`} target="_blank" rel="noopener noreferrer" className="btn-ghost-white px-8 py-3">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
