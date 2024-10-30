import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MovieReview } from "../../fetchMoviesAPI";

import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await MovieReview(movieId);
        setReviews(data.results);
        console.log(data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMovie();
  }, [movieId]);

  {
    if (!reviews) return <Loader />;
  }

  return (
    <ul className={css.list}>
      {reviews?.length !== 0 ? (
        reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <h4>{review.author}:</h4>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <li>There are no reviews 😔.</li>
      )}
      {error && <p>{error}</p>}
    </ul>
  );
};

export default MovieReviews;
