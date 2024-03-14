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
import { omdbAPIKey } from "./omdbAPI";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleCloseMovie = () => setSelectedId(null);

  const handleSelectMovie = (id) => {
    setSelectedId((prevId) => {
      return prevId === id ? null : id;
    });
  };

  const handleAddToWatched = (movie) => {
    setWatched((prevWatched) => {
      return [...prevWatched, movie];
    });
  };

  const handleDeleteWatched = (id) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id)
    );
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
    const controller = new AbortController();
    const getMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${omdbAPIKey}&s="${query}"`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Something went wrong...");
        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);

          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    getMovies();

    return () => {
      controller.abort();
    };
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
              onAddToWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
