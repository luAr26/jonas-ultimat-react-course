/** @format */

import { useState } from "react";
const Search = () => {
  const [query, setQuery] = useState("");
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
      />
    </>
  );
};
export default Search;
