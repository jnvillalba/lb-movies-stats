import React, { useEffect, useState } from "react";
import movies from "../Lists/movies";
import Category from "./Categoy";


function Home() {
  //const lista_urls = movies.map((objeto) => objeto.url);
  const actores = obtenerRepetidos(movies, "actors");
  const directores = obtenerRepetidos(movies, "directors");
  const escritores = obtenerRepetidos(movies, "writers");
  const años = obtenerRepetidos(movies, "year");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <h2>Movies: {movies.length}</h2>
              <Category title={"Directors"} lista={directores} />
              <Category title={"Writers"} lista={escritores} />
              <Category title={"Actors"} lista={actores} />
              <Category title={"Years"} lista={años} />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

function obtenerRepetidos(lista, propiedad) {
  const contador = lista
    .flatMap((objeto) => objeto[propiedad])
    .reduce(
      (contador, item) => (
        (contador[item] = (contador[item] || 0) + 1), contador
      ),
      {}
    );
  const repetidos = Object.entries(contador).filter(
    ([_, repeticiones]) => repeticiones > 1
  );
  return repetidos.sort((a, b) => b[1] - a[1]);
}
