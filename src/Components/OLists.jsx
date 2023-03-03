import React, { useState, useEffect } from "react";
import cast from "../Lists/cast";
import movies from "../Lists/movies";
import { Link } from "react-router-dom";
const OLists = ({ title, lista }) => {
  const [posters, setPosters] = useState({});

  useEffect(() => {
    lista.forEach((person) => {
      personPoster(person[0]);
    });
  }, []);

  const personPoster = (name) => {
    let nombreCompleto = name;
    let nombreMinusculas = nombreCompleto.toLowerCase();
    let nombreFormateado = nombreMinusculas.replace(" ", "+");
    fetch(
      `https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${nombreFormateado}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.results.length > 0) {
          setPosters((prevState) => ({
            ...prevState,
            [name]: `http://image.tmdb.org/t/p/w500/${json.results[0].profile_path}`,
          }));
        } else {
          setPosters((prevState) => ({
            ...prevState,
            [name]: "Not Found",
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleImg = (name) => {

    const postersList = Object.entries(posters).map(([name, url]) => ({ name, url }));

    let imgFind = postersList.find((x) => x.name === name);
    let img = imgFind ? imgFind.url :"" ;
    console.log(imgFind)
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
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="page-content">
            <div className="gaming-library">
              <div className="col-lg-12">
                <div className="heading-section">
                  <h4 className="cat-title" align="center">
                    <em>{title}</em>
                  </h4>
                </div>

                {lista.map((director) => (
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
                      {title !== "Years" ? (
                        <h4 align="center">{director[0]}</h4>
                      ) : (
                        <h4 align="center">
                          <Link to={`/${director[0]}`}> {director[0]}</Link>
                        </h4>
                      )}
                    </div>
                    <div className="col-lg-2">
                      <h4 align="center" className="counter">
                        {director[1]}
                      </h4>
                    </div>
                    <div className="col-lg-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OLists;
