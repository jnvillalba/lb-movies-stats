import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Vol10 from "../Lists/Vol10";
import Details from "./Details";

const Years = () => {
  const { id } = useParams();
  const isNumeric = /^[0-9]+$/.test(id);

  const moviesID = useMemo(() => {
    if (isNumeric) {
      return Vol10.filter((objeto) => objeto.year === id);
    }

    const allMovies = (name) => {
      const filteredMovies = Vol10.reduce((acc, movie) => {
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
