import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": fileURLToPath(
        new URL("./src/components/", import.meta.url)
      ),
      "@shared": fileURLToPath(new URL("./src/shared/", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages/", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api/", import.meta.url)),
    },
  },
});
