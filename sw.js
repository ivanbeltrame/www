const cacheVersion = "v36";
const staticCache = "site-static-" + cacheVersion;
const dynamicCache = "site-dynamic-" + cacheVersion;

const pages = [
    "/",
    "/404",
    "/certificati",
    "/contatti",
    "/fallback",
    "/ca",
    "/privacy-policy",
    "/progetti"
];
const pagesFullURL = [
    "/",
    "/404.html",
    "/certificati.html",
    "/contatti.html",
    "/fallback.html",
    "/ca.html",
    "/privacy-policy.html",
    "/progetti.html"
];
const js = [
    "/js/app.js",
    "/js/main.js"
];
const css = [
    "/style.css"
];
const imgs = [
    "/favicon.ico",
    "/img/404.jpg",
    "/img/logo.png",
    "/img/certificates/accredible/play-store-listing.jpg",
    "/img/certificates/grasshopper/animations-2.jpg",
    "/img/certificates/grasshopper/animations.jpg",
    "/img/certificates/grasshopper/arrays.jpg",
    "/img/certificates/grasshopper/debugging.jpg",
    "/img/certificates/grasshopper/editor.jpg",
    "/img/certificates/grasshopper/fundamentals-2.jpg",
    "/img/certificates/grasshopper/fundamentals.jpg",
    "/img/certificates/grasshopper/interviewing.jpg",
    "/img/certificates/hackerx/android.jpg",
    "/img/certificates/hackerx/bring-down-website.jpg",
    "/img/certificates/hackerx/card-fraud.jpg",
    "/img/certificates/hackerx/database.jpg",
    "/img/certificates/hackerx/ethical-hacking.jpg",
    "/img/certificates/hackerx/gathering-info.jpg",
    "/img/certificates/hackerx/hiding-messages.jpg",
    "/img/certificates/hackerx/keyboard-spying.jpg",
    "/img/certificates/hackerx/mac.jpg",
    "/img/certificates/hackerx/network-spying.jpg",
    "/img/certificates/hackerx/network-spying.jpg",
    "/img/certificates/hackerx/os.jpg",
    "/img/certificates/hackerx/password.jpg",
    "/img/certificates/hackerx/safe-data.jpg",
    "/img/certificates/hackerx/socials.jpg",
    "/img/certificates/hackerx/surfing-anonymously.jpg",
    "/img/certificates/hackerx/vulnerability-scanning.jpg",
    "/img/certificates/hackerx/wap2.jpg",
    "/img/certificates/hackerx/wep.jpg",
    "/img/certificates/hackerx/wordpress.jpg",
    "/img/certificates/hackerx/xss.jpg",
    "/img/certificates/harvard/cs50ai-pro.jpg",
    "/img/certificates/harvard/cs50ai-ver.jpg",
    "/img/certificates/harvard/cs50p-pro.jpg",
    "/img/certificates/harvard/cs50p-ver.jpg",
    "/img/certificates/harvard/cs50x-ver.jpg",
    "/img/certificates/harvard/cs50x.jpg",
    "/img/certificates/sololearn/c.jpg",
    "/img/certificates/sololearn/html.jpg",
    "/img/certificates/sololearn/java.jpg",
    "/img/certificates/sololearn/javascript.jpg",
    "/img/certificates/sololearn/jquery.jpg",
    "/img/certificates/sololearn/php.jpg",
    "/img/certificates/sololearn/python.jpg",
    "/img/certificates/sololearn/rwd.jpg",
    "/img/certificates/sololearn/sql.jpg",
    "/img/videos/ivanmusic.jpg",
    "/img/videos/ivanweather.jpg"
];
const thirdParty = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
];
const assets = [
    "/manifest.json",
    "/assets/IvanBeltrame.asc"
];

// Cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
}

// Install service worker
self.addEventListener("install", evt => {
    console.log("Service worker has been installed");
    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log("Caching shell assets");
            cache.addAll(pages);
            cache.addAll(pagesFullURL);
            cache.addAll(js);
            cache.addAll(css);
            cache.addAll(imgs);
            cache.addAll(thirdParty);
            cache.addAll(assets);
        })
    );
});

// Activate service worker event
self.addEventListener("activate", evt => {
    console.log("Service worker has been activated");
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCache && key !== dynamicCache)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch to service worker event
self.addEventListener("fetch", evt => {
    console.log("Fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCache, 200);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.headers.get("accept").includes("text/html")) {
                return caches.match("/fallback");
            }
        })
    );
});