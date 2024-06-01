import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Vol8 from "../Lists/Vol8";
import cast from "../Lists/cast";
const OLists = ({ title, lista }) => {
  const [posters, setPosters] = useState({});

  const personPoster = async (name) => {
    try {
      let nombreCompleto = name;
      let nombreMinusculas = nombreCompleto.toLowerCase();
      let nombreFormateado = nombreMinusculas.replace(" ", "+");
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${nombreFormateado}`
      );
      const json = await response.json();
      return json.results.length > 0
        ? `http://image.tmdb.org/t/p/w500/${json.results[0].profile_path}`
        : "Not Found";
    } catch (error) {
      console.error(error);
      return "Error";
    }
  };

  useEffect(() => {
    const updatePosters = async () => {
      const newPosters = {};
      for (const person of lista) {
        newPosters[person[0]] = await personPoster(person[0]);
      }
      setPosters(newPosters);
    };
    updatePosters();
  }, [lista]);

  const handleImg = (name) => posters[name] || "";

  const localimg = (name) => {
    let localimg = cast.find((x) => x.name === name);
    let img = localimg ? localimg.img : "";
    return img;
  };

  const moviesList = (name) => {
    switch (title) {
      case "Actors":
        return Vol8.filter((x) => x.actors.includes(name));
      case "Directors":
        return Vol8.filter((x) => x.directors.includes(name));

      case "Writers":
        return Vol8.filter((x) => x.writers.includes(name));
      case "Years":
        // eslint-disable-next-line eqeqeq
        return Vol8.filter((x) => x.year == name);
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
                          src={localimg(director[0]) || handleImg(director[0])}
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
                          <li key={pelicula.name + pelicula.year}>
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
