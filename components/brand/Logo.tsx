import Link from 'next/link';
import Image from 'next/image';

/**
 * Official Jaydev Group logo lockup (wordmark + lime mark).
 * Master artwork: brand-source/JAYDEV GROUP LOGO.jpg (not served); the PNGs
 * in public/brand are keyed-to-transparent derivatives of it.
 * Use the `light` variant on ink/dark surfaces - the default lockup's
 * wordmark is black and disappears against them.
 */

/** Full lockup. Set `dark` when placing on a dark background. */
export function LogoLockup({ dark = false, className = 'h-10' }: { dark?: boolean; className?: string }) {
  return (
    <span className={`relative block ${className}`} style={{ aspectRatio: '1258 / 578' }}>
      <Image
        src={dark ? '/brand/jaydev-group-logo-light.png' : '/brand/jaydev-group-logo.png'}
        alt="Jaydev Group"
        fill
        sizes="200px"
        className="object-contain object-left"
        priority
      />
    </span>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center group" aria-label="Jaydev Group - home">
      <LogoLockup dark={dark} className="h-10 sm:h-12 transition-transform group-hover:scale-[1.03]" />
    </Link>
  );
}
