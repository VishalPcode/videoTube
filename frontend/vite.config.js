import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";
import { FlatESLint } from "eslint/use-at-your-own-risk";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
   server: {
    open: false
  },
});
