import React from "react";
import cast from "../Lists/cast";
import movies from "../Lists/movies";
import { Link } from "react-router-dom";

const Details = ({ title, lista }) => {
  const handleImg = (name) => {
    let imgFind = cast.find((x) => x.name === name);
    let img = imgFind ? imgFind.img : "";
    return img;
  };

  const moviesList = (name) => {
    switch (title) {
      case "Actors":
        return movies.filter((x) => x.actors.includes(name));
      case "Directors":
        return movies.filter((x) => x.directors.includes(name));
      case "Writers":
        return movies.filter((x) => x.writers.includes(name));
      case "Years":
        return movies.filter((x) => x.year == name);
      default:
        return [];
    }
  };
  return (
    <div className="most-popular">
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-section">
            <h4 align="center">
              <em>{title}</em>
            </h4>
          </div>
          <div className="row">
            {lista.map((director) => (
              <div className="col-lg-3 col-sm-6" key={director[0]}>
                <div className="item">
                  {title !== "Years" && (
                    <img src={handleImg(director[0])} alt={director[0]} />
                  )}
                  <h4 align="center">
                    <Link to={`/${director[0]}`}> {director[0]}</Link>
                    <br />
                    <p>{director[1]}</p>
                  </h4>
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <div className="main-button">
                <a href="browse.html">View All</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
