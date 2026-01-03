import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { resolveSpecialMoviePoster } from "../../Utils/posterUtils";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [poster, setPoster] = useState();
  const [size, setSize] = useState({ width: "150px", height: "180px" });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 768) {
        setSize({ width: "150px", height: "180px" });
      } else {
        setSize({ width: "350px", height: "450px" });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const moviePoster = async (name) => {
      if (movie.img) {
        setPoster(movie.img);
        return;
      }

      const specialPoster = resolveSpecialMoviePoster(name);
      if (specialPoster) {
        setPoster(specialPoster);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${name}`
        );
        const json = await response.json();
        if (cancelled) return;

        if (json.results?.length > 0) {
          setPoster(
            `http://image.tmdb.org/t/p/w500/${json.results[0].poster_path}`
          );
        } else {
          setPoster("Not Found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    moviePoster(movie.name);
    return () => {
      cancelled = true;
    };
  }, [movie.name, movie.img]);

  return (
    <motion.div
      className={`movie-card-container ${isOpen ? "expanded" : ""}`}
      initial={{ width: size.width, height: size.height }}
      animate={{
        width: isOpen ? "auto" : size.width,
        height: isOpen ? "" : size.height,
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div
        className={`movie-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
        style={{
          width: isOpen ? "auto" : size.width,
          height: isOpen ? "" : size.height,
        }}
      >
        <img src={poster} alt={poster} className="movie-card-image" />
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
          {movie.actors.slice(0, 10).map((actor, i) => (
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
