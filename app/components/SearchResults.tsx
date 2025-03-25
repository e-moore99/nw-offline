import React, { useEffect } from "react";
import { Product } from "../lib/types";
import { CartItemState } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";
import ItemCard from "../components/itemCard";
import styles from "./searchResults.module.css";

const SearchResults = ({
  products,
  searchQuery,
}: {
  products: Product[];
  searchQuery: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);

  const addToCart = (product: Product) => {
    console.log("added to cart: ", product);
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);


    if (itemIndex !== -1) {
      const updatedCart = cartArray.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      dispatch(updateCart(updatedCart));
    } else {
      if (!product.name || !product.id) {
        console.error("Product name or id is undefined");
        return;
      }
      const newCartItem: CartItemState = {
        name: product.name,
        id: product.id,
        images: product.images,
        quantity: 1,
        subtitle: product.subtitle,
        price: product.price,
        unitPrice: product.unitPrice
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
          Search results for &quot;{searchQuery}&quot;
        </h1>
        <div className={styles.displayArea}>
          {products && Array.isArray(products) ? (
            products.map((product) => (
              <ItemCard
              addToCart={() => addToCart(product)}
              numberInCart={product.id ? numberInCart(product.id) : 0}
              key={product.id}
              name={product.name}
              id={product.id}
              subtitle={product.subtitle}
              price={product.price}
              images={product.images}
              unitPrice={product.unitPrice}
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