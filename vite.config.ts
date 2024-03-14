import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import * as dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  base: "/weather",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(new URL("./src", import.meta.url).pathname),
    },
  },
});
