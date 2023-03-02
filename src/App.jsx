import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Years from "./Components/Years";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OLists from "./Components/OLists";
import { obtenerRepetidos } from "./Utils";
import movies from "./Lists/movies";
function App() {
  //const lista_urls = movies.map((objeto) => objeto.url);
  const actores = obtenerRepetidos(movies, "actors");
  const directores = obtenerRepetidos(movies, "directors");
  const escritores = obtenerRepetidos(movies, "writers");
  const años = obtenerRepetidos(movies, "year");
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/:id" element={<Years />} />
          <Route
            exact
            path="/Years"
            element={<OLists title={"Years"} lista={años} />}
          />
          <Route
            exact
            path="/Directors"
            element={<OLists title={"Directors"} lista={directores} />}
          />
          <Route
            exact
            path="/Writers"
            element={<OLists title={"Writers"} lista={escritores} />}
          />
          <Route
            exact
            path="/Actors"
            element={<OLists title={"Actors"} lista={actores} />}
          />
          <Route exact path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
