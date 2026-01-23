
const RepeatedActors = ({ data }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Data Integrity Errors</h2>
      <p className="text-secondary">
        Checking for actors listed multiple times within the same movie logic.
      </p>
      
      {data.length === 0 ? (
        <div className="alert alert-success" role="alert">
          No duplicate actors found within any movie! Data is clean.
        </div>
      ) : (
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card bg-danger text-white border-light">
                <div className="card-header border-light">
                  <span className="h5">{item.movieName}</span>
                  <span className="float-end badge bg-light text-danger">
                    {item.year}
                  </span>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2">Duplicate Actors Found:</h6>
                  <ul className="list-group list-group-flush">
                    {item.duplicates.map((actor, idx) => (
                      <li
                        key={idx}
                        className="list-group-item bg-danger text-white border-light"
                      >
                        {actor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepeatedActors;
