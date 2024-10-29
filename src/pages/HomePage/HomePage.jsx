import { useEffect, useState } from "react";
import css from "./HomePage.module.css";

import { trendingMovies } from "../../fetchMoviesAPI.js";
import { Link, useLocation, useParams } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();

  useEffect(() => {
    const list = async () => {
      try {
        const data = await trendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    list();
  }, []);

  return (
    <div className={css.list}>
      {movies &&
        movies.map((item) => (
          <Link
            state={{ from: location }}
            key={item.id}
            to={`/movies/${item.id}`}
            id={movieId}
            className={css.item}
          >
            {item.original_title}
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
