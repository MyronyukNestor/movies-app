import { FaTwitter, FaInstagram } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

const Footer = () => {
  return (
    <footer className=" text-neutral-400 bg-neutral-900 border-t border-neutral-800 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="mb-6 inline-block">
              <span className="text-purple-500 font-bold text-2xl">
                Cine<span className="text-white">Mix</span>
              </span>
            </a>
            <p className="mb-4 text-sm">
              Discover and explore the latest movies from around the world.
              CineMix gives you access to a vast collection of films across all
              genres.
            </p>
            <div className="space-x-4 flex">
              <a
                href="#"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <ImFacebook2 className="text-2xl" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#trending"
                  className="hover:text-purple-400 transition-all"
                >
                  Trending
                </a>
              </li>
              <li>
                <a
                  href="#popular"
                  className="hover:text-purple-400 transition-all"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href="#top-rated"
                  className="hover:text-purple-400 transition-all"
                >
                  Top Rated
                </a>
              </li>
              <li>
                <a
                  href="#genres"
                  className="hover:text-purple-400 transition-all"
                >
                  Browse by Genre
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  About US
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay up to date with the latest movies and news
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  placeholder="Your email address"
                  type="email"
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                />
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-xs">
            &copy; 2025 <a href="">CineMix.</a> All Right Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
            <a href="" className="hover:text-purple-400 transition-all">
              Terms of Service
            </a>
            <a href="" className="hover:text-purple-400 transition-all">
              Privacy Policy
            </a>
            <a href="" className="hover:text-purple-400 transition-all">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
