import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: {
        // Compress PNGs — quality 80 gives ~60-70% size reduction with no visible loss
        quality: 80,
      },
      jpg: {
        quality: 82,
      },
      jpeg: {
        quality: 82,
      },
      webp: {
        lossless: false,
        quality: 82,
      },
      svg: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
  ],
});
