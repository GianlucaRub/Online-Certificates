import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Online-Certificates/developing_front_end_apps_with_react/conference_event_planner',
  plugins: [react()],
});