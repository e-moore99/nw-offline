import React from "react";
import styles from "./cartItemCard.module.css";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

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
        <div className={styles.cartItemLeft}>
          <img src={props.image} alt="Pokemon image" />
          <h1>{props.name}</h1>
        </div>
        {/* <div>
          <h3>#{props.id}</h3>
        </div> */}
        {/* <div>
        </div> */}
        <div className={styles.cartItemRight}>
          <div className={styles.btnBox}>
          <button onClick={props.decreaseItems}><MinusIcon className="w-6"/></button>
          <h3>{props.quantity}</h3>
          <button onClick={props.increaseItems}><PlusIcon className="w-6"/></button>
          <button onClick={props.removeItem}><TrashIcon className="w-6"/></button>
          </div>
          <h4>Price: ${props.id*props.quantity}</h4>
        </div>
      </div>
    </>
  );
}
