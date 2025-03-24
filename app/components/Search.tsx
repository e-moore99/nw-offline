"use client";
import styles from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Search({
  setSearchQuery,
  placeholder,
}: {
  setSearchQuery: (query: string) => void;
  placeholder: string;
}) {
  // this is for updating the url with the search query
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch( term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`)
    console.log(term)
  }
  //   // next line and if/else also for updating url
  //   // const params = new URLSearchParams(searchParams);
  //   // if (term) {
  //   //   params.set("query", term);
  //   // } else {
  //   //   params.delete("query");
  //   // }
  //   // replace(`${pathname}?${params.toString()}`);
  //   setSearchQuery(term);
  //   handleSearch(term);
  // }, 300);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

  return (
    <>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search for anything!"
          className={styles.inputBox}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          defaultValue={searchParams.get('query')?.toString()} // this is for updating the url with the search query
        />
        <button onClick={() => handleSearch("")} className={styles.button}>
          <MagnifyingGlassIcon className="w-6" />
        </button>
        <button
          onClick={() => {
            setSearchQuery("pokemon?limit=100000&offset=0");
            handleSearch("pokemon?limit=100000&offset=0");
          }}
          className={styles.button}
        >
          Find all!
        </button>
      </div>
    </>
  );
}
