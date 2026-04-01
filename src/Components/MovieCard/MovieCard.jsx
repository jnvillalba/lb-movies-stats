import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
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
    enabled: !movie.img,
  });

  const finalPoster = movie.img || poster;

  const size = isMobile
    ? { width: "150px", height: "180px" }
    : { width: "350px", height: "450px" };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      className={`movie-card-container ${isOpen ? "expanded" : ""}`}
      layout
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div
        className={`movie-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
        style={{
          width: isOpen ? "auto" : size.width,
          height: isOpen ? "auto" : size.height,
        }}
      >
        <img src={finalPoster} alt={movie.name} className="movie-card-image" />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="movie-card-expanded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
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
      </AnimatePresence>
    </motion.div>
  );
};

export default MovieCard;
