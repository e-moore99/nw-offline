import { precacheAndRoute } from 'workbox-precaching';

const PAGES_CACHE = "pages-cache-v2";
const PRODUCT_CACHE = "nw-product-cache-v1";
const allProductUrl = "/api/all";

// Precache Next.js static assets and your custom pages
precacheAndRoute([
    { url: '/', revision: null },
    { url: '/cart', revision: null },
    { url: '/manifest.json', revision: null },
    ...self.__WB_MANIFEST, // Add Next.js generated assets
  ]);

// const addResourcesToCache = async (resources, cacheName) => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(resources);
// };

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
        // cache all api data
        try {
            const response = await fetch(allProductUrl);
            if (response.ok){
                const data = await response.json();
                const cache = await caches.open(PRODUCT_CACHE);
                await cache.put(allProductUrl, new Response(JSON.stringify(data), {
                    headers: {'Content-Type': 'application/json'}
                }));
            }
        } catch (err) {
            console.error('Failed to cache all products', err);
        }
        console.log("Service worker installed")
    })
  );
});

const cacheFirst = async (req) => {
    const responseFromCache = await caches.match(req);
    if (responseFromCache) {
      return responseFromCache;
    }
    return fetch(req);
  };

// async function getNextStaticAssets() {
//   const manifest = await fetch("/_next/static/chunks/webpack-runtime.js");
//   if (!manifest.ok) {
//     return [];
//   }
//   const nextAssets = [];
//   const nextStatic = await fetch('/_next/static/chunks/pages/_app-client_entry.js');
//   if (nextStatic.ok) {
//     nextAssets.push('/_next/static/chunks/pages/_app-client_entry.js');
//   }
//   return nextAssets;
// }

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     (async () => {
//       const url = new URL(event.request.url);
//       if (url.pathname.startsWith('/api/products') && url.searchParams.has('query')) {
//         const query = url.searchParams.get('query');
//         const cachedProducts = await caches.match(allProductUrl);
//         if (cachedProducts) {
//           const products = await cachedProducts.json();
//           const results = products.filter((product) =>
//             product.name.toLowerCase().includes(query.toLowerCase())
//           );
//           return new Response(JSON.stringify(results), {
//             headers: { 'Content-Type': 'application/json' },
//           });
//         }
//         return fetch(event.request);
//       } else {
//         return cacheFirst(event.request);
//       }
//     })()
//   );
//   console.log(event.request, event.request.url);
// });

self.addEventListener("fetch", (event) => {
    event.respondWith(
      (async () => {
        const url = new URL(event.request.url);
        if (url.pathname.startsWith('/api/')) {
            return cacheFirst(event.request);
        } else {
            return cacheFirst(event.request);
        }
      })()
    );
    console.log(event.request, event.request.url);
  });


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== PAGES_CACHE && cacheName !== PRODUCT_CACHE) {
            return caches.delete(cacheName);
          }
          return null;
        }).filter(item => item !== null)
      );
    })
  );
  console.log('Service worker activated');
});