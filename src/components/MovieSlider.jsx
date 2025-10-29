import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoMdPlayCircle } from "react-icons/io";
import { getImageUrl } from "../services/api";
import { useRef, useState } from "react";
import { useMovies } from "../context/MoviesContext";

const MovieSlider = ({ movies, title, subtitle = "", id }) => {
  const sliderRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const { openMoviesDetails } = useMovies();

  const scroll = (direction) => {
    if (isScrolling) return;
    setIsScrolling(true);
    const { current } = sliderRef;
    const scrollAmount =
      direction === "left"
        ? -current.clientWidth * 0.75
        : current.clientWidth * 0.75;

    current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="py-12" id={id}>
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-8">
          <div className="text-2xl md:text-3xl font-bold text-white ">
            <h2>{title}</h2>
            {subtitle && (
              <p className="text-neutral-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className="relative">
          <div
            ref={sliderRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex space-x-3 overflow-x-hidden scrollbar-hide pb-4 snap-x"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => openMoviesDetails(movie.id)}
                className="min-w-[200px] md:min-w-[240px] snap-start relative group cursor-pointer"
              >
                <div className="rounded-lg overflow-hidden bg-neutral-800">
                  <div className="relative aspect-[2/3]">
                    <img
                      src={getImageUrl(movie.poster_path, "w500")}
                      alt="poster"
                      className="w-full h-full group-hover:scale-110 group-hover:opacity-35 object-cover transition-all duration-300"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300`}
                    >
                      <div className="transform traslate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
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
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm">
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
                      <span className="ext-neutral-400 text-xs">
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
      </div>
    </section>
  );
};

export default MovieSlider;
