import React, { useEffect } from "react";
import { Pokemon, Product } from "../lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";
import ItemCard from "../components/itemCard";
import styles from "./searchResults.module.css";
import { fetchProductsByQuery } from "../lib/fetch";

import { FC } from "react";

const SearchResults: FC<{ query: string; products: Product[] }> = async ({
  // pokemon,
  query,
}: {
  // pokemon: Pokemon[];
  query: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);
  const products = await fetchProductsByQuery(query);
  
  // pokemon: Pokemon,
  const addToCart = ( products: Product) => {
    // pokemon
    // item.id === pokemon.id ||
    console.log("added to cart: ", products);
    const itemIndex = cartArray.findIndex((item) =>  item.id === products.productId);

    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      dispatch(updateCart(updatedCart));
    } else {
      const newCartItem = {
        name: products.name,
        id: products.productId,
        sprites: { front_default: products.image_md || "https://media.istockphoto.com/id/1399588872/vector/corrupted-pixel-file-icon-damage-document-symbol-sign-broken-data-vector.jpg?s=612x612&w=0&k=20&c=ffG6gVLUPfxZkTwjeqdxD67LWd8R1pQTIyIVUi-Igx0=" },
        // name: pokemon.name || products.name,
        // id: pokemon.id || products.productId,
        // sprites: pokemon.sprites || products.,
        quantity: 1,
      };
      const updatedCart = [...cartArray, newCartItem];
      dispatch(updateCart(updatedCart));
    }
  };

  const numberInCart = (id: string) => {
    const itemIndex = cartArray.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      return cartArray[itemIndex].quantity;
    }
    return 0;
  };

  useEffect(() => {
    console.log("Cart array: ", cartArray);
  }, [cartArray]);
  return (
    <>
      <div className={styles.results}>
        <h1 className={styles.resultsHead}>
          Search results for &quot;{query}&quot;
        </h1>
        <div className={styles.displayArea}>
          {products && Array.isArray(products) ? (
            products.map((item) => (
              <ItemCard
                addToCart={() => addToCart(item)}
                numberInCart={numberInCart(item.productId)}
                key={item.productId + 1}
                name={item.name}
                id={item.productId}
                image={
                  item.image_md ||
                  "https://media.istockphoto.com/id/1399588872/vector/corrupted-pixel-file-icon-damage-document-symbol-sign-broken-data-vector.jpg?s=612x612&w=0&k=20&c=ffG6gVLUPfxZkTwjeqdxD67LWd8R1pQTIyIVUi-Igx0="
                }
              />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;