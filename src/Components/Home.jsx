import React from "react";
import movies from "../Lists/movies";
import Category from "./Categoy";
import {
  añosRepetidos,
  directoresRepetidos,
  escritoresRepetidos,
  actoresRepetidos,
} from "../Utils";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <h2>Movies: {movies.length}</h2>
              <Category title={"Directors"} lista={directoresRepetidos} />
              <Category title={"Writers"} lista={escritoresRepetidos} />
              <Category title={"Actors"} lista={actoresRepetidos} />
              <Category title={"Years"} lista={añosRepetidos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
