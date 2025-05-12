import { useMemo, useState } from "react";
import { encontrarRepetidos, yearsRepetidos } from "../Utils/Utils.js";
import Category from "./Category.jsx";
import MoviesPerYear from "./MoviesPerYear";

function Home({ list }) {
  const [filterType, setFilterType] = useState("All"); // Estado para manejar el filtro

  // Filtrar la lista según el tipo seleccionado
  const filteredList = useMemo(() => {
    if (filterType === "TV") {
      return list.filter((item) => item.type === "TV");
    } else if (filterType === "Movies") {
      return list.filter((item) => !item.type);
    }
    return list;
  }, [list, filterType]);

  const medirTiempo = (func, ...args) => {
    console.time("Tiempo de ejecución");
    const resultado = func(...args);
    console.timeEnd("Tiempo de ejecución");
    return resultado;
  };

  const actoresRepetidos = useMemo(() => {
    return medirTiempo(encontrarRepetidos, filteredList, "actors");
  }, [filteredList]);

  const añosRepetidos = useMemo(
    () => yearsRepetidos(filteredList),
    [filteredList]
  );

  const directoresRepetidos = useMemo(
    () => encontrarRepetidos(filteredList, "directors"),
    [filteredList]
  );

  const escritoresRepetidos = useMemo(
    () => encontrarRepetidos(filteredList, "writers"),
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

          {/* Botones para filtrar */}
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
          title={"Directors"}
          lista={directoresRepetidos.slice(0, 12)}
          filterList={filteredList}
        />

        {escritoresRepetidos.length > 0 && (
          <Category
            title={"Writers"}
            lista={escritoresRepetidos.slice(0, 12)}
            filterList={filteredList}
          />
        )}

        <Category
          title={"Actors"}
          lista={actoresRepetidos.slice(0, 12)}
          filterList={filteredList}
        />

        <MoviesPerYear
          title={"Years"}
          lista={añosRepetidos.slice(0, 10)}
          filterList={filteredList}
        />
      </div>
    </div>
  );
}

export default Home;
