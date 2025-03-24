"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import Header from "./components/header";
import styles from "./page.module.css";
import HomePage from "./components/Home";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [products, setProducts] = React.useState<any[]>([]);
  const cartArray = useAppSelector((state) => state.cart);

  const searchProducts = async () => {
    try {
      const response = await axios.get(`/api/products?query=${searchQuery}`);
      setProducts(response.data);
      console.log("success searching!", response.data);
      setLoading(false);
    } catch (err) {
      console.error("error with product search", err)
    }
  };

  useEffect(() => {
    console.log("Cart array: ", cartArray);
  }, [cartArray]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} searchProducts={searchProducts}/>
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
