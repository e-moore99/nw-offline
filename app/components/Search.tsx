"use client";
import styles from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  setSearchQuery,
  handleSearch,
}: {
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}) {
  const debouncedSearch = useDebouncedCallback((term: string) => {
    setSearchQuery(term);
    handleSearch();
  }, 300);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search for anything!"
        className={styles.input}
        onChange={(e) => debouncedSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className={styles.button}>
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
