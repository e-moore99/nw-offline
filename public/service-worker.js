const CACHE_NAME = "pokemon-pwa-cache-v2";
const POKEMON_API_CACHE = "pokemon-api-cache-v2";
const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const ASSETS_TO_CACHE = [
  // routes
  "/",
  "/cart",
  // static files
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/offline.html",
  // css files
  "/app/globals.css",
  "/app/cart/page.module.css",
  "/app/page.module.css",
  "/app/components/itemCard.module.css",
  "/app/components/search.module.css",
  "/app/components/header.module.css",
  "/app/components/cartItemCard.module.css",
  // pages + ts files
  "/app/layout.tsx",
  "/app/page.tsx",
  "/app/cart/page.tsx",
  "/app/lib/fetch.ts",
  "/app/lib/cart.ts",
  // components
  "/app/components/itemCard.tsx",
  "/app/components/Search.tsx",
  "/app/components/header.tsx",
  "/app/components/cartItemCard.tsx"
];

async function fetchAllPokemonData() {
  try {
    const initialResponse = await fetch(
      `${POKEMON_API_BASE_URL}?limit=1304&offset=0`
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
    console.error("Error fetching Pokemon data to cache:", err);
    return [];
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache all site assets
      await cache.addAll(ASSETS_TO_CACHE);

      // Fetch and cache Pokemon data
      const pokemonData = await fetchAllPokemonData();

      const pokemonCache = await caches.open(POKEMON_API_CACHE);
      await pokemonCache.put(
        "all-pokemon",
        new Response(JSON.stringify(pokemonData), {
          headers: { "Content-Type": "application/json" },
        })
      );
      console.log("Cached ", pokemonData.length, " Pokemon");
      return cache;
    })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // Intercept API calls to Pokemon API
  if (event.request.url.startsWith(POKEMON_API_BASE_URL)) {
    event.respondWith(
      caches.open(POKEMON_API_CACHE).then((cache) => {
        return cache.match("all-pokemon").then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to network if no cached response
          return fetch(event.request).then((response) => {
            cache.put("all-pokemon", response.clone());
            return response;
          }).catch(() => {
            // If both cache and network fail, return a fallback
            return new Response(JSON.stringify({ error: "No internet connection" }), {
              headers: { "Content-Type": "application/json" },
              status: 200
            });
          });
        });
      })
    );
  }
  // Default caching strategy for other requests
  else {
    event.respondWith(
      (async () => {
        try {
          // Try to fetch from network first
          return await fetch(event.request);
        } catch (error) {
          // If network fails, handle offline scenario
          if (event.request.destination === 'document') {
            // Always return cached home page for document requests
            const homePageResponse = await caches.match('/');
            if (homePageResponse) {
              return homePageResponse;
            }
            
            // Fallback to cached index.html
            const indexResponse = await caches.match('/index.html');
            if (indexResponse) {
              return indexResponse;
            }
          }
          
          // Try to match any cached response
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Absolute last resort
          return new Response('Offline', { 
            status: 200, 
            headers: { 'Content-Type': 'text/html' }
          });
        }
      })()
    );
  }
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, POKEMON_API_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});
