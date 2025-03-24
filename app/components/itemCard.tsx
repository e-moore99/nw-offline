import styles from "./itemCard.module.css";
import Image from "next/image";
import { UnitPrice, Price, Images } from "../lib/types";

export default function ItemCard(props: {
  name: string | undefined;
  id: string | undefined;
  subtitle: string;
  price: Price;
  images: Images;
  unitPrice: UnitPrice;
  addToCart: () => void;
  numberInCart: number;
}) {
  const value = Number(props.price.value) / 100;
  return (
    <>
      <div
        className={props.numberInCart ? styles.itemCardNIC : styles.itemCard}
      >
        <h1>{props.name}</h1>

        <Image
          src={props.images.md}
          alt="Product image"
          width={150}
          height={100}
        />

        <div className={styles.cartAdd}>
          <div className={styles.priceBox}>
            <h2>${value}</h2> <p>{props.unitPrice.plainText}</p>
          </div>
          <button onClick={props.addToCart}>Add</button>
        </div>
        {props.numberInCart > 0 ? <p className={styles.numInCart} >{props.numberInCart} in trolley</p> : null}
      </div>
    </>
  );
}
