import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cast from "../Lists/cast";
import NewCard from "./NewCard";

const Categoy = ({ title, lista, filterList }) => {
  const localDefaultImage = "../assets/default-profile.png";
  const [posters, setPosters] = useState({});
  useEffect(() => {
    lista.forEach((p) => {
      personPoster(p[0]);
    });
  }, [filterList, lista]);

  const personPoster = async (name) => {
    try {
      const formattedName = name.toLowerCase().replace(" ", "+");

      const apiUrl = `https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${formattedName}`;

      const response = await fetch(apiUrl);
      const json = await response.json();

      if (json.results.length > 0) {
        setPosters((prevState) => ({
          ...prevState,
          [name]: `http://image.tmdb.org/t/p/w500/${json.results[0].profile_path}`,
        }));
      } else {
        setPosters((prevState) => ({
          ...prevState,
          [name]: "Not Found",
        }));
      }
    } catch (error) {
      console.error("Error al buscar el póster:", error);
    }
  };
  const handleImg = (name) => {
    const postersList = Object.entries(posters).map(([name, url]) => ({
      name,
      url,
    }));
    let imgFind = postersList.find((x) => x.name === name);
    let img = imgFind ? imgFind.url : localimg(name) || localDefaultImage;
    return img;
  };

  const localimg = (name) => {
    let localimg = cast.find((x) => x.name === name);
    let img = localimg ? localimg.img : "";
    return img;
  };

  const moviesList = (name) => {
    switch (title) {
      case "Actors":
        return filterList.filter((x) => x.actors.includes(name));
      case "Directors":
        return filterList.filter((x) => x.directors.includes(name));
      case "Writers":
        return filterList.filter((x) => x.writers.includes(name));
      case "Years":
        // eslint-disable-next-line eqeqeq
        return filterList.filter((x) => x.year == name);
      default:
        return [];
    }
  };
  return (
    <div className="gaming-library">
      <div className="heading-section">
        <h4 className="cat-title" align="center">
          <em>{title}</em>
        </h4>
      </div>

      <div className="row justify-content-center">
        {lista.slice(0, 12).map((director) => (
          <NewCard
            key={director[0]}
            src={localimg(director[0]) || handleImg(director[0])}
            title={director[0]}
            year={director[1]}
            list={moviesList(director[0])}
          ></NewCard>
        ))}
      </div>

      <div className="main-button">
        <Link to={`/${title}`}> View All </Link>
      </div>
    </div>
  );
};

export default Categoy;
