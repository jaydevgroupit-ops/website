import Link from 'next/link';
import { LogoLockup } from './brand/Logo';
import { Icon } from './Icon';

const WaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const productLinks = [
  { label: 'Caustic Soda', href: '/products/caustic-soda' },
  { label: 'Sulphuric Acid', href: '/products/sulphuric-acid' },
  { label: 'PAC Coagulant', href: '/products/pac' },
  { label: 'SMBS', href: '/products/smbs' },
  { label: 'Hydrogen Peroxide', href: '/products/hydrogen-peroxide' },
];

const companyLinks = [
  { label: 'The Group', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Export Markets', href: '/markets' },
  { label: 'Insights', href: '/articles' },
  { label: 'FAQ & Documentation', href: '/faq' },
];

type Line = { phone: string; note?: string };

/** One contact desk: label, email, and one or more numbers. */
function Desk({ title, email, phones }: { title: string; email: string; phones: Line[] }) {
  return (
    <div>
      <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">{title}</div>
      <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/70 text-sm hover:text-gold-light transition-colors">
        <Icon name="Mail" className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {email}
      </a>
      {phones.map((l) => (
        <a
          key={l.phone}
          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/70 text-sm hover:text-green-400 transition-colors mt-1"
        >
          <WaIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" /> {l.phone}
          {l.note && <span className="text-white/35">{l.note}</span>}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-navy-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">

          {/* Brand + contact */}
          <div className="md:col-span-2 lg:col-span-5">
            <LogoLockup dark className="h-11 mb-4" />
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-sm">
              Two arms, one group. <strong className="text-white/75 font-semibold">Jaydev Multicomm Pvt. Ltd.</strong> exports
              and imports; <strong className="text-white/75 font-semibold">Jaydev Pharma &amp; Intermediates LLP</strong> supplies across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <Desk
                title="Export"
                email="exports@jaydevgroup.co.in"
                phones={[{ phone: '+91 99875 39258' }, { phone: '+91 90997 96811' }]}
              />
              <Desk
                title="Sales &amp; Domestic"
                email="sales@jaydevgroup.co.in"
                phones={[
                  { phone: '+91 98251 12687', note: '(Ahmedabad)' },
                  { phone: '+91 99784 79258', note: '(Rajkot)' },
                ]}
              />
            </div>

            <div className="flex items-start gap-2 text-white/45 text-xs leading-relaxed max-w-sm">
              <Icon name="MapPin" className="w-3.5 h-3.5 mt-0.5 text-gold/70 flex-shrink-0" />
              <span>B-408 Ratnakar Nine Square, opp ITC Narmada, near Keshavbaug Cross Road, Vastrapur, Ahmedabad, Gujarat – 380015</span>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-jakarta font-semibold text-xs uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-white/55 text-sm hover:text-gold-light transition-colors">{p.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-gold-light text-sm font-medium hover:text-gold transition-colors">
                  All products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-jakarta font-semibold text-xs uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-white/55 text-sm hover:text-gold-light transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-white font-jakarta font-semibold text-xs uppercase tracking-wider mb-4">Request a Quote</h3>
            <div className="bg-white/[0.06] rounded-xl border border-white/10 p-4">
              <p className="text-white/55 text-xs leading-relaxed mb-3">
                Product, quantity &amp; destination - we reply within 48 hours.
              </p>
              <Link href="/quote" className="btn-gold text-xs w-full justify-center mb-2">Get a Quote</Link>
              <a
                href="/Jaydev-Multicomm-Catalogue.pdf"
                download
                className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/15 text-white/75 text-xs font-medium hover:bg-white/15 transition-all"
              >
                <Icon name="Download" className="w-3.5 h-3.5" /> Catalogue
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="section-divider my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['GACL Authorized Partner', 'Grasim Authorized Partner', 'IEC Registered'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-light text-xs font-medium">
                <Icon name="BadgeCheck" className="w-3.5 h-3.5" /> {badge}
              </span>
            ))}
          </div>
          <p className="text-white/35 text-xs text-center md:text-right">
            © {new Date().getFullYear()} Jaydev Group · Ahmedabad, Gujarat, India
          </p>
        </div>
      </div>
    </footer>
  );
}
