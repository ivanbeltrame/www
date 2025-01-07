const cacheVersion = "v33";
const statiCache = "site-static-" + cacheVersion;
const dynamicCache = "site-dynamic-" + cacheVersion;

const pages = [
    "/",
    "/404",
    "/certificati",
    "/contatti",
    "/fallback",
    "/ca"
];
const pagesFullURL = [
    "/",
    "/404.html",
    "/certificati.html",
    "/contatti.html",
    "/fallback.html",
    "/ca.html"
];
const jsS = [
    "/js/app.js",
    "/js/main.js"
];
const cssS = [
    "/style.css"
];
const imgs = [
    "/img/404.jpg",
    "/img/favicon.png",
    "/img/icon.jpg",
    "/img/fallback.jpg",
    "/img/touch/icon48.png",
    "/img/touch/icon72.png",
    "/img/touch/icon96.png",
    "/img/touch/icon144.png",
    "/img/touch/icon168.png",
    "/img/touch/icon192.png",
    "/img/touch/icon512.png",
    "/img/ivanmusic-thumbnail.jpg",
    "/img/ivanweather-thumbnail.jpg",
    "/img/certs/grasshooper/animations.png",
    "/img/certs/grasshooper/animations2.png",
    "/img/certs/grasshooper/array-methods.png",
    "/img/certs/grasshooper/code-editor.jpg",
    "/img/certs/grasshooper/debugging.png",
    "/img/certs/grasshooper/fundamentals.png",
    "/img/certs/grasshooper/fundamentals2.png",
    "/img/certs/grasshooper/interviewing.png",
    "/img/certs/hackerx/android.jpg",
    "/img/certs/hackerx/card-frauds.jpg",
    "/img/certs/hackerx/database.jpg",
    "/img/certs/hackerx/ethical-hacking.jpg",
    "/img/certs/hackerx/gathering-info.jpg",
    "/img/certs/hackerx/hiding-msg.jpg",
    "/img/certs/hackerx/keyboard-spying.jpg",
    "/img/certs/hackerx/mac.jpg",
    "/img/certs/hackerx/network-spying.jpg",
    "/img/certs/hackerx/os.jpg",
    "/img/certs/hackerx/password-hacking.jpg",
    "/img/certs/hackerx/safe-data.jpg",
    "/img/certs/hackerx/social-hacking.jpg",
    "/img/certs/hackerx/surfing-anonymously.jpg",
    "/img/certs/hackerx/vulnerability.jpg",
    "/img/certs/hackerx/website-down.jpg",
    "/img/certs/hackerx/wep-hacking.jpg",
    "/img/certs/hackerx/wordpress-scanning.jpg",
    "/img/certs/hackerx/wpa2-hacking.jpg",
    "/img/certs/hackerx/xss.jpg",
    "/img/certs/harvard/cert-x.png",
    "/img/certs/harvard/pro-cert-py.png",
    "/img/certs/harvard/ver-cert-py.png",
    "/img/certs/harvard/ver-cert-x.jpg",
    "/img/certs/sololearn/c.jpg",
    "/img/certs/sololearn/html.jpg",
    "/img/certs/sololearn/java.png",
    "/img/certs/sololearn/javascript.png",
    "/img/certs/sololearn/jquery.jpg",
    "/img/certs/sololearn/php.jpg",
    "/img/certs/sololearn/python.png",
    "/img/certs/sololearn/responsive-web-design.jpg",
    "/img/certs/sololearn/sql.png",
    "/img/screenshots/home-mobile.jpg",
    "/img/screenshots/certificati-mobile.jpg",
    "/img/screenshots/contatti-mobile.jpg",
    "/img/screenshots/progetti-mobile.jpg"
];
const thirdParty = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
];
const files = [
    "/manifest.json"
];
const certificateAuthority = [
    "/ca/Ivan_Beltrame_People_CA_chain.crt",
    "/ca/Ivan_Beltrame_People_CA.crt",
    "/ca/Ivan_Beltrame_Root_CA.crt",
    "/ca/Ivan_Beltrame_Servers_CA.crt",
    "/ca/Ivan_Beltrame_Servers_CA_chain.crt",
    "/crl/ca.crl",
    "/crl/servers.crl",
    "/crl/people.crl"
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
        caches.open(statiCache).then(cache => {
            console.log("Caching shell assets");
            cache.addAll(pages);
            cache.addAll(pagesFullURL);
            cache.addAll(jsS);
            cache.addAll(cssS);
            cache.addAll(imgs);
            cache.addAll(thirdParty);
            cache.addAll(files);
            cache.addAll(certificateAuthority);
        })
    );
});

// Activate service worker event
self.addEventListener("activate", evt => {
    console.log("Service worker has been activated");
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== statiCache && key !== dynamicCache)
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
                    limitCacheSize(dynamicCache, 50);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.headers.get("accept").includes("text/html")) {
                return caches.match("/fallback.html");
            }
        })
    );
});