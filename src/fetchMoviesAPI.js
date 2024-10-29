import axios from "axios";

const moviesInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const options = {
  params: {
    // query: null,
    language: "en-US",
    include_adult: false,
  },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjhiMTJlN2EyYjUxODFjZTEzYjc5NTFjMWZiYTJiMiIsIm5iZiI6MTczMDAyNjI5MC4wMzEwMDUsInN1YiI6IjY3MWUxOWUxNDI3YzVjMTlmMDI2M2M3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fl1JZpGQQTZkXVtAgkLNYuHSkswhQ9n6dTUMsjq6ecY",
  },
};

export const trendingMovies = async () => {
  const { data } = await moviesInstance.get("/trending/movie/day", options);
  return data;
};

export const searchingMovies = async (q) => {
  const optionsForSearch = {
    ...options,
    params: { query: q, ...options.params },
  };

  const { data } = await moviesInstance.get("/search/movie", optionsForSearch);
  return data;
};

export const MovieDetails = async (id) => {
  const { data } = await moviesInstance.get(`/movie/${id}`, options);
  return data;
};

export const MovieReview = async (id) => {
  const { data } = await moviesInstance.get(`/movie/${id}/reviews`, options);
  return data;
};

export const MovieCredit = async (id) => {
  const { data } = await moviesInstance.get(`/movie/${id}/credits`, options);
  return data;
};
