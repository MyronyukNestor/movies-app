const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/trending/movie/week?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getImageUrl = (path, size = "original") => {
  if (!path) {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/No_image_available_400_x_600.svg/400px-No_image_available_400_x_600.svg.png?20150903194733";
  } else {
    return `https://image.tmdb.org/t/p/${size}/${path}.jpg`;
  }
};

