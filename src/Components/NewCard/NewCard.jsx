import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./NewCard.css";

const CONFIG = {
  expandedWidth: {
    card: 110,
    list: 200,
  },
  animations: {
    spring: { type: "spring", stiffness: 500, damping: 30 },
    fade: { duration: 0.15 },
  },
};

const NewCard = memo(({ src, title, year, list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setIsExpanded(true);
      return next;
    });
  }, []);

  const handleExitComplete = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <div className={`new-card-container ${isExpanded ? "expanded px-2" : ""}`}>
      <motion.div
        className={`new-card ${isExpanded ? "expanded" : ""}`}
        onClick={toggleOpen}
        animate={
          isExpanded
            ? { width: `${CONFIG.expandedWidth.card}px` }
            : undefined
        }
        transition={CONFIG.animations.spring}
      >
        <img src={src} alt={title} className="new-card-image" loading="lazy" />
        <div className="new-card-overlay">
          <div className="new-card-number">{year}</div>
          <Link to={`/${title}`} className="new-card-title">
            {title}
          </Link>
        </div>
      </motion.div>

      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <motion.div
            className="new-card-expanded"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: `${CONFIG.expandedWidth.list}px` }}
            exit={{ opacity: 0, width: 0 }}
            transition={CONFIG.animations.fade}
          >
            <ol
              className="new-card-list"
              style={{ width: `${CONFIG.expandedWidth.list}px` }}
            >
              {list.map((pelicula) => (
                <li key={`${pelicula.name}-${pelicula.year}`}>
                  {pelicula.name} ({pelicula.year})
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

NewCard.displayName = "NewCard";

export default NewCard;
