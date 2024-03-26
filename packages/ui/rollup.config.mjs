import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from 'rollup-plugin-esbuild'
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";
import preserveDirectives from 'rollup-preserve-directives'

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  esbuild({
    sourceMap: true,
    minify: true,
  }),
  preserveDirectives()
]

const external = [
  /node_modules/,
]

const outputOptions = {
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: true
}

export default [
  {
    input: `src/index.ts`,
    plugins,
    external,
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].js',
        ...outputOptions
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].mjs',
        ...outputOptions
      },
    ],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
