"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import Header from "./components/header";
import styles from "./page.module.css";
import HomePage from "./components/Home";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import axios from "axios";
import { Product } from "./lib/types";

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const cartArray = useAppSelector((state) => state.cart);

  useEffect(() => {
    const fetchAndCacheAllProducts = async () => {
      try {
        const cache = await caches.open("nw-product-cache-v1");
        const cachedResponse = await cache.match("/api/all");

        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          setProducts(cachedData);
          console.log("Using cached all products data.");
          return;
        }

        const response = await axios.get("/api/all");
        setProducts(response.data);
        await cache.put(
          "/api/all",
          new Response(JSON.stringify(response.data), {
            headers: { "Content-Type": "application/json" },
          })
        );
        console.log("Fetched and cached all products data.");
      } catch (error) {
        console.error("Error fetching and caching all products:", error);
      }
    };

    fetchAndCacheAllProducts();
  }, []);

  const searchProducts = async () => {
    setLoading(true);
    try {
      // SW cache first
      const cache = await caches.open("nw-product-cache-v1");
      const cachedResponse = await cache.match(`/api/all`);
      if (cachedResponse) {
        // Use Cached Data
        const allProducts = await cachedResponse.json();

        // filter products based on query
        const filteredProducts = allProducts.filter((product: Product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
        setProducts(filteredProducts );
        console.log("Using cached search results:", filteredProducts);
        setLoading(false);
        return; // Exit the function, as we've used cached data
      }
      // If no cache, fetch from network
      const response = await axios.get(`/api/products?query=${searchQuery}`);
      setProducts(response.data);
      await cache.put(
        `/api/products?query=${searchQuery}`,
        new Response(JSON.stringify(response.data), {
          headers: { "Content-Type": "application/json" },
        })
      );
      console.log("success searching! cached results", response.data);
      setLoading(false);
    } catch (err) {
      console.error("error with product search", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Cart array: ", cartArray);
  }, [cartArray]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} searchProducts={searchProducts} />
      <div className={styles.container}>
        {loading ? (
          <>
            <HomePage />
          </>
        ) : (
          <>
            <SearchResults products={products} searchQuery={searchQuery} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
