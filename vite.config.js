// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'og-image.png'], // Added og-image here too
      manifest: {
        name: 'The Legacy OS',
        short_name: 'LegacyOS',
        description: 'Re-building a Lost Life into a Generational System',
        theme_color: '#0c0a09',
        background_color: '#0c0a09',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // ⬇️ THIS IS THE NEW PART FOR OFFLINE IMAGES ⬇️
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,mp3}'], // Cache ALL these file types
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024, // Increase limit to 30MB (allows caching covers & short audio)
      }
    })
  ],
})