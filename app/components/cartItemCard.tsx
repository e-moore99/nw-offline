import React from "react";
import styles from "./cartItemCard.module.css";

export default function CartItemCard(props: {
  name: string;
  id: number;
  image: string;
  quantity: number;
  increaseItems: () => void;
  decreaseItems: () => void;
  removeItem: () => void;
}) {
  return (
    <>
      <div className={styles.cartItemCard}>
        <div>
          <h1>{props.name}</h1>
          <img src={props.image} alt="Pokemon image" />
        </div>
        <div>
          <h3>#{props.id}</h3>
        </div>
        <div>
          <h3>Quantity: {props.quantity}</h3>
        </div>
        <div className={styles.cartAdd}>
          <button onClick={props.increaseItems}>+</button>
          <button onClick={props.decreaseItems}>-</button>
          <button onClick={props.removeItem}>Remove</button>
        </div>
      </div>
    </>
  );
}
