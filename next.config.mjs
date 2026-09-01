/** @type {import('next').NextConfig} */

/**
 * Security headers.
 *
 * The site had no next.config at all, so it shipped with none of these. They
 * are all response headers with no build-time cost and no effect on rendering.
 *
 * Deliberately NOT here: a Content-Security-Policy. This site loads Google
 * Fonts, Vercel Speed Insights and framer-motion's inline styles, so a strict
 * policy needs its allowlist verified against a real deploy rather than guessed
 * at - a wrong CSP fails closed and takes the page's styling with it.
 */
const securityHeaders = [
  // Never let a browser second-guess a declared Content-Type. Stops a user
  // upload or a text response being sniffed into executable script.
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // No framing, so the site cannot be rendered inside an attacker's page and
  // clickjacked. frame-ancestors is the modern form; X-Frame-Options is kept
  // for older browsers that ignore CSP.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },

  // Send the origin cross-site, the full path same-site, and nothing at all when
  // downgrading to http. Keeps buyer-identifying query strings off referrers.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // The site asks for none of these, so deny them outright rather than leaving
  // the decision to a future embedded script.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },

  // Two years, subdomains included. No `preload` directive: that one is a
  // hard-to-reverse commitment to the browser preload list and is the owner's
  // call, not a default worth setting on their behalf.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
];

const nextConfig = {
  // Don't advertise the framework and version to anyone scanning for a
  // version-specific exploit.
  poweredByHeader: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
