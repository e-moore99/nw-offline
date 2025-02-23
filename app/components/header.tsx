import styles from "./header.module.css";
import Link from "next/link";
import Search from "./Search";
import {
    ShoppingCartIcon
  } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>Welcome to Ecomm test site!</h1>
            {/* <ShoppingCartIcon className="w-6"/> */}
            <Link href="/cart">
            <div>

            <ShoppingCartIcon className="w-6"/>
            </div></Link> 
        </div>
        <div className={styles.headerBottom}>
            <Search />
        </div>
      </div>
    </>
  );
}
