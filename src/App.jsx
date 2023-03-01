import React, { useEffect, useState } from "react";
import "./App.css";
import movies from "./movies";
function App() {
  const [directorMasRepetido, setDirectorMasRepetido] = useState("");
  const [maxContador, setMaxContador] = useState(0);
  useEffect(() => {
    const contadorDirectores = {};

    movies.forEach((pelicula) => {
      if (contadorDirectores[pelicula.director]) {
        contadorDirectores[pelicula.director]++;
      } else {
        contadorDirectores[pelicula.director] = 1;
      }
    });

    Object.keys(contadorDirectores).forEach((director) => {
      if (contadorDirectores[director] > maxContador) {
        setDirectorMasRepetido(director);
        setMaxContador(contadorDirectores[director]);
      }
    });
  }, [movies]);

  return (
    <div className="App">
      <h1>Stats</h1>
      <h2>{directorMasRepetido}</h2>
      {movies.length}
      <ul>
        {movies.map((item) => (
          <li key={item.position}>
            {item.name} - ({item.year}){" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
