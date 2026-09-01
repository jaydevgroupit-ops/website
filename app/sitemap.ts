import { MetadataRoute } from 'next';
import { products, industryData } from '@/lib/content';
import { articles } from '@/lib/articles';
import { SITE_URL as BASE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), priority: 1 },
    { url: `${BASE}/products`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/industries`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/markets`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE}/quote`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/faq`, lastModified: new Date(), priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    priority: 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/products/${p.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));


  const industryPages: MetadataRoute.Sitemap = industryData.map(i => ({
    url: `${BASE}/industries/${i.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...industryPages, ...articlePages];
}
