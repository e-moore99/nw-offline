const CACHE_NAME = "pokemon-pwa-cache-v1";
const POKEMON_API_CACHE = "pokemon-api-cache";
const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/offline.html",
  "/app/globals.css",
  "/app/layout.tsx",
  "/app/page.tsx",
  "/app/page.module.css",
  "/app/lib/fetch.ts",
  "/app/lib/cart.ts",
  "/app/cart/page.tsx",
  "/app/cart/page.module.css",
  "/app/components/itemCard.tsx",
  "/app/components/itemCard.module.css",
  "/app/components/Search.tsx",
  "/app/components/search.module.css",
  "/app/components/header.tsx",
  "/app/components/header.module.css",
  "/app/components/cartItemCard.tsx",
  "/app/components/cartItemCard.module.css",
];

async function fetchAllPokemonData() {
  try {
    const initialResponse = await fetch(
      `${POKEMON_API_BASE_URL}?limit=100000&offset=0`
    );
    const data = await initialResponse.json();
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        return await detailResponse.json();
      })
    );
    console.log("cached pokemon! Slay");
    return pokemonData;
  } catch (err) {
    console.log("error fetching all data to cache:", err);
    return [];
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(ASSETS_TO_CACHE);

      const pokemonData = await fetchAllPokemonData();

      const pokemonCache = await caches.open(POKEMON_API_CACHE);
      pokemonCache.put(
        "all-pokemon",
        new Response(JSON.stringify(pokemonData), {
          headers: { "Content-Type": "application/json" },
        })
      );
      console.log("Cache ", pokemonData.length, " Pokemon");
      return cache;
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(POKEMON_API_BASE_URL)) {
    event.respondWith(
      caches.open(POKEMON_API_CACHE).then((cache) => {
        // getting all cached data
        return cache.match("all-pokemon").then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // use network if no cached response
          return fetch(event.request).then((response) => {
            cache.put("all-pokemon", response.clone());
            return response;
          });
        });
      })
    );
  }
  // Default caching strategy for other requests
  else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Activate event: Clean up old caches when service worker updates
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, POKEMON_API_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete caches not in the whitelist
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// self.addEventListener('fetch', (event) => {
//   // Intercept API calls to Pokemon API
//   if (event.request.url.startsWith(POKEMON_API_BASE_URL)) {
//     event.respondWith(
//       caches.open(POKEMON_API_CACHE).then((cache) => {
//         return fetch(event.request).then((response) => {
//           // Clone the response to save it to the cache
//           const responseClone = response.clone();
//           cache.put(event.request, responseClone);
//           return response;
//         }).catch(() => {
//           // If fetch fails, try to return from cache
//           return cache.match(event.request);
//         });
//       })
//     );
//   }
//   // Handle other requests with cache-first strategy
//   else {
//     event.respondWith(
//       caches.match(event.request)
//         .then((response) => {
//           if (response) {
//             return response;
//           }
//           return fetch(event.request);
//         })
//     );
//   }
// });

// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME, POKEMON_API_CACHE];

//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
