import styles from "./itemCard.module.css";

export default function ItemCard(props: {
  name: string;
  id: number;
  image: string;
}) {
  return (
    <>
      <div className={styles.itemCard}>
        <div>
          <h1>{props.name}</h1>
          <img src={props.image} alt="Pokemon image" />
        </div>
        <div>
          <h3>#{props.id}</h3>
        </div>
        <div>
          <h2>${props.id}</h2>
        </div>
      </div>
    </>
  );
}
