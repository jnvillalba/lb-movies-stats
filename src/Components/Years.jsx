import React from 'react'
import Details from ".//Details";
import movies from "../Lists/movies";
import { obtenerRepetidos } from '../Utils';
const Years = () => {
    const actores = obtenerRepetidos(movies, "actors");
  const directores = obtenerRepetidos(movies, "directors");
  const escritores = obtenerRepetidos(movies, "writers");
  const años = obtenerRepetidos(movies, "year");
  return (
    <Details title={"Years"} lista={años} />
  )
}

export default Years

