import React from "react";
import styles from "./Home.module.css";
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  UserIcon,
  UserPlusIcon,
  ClockIcon,
  TruckIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import NWLogo from "@/public/nw-logo.svg";
import Image from "next/image";
import Carrot from "@/public/carrot.png";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.salesBnr}>Meat week!</div>
      <div className={styles.categoryBtn}>
        <button>
          <div className={styles.categoryBtnCircle}>
            <CalendarDaysIcon className="w-10" />{" "}
          </div>
          Book a slot
        </button>
        <button>
          <div className={styles.categoryBtnCircle}>
            <CurrencyDollarIcon className="w-10" />{" "}
          </div>
          Specials
        </button>
        <button>
          <div className={styles.categoryBtnCircle}>
            <UserIcon className="w-10" />
          </div>
          Login
        </button>
        <button className={styles.registerBtn}>
          <div className={styles.categoryBtnCircle}>
            <UserPlusIcon className="w-10" />
          </div>
          Register
        </button>
        <button>Beer, Cider & Wine</button>
        <button>Butchery</button>
        <button>Drinks</button>
        <button>Chilled, Frozen & Dessert</button>
        <button>Snack Foods</button>
        <button>Fruit & Vegetables</button>
        <button>Pantry</button>
        <button>Pets</button>
      </div>
      <div className={styles.shopSpecials}>
        <h1>Shop Specials</h1>
      </div>
      <div className={styles.articles}>
        <h1>Articles</h1>
      </div>
      <div className={styles.shopWithUs}>
        <div className={styles.shopWUsLeft}>
        <h1>Why Shop Online With Us?</h1> <br />
        <h2><ClockIcon className="w-12 text-red-600" />You shop, anytime</h2>
        <ul>With New World online, your local store's range and specials are all at your fingertips.</ul>
        <br />
        <h2>
        <Image src={Carrot} alt="Carrot"></Image>
        We pick the freshest & finest</h2>
        <ul>Our personal shoppers pick your items just as you would. You can even leave them instructions.</ul>
        <br />
        <h2><TruckIcon className="w-12 text-red-600" />We deliver, or you pick up</h2>
        <ul>Straight to your door, or on your way home. Get your groceries the way that suits you.</ul>
        </div>
        <div className={styles.shopWUsRight}>
        <Image src={NWLogo} alt="Logo"></Image>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
