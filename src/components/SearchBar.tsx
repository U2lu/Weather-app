import type { Dispatch, RefObject, SetStateAction } from "react";

type SearchBarProps = {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  loading: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
};

const SearchBar = ({
  city,
  setCity,
  onSubmit,
  loading,
  inputRef,
}: SearchBarProps) => {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="relative"
    >
      <label htmlFor="city-search" className="sr-only">
        Search for a city
      </label>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/50"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        ref={inputRef}
        id="city-search"
        name="city"
        type="search"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search location…"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-[5.5rem] text-sm text-white outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-white/50 focus:border-white/25 focus:bg-white/10 focus:ring-2 focus:ring-white/10 [&::-webkit-search-cancel-button]:hidden"
      />

      <button
        type="submit"
        disabled={loading}
        aria-label={loading ? "Searching" : "Search"}
        className="absolute right-2 top-1/2 grid min-w-[72px] -translate-y-1/2 place-items-center rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/70 transition-[transform,background-color,color] duration-150 ease-out hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-transparent"
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="size-4 motion-safe:animate-[spin_600ms_linear_infinite] rounded-full border-2 border-white/25 border-t-white/90"
          />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

export default SearchBar;
