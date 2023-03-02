import React from "react";
import cast from "../Lists/cast";
import movies from "../Lists/movies";
import { Link } from "react-router-dom";

const Details = ({ title, lista }) => {
  console.log(lista);
  const handleImg = (name) => {
    let imgFind = movies.find((x) => x.name === name);
    let img = imgFind ? imgFind.img : "";
    return img;
  };

  const moviesList = (name) => {
    switch (title) {
      case "Actors":
        return movies.filter((x) => x.actors.includes(name));
      case "movies":
        return movies.filter((x) => x.movies.includes(name));
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
            {lista.map((movie) => (
              <div className="col-lg-3 col-sm-6" key={movie[0]}>
                <div className="item">
                  <img src={movie.img} />

                  <h4 align="center">
                    {movie.name} ({movie.year})<p>{movie.directors}</p>
                    <p>{movie.writers}</p>
                    <p>{movie.actors.splice(0, 5)}</p>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
