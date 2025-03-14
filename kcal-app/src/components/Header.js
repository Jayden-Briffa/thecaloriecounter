//import logo from '../logo.svg';
import React from 'react';
import '../styles/Header.css'
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink';

function Header() {
  const location = useLocation();

  // Return True if the location is equal to the given path
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header bg-pink">
      <nav className="navbar navbar-expand-sm " data-bs-theme="dark">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto d-flex flex-row justify-content-around w-100 mb-2 mb-lg-0">

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
