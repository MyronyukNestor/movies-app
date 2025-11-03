import { Route, Routes, useLocation } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home";
import { useMovies } from "./context/MoviesContext";
import MoviesDetails from "./components/MoviesDetails";
import Player from "./pages/Player";

const App = () => {

  const { selectedMovieId, closeMoviesDetails } = useMovies();

  return (
    <div>
      <Navbar />
      <div className="text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
        {selectedMovieId && (
          <MoviesDetails
            movieId={selectedMovieId}
            onClose={closeMoviesDetails}
          />
        )}
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
};

export default App;
