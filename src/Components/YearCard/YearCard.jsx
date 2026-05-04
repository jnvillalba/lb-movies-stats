import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ANIMATION_CONFIG } from "../../config/animationConfig";

const YearCard = memo(({ title, counter, list }) => {
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <div className="card m-2 bg-dark text-light shadow year-card">
      <div
        className="card-header d-flex justify-content-between align-items-center"
        onClick={toggleListVisibility}
        style={{ cursor: "pointer" }}
      >
        <h5 className="mb-0">
          <Link to={`/${title}`} className="text-decoration-none text-light">
            {title}
          </Link>
        </h5>
        <span className="badge bg-primary">{counter}</span>
      </div>
      <AnimatePresence initial={false}>
        {isListVisible && (
          <motion.ul
            className="list-group list-group-flush"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={ANIMATION_CONFIG.listExpand}
            style={{ overflow: "hidden" }}
          >
            {list.map((item) => (
              <li key={`${item.name}-${item.year}`} className="list-group-item bg-dark text-light">
                {item.name} ({item.year})
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});

YearCard.displayName = "YearCard";

export default YearCard;
