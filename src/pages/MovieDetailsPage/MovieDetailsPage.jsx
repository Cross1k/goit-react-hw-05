import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { MovieDetails } from "../../fetchMoviesAPI";

import css from "./MovieDetailsPage.module.css";
import { clsx } from "clsx";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setError(null);
        const data = await MovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        // console.log(error);
        setError(error.message);
      }
    };
    fetchMovie();
  }, [movieId]);

  const backUrl = location.state?.from ?? "/movies";
  const goBack = () => navigate(backUrl);

  const buildCssClasses = ({ isActive }) => clsx(isActive && css.active);

  return (
    <div>
      <button onClick={goBack} className={css.btn}>
        back
      </button>
      {!movie ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className={css.info}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.tagline}
              className={css.img}
            />
            <div>
              <h3 className={css.title}>{movie.original_title}</h3>
              <p className={css.overview}>{movie.overview}</p>
              <div className={css.genres}>
                {movie.genres.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            </div>
          </div>
          <ul className={css.list}>
            <li>
              <NavLink
                className={buildCssClasses}
                state={{ from: backUrl ?? "/movies" }}
                to="reviews"
              >
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                className={buildCssClasses}
                state={{ from: backUrl ?? "/movies" }}
                to="cast"
              >
                Cast
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;