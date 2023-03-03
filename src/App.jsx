import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import YearsMovies from "./Components/YearsMovies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OLists from "./Components/OLists";
import {
  añosRepetidos,
  directoresRepetidos,
  escritoresRepetidos,
  actoresRepetidos,
} from "./Utils";

function App() {
  //const lista_urls = movies.map((objeto) => objeto.url);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
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
