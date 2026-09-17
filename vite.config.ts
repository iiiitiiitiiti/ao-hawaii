/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

const base = "/ao-hawaii/";

export default defineConfig({
  base,
  plugins: [
    // include を .mdx に限る。既定では .md も MDX として扱われ、docs/ の Markdown を
    // ?raw で読めなくなる
    {
      enforce: "pre",
      ...mdx({
        include: ["**/*.mdx"],
        remarkPlugins: [remarkGfm],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    env: { TZ: "Asia/Tokyo" },
  },
});
