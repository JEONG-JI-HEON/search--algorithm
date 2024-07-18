import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log(env);

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        // "/v1": {
        //   target: env.VITE_API_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        "/v2": {
          target: env.VITE_API_URL2,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/v2/, ""),
        },
      },
    },
  });
};
