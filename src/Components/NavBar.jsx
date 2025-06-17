import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const volumes = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  const navLinks = [
    { path: "/Last", label: "Last" },
    { path: "/", label: "Home" },
    { path: "/Directors", label: "Directors" },
    { path: "/Writers", label: "Writers" },
    { path: "/Actors", label: "Actors" },
    { path: "/Years", label: "Years" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-3 px-lg-0">
        <Link className="navbar-brand fw-bold" to="/">
          Stats
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  className="nav-link"
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Lists
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                {volumes.map((vol) => (
                  <li key={`vol-${vol}`}>
                    <Link
                      className="dropdown-item"
                      to={`/Vol${vol}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Vol. {vol}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/All"
                    onClick={() => setIsOpen(false)}
                  >
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
