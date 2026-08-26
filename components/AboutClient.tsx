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
      <div className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,146,42,0.14),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <span className="section-label mb-3">The Group</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">{GROUP.name}</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">{GROUP.tagline} - headquartered in {GROUP.hq}.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* Story + Founder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-white p-8">
            <h2 className="font-jakarta text-2xl font-extrabold text-navy mb-5">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{GROUP.description}</p>
              <p>
                <strong className="text-navy">Jaydev Multicomm</strong> handles export and import. <strong className="text-navy">Jaydev Pharma &amp; Intermediates LLP</strong> handles India. Both buy direct from <strong className="text-navy">GACL</strong>, <strong className="text-navy">Grasim</strong>, Reliance, DCM Shriram and others.
              </p>
              <p>
                Head office in Ahmedabad, trade desk in Rajkot. Close to India&apos;s main production clusters and the ports at Mundra, JNPT, Hazira and Kandla.
              </p>
            </div>
          </div>
          {/* Founder card */}
          <div className="card-white p-8 flex flex-col items-center text-center justify-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-gold/30 mb-4">
              <Image src={GROUP.founderImage} alt={GROUP.founder} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
            </div>
            <h3 className="font-jakarta font-bold text-navy text-lg">{GROUP.founder}</h3>
            <p className="text-gold font-semibold text-sm mb-3">{GROUP.founderTitle}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">Founder of Jaydev Group.</p>
            <a
              href="https://www.linkedin.com/in/jitesh-vajir-2471993b6/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0A66C2] transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Founder's Message */}
        <div className="relative bg-navy rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(201,146,42,0.16),transparent_55%)]" />
          <div className="relative">
            <span className="section-label mb-4">Founder&apos;s Message</span>
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-gold/40 mb-4" fill="currentColor"><path d="M9.5 7A4.5 4.5 0 005 11.5V17h5.5v-5.5H7.5A2 2 0 019.5 9.5V7zm9 0A4.5 4.5 0 0014 11.5V17h5.5v-5.5h-3A2 2 0 0118.5 9.5V7z"/></svg>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed font-jakarta max-w-3xl">
              &ldquo;Most chemical buyers have been let down once - a wrong grade, a missing document, a shipment that slipped. I built Jaydev so that doesn&apos;t happen on our watch. Every order is matched to the right manufacturer, ships with complete documentation, and is tracked to your port. That accountability is the whole company.&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-7">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/40 flex-shrink-0">
                <Image src={GROUP.founderImage} alt={GROUP.founder} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover" />
              </div>
              <div>
                <div className="text-white font-jakarta font-bold">{GROUP.founder}</div>
                <div className="text-gold-light text-sm">{GROUP.founderTitle}, Jaydev Group</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Units */}
        <div>
          <h2 className="font-jakarta text-2xl font-extrabold text-navy mb-6">Business Units</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BUSINESS_UNITS.map((bu, i) => (
              <motion.div
                key={bu.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-white p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center">
                    <Icon name={bu.icon} className="w-7 h-7 text-gold-light" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gold">{bu.scope}</div>
                    <h3 className="font-jakarta font-extrabold text-navy text-lg">{bu.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{bu.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {bu.highlights.map(h => (
                    <span key={h} className="inline-flex items-center gap-1.5 text-sm text-navy-mid">
                      <Icon name="Check" className="w-4 h-4 text-gold flex-shrink-0" /> {h}
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
            <Icon name="Anchor" className="w-6 h-6 text-gold flex-shrink-0" />
            <p className="text-navy-mid text-sm">
              <strong className="text-navy">We also import into India</strong> - Zircon Sand, Lauric &amp; Decanoic Acid for domestic processors.
            </p>
          </div>
          <Link href="/products" className="btn-navy px-6 py-2.5 text-sm flex-shrink-0">
            View Imports <Icon name="ArrowRight" className="w-4 h-4" />
          </Link>
        </div>

        {/* Team */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <h2 className="font-jakarta text-2xl font-extrabold text-navy">Leadership &amp; Team</h2>
            <p className="text-gray-400 text-sm">Reach any desk directly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMPANY.team.map((member) => {
              const initials = member.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
              return (
                <article
                  key={member.name}
                  className="group relative overflow-hidden rounded-2xl bg-navy p-7 transition-all duration-300 hover:shadow-[0_24px_60px_-24px_rgba(14,32,64,0.55)]"
                >
                  {/* gold wash that grows on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-125"
                    style={{ background: 'radial-gradient(circle, rgba(201,146,42,0.20), transparent 68%)' }}
                  />
                  {/* oversized watermark initials */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 right-4 font-jakarta font-extrabold text-[5.5rem] leading-none text-white/[0.05] select-none"
                  >
                    {initials}
                  </span>

                  <div className="relative">
                    {member.image ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold/40 mb-5">
                        <Image src={member.image} alt={member.name} fill sizes="64px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full border border-gold/40 bg-gold/10 mb-5 flex items-center justify-center font-jakarta font-extrabold text-gold-light text-lg">
                        {initials}
                      </div>
                    )}

                    <h3 className="font-jakarta font-extrabold text-white text-lg leading-tight">{member.name}</h3>
                    <p className="text-gold-light font-semibold text-sm mt-1">{member.role}</p>
                    <p className="text-white/45 text-xs leading-relaxed mt-2.5 max-w-[26ch]">{member.remit}</p>

                    {(member.linkedin || member.email || member.whatsapp) && (
                      <div className="flex items-center gap-2 mt-6 pt-5 border-t border-white/10">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/60 hover:bg-gold hover:border-gold hover:text-white transition-all"
                          >
                            <Icon name="Mail" className="w-4 h-4" />
                          </a>
                        )}
                        {member.whatsapp && (
                          <a
                            href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${member.name.split(' ')[0]}, I have an enquiry for Jaydev Group.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${member.name}`}
                            className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
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
          <h2 className="font-jakarta text-2xl font-extrabold text-navy mb-6">Our Presence</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANCHES.map(b => (
              <div key={b.city} className={`card-white p-5 ${b.hq ? 'border-2 border-gold/40' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MapPin" className="w-4 h-4 text-gold" />
                  <span className="font-jakarta font-bold text-navy">{b.city}</span>
                  {b.hq && <span className="text-[10px] bg-gold text-white px-2 py-0.5 rounded-full font-semibold">HQ</span>}
                </div>
                <div className="text-gray-400 text-xs mb-1">{b.country}</div>
                <div className="text-navy-mid text-sm">{b.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Network - continuous marquee */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 sm:gap-4 mb-5">
            <h2 className="font-jakarta text-2xl font-extrabold text-navy">Manufacturer Network</h2>
            <span className="text-gray-400 text-sm">{COMPANY.manufacturers.length} producers - we buy direct</span>
          </div>

          <div className="marquee-mask overflow-hidden py-1">
            <div className="flex w-max gap-4 animate-jd-marquee hover:[animation-play-state:paused]">
              {[...COMPANY.manufacturers, ...COMPANY.manufacturers].map((m, i) => (
                <div
                  key={`${m.name}-${i}`}
                  aria-hidden={i >= COMPANY.manufacturers.length}
                  className={`w-[15rem] flex-shrink-0 rounded-2xl border p-5 ${
                    m.badge ? 'bg-gold-bg border-gold/35' : 'bg-white border-[#EAEEF3]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`font-jakarta font-extrabold text-lg leading-none ${m.badge ? 'text-gold-dark' : 'text-navy'}`}>
                      {m.name}
                    </span>
                    {m.badge && (
                      <Icon name="BadgeCheck" className="w-4 h-4 text-gold flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-snug line-clamp-2 mb-2 min-h-[2rem]">{m.full}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${m.badge ? 'text-gold' : 'text-gray-400'}`}>
                    {m.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy rounded-2xl p-10 text-center">
          <h3 className="font-jakarta text-2xl font-extrabold text-white mb-3">Partner With Jaydev</h3>
          <p className="text-white/60 mb-6">We reply within 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-gold px-8 py-3">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a href="https://wa.me/919099796811" target="_blank" rel="noopener noreferrer" className="btn-ghost-white px-8 py-3">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
