import styles from "./header.module.css";
import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon, WifiIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAppSelector } from "@/redux/store";
import Pokeball from "@/public/pokeball.png";
import offline from "@/public/nrk_offline.png";
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
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  const toggleOpenHandler = () => {
    setOpen((prev) => !prev);
  };

  const handleActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className="flex items-center">
            <Image src={Pokeball} alt="Pokeball" className="w-8" />
            <h1>Welcome to PokeStore!</h1>
          </Link>
          <div className={styles.headerTopRight}>
            <button className={styles.offlineBtn}>You're offline</button>

            <button onClick={toggleOpenHandler}>
              <WifiIcon className="w-6" />
            </button>
            <Link href="/cart">
              <div className={styles.cartIcon}>
                <ShoppingCartIcon className="w-6" />
                <p>{cartItems}</p>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <Search setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        </div>
      </div>
      {/* This is the popup box on the navbar to give you info */}
      <div>Offline Mode</div>

      {/* This is the main "you've lost connectivity" popup */}
      {isOpen ? (
        <div className={active ? styles.popActive : styles.popup}>
          <div className={styles.wifiSymbol}>
            <Image src={offline} alt="Offline" className="w-16" />
          </div>
          <div className={styles.popupTopBtn}>
            <button onClick={toggleOpenHandler}>
              <WifiIcon className="w-6" />
            </button>
          </div>

          <div className={styles.popupBody}>
            <h2>Offline mode activated</h2>
            <div className={styles.bodyContent}>
              <p>
                Offline? Keep browsing, your trolley will sync when you're
                online
              </p>
              <button
                onClick={handleActive}
                className={active ? styles.infoBtnActive : styles.infoBtn}
              >
                {active ? "^" : "i"}
              </button>
            </div>

            {active ? (
              <>
                <h4 className={styles.offlineTitle}>
                  Offline mode functionalities
                </h4>
                <div className={styles.offlineFunc}>
                  <p>Browse product catalogues</p>
                  <p>
                    View product details such as description, images, and price
                  </p>
                  <p>Add products to the trolley</p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
      ;
    </>
  );
}
