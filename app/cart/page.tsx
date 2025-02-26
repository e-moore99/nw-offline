"use client";
import { use, useEffect } from "react";
import Header from ".././components/header";
import React from "react";
// import ItemCard from "../components/itemCard";
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
  const [loading, setLoading] = React.useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  const increaseItems = (index: number) => {
    let tempCartItems = cartArray.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(tempCartItems));
  };
  const decreaseItems = (index: number) => {
    let tempCartItems = cartArray.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity - 1 } : item
    );
    dispatch(updateCart(tempCartItems));
  };
  const removeItem = (index: number) => {};

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className={styles.cartContainer}>
        {/* <CartItemCard
          name="test"
          id={1}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"
          quantity={3}
          increaseItems={() => increaseItems(index)}
          decreaseItems={() => decreaseItems(index)}
          removeItem={() => removeItem(index)}
        /> */}
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
    </>
  );
}
