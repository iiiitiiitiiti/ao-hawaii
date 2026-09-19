/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { VitePWA } from "vite-plugin-pwa";
import { remarkLessonRefs } from "./src/lesson/remarkLessonRefs.ts";
import { remarkTermIds } from "./src/lesson/remarkTermIds.ts";

const base = "/ao-hawaii/";

export default defineConfig({
  base,
  plugins: [
    // include を .mdx に限る。既定では .md も MDX として扱われ、docs/ の Markdown を
    // ?raw で読めなくなる。
    // 講座の本文（content/<講座>/）にはレッスン参照と用語リンクの remark を掛ける。
    // ウクレレ教材の本文（content/ukulele/）には掛けない（ハワイ語の講座向けの変換のため）。
    // 2つの include は排他にする。重なると変換済みの JS をもう一度 MDX として読んで壊れる。
    {
      enforce: "pre",
      ...mdx({
        include: ["**/*.mdx"],
        exclude: ["**/content/ukulele/**"],
        remarkPlugins: [remarkGfm, remarkLessonRefs, remarkTermIds],
        providerImportSource: "@mdx-js/react",
      }),
    },
    {
      enforce: "pre",
      ...mdx({
        include: ["**/content/ukulele/**/*.mdx"],
        remarkPlugins: [remarkGfm],
        providerImportSource: "@mdx-js/react",
      }),
      name: "mdx-ukulele",
    },
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "apple-touch-icon.png"],
      manifest: {
        id: base,
        name: "Aʻo Hawaiʻi — ハワイを学ぶ講座",
        short_name: "Aʻo Hawaiʻi",
        description: "ハワイの地理・生きもの・神話・歴史・フラ・ハワイ語の講座と、メレを読む、ウクレレ教材",
        lang: "ja",
        display: "standalone",
        start_url: base,
        scope: base,
        theme_color: "#1c4f7a",
        background_color: "#fbf9f4",
        icons: [
          { src: "icon.svg", sizes: "any", type: "image/svg+xml" },
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          { src: "apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
      },
      workbox: {
        navigateFallback: "index.html",
        // 図版（public/images、28MB）は precache せず、見たものから runtime cache に入れる
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,json,webmanifest}"],
        globIgnores: ["**/images/**"],
        // 本文の MDX を全部 eager に束ねるので main chunk が大きい。既定の 2MiB で precache から外れないようにする
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith(`${base}images/`),
            handler: "CacheFirst",
            options: {
              cacheName: "ao-hawaii-images",
              expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    env: { TZ: "Asia/Tokyo" },
  },
});
