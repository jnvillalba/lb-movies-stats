import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Vol10 from "./Lists/Vol10.js";
import { calculateAllDuplicates } from "./Utils/Utils.js";

// Lazy-loaded UI components
const Home = lazy(() => import("./Components/Home"));
const YearsMovies = lazy(() => import("./Components/YearsMovies"));
const Details = lazy(() => import("./Components/Details"));
const OLists = lazy(() => import("./Components/OLists"));
const ViewAllYears = lazy(() => import("./Components/ViewAllYears"));
const RepeatedActorsPage = lazy(() => import("./Pages/RepeatedActorsPage"));

// Lazy-loaded volume pages — each loads its own data on demand
const Vol1Page = lazy(() => import("./Pages/Vol1Page"));
const Vol2Page = lazy(() => import("./Pages/Vol2Page"));
const Vol3Page = lazy(() => import("./Pages/Vol3Page"));
const Vol4Page = lazy(() => import("./Pages/Vol4Page"));
const Vol5Page = lazy(() => import("./Pages/Vol5Page"));
const Vol6Page = lazy(() => import("./Pages/Vol6Page"));
const Vol7Page = lazy(() => import("./Pages/Vol7Page"));
const Vol8Page = lazy(() => import("./Pages/Vol8Page"));
const Vol9Page = lazy(() => import("./Pages/Vol9Page"));
const AllMoviesPage = lazy(() => import("./Pages/AllMoviesPage"));

// Vol10 is eager — it's the default/home route, loaded immediately
// Computed once at module level: static data never changes
const duplicates = calculateAllDuplicates(Vol10);
const last = Vol10.slice(-6).reverse();

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<div className="loader"></div>}>
        <Routes>
          {/* Default route — Vol10 is already loaded */}
          <Route index element={<Home list={Vol10} />} />
          <Route path="Vol10" element={<Home list={Vol10} />} />

          {/* Volume routes — data loaded on demand */}
          <Route path="/Vol9" element={<Vol9Page />} />
          <Route path="/Vol8" element={<Vol8Page />} />
          <Route path="/Vol7" element={<Vol7Page />} />
          <Route path="/Vol6" element={<Vol6Page />} />
          <Route path="/Vol5" element={<Vol5Page />} />
          <Route path="/Vol4" element={<Vol4Page />} />
          <Route path="/Vol3" element={<Vol3Page />} />
          <Route path="/Vol2" element={<Vol2Page />} />
          <Route path="/Vol1" element={<Vol1Page />} />

          {/* Category routes — based on Vol10 data */}
          <Route path="/Years" element={<ViewAllYears title="Years" lista={duplicates.year} />} />
          <Route path="/Directors" element={<OLists title="Directors" lista={duplicates.directors} />} />
          <Route path="/Writers" element={<OLists title="Writers" lista={duplicates.writers} />} />
          <Route path="/Actors" element={<OLists title="Actors" lista={duplicates.actors} />} />
          <Route path="/Last" element={<Details title="Last" lista={last} />} />

          {/* Heavy routes — all data loaded on demand */}
          <Route path="/All" element={<AllMoviesPage />} />
          <Route path="/RepeatedActors" element={<RepeatedActorsPage />} />

          {/* Dynamic year route */}
          <Route path="/:id" element={<YearsMovies />} />

          {/* Fallback — redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
