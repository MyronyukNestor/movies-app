import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { getImageUrl, searchMovies } from "../services/api";
import { useMovies } from "../context/MoviesContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { RiMovieFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const searchContainerRef = useRef(null);

  const { openMoviesDetails } = useMovies();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQuery);
          setSearchResult(result ? result.slice(0, 5) : []);
        } catch (error) {
          console.log(error);
        } finally {
          setIsSearching(false);
          setShowSearchResult(true);
        }
      } else {
        setSearchResult([]);
        setShowSearchResult(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResult(true);
    }
  };

  const handleClickOutside = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setShowSearchResult(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/watchlist") {
      setIsWatchlistOpen(true);
      setIsPlayerOpen(true);
    } else {
      setIsWatchlistOpen(false);
      setIsPlayerOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {!isPlayerOpen && (
        <header
          className={`fixed flex w-full z-50 transition-all duration-300  ${
            isScrolled || isWatchlistOpen
              ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  to="/"
                  onClick={() => scrollTo(0, 0)}
                  className="flex items-center"
                >
                  <span className="text-purple-500 font-bold text-3xl">
                    Cine<span className="text-white">Mix</span>
                  </span>
                </Link>
              </div>
              {!isWatchlistOpen && (
                <nav className="hidden lg:flex space-x-8">
                  <Link
                    to="/"
                    onClick={() => scrollTo(0, 0)}
                    className="text-white hover:text-purple-400 transition-all font-medium"
                  >
                    Home
                  </Link>

                  <a
                    href="#trending"
                    className="text-white hover:text-purple-400 transition-all font-medium"
                  >
                    Trending
                  </a>
                  <a
                    href="#popular"
                    className="text-white hover:text-purple-400 transition-all font-medium"
                  >
                    Popular
                  </a>
                  <a
                    href="#top-rated"
                    className="text-white hover:text-purple-400 transition-all font-medium"
                  >
                    Top Rated
                  </a>
                </nav>
              )}
              <div
                ref={searchContainerRef}
                className="hidden lg:block relative search-container"
              >
                <div className="flex items-center gap-3">
                  {!isWatchlistOpen && (
                    <div className="relative">
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleSearchFocus}
                        type="text"
                        placeholder="Search movies..."
                        className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />

                      <div className="absolute right-3 top-2.5 ">
                        <CiSearch className="text-gray-400 text-lg" />
                      </div>
                    </div>
                  )}
                  {user ? (
                    <UserButton>
                      <UserButton.MenuItems>
                        <UserButton.Action
                          label="My Watchlist"
                          labelIcon={<RiMovieFill />}
                          onClick={() => {
                            navigate("/watchlist"), scrollTo(0, 0);
                          }}
                        />
                      </UserButton.MenuItems>
                    </UserButton>
                  ) : (
                    <button
                      onClick={() => openSignIn()}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
                    >
                      Login
                    </button>
                  )}
                </div>
                {showSearchResult &&
                  searchResult &&
                  searchResult.length > 0 && (
                    <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                      <ul className="divide-y divide-neutral-700 ">
                        {searchResult.map((movie) => (
                          <li key={movie.id} className="hover:bg-neutral-700">
                            <button
                              onClick={() => {
                                openMoviesDetails(movie.id);
                              }}
                              className="flex items-center p-3 w-full text-left cursor-pointer"
                            >
                              <div className="w-10 h-10 bg-neutral-700 rounded overflow-hidden flex-shrink-0">
                                {movie.poster_path ? (
                                  <img
                                    src={getImageUrl(movie.poster_path)}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full text-center text-neutral-500 text-sm">
                                    No Image
                                  </div>
                                )}
                              </div>

                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-white truncate">
                                  {movie.title}
                                </p>
                                <p className="text-xs text-neutral-400">
                                  {movie.release_date.slice(0, 4)}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {showSearchResult &&
                  searchQuery.trim().length > 2 &&
                  (!searchResult || searchResult.length === 0) &&
                  !isSearching && (
                    <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                      <div className="p-4 text-center text-neutral-400 text-sm">
                        No movies found matching...
                      </div>
                    </div>
                  )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white"
              >
                {isMobileMenuOpen ? (
                  <IoClose className="text-2xl" />
                ) : (
                  <RxHamburgerMenu className="text-2xl" />
                )}
              </button>
            </div>
            {isMobileMenuOpen && (
              <div className="mt-4 pb-4 space-y-4 lg:hidden">
                <a
                  href="#"
                  className="block text-white hover:text-purple-400 transition-colors py-2"
                >
                  Home
                </a>
                <a
                  href="#trending"
                  className="block text-white hover:text-purple-400 transition-all font-medium"
                >
                  Trending
                </a>
                <a
                  href="#popular"
                  className="block text-white hover:text-purple-400 transition-all font-medium"
                >
                  Popular
                </a>
                <a
                  href="#top-rated"
                  className="block text-white hover:text-purple-400 transition-all font-medium"
                >
                  Top Rated
                </a>
                <div ref={searchContainerRef} className="relative mt-3 ">
                  <div className="flex flex-col gap-3">
                    <div className="relative w-48 focus-within:w-64 transition-all duration-300 bg-neutral-800/80 rounded-full">
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleSearchFocus}
                        type="text"
                        placeholder="Search movies..."
                        className="w-full bg-transparent text-white text-sm px-4 py-2 rounded-full focus:outline-none"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CiSearch className="text-gray-400 text-lg" />
                      </div>
                    </div>
                    {user ? (
                      <UserButton>
                        <UserButton.MenuItems />
                      </UserButton>
                    ) : (
                      <button
                        onClick={() => openSignIn()}
                        className="w-30 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
                      >
                        Login
                      </button>
                    )}
                  </div>

                  {showSearchResult &&
                    searchResult &&
                    searchResult.length > 0 && (
                      <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                        <ul className="divide-y divide-neutral-700">
                          {searchResult.map((movie) => (
                            <li key={movie.id} className="hover:bg-neutral-700">
                              <button
                                onClick={() => openMoviesDetails(movie.id)}
                                className="flex items-center p-3 w-full text-left"
                              >
                                <div className="w-10 h-14 bg-neutral-700 rounded-full overflow-hidden flex-shrink-0">
                                  {movie.poster_path ? (
                                    <img
                                      src={getImageUrl(movie.poster_path)}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full text-center text-neutral-500 text-xs">
                                      No Image
                                    </div>
                                  )}
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-medium text-white truncate">
                                    {movie.title}
                                  </p>
                                  <p className="text-xs text-neutral-400">
                                    {movie.release_date.slice(0, 4)}
                                  </p>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {showSearchResult &&
                    searchQuery.trim().length > 2 &&
                    (!searchResult || searchResult.length === 0) &&
                    !isSearching && (
                      <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                        <div className="p-4 text-center text-neutral-400 text-sm">
                          No movies found matching...
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
