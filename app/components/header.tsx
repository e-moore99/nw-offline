import styles from "./header.module.css";
import Link from "next/link";
import Search from "./Search";
import {
  ChevronDownIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CiWifiOff } from "react-icons/ci";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import NWLogo from "../../public/nw-logo.svg";
import Image from "next/image";
import { TbShoppingCart } from "react-icons/tb";

export default function Header({
  setSearchQuery,
  searchProducts,
}: {
  setSearchQuery: (query: string) => void;
  searchProducts: () => void;
}) {
  const [cartItems, setCartItems] = React.useState<number>(0);
  const cartArray = useAppSelector((state) => state.cart);
  // this is for the product tree
  const [isOpen, setOpen] = React.useState<boolean>(false);
  // further info in offline popup
  const [active, setActive] = React.useState<boolean>(false);
  // small offline popup
  const [isClicked, setClicked] = React.useState<boolean>(false);
  // this is to close main offline popup
  const [close, setClose] = React.useState<boolean>(false);

  React.useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  const toggleOpenHandler = () => {
    setOpen((prev) => !prev);
  };

  const handleActive = () => {
    setActive((prev) => !prev);
  };

  const toggleNavPop = () => {
    setClicked((prev) => !prev);
  };

  const toggleClosePopup = () => {
    setClose((prev) => !prev);
  };

  const [isOnline, setOnline] = React.useState<boolean>(true); // Initialize with current online status

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      // Only run this code on the client side
      setOnline(navigator.onLine); // Initialize with current online status
      const handleOnline = () => setOnline(true);
      const handleOffline = () => setOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Cleanup function to remove event listeners
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.fixedHeader}>
          <div className={ isOnline? styles.pickupBnrOnline : styles.pickupBnrOffline}>
            <div className={styles.pickupBnrLeft}>
              <h3>
                <BuildingStorefrontIcon className="w-6" />
                New World Mt Roskill
              </h3>
              <h3>
                <ShoppingBagIcon className="w-6" />
                Collect from New World Mt Roskill
              </h3>
              <button className={styles.bookSlot}>Book a slot</button>
            </div>
            <div className={styles.pickupBnrRight}>
              <h3>
                <UserIcon className="w-6" />
                Login or register
              </h3>
            </div>
          </div>
          <div className={styles.headerTop}>
            <Link href="/" className="flex items-center">
              <Image src={NWLogo} alt="New World logo" className="w-25 p" />
            </Link>
            <div className={styles.searchBar}>
              <Search
                setSearchQuery={setSearchQuery}
                searchProducts={searchProducts}
              />
            </div>
            <div className={styles.headerTopRight}>
                 {/* This is the popup box on the navbar to give you info */}
              {isOnline ? null : (
                <button onClick={toggleNavPop} className={styles.offlineBtn}>
                  You&apos;re offline <CiWifiOff className="w-6 h-6" />
                </button>
              )}
              {isClicked ? (
                <div className={styles.smallPopup}>
                  <h3>Offline mode functionalities</h3>
                  <p>Browse product catalogues</p>
                  <p>
                    View product details such as decsription, images, and price
                  </p>
                  <p>Add products to the trolley</p>
                </div>
              ) : null}
              <Link href="/cart">
                <div className={styles.cartIcon}>
                  <TbShoppingCart className="w-6 h-6" />
                  <p>{cartItems}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <button onClick={toggleOpenHandler}>
            Groceries <ChevronDownIcon className="w-4" />
          </button>
          <button>Specials</button>
          <button>Everyday Low Price</button>
          <button>Mailer</button>
          <button>
            Recipes <ChevronDownIcon className="w-4" />
          </button>
          <button>
            Discover <ChevronDownIcon className="w-4" />
          </button>
          <button>Clubcard</button>
          <button>My Lists</button>
          <button>Ways to save</button>
        </div>
      </div>
      {/* this is the product tree filter thing */}
      {isOpen ? (
        <div className={styles.productTree}>
          <div className={styles.productTreeCat1}>
            <button>Featured </button>
            <button>Fresh Foods & Bakery</button>
            <button>Chilled, Frozen & Desserts</button>
          </div>
        </div>
      ) : null}
   
      {/* This is the main "you've lost connectivity" popup */}
      {isOnline
        ? null
        : !close && (
            <>
              <div className={active ? styles.popActive : styles.popup}>
                <div className={styles.wifiSymbol}>
                <CiWifiOff className={styles.reactIcon}/>
                </div>
                <div className={styles.popupTopBtn}>
                  <button onClick={toggleClosePopup}>
                    <XMarkIcon className="w-6" />
                  </button>
                </div>

                <div className={styles.popupBody}>
                  <h2>Offline mode activated</h2>
                  <div className={styles.bodyContent}>
                    <p>
                      Offline? Keep browsing, your trolley will sync when
                      you&apos;re online
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
                          View product details such as description, images, and
                          price
                        </p>
                        <p>Add products to the trolley</p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </>
          )}
    </>
  );
}
