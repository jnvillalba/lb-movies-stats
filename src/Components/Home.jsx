import React, { useMemo } from "react";
import { encontrarRepetidos, yearsRepetidos } from "../Utils/Utils.js";
import Category from "./Category.jsx";
import MoviesPerYear from "./MoviesPerYear";

function Home({ list }) {
  const medirTiempo = (func, ...args) => {
    console.time("Tiempo de ejecución");
    const resultado = func(...args);
    console.timeEnd("Tiempo de ejecución");
    return resultado;
  };

  const actoresRepetidos = useMemo(() => {
    return medirTiempo(encontrarRepetidos, list, "actors");
  }, [list]);

  const añosRepetidos = useMemo(() => yearsRepetidos(list), [list]);

  const directoresRepetidos = useMemo(
    () => encontrarRepetidos(list, "directors"),
    [list]
  );

  const escritoresRepetidos = useMemo(
    () => encontrarRepetidos(list, "writers"),
    [list]
  );

  return (
    <div className="container">
      <div className="row px-3 px-lg-0">
        <h2 className="mt-1">Movies: {list.length}</h2>

        <Category
          title={"Directors"}
          lista={directoresRepetidos.slice(0, 12)}
          filterList={list}
        />

        {escritoresRepetidos.length > 0 && (
          <Category
            title={"Writers"}
            lista={escritoresRepetidos.slice(0, 12)}
            filterList={list}
          />
        )}

        <Category
          title={"Actors"}
          lista={actoresRepetidos.slice(0, 12)}
          filterList={list}
        />

        <MoviesPerYear
          title={"Years"}
          lista={añosRepetidos.slice(0, 10)}
          filterList={list}
        />
      </div>
    </div>
  );
}

export default Home;
