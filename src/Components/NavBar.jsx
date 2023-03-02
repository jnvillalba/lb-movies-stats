import React from "react";

const NavBar = () => {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo Start ***** */}
              <h1 className="logo">
                Stats
              </h1>
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
                  <a href="index.html" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="browse.html">Directors</a>
                </li>
                <li>
                  <a href="details.html">Writers</a>
                </li>
                <li>
                  <a href="streams.html">Actors</a>
                </li>
                <li>
                  <a href="streams.html">Years</a>
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
