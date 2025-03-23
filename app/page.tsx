"use client";
import React, { useEffect } from "react";
import { Pokemon } from "./lib/types";
import { fetchPokemon } from "./lib/fetch";
import { useAppSelector } from "@/redux/store";
import Header from "./components/header";
import styles from "./page.module.css";
import HomePage from "./components/Home";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import axios from "axios";

export default function Home() {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [products, setProducts] = React.useState<any[]>([]);
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
  const searchProducts = async () => {
    try {
      const response = await axios.get(`/api/products?query=${searchQuery}`);
      setProducts(response.data);
      console.log("success searching!", response.data);
    } catch (err) {
      console.error("error with product search", err)
    }
  };

  useEffect(() => {
    console.log("Cart array: ", cartArray);
  }, [cartArray]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} handleSearch={handleSearch} searchProducts={searchProducts}/>
      <div className={styles.container}>
        {loading ? (
          <>
            <HomePage />
          </>
        ) : (
          <>
            <SearchResults products={products} pokemon={pokemon} searchQuery={searchQuery} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
