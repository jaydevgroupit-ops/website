import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jaydev Group',
    short_name: 'Jaydev',
    description:
      'Industrial chemicals, minerals, solvents and pharmaceutical APIs - sourced in India, shipped to 30+ export markets.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#101010',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Without a maskable icon Android shows the square plate inside its own
      // mask - a white tile with a letterboxed logo. This one keeps the mark
      // inside the guaranteed 80% safe circle, so any launcher shape works.
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
