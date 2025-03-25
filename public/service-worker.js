import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const PAGES_CACHE = "pages-cache-v2";
const PRODUCT_CACHE = "nw-product-cache-v1";
const allProductUrl = "/api/all";

const addResourcesToCache = async (resources, cacheName) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const staticAssets = [
        "/",
        "/cart",
        "/manifest.json",
      ];
      const staticNextAssets = await getNextStaticAssets();
      staticAssets.push(...staticNextAssets);
      await addResourcesToCache(staticAssets, PAGES_CACHE);
      console.log("Service worker installed");
    })
  );
});

async function getNextStaticAssets() {
  const manifest = await fetch("/_next/static/chunks/webpack-runtime.js");
  if (!manifest.ok) {
    return [];
  }
  const nextAssets = [];
  const nextStatic = await fetch('/_next/static/chunks/pages/_app-client_entry.js');
  if (nextStatic.ok) {
    nextAssets.push('/_next/static/chunks/pages/_app-client_entry.js');
  }
  return nextAssets;
}

const cacheFirst = async (req) => {
  const responseFromCache = await caches.match(req);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(req);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const url = new URL(event.request.url);
      if (url.pathname.startsWith('/api/products') && url.searchParams.has('query')) {
        const query = url.searchParams.get('query');
        const cachedProducts = await caches.match(allProductUrl);
        if (cachedProducts) {
          const products = await cachedProducts.json();
          const results = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return fetch(event.request);
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