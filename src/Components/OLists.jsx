import React, { useEffect, useState } from "react";
import Vol8 from "../Lists/Vol8";
import cast from "../Lists/cast";
import NewCard from "./NewCard";
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
              <div className="row">
                <div className="heading-section">
                  <h4 className="cat-title" align="center">
                    <em>{title}</em>
                  </h4>
                </div>

                {lista.map((director) => (
                  <NewCard
                    key={director[0]}
                    src={localimg(director[0]) || handleImg(director[0])}
                    title={director[0]}
                    year={director[1]}
                    list={moviesList(director[0])}
                  ></NewCard>
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
