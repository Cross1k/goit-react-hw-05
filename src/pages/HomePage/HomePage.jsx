import { useEffect, useState } from "react";

import { trendingMovies } from "../../fetchMoviesAPI.js";
import { useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const list = async () => {
      try {
        setLoading(true);
        const data = await trendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    list();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <MovieList movies={movies} state={location} />
    </>
  );
};

export default HomePage;
