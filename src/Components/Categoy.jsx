import React from "react";
import cast from "../Lists/cast";
import movies from "../Lists/movies";

const Categoy = ({ title, lista }) => {
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
    <div className="gaming-library">
      <div className="col-lg-12">
        <div className="heading-section">
        <h4 align="center">
            <em>{title}</em>
          </h4>
        </div>
        {lista.slice(0, 5).map((director) => (
          <div className="item" key={director[0]}>
            <ul>
              <li>
                {title !== "Years" && (
                  <img
                    className="templatemo-item"
                    src={handleImg(director[0])}
                    width={100}
                    height={100}
                    alt={director[0]}
                  />
                )}
              </li>
              <li>
                <h4 align="center">{director[0]}</h4>
              </li>
              <li>
                <h4 align="center">{director[1]}</h4>
              </li>

              {moviesList(director[0]).map((pelicula) => (
                <li key={pelicula.name}>
                  <p align="center">
                    {pelicula.name} ({pelicula.year})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="col-lg-12">
        <div className="main-button">
          <a href="profile.html">View All</a>
        </div>
      </div>
    </div>
  );
};

export default Categoy;
