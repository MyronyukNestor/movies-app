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

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [trending, popular, topRated, genreList, byGenre] =
          await Promise.all([
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
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
