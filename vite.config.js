import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// When building for firefox (manifest 2, does not support es5/6 module) bundle vite build each input file one at a time (popup, background, content)

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
        entryFileNames: '[name].js',
        format: 'iife', //Immediately Invoked Function Expression
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
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
