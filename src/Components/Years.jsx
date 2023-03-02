import React from "react";
import Details from ".//Details";
import movies from "../Lists/movies";
import { obtenerRepetidos } from "../Utils";
import { useParams } from "react-router-dom";
const Years = () => {
  const años = obtenerRepetidos(movies, "year");
  const { id } = useParams();

  const moviesID = movies.filter((objeto) => objeto.year == id);
  return <Details title={`${id}`} lista={moviesID} />;
};

export default Years;
