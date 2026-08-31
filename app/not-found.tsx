import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center text-ink md:px-8">
      <div className="rounded-[2rem] border border-line bg-white p-10 shadow-card">
        <span className="section-label">Page not found</span>
        <h1 className="mt-4 font-jakarta text-4xl font-black sm:text-5xl">We couldn&apos;t find that page.</h1>
        <p className="mt-4 text-base leading-8 text-ink-muted">The page you are looking for may have moved, or the link may be broken. Use the navigation below to continue exploring our chemical export services.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-lime">Home</Link>
          <Link href="/quote" className="rounded-[14px] border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink-pale hover:border-lime/40">Request Quote</Link>
        </div>
      </div>
    </main>
  );
}
