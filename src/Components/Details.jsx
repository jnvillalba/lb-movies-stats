import React from "react";
import MovieCard from "./MovieCard";

const Details = ({ title, lista }) => {
  return (
    <div className="container">
      <div className="page-content">
        <div className="row justify-content-center">
          <h4 className="cat-title" align="center">
            {title}
          </h4>

          {lista.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
