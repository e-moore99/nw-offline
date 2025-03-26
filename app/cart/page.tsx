"use client";
import { Suspense, useEffect } from "react";
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
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TbShoppingCartOff } from "react-icons/tb";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<CartItemState[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
  const [close, setClose] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart);

  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);

  const [isOnline, setOnline] = React.useState<boolean>(true); // Initialize with current online status

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      // Only run this code on the client side
      setOnline(navigator.onLine); // Initialize with current online status
      const handleOnline = () => setOnline(true);
      const handleOffline = () => setOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

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
      (total, item) => total + (Number(item.price.value) * item.quantity) / 100,
      0
    );
  };

  const handlePopup = () => {
    setPopupOpen((prev) => !prev);
  };

  const toggleClosePopup = () => {
    setClose((prev) => !prev);
  };

  const total = calculateTotalPrice();

  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <>
        <Header
          setSearchQuery={setSearchQuery}
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
          {isOnline ? (
            <div className={styles.pageTopAlert}>
              <p>
                We've made some changes to our checkout, when you add a new
                payment card you will get a verification request from your bank.
                Please see our FAQ for more details.
              </p>
            </div>
          ) : (
            <div className={styles.pageTopAlert}>
              <p>
                You are currently in offline mode. Some product information,
                such as prices and availability, may not be up to date.
              </p>
            </div>
          )}
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
                  {isOnline ? (
                    <button
                      onClick={toggleClosePopup}
                      className={styles.checkoutBtn}
                    >
                      Checkout
                    </button>
                  ) : (
                    <button
                      onClick={handlePopup}
                      className={styles.checkoutBtnOffline}
                    >
                      Checkout
                    </button>
                  )}

                  <button className={styles.listBtn}>
                    Save trolley to a list
                  </button>
                </div>
              </div>
              <button className={styles.emptyTrolley} onClick={emptyCart}>
                Empty trolley
              </button>
              {isOnline ? (
                <div className={styles.disclaimer}>
                  <InformationCircleIcon className="w-14" />
                  <p>
                    Some of the items in your cart may have limits. If your
                    order exceeds the advertised limit, you may only receive the
                    limited amount.
                  </p>
                </div>
              ) : (
                <div className={styles.disclaimer}>
                  <InformationCircleIcon className="w-14" />
                  <p>
                    Some of the items in your cart may have changed prices.
                    Please check before checking out.
                  </p>
                </div>
              )}
              {isOnline ? (
                <div className={styles.disclaimer}>
                  <InformationCircleIcon className="w-20" />
                  <p>
                    Due to the delay between selecting your groceries and
                    delivery, product origins may change before your order is
                    picked and before you receive your products.
                  </p>
                </div>
              ) : (
                <div className={styles.disclaimer}>
                  <InformationCircleIcon className="w-20" />
                  <p>
                    Checkout is unavailable while offline. You must be online
                    and logged in to complete your purchase.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {popupOpen
          ? !close && (
              <>
                <div className={styles.popup}>
                  <div className={styles.wifiSymbol}>
                    <TbShoppingCartOff className={styles.reactIcon} />
                  </div>
                  <div className={styles.popupTopBtn}>
                    <button onClick={toggleClosePopup}>
                      <XMarkIcon className="w-6" />
                    </button>
                  </div>

                  <div className={styles.popupBody}>
                    <h2>Checkout unavailable</h2>
                    <div className={styles.bodyContent}>
                      <p>
                        Checkout is unavailable while offline.You must be online
                        and logged in to complete your purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )
          : null}
        <Footer />
      </>
    </Suspense>
  );
}
