"use client";
import React, { useEffect } from "react";
import { Pokemon } from "./lib/types";
import { fetchPokemon } from "./lib/fetch";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Header from "./components/header";
import styles from "./page.module.css";
import HomePage from "./components/Home";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";

export default function Home() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const cartArray = useAppSelector((state) => state.cart);

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
    console.log("Fetched Pokemon: ", pokemon);
    setLoading(false);
  };

  //   console.log("added to cart: ", pokemon);
  //   const itemIndex = cartArray.findIndex((item) => item.id === pokemon.id);

  //   if (itemIndex !== -1) {
  //     const updatedCart = cartArray.map((item, index) =>
  //       index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
  //     );
  //     dispatch(updateCart(updatedCart));
  //   } else {
  //     const newCartItem = {
  //       name: pokemon.name,
  //       id: pokemon.id,
  //       sprites: pokemon.sprites,
  //       quantity: 1,
  //     };
  //     const updatedCart = [...cartArray, newCartItem];
  //     dispatch(updateCart(updatedCart));
  //   }
  // };

  useEffect(() => {
    console.log("Cart array: ", cartArray);
  }, [cartArray]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <div className={styles.container}>
        {loading ? (
          <>
            <HomePage />
          </>
        ) : (
          <>
            <SearchResults pokemon={pokemon} searchQuery={searchQuery} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
