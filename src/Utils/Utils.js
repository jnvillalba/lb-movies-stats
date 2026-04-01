// Private helper — deduplicates TV shows by tvName+season so multi-episode
// entries count as a single item in stats calculations
function deduplicateTvShows(lista) {
  const uniqueShows = new Map();

  lista
    .filter((item) => item.type === "TV")
    .forEach((show) => {
      const key = `${show.tvName}-${show.season}`;
      if (!uniqueShows.has(key)) {
        uniqueShows.set(key, show);
      }
    });

  return [...lista.filter((item) => !item.type), ...Array.from(uniqueShows.values())];
}

function countOccurrences(processedList, property) {
  return processedList.flatMap((item) => item[property]).reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

export function yearsRepetidos(lista) {
  const processedList = deduplicateTvShows(lista);
  const contador = countOccurrences(processedList, "year");
  const repetidos = Object.entries(contador).filter(([, count]) => count > 1);
  return repetidos.sort((a, b) => b[1] - a[1]);
}

export function encontrarRepetidos(lista, propiedad) {
  const processedList = deduplicateTvShows(lista);
  const contador = countOccurrences(processedList, propiedad);

  const repetidos = Object.entries(contador)
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  // Edge case: TV-only list with no repeated people — return random sample
  const isTvOnly = lista.every((item) => item.type === "TV");
  if (repetidos.length === 0 && isTvOnly) {
    return Object.entries(contador)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }

  return repetidos;
}

export function calculateAllDuplicates(volumen) {
  return {
    actors: encontrarRepetidos(volumen, "actors"),
    year: yearsRepetidos(volumen),
    directors: encontrarRepetidos(volumen, "directors"),
    writers: encontrarRepetidos(volumen, "writers"),
  };
}
