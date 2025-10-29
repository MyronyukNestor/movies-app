import { useEffect, useState } from "react";
import { fetchMovieDetails, getImageUrl } from "../services/api";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoClose, IoEarth } from "react-icons/io5";
import { FaStar, FaImdb } from "react-icons/fa";
import { IoMdPlayCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const MoviesDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  if (!movieId) return null;

  const formatRutTime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatRevenue = (revenue) => {
    if (!revenue) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      natation: "compact",
      maximumFractionDigits: 0,
    }).format(revenue);
  };

  return (
    <div
      onMouseDown={(e) => {
        e.target === e.currentTarget && onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/95 backdrop-blur-sm overflow-auto"
    >
      <div className="relative w-full max-w-5xl bg-neutral-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-700/80 text-white transition-all hover:bg-neutral-600/80 cursor-pointer"
        >
          <IoClose className="text-2xl" />
        </button>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p>Loading Details...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center">
              <MdReportGmailerrorred className="text-4xl" />
              <h2 className="text-xl font-bold mt-4">
                Failed to Load Movies Details
              </h2>
              <p className="mt-2 text-neutral-400">Error</p>
              <button
                onClick={onClose}
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : movie ? (
          <div>
            <div className="relative h-72 md:h-96 w-full">
              {movie.backdrop_path ? (
                <img
                  src={getImageUrl(movie.backdrop_path)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-neutral-800/70 to-transparent"></div>
            </div>
            <div className="p-6 md:p-8">
              <div className="md:flex gap-8 -mt-32 md:-mt-48 relative">
                <div className="w-32 md:w-64 flex-shrink-0 mb-4 md:mb-0">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-neutral-700">
                    {movie.poster_path ? (
                      <img
                        src={getImageUrl(movie.poster_path)}
                        alt=""
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-neutral-700 flex items-center justify-center">
                        <span className="text-neutral-500">
                          No Poster Available
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {movie.title}
                    {movie.release_date && (
                      <span className="text-neutral-400 font-normal ml-2">
                        ({movie.release_date.slice(0, 4)})
                      </span>
                    )}
                  </h1>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm items-center">
                    {movie.vote_average > 0 && (
                      <div className="flex items-center">
                        <FaStar className="text-yellow-300" />
                        <span className="ml-1 font-medium">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                    {movie.runtime > 0 && (
                      <span className="text-neutral-300">
                        {formatRutTime(movie.runtime)}
                      </span>
                    )}
                    {movie.release_date && (
                      <span className="text-neutral-300">
                        {movie.release_date}
                      </span>
                    )}
                    {movie.adult && (
                      <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded">
                        18+
                      </span>
                    )}
                  </div>

                  {movie.genres && movie.genres.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-xs"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {movie.tagline && (
                    <p className="mt-4 text-neutral-400 italic">
                      "{movie.tagline}"
                    </p>
                  )}

                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Overview
                    </h2>
                    <p className="text-neutral-300">
                      {movie.overview || "No overview available"}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                      <IoMdPlayCircle className="text-2xl" />
                      Watch Now
                    </button>
                    <button className="flex gap-2 items-center bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg transition-colors">
                      <FaPlus className="text-xl" />
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Details
                  </h2>
                  <div className="space-y-4">
                    {movie.production_companies &&
                      movie.production_companies.length > 0 && (
                        <div>
                          <h3 className="text-neutral-400 mb-1 text-sm">
                            Producation Companies
                          </h3>
                          <p className="text-white">
                            {movie.production_companies
                              .map((company) => company.name)
                              .join(", ")}
                          </p>
                        </div>
                      )}

                    {movie.production_countries &&
                      movie.production_countries.length > 0 && (
                        <div>
                          <h3 className="text-neutral-400 mb-1 text-sm">
                            Movies Producation Countries
                          </h3>
                          <p className="text-white">
                            {movie.production_countries
                              .map((country) => country.name)
                              .join(", ")}
                          </p>
                        </div>
                      )}

                    {movie.spoken_languages &&
                      movie.spoken_languages.length > 0 && (
                        <div>
                          <h3 className="text-neutral-400 mb-1 text-sm">
                            Languages
                          </h3>
                          <p className="text-white">
                            {movie.spoken_languages
                              .map((language) => language.english_name)
                              .join(", ")}
                          </p>
                        </div>
                      )}

                    {movie.budget > 0 && (
                      <div>
                        <h3 className="text-neutral-400 mb-1 text-sm">
                          Budget
                        </h3>
                        <p className="text-white">
                          {formatRevenue(movie.budget)}
                        </p>
                      </div>
                    )}

                    {movie.revenue > 0 && (
                      <div>
                        <h3 className="text-neutral-400 mb-1 text-sm">
                          Revenue
                        </h3>
                        <p className="text-white">
                          {formatRevenue(movie.revenue)}
                        </p>
                      </div>
                    )}

                    {movie.status && (
                      <div>
                        <h3 className="text-neutral-400 mb-1 text-sm">
                          Status
                        </h3>
                        <p className="text-white">{movie.status}</p>
                      </div>
                    )}

                    {movie.original_language && (
                      <div>
                        <h3 className="text-neutral-400 mb-1 text-sm">
                          Original Language
                        </h3>
                        <p className="text-white">
                          {movie.original_language.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl mb-4 font-semibold text-white">
                    Rating
                  </h2>
                  {movie.vote_average > 0 ? (
                    <div className="flex items-center">
                      <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center mr-4">
                        <span className="text-3xl font-bold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-neutral-300">
                          From {movie.vote_count.toLocaleString()} votes
                        </p>
                        <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-2">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{
                              width: `${(movie.vote_average / 10) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-400">No Rating Available</p>
                  )}

                  <div className="mt-8 flex gap-4">
                    {movie.homepage && (
                      <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-all "
                      >
                        <IoEarth />
                        Offical Website
                      </a>
                    )}

                    {movie.imdb_id && (
                      <a
                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
                      >
                        <FaImdb className="text-2xl" />
                        View on IMDB
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MoviesDetails;
