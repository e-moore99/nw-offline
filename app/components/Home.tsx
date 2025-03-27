import React, { useEffect } from "react";
import styles from "./Home.module.css";
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserIcon,
  UserPlusIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { PiCarrot } from "react-icons/pi";
import Plate from "@/public/plate.jpg";
import NWShopping from "@/public/nw-shopping.png";
import Butchery from "@/public/butchery.svg";
import Drinks from "@/public/drinks.svg";
import FrozenFoods from "@/public/frozen-foods.svg";
import FruitVeg from "@/public/fruit-vegetables.svg";
import Liquor from "@/public/liquor.svg";
import Pantry from "@/public/pantry.svg";
import Pets from "@/public/pets.svg";
import Snacks from "@/public/snack-foods.svg";

const HomePage = () => {
  const [isOnline, setOnline] = React.useState<boolean>(true); // Initialize with current online status

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setOnline(navigator.onLine); // Initialize with current online status
      const handleOnline = () => setOnline(true);
      const handleOffline = () => setOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Cleanup function removes the event listeners
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);
  return (
    <div className={styles.home}>
      <div className={isOnline ? styles.salesBnr : styles.salesBnrOffline}>
        <h1>Why wait till Easter?</h1>
        <p>Hot Cross Buns are here, fresh and ready for you to enjoy.</p>
        <button>Shop now</button>
      </div>
      <div className={styles.categoryBtn}>
        <button>
          <div className={styles.categoryBtnCircle}>
            <CalendarDaysIcon className="w-10" />{" "}
          </div>
          <p className={styles.categories}>Book a slot</p>
        </button>
        <button>
          <div className={styles.categoryBtnCircle}>
            <CurrencyDollarIcon className="w-10" />{" "}
          </div>
          <p className={styles.categories}>Specials</p>
        </button>
        <button>
          <div className={styles.categoryBtnCircle}>
            <UserIcon className="w-10" />
          </div>
          <p className={styles.categories}>Login</p>
        </button>
        <button className={styles.registerBtn}>
          <div className={styles.categoryBtnCircle}>
            <UserPlusIcon className="w-10" />
          </div>
          <p className={styles.categories}>Register</p>
        </button>
        <button className={styles.categories}>Beer, Cider & Wine</button>
        <button className={styles.categories}>Butchery</button>
        <button className={styles.categories}>Drinks</button>
        <button className={styles.categories}>Chilled, Frozen & Dessert</button>
        <button className={styles.categories}>Snack Foods</button>
        <button className={styles.categories}>Fruit & Vegetables</button>
        <button className={styles.categories}>Pantry</button>
        <button className={styles.categories}>Pets</button>
      </div>
      <div className={styles.shopSpecials}>
        <div className={styles.shopSpecialsbody}>
          <h1>Shop our specials! </h1>
          <button>View all</button>
        </div>
      </div>
      {isOnline ? (
        <div className={styles.articles}>
          <div className={styles.article1}>
            <Image src={Plate} alt="Food"></Image>
            <div className={styles.articleBottom}>
              <div>
                <h2>Need dinner, fast?</h2>
                <p>
                  Check out our collection of tasty dinner ideas, ready in 35
                  minutes or less.
                </p>
              </div>
              <button>See the recipes</button>
            </div>
          </div>
          <div className={styles.article1}>
            <Image src={Plate} alt="Food"></Image>
            <div className={styles.articleBottom}>
              <div>
                <h2>It&apos;s Baby Week at New World</h2>
                <p>Get the best of Baby & Toddler this week.</p>
              </div>
              <button>Shop now</button>
            </div>
          </div>
          <div className={styles.article1}>
            <Image src={Plate} alt="Food"></Image>
            <div className={styles.articleBottom}>
              <div>
                <h2>
                  Our Chicken Pad Thai meal kit, that&apos;s now simply better
                </h2>
                <p>
                  We&apos;ve made one of our favourite meal kits, the chicken
                  pad thai, simply better. Better still, pick one up tonight and
                  see for yourself.
                </p>
              </div>
              <button>Shop now</button>
            </div>
          </div>
        </div>
      ) : null}
      {isOnline ? (
        <div className={styles.shopWithUs}>
          <div className={styles.shopWUsLeft}>
            <h1>Why Shop Online With Us?</h1> <br />
            <h2>
              <ClockIcon className="w-12 text-red-600" />
              You shop, anytime
            </h2>
            <ul>
              With New World online, your local store&apos;s range and specials
              are all at your fingertips.
            </ul>
            <br />
            <h2>
              <PiCarrot className="w-12 h-12 text-red-600" />
              We pick the freshest & finest
            </h2>
            <ul>
              Our personal shoppers pick your items just as you would. You can
              even leave them instructions.
            </ul>
            <br />
            <h2>
              <TruckIcon className="w-12 text-red-600" />
              We deliver, or you pick up
            </h2>
            <ul>
              Straight to your door, or on your way home. Get your groceries the
              way that suits you.
            </ul>
          </div>
          <div className={styles.shopWUsRight}>
            <Image src={NWShopping} alt="Shopping"></Image>
          </div>
        </div>
      ) : (
        <div className={styles.shopWithUs}>
          <div className={styles.shopWUsLeft}>
            <h1>Why Shop Offline With Us?</h1> <br />
            <h2>
              <ClockIcon className="w-12 text-red-600" />
              You shop, anytime
            </h2>
            <ul>
              With New World online, your local store&apos;s range and specials
              are all at your fingertips.
            </ul>
            <br />
            <h2>
              <PiCarrot className="w-12 h-12 text-red-600" />
              We pick the freshest & finest
            </h2>
            <ul>
              Our personal shoppers pick your items just as you would. You can
              even leave them instructions.
            </ul>
            <br />
            <h2>
              <TruckIcon className="w-12 text-red-600" />
              We deliver, or you pick up
            </h2>
            <ul>
              Straight to your door, or on your way home. Get your groceries the
              way that suits you.
            </ul>
          </div>
          <div className={styles.shopWUsRight}>
            <Image src={NWShopping} alt="Shopping"></Image>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
