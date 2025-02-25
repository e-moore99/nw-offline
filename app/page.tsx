"use client";
import Image from "next/image";
import Header from "./components/header";
import React from "react";
import { Pokemon, fetchPokemon } from "./lib/fetch";
import ItemCard from "./components/itemCard";

export default function Home() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [findAll, setFindAll] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    let searchedPokemon;

    if (searchQuery === "pokemon?limit=100000&offset=0") {
      searchedPokemon = await fetchPokemon({
        findAll: searchQuery,
      });
    } else if (isNaN(Number(searchQuery))) {
      searchedPokemon = await fetchPokemon({
        name: searchQuery,
      });
    } else {
      searchedPokemon = await fetchPokemon({
        id: Number(searchQuery),
      });
    }
    setPokemon(searchedPokemon);
    setLoading(false);
  };

  //   const handleSearch = useDebouncedCallback((term) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set("page", "1");
  //     if (term) {
  //       params.set("query", term);
  //     } else {
  //       params.delete("query");
  //     }
  //     replace(`${pathName}?${params.toString()}`);
  //   }, 60);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <div>
        <h1>Display stuff here</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {pokemon &&
              Array.isArray(pokemon) &&
              pokemon.map((poke) => (
                <ItemCard
                  key={poke.id}
                  name={poke.name}
                  id={poke.id}
                  image={poke.sprites.front_default}
                />
              ))}
          </div>
        )}
        {/* <ItemCard name={pokemon.name} key={pokemon.id} id={pokemon.id} type={pokemon.types} image={pokemon.sprites}></ItemCard> */}
      </div>
    </>
  );
}
