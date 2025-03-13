import React from 'react'
import styles from './Home.module.css'
import { CurrencyDollarIcon, CalendarDaysIcon, ChevronDownIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";


const HomePage = () => {
  return (
    <div className={styles.home}>
    <div className={styles.salesBnr}>
    Meat week!
    </div>
    <div className={styles.categoryBtn}>
    <button> <CalendarDaysIcon className='w-10'/> Book a slot</button>
    <button> <CurrencyDollarIcon className='w-10' /> Specials</button>
    <button> <UserIcon className='w-10' /> Login</button>
    <button> <UserPlusIcon className='w-10' /> Register</button>
    <button>Beer, Cider & Wine</button>
    <button>Butchery</button>
    </div>
    </div>
  )
}

export default HomePage
