import { MdMovieFilter } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useMovies } from "../context/MoviesContext";
import { getImageUrl } from "../services/api";
import { FaStar } from "react-icons/fa";
import { IoMdPlayCircle } from "react-icons/io";

const Watchlist = () => {
  const navigate = useNavigate();

  const { watchlist, openMoviesDetails } = useMovies();

  return (
    <div className="min-h-screen bg-neutral-900 text-white py-30 px-4 md:px-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer ml-40"
      >
        <IoArrowBackOutline className="text-2xl text-purple-500" />
        Back to Home
      </button>
      <div className="max-w-7xl mx-auto mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <MdMovieFilter className="text-purple-500" />
            My Watchlist
          </h1>
          <p className="text-neutral-400">Track movies you want to watch</p>
        </div>
        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <MdMovieFilter className="text-6xl text-neutral-700 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-neutral-400 mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-neutral-500">
              Add movies from the browse page to start your watchlist
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="flex flex-wrap gap-5 ">
              {watchlist.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => openMoviesDetails(movie.id)}
                  className="w-[200px] md:w-[240px] relative group cursor-pointer"
                >
                  <div className="rounded-lg overflow-hidden bg-neutral-800">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={getImageUrl(movie.poster_path, "w500")}
                        alt="poster"
                        className="w-full h-90 group-hover:scale-110 group-hover:opacity-35 object-cover transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                          <div className="flex items-center justify-between">
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
                          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm cursor-pointer">
                            <IoMdPlayCircle className="text-xl" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white text-sm font-medium truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-300 text-sm" />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
