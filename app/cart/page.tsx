"use client";
import { useEffect } from "react";
import Header from ".././components/header";
import React from "react";
import CartItemCard from "../components/cartItemCard";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";

interface CartItem {
  name: string;
  id: number;
  sprites: { front_default: string };
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  const handleSearch = async () => {
    console.log("Wrong page to search on!", searchQuery);
  };

  const increaseItems = (index: number) => {
    const tempCartItems = cartArray.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(tempCartItems));
  };
  const decreaseItems = (index: number) => {
    const tempCartItems = cartArray.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    dispatch(updateCart(tempCartItems));
  };
  const removeItem = (index: number) => {
    const tempCartItems = [...cartArray];
    tempCartItems.splice(index, 1);
    dispatch(updateCart(tempCartItems));
  };

  return (
    <>
      <Header setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <div className={styles.cartContainer}>
        {cartItems.length === 0 ? <h1>Cart is empty!</h1> : null}
        <div>
          {cartItems.map((item, index) => (
            <CartItemCard
              key={index}
              name={item.name}
              id={item.id}
              image={item.sprites.front_default}
              quantity={item.quantity}
              increaseItems={() => increaseItems(index)}
              decreaseItems={() => decreaseItems(index)}
              removeItem={() => removeItem(index)}
            />
          ))}
        </div>
      </div>
      <div>
        <h1>Total: {}</h1>
      </div>
    </>
  );
}
