'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, featuredImage } from '@/lib/content';

const featured = products.filter((p) => p.featured).slice(0, 6);

/**
 * Featured-products strip. Real native horizontal scroll container so it can be
 * swiped/dragged on touch, PLUS a gentle rAF auto-advance that pauses while the
 * user interacts and resumes after they let go. Duplicated cards make the
 * auto-advance loop seamless. Respects reduced-motion. Editorial `featuredImage()`.
 */
export default function FeaturedCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const row = [...featured, ...featured];

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    let raf = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    const half = () => el.scrollWidth / 2;

    const tick = () => {
      if (!paused && !reduce && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= half()) el.scrollLeft -= half();
      }
      raf = requestAnimationFrame(tick);
    };

    const pause = () => { paused = true; if (resumeTimer) clearTimeout(resumeTimer); };
    const resumeSoon = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        // normalise back into the first copy so the loop stays seamless
        if (el.scrollLeft >= half()) el.scrollLeft -= half();
        else if (el.scrollLeft < 0) el.scrollLeft += half();
        paused = false;
      }, 1400);
    };
    // keep a user-driven scroll within the loopable range
    const onScroll = () => {
      if (!paused) return;
      if (el.scrollLeft <= 0) el.scrollLeft += half();
      else if (el.scrollLeft >= half() * 2 - 1) el.scrollLeft -= half();
    };

    el.addEventListener('pointerdown', pause);
    el.addEventListener('pointerup', resumeSoon);
    el.addEventListener('pointercancel', resumeSoon);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeSoon, { passive: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resumeSoon);
    el.addEventListener('wheel', () => { pause(); resumeSoon(); }, { passive: true });
    el.addEventListener('scroll', onScroll, { passive: true });

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('pointerup', resumeSoon);
      el.removeEventListener('pointercancel', resumeSoon);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeSoon);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resumeSoon);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="marquee-mask">
      <div
        ref={scroller}
        className="flex overflow-x-auto no-scrollbar overscroll-x-contain px-4 sm:px-6 lg:px-8 pb-1"
      >
        {row.map((p, i) => (
          <article
            key={`${p.id}-${i}`}
            aria-hidden={i >= featured.length}
            className="group mr-5 w-[260px] sm:w-[300px] flex-shrink-0 flex flex-col bg-white rounded-2xl border border-line-soft overflow-hidden shadow-sm hover:shadow-[0_18px_46px_-18px_rgba(0,0,0,0.22)] hover:border-lime/40 transition-all"
          >
            <Link href={`/products/${p.id}`} className="block relative h-40 sm:h-44 bg-ink-pale overflow-hidden">
              <Image
                src={featuredImage(p)}
                alt={p.name}
                fill
                sizes="300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                draggable={false}
              />
              <span className="absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-full bg-white/90 text-ink font-medium capitalize shadow-sm backdrop-blur">
                {p.category.replace(/-/g, ' ')}
              </span>
            </Link>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-jakarta font-bold text-ink text-base leading-snug line-clamp-2">{p.name}</h3>
                <span className="text-[10px] text-ink-subtle font-mono flex-shrink-0 mt-0.5">CAS {p.cas}</span>
              </div>
              <p className="text-lime-text text-xs font-semibold mb-4 line-clamp-1">{p.grade}</p>
              <div className="flex-1" />
              <div className="flex items-stretch gap-2 mt-auto">
                <Link href={`/products/${p.id}`} className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-ink-mid transition-all whitespace-nowrap">
                  Specifications
                </Link>
                <Link href={`/quote?product=${p.id}`} className="flex-1 inline-flex items-center justify-center whitespace-nowrap px-3 py-2 rounded-lg border border-lime/50 text-lime-text text-xs font-semibold hover:bg-lime-tint transition-all">
                  Get quote
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
