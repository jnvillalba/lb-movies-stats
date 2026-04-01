import Vol10 from "../Lists/Vol10";
import { usePersonPosters } from "../hooks/usePersonPosters";
import { handleImg } from "../Utils/posterUtils";
import HeadingSection from "./HeadingSection";
import NewCard from "./NewCard/NewCard";

/**
 * Renders the full "View All" list for a category (Directors, Actors, Writers).
 * Replaced the manual sequential fetch + inline handleImg with useLazyPosters
 * for consistency with Category and better performance (parallel fetching).
 *
 * @param {string} title  - "Directors" | "Actors" | "Writers"
 * @param {Array}  lista  - [name, count] tuples
 */
const OLists = ({ title, lista }) => {
  const { posters } = usePersonPosters(lista);

  const getMoviesForItem = (name) => {
    switch (title) {
      case "Actors":
        return Vol10.filter((x) => x.actors.includes(name));
      case "Directors":
        return Vol10.filter((x) => x.directors.includes(name));
      case "Writers":
        return Vol10.filter((x) => x.writers.includes(name));
      default:
        return [];
    }
  };

  return (
    <div className="container">
      <div className="page-content">
        <HeadingSection title={title} size={lista.length} />
        <div className="row justify-content-center">
          {lista.map((item) => (
            <NewCard
              key={item[0]}
              src={handleImg(item[0], posters)}
              title={item[0]}
              year={item[1]}
              list={getMoviesForItem(item[0])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OLists;
