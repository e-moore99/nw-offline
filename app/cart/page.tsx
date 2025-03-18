"use client";
import { useEffect } from "react";
import Header from ".././components/header";
import React from "react";
import CartItemCard from "../components/cartItemCard";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

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
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
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
      <div className={styles.cart}>
        <h1>Your Trolley</h1>
        <div className={styles.collectingFrom}>
          <ShoppingBagIcon className="w-14" />
          <p>
            You're collecting from <b>New World Mt Roskill</b>
          </p>
          <button>Select timeslot</button>
        </div>
        <div className={styles.pageTopAlert}>
          <p>! This is an alert banner !</p>
        </div>
        <div className={styles.cartCheckoutBox}>
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
        </div>
      </div>
      <div>
        <h1>Total: {}</h1>
      </div>
    </>
  );
}
