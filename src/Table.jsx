import React from "react";
import cast from "./Lists/cast";
import movies from "./Lists/movies";

const Table = ({ title, lista }) => {
  const handleImg = (name) => {
    let imgFind = cast.find((x) => x.name === name);
    let img = imgFind ? imgFind.img : "";
    return img;
  };

  const moviesList = (name) => {
    switch (title) {
      case "Actors":
        return movies.filter((x) => x.actors.includes(name));
      case "Directors":
        return movies.filter((x) => x.directors.includes(name));
      case "Writers":
        return movies.filter((x) => x.writers.includes(name));
      case "Years":
        return movies.filter((x) => x.year == name);
      default:
        return [];
    }
  };

  return (
    <div className="table-responsive">
      <h2>{title}</h2>
      <table className="table table-striped table-dark text-white table-hover">
        <thead>
          <tr>
            <th>{title === "Years" ? "Año" :"Artista"}</th>
            <th>Apariciones</th>
            <th>Peliculas</th>
          </tr>
        </thead>
        <tbody>
          {lista.slice(0, 5).map((director) => (
            <tr key={director[0]}>
              <td>
                {" "}
                <div className="d-flex align-items-center">
                  { title !== "Years" && (
                    <img
                      className="rounded-circle"
                      src={handleImg(director[0])}
                      width={100}
                      height={100}
                    />
                  )}
                  <span className="ml-5">{director[0]} </span>
                </div>
              </td>
              <td id="apariciones">{director[1]}</td>
              <td className="font-weight-bold">
                <ul>
                  {moviesList(director[0]).map((pelicula) => (
                    <li key={pelicula.name}>
                      {pelicula.name} ({pelicula.year})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
