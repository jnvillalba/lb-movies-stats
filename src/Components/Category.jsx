import { throttle } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleImg, personPoster } from "../Utils/posterUtils";
import HeadingSection from "./HeadingSection";
import NewCard from "./NewCard/NewCard";

const Category = ({ title, lista, filterList }) => {
  const localDefaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg";
  const [posters, setPosters] = useState({});
  const observerRef = useRef();

  const fetchPostersThrottled = useCallback(
    async (batch) => {
      const throttledFetch = throttle(async () => {
        const promises = batch.map((p) => personPoster(p[0], setPosters));
        await Promise.allSettled(promises);
      }, 1000);

      throttledFetch();
    },
    [setPosters]
  );
  useEffect(() => {
    const batchSize = 12;
    for (let i = 0; i < lista.length; i += batchSize) {
      const batch = lista.slice(i, i + batchSize);
      fetchPostersThrottled(batch);
    }
  }, [fetchPostersThrottled, lista]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const director = entry.target.getAttribute("data-director");
          if (!posters[director] || posters[director] === localDefaultImage) {
            personPoster(director, setPosters);
          }
          observerRef.current.unobserve(entry.target);
        }
      });
    });

    const elements = document.querySelectorAll(".lazy-load");
    elements.forEach((element) => observerRef.current.observe(element));

    return () => observerRef.current.disconnect();
  }, [posters]);

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
  );
};

export default Category;
