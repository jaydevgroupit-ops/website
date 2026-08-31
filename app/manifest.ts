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
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
