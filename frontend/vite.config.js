import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
});
