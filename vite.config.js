import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        schedule: resolve(__dirname, 'schedule.html'),
        thankYou: resolve(__dirname, 'thank-you.html'),
      },
    },
  },
});
