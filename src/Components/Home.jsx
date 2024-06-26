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
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <h2>Movies: {list.length}</h2>
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
        </div>
      </div>
    </>
  );
}

export default Home;
