import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "../services/api";

const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

const MoviesProvider = (props) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("watchlist"));
      return saved || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [trending, popular, topRated, genreList] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchGenres(),
        ]);
        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setGenres(genreList);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, []);

  const openMoviesDetails = (moviesId) => {
    setSelectedMovieId(moviesId);
    document.body.style.overflow = "hidden";
  };

  const closeMoviesDetails = () => {
    setSelectedMovieId(null);
    document.body.style.overflow = "";
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [movie, ...prev]
    );
  };

  const contextValue = {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    genres,
    loading,
    error,
    selectedMovieId,
    openMoviesDetails,
    closeMoviesDetails,
    addToWatchlist,
    watchlist,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
