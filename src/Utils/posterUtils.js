import cast from "../Lists/cast";

export const localDefaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg";

/**
 * Returns the locally-stored image URL for a given person name, or an empty
 * string if none exists.
 *
 * @param {string} name
 * @returns {string}
 */
export const localimg = (name) => {
  const match = cast.find((x) => x.name === name);
  return match?.img ?? "";
};

/**
 * Fetches the TMDB poster URL for a person by name.
 * Pure async function — caching, deduplication, and persistence are all
 * handled by React Query. This function just does the fetch.
 *
 * @param {string} name
 * @returns {Promise<string>} Resolved poster URL, falls back to localDefaultImage.
 */
export async function fetchPersonPoster(name) {
  // Return local image immediately — no network needed.
  const localImage = localimg(name);
  if (localImage) return localImage;

  const formattedName = encodeURIComponent(name.toLowerCase());
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${formattedName}`;

  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(`TMDB API error for "${name}"`);
  const { results } = await res.json();

  const hit = results.find((r) => r.profile_path);
  return hit
    ? `https://image.tmdb.org/t/p/w500/${hit.profile_path}`
    : localDefaultImage;
}

/**
 * Fetches the TMDB poster URL for a movie by title.
 * Pure async function — caching, deduplication, and persistence are all
 * handled by React Query.
 *
 * @param {string} name
 * @returns {Promise<string>} Resolved poster URL, or "Not Found" if no match.
 */
export async function fetchMoviePoster(name) {
  const specialPoster = resolveSpecialMoviePoster(name);
  if (specialPoster) return specialPoster;

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(name)}`;

  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(`TMDB API error for "${name}"`);
  const { results } = await res.json();

  return results?.[0]?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${results[0].poster_path}`
    : "Not Found";
}

/**
 * Returns the best available image URL for a name from the posters map.
 *
 * @param {string} name
 * @param {Record<string, string>} posters - Current posters state from the hook.
 * @returns {string}
 */
export const handleImg = (name, posters) => {
  return posters[name] || localDefaultImage;
};

// ─── Special Movie Poster Rules ───────────────────────────────────────────────
// Hard-coded overrides for titles that don't resolve well via TMDB search.
const specialMoviePosterRules = [
  {
    includes: "Love, Death & Robots",
    url: "https://m.media-amazon.com/images/M/MV5BMTc1MjIyNDI3Nl5BMl5BanBnXkFtZTgwMjQ1OTI0NzM@._V1_FMjpg_UY2048_.jpg",
  },
  {
    includes: "Black Mirror:",
    url: "https://m.media-amazon.com/images/M/MV5BMGRjZDBjODMtMWQ1Zi00MWRkLTk5YTMtMDU1NTNkMzhkM2QwXkEyXkFqcGc@._V1_FMjpg_UX426_.jpg",
  },
  {
    includes: "El Eternauta",
    url: "https://m.media-amazon.com/images/M/MV5BYWUyZjBhOTctOGU0Ni00ZDE1LWE4NjUtNjM0NjAzYTEwMmRiXkEyXkFqcGc@._V1_FMjpg_UY8508_.jpg",
  },
  {
    includes: "Pluribus",
    url: "https://m.media-amazon.com/images/M/MV5BOWNlM2E1MDMtYmI5MS00NDQ1LWI3NTctM2VlNjQ5OTAxYTNmXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg",
  },
  {
    includes: "Dr. House",
    url: "https://m.media-amazon.com/images/M/MV5BMDZmZGRiYTEtMjRhYy00N2FkLTkzYjAtMWJhNWRiZDAzODA2XkEyXkFqcGc@._V1_FMjpg_UX1057_.jpg",
  },
];

/**
 * Returns a hard-coded poster URL for movies/shows that need special handling,
 * or undefined if no rule matches.
 *
 * @param {string | undefined} name
 * @returns {string | undefined}
 */
export const resolveSpecialMoviePoster = (name) => {
  if (!name) return undefined;

  const rule = specialMoviePosterRules.find((r) => {
    if (typeof r.test === "function") return r.test(name);
    if (typeof r.includes === "string") return name.includes(r.includes);
    return false;
  });

  return rule?.url;
};
