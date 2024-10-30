import { Link, useLocation, useParams } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const { movieId } = useParams();
  const location = useLocation();

  return (
    <div>
      <div className={css.list}>
        {movies &&
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              id={movieId}
              state={location}
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
