// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import compress from 'astro-compress';

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
