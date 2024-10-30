import { Outlet, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import MovieSearchForm from "../../components/MovieSearchForm/MovieSearchForm.jsx";
import { useEffect, useState } from "react";
import { searchingMovies } from "../../fetchMoviesAPI.js";
import Loader from "../../components/Loader/Loader.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const q = searchParams.get("q");
  useEffect(() => {
    if (!q) return;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setMovies(null);
        const { results } = await searchingMovies(q);
        if (results.length === 0) {
          return alert("There is no movies");
        }
        setMovies(results);
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [q]);

  const onSearch = (query) => {
    setMovies(null);
    setSearchParams({ q: query });
  };

  return (
    <div>
      <MovieSearchForm onSearch={onSearch} />
      {loading && <Loader />}
      <MovieList movies={movies} />
      <Outlet />
    </div>
  );
};

export default MoviesPage;
