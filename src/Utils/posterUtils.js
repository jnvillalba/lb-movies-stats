// src/utils/posterUtils.js

import cast from "../Lists/cast";

// Cache para las imágenes ya obtenidas
const imageCache = new Map();

export const localDefaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg";

export const localimg = (name) => {
  let localimg = cast.find((x) => x.name === name);
  let img = localimg ? localimg.img : "";
  return img;
};

export const personPoster = async (name, setPosters) => {
  // Primero verificamos si existe una imagen local
  const localImage = localimg(name);

  // Si existe una imagen local, la usamos en lugar de buscar en la API
  if (localImage) {
    setPosters((prevState) => ({
      ...prevState,
      [name]: localImage,
    }));
    imageCache.set(name, localImage); // Almacenar en cache
    return; // Terminamos la función aquí si se encuentra una imagen local
  }

  // Si no hay imagen local, procedemos con la búsqueda en la API
  const formattedName = name.toLowerCase().replace(" ", "+");
  const apiUrl = `https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${formattedName}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok)
      throw new Error(
        "Error en la respuesta de la API buscando poster para " + name
      );

    const { results } = await response.json();

    if (results.length > 0 && results[0].profile_path) {
      const posterUrl = `http://image.tmdb.org/t/p/w500/${results[0].profile_path}`;
      setPosters((prevState) => ({
        ...prevState,
        [name]: posterUrl,
      }));
      imageCache.set(name, posterUrl); // Almacenar en cache
    }
  } catch (error) {
    console.error("Error al buscar el póster:", name);
  }
};

export const handleImg = (name, posters, localDefaultImage) => {
  // Si la imagen ya está cacheada y no es igual a la default, usarla

  if (imageCache.has(name) && imageCache.get(name) !== localDefaultImage) {
    return imageCache.get(name);
  }

  const poster = posters[name] || localDefaultImage;

  // Cachear el resultado si no es la imagen predeterminada
  if (poster !== localDefaultImage) {
    imageCache.set(name, poster);
  }

  return poster;
};
