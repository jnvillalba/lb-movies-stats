import Vol10 from "../Lists/Vol10";
import HeadingSection from "./HeadingSection";
import YearCard from "./YearCard/YearCard";

const ViewAllYears = ({ title, lista }) => {
  const moviesList = (name) => {
    switch (title) {
      case "Years":
        // eslint-disable-next-line eqeqeq
        return Vol10.filter((x) => x.year == name);
      default:
        return [];
    }
  };
  return (
    <div className="container">
      <div className="page-content">
        <HeadingSection title={title} />
        <div className="row justify-content-center">
          {lista.map((director) => (
            <YearCard
              key={director[0]}
              title={director[0]}
              counter={director[1]}
              list={moviesList(director[0])}
            ></YearCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllYears;
