export interface Pokemon {
  name: string;
  id: number;
  type: number;
  image: string;
}

export const fetchPokemon = async (options: {
  name?: string;
  type?: number;
  id?: number;
}): Promise<Pokemon[]> => {
  try {
    const { name, type, id } = options;
    let searchQuery = name ? `pokemon/${name}` : `pokemon/pikachu`;

    if (type) {
      searchQuery += `type/${type}`;
    }

    if (id) {
      searchQuery += `pokemon/${id}`;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/${searchQuery}`);

    const data = await response.json();

    if (data) {
      const pokemonData = await Promise.all(
        data.map(async (pokemon: { name: string; id: number; type: number }) => {
            const pokemonResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
              return await pokemonResponse.json();
          }
          
        )

      );

      return pokemonData;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};
