import { Link } from 'react-router-dom';

function NavLink(props) {
  
  // Return True if the location is equal to the given path
  const isActive = (path) => {
    let allPaths = props.altPaths ?? [];
    allPaths.push(path);

    return allPaths.includes(props.location.pathname)
  };

  return (
    <li className="nav-item">
      <Link className={`nav-link ${ isActive(props.path) ? 'active' : ''}`} aria-current="page" to={props.path}>{props.label}</Link>
    </li>
  );
}

export default NavLink;
