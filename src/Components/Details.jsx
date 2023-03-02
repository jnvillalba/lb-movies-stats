import React, { useState } from "react";

import movies from "../Lists/movies";

const Details = ({ title, lista }) => {
  const [poster, setPoster] = useState("");

  const moviePoster = (name) => {
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
    return poster;
  };

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
            {lista.map((movie) => (
              <div className="col-lg-3 col-sm-6" key={movie[0]}>
                <div className="item">
                  <img src={"moviePoster(movie.name)"} />

                  <h4 align="center">
                    {movie.name} ({movie.year})
                  </h4>
                  <div>
                    <p>{movie.directors.join(", ")}</p>
                    <p>{movie.writers.join(", ")}</p>
                   
                  </div>

                  <p className="mt-2">{movie.actors.splice(0,5).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
