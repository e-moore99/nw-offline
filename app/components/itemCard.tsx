import styles from './itemCard.module.css'


export default function ItemCard(props: {name: string, id: number, type: number, image: string}) {

    return(
        <>
        <div className={styles.itemCard}>
            <div>
        <h1>{props.name}aaaa</h1>
        <img src={props.image} alt="Pokemon image" />
            </div>
            <div>
        <h3>#{props.id}aaa</h3>
        <h3>{props.type}aaa</h3>
            </div>
            <div><h2>${props.id}aaa</h2></div>
        </div>
        </>
    )
}