import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { fetchMoviePoster } from "../../Utils/posterUtils";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(768);

  const { data: poster } = useQuery({
    queryKey: ["movie-poster", movie.name],
    queryFn: () => fetchMoviePoster(movie.name),
    enabled: !movie.img, // Skip API call if movie already has a local image
  });

  const finalPoster = movie.img || poster;

  const size = isMobile
    ? { width: "150px", height: "180px" }
    : { width: "350px", height: "450px" };

  const toggleOpen = () => setIsOpen(!isOpen);

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
        <img src={finalPoster} alt={movie.name} className="movie-card-image" />
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
