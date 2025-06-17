import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import movies from "./Lists/movies";
import Vol1 from "./Lists/Vol1";
import Vol2 from "./Lists/Vol2";
import Vol3 from "./Lists/Vol3";
import Vol4 from "./Lists/Vol4";
import Vol5 from "./Lists/Vol5";
import Vol6 from "./Lists/Vol6";
import Vol8 from "./Lists/Vol8";
import Vol9 from "./Lists/Vol9.js";
import { calculateAllDuplicates } from "./Utils/Utils.js";
// Lazy-loaded components
const Home = lazy(() => import("./Components/Home"));
const YearsMovies = lazy(() => import("./Components/YearsMovies"));
const Details = lazy(() => import("./Components/Details"));
const OLists = lazy(() => import("./Components/OLists"));
const ViewAllYears = lazy(() => import("./Components/ViewAllYears"));

function App() {
  // Define volumes with their data for easier mapping
  const volumeData = [
    { path: "/", list: Vol9, name: "Vol9" },
    { path: "/Vol9", list: Vol9, name: "Vol9" },
    { path: "/Vol8", list: Vol8, name: "Vol8" },
    { path: "/Vol7", list: movies, name: "Movies" },
    { path: "/Vol6", list: Vol6, name: "Vol6" },
    { path: "/Vol5", list: Vol5, name: "Vol5" },
    { path: "/Vol4", list: Vol4, name: "Vol4" },
    { path: "/Vol3", list: Vol3, name: "Vol3" },
    { path: "/Vol2", list: Vol2, name: "Vol2" },
    { path: "/Vol1", list: Vol1, name: "Vol1" },
  ];

  // Extract repetitions once
  const duplicates = calculateAllDuplicates(Vol9);

  // Create combined list of all volumes
  const todas = volumeData
    .flatMap((volume) => volume.list)
    .sort((a, b) => a.year - b.year);

  const last = Vol9.slice(-6).reverse();

  const categoryRoutes = [
    {
      path: "/Years",
      element: <ViewAllYears title="Years" lista={duplicates.year} />,
    },
    {
      path: "/Directors",
      element: <OLists title="Directors" lista={duplicates.directors} />,
    },
    {
      path: "/Writers",
      element: <OLists title="Writers" lista={duplicates.writers} />,
    },
    {
      path: "/Actors",
      element: <OLists title="Actors" lista={duplicates.actors} />,
    },
    { path: "/Last", element: <Details title="Last" lista={last} /> },
    { path: "/All", element: <Home list={todas} /> },
  ];

  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<div className="loader"></div>}>
        <Routes>
          {/* Dynamically generate volume routes */}
          {volumeData.map(({ path, list }) => (
            <Route
              key={path}
              exact
              path={path}
              element={<Home list={list} />}
            />
          ))}

          {/* Category routes */}
          {categoryRoutes.map(({ path, element }) => (
            <Route key={path} exact path={path} element={element} />
          ))}

          {/* Dynamic year route */}
          <Route exact path="/:id" element={<YearsMovies />} />

          {/* Fallback route */}
          <Route path="*" element={<Home list={Vol9} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
