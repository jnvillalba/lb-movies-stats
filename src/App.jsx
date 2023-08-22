import React, { Suspense, lazy } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { encontrarRepetidos } from "./Utils";
import movies from "./Lists/movies";
import Vol6 from "./Lists/Vol6";
import Vol5 from "./Lists/Vol5";
import Vol1 from "./Lists/Vol1";
import Vol2 from "./Lists/Vol2";
import Vol3 from "./Lists/Vol3";
import Vol4 from "./Lists/Vol4";

const Home = lazy(() => import("./Components/Home"));
const YearsMovies = lazy(() => import("./Components/YearsMovies"));
const OLists = lazy(() => import("./Components/OLists"));


function App() {
  const actoresRepetidos = encontrarRepetidos(movies, "actors");
  const añosRepetidos = encontrarRepetidos(movies, "year");
  const directoresRepetidos = encontrarRepetidos(movies, "directors");
  const escritoresRepetidos = encontrarRepetidos(movies, "writers");

  let todas = movies.concat(Vol6, Vol5, Vol1, Vol2, Vol3, Vol4);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Home list={movies} />} />
            <Route exact path="/Vol6" element={<Home list={Vol6} />} />
            <Route exact path="/Vol5" element={<Home list={Vol5} />} />
            <Route exact path="/Vol4" element={<Home list={Vol4} />} />
            <Route exact path="/Vol3" element={<Home list={Vol3} />} />
            <Route exact path="/Vol2" element={<Home list={Vol2} />} />
            <Route exact path="/Vol1" element={<Home list={Vol1} />} />
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
