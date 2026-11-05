// @ts-check
import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ivanbeltrame.com",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
    assets: "assets",
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ivanbeltrame.com",
      },
    ],
  },
  integrations: [
    AstroPWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg}"],
        navigateFallback: "/404",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
      manifest: {
        name: "Ivan Beltrame",
        short_name: "Ivan Beltrame",
        description:
          "Il mio sito personale dove puoi trovare qualche fatto su di me, vedere i miei certificati e navigare sui miei siti",
        start_url: "/?pwa=home",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#0d6efd",
        lang: "it",
        scope: "/",
        id: ".",
        orientation: "any",
        dir: "ltr",
        categories: ["utilities", "games"],
        icons: [
          { src: "/img/touch/icon16.png", sizes: "16x16", type: "image/png" },
          { src: "/img/touch/icon32.png", sizes: "32x32", type: "image/png" },
          { src: "/img/touch/icon48.png", sizes: "48x48", type: "image/png" },
          { src: "/img/touch/icon72.png", sizes: "72x72", type: "image/png" },
          { src: "/img/touch/icon96.png", sizes: "96x96", type: "image/png" },
          {
            src: "/img/touch/icon144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/img/touch/icon168.png",
            sizes: "168x168",
            type: "image/png",
          },
          {
            src: "/img/touch/icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/touch/icon512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/img/touch/icon512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        display_override: [
          "window-controls-overlay",
          "standalone",
          "minimal-ui",
          "browser",
        ],
        shortcuts: [
          {
            name: "Certificati",
            url: "/certificati?pwa=certificati",
            description:
              "I miei certificati ordinati per società di emissione e di importanza",
            icons: [{ src: "/img/touch/icon96.png", sizes: "96x96" }],
          },
          {
            name: "Progetti",
            url: "/progetti?pwa=progetti",
            description: "I miei progetti creati nel corso della mia carriera",
            icons: [{ src: "/img/touch/icon96.png", sizes: "96x96" }],
          },
          {
            name: "Contatti",
            url: "/contatti?pwa=contatti",
            description:
              "La mia pagina dei contantti in cui sono presenti tutti i modi in cui mi puoi parlare, inclusi social e email",
            icons: [{ src: "/img/touch/icon96.png", sizes: "96x96" }],
          },
        ],
        launch_handler: { client_mode: ["navigate-existing", "auto"] },
        screenshots: [
          {
            src: "/img/screenshots/home-mobile.jpg",
            sizes: "1080x2400",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Home visitata da un telefono",
          },
          {
            src: "/img/screenshots/progetti-mobile.jpg",
            sizes: "1080x2400",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Pagina dei progetti visitata da un telefono",
          },
          {
            src: "/img/screenshots/certificati-mobile.jpg",
            sizes: "1080x2400",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Pagina dei certificati visitata da un telefono",
          },
          {
            src: "/img/screenshots/contatti-mobile.jpg",
            sizes: "1080x2400",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Pagina dei contatti visitata da un telefono",
          },
          {
            src: "/img/screenshots/laptop/home.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Home visitata da un computer",
          },
          {
            src: "/img/screenshots/laptop/progetti.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Pagina dei progetti visitata da un computer",
          },
          {
            src: "/img/screenshots/laptop/certificati.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Pagina dei certificati visitata da un computer",
          },
          {
            src: "/img/screenshots/laptop/contatti.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Pagina dei contatti visitata da un computer",
          },
        ],
        scope_extensions: [
          { origin: "https://*.ivanbeltrame.com", type: "origin" },
        ],
      },
      devOptions: {
        enabled: true, // Enables service worker testing during `astro dev`
      },
    }),
  ],
});
