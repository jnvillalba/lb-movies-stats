import React from "react";
import HeadingSection from "./HeadingSection";
import MovieCard from "./MovieCard";

const Details = ({ title, lista }) => {
  return (
    <div className="container">
      <div className="page-content">
        <div className="row justify-content-center">
          <HeadingSection title={title} />

          {lista.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
