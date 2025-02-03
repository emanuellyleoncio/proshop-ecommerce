import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('aquii',env);

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': env.VITE_BACKEND_URL,
      },
    },
  };
});