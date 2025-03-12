const PAGES_CACHE = "pages-cache-v1";
const POKEMON_CACHE = "pokemon-cache-v1";
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
const allPokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

const pagesToCache = ["/", "/cart", "/manifest.json"];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("pages-cache-v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(pagesToCache));
});

const cacheFirst = async (req) => {
  const responseFromCache = await caches.match(req);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(req);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
  console.log(event.request, event.request.url);
});
