import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  
  return (
    <div className="header-area header-sticky">
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
              
              {/* ***** Menu End ***** */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

/*const NavBar = () => {
  return (
    <Navbar className=" main-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Stats</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto nav">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/Directors">Directors</Nav.Link>
          <Nav.Link as={Link} to="/Writers">Writers</Nav.Link>
          <Nav.Link as={Link} to="/Actors">Actors</Nav.Link>
          <Nav.Link as={Link} to="/years">Years</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}; */