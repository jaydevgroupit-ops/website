import Link from 'next/link';
import { LogoLockup } from './brand/Logo';
import { Icon } from './Icon';
import { BRANCHES, CERTIFICATIONS } from '@/lib/content';

const WaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const companyLinks = [
  { label: 'The Group', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Markets & Insights', href: '/markets' },
  { label: 'FAQ & Documentation', href: '/faq' },
];

type Line = { phone: string; note?: string };

/** One contact desk: label, email, and one or more numbers. */
function Desk({ title, email, phones }: { title: string; email: string; phones: Line[] }) {
  return (
    <div>
      <div className="text-ink-soft text-[11px] uppercase tracking-wider mb-1.5">{title}</div>
      <a href={`mailto:${email}`} className="flex items-center gap-2 text-ink-muted text-sm hover:text-lime-text transition-colors">
        <Icon name="Mail" className="w-3.5 h-3.5 text-lime-text flex-shrink-0" /> {email}
      </a>
      {phones.map((l) => (
        <a
          key={l.phone}
          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-ink-muted text-sm hover:text-[#25D366] transition-colors mt-1"
        >
          <WaIcon className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" /> {l.phone}
          {l.note && <span className="text-ink-soft">{l.note}</span>}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">

          {/* brand */}
          <div className="lg:col-span-4">
            <LogoLockup className="h-9 mb-3" />
            <p className="text-ink-soft text-[13px] leading-relaxed max-w-xs">
              Industrial chemicals and pharmaceutical APIs from Ahmedabad - across India and to 30+ export markets.
            </p>
            <p className="text-ink-subtle text-[11px] leading-relaxed mt-3 max-w-xs">
              B-408 Ratnakar Nine Square, Keshavbaug Cross Road, Vastrapur, Ahmedabad, Gujarat - 380015
            </p>
          </div>

          {/* desks - two columns of contact, tightened */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Export', email: 'exports@jaydevgroup.co.in', phones: ['+91 99875 39258', '+91 90997 96811'] },
              { title: 'Sales & domestic', email: 'sales@jaydevgroup.co.in', phones: ['+91 98251 12687', '+91 99784 79258'] },
            ].map((d) => (
              <div key={d.title}>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">{d.title}</h3>
                <a href={`mailto:${d.email}`} className="block text-[13px] text-ink font-medium hover:text-lime-text transition-colors break-all">
                  {d.email}
                </a>
                <ul className="mt-1.5 space-y-0.5">
                  {d.phones.map((ph) => (
                    <li key={ph}>
                      <a href={`tel:${ph.replace(/\s/g, '')}`} className="text-[13px] text-ink-soft hover:text-ink transition-colors tabular-nums">
                        {ph}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* links + actions */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">Company</h3>
            <ul className="space-y-1.5 mb-5">
              {companyLinks.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[13px] text-ink-soft hover:text-lime-text transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <Link href="/quote" className="btn-lime text-xs">Request a quote</Link>
              <a
                href="/Jaydev-Multicomm-Catalogue.pdf"
                download
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[14px] bg-white border border-line text-ink text-xs font-semibold hover:border-lime/45 transition-colors"
              >
                <Icon name="Download" className="w-3.5 h-3.5" /> Catalogue
              </a>
            </div>
          </div>
        </div>

        {/* one hairline row for the credentials, not two stacked blocks */}
        <div className="mt-8 pt-6 border-t border-line flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
          <div className="lg:w-[38%]">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">Offices</h3>
            <div className="flex flex-wrap gap-1.5">
              {BRANCHES.map((b) => (
                <span key={b.city} className={`inline-flex items-baseline gap-1 text-[11px] px-2.5 py-1 rounded-full border ${b.hq ? 'border-lime/45 bg-lime-tint' : 'border-line bg-white'}`}>
                  <span className="font-semibold text-ink">{b.city}</span>
                  <span className="text-ink-subtle">{b.country}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink-subtle mb-2">Accreditation</h3>
            <div className="flex flex-wrap gap-1.5">
              {[...CERTIFICATIONS.map((c) => c.code), 'GACL Authorized', 'Grasim Authorized'].map((code) => (
                <span key={code} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-gold-bg border border-gold/30 text-gold-dark font-medium">
                  <Icon name="BadgeCheck" className="w-3 h-3 flex-shrink-0" />
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 pt-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-ink-subtle text-[11px]">© {new Date().getFullYear()} Jaydev Group · Ahmedabad, Gujarat, India</p>
          <p className="text-ink-subtle text-[11px]">Jaydev Multicomm Pvt. Ltd. · Jaydev Pharma &amp; Intermediates LLP</p>
        </div>
      </div>
    </footer>
  );
}
