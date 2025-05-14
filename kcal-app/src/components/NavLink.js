import React from 'react';
import { Link } from 'react-router-dom';

function NavLink(props) {
  // Return True if the location is equal to the given path
  const isActive = (path) => props.location.pathname === path;

  return (
    <li className="nav-item">
      <Link className={`nav-link ${ isActive(props.path) ? 'active' : ''}`} aria-current="page" to={props.path}>{props.label}</Link>
    </li>
  );
}

export default NavLink;
