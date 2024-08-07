import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NewCard.css";

const NewCard = ({ src, title, year, list }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className={`new-card-container ${isOpen ? "expanded" : ""}`}
      animate={{
        width: isOpen ? "auto" : "220px",
        height: "220px",
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div
        className={`new-card ${isOpen ? "expanded" : ""}`}
        onClick={toggleOpen}
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
          transition={{ duration: 0.5 }}
        >
          <ul className="new-card-list">
            {list.map((pelicula) => (
              <li key={pelicula.name + pelicula.year}>
                {pelicula.name} ({pelicula.year})
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NewCard;
