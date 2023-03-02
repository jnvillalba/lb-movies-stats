import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo Start ***** */}
              <h1 className="logo">Stats</h1>
              {/* ***** Logo End ***** */}
              {/* ***** Search End ***** */}
              {/*<div className="search-input">
                <form id="search" action="#">
                  <input
                    type="text"
                    placeholder="Type Something"
                    id="searchText"
                    name="searchKeyword"
                    onkeypress="handle"
                  />
                  <i className="fa fa-search" />
                </form>
              </div>*/}
              {/* ***** Search End ***** */}
              {/* ***** Menu Start ***** */}
              <ul className="nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Directors">Directors</Link>
                </li>
                <li>
                  <Link to="/Writers">Writers</Link>
                </li>
                <li>
                  <Link to="/Actors">Actors</Link>
                </li>
                <li>
                  <Link to="/years">Years</Link>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
              {/* ***** Menu End ***** */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
