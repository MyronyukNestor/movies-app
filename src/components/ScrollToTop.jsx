import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        type="button"
        className={`bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 focus:outline-none cursor-pointer ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-10 "
        }`}
      >
        <IoIosArrowUp className="text-xl" />
      </button>
    </div>
  );
};

export default ScrollToTop;
