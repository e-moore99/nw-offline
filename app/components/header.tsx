import styles from "./header.module.css";
import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAppSelector } from "@/redux/store";
import Pokeball from "@/public/pokeball.png";
import Image from "next/image";

export default function Header({
  setSearchQuery,
  handleSearch,
}: {
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}) {
  const [cartItems, setCartItems] = React.useState<number>(0);
  const cartArray = useAppSelector((state) => state.cart);

  React.useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className="flex items-center">
          <Image src={Pokeball} alt="Pokeball" className="w-8" />
          <h1>Welcome to PokeStore!</h1>
          </Link>
          <Link href="/cart">
            <div className={styles.cartIcon}>
              <ShoppingCartIcon className="w-6" />
              <p>{cartItems}</p>
            </div>
          </Link>
        </div>
        <div className={styles.headerBottom}>
          <Search setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        </div>
      </div>
    </>
  );
}
