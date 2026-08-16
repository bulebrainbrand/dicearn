/// <reference types="@types/node" />
import path from "node:path";
import { defineConfig } from "vite-plus";
export default defineConfig({
  build: {
    rolldownOptions: {
      input: "index.html",
      output: {
        codeSplitting: {
          groups: [
            {
              name: "phaser-vendor",
              test: /node_modules[\\/](?:phaser)/,
              priority: 20, // large-libsより優先
            },
            {
              name: "large-libs",
              test: /node_modules/,
              minSize: 100000, // 100KB
              maxSize: 200000, // 250KB
              priority: 10,
            },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1600,
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    jsPlugins: [{ name: "untodo", specifier: "untodo/eslint" }],
    rules: {
      "typescript/await-thenable": "error",
      "typescript/no-array-delete": "error",
      "typescript/no-unsafe-type-assertion": "error",
      "untodo/no-todo": "warn",
      "untodo/no-fixme": "warn",
      "untodo/no-hack": "warn",
    },
  },
  fmt: {
    endOfLine: "lf",
    singleQuote: false,
    quoteProps: "as-needed",
    printWidth: 80,
    insertFinalNewline: false,
    sortPackageJson: true,
    objectWrap: "collapse",
    ignorePatterns: ["*.json"],
  },
  test: {
    include: ["src/**/*.test.ts", "__tests__/**/*.test.ts"],
    coverage: { enabled: true, provider: "v8", reporter: "text" },
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  run: {
    tasks: {
      lint: ["vp lint"],
      test: ["vp test --run  --passWithNoTests"],
      fmt: ["vp fmt"],
      dev: ["vp dev --host"],
      tunnel: ["cloudflared tunnel --url http://localhost:5173"],
      check: ["vpr lint", "vpr test"],
    },
    cache: { tasks: false },
  },
  server: { host: true, allowedHosts: true },
  staged: { "*.{ts}": "vpr check && vpr fmt" },
});