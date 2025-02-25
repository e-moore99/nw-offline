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
