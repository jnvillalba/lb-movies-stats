import React from "react";
import { Link } from "react-router-dom";
import HeadingSection from "./HeadingSection";
import YearCard from "./YearCard/YearCard";

const MoviesPerYear = ({ lista, filterList }) => {
  const moviesList = (name) => {
    return filterList.filter((x) => x.year === name);
  };
  return (
    <div className="page-content mb-3">
      <HeadingSection title={"Years"} />

      <div className="d-flex flex-wrap justify-content-center">
        {lista.slice(0, 9).map(([year, count]) => (
          <YearCard
            key={year}
            title={year}
            counter={count}
            list={moviesList(year).reverse().slice(0, 10)}
          ></YearCard>
        ))}
      </div>
      <div className="col-lg-12">
        <div className="main-button">
          <Link to="/Years">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default MoviesPerYear;
