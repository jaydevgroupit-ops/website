'use client';

import Link from 'next/link';
import { Icon } from '../Icon';
import { useEnquiry } from './EnquiryContext';

/**
 * The basket bar. Global, so it follows the selection across pages.
 * Sits above the mobile tab bar (`bottom-24`) rather than under it.
 */
export default function EnquiryBar() {
  const { ids, clear, ready } = useEnquiry();
  if (!ready || ids.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-24 lg:bottom-4 z-[55] px-3 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl mx-auto rounded-2xl border-2 border-ink bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] px-4 py-3 flex items-center gap-3">
        <span className="inline-grid place-items-center w-9 h-9 rounded-xl bg-lime text-ink font-jakarta font-extrabold text-sm tabular-nums flex-shrink-0">
          {ids.length}
        </span>
        <div className="min-w-0 flex-1 pr-2">
          <p className="font-jakarta font-bold text-ink text-sm leading-tight whitespace-nowrap">
            <span className="hidden sm:inline">{ids.length} {ids.length === 1 ? 'product' : 'products'} in your enquiry</span>
            <span className="sm:hidden">In your enquiry</span>
          </p>
          <p className="text-ink-subtle text-xs truncate hidden sm:block">One quote, one reply - within 24 hours.</p>
        </div>
        <button type="button" onClick={clear} className="text-ink-subtle hover:text-ink text-xs font-semibold px-2 flex-shrink-0 border-l border-line ml-1">
          Clear
        </button>
        <Link href={`/quote?products=${ids.join(',')}`} className="btn-lime text-sm flex-shrink-0">
          <span className="hidden sm:inline">Request quote</span>
          <span className="sm:hidden">Quote</span>
          <Icon name="ArrowRight" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
