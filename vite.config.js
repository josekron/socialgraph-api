import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "json-summary", "json", "html"],
      include: ["src/**"],
      reportOnFailure: true,
    },
  },
});
