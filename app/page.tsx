'use client';
import Image from "next/image";
import Header from "./components/header";
import React from "react";
import { Pokemon, fetchPokemon } from "./lib/fetch";
import ItemCard from "./components/itemCard";

export default function Home() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // const handleSearch = async () => {
  //   if (!filters.searchQuery) return;

  //   setLoading(true);
  //   const searchedMovies = await fetchMovies({
  //     query: filters.searchQuery,
  //     genre: filters.genre,
  //     year: filters.releaseYear,
  //     duration: filters.duration,
  //     rating: filters.rating,
  //   });
  //   setMovies(searchedMovies);
  //   setLoading(false);
  // };

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
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div>
        <h1>Display stuff here</h1>
        {/* <ItemCard name={pokemon.name} key={pokemon.id} id={pokemon.id} type={pokemon.types} image={pokemon.sprites}></ItemCard> */}
      </div>
    </>
  );
}
