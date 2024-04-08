import React from "react";
import { encontrarRepetidos, yearsRepetidos } from "../Utils";
import Category from "./Categoy";
import MoviesPerYear from "./MoviesPerYear";

function Home({ list }) {
  const actoresRepetidos = encontrarRepetidos(list, "actors");
  const añosRepetidos = yearsRepetidos(list, "year");
  const directoresRepetidos = encontrarRepetidos(list, "directors");
  const escritoresRepetidos = encontrarRepetidos(list, "writers");
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
