import React from "react";
import styles from "./cartItemCard.module.css";
import Image from "next/image";
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UnitPrice, Price, Images } from "../lib/types";

export default function CartItemCard(props: {
  name: string | undefined;
  id: string | undefined;
  subtitle: string;
  price: Price;
  images: Images;
  unitPrice: UnitPrice;
  quantity: number;
  increaseItems: () => void;
  decreaseItems: () => void;
  removeItem: () => void;
}) {

  const value = Number(props.price.value) / 100;
  return (
    <>
      <div className={styles.cartItemCard}>
        <div className={styles.cartItemLeft}>
          <Image
            src={props.images.xs}
            alt="Product image"
            height={50}
            width={100}
          />
          <div>
          <h1>{props.name}</h1>
          <p>{props.subtitle}</p>
          </div>
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
          <h4>${value}</h4>

          <button onClick={props.removeItem} className={styles.removeBtn}>
            <XMarkIcon className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
}
