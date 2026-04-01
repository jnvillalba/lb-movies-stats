import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./NewCard.css";

const CONFIG = {
  breakpoint: 768,
  sizes: {
    desktop: { width: 220, height: 220 },
    mobile: { width: 150, height: 150 },
  },
  expandedWidth: {
    card: 110,
    list: 200,
  },
  animations: {
    spring: { type: "spring", stiffness: 500, damping: 30 },
    fade: { duration: 0.15 },
  },
};

const NewCard = ({ src, title, year, list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(CONFIG.breakpoint);

  const baseDimensions = useMemo(() => {
    const size = isMobile ? CONFIG.sizes.mobile : CONFIG.sizes.desktop;
    return { width: `${size.width}px`, height: `${size.height}px` };
  }, [isMobile]);

  const cardDimensions = useMemo(() => {
    if (!isOpen) return baseDimensions;
    return { width: `${CONFIG.expandedWidth.card}px`, height: "" };
  }, [isOpen, baseDimensions]);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      className={`new-card-container ${isOpen ? "expanded px-2" : ""}`}
      layout
      transition={CONFIG.animations.spring}
    >
      <motion.div
        className={`new-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
        animate={cardDimensions}
        transition={CONFIG.animations.spring}
      >
        <img src={src} alt={title} className="new-card-image" />
        <div className="new-card-overlay">
          <div className="new-card-number">{year}</div>
          <Link to={`/${title}`} className="new-card-title">
            {title}
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
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
    </motion.div>
  );
};

export default NewCard;
