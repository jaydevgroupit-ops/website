import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Icon } from '@/components/Icon';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Insights - Chemical Trade Knowledge',
  description:
    'Practical guides on industrial chemicals, grades, dosing, water treatment, mining reagents, and export trade terms from Jaydev Group.',
  alternates: { canonical: `${SITE_URL}/articles` },
};

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;

  return (
    <div className="min-h-screen bg-white pt-16 pb-20">
      <div className="bg-navy py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,146,42,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Insights</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">Articles &amp; Industry Insights</h1>
          <p className="text-white/65 max-w-2xl mx-auto text-lg">
            Practical knowledge on chemical grades, dosing, water treatment, mining reagents, and international trade terms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Lead article */}
        <Link href={`/articles/${lead.slug}`} className="card-white rounded-2xl overflow-hidden grid md:grid-cols-2 mb-10 group">
          <div className="relative h-64 md:h-auto bg-navy-pale">
            <Image src={lead.image} alt={lead.title} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-gold-bg text-gold-dark font-semibold">{lead.category}</span>
              <span className="text-gray-400">{lead.readTime}</span>
            </div>
            <h2 className="font-jakarta text-2xl font-extrabold text-navy mb-3 group-hover:text-gold transition-colors">{lead.title}</h2>
            <p className="text-gray-500 leading-relaxed mb-4">{lead.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-gold-dark font-semibold text-sm">
              Read article <Icon name="ArrowRight" className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="card-white rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative h-44 bg-navy-pale">
                <Image src={a.image} alt={a.title} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-gold-bg text-gold-dark font-semibold">{a.category}</span>
                  <span className="text-gray-400">{a.readTime}</span>
                </div>
                <h3 className="font-jakarta font-bold text-navy mb-2 group-hover:text-gold transition-colors leading-snug">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
