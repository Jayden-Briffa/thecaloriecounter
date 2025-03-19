import React from 'react';
import '../styles/Header.css'
import { useLocation } from 'react-router-dom';
import NavLink from '../components/NavLink';

function Header() {
  const location = useLocation();

  // Return True if the location is equal to the given path
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header bg-pink">
      <nav className="navbar navbar-expand-sm" data-bs-theme="dark">
        <div className="container-fluid p-0">
          <button className="navbar-toggler m-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse bg-pink" id="navbarSupportedContent">

            {/* Desktop */}
            <ul className="navbar-nav me-auto d-md-flex d-none flex-row justify-content-around justify-self w-75 mb-2 mx-auto mb-lg-0">

              {/* Dashboard */}
              <NavLink path="/dashboard" label="Dashboard" isActive={isActive} />

              {/* My foods */}
              <NavLink path="/myfoods" label="My Foods" isActive={isActive} />

              {/* Today */}
              <NavLink path="/today" label="Today" isActive={isActive} />

            </ul>

            {/* Mobile */}
            
            <ul className="navbar-nav me-auto d-flex d-md-none flex-column justify-content-around w-75 mb-2 mx-auto mb-lg-0" id="navlinks-sm">

              {/* Dashboard */}
              <NavLink path="/dashboard" label="Dashboard" isActive={isActive} />

              {/* My foods */}
              <NavLink path="/myfoods" label="My Foods" isActive={isActive} />

              {/* Today */}
              <NavLink path="/today" label="Today" isActive={isActive} />

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
