'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { COMPANY, GROUP, BUSINESS_UNITS, BRANCHES } from '@/lib/content';

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Hero */}
      <div className="bg-surface py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(238,246,236,0.11),rgba(238,246,236,0.04)_35%,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <span className="section-label mb-3">The Group</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-ink mb-4">{GROUP.name}</h1>
          <p className="text-ink-soft max-w-2xl mx-auto text-lg">Two companies, one trade desk, since {GROUP.established}.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* Story + Founder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-white p-8">
            <h2 className="font-jakarta text-2xl font-extrabold text-ink mb-5">Our Story</h2>
            <div className="space-y-4 text-ink-muted leading-relaxed">
              <p>{GROUP.description}</p>
              <p>
                The group trades through two companies. <strong className="text-ink">Jaydev Multicomm Pvt. Ltd.</strong> handles export and import; <strong className="text-ink">Jaydev Pharma &amp; Intermediates LLP</strong> serves the domestic market. Both draw on the same producer relationships - <strong className="text-ink">GACL</strong>, <strong className="text-ink">Grasim</strong>, Reliance, IOCL, Tata Chemicals and DCM Shriram among them - and both are authorized channel partners for GACL and Grasim.
              </p>
              <p>
                That footprint is deliberate. The head office in Ahmedabad and the trade desk in Rajkot sit inside Gujarat&apos;s chemical belt, within a day of the plants we buy from and the ports we ship through - Mundra, JNPT, Hazira and Kandla. Offices in Mumbai and Lagos keep us close to the buyers at the other end of the trade.
              </p>
            </div>
          </div>
          {/* Founder card */}
          <div className="card-white p-8 flex flex-col items-center text-center justify-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-lime/30 mb-4">
              <Image src={GROUP.founderImage} alt={GROUP.founder} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
            </div>
            <h3 className="font-jakarta font-bold text-ink text-lg">{GROUP.founder}</h3>
            <p className="text-lime-text font-semibold text-sm mb-3">{GROUP.founderTitle}</p>
            <p className="text-ink-soft text-sm leading-relaxed mb-4">Founder of Jaydev Group.</p>
            <a
              href="https://www.linkedin.com/in/jitesh-vajir-2471993b6/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-[#0A66C2] transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Founder's Message */}
        <div className="on-ink relative bg-ink rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(238,246,236,0.115),rgba(238,246,236,0.04)_35%,transparent_55%)]" />
          <div className="relative">
            <span className="section-label mb-4">Founder&apos;s Message</span>
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-lime-light/40 mb-4" fill="currentColor"><path d="M9.5 7A4.5 4.5 0 005 11.5V17h5.5v-5.5H7.5A2 2 0 019.5 9.5V7zm9 0A4.5 4.5 0 0014 11.5V17h5.5v-5.5h-3A2 2 0 0118.5 9.5V7z"/></svg>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed font-jakarta max-w-3xl">
              &ldquo;Most chemical buyers have been let down once - a wrong grade, a missing document, a shipment that slipped. I built Jaydev so that doesn&apos;t happen on our watch. Every order is matched to the right manufacturer, ships with complete documentation, and is tracked to your port. That accountability is the whole company.&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-7">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-lime/40 flex-shrink-0">
                <Image src={GROUP.founderImage} alt={GROUP.founder} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
              </div>
              <div>
                <div className="text-white font-jakarta font-bold">{GROUP.founder}</div>
                <div className="text-lime-light text-sm">{GROUP.founderTitle}, Jaydev Group</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Units */}
        <div>
          <h2 className="font-jakarta text-2xl font-extrabold text-ink mb-6">Business Units</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BUSINESS_UNITS.map((bu, i) => (
              <motion.div
                key={bu.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-white p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-ink flex items-center justify-center">
                    <Icon name={bu.icon} className="w-7 h-7 text-lime-light" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-lime-text">{bu.scope}</div>
                    <h3 className="font-jakarta font-extrabold text-ink text-lg">{bu.name}</h3>
                  </div>
                </div>
                <p className="text-ink-muted leading-relaxed mb-4">{bu.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {bu.highlights.map(h => (
                    <span key={h} className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                      <Icon name="Check" className="w-4 h-4 text-lime-text flex-shrink-0" /> {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Import Portfolio moved to the Products page (Export / Import toggle) */}
        <div className="card-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Anchor" className="w-6 h-6 text-lime-text flex-shrink-0" />
            <p className="text-ink-muted text-sm">
              <strong className="text-ink">We also import into India</strong> - Zircon Sand, Lauric &amp; Decanoic Acid for domestic processors.
            </p>
          </div>
          <Link href="/products" className="btn-ink px-6 py-2.5 text-sm flex-shrink-0">
            View Imports <Icon name="ArrowRight" className="w-4 h-4" />
          </Link>
        </div>

        {/* Team */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <h2 className="font-jakarta text-2xl font-extrabold text-ink">Leadership &amp; Team</h2>
            <p className="text-ink-subtle text-sm">Reach any desk directly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMPANY.team.map((member) => {
              const initials = member.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
              const social = 'w-8 h-8 rounded-lg bg-ink-pale border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-lime/45 transition-colors';
              return (
                <article
                  key={member.name}
                  className="group flex items-start gap-3.5 rounded-2xl bg-white border border-line p-4 transition-colors hover:border-lime/40"
                >
                  {member.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-lime/35 flex-shrink-0">
                      <Image src={member.image} alt={member.name} fill sizes="48px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-lime-tint border border-lime/35 flex-shrink-0 grid place-items-center font-jakarta font-extrabold text-lime-text text-sm">
                      {initials}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-jakarta font-extrabold text-ink text-sm leading-tight">{member.name}</h3>
                    <p className="text-lime-text font-semibold text-xs mt-0.5">{member.role}</p>
                    <p className="text-ink-soft text-xs leading-relaxed mt-1.5">{member.remit}</p>

                    {(member.linkedin || member.email || member.whatsapp) && (
                      <div className="flex items-center gap-1.5 mt-3">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className={social}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`} className={social}>
                            <Icon name="Mail" className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.whatsapp && (
                          <a
                            href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${member.name.split(' ')[0]}, I have an enquiry.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${member.name}`}
                            className={social}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#25D366]">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Presence */}
        <div>
          <h2 className="font-jakarta text-2xl font-extrabold text-ink mb-6">Our Presence</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANCHES.map(b => (
              <div key={b.city} className={`card-white p-5 ${b.hq ? 'border-2 border-lime/40' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MapPin" className="w-4 h-4 text-lime-text" />
                  <span className="font-jakarta font-bold text-ink">{b.city}</span>
                  {b.hq && <span className="text-[10px] bg-lime-text text-white px-2 py-0.5 rounded-full font-semibold">HQ</span>}
                </div>
                <div className="text-ink-subtle text-xs mb-1">{b.country}</div>
                <div className="text-ink-muted text-sm">{b.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Network - continuous marquee */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 sm:gap-4 mb-5">
            <h2 className="font-jakarta text-2xl font-extrabold text-ink">Manufacturer Network</h2>
            <span className="text-ink-subtle text-sm">{COMPANY.manufacturers.length} producers - we buy direct</span>
          </div>

          <div className="marquee-mask overflow-hidden py-1">
            <div className="flex w-max gap-4 animate-jd-marquee hover:[animation-play-state:paused]">
              {[...COMPANY.manufacturers, ...COMPANY.manufacturers].map((m, i) => (
                <div
                  key={`${m.name}-${i}`}
                  aria-hidden={i >= COMPANY.manufacturers.length}
                  className={`w-[15rem] flex-shrink-0 rounded-2xl border p-5 ${
                    m.badge ? 'bg-gold-bg border-gold/35' : 'bg-white border-line-soft'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-jakarta font-extrabold text-lg leading-none text-ink">
                      {m.name}
                    </span>
                    {m.badge && (
                      <Icon name="BadgeCheck" className="w-4 h-4 text-gold-dark flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-ink-soft text-xs leading-snug line-clamp-2 mb-2 min-h-[2rem]">{m.full}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${m.badge ? 'text-ink-muted' : 'text-ink-subtle'}`}>
                    {m.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="on-ink bg-ink rounded-2xl p-10 text-center">
          <h3 className="font-jakarta text-2xl font-extrabold text-white mb-3">Partner With Jaydev</h3>
          <p className="text-white/60 mb-6">We reply within 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-lime px-8 py-3">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a href="https://wa.me/919099796811" target="_blank" rel="noopener noreferrer" className="btn-ghost-white px-8 py-3">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
