import React, { useEffect, useState } from "react";
import "./App.css";
import movies from "./Lists/movies";

import Category from "./Components/Categoy";
import NavBar from "./Components/NavBar";
import Details from "./Components/Details";
function App() {
  //const lista_urls = movies.map((objeto) => objeto.url);
  const actores = obtenerRepetidos(movies, "actors");
  const directores = obtenerRepetidos(movies, "directors");
  const escritores = obtenerRepetidos(movies, "writers");
  const años = obtenerRepetidos(movies, "year");
  return (
    <>
      <NavBar />
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <h2>Movies: {movies.length}</h2>
              <Category title={"Directors"} lista={directores} />
              <Category title={"Writers"} lista={escritores} />
              <Category title={"Actors"} lista={actores} />
              <Details title={"Years"} lista={años.slice(0, 8)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

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
