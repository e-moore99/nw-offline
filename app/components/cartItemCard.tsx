import React from "react";
import styles from "./cartItemCard.module.css";
import Image from "next/image";
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
          <Image
            src={props.image}
            alt="Pokemon image"
            height={100}
            width={150}
          />

          <h1>{props.name}</h1>
        </div>
        <div className={styles.cartItemRight}>
          <div className={styles.btnBox}>
            <h3 className={styles.quantity}>{props.quantity}</h3>
            <h3 className={styles.each}>ea</h3>
            <button
              onClick={props.decreaseItems}
              className={styles.quantityBtn}
            >
              <MinusIcon className="w-6" />
            </button>
            <button
              onClick={props.increaseItems}
              className={styles.quantityBtn}
            >
              <PlusIcon className="w-6" />
            </button>
          </div>
          <h4>${props.id}</h4>

          <button onClick={props.removeItem} className={styles.removeBtn}>
            <XMarkIcon className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
}
