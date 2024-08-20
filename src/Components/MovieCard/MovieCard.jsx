import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import cast from "../../Lists/cast";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [poster, setPoster] = useState();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const localimg = (name) => {
    let localimg = cast.find((x) => x.name === name);
    let img = localimg ? localimg.img : "";
    return img;
  };

  useEffect(() => {
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

    moviePoster(movie.name);
  }, [movie.name, movie.img]);

  return (
    <motion.div
      className={`movie-card-container ${isOpen ? "expanded" : ""}`}
      animate={{
        width: isOpen ? "auto" : "350px",
        height: "450px",
        minWidth: "350px",
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div
        className={`movie-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
      >
        <img
          src={localimg(movie.name) || poster}
          alt={poster}
          className="movie-card-image"
        />
      </div>
      {isOpen && (
        <motion.div
          className="movie-card-expanded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            {movie.name} - {movie.year}
            <p>
              <u>{movie.directors.join(", ")}</u>
            </p>
            <p>{movie.writers.join(", ")}</p>
          </div>
          <p className="mt-2">
            <em>Cast:</em>
          </p>
          {movie.actors.slice(0, 7).map((actor, i) => (
            <p className="px-2" key={i}>
              {actor}
            </p>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MovieCard;
