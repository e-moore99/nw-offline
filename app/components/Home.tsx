import React from "react";
import styles from "./Home.module.css";
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

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
        <button>
          <div className={styles.categoryBtnCircle}>
            <UserPlusIcon className="w-10" />
          </div>
          Register
        </button>
        <button>Beer, Cider & Wine</button>
        <button>Butchery</button>
      </div>
      <div className={styles.shopSpecials}>
        <h1>Shop Specials</h1>
      </div>
      <div className={styles.articles}>
        <h1>Articles</h1>
      </div>
    </div>
  );
};

export default HomePage;
