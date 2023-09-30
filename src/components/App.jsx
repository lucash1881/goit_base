import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { Home } from 'components/Home/Home';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { Cast } from 'components/Cast/Cast';
import { Reviews } from 'components/Reviews/Reviews';
import { NavbarHeader, NavbarLabel } from 'components/App.styles';
import { Generos } from 'components/Generos/Generos';
import User from 'components/Usuarios/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesByDate } from 'services/api'; // Corregido: Importar fetchMoviesByDate

// Contexto para el estado de inicio de sesión del usuario
const UserContext = createContext();

// Componente Provider para el contexto de inicio de sesión del usuario
const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const App = () => {
  return (
    <Router>
      <UserProvider>
        <NavbarHeader>
          <NavLink to="/" end>
            <NavbarLabel>Inicio</NavbarLabel>
          </NavLink>
          <NavLink to="/generos">
            <NavbarLabel>Géneros</NavbarLabel>
          </NavLink>
          <NavLink to="/usuario">
            <UserNavigation />
          </NavLink>
        </NavbarHeader>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/generos" element={<Generos />} />
          <Route path="/usuario/*" element={<User />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

const UserNavigation = () => {
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/usuario');
  };

  return (
    <div onClick={handleUserClick}>
      {loggedIn ? (
        <FontAwesomeIcon icon={faUser} />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </div>
  );
};