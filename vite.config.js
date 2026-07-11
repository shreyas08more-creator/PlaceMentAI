import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <--- Integrated Tailwind v4 modern compiler engine

export default defineConfig(({ mode }) => {
  // Pulls system-level context values securely from local .env environments
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss() // <--- Hooks Tailwind v4 native build layer directly into your project
    ],
    server: {
      proxy: {
        "/api/resend": {
          target: "https://api.resend.com",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace("/api/resend", ""),
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`
          }
        }
      }
    }
  };
});