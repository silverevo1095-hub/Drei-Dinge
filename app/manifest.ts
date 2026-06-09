import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Drei Dinge',
    short_name: 'Drei Dinge',
    description: 'Dein Fokus für heute',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#1c1917',
    icons: [
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
