import { ImageResponse } from 'next/og';

export const alt = 'Jaydev Group — Industrial Chemical Exporter & Supplier';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default social / SERP share image (1200x630). Product pages override with
// their own product photo via generateMetadata.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px',
          background: 'linear-gradient(135deg,#0A1730 0%,#0E2040 55%,#0B1B38 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* gold glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '620px',
            height: '620px',
            display: 'flex',
            background: 'radial-gradient(circle at center, rgba(201,146,42,0.38), rgba(201,146,42,0) 62%)',
          }}
        />

        {/* wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '46px' }}>
          <div style={{ color: '#ffffff', fontSize: '46px', fontWeight: 800, letterSpacing: '2px' }}>JAYDEV</div>
          <div style={{ color: '#E8B84B', fontSize: '22px', fontWeight: 700, letterSpacing: '10px' }}>GROUP</div>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', color: '#ffffff', fontSize: '66px', fontWeight: 800, lineHeight: 1.05, maxWidth: '940px' }}>
          Industrial Chemicals, Sourced &amp; Shipped to the World
        </div>

        {/* gold underline */}
        <div style={{ display: 'flex', width: '160px', height: '6px', borderRadius: '3px', background: '#E8B84B', margin: '34px 0' }} />

        {/* stats */}
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.72)', fontSize: '30px', fontWeight: 500 }}>
          Export &amp; Import · Pharma &amp; Intermediates · GACL &amp; Grasim Authorized
        </div>
      </div>
    ),
    { ...size },
  );
}
