import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // 👇 THIS FIXES THE BLACK SCREEN + React #310
  resolve: {
    dedupe: ['react', 'react-dom']
  },

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html'
      }
    }
  }
});
