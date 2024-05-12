import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Stats
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Last">
                Last
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Directors">
                Directors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Writers">
                Writers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Actors">
                Actors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Years">
                Years
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Lists
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/Vol7">
                    Vol. 7
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Vol6">
                    Vol. 6
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Vol5">
                    Vol. 5
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Vol4">
                    Vol. 4
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Vol3">
                    Vol. 3
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Vol2">
                    Vol. 2
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Vol1">
                    Vol. 1
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/All">
                    All
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
