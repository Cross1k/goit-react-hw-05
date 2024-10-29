import { Outlet } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";

const MoviesPage = () => {
  return (
    <div>
      <MovieList />
      <Outlet />
    </div>
  );
};

export default MoviesPage;
