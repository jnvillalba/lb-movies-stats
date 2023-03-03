import movies from "./Lists/movies"

export function obtenerRepetidos(lista, propiedad) {
  const contador = lista
    .flatMap((objeto) => objeto[propiedad])
    .reduce(
      (contador, item) => (
        (contador[item] = (contador[item] || 0) + 1), contador
      ),
      {}
    );
  const repetidos = Object.entries(contador).filter(
    ([_, repeticiones]) => repeticiones > 1
  );
  return repetidos.sort((a, b) => b[1] - a[1]);
}

export const actoresRepetidos = obtenerRepetidos(movies, "actors");
export const directoresRepetidos = obtenerRepetidos(movies, "directors");
export const escritoresRepetidos = obtenerRepetidos(movies, "writers");
export const añosRepetidos = obtenerRepetidos(movies, "year");

