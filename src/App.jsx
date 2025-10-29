import Footer from "./components/Footer";
import MovieContent from "./components/MovieContent";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main>
        <MovieContent />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
