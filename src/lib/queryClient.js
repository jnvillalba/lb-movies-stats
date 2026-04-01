import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,                // Posters never change — never re-fetch
      gcTime: 1000 * 60 * 60 * 24 * 30,  // Keep in cache for 30 days
      retry: 1,                           // One retry on failure
      refetchOnWindowFocus: false,        // Static data — no need
      refetchOnReconnect: false,
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "tmdb-poster-cache",
  throttleTime: 2000, // Avoid excessive writes to localStorage
});
