# Contributing

Thanks for your interest in improving `@embyth/scss-design-system`!

## Setup

Requirements: Node >= 22 and pnpm >= 10 (see `.nvmrc` / `packageManager`).

```bash
pnpm install
```

## Project layout

```
src/
├── config/       # Configuration maps ($settings, $colors, $config-semantic, typography, ...)
├── abstracts/
│   ├── functions/  # Pure Sass functions (color, token, fluid, units, ...)
│   └── mixins/     # Reusable mixins (media, container, motion, transition, ...)
├── foundation/   # Baseline styles emitted by generate-styles
├── vendor/       # Reset / normalize
├── _generator.scss  # The generate-styles orchestrator (layers, tokens, themes)
└── index.scss    # Public entry (@forward everything)
test/
├── functions/    # sass-true specs, one per function file
├── mixins/       # sass-true specs, one per mixin file
├── scss.spec.js  # Runs the sass-true suite through vitest
└── output.spec.js  # Compiled-CSS snapshots, error paths, packaging smoke tests
```

## Workflow

- `pnpm test` — full suite (sass-true unit specs + CSS snapshot/integration tests).
- `pnpm test:watch` — watch mode.
- `pnpm lint` / `pnpm lint:fix` — stylelint over `src/` and `test/`.
- `pnpm format` / `pnpm format:fix` — prettier.

### Rules of thumb

1. **Every new function or mixin ships with a spec** in the matching `test/functions/` or `test/mixins/` file, forwarded
   from the folder's `index.scss`.
2. **No Sass deprecations.** `test/output.spec.js` compiles with `fatalDeprecations` — new warnings fail CI. Use
   `ternary()` instead of the deprecated Sass `if()`, `sass:` modules instead of global built-ins, and `@use`/`@forward`
   instead of `@import`.
3. **Default output is sacred.** With the default `$settings`, the compiled CSS must not change unless the change is an
   intentional, documented fix — snapshot tests enforce this. New behavior goes behind a setting flag.
4. **Components consume semantic tokens.** New token-aware code uses `token()`, never raw palette values.
5. Configuration maps must stay `!default` + `map.deep-merge` so consumers can override any subset via
   `@use ... with (...)`.

## Commits & releases

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) and are validated by commitlint + devmoji
hooks (run `pnpm install` once so husky registers them). Releases are fully automated with release-please — merging to
`main` with `feat:`/`fix:` commits drives the next version; never bump versions manually.

## Pull requests

- Branch from `main`, keep PRs focused.
- CI must pass: lint, format check, tests, publint, example builds.
- If the compiled output changes, regenerate snapshots (`pnpm test -- -u`) and explain why in the PR description.
