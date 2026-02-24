import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  // Lee la variable de entorno del proceso durante el build
  const base = process.env.VITE_BASE_PATH || "/";

  return {
    base,
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});
