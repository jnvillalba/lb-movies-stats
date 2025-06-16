export function yearsRepetidos(lista) {
  // Primero agrupamos las series de TV por tvName y season
  const tvShows = lista.filter((item) => item.type === "TV");

  const uniqueShows = new Map();

  tvShows.forEach((show) => {
    const key = `${show.tvName}-${show.season}`;
    if (!uniqueShows.has(key)) {
      uniqueShows.set(key, show);
    }
  });

  // Creamos una nueva lista donde las series de TV están agrupadas
  const processedList = [
    ...lista.filter((item) => !item.type), // Películas
    ...Array.from(uniqueShows.values()), // Series agrupadas
  ];

  const contador = processedList
    .flatMap((objeto) => objeto["year"])
    .reduce(
      (contador, item) => (
        // eslint-disable-next-line no-sequences
        (contador[item] = (contador[item] || 0) + 1), contador
      ),
      {}
    );
  const repetidos = Object.entries(contador).filter(
    ([_, repeticiones]) => repeticiones > 1
  );
  return repetidos.sort((a, b) => b[1] - a[1]);
}

export function encontrarRepetidos(lista, propiedad) {
  const tvShows = lista.filter((item) => item.type === "TV");
  const uniqueShows = new Map();

  tvShows.forEach((show) => {
    const key = `${show.tvName}-${show.season}`;
    if (!uniqueShows.has(key)) {
      uniqueShows.set(key, {
        ...show,
        [propiedad]: [...(show[propiedad] || [])],
      });
    } else {
      const prev = uniqueShows.get(key);
      prev[propiedad] = Array.from(
        new Set([...prev[propiedad], ...(show[propiedad] || [])])
      );
      uniqueShows.set(key, prev);
    }
  });

  const processedList = [
    ...lista.filter((item) => !item.type),
    ...Array.from(uniqueShows.values()),
  ];

  const contador = {};
  for (const objeto of processedList) {
    const valores = objeto[propiedad];
    for (const valor of valores) {
      contador[valor] = (contador[valor] || 0) + 1;
    }
  }
  const repetidos = [];
  for (const [valor, repeticiones] of Object.entries(contador)) {
    if (repeticiones > 1) {
      repetidos.push([valor, repeticiones]);
    }
  }
  repetidos.sort((a, b) => b[1] - a[1]);
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
