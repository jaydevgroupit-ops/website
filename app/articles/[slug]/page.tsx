import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Icon } from '@/components/Icon';
import { SITE_URL as BASE } from '@/lib/site';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return { title: 'Article' };
  return {
    title: a.title,
    description: a.excerpt,
    keywords: a.keywords.split(',').map((s) => s.trim()),
    alternates: { canonical: `${BASE}/articles/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: 'article', images: [a.image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.date,
      author: { '@type': 'Organization', name: a.author, url: BASE },
      publisher: {
        '@type': 'Organization',
        name: 'Jaydev Group',
        logo: { '@type': 'ImageObject', url: `${BASE}/brand/jaydev-group-logo.png` },
      },
      image: `${BASE}${a.image}`,
      mainEntityOfPage: `${BASE}/articles/${a.slug}`,
      keywords: a.keywords,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE}/articles` },
        { '@type': 'ListItem', position: 3, name: a.title, item: `${BASE}/articles/${a.slug}` },
      ],
    },
  ];

  return (
    <article className="min-h-screen bg-white pt-16 pb-20">
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="on-ink relative bg-ink">
        <Image src={a.image} alt={a.title} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
        <div className="relative max-w-3xl mx-auto px-4 py-16">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/articles" className="hover:text-white">Articles</Link><span>/</span>
            <span className="text-white/80">{a.category}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-lime/20 border border-lime/30 text-lime-light font-semibold">{a.category}</span>
            <span className="text-white/50">{a.readTime}</span>
            <span className="text-white/50">{new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-white leading-tight">{a.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-lg text-ink-muted leading-relaxed mb-8 font-medium">{a.excerpt}</p>
        {a.body.map((sec, i) => (
          <section key={i} className="mb-7">
            {sec.heading && <h2 className="font-jakarta text-xl font-extrabold text-ink mb-3">{sec.heading}</h2>}
            {sec.paragraphs.map((p, j) => (
              <p key={j} className="text-ink-muted leading-relaxed mb-4">{p}</p>
            ))}
          </section>
        ))}

        {/* CTA */}
        <div className="on-ink bg-ink rounded-2xl p-8 text-center mt-10">
          <h3 className="font-jakarta text-xl font-extrabold text-white mb-2">Need a quote for these chemicals?</h3>
          <p className="text-white/60 mb-5 text-sm">CIF/FOB pricing within 48 hours, full documentation included.</p>
          <Link href="/quote" className="btn-lime px-7 py-3">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-jakarta text-2xl font-extrabold text-ink mb-6">More Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((r) => (
            <Link key={r.slug} href={`/articles/${r.slug}`} className="card-white rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative h-40 bg-ink-pale">
                <Image src={r.image} alt={r.title} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-lime-tint text-lime-text font-semibold">{r.category}</span>
                <h3 className="font-jakarta font-bold text-ink mt-2 group-hover:text-lime-text transition-colors leading-snug">{r.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
