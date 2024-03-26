import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  // banner: {
  //   js: `"use client"`,
  // },
  sourcemap: true,
  dts: true,
  outDir: "dist",
  format: ["cjs", "esm"],
  minify: true,
  treeshake: false, // TODO: Look for a way to enable treeshaking without removing the 'use client' directive.
  clean: true,
  entry: {
    index: "src/index.ts",
  },
  external: ["react"],
  // onSuccess: "tsc",
}));
