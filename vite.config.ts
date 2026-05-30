import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.webp', 'favicon.svg'],
      manifest: {
        name: 'PolaEja',
        short_name: 'PolaEja',
        description: 'Belajar ejaan bahasa Inggris dengan metode Hukum Ejaan',
        theme_color: '#0a0a1a',
        background_color: '#0a0a1a',
        display: 'standalone',
        icons: [
          { src: 'icons/icon-48.webp', sizes: '48x48', type: 'image/webp' },
          { src: 'icons/icon-72.webp', sizes: '72x72', type: 'image/webp' },
          { src: 'icons/icon-96.webp', sizes: '96x96', type: 'image/webp' },
          { src: 'icons/icon-128.webp', sizes: '128x128', type: 'image/webp' },
          { src: 'icons/icon-192.webp', sizes: '192x192', type: 'image/webp' },
          { src: 'icons/icon-256.webp', sizes: '256x256', type: 'image/webp' },
          { src: 'icons/icon-512.webp', sizes: '512x512', type: 'image/webp' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,webp,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/belajarejaanbahasainggris\.vercel\.app\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'polaeja-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
})
