"use client";
import styles from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const { replace } = useRouter();

  // const handleSearch = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("page", "1");
  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }
  //   replace(`${pathName}?${params.toString()}`);
  // }, 60);

  return (
    <>
      <input
        type="text"
        placeholder="Search for anything!"
        className={styles.input}
        // onChange={(e) => {
        //   handleSearch(e.target.value);
        // }}
        // onChange={(e) => setSearchQuery(e.target.value)}
        onChange={(e) => setSearchQuery(e.target.value)}
        // defaultValue={searchParams.get("query")?.toString()}
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
      {/* <button onClick={setSearchQuery("pokemon?limit=100000&offset=0")} >Find all!</button> */}
    </>
  );
}
