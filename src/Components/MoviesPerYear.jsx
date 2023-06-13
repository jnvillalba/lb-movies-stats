import React, { useState } from "react";
import { Link } from "react-router-dom";

const MoviesPerYear = ({ lista, filterList }) => {
  const [showMoviesMap, setShowMoviesMap] = useState({});

  const moviesList = (name) => {
    return filterList.filter((x) => x.year == name);
  };

  const handleClick = (year) => {
    setShowMoviesMap((prevShowMoviesMap) => ({
      ...prevShowMoviesMap,
      [year]: !prevShowMoviesMap[year]
    }));
  };

  const handleShowMore = (year) => {
    setShowMoviesMap((prevShowMoviesMap) => ({
      ...prevShowMoviesMap,
      [year]: !prevShowMoviesMap[year]
    }));
  };

  return (
    <div className="gaming-library">
      <div className="col-lg-12">
        <div className="heading-section">
          <h4 className="cat-title" align="center">
            <em>Years</em>
          </h4>
        </div>

        {lista.slice(0, 9).map(([year, count]) => (
          <div className="item" key={year}>
            <div className="col-lg-2">
              <h4 align="center">
                <Link to={`/${year}`}>{year}</Link>
              </h4>
            </div>
            <div className="col-lg-2">
              <h4 align="center" className="counter">
                {count}
              </h4>
            </div>
            <div className="col-lg-6 mobile">
              <ul className="moviesList">
                {moviesList(year)
                  .slice(0, showMoviesMap[year] ? undefined : 10)
                  .map((pelicula, index) => (
                    <li key={pelicula.name}>
                      {pelicula.name} ({pelicula.year})
                    </li>
                  ))}
              </ul>
              {moviesList(year).length > 10 && (
                <div
                  className={`showMore ${showMoviesMap[year] ? "active" : ""}`}
                  onClick={() => handleShowMore(year)}
                >
                  {showMoviesMap[year] ? "Mostrar menos" : "Mostrar más"}
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>

      <div className="col-lg-12">
        <div className="main-button">
          <Link to="/Years">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default MoviesPerYear;
