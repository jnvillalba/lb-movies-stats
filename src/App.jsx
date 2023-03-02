import React, { useEffect, useState } from "react";
import "./App.css";

import movies from "./movies";
import Table from "./Table";

function App() {
  const [actoresRepetidos, setActoresRepetidos] = useState([]);
  const [directoresRepetidos, setDirectoresRepetidos] = useState([]);
  const [escritoresRepetidos, setEscritoresRepetidos] = useState([]);

  //const lista_urls = movies.map((objeto) => objeto.url);

  useEffect(() => {
    const actores = obtenerRepetidos(movies, "actors");
    const directores = obtenerRepetidos(movies, "directors");
    const escritores = obtenerRepetidos(movies, "writers");
    setActoresRepetidos(actores);
    setDirectoresRepetidos(directores);
    setEscritoresRepetidos(escritores);
  }, []);
  return (
    <div className="container mt-2">
      <h1>Stats</h1>
      <h2>Peliculas: {movies.length} </h2>
      <div className="table-responsive">
        <table className="table table-striped table-dark text-white table-hover">
          <thead>
            <tr>
              <th colspan="3">Directores</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apariciones</th>
              <th>Peliculas</th>
            </tr>
          </thead>

          <tbody>
            {" "}
            {directoresRepetidos.map((director) => (
              <Table
                name={director[0]}
                contador={director[1]}
                img={""}
                peliculas={""}
              />
            ))}
          </tbody>
        </table>
      </div>
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

/*return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        
        <div className="col-md-10">
          {directoresRepetidos.map((director) => (
            <Content name={director[0]} contador={director[1]} />
          ))}

          <h2>Actores repetidos</h2>
          <ul>
            {actoresRepetidos.map((actor) => (
              <li key={actor[0]}>
                {actor[0]} ({actor[1]})
              </li>
            ))}
          </ul>

          <h2>Directores repetidos</h2>
          <ul>
            {directoresRepetidos.map((director) => (
              <li key={director[0]}>
                {director[0]} ({director[1]})
              </li>
            ))}
          </ul>

          <h2>Escritores repetidos</h2>
          <ul>
            {escritoresRepetidos.map((escritor) => (
              <li key={escritor[0]}>
                {escritor[0]} ({escritor[1]})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ); */
