import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { fetchMoviePoster } from "../../Utils/posterUtils";
import "./MovieCard.css";

const MovieCard = memo(({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: poster } = useQuery({
    queryKey: ["movie-poster", movie.name],
    queryFn: () => fetchMoviePoster(movie.name),
    enabled: !movie.img,
  });

  const finalPoster = movie.img || poster;

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className={`movie-card-container ${isOpen ? "expanded" : ""}`}>
      <div
        className={`movie-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
      >
        <img
          src={finalPoster}
          alt={movie.name}
          className="movie-card-image"
          loading="lazy"
        />
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
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
