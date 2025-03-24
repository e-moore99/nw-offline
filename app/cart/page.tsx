"use client";
import { useEffect } from "react";
import Header from ".././components/header";
import Footer from "../components/Footer";
import React from "react";
import CartItemCard from "../components/cartItemCard";
import { CartItemState } from "@/redux/features/cart-slice";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCart } from "@/redux/features/cart-slice";
import {
  ShoppingBagIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// interface CartItem {
//   name: string;
//   id: string;
//   sprites: { front_default: string };
//   quantity: number;
// }

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<CartItemState[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  const handleSearch = async () => {
    console.log("Wrong page to search on!", searchQuery);
  };
  const searchProducts = async () => {
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
  const emptyCart = () => {
    const cartItems: CartItemState[] = [];
    dispatch(updateCart(cartItems));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.id) * item.quantity,
      0
    );
  };

  const total = calculateTotalPrice();

  return (
    <>
      <Header
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        searchProducts={searchProducts}
      />
      <div className={styles.cart}>
        <h1 className={styles.pageTitle}>Your Trolley</h1>
        <div className={styles.collectingFrom}>
          <ShoppingBagIcon className="w-14" />
          <p>
            You&apos;re collecting from <b>New World Mt Roskill</b>
          </p>
          <button>Select timeslot</button>
        </div>
        <div className={styles.pageTopAlert}>
          <p>! This is an alert banner !</p>
        </div>
        <div className={styles.cartCheckoutBox}>
          <div className={styles.cartContainer}>
            {cartItems.length === 0 ? <h1>Cart is empty!</h1> : null}
            <div className={styles.cartItems}>
              {cartItems.map((item, index) => (
                <CartItemCard
                  subtitle={item.subtitle}
                  price={item.price}
                  unitPrice={item.unitPrice}
                  key={index}
                  name={item.name}
                  id={item.id}
                  images={item.images}
                  quantity={item.quantity}
                  increaseItems={() => increaseItems(index)}
                  decreaseItems={() => decreaseItems(index)}
                  removeItem={() => removeItem(index)}
                />
              ))}
            </div>
          </div>
          <div className={styles.cartBoxRight}>
            <div className={styles.orderSummary}>
              <div className={styles.orderSummaryTop}>
                <h2>Order summary</h2>
                <p>{cartItems.length} items</p>
                <div className={styles.promoCode}>
                  <input type="text" placeholder="Promo code" />
                  <button>Apply</button>
                </div>
                <div className={styles.orderPriceBreakdown}>
                  <div className={styles.priceBreakdownLeft}>
                    <h3>Groceries</h3>
                    <p>
                      Service fee <InformationCircleIcon className="w-6" />
                    </p>
                    <p>
                      Bag fee <InformationCircleIcon className="w-6" />
                    </p>
                  </div>
                  <div className={styles.priceBreakdownRight}>
                    <h3>${cartItems ? total.toFixed(2) : 0.0}</h3>
                    <p>$0.00</p>
                    <p>$1.00</p>
                  </div>
                </div>
              </div>
              <div className={styles.orderSummaryBottom}>
                <div className={styles.estimatedTotal}>
                  <h2>Estimated total</h2>
                  <h2>${cartItems ? (total + 1).toFixed(2) : 0.0}</h2>
                </div>
                <p>Incl. GST</p>
                <button className={styles.checkoutBtn}>Checkout</button>
                <button className={styles.listBtn}>
                  Save trolley to a list
                </button>
              </div>
            </div>
            <button className={styles.emptyTrolley} onClick={emptyCart}>
              Empty trolley
            </button>
            <div className={styles.disclaimer}>
              <InformationCircleIcon className="w-14" />
              <p>
                Some of the items in your cart may have limits. If your order
                exceeds the advertised limit, you may only receive the limited
                amount.
              </p>
            </div>
            <div className={styles.disclaimer}>
              <InformationCircleIcon className="w-20" />
              <p>
                Due to the delay between selecting your groceries and delivery,
                product origins may change before your order is picked and
                before you receive your products.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
