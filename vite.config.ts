/// <reference types="@types/node" />
import path from "node:path";
import { defineConfig } from "vite-plus";
export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [{ name: "untodo", specifier: "untodo/eslint" }],
    rules: {
      "untodo/no-todo": "error",
      "untodo/no-fixme": "error",
      "untodo/no-hack": "warn",
    },
  },
  test: {
    include: ["src/**/*.test.ts", "__tests__/**/*.test.ts"],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: "text",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
