import { motion } from "framer-motion";
import React, { useState } from "react";
import "./NewCard.css";

const NewCard = ({ src, title, year, list }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="new-card-container"
      animate={{
        width: isOpen ? "100%" : "200px",
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="new-card" onClick={toggleOpen}>
        <img src={src} alt={title} className="new-card-image" />
        <div className="new-card-overlay">
          <div className="new-card-number">{year}</div>
          <div className="new-card-title">{title}</div>
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
