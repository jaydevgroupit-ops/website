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
 * `revalidate` is 15 minutes (see below), so the wire refreshes on its own. No
 * cron is needed - the first request after the window rebuilds it.
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

  // The freshest story leads; the rest print as a scan-list beside it.
  const [lead, ...rest] = items;

  return (
    <section className="on-ink relative overflow-hidden bg-ink-deep">
      {/* ── ground ── panel gradient, then the PALE glow: near-black has no base
           colour to dilute a saturated overlay, so a lime one would stain the
           whole band rather than lift it. ── */}
      <span aria-hidden="true" className="absolute inset-0 pointer-events-none bg-grad-ink-panel" />
      <span aria-hidden="true" className="absolute inset-0 pointer-events-none bg-glow-md" />
      {/* lime hairline seals the band against the light hero above it */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px pointer-events-none bg-grad-rule" />

      {/* ── the wire, literally ── every headline we hold, running edge to edge.
           Two identical copies so the -50% loop closes seamlessly; the spacing
           rides on each item rather than a flex gap, or the seam drifts by one
           gap on every pass. ── */}
      <div className="relative marquee-mask border-b border-white/[0.07] bg-white/[0.02] py-2.5">
        <div className="flex w-max animate-jd-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex flex-shrink-0" aria-hidden={copy === 1}>
              {items.map((it) => (
                <span key={it.link} className="flex items-center gap-2.5 pr-9 whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime-light">
                    {it.tag}
                  </span>
                  <span className="text-[11px] text-white/50">{it.title}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-9">
          <div>
            <span className="section-label mb-3">Market wire</span>
            <h2 className="font-jakarta text-3xl sm:text-[2.5rem] font-extrabold text-white leading-[1.08]">
              What&apos;s moving in the trade
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-60 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-lime" />
            </span>
            Live · last 24 hours
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ── lead ── the one story given room to be read across the room ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
          <a
            href={lead.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-7 transition-colors hover:border-lime/40 hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-deep bg-lime px-2 py-0.5 rounded">
                {lead.tag}
              </span>
              <span className="font-mono text-[10px] text-white/50 tabular-nums">{ago(lead.date)}</span>
            </div>
            <h3 className="font-jakarta text-xl sm:text-2xl font-extrabold text-white leading-snug mt-4 transition-colors group-hover:text-lime-light">
              {lead.title}
            </h3>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/55">
              <Icon
                name="ArrowRight"
                className="w-3.5 h-3.5 -rotate-45 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              {lead.source}
            </div>
          </a>

          {/* Names the six streams behind the wire. It earns the column under the
              lead, and answers the fair question of why this is a trade wire and
              not a general news feed. */}
          <div className="hidden lg:block rounded-2xl border border-white/[0.08] px-6 py-5">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
              What the wire watches
            </span>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FEEDS.map((f) => (
                <li
                  key={f.tag}
                  className="rounded-full border border-lime/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-lime-light"
                >
                  {f.tag}
                </li>
              ))}
            </ul>
          </div>
          </div>

          {/* ── the rest ── hairline rows, no boxes: a wire prints, it doesn't card ── */}
          <ul className="lg:col-span-7 flex flex-col border-t border-white/[0.08]">
            {rest.map((it) => (
              <li key={it.link} className="border-b border-white/[0.08]">
                <a
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group flex items-start gap-4 py-4"
                >
                  <span className="hidden sm:block w-[104px] flex-shrink-0 pt-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-lime-light">
                    {it.tag}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm sm:text-[15px] font-semibold text-white/85 leading-snug transition-colors group-hover:text-lime-light">
                      {it.title}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-white/55">
                      <span className="sm:hidden font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-lime-light">
                        {it.tag}
                      </span>
                      <span className="sm:hidden w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                      {it.source}
                      <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                      <span className="tabular-nums">{ago(it.date)}</span>
                    </span>
                  </span>
                  <Icon
                    name="ArrowRight"
                    className="w-3.5 h-3.5 mt-1 flex-shrink-0 -rotate-45 text-white/30 transition-all group-hover:text-lime-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/50 text-[11px] mt-8">
          Headlines aggregated from Google News. Each links to the original publisher; Jaydev Group is not the source.
        </p>
      </div>
    </section>
  );
}
