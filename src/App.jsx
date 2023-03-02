import React, { useEffect, useState } from "react";
import "./App.css";
import movies from "./movies";
import Table from "./Table";

function App() {
  //const lista_urls = movies.map((objeto) => objeto.url);
  const actores = obtenerRepetidos(movies, "actors");
  const directores = obtenerRepetidos(movies, "directors");
  const escritores = obtenerRepetidos(movies, "writers");
  const años = obtenerRepetidos(movies, "year");
  return (
    <div className="container mt-2">
      <h1 align="center">Stats</h1>
      <h2 align="center" className="mt-1"> Movies: {movies.length} </h2>
      <Table tr={"Directors"}  lista={directores}/>
      <Table tr={"Writers"} lista={escritores}/>
      <Table tr={"Actors"} lista={actores}/>
      <Table tr={"Years"} lista={años}/>
      
    </div>
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
