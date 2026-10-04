import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// O mesmo build é publicado em openladder.app (Cloudflare) e em openladder-app.github.io (GitHub Pages).
// Os dois servem o site na raiz do domínio, por isso `base` fica no padrão ("/").
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
