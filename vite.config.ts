import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import MotionResolver from 'motion-v/resolver';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), MotionResolver(), tailwindcss(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/submit': {
                target: 'https://mustafa.dk/submit',
                changeOrigin: true,
                secure: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        },
    },
});
