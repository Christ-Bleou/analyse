import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    hmr: {
      overlay: false  // Plus d'overlay rouge même si erreur rare
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AGTS',
        short_name: 'AGTS',
        description: 'Application de gestion de transport scolaire',
        icons: [
          { src: '/icons/logo-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/logo-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        theme_color: '#0033A0',
        background_color: '#ffffff',
        display: 'standalone'
      }
    })
  ],
})
