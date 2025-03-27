"use client";
import styles from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const debouncedSearch = useDebouncedCallback((term: string) => {
    if (term) {
      router.push(`/search?query=${term}`);
    }
  }, 300);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const term = (e.target as HTMLInputElement).value;
      if (term) {
        router.push(`/search?query=${term}`);
      }
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
        />
        <button className={styles.button}>
          <MagnifyingGlassIcon className="w-6" />
        </button>
      </div>
    </>
  );
}
