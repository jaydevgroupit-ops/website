import Link from 'next/link';
import { LogoLockup } from './brand/Logo';
import { Icon } from './Icon';
import { BRANCHES, CERTIFICATIONS } from '@/lib/content';

const companyLinks = [
  { label: 'The Group', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Markets & Insights', href: '/markets' },
  { label: 'FAQ & Documentation', href: '/faq' },
];

const desks = [
  { title: 'Export', email: 'exports@jaydevgroup.co.in', phones: ['+91 99875 39258', '+91 90997 96811'] },
  { title: 'Sales & domestic', email: 'sales@jaydevgroup.co.in', phones: ['+91 98251 12687', '+91 99784 79258'] },
];

function CompanyDetails() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">Offices</h3>
        <p className="text-ink-soft text-xs leading-relaxed mb-2 max-w-sm">
          B-408 Ratnakar Nine Square, Keshavbaug Cross Road, Vastrapur, Ahmedabad, Gujarat - 380015
        </p>
        <p className="text-xs text-ink-soft leading-relaxed">
          {BRANCHES.map((b) => `${b.city}, ${b.country}`).join(' · ')}
        </p>
      </div>
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">Accreditation</h3>
        <div className="flex flex-wrap gap-1.5">
          {[...CERTIFICATIONS.map((c) => c.code), 'GACL Authorized', 'Grasim Authorized'].map((code) => (
            <span key={code} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-gold-bg border border-gold/30 text-gold-dark font-medium">
              <Icon name="BadgeCheck" className="w-3 h-3 flex-shrink-0" />{code}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5">
          <div className="lg:col-span-4">
            <LogoLockup className="h-7 lg:h-9 mb-2" />
            <p className="text-ink-soft text-xs lg:text-[13px] leading-relaxed max-w-sm">
              Industrial chemicals and pharmaceutical APIs from Ahmedabad - across India and to 30+ export markets.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 lg:gap-6">
            {desks.map((d) => (
              <div key={d.title} className="min-w-0">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-1">{d.title}</h3>
                <a href={`mailto:${d.email}`} className="block text-xs lg:text-[13px] text-ink font-medium hover:text-lime-text break-words min-h-0">
                  <span className="block sm:inline">{d.email.split('@')[0]}@</span><span>{d.email.split('@')[1]}</span>
                </a>
                <ul className="mt-2">
                  {d.phones.map((ph) => (
                    <li key={ph}>
                      <a href={`tel:${ph.replace(/\s/g, '')}`} className="inline-flex items-center min-h-6 text-xs lg:text-[13px] text-ink-soft hover:text-ink tabular-nums whitespace-nowrap">{ph}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <h3 className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">Company</h3>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-3 lg:grid-cols-1">
              {companyLinks.map((c) => (
                <Link key={c.href} href={c.href} className="inline-flex items-center min-h-6 text-xs lg:text-[13px] text-ink-soft hover:text-lime-text">{c.label}</Link>
              ))}
            </nav>
            <Link href="/quote" className="btn-lime text-xs mt-3 w-full lg:w-auto">Request a quote</Link>
          </div>
        </div>

        <details className="lg:hidden mt-4 border-y border-line group">
          <summary className="flex min-h-12 items-center justify-between cursor-pointer list-none text-xs font-semibold text-ink [&::-webkit-details-marker]:hidden">
            Offices &amp; accreditation
            <Icon name="ChevronDown" className="w-4 h-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pb-4"><CompanyDetails /></div>
        </details>
        <div className="hidden lg:block mt-6 pt-5 border-t border-line"><CompanyDetails /></div>

        <div className="mt-3 lg:mt-6 lg:pt-4 lg:border-t border-line flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5">
          <p className="text-ink-subtle text-[10px] lg:text-[11px]">© {new Date().getFullYear()} Jaydev Group · Ahmedabad, Gujarat, India</p>
          <p className="text-ink-subtle text-[10px] lg:text-[11px] leading-relaxed">Jaydev Multicomm Pvt. Ltd. · Jaydev Pharma &amp; Intermediates LLP</p>
        </div>
      </div>
    </footer>
  );
}
