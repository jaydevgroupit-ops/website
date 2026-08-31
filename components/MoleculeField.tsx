/**
 * Ambient molecule field for the mobile hero.
 *
 * Replaces the large rotating spoke disc on phones, where the disc is either
 * too big or too faint to work. A handful of simple ring/bond glyphs drift
 * slowly across the light hero at low opacity - subtle, not crowded.
 * Purely decorative, so it is hidden from assistive tech.
 */

type Glyph = {
  /** left / top as percentages of the container */
  x: number;
  y: number;
  size: number;
  kind: 'ring' | 'bond' | 'tri';
  anim: 'a' | 'b' | 'c';
  duration: number;
  delay: number;
  opacity: number;
};

const GLYPHS: Glyph[] = [
  { x: 12, y: 8,  size: 62, kind: 'ring', anim: 'a', duration: 26, delay: 0,  opacity: 0.5 },
  { x: 74, y: 16, size: 44, kind: 'bond', anim: 'b', duration: 32, delay: 3,  opacity: 0.38 },
  { x: 58, y: 42, size: 78, kind: 'ring', anim: 'c', duration: 38, delay: 1,  opacity: 0.3 },
  { x: 18, y: 56, size: 38, kind: 'tri',  anim: 'b', duration: 29, delay: 5,  opacity: 0.42 },
  { x: 80, y: 70, size: 56, kind: 'ring', anim: 'a', duration: 34, delay: 2,  opacity: 0.34 },
  { x: 34, y: 84, size: 40, kind: 'bond', anim: 'c', duration: 30, delay: 6,  opacity: 0.4 },
];

function Shape({ kind }: { kind: Glyph['kind'] }) {
  const stroke = 'rgba(57,206,34,0.55)';
  const dot = 'rgba(27,125,29,0.70)';

  if (kind === 'ring') {
    // hexagonal ring with vertex atoms
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return [50 + Math.cos(a) * 34, 50 + Math.sin(a) * 34];
    });
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon
          points={pts.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
        />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={dot} />
        ))}
      </svg>
    );
  }

  if (kind === 'tri') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,18 82,72 18,72" fill="none" stroke={stroke} strokeWidth="2.5" />
        <circle cx="50" cy="18" r="5" fill={dot} />
        <circle cx="82" cy="72" r="5" fill={dot} />
        <circle cx="18" cy="72" r="5" fill={dot} />
      </svg>
    );
  }

  // simple three-atom bond chain
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <line x1="16" y1="70" x2="50" y2="30" stroke={stroke} strokeWidth="2.5" />
      <line x1="50" y1="30" x2="86" y2="62" stroke={stroke} strokeWidth="2.5" />
      <circle cx="16" cy="70" r="6" fill={dot} />
      <circle cx="50" cy="30" r="7" fill={dot} />
      <circle cx="86" cy="62" r="6" fill={dot} />
    </svg>
  );
}

export default function MoleculeField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden sm:hidden">
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: g.size,
            height: g.size,
            opacity: g.opacity,
            animation: `jd-drift-${g.anim} ${g.duration}s ease-in-out ${g.delay}s infinite`,
          }}
        >
          <Shape kind={g.kind} />
        </span>
      ))}
    </div>
  );
}
