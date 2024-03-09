/** @format */

// import { useState } from "react";
const Search = ({ query, setQuery }) => {
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
