import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
    target: "https://wdp-backend.onrender.com",
    changeOrigin: true,
    secure: true,
  },
    },
    allowedHosts: ["wdp-frontend.onrender.com"],
  },
});
