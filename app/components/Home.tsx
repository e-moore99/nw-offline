import React from "react";
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
import Carrot from "@/public/carrot.png";
import Plate from "@/public/plate.jpg";
import NWShopping from "@/public/nw-shopping.png";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.salesBnr}>
        <h1>Why wait till Easter?</h1>
        <p>Hot Cross Buns are here, fresh and ready for you to enjoy.</p>
        <button>Shop now</button>
      </div>
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
              <h2>It's Baby Week at New World</h2>
              <p>Get the best of Baby & Toddler this week.</p>
            </div>
            <button>Shop now</button>
          </div>
        </div>
        <div className={styles.article1}>
          <Image src={Plate} alt="Food"></Image>
          <div className={styles.articleBottom}>
            <div>
              <h2>Our Chicken Pad Thai meal kit, that's now simply better</h2>
              <p>
                We've made one of our favourite meal kits, the chicken pad thai,
                simply better. Better still, pick one up tonight and see for
                yourself.
              </p>
            </div>
            <button>Shop now</button>
          </div>
        </div>
      </div>
      <div className={styles.shopWithUs}>
        <div className={styles.shopWUsLeft}>
          <h1>Why Shop Online With Us?</h1> <br />
          <h2>
            <ClockIcon className="w-12 text-red-600" />
            You shop, anytime
          </h2>
          <ul>
            With New World online, your local store's range and specials are all
            at your fingertips.
          </ul>
          <br />
          <h2>
            <Image src={Carrot} alt="Carrot"></Image>
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
    </div>
  );
};

export default HomePage;
