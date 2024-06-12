import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['chart.js', 'chartjs-chart-financial', 'chartjs-plugin-zoom']
  }
});
