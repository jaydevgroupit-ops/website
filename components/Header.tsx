'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/content';
import { Logo } from './brand/Logo';
import { Icon } from './Icon';

const DownloadIcon = () => <Icon name="Download" className="w-4 h-4" />;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md border-b border-[#E5E7EB]'
          : 'bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]'
      }`}
    >
      {/* Top utility bar - collapses on scroll */}
      <div
        className={`bg-navy text-white/80 overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
          <a
            href="https://maps.google.com/?q=B-408+Ratnakar+Nine+Square+Keshavbaug+Cross+Road+Ahmedabad+380015"
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 hover:text-gold-light transition-colors"
          >
            <Icon name="MapPin" className="w-3.5 h-3.5 text-gold" />
            B-408 Ratnakar Nine Square, Keshavbaug Cross Road, Ahmedabad – 380015
          </a>
          <div className="flex items-center gap-4 ml-auto">
            <a href="mailto:sales@jaydevgroup.co.in" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Icon name="Mail" className="w-3.5 h-3.5 text-gold" />
              <span className="hidden sm:inline">sales@jaydevgroup.co.in</span>
            </a>
            <a href="https://wa.me/919099796811" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <WaIcon />
              <span className="hidden sm:inline">+91 90997 96811</span>
            </a>
            <a href="https://www.linkedin.com/company/jaydev-multicomm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#0A66C2] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              if (link.href === '/quote') return null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? 'text-navy' : 'text-gray-600 hover:text-navy hover:bg-navy-pale'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="/Jaydev-Multicomm-Catalogue.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-navy border border-[#E5E7EB] text-sm font-medium hover:border-gold hover:text-gold hover:bg-gold-bg transition-all"
            >
              <DownloadIcon />
              Catalogue
            </a>
            <a
              href="https://wa.me/919099796811"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-green-700 bg-green-50 border border-green-200 text-sm font-medium hover:bg-green-100 transition-all"
            >
              <WaIcon />
              WhatsApp
            </a>
            <Link href="/quote" className="btn-gold text-sm">Get Quote</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-navy rounded-lg hover:bg-navy-pale transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#E5E7EB] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-navy bg-navy-pale font-semibold' : 'text-gray-700 hover:text-navy hover:bg-navy-pale'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="/Jaydev-Multicomm-Catalogue.pdf"
                download
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-navy text-sm font-medium"
              >
                <DownloadIcon /> Download Catalogue
              </a>
              <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex gap-3">
                <a
                  href="https://wa.me/919099796811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium"
                >
                  <WaIcon />
                  WhatsApp
                </a>
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 btn-gold text-sm justify-center"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
