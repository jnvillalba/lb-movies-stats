import throttle from "lodash/throttle";
import { useEffect, useRef, useState } from "react";
import { fetchPersonPoster } from "../Utils/posterUtils";

/**
 * Fetches person posters lazily — batch-prefetches on mount and then uses an
 * IntersectionObserver to re-fetch any item that scrolls into view without a
 * valid poster yet.
 *
 * Uses `fetchPersonPoster` (pure — returns Promise<string>) so poster state
 * is managed entirely inside this hook, keeping utils decoupled from React.
 *
 * @param {Array} lista - List of [name, count] tuples to prefetch.
 * @returns {{ posters: Record<string, string> }}
 */
export function useLazyPosters(lista) {
  const [posters, setPosters] = useState({});

  // Mirror latest posters in a ref so the IntersectionObserver closure can
  // read current values without needing them in the dependency array.
  const postersRef = useRef(posters);
  useEffect(() => {
    postersRef.current = posters;
  }, [posters]);

  // Helper: resolves a name and merges the result into state.
  const applyPoster = (name) =>
    fetchPersonPoster(name).then((url) =>
      setPosters((prev) => ({ ...prev, [name]: url }))
    );

  // Throttled batch-fetch — created once per hook instance, not per call.
  const throttledBatchFetch = useRef(
    throttle((batch) => {
      const promises = batch.map((item) => applyPoster(item[0]));
      Promise.allSettled(promises);
    }, 1000)
  ).current;

  // Batch-prefetch posters for all visible items whenever the list changes.
  useEffect(() => {
    const BATCH_SIZE = 12;
    for (let i = 0; i < lista.length; i += BATCH_SIZE) {
      throttledBatchFetch(lista.slice(i, i + BATCH_SIZE));
    }
  }, [lista, throttledBatchFetch]);

  // IntersectionObserver — re-created only when lista changes, not on every
  // poster state update, so it doesn't spam the API.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const name = entry.target.getAttribute("data-director");
          if (name && !postersRef.current[name]) {
            applyPoster(name);
          }
          observer.unobserve(entry.target);
        }
      });
    });

    document
      .querySelectorAll(".lazy-load")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lista]);

  return { posters };
}
