/// <reference types="@types/node" />
import path from "node:path";
import { defineConfig } from "vite-plus";
export default defineConfig({
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
      check: ["vpr lint", "vpr test"],
    },
  },
  server: { host: true },
  staged: { "*.{ts}": "vpr check && vpr fmt" },
});