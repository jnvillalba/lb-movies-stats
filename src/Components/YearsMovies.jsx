import React from "react";
import { useParams } from "react-router-dom";
import Vol8 from "../Lists/Vol8";
import Details from "./Details";
const Years = () => {
  const { id } = useParams();
  const moviesID = Vol8.filter((objeto) => objeto.year === id);
  console.log(moviesID);
  return <Details title={`${id}`} lista={moviesID} />;
};

export default Years;
