/** @format */

import { useEffect, useRef } from "react";
const Search = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    console.log(inputElement.current);
    const callback = (e) => {
      if (document.activeElement === inputElement.current) return;

      if (e.code === "Enter") {
        inputElement.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);
  return (
    <>
      <input
        type='text'
        className='search'
        placeholder='Search movies...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id='search'
        name='search'
        ref={inputElement}
      />
    </>
  );
};
export default Search;
