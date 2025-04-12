import React, { useEffect, useState } from "react";
import Vol9 from "../Lists/Vol9";
import {
  localDefaultImage,
  localimg,
  personPoster,
} from "../Utils/posterUtils";
import HeadingSection from "./HeadingSection";
import NewCard from "./NewCard/NewCard";

const OLists = ({ title, lista }) => {
  const [posters, setPosters] = useState({});

  useEffect(() => {
    const updatePosters = async () => {
      for (const person of lista) {
        await personPoster(person[0], setPosters);
      }
    };
    updatePosters();
  }, [lista]);

  const handleImg = (name) =>
    localimg(name) || posters[name] || localDefaultImage;

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
              src={handleImg(director[0])}
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
