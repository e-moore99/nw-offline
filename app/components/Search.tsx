"use client";
import styles from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Search({
  setSearchQuery,
  searchProducts,
}: {
  setSearchQuery: (query: string) => void;
  searchProducts: () => void;
}) {
  // this is for updating the url with the search query
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();


  const debouncedSearch = useDebouncedCallback((term: string) => {
    // next line and if/else also for updating url
    // const params = new URLSearchParams(searchParams);
    // if (term) {
    //   params.set("query", term);
    // } else {
    //   params.delete("query");
    // }
    // replace(`${pathname}?${params.toString()}`);
    setSearchQuery(term);
    searchProducts(); 
  }, 300);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  return (
    <>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search for anything!"
          className={styles.inputBox}
          onChange={(e) => debouncedSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          // defaultValue={searchParams.get('query')?.toString()} // this is for updating the url with the search query
        />
        <button onClick={searchProducts} className={styles.button}>
          <MagnifyingGlassIcon className="w-6" />
        </button>
      </div>
    </>
  );
}
