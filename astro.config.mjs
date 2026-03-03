// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import compress from 'astro-compress';
import AstroPWA from '@vite-pwa/astro';

import myManifest from './src/assets/manifest.json';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.ivanbeltrame.com',
    output: 'static',
    trailingSlash: 'never',
    build: {
        format: 'file',
        assets: "assets",
    },
    outDir: 'docs',
    integrations: [
        purgecss(),
        AstroPWA({
            strategies: 'injectManifest',
            srcDir: 'src/scripts',
            filename: 'sw.js',
            registerType: 'autoUpdate',
            manifest: myManifest,
            manifestFilename: 'manifest.json',
            injectManifest: {
                globPatterns: ['assets/*.{js,css,html,ico,png,svg,webp}'],
            },
            devOptions: {
                enabled: true,
                type: 'module',
            },
        }),
        sitemap(),
        compress(),
    ],
    image: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ivanbeltrame.com'
            },
            {
                protocol: 'https',
                hostname: '**.ivanweather.com'
            },
        ],
    },
    // redirects: {
    //     '/old': '/new',
    //     '/blog/[...slug]': '/articles/[...slug]',
    //     '/about': 'https://example.com/about',
    //     '/news': {
    //     status: 302,
    //     destination: 'https://example.com/news'
    //     },
    // },
});
