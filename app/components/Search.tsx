"use client";
import styles from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  setSearchQuery,
  handleSearch,
}: {
  setSearchQuery: any;
  handleSearch: () => void;
}) {
  const debouncedSearch = useDebouncedCallback((term) => {
    setSearchQuery(term);
    handleSearch();
  }, 300);

  return (
    <>
      <input
        type="text"
        placeholder="Search for anything!"
        className={styles.input}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={() => debouncedSearch(setSearchQuery)}
        className={styles.button}
      >
        <MagnifyingGlassIcon className="w-6" />
      </button>
      <button
        onClick={() => {
          setSearchQuery("pokemon?limit=100000&offset=0");
          handleSearch();
        }}
        className={styles.button}
      >
        Find all!
      </button>
    </>
  );
}
