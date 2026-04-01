import { useCallback, useMemo, useState } from "react";
import { encontrarRepetidos, yearsRepetidos } from "../Utils/Utils.js";
import Category from "./Category.jsx";
import MoviesPerYear from "./MoviesPerYear";

function Home({ list }) {
  const [filterType, setFilterType] = useState("All");

  const filteredList = useMemo(() => {
    if (filterType === "TV") return list.filter((item) => item.type === "TV");
    if (filterType === "Movies") return list.filter((item) => !item.type);
    return list;
  }, [list, filterType]);

  const topActors = useMemo(
    () => encontrarRepetidos(filteredList, "actors"),
    [filteredList]
  );

  const topYears = useMemo(
    () => yearsRepetidos(filteredList),
    [filteredList]
  );

  const topDirectors = useMemo(
    () => encontrarRepetidos(filteredList, "directors"),
    [filteredList]
  );

  const topWriters = useMemo(
    () => encontrarRepetidos(filteredList, "writers"),
    [filteredList]
  );

  // Factory so each Category section knows which property to filter on,
  // without the component having to inspect its own title string.
  const moviesByActor = useCallback(
    (name) => filteredList.filter((x) => x.actors.includes(name)),
    [filteredList]
  );
  const moviesByDirector = useCallback(
    (name) => filteredList.filter((x) => x.directors.includes(name)),
    [filteredList]
  );
  const moviesByWriter = useCallback(
    (name) => filteredList.filter((x) => x.writers.includes(name)),
    [filteredList]
  );

  const filters = [
    { value: "All", label: "All" },
    { value: "TV", label: "TV" },
    { value: "Movies", label: "Movie" },
  ];

  return (
    <div className="container">
      <div className="row px-3 px-lg-0">
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <h2>
            {filterType}: {filteredList.length}
          </h2>

          <div>
            {filters.map((option, index, arr) => (
              <button
                key={option.value}
                className={`btn btn-sm ${
                  filterType === option.value
                    ? "btn-light"
                    : "btn-outline-light"
                }${index < arr.length - 1 ? " me-2" : ""}`}
                onClick={() => setFilterType(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <Category
          title="Directors"
          lista={topDirectors.slice(0, 12)}
          getMoviesForItem={moviesByDirector}
        />

        {topWriters.length > 0 && (
          <Category
            title="Writers"
            lista={topWriters.slice(0, 12)}
            getMoviesForItem={moviesByWriter}
          />
        )}

        <Category
          title="Actors"
          lista={topActors.slice(0, 12)}
          getMoviesForItem={moviesByActor}
        />

        <MoviesPerYear
          title="Years"
          lista={topYears.slice(0, 10)}
          filterList={filteredList}
        />
      </div>
    </div>
  );
}

export default Home;
