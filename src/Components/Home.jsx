import React, { useMemo } from "react";
import { encontrarRepetidos, yearsRepetidos } from "../Utils";
import Category from "./Categoy";
import MoviesPerYear from "./MoviesPerYear";

function Home({ list }) {
  const actoresRepetidos = useMemo(
    () => encontrarRepetidos(list, "actors"),
    [list]
  );
  const añosRepetidos = useMemo(() => yearsRepetidos(list, "year"), [list]);
  const directoresRepetidos = useMemo(
    () => encontrarRepetidos(list, "directors"),
    [list]
  );
  const escritoresRepetidos = useMemo(
    () => encontrarRepetidos(list, "writers"),
    [list]
  );

  // const repetidos = encontrarRepetidos(list, "name");

  return (
    <>
      <div className="container">
        <div className="row px-3 px-lg-0">
          <h2 className="mt-1">Movies: {list.length}</h2>
          <Category
            title={"Directors"}
            lista={directoresRepetidos}
            filterList={list}
          />
          {escritoresRepetidos.length > 0 && (
            <Category
              title={"Writers"}
              lista={escritoresRepetidos}
              filterList={list}
            />
          )}
          <Category
            title={"Actors"}
            lista={actoresRepetidos}
            filterList={list}
          />
          <MoviesPerYear
            title={"Years"}
            lista={añosRepetidos}
            filterList={list}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
