import { useQuery } from "@tanstack/react-query";
import { fetchSupabaseContent, isSupabaseConfigured } from "@/data/supabase";

/** Consumer-facing query state, with absent data normalized to null. */
interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Vite can statically discover nested data modules through import.meta.glob;
// a variable dynamic import would not resolve project details under subfolders.
const jsonModules = import.meta.glob<{ default: unknown }>("../data/**/*.json");

/**
 * Load a content collection or detail record through the configured CMS or JSON.
 *
 * @typeParam T - Shape of the requested content.
 * @param url - Data path relative to `src/data`, without the `.json` extension.
 * @returns Query data (or `null` before success), loading state, and any error. */
function useContent<T>(url: string): FetchResult<T> {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: ["json", url],
    queryFn: async () => {
      if (isSupabaseConfigured) {
        const [collection, ...slugParts] = url.split("/");
        const slug = slugParts.join("/") || collection;

        // Use the CMS when configured; request failures remain query errors
        // rather than silently falling back to potentially stale bundled JSON.
        return fetchSupabaseContent<T>(collection, slug);
      }

      const modulePath = `../data/${url}.json`;
      const loadModule = jsonModules[modulePath];

      if (!loadModule) {
        throw new Error(`JSON data file not found: ${url}`);
      }

      const module = await loadModule();
      return module.default as T;
    },
    // CMS data becomes eligible for refetch after a minute; bundled JSON is static.
    staleTime: isSupabaseConfigured ? 60 * 1000 : Infinity,
    gcTime: 30 * 60 * 1000,
  });

  return {
    data: data ?? null,
    isLoading,
    error: error as Error | null,
  };
}

export default useContent;
