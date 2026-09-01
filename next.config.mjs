/** @type {import('next').NextConfig} */

/**
 * Security headers.
 *
 * The site had no next.config at all, so it shipped with none of these. They
 * are all response headers with no build-time cost and no effect on rendering.
 */

/**
 * Content-Security-Policy.
 *
 * Allowlist derived from what the site actually loads, not guessed:
 *   - fonts.googleapis.com (stylesheet) + fonts.gstatic.com (font files),
 *     both preconnected in app/layout.tsx
 *   - va.vercel-scripts.com and vitals.vercel-insights.com for Speed Insights.
 *     On Vercel the script is proxied same-origin at /_vercel/speed-insights/,
 *     but the package falls back to the CDN host, so both are permitted.
 *
 * `'unsafe-inline'` on script-src is a deliberate trade, not an oversight. Next
 * hydrates from inline `self.__next_f.push(...)` blocks; the alternative is a
 * per-request nonce, which requires middleware and forces every one of the 138
 * static pages to render dynamically. For a marketing site with no auth and no
 * user-generated content, that cost buys very little.
 *
 * So this policy is not an XSS backstop. What it does buy: script and frame
 * loading is restricted to known origins, `object-src 'none'` kills legacy
 * plugin vectors, and `base-uri`/`form-action` stop an injected tag from
 * rewriting relative URLs or repointing the RFQ form at another host.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  // next/image has no remotePatterns configured, so every image is local.
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');
const securityHeaders = [
  // Never let a browser second-guess a declared Content-Type. Stops a user
  // upload or a text response being sniffed into executable script.
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // No framing, so the site cannot be rendered inside an attacker's page and
  // clickjacked. frame-ancestors (inside the CSP below) is the modern form;
  // X-Frame-Options is kept for older browsers that ignore CSP.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: csp },

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
