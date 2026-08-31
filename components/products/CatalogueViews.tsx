'use client';

import Link from 'next/link';
import { Icon } from '../Icon';
import type { Row } from './types';

/* ── shared bits ─────────────────────────────────────────────────────────── */

function Flag({ flag }: { flag?: Row['flag'] }) {
  if (!flag) return null;
  return (
    <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider text-lime-text bg-lime-tint border border-lime/30 rounded px-1.5 py-0.5">
      {flag}
    </span>
  );
}

function Tick({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={`Add ${label} to enquiry`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
      className={`flex-shrink-0 w-5 h-5 rounded-[6px] border grid place-items-center transition-colors ${
        on ? 'bg-lime border-lime text-ink' : 'bg-white border-line hover:border-lime/50 text-transparent'
      }`}
    >
      <Icon name="Check" className="w-3 h-3" strokeWidth={3} />
    </button>
  );
}

/* ── grid ────────────────────────────────────────────────────────────────── */

export function CatalogueGrid({
  rows, selected, toggle,
}: { rows: Row[]; selected: Set<string>; toggle: (id: string) => void }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {rows.map((r) => {
        const on = selected.has(r.id);
        return (
          <li key={r.id}>
            <div
              className={`group relative h-full flex flex-col rounded-2xl border bg-white p-5 transition-all ${
                on ? 'border-lime shadow-[0_0_0_1px_#39CE22]' : 'border-line hover:border-lime/40 hover:shadow-[0_14px_36px_-20px_rgba(0,0,0,0.22)]'
              }`}
            >
              {/* formula as the watermark identity */}
              {r.formula && (
                <span aria-hidden="true" className="pointer-events-none absolute top-3 right-4 font-mono font-bold text-3xl text-ink/[0.06] group-hover:text-lime/20 transition-colors">
                  {r.formula}
                </span>
              )}

              <div className="flex items-center gap-2 mb-3 relative">
                <Tick on={on} onToggle={() => toggle(r.id)} label={r.name} />
                <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle truncate">{r.group}</span>
                {r.featured && <Icon name="Sparkles" className="w-3.5 h-3.5 text-lime-text ml-auto flex-shrink-0" />}
                <Flag flag={r.flag} />
              </div>

              <h3 className="font-jakarta font-extrabold text-ink text-lg leading-tight mb-1.5 pr-14 relative">{r.name}</h3>

              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5 mb-2 relative">
                {r.formula && <span className="font-mono text-lime-text text-sm font-bold">{r.formula}</span>}
                {r.cas && <span className="font-mono text-[11px] text-ink-subtle">CAS {r.cas}</span>}
              </div>

              {r.meta && <p className="text-ink-muted text-xs font-semibold mb-4 relative">{r.meta}</p>}

              <div className="mt-auto pt-3 border-t border-line-faint flex items-center justify-between gap-2 relative">
                {r.href ? (
                  <Link href={r.href} className="inline-flex items-center gap-1.5 font-jakarta font-bold text-ink text-sm hover:text-lime-text transition-colors">
                    Details <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-ink-subtle text-xs">Grade on enquiry</span>
                )}
                <button
                  type="button"
                  onClick={() => toggle(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    on ? 'bg-lime-tint text-lime-text border border-lime/40' : 'bg-ink text-white hover:bg-ink-mid'
                  }`}
                >
                  {on ? 'Added' : 'Add to enquiry'}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ── table ───────────────────────────────────────────────────────────────── */

export function CatalogueTable({
  rows, selected, toggle,
}: { rows: Row[]; selected: Set<string>; toggle: (id: string) => void }) {
  return (
    <div className="rounded-2xl border border-line bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead>
            <tr className="bg-surface border-b border-line">
              <th scope="col" className="w-10 py-2.5 pl-4"><span className="sr-only">Select</span></th>
              <th scope="col" className="text-left py-2.5 pr-4 text-[9.5px] font-mono font-semibold uppercase tracking-[0.13em] text-ink-subtle">Product</th>
              <th scope="col" className="text-left py-2.5 pr-4 text-[9.5px] font-mono font-semibold uppercase tracking-[0.13em] text-ink-subtle">Formula</th>
              <th scope="col" className="text-left py-2.5 pr-4 text-[9.5px] font-mono font-semibold uppercase tracking-[0.13em] text-ink-subtle">CAS</th>
              <th scope="col" className="text-left py-2.5 pr-4 text-[9.5px] font-mono font-semibold uppercase tracking-[0.13em] text-ink-subtle">Group</th>
              <th scope="col" className="text-right py-2.5 pr-4 text-[9.5px] font-mono font-semibold uppercase tracking-[0.13em] text-ink-subtle">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const on = selected.has(r.id);
              return (
                <tr key={r.id} className={`border-b border-line-faint last:border-0 transition-colors ${on ? 'bg-lime-tint/60' : 'hover:bg-ink-pale'}`}>
                  <td className="py-2.5 pl-4 align-middle"><Tick on={on} onToggle={() => toggle(r.id)} label={r.name} /></td>
                  <td className="py-2.5 pr-4 align-middle">
                    <span className="flex items-center gap-2">
                      {r.href ? (
                        <Link href={r.href} className="font-semibold text-ink hover:text-lime-text transition-colors">{r.name}</Link>
                      ) : (
                        <span className="font-semibold text-ink">{r.name}</span>
                      )}
                      <Flag flag={r.flag} />
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 align-middle font-mono text-xs text-lime-text font-bold">{r.formula ?? '-'}</td>
                  <td className="py-2.5 pr-4 align-middle font-mono text-xs text-ink-subtle tabular-nums">{r.cas ?? '-'}</td>
                  <td className="py-2.5 pr-4 align-middle text-xs text-ink-soft">{r.group}</td>
                  <td className="py-2.5 pr-4 align-middle text-right">
                    <button
                      type="button"
                      onClick={() => toggle(r.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        on ? 'bg-lime-tint text-lime-text border border-lime/40' : 'bg-ink-pale text-ink border border-line hover:border-lime/45'
                      }`}
                    >
                      {on ? 'Added' : 'Add'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
