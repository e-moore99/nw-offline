import { Product, Pokemon } from "./types";

import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchData() {
  try {
    const data = await sql<Product[]>`SELECT * FROM data`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchByName(query: string) {
  try {
    const data = await sql<Product[]>`
      SELECT * FROM data
      WHERE name = ${`%${query}%`}`;

    const nameFetch = data.map((invoice) => ({
      ...invoice,
    }));
    console.log("fetched by name", nameFetch);
    return nameFetch;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchByBrand(query: string) {
  try {
    const data = await sql<Product[]>`
      SELECT * FROM data
      WHERE brand = ${`%${query}%`}`;

    const brandFetch = data.map((invoice) => ({
      ...invoice,
    }));
    console.log("fetched by name", brandFetch);
    return brandFetch;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable[]>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }




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
