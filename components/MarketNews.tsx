import { Icon } from './Icon';

/**
 * Market wire.
 *
 * Sourced from Google News' public RSS feeds, not by scraping search results -
 * scraping Google's SERP breaches their terms and gets the origin IP blocked
 * quickly. The RSS endpoint is published for this purpose and is stable.
 *
 * We show headline, publisher and date, and link out to the publisher. No article
 * text is reproduced: that is the line between aggregation and republishing.
 *
 * `revalidate` is 12 hours, so the feed refreshes twice a day on its own. No cron
 * is needed - the first request after the window rebuilds it.
 */

// 15 minutes. Short enough that the wire is effectively live, long enough not to
// hammer the feed on every request. Vercel rebuilds it on the first hit after the
// window, so no cron is involved.
export const revalidate = 900;

/** Nothing older than this is shown. */
const MAX_AGE_H = 24;
const WANT = 8;

/** Global trade coverage, not India-only: a buyer in Lagos or Jebel Ali cares
 *  what the world market is doing. Queries are deliberately narrow so the wire
 *  stays on chemicals, APIs, intermediates and the trade around them. */
const FEEDS = [
  { q: '"specialty chemicals" OR "commodity chemicals" market', tag: 'Chemicals' },
  { q: '"caustic soda" OR "soda ash" OR "sulphuric acid" OR "hydrogen peroxide" price', tag: 'Prices' },
  { q: '"active pharmaceutical ingredient" OR API OR "drug substance" manufacturing pharma', tag: 'Pharma' },
  { q: '"chemical intermediates" OR "pharmaceutical intermediates" OR excipients supply', tag: 'Intermediates' },
  { q: '"chemical exports" OR "chemical imports" OR "chemicals trade" OR "chemical industry"', tag: 'Trade' },
  { q: '"chemical tanker" OR "chemical shipping" OR "bulk liquid" freight', tag: 'Freight' },
];

type Item = { title: string; link: string; source: string; date: Date; tag: string };

/** Syndicated SEO filler that floods these queries and tells a buyer nothing. */
const NOISE = [
  /market (outlook|size|share|report|research|analysis|forecast)/i,
  /\bcagr\b/i,
  /forecast (to|through|period) 20\d\d/i,
  /outlook to 20\d\d/i,
  /stocks? to (watch|buy)/i,
  /\b(share price|stock) (target|prediction|forecast)/i,
  /top \d+ (stocks|picks)/i,
  /\bipo\b.*(allotment|gmp|subscription)/i,
];
const isNoise = (t: string) => NOISE.some((re) => re.test(t));

function decode(s: string) {
  // The feed double-encodes: "&amp;#x27;" needs &amp; resolved before the numeric
  // entity is visible, so this runs the pass twice.
  const once = (x: string) =>
    x
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
  // Depth varies by publisher, so decode until it stops changing.
  let out = s;
  for (let i = 0; i < 4; i++) {
    const next = once(out);
    if (next === out) break;
    out = next;
  }
  return out.trim();
}

function parse(xml: string, tag: string): Item[] {
  const out: Item[] = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const b = m[1];
    const pick = (t: string) => {
      const r = new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`).exec(b);
      return r ? decode(r[1]) : '';
    };
    const rawTitle = pick('title');
    const source = pick('source');
    const link = pick('link');
    const pub = pick('pubDate');
    if (!rawTitle || !link) continue;
    if (isNoise(rawTitle)) continue;
    // Google appends " - Publisher" to the headline; the publisher is already separate
    let title = source && rawTitle.endsWith(` - ${source}`)
      ? rawTitle.slice(0, -(source.length + 3))
      : rawTitle;
    // fallback: Google appends " - Publisher" even when <source> reads differently
    title = title.replace(/\s+-\s+[A-Z][A-Za-z0-9.&' ]{2,28}$/, '').trim();
    const date = pub ? new Date(pub) : new Date();
    if (Number.isNaN(date.getTime())) continue;
    out.push({ title, link, source: source || 'News', date, tag });
  }
  return out;
}

async function fetchFeed(q: string, tag: string): Promise<Item[]> {
  // `when:1d` filters at the source. Without it Google ranks by relevance and the
  // freshest stories sit far down the feed - a plain query returned 100 items with
  // none inside 24 hours, the same query with when:1d returned 8 of 8 inside it.
  // hl=en&gl=US keeps the coverage global rather than India-weighted.
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(`${q} when:1d`)}&hl=en&gl=US&ceid=US:en`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JaydevGroupSite/1.0)' },
      next: { revalidate },
    });
    if (!res.ok) return [];
    return parse(await res.text(), tag);
  } catch {
    return []; // a dead feed must never take the page down
  }
}

const ago = (d: Date) => {
  const h = Math.floor((Date.now() - d.getTime()) / 3.6e6);
  if (h < 1) return 'just now';
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return days === 1 ? 'yesterday' : `${days}d ago`;
};

export default async function MarketNews() {
  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f.q, f.tag)));
  const now = Date.now();

  // de-duplicate: the same story is often returned by more than one query
  const seen = new Set<string>();
  const all = results
    .flat()
    .filter((it) => {
      const key = it.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 70);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // The 24h rule is absolute - `when:1d` enforces it at the source and this is the
  // belt-and-braces check on top.
  const withinDay = all.filter((it) => now - it.date.getTime() <= MAX_AGE_H * 3.6e6);

  // Round-robin by tag so one busy query cannot flood the rail. Previously five of
  // eight slots were "Chemicals" simply because that query returned most items.
  const byTag = new Map<string, Item[]>();
  withinDay.forEach((it) => {
    const list = byTag.get(it.tag) ?? [];
    list.push(it);
    byTag.set(it.tag, list);
  });
  const items: Item[] = [];
  for (let round = 0; items.length < WANT; round++) {
    let added = false;
    for (const list of byTag.values()) {
      if (list[round] && items.length < WANT) { items.push(list[round]); added = true; }
    }
    if (!added) break;
  }
  items.sort((a, b) => b.date.getTime() - a.date.getTime());

  if (items.length < 3) return null; // too thin to be worth a section

  return (
    <section className="py-14 sm:py-16 bg-surface border-y border-line">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <span className="section-label mb-2">Market wire</span>
            <h2 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-ink">
              What&apos;s moving in the trade
            </h2>
          </div>
          <div className="flex items-center gap-2 text-ink-subtle text-xs">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-lime" />
            </span>
            Live · last 24 hours
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {items.map((it) => (
            <li key={it.link} className="bg-white">
              <a
                href={it.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex flex-col gap-2 h-full px-5 py-4 hover:bg-ink-pale transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-lime-text bg-lime-tint px-2 py-0.5 rounded">
                    {it.tag}
                  </span>
                  <span className="text-[10px] font-mono text-ink-subtle tabular-nums">{ago(it.date)}</span>
                </div>
                <p className="text-ink text-sm font-semibold leading-snug group-hover:text-lime-text transition-colors">
                  {it.title}
                </p>
                <div className="mt-auto flex items-center gap-1.5 text-[11px] text-ink-subtle">
                  <Icon name="ArrowRight" className="w-3 h-3 -rotate-45 flex-shrink-0" />
                  {it.source}
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-ink-subtle text-[11px] mt-3">
          Headlines aggregated from Google News. Each links to the original publisher; Jaydev Group is not the source.
        </p>
      </div>
    </section>
  );
}
