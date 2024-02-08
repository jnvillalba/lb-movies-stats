import React from "react";
import Category from "./Categoy";
import { encontrarRepetidos } from "../Utils";
import MoviesPerYear from "./MoviesPerYear";

function Home({ list }) {
  const actoresRepetidos = encontrarRepetidos(list, "actors");
  const añosRepetidos = encontrarRepetidos(list, "year");
  const directoresRepetidos = encontrarRepetidos(list, "directors");
  const escritoresRepetidos = encontrarRepetidos(list, "writers");
  const repetidos = encontrarRepetidos(list, "name");
  console.log(repetidos);
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
              {escritoresRepetidos && (
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
