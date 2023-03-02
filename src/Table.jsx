import React from "react";

const Table = ({ name, contador, peliculas, img }) => {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img className="rounded-circle" src={img} width={100} />
          <span className="ml-2">{name}</span>
        </div>
      </td>
      <td>
        {contador}
        <br />
      </td>
      <td className="font-weight-bold">{peliculas}</td>
    </tr>
  );
};

export default Table;
