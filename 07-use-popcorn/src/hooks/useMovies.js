/** @format */

// create useMovies hook
import { useState, useEffect } from "react";
import { omdbAPIKey } from "../omdbAPI";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
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
    // handleCloseMovie();
    getMovies();

    return () => {
      controller.abort();
    };
  }, [query, callback]);

  return { movies, isLoading, error };
};
