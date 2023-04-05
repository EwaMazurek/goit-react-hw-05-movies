import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Header.module.css';
export const Header = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink className={css.navLink} to="/goit-react-hw-05-movies/">
          Home
        </NavLink>
        <NavLink className={css.navLink} to="/goit-react-hw-05-movies/movies">
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
