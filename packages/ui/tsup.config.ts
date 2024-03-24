import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  sourcemap: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  treeshake: true,
  clean: !options.watch,
  entry: {
    index: 'src/index.ts',
  },
}))
