/// <reference types="vite/client" />

/** Optional public CMS connection values exposed by Vite at build time. */
interface ImportMetaEnv {
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
}

/** Adds the application's public environment contract to Vite module metadata. */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
