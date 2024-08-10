import React from "react";
import HeadingSection from "./HeadingSection";
import MovieCard from "./MovieCard/MovieCard.jsx";

const Details = ({ title, lista, count }) => {
  const titleWithCount = `${title} (${count})`;

  return (
    <div className="container">
      <div className="page-content">
        <div className="row justify-content-center">
          <HeadingSection title={count ? titleWithCount : title} />

          {lista.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
