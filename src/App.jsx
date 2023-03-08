import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import YearsMovies from "./Components/YearsMovies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OLists from "./Components/OLists";
import movies from "./Lists/movies";
import Vol6 from "./Lists/Vol6";
import { encontrarRepetidos } from "./Utils";

function App() {
  //const lista_urls = movies.map((objeto) => objeto.url);
  const actoresRepetidos = encontrarRepetidos(movies, "actors");
  const añosRepetidos = encontrarRepetidos(movies, "year");
  const directoresRepetidos = encontrarRepetidos(movies, "directors");
  const escritoresRepetidos = encontrarRepetidos(movies, "writers");

  let todas = movies.concat(Vol6);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home list={movies} />} />
          <Route exact path="/Vol6" element={<Home list={Vol6} />} />
          <Route exact path="/All" element={<Home list={todas} />} />
          <Route exact path="/:id" element={<YearsMovies />} />
          <Route
            exact
            path="/Years"
            element={<OLists title={"Years"} lista={añosRepetidos} />}
          />
          <Route
            exact
            path="/Directors"
            element={<OLists title={"Directors"} lista={directoresRepetidos} />}
          />
          <Route
            exact
            path="/Writers"
            element={<OLists title={"Writers"} lista={escritoresRepetidos} />}
          />
          <Route
            exact
            path="/Actors"
            element={<OLists title={"Actors"} lista={actoresRepetidos} />}
          />
          <Route exact path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
