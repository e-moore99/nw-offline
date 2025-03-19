import React, { useEffect } from "react";
import { Pokemon } from "../lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";
import ItemCard from "../components/itemCard";
import styles from "./searchResults.module.css";

const SearchResults = ({
  pokemon,
  searchQuery,
}: {
  pokemon: any;
  searchQuery: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);

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

  const numberInCart = (id: number) => {
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
          Search results for "{searchQuery}"
        </h1>
        <div className={styles.displayArea}>
          {pokemon && Array.isArray(pokemon) ? (
            pokemon.map((poke) => (
              <ItemCard
                addToCart={() => addToCart(poke)}
                numberInCart={numberInCart(poke.id)}
                key={poke.id + 1}
                name={poke.name}
                id={poke.id}
                image={
                  poke.sprites?.front_default ||
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
