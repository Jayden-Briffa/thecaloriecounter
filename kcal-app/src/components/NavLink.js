import { Link } from 'react-router-dom';
import '../styles/NavLink.css';

function NavLink(props) {

  // Return True if the location is equal to the given path
  const isActive = (path) => {
    let allPaths = [];
    if (props.altPaths !== undefined){
      allPaths = props.altPaths;
    }
    
    allPaths.push(path);
    return allPaths.includes(props.location.pathname)
  };

  return (
    <li className="nav-item">
      <Link className={`nav-link ${ isActive(props.path) ? 'active' : ''}`} aria-current="page" to={props.path} onClick={props.onClick}>{props.label}</Link>
    </li>
  );
}

export default NavLink;
