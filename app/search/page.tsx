"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../lib/types";
import styles from "./page.module.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        // SW cache first
        const cache = await caches.open("nw-product-cache-v1");
        const cachedResponse = await cache.match(`/api/all`);
        if (cachedResponse) {
          // Use Cached Data first
          const allProducts = await cachedResponse.json();

          // filter products based on query
          const filteredProducts = allProducts.filter((product: Product) =>
            product.name?.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(filteredProducts);
          console.log("Using cached search results:", filteredProducts);
          setLoading(false);
          return; // Exit the function, as we've used cached data
        }
        // If no cache, fetch from network
        const response = await axios.get(`/api/products?query=${query}`);
        setProducts(response.data);
        await cache.put(
          `/api/products?query=${query}`,
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
    if (query) {
      searchProducts();
    }
  }, [query]);

  return (
    <>
      <Header />
      <div className={styles.results}>
        {loading ? (
          <p>Loading search results...</p>
        ) : products.length > 0 ? (
          <SearchResults products={products} searchQuery={query} />
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
