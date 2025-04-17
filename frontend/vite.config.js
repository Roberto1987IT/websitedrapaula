import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- Add this import

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- Add this
    },
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
});