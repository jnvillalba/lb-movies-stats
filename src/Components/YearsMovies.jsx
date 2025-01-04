import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Vol9 from "../Lists/Vol9";
import Details from "./Details";

const Years = () => {
  const { id } = useParams();
  const isNumeric = /^[0-9]+$/.test(id);

  const moviesID = useMemo(() => {
    if (isNumeric) {
      return Vol9.filter((objeto) => objeto.year === id);
    }

    const allMovies = (name) => {
      const filteredMovies = Vol9.reduce((acc, movie) => {
        if (
          movie.actors.includes(name) ||
          movie.directors.includes(name) ||
          movie.writers.includes(name)
        ) {
          acc.push(movie);
        }
        return acc;
      }, []);

      return [...new Set(filteredMovies)];
    };

    return allMovies(id);
  }, [id, isNumeric]);

  return <Details title={`${id}`} lista={moviesID} count={moviesID.length} />;
};

export default Years;
