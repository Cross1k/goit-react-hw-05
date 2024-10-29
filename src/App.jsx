import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

// import HomePage from "./pages/HomePage/HomePage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import Navigation from "./components/Navigation/Navigation.jsx";
import MovieCast from "./components/MovieCast/MovieCast.jsx";
import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const Navigation = lazy(() => import("./components/Navigation/Navigation.jsx"));
// const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.jsx"));
// const MovieReviews = lazy(() =>
//   import("./components/MovieReviews/MovieReviews.jsx")
// );

function App() {
  return (
    <div>
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
