import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Nav(props) {
  return (
    <nav className="nav">
      <ul className="nav__items-left">
        <li className="nav__item">
          <p
            className="nav__new"
            onClick={props.createProject}
          >
            New
          </p>
        </li>
        <li className="nav__item">
          <p
            className="nav__save"
            onClick={props.saveProject}
          >
            Save
          </p>
        </li>
      </ul>
      <ul className="nav__items-right">
        <li className="nav__item">
          {props.user.authenticated && <p>Hello, {props.user.username}!</p>}
          {!props.user.authenticated && <p><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>}
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  createProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  user: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    username: PropTypes.string
  }).isRequired
};

export default Nav;
