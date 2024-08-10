import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeadingSection from "./HeadingSection";

const MoviesPerYear = ({ lista, filterList }) => {
  const [showMoviesMap, setShowMoviesMap] = useState({});

  const moviesList = (name) => {
    return filterList.filter((x) => x.year === name);
  };

  const handleShowMore = (year) => {
    setShowMoviesMap((prevShowMoviesMap) => ({
      ...prevShowMoviesMap,
      [year]: !prevShowMoviesMap[year],
    }));
  };

  return (
    <div className="page-content">
      <HeadingSection title={"Years"} />

      <div className="year-counter">
        {lista.slice(0, 9).map(([year, count]) => (
          <div className="item" key={year}>
            <div className="mx-5">
              <h4 align="center">
                <Link to={`/${year}`}>{year}</Link>
              </h4>
            </div>
            <div className="">
              <h4 align="center" className="counter">
                {count}
              </h4>
            </div>
            <div className="">
              <ul className="moviesList">
                {moviesList(year)
                  .slice(0, showMoviesMap[year] ? undefined : 10)
                  .map((pelicula, index) => (
                    <li key={pelicula.name + pelicula.year}>
                      {pelicula.name} ({pelicula.year})
                    </li>
                  ))}
              </ul>
              {moviesList(year).length > 10 && (
                <div
                  className={`mx-5 showMore ${
                    showMoviesMap[year] ? "active" : ""
                  }`}
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
