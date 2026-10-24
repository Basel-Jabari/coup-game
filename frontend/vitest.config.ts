import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["../integration/tests/**/*.test.ts", "../integration/tests/**/*.test.tsx"],
    clearMocks: true,
  },
});
