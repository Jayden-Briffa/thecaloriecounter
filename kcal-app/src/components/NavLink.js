import React from 'react';
import { Link } from 'react-router-dom';

function NavLink(props) {
  return (
    <li className="nav-item">
      <Link className={`nav-link ${ props.isActive(props.path) ? 'active' : ''}`} aria-current="page" to={props.path}>{props.label}</Link>
    </li>
  );
}

export default NavLink;
