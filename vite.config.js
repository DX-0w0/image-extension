import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background.js'),
        content: resolve(__dirname, 'src/content.js'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'background') return 'background.js'
          if (chunk.name === 'content') return 'content.js'
          return '[name].js'
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
    define: {
      global: 'globalThis', // required for cheerio
    },
    // resolve: {
    //   alias: {
    //     stream: 'stream-browserify',
    //     util: 'util',
    //     buffer: 'buffer',
    //   },
    // },
    // optimizeDeps: {
    //   include: ['axios', 'cheerio'],
    // },
  },
})
