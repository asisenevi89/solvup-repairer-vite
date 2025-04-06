import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    })
  ],
  server: {
    port: 3000, 
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    target: 'esnext',
    cssCodeSplit: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        minifyInternalExports: true,
        manualChunks: {
          vendor: ['react', 'react-dom',]
        }
      },
    },
    commonjsOptions: {
      exclude: ['src/stories/**'],
    },
  },
})
