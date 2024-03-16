/** @format */

import { useRef } from "react";
import { useKey } from "../hooks/useKey";
const Search = ({ query, setQuery }) => {
  const inputElement = useRef(null);
  useKey("Enter", () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

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
