import React, { useEffect, useState } from "react";
import cast from "../Lists/cast";

const Details = ({ title, lista }) => {
  return (
    <div className="most-popular">
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-section">
            <h4 align="center">
              <em>{title}</em>
            </h4>
          </div>
          <div className="row">
            {lista.map((movie, i) => (
              <Movie key={i} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Movie = ({ movie }) => {
  const localimg = (name) => {
    let localimg = cast.find((x) => x.name === name);
    let img = localimg ? localimg.img : "";
    return img;
  };
  const [poster, setPoster] = useState();

  useEffect(() => {
    moviePoster(movie.name);
  }, []);

  const moviePoster = (name) => {
    if (movie.img) {
      setPoster(movie.img);
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${name}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.results.length > 0) {
            setPoster(
              `http://image.tmdb.org/t/p/w500/${json.results[0].poster_path}`
            );
          } else {
            setPoster("Not Found");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="col-lg-3 col-sm-6">
      <div className="item">
        <img src={localimg(movie.name) || poster} alt={poster} />

        <h4 align="center">
          {movie.name} ({movie.year})
        </h4>
        <div>
          <p>
            <u>{movie.directors.join(", ")}</u>
          </p>
          <p>{movie.writers.join(", ")}</p>
        </div>
        <p className="mt-2">
          <em>Cast:</em>
        </p>
        {movie.actors.slice(0, 5).map((writer, i) => (
          <p key={i}>{writer}</p>
        ))}
      </div>
    </div>
  );
};

export default Details;
