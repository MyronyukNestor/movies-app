import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { fetchMovieTrailer } from "../services/api";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movieTrailer, setMovieTrailer] = useState({
    name: "",
    key: "",
    published_at: "",
  });

  const movieDate = new Date(movieTrailer?.published_at);
  const movieReleaseMonth = movieDate.toLocaleString("en-US", {
    month: "long",
  });
  const movieReleaseDay = movieDate.getDate();
  const movieReleaseYear = movieDate.getFullYear();

  useEffect(() => {
    const handleMovieTrailer = async () => {
      try {
        const data = await fetchMovieTrailer(id);

        if (!data?.results?.length) {
          setMovieTrailer(null);
          return;
        }

        const officialTrailers = data.results.filter(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
        );
        const trailerToShow =
          officialTrailers[0] ||
          data.results.find((video) => video.type === "Trailer") ||
          data.results[0];

        setMovieTrailer(trailerToShow);
      } catch (error) {
        console.error(error);
      }
    };
    handleMovieTrailer();
  }, [id]);

  return (
    <div className="h-screen fixed inset-0 z-100 flex flex-col justify-center items-center bg-black">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 p-1 rounded-full border-3 border-purple-500 cursor-pointer"
      >
        <IoArrowBackOutline className="text-2xl text-purple-500" />
      </button>
      {movieTrailer === null ? (
        <h1 className="text-3xl text-neutral-400">Trailer not available 😢</h1>
      ) : (
        <>
          <iframe
            className="rounded-xl"
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${movieTrailer?.key}`}
            title="trailer"
            allowFullScreen
          ></iframe>
          <div className="flex items-center justify-between w-[90%] text-neutral-400 mt-2 text-sm">
            <p>{`${movieReleaseMonth} ${movieReleaseDay}, ${movieReleaseYear}`}</p>
            <p>{movieTrailer?.name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
