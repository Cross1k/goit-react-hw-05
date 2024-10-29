import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { searchingMovies } from "../../fetchMoviesAPI.js";
import { useEffect, useState } from "react";
import css from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { movieId } = useParams();
  const location = useLocation();
  const q = searchParams.get("q");

  useEffect(() => {
    if (!q) return;
    const fetchMovies = async () => {
      try {
        setMovies(null);
        const { results } = await searchingMovies(q);
        if (results.length === 0) {
          return alert("There is no movies");
        }
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [q]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() === "") {
      return alert("Please enter search term!");
    }
    setSearchParams({ q: topic });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="topic" placeholder="Enter movie name..." />
        <button type="submit">Search</button>
      </form>
      <div className={css.list}>
        {movies &&
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              id={movieId}
              state={{ from: location }}
              className={css.item}
            >
              {movie.original_title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MovieList;
