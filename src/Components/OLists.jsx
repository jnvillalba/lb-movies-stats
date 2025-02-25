import React, { useEffect, useState } from "react";
import Vol9 from "../Lists/Vol9";
import cast from "../Lists/cast";
import HeadingSection from "./HeadingSection";
import NewCard from "./NewCard/NewCard";
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
        return Vol9.filter((x) => x.actors.includes(name));
      case "Directors":
        return Vol9.filter((x) => x.directors.includes(name));

      case "Writers":
        return Vol9.filter((x) => x.writers.includes(name));
      default:
        return [];
    }
  };
  return (
    <div className="container">
      <div className="page-content">
        <HeadingSection title={title} />
        <div className="row justify-content-center">
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
  );
};

export default OLists;
