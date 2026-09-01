import { SITE_URL } from './site';

/**
 * BreadcrumbList JSON-LD.
 *
 * Every deep page (product, industry, article) already emitted one, but the
 * top-level pages did not, so Google had no trail for /industries, /markets,
 * /about or /quote. Search results show the trail instead of a bare URL, and
 * answer engines use it to place a page in the site's hierarchy.
 *
 * `trail` excludes Home, which is always position 1.
 */
export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...trail.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: t.name,
        item: `${SITE_URL}${t.path}`,
      })),
    ],
  };
}

/** Renders one JSON-LD blob as the <script> Google expects. */
export const jsonLdScript = (data: unknown) => ({
  type: 'application/ld+json' as const,
  dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
});
