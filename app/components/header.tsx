import styles from "./header.module.css";
import Link from "next/link";
import Search from "./Search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Header({
  setSearchQuery,
  handleSearch,
}: {
  setSearchQuery: any;
  handleSearch: () => void;
}) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>Welcome to Ecomm test site!</h1>
          <Link href="/cart">
            <div>
              <ShoppingCartIcon className="w-6" />
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
