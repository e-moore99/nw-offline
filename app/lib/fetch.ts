export interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

export const fetchPokemon = async (options: {
  name?: string;
  id?: number;
  findAll?: string;
}): Promise<Pokemon[]> => {
  try {
    const { name, id, findAll } = options;

    // search cached data before online
    const cachedData = await caches.match('all-pokemon');
    if (cachedData) {
      const allPokemonData = await cachedData.json();

      if (findAll) {
        return allPokemonData.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(findAll.toLowerCase()))
      } else if (name) {  
        return allPokemonData.filter((pokemon: Pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());
      } else if (id) {
        return allPokemonData.filter((pokemon: Pokemon) => pokemon.id === id);
      } else {
        // default response of first 20 if no specific search
        return allPokemonData.slice(0, 20);
      }
    }

    let searchQuery = "";
    if (findAll) {
      searchQuery = `${findAll}`;
    } else if (name) {
      searchQuery = `pokemon/${name}`;
    } else if (id) {
      searchQuery = `pokemon/${id}`;
    } else {
      searchQuery = "pokemon/pikachu";
    }

    const response = await fetch(`https://pokeapi.co/api/v2/${searchQuery}`);

    const data = await response.json();
    console.log(data);

    if (data.results) {
      const allPokemon = await Promise.all(
        data.results.map(async (pokemon: { name: string }) => {
          const pokemonResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          return await pokemonResponse.json();
        })
      );
      return allPokemon;
    }

    if (data) {
      return [data];
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};
