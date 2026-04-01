import { motion } from "framer-motion";
import { useState } from "react";
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
    spring: { type: "spring", stiffness: 100 },
    fade: { duration: 0.5 },
  },
};

const NewCard = ({ src, title, year, list }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Single shared listener via hook — no more N listeners for N cards
  const isMobile = useIsMobile(CONFIG.breakpoint);

  const getDimensions = () => {
    const size = isMobile ? CONFIG.sizes.mobile : CONFIG.sizes.desktop;
    return {
      width: `${size.width}px`,
      height: `${size.height}px`,
    };
  };

  const getExpandedStyles = (type) => {
    if (!isOpen) return getDimensions();

    const styles = { height: "" };
    if (type === "card") {
      styles.width = `${CONFIG.expandedWidth.card}px`;
    } else if (type === "list") {
      styles.width = `${CONFIG.expandedWidth.list}px`;
    } else {
      styles.width = "auto";
    }

    return styles;
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const baseDimensions = getDimensions();

  return (
    <motion.div
      className={`new-card-container ${isOpen ? "expanded px-2" : ""}`}
      initial={baseDimensions}
      animate={getExpandedStyles("container")}
      transition={isOpen ? { duration: 0 } : CONFIG.animations.spring}
    >
      <div
        className={`new-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
        style={getExpandedStyles("card")}
      >
        <img src={src} alt={title} className="new-card-image" />
        <div className="new-card-overlay">
          <div className="new-card-number">{year}</div>
          <Link to={`/${title}`} className="new-card-title">
            {title}
          </Link>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="new-card-expanded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CONFIG.animations.fade}
        >
          <ol className="new-card-list" style={getExpandedStyles("list")}>
            {list.map((pelicula) => (
              <li key={`${pelicula.name}-${pelicula.year}`}>
                {pelicula.name} ({pelicula.year})
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NewCard;
