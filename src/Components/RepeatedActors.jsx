import React from "react";

const RepeatedActors = ({ data }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Repeated Actors</h2>
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card bg-dark text-white border-secondary">
              <div className="card-body">
                <h5 className="card-title text-warning">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Repeated {item.count} times
                </h6>
                <ul className="list-group list-group-flush">
                  {item.movies.map((movie, idx) => (
                    <li
                      key={idx}
                      className="list-group-item bg-dark text-white border-secondary"
                    >
                      {movie.name} <span className="text-muted">({movie.year})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepeatedActors;
