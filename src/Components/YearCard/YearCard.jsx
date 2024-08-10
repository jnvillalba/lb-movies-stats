import React, { useState } from "react";
import { Link } from "react-router-dom";

const YearCard = ({ title, counter, list }) => {
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsListVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div
      className="card m-2 bg-dark text-light shadow"
      style={{ width: "45%", height: "fit-content" }}
    >
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
      {isListVisible && (
        <ul className="list-group list-group-flush">
          {list.map((item, index) => (
            <li key={index} className="list-group-item bg-dark text-light">
              {item.name} ({item.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearCard;
