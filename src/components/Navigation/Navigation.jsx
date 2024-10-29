import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

const Navigation = () => {
  return (
    <header className={css.header}>
      <NavLink className={buildCssClasses} to="/">
        Home page
      </NavLink>
      <NavLink className={buildCssClasses} to="/movies" end>
        Movies
      </NavLink>
    </header>
  );
};

export default Navigation;
