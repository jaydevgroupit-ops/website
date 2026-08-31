import { ImageResponse } from 'next/og';

export const alt = 'Jaydev Group - Industrial Chemical Exporter & Supplier';
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
          background: 'linear-gradient(135deg,#242424 0%,#101010 55%,#080808 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* lime glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '620px',
            height: '620px',
            display: 'flex',
            background: 'radial-gradient(circle at center, rgba(238,246,236,0.20), rgba(238,246,236,0.04) 34%, rgba(57,206,34,0) 62%)',
          }}
        />

        {/* wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '46px' }}>
          <div style={{ color: '#ffffff', fontSize: '46px', fontWeight: 800, letterSpacing: '2px' }}>JAYDEV</div>
          <div style={{ color: '#6DE250', fontSize: '22px', fontWeight: 700, letterSpacing: '10px' }}>GROUP</div>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', color: '#ffffff', fontSize: '66px', fontWeight: 800, lineHeight: 1.05, maxWidth: '940px' }}>
          Industrial Chemicals, Sourced &amp; Shipped to the World
        </div>

        {/* lime underline */}
        <div style={{ display: 'flex', width: '160px', height: '6px', borderRadius: '3px', background: 'linear-gradient(90deg,#39CE22 0%,#6DE250 100%)', margin: '34px 0' }} />

        {/* stats */}
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.72)', fontSize: '30px', fontWeight: 500 }}>
          Export &amp; Import · Pharma &amp; Intermediates · GACL &amp; Grasim Authorized
        </div>
      </div>
    ),
    { ...size },
  );
}
