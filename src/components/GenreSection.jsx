import { useMovies } from "../context/MoviesContext";
import { fetchMoviesByGenre, getImageUrl } from "../services/api";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdPlayCircle } from "react-icons/io";

const GenreSection = () => {
  const { genres, openMoviesDetails, loading } = useMovies();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loadingGenreMovies, setLoadingGenreMovies] = useState(false);

  useEffect(() => {
    if (!loading && genres.length > 0) {
      setSelectedGenre(genres[0]);
    }
  }, [loading, genres]);

  useEffect(() => {
    const loadGenreMovies = async () => {
      if (!selectedGenre) return;
      setLoadingGenreMovies(true);
      const movies = await fetchMoviesByGenre(selectedGenre.id);
      setGenreMovies(movies.slice(0, 12));
      setLoadingGenreMovies(false);
    };
    loadGenreMovies();
  }, [selectedGenre]);

  if (loading || !selectedGenre) {
    return (
      <section className="py-12 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Browse by Genre
        </h2>
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {genres.slice(0, 11).map((genre) => (
              <button
                onClick={() => setSelectedGenre(genre)}
                key={genre.id}
                className={`px-4 py-2 rounded-md transition-colors text-sm cursor-pointer ${
                  selectedGenre?.id === genre.id
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        {loadingGenreMovies ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {genreMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => openMoviesDetails(movie.id)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative rounded-lg overflow-hidden bg-neutral-800">
                  <div className="relative">
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt="Movie Poster"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-300" />
                          <span className="text-yellow-400 text-sm font-medium">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-neutral-400 text-sm">
                          {movie.release_date.slice(0, 4)}
                        </span>
                      </div>

                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md flex items-center justify-center gap-1 transition-all text-sm">
                        <IoMdPlayCircle className="text-xl" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-white text-sm font-medium truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-300" />
                      <span className="text-neutral-400 text-xs">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {movie.release_date.slice(0, 4)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GenreSection;
