import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieCredit } from "../../fetchMoviesAPI";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await MovieCredit(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMovie();
  }, [movieId]);
  {
    if (!cast) return <p>loading</p>;
  }

  return (
    <ul className={css.list}>
      {cast?.length !== 0 ? (
        cast.map((person) => (
          <li key={person.id} className={css.item}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
              alt={person.original_name}
              className={css.img}
            />
            <h4>{person.character}</h4>
            <p>{person.name}</p>
            <p>{person.popularity}</p>
          </li>
        ))
      ) : (
        <li>There is no info about the cast 😌.</li>
      )}
      {error && <p>{error}</p>}
    </ul>
  );
};
export default MovieCast;
