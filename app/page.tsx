"use client";
import React, { useEffect } from "react";
import { Pokemon, fetchPokemon } from "./lib/fetch";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";
import Header from "./components/header";
import ItemCard from "./components/itemCard";
import styles from "./page.module.css";
import HomePage from "./components/Home";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";

export default function Home() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
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

  const addToCart = (pokemon: Pokemon) => {
    console.log("added to cart: ", pokemon);
    const itemIndex = cartArray.findIndex((item) => item.id === pokemon.id);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      dispatch(updateCart(updatedCart));
    } else {
      const newCartItem = {
        name: pokemon.name,
        id: pokemon.id,
        sprites: pokemon.sprites,
        quantity: 1,
      };
      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    }
  };

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
          // <div className={styles.displayArea}>
          //   {pokemon &&
          //     Array.isArray(pokemon) &&
          //     pokemon.map((poke) => (
          //       <ItemCard
          //         addToCart={() => addToCart(poke)}
          //         key={poke.id + 1}
          //         name={poke.name}
          //         id={poke.id}
          //         image={
          //           poke.sprites?.front_default ||
          //           "https://media.istockphoto.com/id/1399588872/vector/corrupted-pixel-file-icon-damage-document-symbol-sign-broken-data-vector.jpg?s=612x612&w=0&k=20&c=ffG6gVLUPfxZkTwjeqdxD67LWd8R1pQTIyIVUi-Igx0="
          //         }
          //       />
          //     ))}
          // </div>
          <>
            <SearchResults pokemon={pokemon} searchQuery={searchQuery} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
