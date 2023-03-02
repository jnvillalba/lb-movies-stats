import React from "react";
import cast from "../Lists/cast";
import movies from "../Lists/movies";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Categoy = ({ title, lista }) => {
  const navigate = useNavigate();
  const goToYears = () => navigate("/Years");

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
          <h4 className="cat-title" align="center">
            <em>{title}</em>
          </h4>
        </div>

        {lista.slice(0, 5).map((director) => (
          <div className="item" key={director[0]}>
            {title !== "Years" && (
              <div className="col-lg-2">
                <img
                  className="templatemo-item"
                  src={handleImg(director[0])}
                  width={100}
                  height={100}
                  alt={director[0]}
                />
              </div>
            )}
            <div className="col-lg-2">
              <h4  align="center">{director[0]}</h4>
            </div>
            <div className="col-lg-2">
              <h4 align="center" className="counter">
                {director[1]}
              </h4>
            </div>
            <div className="col-lg-6">
              <ul className="moviesList">
                {moviesList(director[0]).map((pelicula) => (
                  <li key={pelicula.name}>
                    {pelicula.name} ({pelicula.year})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-12">
        <div className="main-button">
          <Link to={`/${title}`}> View All </Link> 
        </div>
      </div>
    </div>
  );
};

export default Categoy;
