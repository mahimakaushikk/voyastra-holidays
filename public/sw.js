/**
 * Voyastra Holidays Service Worker
 * =================================
 * Features:
 * - Reliable cache versioning
 * - Automatic update & immediate activation (skipWaiting + clients.claim)
 * - Complete removal of outdated caches on deployment
 * - Network-First for HTML pages (ZERO STALE CONTENT guarantee)
 * - Stale-While-Revalidate for images & static assets
 * - Graceful offline fallback support (guaranteed valid Response objects)
 */

const CACHE_VERSION = "voyastra-v2.1.0";
const CURRENT_CACHES = {
  static: `voyastra-static-${CACHE_VERSION}`,
  runtime: `voyastra-runtime-${CACHE_VERSION}`,
  images: `voyastra-images-${CACHE_VERSION}`,
};

// Essential assets to pre-cache on install
const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon.svg",
];

// 1. INSTALL: Pre-cache core shell & immediately skip waiting
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CURRENT_CACHES.static)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 2. ACTIVATE: Purge all outdated caches from previous versions & claim clients
self.addEventListener("activate", (event) => {
  const expectedCaches = new Set(Object.values(CURRENT_CACHES));

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!expectedCaches.has(cacheName)) {
              console.log("[SW] Deleting outdated cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[SW] Cache updated to version:", CACHE_VERSION);
        return self.clients.claim();
      })
  );
});

// 3. FETCH: Smart routing with bulletproof offline handling
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and non-http(s) protocols
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // A. HTML Navigation Requests -> NETWORK-FIRST (Guarantees fresh content after every deploy)
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CURRENT_CACHES.runtime).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // If offline, retrieve cached page or fallback to root
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallback = await caches.match("/");
          if (fallback) return fallback;
          return new Response(
            `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Offline | Voyastra Holidays</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #12313A; color: #FFFFFF; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; padding: 24px; box-sizing: border-box; }
    .card { max-width: 500px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 36px 28px; }
    h1 { color: #E07A2B; font-size: 1.8rem; margin: 0 0 12px; }
    p { color: #E2DFD2; font-size: 0.95rem; line-height: 1.6; margin: 0 0 24px; }
    .btn { display: inline-block; background: #E07A2B; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 0.9rem; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>You Are Currently Offline</h1>
    <p>Voyastra Holidays requires an active internet connection to retrieve custom itineraries and real-time packages. Please check your network connection.</p>
    <button class="btn" onclick="window.location.reload()">Retry Connection</button>
  </div>
</body>
</html>`,
            {
              headers: { "Content-Type": "text/html; charset=utf-8" },
              status: 200,
            }
          );
        })
    );
    return;
  }

  // B. Images (JPG, PNG, WebP, AVIF, SVG, ICO) -> STALE-WHILE-REVALIDATE
  if (
    request.destination === "image" ||
    url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|ico)$/i)
  ) {
    event.respondWith(
      caches.open(CURRENT_CACHES.images).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        if (cachedResponse) {
          return cachedResponse;
        }

        const networkResponse = await fetchPromise;
        if (networkResponse) {
          return networkResponse;
        }

        // Return a graceful 1x1 transparent SVG fallback if neither cache nor network is available
        return new Response(
          '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
          {
            headers: { "Content-Type": "image/svg+xml" },
            status: 200,
          }
        );
      })
    );
    return;
  }

  // C. Static Next.js Chunks & Fonts -> CACHE-FIRST WITH NETWORK FALLBACK
  if (url.pathname.startsWith("/_next/static/") || url.hostname.includes("fonts.")) {
    event.respondWith(
      caches.open(CURRENT_CACHES.static).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return new Response("Static asset unavailable offline", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" },
          });
        }
      })
    );
    return;
  }

  // Default: Network with cache fallback or graceful 503 response
  event.respondWith(
    fetch(request).catch(async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      return new Response("Resource unavailable offline", {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "text/plain" },
      });
    })
  );
});

// 4. MESSAGE: Allow client to trigger skipWaiting
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
