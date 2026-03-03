import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Instantly take control of uncontrolled clients upon installation
self.skipWaiting();
clientsClaim();

// 1. Precaching
// The __WB_MANIFEST is injected by your bundler (e.g., workbox-build or vite-plugin-pwa).
// It contains revision hashes to guarantee cache integrity and automated invalidation.
precacheAndRoute(self.__WB_MANIFEST);

// 2. CSS & JavaScript (Stale-While-Revalidate)
// Serves instantly from cache, but updates the cache in the background for the next load.
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// 3. Images (Cache First with strict expiration)
// Saves bandwidth by aggressive caching, but enforces a hard limit to prevent storage bloat.
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Allows caching of opaque responses (e.g., third-party CDNs) safely
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Enforce strict cap on number of images
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        purgeOnQuotaError: true, // Auto-delete if browser storage is full
      }),
    ],
  })
);

// 4. Global Offline Fallback
// Triggers exclusively when a route fails to resolve via both cache and network.
setCatchHandler(async ({ request }) => {
  // If a page navigation fails, serve the precached offline page
  if (request.destination === 'document') {
    return matchPrecache('/fallback');
  }

  // If an image fails, serve a precached offline placeholder
  if (request.destination === 'image') {
    return matchPrecache('/img/fallback.jpg');
  }

  // Fallback for other file types
  return Response.error();
});