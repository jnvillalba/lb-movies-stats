export function yearsRepetidos(lista, propiedad) {
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

export function encontrarRepetidos(lista, propiedad) {
  const contador = {};
  for (const objeto of lista) {
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
