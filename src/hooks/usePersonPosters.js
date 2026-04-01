import { useQueries } from "@tanstack/react-query";
import { fetchPersonPoster, localDefaultImage } from "../Utils/posterUtils";

/**
 * Fetches person posters using React Query for automatic caching,
 * deduplication, and localStorage persistence.
 *
 * Replaces the old useLazyPosters hook — React Query handles everything
 * that was previously done manually (in-flight dedup, memory cache,
 * throttling).
 *
 * @param {Array} lista - List of [name, count] tuples.
 * @returns {{ posters: Record<string, string> }}
 */
export function usePersonPosters(lista) {
  const results = useQueries({
    queries: lista.map(([name]) => ({
      queryKey: ["person-poster", name],
      queryFn: () => fetchPersonPoster(name),
    })),
  });

  const posters = {};
  lista.forEach(([name], i) => {
    posters[name] = results[i]?.data ?? localDefaultImage;
  });

  return { posters };
}
