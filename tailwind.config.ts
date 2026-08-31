import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ══ INK ══ Pure neutral, 0% saturation - the exact register of the
           logo's black wordmark. No hue at all: a tinted dark is what made the
           previous build read as "dark green". ── */
        ink: {
          deep:    '#080808', // deepest ground             20.0:1
          DEFAULT: '#101010', // dark surfaces, headings     19.0:1
          raised:  '#1A1A1A', // raised dark panel           17.4:1
          mid:     '#242424', // hover / elevated            15.5:1
          muted:   '#454545', // secondary text on light      9.6:1
          soft:    '#5C5C5C', // tertiary text on light       6.7:1
          subtle:  '#6E6E6E', // faintest passing text        5.0:1
          light:   '#E5E5E5', // hairline borders
          pale:    '#F2F2F1', // tinted panels
        },

        /* ══ LIME ══ The logo mark's own hue (111 deg), not an emerald.
           The scale rotates gently toward 122 as it darkens so it stays a green
           and never turns khaki.
           - lime.DEFAULT is 2.09:1 on white: FILLS AND MARKS ONLY, never text.
           - Text on white, and fills under white text -> lime.text (5.25:1).
           - On dark -> lime.light (11.5:1). ── */
        lime: {
          DEFAULT: '#39CE22', // the mark. fills, dots, CTA head
          hover:   '#33B81E', // fill hover
          text:    '#1B7D1D', // all lime text on light + fills under white text
          deep:    '#15561A', // pressed, gradient tail
          light:   '#6DE250', // accent + text on dark
          bright:  '#8DEF6C', // gradient head on dark
          tint:    '#EAF8E7', // pale plate - the light alternative to a dark band
        },

        /* ══ GOLD ══ Accreditation badges ONLY (ISO / GMP / WHO-GMP). ── */
        gold: {
          DEFAULT: '#C9922A',
          light:   '#E8B84B',
          dark:    '#7A5816',
          bg:      '#FEF3E2',
        },

        /* ══ NEUTRALS ══ pure greys, no tint */
        line: {
          DEFAULT: '#E5E5E5',
          soft:    '#EBEBEB',
          faint:   '#F2F2F2',
        },
        surface: {
          DEFAULT: '#F7F7F6',
          alt:     '#FAFAFA',
        },
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      /* Named gradients. Authored once in globals.css `:root`, surfaced here so they
         are usable as `bg-grad-*` classes. Never inline a brand gradient in a component. */
      backgroundImage: {
        'grad-hero':      'var(--grad-hero)',
        'grad-bridge':    'var(--grad-bridge)',
        'grad-ink':       'var(--grad-ink)',
        'grad-ink-panel': 'var(--grad-ink-panel)',
        'grad-cta':       'var(--grad-cta)',
        'grad-text':      'var(--grad-text)',
        'grad-text-dark': 'var(--grad-text-dark)',
        'grad-rule':      'var(--grad-rule)',
        'grad-progress':  'var(--grad-progress)',
        'glow-lg':        'var(--glow-lg)',
        'glow-md':        'var(--glow-md)',
        'glow-sm':        'var(--glow-sm)',
      },
      boxShadow: {
        /* ink is ~3x darker in luminance than the old navy, so alphas are stepped
           down one notch from the navy-era values or cards read heavy. */
        card:         '0 2px 16px rgba(6,18,11,0.07)',
        'card-hover': '0 8px 32px rgba(6,18,11,0.12)',
        lime:         '0 4px 20px rgba(57,206,34,0.30)',
      },
    },
  },
  plugins: [],
};

export default config;
