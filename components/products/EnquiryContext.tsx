'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

/**
 * The enquiry basket, shared across the whole site.
 *
 * It used to be local state on the catalogue page, so a selection vanished the
 * moment you opened a product's detail page. It now lives in context and
 * persists to localStorage, which is what makes "add to enquiry" mean the same
 * thing everywhere it appears.
 */

type Ctx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
  ready: boolean;
};

const EnquiryCtx = createContext<Ctx | null>(null);
const KEY = 'jaydev.enquiry';

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  // `ready` gates the bar so the server-rendered markup and the first client
  // paint agree - reading localStorage during render would be a hydration bug.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* private mode, blocked storage - an empty basket is a fine fallback */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* ignore */ }
  }, [ids, ready]);

  const toggle = useCallback((id: string) => {
    setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }, []);
  const clear = useCallback(() => setIds([]), []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const value = useMemo(() => ({ ids, has, toggle, clear, ready }), [ids, has, toggle, clear, ready]);
  return <EnquiryCtx.Provider value={value}>{children}</EnquiryCtx.Provider>;
}

export function useEnquiry() {
  const c = useContext(EnquiryCtx);
  if (!c) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return c;
}
