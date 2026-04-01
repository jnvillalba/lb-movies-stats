import throttle from "lodash/throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  handleImg,
  localDefaultImage,
  personPoster,
} from "../Utils/posterUtils";
import HeadingSection from "./HeadingSection";
import NewCard from "./NewCard/NewCard";

const Category = ({ title, lista, filterList }) => {
  const [posters, setPosters] = useState({});

  // Mirror latest posters in a ref so the IntersectionObserver closure
  // can read current values without being in the dependency array
  const postersRef = useRef(posters);
  useEffect(() => {
    postersRef.current = posters;
  }, [posters]);

  // Throttled fetch created ONCE per component instance (not per call)
  const throttledBatchFetch = useRef(
    throttle(async (batch, setter) => {
      const promises = batch.map((p) => personPoster(p[0], setter));
      await Promise.allSettled(promises);
    }, 1000)
  ).current;


  // Batch-fetch posters for all visible items when lista changes
  useEffect(() => {
    const batchSize = 12;
    for (let i = 0; i < lista.length; i += batchSize) {
      const batch = lista.slice(i, i + batchSize);
      throttledBatchFetch(batch, setPosters);
    }
  }, [lista, throttledBatchFetch]);

  // IntersectionObserver — re-created only when lista changes, NOT on every poster fetch
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const name = entry.target.getAttribute("data-director");
          if (!postersRef.current[name] || postersRef.current[name] === localDefaultImage) {
            personPoster(name, setPosters);
          }
          observer.unobserve(entry.target);
        }
      });
    });

    const elements = document.querySelectorAll(".lazy-load");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [lista]);

  const moviesList = useCallback(
    (name) => {
      switch (title) {
        case "Actors":
          return filterList.filter((x) => x.actors.includes(name));
        case "Directors":
          return filterList.filter((x) => x.directors.includes(name));
        case "Writers":
          return filterList.filter((x) => x.writers.includes(name));
        case "Years":
          // eslint-disable-next-line eqeqeq
          return filterList.filter((x) => x.year == name);
        default:
          return [];
      }
    },
    [filterList, title]
  );

  return (
    lista.length > 0 && (
      <div className="page-content">
        <HeadingSection title={title} />

        <div className="row justify-content-center">
          {lista.slice(0, 12).map((director) => (
            <NewCard
              key={director[0]}
              src={handleImg(director[0], posters, localDefaultImage)}
              title={director[0]}
              year={director[1]}
              list={moviesList(director[0])}
              className="lazy-load"
              data-director={director[0]}
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
