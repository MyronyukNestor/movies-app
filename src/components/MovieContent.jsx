import { useMovies } from "../context/MoviesContext";
import GenreSection from "./GenreSection";
import HeroSection from "./HeroSection";
import MoviesDetails from "./MoviesDetails";
import MovieSlider from "./MovieSlider";

const MovieContent = () => {
  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    selectedMovieId,
    closeMoviesDetails,
  } = useMovies();

  return (
    <div>
      <HeroSection />
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-950">
        <MovieSlider
          title="Trending This Week"
          subtitle="Stay updated with what everyone's watching"
          movies={trendingMovies}
          id="trending"
        />
        <MovieSlider
          title="Popular Movies"
          subtitle="Most watched movies right now"
          movies={popularMovies}
          id="popular"
        />
        <GenreSection />
        <MovieSlider
          title="Top Rated Movies"
          subtitle="Highest rated movies of all time"
          movies={topRatedMovies}
          id="top-rated"
        />
      </div>
      {selectedMovieId && (
        <MoviesDetails movieId={selectedMovieId} onClose={closeMoviesDetails} />
      )}
    </div>
  );
};

export default MovieContent;
