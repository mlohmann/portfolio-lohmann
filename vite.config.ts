import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/** Vite dev-server and production-build settings for the React application. */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  // Only these two values are browser configuration. Other prefixed values must
  // never be exposed through import.meta.env, including during development.
  const publicNames = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  ];
  return {
    plugins: [
      react(),
      {
        name: "separate-spa-fallback",
        configurePreviewServer(server) {
          // Run after Vite's static-file and HTML fallback middleware. Match the
          // Apache rewrite shipped in public/.htaccess without changing assets.
          return () => {
            server.middlewares.use((request, _response, next) => {
              const pathname = new URL(
                request.originalUrl ?? "/",
                "http://localhost",
              ).pathname;
              if (
                request.url === "/index.html" &&
                pathname !== "/" &&
                pathname !== "/index.html"
              ) {
                request.url = "/spa.html";
              }
              next();
            });
          };
        },
      },
    ],
    envPrefix: [],
    define: Object.fromEntries(
      publicNames.map((name) => [
        `import.meta.env.${name}`,
        JSON.stringify(env[name] ?? ""),
      ]),
    ),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true,
    },
    build: {
      outDir: "dist",
      sourcemap: process.env.NODE_ENV === "development",
      minify: "esbuild",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id))
              return "react";
            if (id.includes("/@tanstack/")) return "tanstack";
            if (id.includes("/styled-components/") || id.includes("/stylis/"))
              return "styles";
            return undefined;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "assets/css/[name]-[hash][extname]";
            }
            if (/\.(png|jpe?g|svg|gif|webp)$/.test(assetInfo.name || "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "@tanstack/react-router",
        "@tanstack/react-query",
        "styled-components",
      ],
    },
  };
});
