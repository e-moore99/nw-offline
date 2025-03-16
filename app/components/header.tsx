import styles from "./header.module.css";
import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon, WifiIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAppSelector } from "@/redux/store";
import NWLogo from "@/public/nw-logo.svg";
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
  const [isClicked, setClicked] = React.useState<boolean>(false);

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

  const [isOnline, setOnline] = React.useState<boolean>(true);

  // if (!navigator.onLine) {
  //   setTimeout(() => {
  //     setOnline(false);
  //   }, 2000);
  // } else {
  //   setOnline(true);
  // }

  // const updateNetworkStatus = () => {
  //   setOnline(navigator.onLine);
  // };

  // //   sometimes, the load event does not trigger on some browsers, that is why manually calling updateNetworkStatus on initial mount
  // React.useEffect(() => {
  //   updateNetworkStatus();
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("online", updateNetworkStatus);
  //   window.addEventListener("offline", updateNetworkStatus);

  //   return () => {
  //     window.removeEventListener("online", updateNetworkStatus);
  //     window.removeEventListener("offline", updateNetworkStatus);
  //   };
  // }, [navigator.onLine]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.fixedHeader}>
        <div className={styles.pickupBnr}>
          <div className={styles.pickupBnrLeft}>
          <h3>New World Mt Roskill</h3>
          <h3>Collect from New World Mt Roskill</h3>
          <button>Book a slot</button>
          </div>
          <div className={styles.pickupBnrRight}>
          <button onClick={toggleNavPop} className={styles.offlineBtn}>
              You're offline
            </button>

            <button onClick={toggleOpenHandler}>
              <WifiIcon className="w-6" />
            </button>
            <h3>Login or register</h3>
          </div>
        </div>
        <div className={styles.headerTop}>
          <Link href="/" className="flex items-center">
            <Image src={NWLogo} alt="New World logo" className="w-25 p" />
          </Link>
          <div className={styles.searchBar}>
          <Search setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
          </div>
          <div className={styles.headerTopRight}>
            
            <Link href="/cart">
              <div className={styles.cartIcon}>
                <ShoppingCartIcon className="w-6" />
                <p>{cartItems}</p>
              </div>
            </Link>
          </div>
        </div>
        </div>
        <div className={styles.headerBottom}>
          <button>Groceries <ChevronDownIcon className="w-4"/> </button>
          <button>Specials</button>
          <button>Everyday Low Price</button>
          <button>Mailer</button>
          <button>Recipes <ChevronDownIcon className="w-4"/></button>
          <button>Discover <ChevronDownIcon className="w-4"/></button>
          <button>Clubcard</button>
          <button>My Lists</button>
          <button>Ways to save</button>
        </div>
      </div>
      {/* This is the popup box on the navbar to give you info */}
      {isClicked ? (
        <div className={styles.smallPopup}>
          <h3>Offline mode functionalities</h3>
          <p>Browse product catalogues</p>
          <p>View product details such as decsription, images, and price</p>
          <p>Add products to the trolley</p>
        </div>
      ) : null}
      {/* This is the main "you've lost connectivity" popup */}
      {navigator.onLine ? null : (
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
      )}
      ;
    </>
  );
}
