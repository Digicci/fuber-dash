import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: false,
    // Valeurs factices : les tests ne doivent pas dependre d'un .env local.
    env: {
      VITE_API_BASE_PATH: 'http://localhost:8000/api'
    }
  },
})
