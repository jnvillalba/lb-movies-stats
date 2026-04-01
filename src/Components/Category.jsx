import { Link } from "react-router-dom";
import { useLazyPosters } from "../hooks/useLazyPosters";
import { handleImg, localDefaultImage } from "../Utils/posterUtils";
import HeadingSection from "./HeadingSection";
import NewCard from "./NewCard/NewCard";

/**
 * Renders a top-N category section (Directors, Actors, Writers…) with lazy-
 * loaded person posters.
 *
 * @param {string}   title            - Section heading and "View All" route key.
 * @param {Array}    lista            - [name, count] tuples (already sliced to 12).
 * @param {Function} getMoviesForItem - (name: string) => Movie[] — injected by the
 *                                      caller so this component stays decoupled from
 *                                      the filter logic.
 */
const Category = ({ title, lista, getMoviesForItem }) => {
  const { posters } = useLazyPosters(lista);

  return (
    lista.length > 0 && (
      <div className="page-content">
        <HeadingSection title={title} />

        <div className="row justify-content-center">
          {lista.slice(0, 12).map((item) => (
            <NewCard
              key={item[0]}
              src={handleImg(item[0], posters, localDefaultImage)}
              title={item[0]}
              year={item[1]}
              list={getMoviesForItem(item[0])}
              className="lazy-load"
              data-director={item[0]}
            />
          ))}
        </div>

        <div className="main-button">
          <Link to={`/${title}`}> View All </Link>
        </div>
      </div>
    )
  );
};

export default Category;
