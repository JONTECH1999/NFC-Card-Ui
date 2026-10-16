import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const htmlPages = [
  "index.html",
  ...Array.from({ length: 12 }, (_, index) => `index${index + 1}.html`),
];

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlPages.map((page) => [page.slice(0, -5), resolve(rootDir, page)]),
      ),
    },
  },
});
