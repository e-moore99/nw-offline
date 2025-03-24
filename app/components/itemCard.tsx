import styles from "./itemCard.module.css";
import Image from "next/image";

export default function ItemCard(props: {
  name: string;
  id: string;
  image: string;
  addToCart: () => void;
  numberInCart: number;
}) {
  return (
    <>
      <div className={props.numberInCart ? styles.itemCardNIC : styles.itemCard}>
        <h1>{props.name}</h1>

        <Image src={props.image} alt="Pokemon image" width={150} height={100} />

        <div className={styles.cartAdd}>
          <h2>${props.id}</h2>
          <button onClick={props.addToCart}>Add</button>
        </div>
        {props.numberInCart > 0 ? <p>{props.numberInCart} in trolley</p> : null}
      </div>
    </>
  );
}
