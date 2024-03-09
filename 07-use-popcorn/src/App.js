/** @format */

import { useState, useEffect } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import MovieDetails from "./components/MovieDetails";

const omdbAPIKey = "f0ea93e0";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const tempQuery = "interstellar";
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);

  const handleCloseMovie = () => setSelectedId(null);

  const handleSelectMovie = (id) => {
    setSelectedId((prevId) => {
      return prevId === id ? null : id;
    });
  };

  // useEffect(() => {
  //   console.log("After initial render.");
  // }, []);

  // useEffect(() => {
  //   console.log("After every render.");
  // });

  // useEffect(() => {
  //   console.log("D");
  // }, [query]);

  // console.log("During render.");

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${omdbAPIKey}&s="${query}"`
        );
        if (!response.ok) throw new Error("Something went wrong...");
        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        console.log(data.Search);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();

    return () => {};
  }, [query]);

  return (
    <>
      <Navbar movies={movies}>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
