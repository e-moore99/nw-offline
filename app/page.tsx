"use client";
import Header from "./components/header";
import React from "react";
import { Pokemon, fetchPokemon } from "./lib/fetch";
import ItemCard from "./components/itemCard";
import styles from "./page.module.css";

export default function Home() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
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

  const addToCart = (pokemon: Pokemon) => {
    console.log("added to cart: ", pokemon);
  }

  return (
    <>
      <Header setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.displayArea}>
            {pokemon &&
              Array.isArray(pokemon) &&
              pokemon.map((poke) => (
                <ItemCard
                addToCart={() => addToCart(poke)}
                
                  key={poke.id+1}
                  name={poke.name}
                  id={poke.id}
                  image={
                    poke.sprites?.front_default ||
                    "https://media.istockphoto.com/id/1399588872/vector/corrupted-pixel-file-icon-damage-document-symbol-sign-broken-data-vector.jpg?s=612x612&w=0&k=20&c=ffG6gVLUPfxZkTwjeqdxD67LWd8R1pQTIyIVUi-Igx0="
                  }
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
