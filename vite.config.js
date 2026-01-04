import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'The Legacy OS',
        short_name: 'Legacy OS',
        description: 'An operating system for humans, families, and institutions.',
        theme_color: '#09090b',
        background_color: '#09090b',
        display: 'standalone',
        icons: [
          {
            src: 'icon-v2.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-v2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // ⚠️ THIS FIXES YOUR ERROR: Increases limit to 50MB
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, 
        // Ensures audio files are cached
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,mp3,wav}']
      }
    })
  ],
})