"use client";
import React, { useEffect } from "react";
import { Pokemon, Product } from "./lib/types";
import { fetchPokemon } from "./lib/fetch";
import { useAppSelector } from "@/redux/store";
import Header from "./components/header";
import styles from "./page.module.css";
import HomePage from "./components/Home";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";

export default function Home(props: {
  searchParams? : Promise<{
    query?: string;
    // page?: string;
  }>
}) {
  async function searchParams () {
    const searchParams = await props.searchParams;
    return searchParams;
  }
  searchParams()
  const [query, setQuery] = React.useState<string>("");
 
    async function fetchSearchParams() {
      const params = await searchParams();
      setQuery(params?.query || "");
    }
    fetchSearchParams();
 
  // const currentPage = Number(searchParams?.page) || 1;
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const cartArray = useAppSelector((state) => state.cart);


  // const handleSearch = async () => {
  //   if (!searchQuery) return;

  //   setLoading(true);
  //   let searchedPokemon;

  //   if (searchQuery === "pokemon?limit=100000&offset=0") {
  //     searchedPokemon = await fetchPokemon({
  //       findAll: searchQuery,
  //     });
  //   } else if (isNaN(Number(searchQuery))) {
  //     searchedPokemon = await fetchPokemon({
  //       name: searchQuery,
  //     });
  //   } else {
  //     searchedPokemon = await fetchPokemon({
  //       id: Number(searchQuery),
  //     });
  //   }
  //   setPokemon(searchedPokemon);
  //   console.log("Fetched Pokemon: ", pokemon);
  //   setLoading(false);
  // };

  // const searchProducts = async (searchQuery: string) => {
  //   // e.preventDefault();
  //   try {
  //     const response = await fetchProductsByQuery(searchQuery);
  //     setProducts(response);
  //   } catch (err) {
  //     console.error("error fetching products: ", err);
  //   }
  // };

  useEffect(() => {
    console.log("Cart array: ", cartArray);
  }, [cartArray]);

 
    
  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <div className={styles.container}>
        {loading ? (
          <>
            <HomePage />
          </>
        ) : (
          <>
            {/* pokemon={pokemon} this goes inside the SR comp */}
            <SearchResults query={query} products={[]} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
