import { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { getImageUrl } from "../services/api";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { IoMdPlayCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const HeroSection = () => {
  const { trendingMovies, loading } = useMovies();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const feauteredMovies = trendingMovies.slice(0, 5);


  useEffect(() => {
    if (loading || feauteredMovies.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % feauteredMovies.length
        );
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [loading, feauteredMovies.length]);

  if (loading || feauteredMovies.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-neutral-900">
        <div className="animate-pulse flex items-center flex-cl gap-5">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-400">Loading movies...</p>
        </div>
      </div>
    );
  }

  const currentMovie = feauteredMovies[currentSlide];

  return (
    <div className="relative h-screen w-full bg-neutral-900">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-neutral-900 transition-all duration-700 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${getImageUrl(currentMovie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/70 to-neutral-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <div
            className={`transition-all duration-700 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-purple-800/90 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                FEATURED
              </span>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-300" />
                <span>{currentMovie.vote_average.toFixed(1)}</span>
              </div>
              <span className="text-neutral-400 text-2xl">
                <LuDot />
              </span>
              <span className="text-neutral-300 test-sm">
                {currentMovie.release_date.slice(0, 4)}
              </span>
              <>
                {currentMovie.adult && (
                  <>
                    <span className="text-neutral-400 text-2xl">
                      <LuDot />
                    </span>
                    <span className="text-neutral-300 bg-neutral-700 text-xs px-11.5 py-0.5">
                      18+
                    </span>
                  </>
                )}
              </>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentMovie.title}
            </h1>
            <p className="to-neutral-300 text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl">
              {currentMovie.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                <IoMdPlayCircle className="text-xl" />
                Watch Now
              </button>
              <button className="flex gap-2 items-center bg-neutral-800/80 hover:bg-neutral-700/80 text-white px-6 py-3 rounded-lg border border-neutral-600 transition-all">
                <FaPlus className="text-lg" />
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-0 left-0 flex justify-center gap-2 z-10">
        {feauteredMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => (
              setIsTransitioning(true),
              setTimeout(() => {
                setCurrentSlide(idx);
                setIsTransitioning(false);
              }, 500)
            )}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              currentSlide === idx
                ? "w-7 bg-purple-500"
                : "w-4 bg-neutral-600/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
