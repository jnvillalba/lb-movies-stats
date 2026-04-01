import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Each volume's data becomes its own chunk so the main bundle stays lean.
          // The route-level lazy() imports then load only the chunk they need.
          if (id.includes("/Lists/Vol1")) return "data-vol1";
          if (id.includes("/Lists/Vol2")) return "data-vol2";
          if (id.includes("/Lists/Vol3")) return "data-vol3";
          if (id.includes("/Lists/Vol4")) return "data-vol4";
          if (id.includes("/Lists/Vol5")) return "data-vol5";
          if (id.includes("/Lists/Vol6")) return "data-vol6";
          if (id.includes("/Lists/movies")) return "data-vol7";
          if (id.includes("/Lists/Vol8")) return "data-vol8";
          if (id.includes("/Lists/Vol9")) return "data-vol9";
          if (id.includes("/Lists/Vol10")) return "data-vol10";

          // Third-party libraries
          if (id.includes("node_modules/react")) return "vendor-react";
          if (id.includes("node_modules/react-router-dom")) return "vendor-router";
          if (id.includes("node_modules/bootstrap")) return "vendor-bootstrap";
          if (id.includes("node_modules/lodash")) return "vendor-lodash";
          if (id.includes("node_modules/framer-motion")) return "vendor-framer";
        },
      },
    },
  },
});
