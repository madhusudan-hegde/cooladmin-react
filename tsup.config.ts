import { defineConfig } from 'tsup'

// Per-file (unbundled) ESM output. Each source module compiles to its own
// dist file so the 'use client' boundary survives per component: RSC-authored
// components stay server components for consumers, and bundlers can tree-shake
// through the barrel (sideEffects in package.json covers the rest).
//
// chart.js is loaded via dynamic import() inside effects (widget/chart.tsx,
// widget/sparkline.tsx); in unbundled output that specifier stays as written
// and resolves from the consumer's node_modules (an optional peer dependency).
//
// Framework adapters (src/adapters/*) are the only modules that import a
// router (`next/navigation`, `react-router`). They are published as separate
// subpath exports (`./next`, `./react-router`) with their own .d.ts and are
// deliberately NOT re-exported from src/index.ts, so the core stays
// framework-agnostic and consumers never pull in a router they don't use.
//
// src/scss/** is NOT handled here — `npm run build:css` compiles
// src/scss/cooladmin.scss → dist/css/cooladmin.css with sass.
//
// fix-dist.js post-processes the output: re-applies 'use client' directives
// (esbuild strips them) and makes relative imports fully specified (.js) so
// the output works under webpack's ESM fullySpecified resolution.
export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.test.*', '!src/scss/**'],
  format: ['esm'],
  bundle: false,
  dts: {
    entry: {
      index: 'src/index.ts',
      'adapters/next': 'src/adapters/next.tsx',
      'adapters/react-router': 'src/adapters/react-router.tsx',
    },
  },
  sourcemap: false,
  clean: true,
})
