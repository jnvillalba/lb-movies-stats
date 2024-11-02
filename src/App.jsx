import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./Components/Details";
import NavBar from "./Components/NavBar";
import ViewAllYears from "./Components/ViewAllYears";
import Vol1 from "./Lists/Vol1";
import Vol2 from "./Lists/Vol2";
import Vol3 from "./Lists/Vol3";
import Vol4 from "./Lists/Vol4";
import Vol5 from "./Lists/Vol5";
import Vol6 from "./Lists/Vol6";
import Vol8 from "./Lists/Vol8";
import movies from "./Lists/movies";
import { encontrarRepetidos, yearsRepetidos } from "./Utils/Utils.js";

const Home = lazy(() => import("./Components/Home"));
const YearsMovies = lazy(() => import("./Components/YearsMovies"));
const OLists = lazy(() => import("./Components/OLists"));

function App() {
  const actoresRepetidos = encontrarRepetidos(Vol8, "actors");
  const añosRepetidos = yearsRepetidos(Vol8, "year");
  const directoresRepetidos = encontrarRepetidos(Vol8, "directors");
  const escritoresRepetidos = encontrarRepetidos(Vol8, "writers");

  let todas = Vol8.concat(movies, Vol6, Vol5, Vol1, Vol2, Vol3, Vol4);
  let last = Vol8.slice(-6).reverse();
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div class="loader"></div>}>
          <Routes>
            <Route index element={<Home list={Vol8} />} />
            <Route exact path="/Vol7" element={<Home list={movies} />} />
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
              element={<ViewAllYears title={"Years"} lista={añosRepetidos} />}
            />
            <Route
              exact
              path="/Directors"
              element={
                <OLists title={"Directors"} lista={directoresRepetidos} />
              }
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
            <Route
              exact
              path="/Last"
              element={<Details title={"Last"} lista={last} />}
            />
            <Route exact path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
