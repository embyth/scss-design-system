# :lipstick: `@embyth/scss-design-system`

> A self-contained Sass design system: two-tier OKLCH color tokens, cascade layers, dark mode, fluid typography,
> container queries and a rich mixin library — all pure SCSS, zero runtime.

[![npm version](https://img.shields.io/npm/v/@embyth/scss-design-system)](https://www.npmjs.com/package/@embyth/scss-design-system)
[![CI](https://github.com/embyth/scss-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/embyth/scss-design-system/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#balance_scale-license)

## :sparkles: Highlights

- **Two-tier color tokens** — a constant palette (tier 1) plus semantic tokens (tier 2) that re-point per theme.
- **OKLCH-first** — author plain hex, ship perceptual channel triplets with one-argument alpha composition.
- **Dark mode, four ways** — data attribute, class, `prefers-color-scheme` or CSS `light-dark()`.
- **Cascade layers** — your app styles always win, no specificity wars.
- **Modern CSS, wrapped** — fluid `clamp()` values, container queries, `@starting-style`, typed `@property`,
  reduced-motion guards, standard scrollbar styling.
- **Everything is a config map** — deep-merged with defaults, you only declare overrides.
- **Fully tested** — every function and mixin has a [sass-true](https://github.com/oddbird/true) spec plus compiled-CSS
  snapshot coverage.

## :bookmark_tabs: Table of Contents

- [:rocket: Quick Start](#rocket-quick-start)
- [:gear: Configuration](#gear-configuration)
- [:bulb: Core Concepts](#bulb-core-concepts)
  - [Semantic Tokens (two-tier system)](#semantic-tokens-two-tier-system)
  - [Themes & Dark Mode](#themes--dark-mode)
  - [Cascade Layers](#cascade-layers)
  - [Customizing the Palette](#customizing-the-palette)
- [:books: API Reference](#books-api-reference)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spacing & Shape](#spacing--shape)
  - [Fluid Values](#fluid-values)
  - [Breakpoints & Media Queries](#breakpoints--media-queries)
  - [Container Queries](#container-queries)
  - [Elevation & Borders](#elevation--borders)
  - [Motion & Animation](#motion--animation)
  - [Loading Skeletons](#loading-skeletons)
  - [Scrollbars](#scrollbars)
  - [Text Utilities](#text-utilities)
  - [Accessibility](#accessibility)
  - [Layout Helpers](#layout-helpers)
  - [Utility Functions](#utility-functions)
  - [Shorthand Aliases](#shorthand-aliases)
- [:globe_with_meridians: Browser Support](#globe_with_meridians-browser-support)
- [:joystick: Examples](#joystick-examples)
- [:handshake: Contributing](#handshake-contributing)
- [:balance_scale: License](#balance_scale-license)
- [:thinking: Supporting Materials](#thinking-supporting-materials)

---

## :rocket: Quick Start

Install the package along with Dart Sass (>= 1.80):

```bash
# pnpm:
pnpm add -D @embyth/scss-design-system sass

# npm:
npm install -D @embyth/scss-design-system sass

# yarn:
yarn add -D @embyth/scss-design-system sass
```

Load it in your entry stylesheet with the Sass module system and emit the styles:

```scss
@use '@embyth/scss-design-system' as * with (
  $settings: (
    'semantic': true,
    // tier-2 semantic tokens
    'color-format': 'oklch',
    // channel triplets + alpha composition
    'layers': true,
    // cascade layers
  )
);

@include generate-styles;
```

Then build components from tokens and helpers:

```scss
.card {
  @include shape('xl');
  @include shadow($elevation: 'md');

  padding: space('2xl');
  font-size: fluid(16px, 20px);
  color: token('text-default');
  background-color: token('background-base');
  border: 1px solid token('border-default');
}
```

> [!NOTE]
>
> `@import` is deprecated by Sass and will be removed in Dart Sass 3.0.0 — always use `@use`/`@forward` with the
> `with (...)` configuration syntax. With Dart Sass >= 1.71 you can also load the package via the Node package importer:
> `@use 'pkg:@embyth/scss-design-system'`.

---

## :gear: Configuration

Everything lives in the `$settings` map. All configuration maps deep-merge with the defaults — you only declare what you
override. Read any setting back with the `config($key, $group)` helper.

| Setting                      | Default            | Description                                                                                                       |
| ---------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `'generators'.'light-reset'` | `true`             | Emit the light reset of sensible defaults.                                                                        |
| `'generators'.'normalize'`   | `false`            | Emit normalize.css. **Deprecated**, removed in v1.0.0.                                                            |
| `'generators'.'root'`        | `true`             | Emit the `:root` CSS variables.                                                                                   |
| `'prefix'`                   | `null`             | Prefix for every emitted CSS variable (e.g. `'ds'` → `--ds-color-primary`).                                       |
| `'color-format'`             | `'raw'`            | `'raw'` (whole colors) \| `'hsl'` \| `'oklch'` (channel triplets, enable alpha composition). `'oklch'` in v1.0.0. |
| `'semantic'`                 | `false`            | Emit tier-2 semantic tokens. `true` in v1.0.0.                                                                    |
| `'layers'`                   | `false`            | Wrap generated styles in CSS cascade layers. `true` in v1.0.0.                                                    |
| `'theme-strategy'`           | `'data-attribute'` | How dark overrides are emitted: `'data-attribute'` \| `'class'` \| `'media'` \| `'light-dark'`.                   |
| `'theme-selector'`           | `null`             | Custom selector for dark overrides (data-attribute/class strategies).                                             |
| `'color-fallback'`           | `false`            | Emit inline fallback values inside `var()` references.                                                            |
| `'poly-themed'`              | `false`            | Legacy whole-palette theming. **Deprecated**, use `'semantic'` + `$config-semantic-dark`.                         |
| `'paths'`                    | `./images` etc.    | Base paths for `images`, `icons` and `fonts` assets.                                                              |

Besides `$settings`, every scale is its own configurable map: `$colors`, `$config-semantic`, `$config-semantic-dark`,
`$config-font-stack`, `$config-font-size`, `$config-font-weight`, `$config-line-height`, `$config-letter-spacing`,
`$config-breakpoint`, `$config-space`, `$config-shape`, `$config-shadow`, `$config-z-index`, `$config-motion-duration`,
`$config-motion-timing` and `$config-keyframes`.

```scss
@use '@embyth/scss-design-system' as * with (
  $settings: (
    'prefix': 'app',
    'semantic': true,
  ),
  $config-breakpoint: (
    'md': 840px,
    // override one key, keep the rest
  ),
  $config-space: (
    '6xl': 128px,
    // or extend a scale with new keys
  )
);
```

---

## :bulb: Core Concepts

### Semantic Tokens (two-tier system)

The color system is layered in two tiers:

- **Tier 1 — palette**: the `$colors` map (`default`, `primary`, `secondary`, `success`, `warning`, `danger` × shades
  50–900). Constant across themes.
- **Tier 2 — semantic tokens**: the `$config-semantic` map gives palette values _purpose_ (`background-base`,
  `text-default`, `primary`, `primary-foreground`, …). Themes re-point these.

Enable with `'semantic': true` and consume tokens only through the `token()` function — components stay theme-agnostic:

```scss
.card {
  color: token('text-default');
  background-color: token('background-base');
  border: 1px solid token('border-default');

  // Alpha composition (requires 'color-format': 'hsl' or 'oklch'):
  box-shadow: 0 4px 16px token('text-default', 0.1);
}
```

The default token set: `background-base/subtle/elevated`, `text-default/muted/inverted`, `border-default/strong`,
`primary`, `secondary`, `success`, `warning`, `danger` (each with a `*-foreground` partner) and `focus-ring`.

Override, re-point or extend the maps when loading the system — custom tokens merge right in:

```scss
@use '@embyth/scss-design-system' as * with (
  $settings: (
    'semantic': true,
    'color-format': 'oklch',
  ),
  $config-semantic: (
    'primary': (
      'primary',
      600,
    ),
    // re-point at a palette shade
    'brand-glow': #7c3aed,
    // or add your own token with a raw color
  ),
  $config-semantic-dark: (
    'primary': (
      'primary',
      300,
    ),
  )
);
```

### Themes & Dark Mode

With semantic tokens enabled, dark mode is a tier-2 override — the palette never changes, only what the tokens point at.
Only the keys that differ need to be listed in `$config-semantic-dark`. Pick how the override is emitted with
`'theme-strategy'`:

| Strategy           | Emitted as                              | Use when                                                         |
| ------------------ | --------------------------------------- | ---------------------------------------------------------------- |
| `'data-attribute'` | `[data-theme=dark] { ... }` (default)   | JS toggles `document.documentElement.dataset.theme = 'dark'`     |
| `'class'`          | `.dark { ... }`                         | JS toggles a `dark` class on the root element                    |
| `'media'`          | `@media (prefers-color-scheme: dark)`   | Pure OS preference, no JS toggle needed                          |
| `'light-dark'`     | `light-dark(<light>, <dark>)` per token | No JS and no duplicate blocks; alpha falls back to `color-mix()` |

The system also emits the proper `color-scheme` declarations so form controls and scrollbars follow the active theme
automatically.

> [!NOTE]
>
> The legacy `'poly-themed'` + `$config-theme` approach (inverting the whole tier-1 palette per theme) still works but
> is deprecated and will be removed in v1.0.0.

### Cascade Layers

With `'layers': true` the generated styles are wrapped in CSS cascade layers, declared in this order:

1. `@layer reset` — the light reset (and normalize, if enabled)
2. `@layer base` — foundation defaults (root font setup, body baseline)
3. `@layer components` — declared but left empty, reserved for your component styles

Token custom properties stay unlayered on `:root`. Your app styles, when left unlayered, always win over everything the
system emits — no specificity wars:

```scss
@layer components {
  .button {
    /* your design-system-level component styles */
  }
}

.button.special {
  /* app-level override — beats the layer automatically */
}
```

### Customizing the Palette

The tier-1 palette lives in the `$colors` map — six groups with shades 50–900. Override any subset when loading the
system:

```scss
@use '@embyth/scss-design-system' as * with (
  $colors: (
    'primary': (
      500: #6644ff,
      600: #5233d4,
    ),
  )
);
```

With `'color-format': 'hsl'` or `'oklch'`, palette values are converted to channel triplets at compile time — you keep
authoring plain hex.

---

## :books: API Reference

All examples assume the system is loaded with `@use '@embyth/scss-design-system' as *`.

### Colors

| API                                                  | Kind     | Description                                                                               |
| ---------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `token($name, $alpha)`                               | function | **Preferred accessor.** Tier-2 semantic token reference; `$alpha` composes transparency.  |
| `color($category, $type, $only-color, $map, $alpha)` | function | Tier-1 palette CSS variable. `$only-color: true` returns the literal color value instead. |
| `color-value($category, $type, $map)`                | function | Literal palette color for compile-time math.                                              |
| `color-contrast($color)`                             | function | White or black — whichever passes the YIQ brightness check against `$color`.              |
| `channels($color, $format)`                          | function | Compile-time conversion of a color to `'hsl'`/`'oklch'` channel triplets.                 |
| `semantic-value($reference, $palette)`               | function | Resolves a semantic reference (`('group', shade)` pair or raw color) to its color value.  |

Use `token()` for everything that should follow the theme; reach for `color()` only for decorative values that must stay
constant:

```scss
.selector {
  color: token('text-default'); // theme-aware
  background-color: color('primary', 50); // theme-constant
  border-color: token('border-default', 0.5); // 50% alpha
}

.badge {
  // pick a readable label color at compile time:
  color: color-contrast(color-value('primary', 500));
}
```

### Typography

Set up self-hosted fonts with `font-setup()` — it generates the full `@font-face` block, resolving files from
`config('fonts', 'paths')`:

```scss
@include font-setup($name: 'Roboto', $filename: 'Roboto-Regular', $exts: woff2 ttf);
@include font-setup($name: 'Roboto', $filename: 'Roboto-Bold', $weight: 700, $exts: woff2 ttf);
```

| API                      | Kind     | Description                                                                                 |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------- |
| `font-family($family)`   | function | Font stack from `$config-font-stack` (default key: `'default'`).                            |
| `font-size($range)`      | function | Size from `$config-font-size` (`'default'`, `'h1'`, `'h2'`, `'text'`, `'small'`, `'tiny'`). |
| `font-weight($weight)`   | function | Weight from `$config-font-weight` (`'thin'` 100 → `'black'` 900, plus aliases).             |
| `line-height($range)`    | function | Line height from `$config-line-height`.                                                     |
| `letter-spacing($range)` | function | Letter spacing from `$config-letter-spacing`.                                               |
| `font-setup(...)`        | mixin    | `@font-face` generator: `$name`, `$filename`, `$weight`, `$style`, `$display`, `$exts`.     |

```scss
.selector {
  font-family: font-family('default');
  font-size: font-size('h1');
  font-weight: font-weight('semi-bold');
  line-height: line-height('h1');
  letter-spacing: letter-spacing('default');
}
```

Every scale is a map you can override or extend — name keys after intent (component names work well):

```scss
@use '@embyth/scss-design-system' as * with (
  $config-font-size: (
    'hero': 3rem,
    'caption': 0.8125rem,
  )
);
```

### Spacing & Shape

| API                               | Kind     | Description                                                                                               |
| --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `space($space, $map)`             | function | Value from the spacing scale (`'xs'` 2px → `'5xl'` 80px).                                                 |
| `shape($size)`                    | function | Border radius from the shape scale (`'sm'`–`'xxl'`, `'circle'`, `'square'`).                              |
| `shape($size, $important)`        | mixin    | Applies `border-radius` from the shape scale.                                                             |
| `size($width, $height, $logical)` | mixin    | Width + height in one call (height defaults to width). `$logical: true` emits `inline-size`/`block-size`. |

```scss
.selector {
  @include shape('md');
  @include size(48px); // width + height
  @include size(100%, 320px, $logical: true); // inline-size / block-size

  padding: space('none') space('md');
  gap: space('xl');
}
```

### Fluid Values

`fluid($min, $max, $min-breakpoint, $max-breakpoint)` builds a `clamp()` expression that interpolates any length between
two viewport widths — fluid typography and fluid spacing with one function. Breakpoints accept `$config-breakpoint` keys
or raw lengths (defaults: `'xs'` to `'xl'`):

```scss
.selector {
  font-size: fluid(16px, 20px);
  // -> clamp(1rem, 0.9167rem + 0.4167vw, 1.25rem)

  padding-block: fluid(16px, 48px, 'sm', 'xxl');
}
```

### Breakpoints & Media Queries

The breakpoint scale lives in `$config-breakpoint`; `bp($point)` resolves a key (or passes lengths through):

```scss
$config-breakpoint: (
  'xs': 320px,
  'sm': 768px,
  'md': 900px,
  'lg': 1024px,
  'xl': 1280px,
  'xxl': 1440px,
);
```

| API                                              | Description                                           |
| ------------------------------------------------ | ----------------------------------------------------- |
| `breakpoint($breakpoint, $logic, $mobile-first)` | The base mixin — mobile-first by default.             |
| `min-xs` … `min-xxl`                             | Mobile-first: the breakpoint and above.               |
| `max-xs` … `max-xxl`                             | Desktop-first: below the breakpoint.                  |
| `only-xs` … `only-xxl`                           | Exactly one breakpoint range.                         |
| `not-xs` … `not-xxl`                             | Readable aliases of the `min-*` family.               |
| `hide-at-xs` … `hide-at-xxl`                     | `display: none` within exactly that breakpoint range. |

```scss
.selector {
  opacity: 0.5;

  @include min-md {
    opacity: 0.75; // 900px and up
  }

  @include only-xl {
    opacity: 1; // 1280px–1439px only
  }

  @include max-sm {
    display: none; // below 768px
  }
}
```

### Container Queries

`container($name, $type)` marks an element as a containment context; `container-up($size, $name)` /
`container-down($size, $name)` query against it. `$size` accepts `$config-breakpoint` keys or raw lengths:

```scss
.sidebar {
  @include container('sidebar');
}

.widget {
  display: block;

  @include container-up('sm', 'sidebar') {
    display: flex;
  }

  @include container-down(400px) {
    font-size: font-size('small');
  }
}
```

### Elevation & Borders

| API                                                  | Kind  | Description                                                           |
| ---------------------------------------------------- | ----- | --------------------------------------------------------------------- |
| `shadow($x, $y, $blur, $spread, $color, $elevation)` | mixin | Custom shadow, or a predefined elevation (`'xs'`–`'xxl'`, `'inner'`). |
| `border($direction, $size, $style, $color)`          | mixin | Border on one side or all.                                            |

```scss
.selector {
  @include shadow($elevation: 'xl'); // predefined elevation
  @include shadow(0, 2px, 8px, 0, token('text-default', 0.15)); // custom
  @include border(top, 1px, solid, token('border-default'));
}
```

### Motion & Animation

Durations and easing curves come from `$config-motion-duration` (`'fast'`, `'base'`, `'slow'`, …) and
`$config-motion-timing` (`'standard'`, `'overshoot'`, …); raw values pass through.

| API                                                                                                    | Kind  | Description                                                                               |
| ------------------------------------------------------------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- |
| `transition($property, $duration, $timing-function, $delay, $will-change, $respect-motion-preference)` | mixin | Transition shorthand; pass lists for per-property control.                                |
| `animate($name, $duration, $timing, $delay, $iterations, $direction)`                                  | mixin | Plays a keyframe animation from `$config-keyframes` (emits keyframes once, deduplicated). |
| `motion-safe` / `motion-reduce`                                                                        | mixin | Wraps content in the corresponding `prefers-reduced-motion` media query.                  |
| `starting-style`                                                                                       | mixin | Emits an `@starting-style` block — the state an element transitions _from_ on entry.      |
| `transition-discrete`                                                                                  | mixin | `transition-behavior: allow-discrete` for `display`/`overlay` transitions.                |
| `register-property($name, $syntax, $inherits, $initial-value)`                                         | mixin | Registers a typed custom property via `@property` (deduplicated) — makes it animatable.   |

```scss
.selector {
  @include transition(opacity transform, 'fast', $will-change: false, $respect-motion-preference: true);

  @include motion-safe {
    animation: bounce 1s infinite;
  }
}
```

Dialogs and popovers animate in **and out** with pure CSS:

```scss
dialog[open] {
  @include transition(opacity translate display overlay, 'slow', $respect-motion-preference: true);
  @include transition-discrete;

  @include starting-style {
    opacity: 0;
    translate: 0 8px;
  }
}
```

Typed custom properties animate for real:

```scss
.progress {
  @include register-property('--progress', '<percentage>', $initial-value: 0%);
  @include transition('--progress', 'slow');

  background: linear-gradient(90deg, token('primary'), token('secondary')) 0 0 / var(--progress) 100% no-repeat;
}
```

### Loading Skeletons

`skeleton()` paints a multi-line shimmering placeholder with masked CSS gradients — the shine is clipped to the lines
and travels the viewport in one page-wide wave (`background-attachment: fixed`), resting for the final third of each
cycle. Reduced motion is respected automatically.

| Parameter                                      | Default                               | Description                                                                  |
| ---------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| `$lines`                                       | `2`                                   | Number of lines (the last renders shorter).                                  |
| `$line-height`                                 | `24px`                                | Height of each line.                                                         |
| `$line-gap`                                    | `8px`                                 | Gap between lines.                                                           |
| `$background`                                  | `#e1e4e8`                             | Line color — accepts `token()` values.                                       |
| `$shimmer`                                     | `rgba(255, 255, 255, 0.6)`            | Shine color — pick one that **contrasts with `$background`** in every theme. |
| `$speed`                                       | `3s`                                  | One shimmer cycle.                                                           |
| `$level`                                       | `'selector'`                          | `'selector'` applies directly; `'empty'` only while the element is `:empty`. |
| `$radius`                                      | `4px`                                 | Line corner radius; large values yield pills, `null`/`0` for square corners. |
| `$shine-size` / `$shine-blur` / `$shine-angle` | `clamp(...)` / `clamp(...)` / `96deg` | Geometry of the travelling shine.                                            |

```scss
.placeholder {
  @include skeleton(3, 18px, 12px, $background: token('border-default'), $shimmer: token('skeleton-shine', 0.85));
}
```

> [!TIP]
>
> Define a custom semantic token for the shine (e.g. a mid-gray) so it stays visible over the line color in both light
> and dark mode — mid-grays are darker than light-mode lines and lighter than dark-mode ones.

### Scrollbars

`scrollbar($thumb-background-color, $track-background-color, $size, $shape, $stable, $transition, $transition-duration, $modern)`

With `$modern: true` (recommended, default in v1.0.0) it emits the standard `scrollbar-width`/`scrollbar-color`
properties; otherwise the legacy `::-webkit-*` styling with an optional fade animation. `$stable` reserves the gutter.

```scss
.list {
  @include scrollbar(token('primary'), transparent, sm, $stable: true, $modern: true);
}
```

### Text Utilities

| API                                               | Description                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| `text-ellipsis($number-of-lines)`                 | Single-line or multiline (line-clamp) truncation with an ellipsis. |
| `text-balance` / `text-pretty`                    | `text-wrap: balance` (headings) / `pretty` (body copy).            |
| `word-wrap`                                       | Break long unbreakable strings (URLs etc.).                        |
| `text-selection($color, $background, $is-direct)` | Styles `::selection` for the element or its children.              |
| `placeholder`                                     | Styles input/textarea `::placeholder` content.                     |

```scss
.teaser {
  @include text-ellipsis(2);
}

.heading {
  @include text-balance;
}

.input {
  @include placeholder {
    color: token('text-muted');
  }
}
```

### Accessibility

| API                                                   | Description                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `focus-ring($size, $offset, $color, $radius, $thick)` | Animated, `:focus-visible`-based focus outline with `prefers-contrast` support.       |
| `visually-hidden` / `visually-unhidden`               | Hide content visually while keeping it available to assistive technology.             |
| `forced-colors`                                       | Styles applied only when a forced-colors mode (e.g. Windows High Contrast) is active. |

```scss
.button {
  @include focus-ring($color: token('focus-ring'));

  @include forced-colors {
    border: 1px solid ButtonText;
  }
}

.sr-only {
  @include visually-hidden;
}
```

### Layout Helpers

| API                                                                      | Kind     | Description                                                                                                                  |
| ------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `position($position, $top, $right, $bottom, $left, $axis, $logical)`     | mixin    | Positioning shorthand; `$axis: both/horizontal/vertical` centers via transform; `$logical: true` emits `inset-*` properties. |
| `pseudo($loc, $content, $position, $top, $right, $bottom, $left, $axis)` | mixin    | Generates a `::before`/`::after` pseudo element with positioning in one call.                                                |
| `z($layer)`                                                              | function | Z-index from `$config-z-index` (`'deep'`, `'base'`, `'default'`, `'sticky'`, `'modal'`, `'tooltip'`, …).                     |
| `z-index($layer, $important)`                                            | mixin    | Applies the z-index property from the same scale.                                                                            |
| `triangle($size, $color, $direction)`                                    | mixin    | Border-built triangle (`up`/`right`/`down`/`left`) — tooltips, dropdown arrows.                                              |
| `icon-size($width, $height)`                                             | mixin    | Sizes inline SVG icons.                                                                                                      |
| `clear-btn` / `clear-list`                                               | mixin    | Strips default button / list styling.                                                                                        |
| `escape-to-parent($selector)`                                            | mixin    | Re-attaches the block under a given parent selector.                                                                         |

```scss
.modal {
  @include position(fixed, $axis: both); // centered both axes
  @include z-index('modal');
}

.tooltip_arrow {
  @include triangle(12px 6px, token('text-default'), down);
}

.menu {
  @include clear-list;
}
```

### Utility Functions

| API                                        | Description                                                                         |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `config($key, $group)`                     | Reads a value from `$settings` (e.g. `config('fonts', 'paths')`).                   |
| `bp($point)`                               | Resolves a `$config-breakpoint` key; numbers pass through (unitless become px).     |
| `remify($value)` / `em($value)`            | Converts px (or unitless) values to `rem`/`em` against the root font size.          |
| `strip-unit($value)`                       | Removes the unit from a number.                                                     |
| `ternary($condition, $if-true, $if-false)` | Inline conditional — a drop-in replacement for the deprecated Sass `if()` function. |
| `str-replace($string, $search, $replace)`  | Replaces all occurrences of a substring.                                            |

```scss
.selector {
  width: remify(320px); // -> 20rem
  margin-inline: ternary($centered, auto, 0);
}
```

### Shorthand Aliases

The high-frequency getters ship with compact aliases — same arguments, same behavior, fewer keystrokes:

| Alias  | Full name          |
| ------ | ------------------ |
| `ff()` | `font-family()`    |
| `fs()` | `font-size()`      |
| `fw()` | `font-weight()`    |
| `lh()` | `line-height()`    |
| `ls()` | `letter-spacing()` |
| `sp()` | `space()`          |
| `sh()` | `shape()`          |

```scss
.selector {
  padding: sp('md') sp('xl');
  font-size: fs('small');
  font-weight: fw('semi-bold');
  line-height: lh('default');
  border-radius: sh('lg');
}
```

---

## :globe_with_meridians: Browser Support

The system targets evergreen browsers. Everything emitted by the default configuration works in all modern browsers; the
opt-in features rely on widely supported platform primitives:

- **CSS custom properties, `color-scheme`** — universal.
- **OKLCH / `color-mix()` / relative color values** — Baseline 2023.
- **Cascade layers (`@layer`)** — Baseline 2022.
- **Container queries** — Baseline 2023.
- **`light-dark()`** — Baseline 2024.
- **`@starting-style`, `transition-behavior: allow-discrete`** — Baseline 2024.
- **`text-wrap: balance/pretty`, `scrollbar-width/color`, `dvh`** — Baseline 2024 (with graceful fallbacks where
  applicable).

If you must support older browsers, stay on `'color-format': 'raw'` and `'layers': false` (the defaults) and enable
`'color-fallback': true`.

---

## :joystick: Examples

Three runnable example apps live in [`examples/`](examples/). They all render the same screen — a glassmorphism card
over an animated noise canvas with a theme switch — and exist to show exactly how to wire the system into an app: the
`@forward ... with (...)` configuration, semantic tokens, OKLCH and cascade layers.

- [`examples/vanilla`](examples/vanilla) — Vite + vanilla JavaScript.
- [`examples/react-ts`](examples/react-ts) — Vite + React + TypeScript.
- [`examples/vue-ts`](examples/vue-ts) — Vite + Vue + TypeScript.

```bash
pnpm install
pnpm vanilla:dev   # or: pnpm react:dev / pnpm vue:dev
```

---

## :handshake: Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for the project layout, testing workflow (`pnpm test`
runs sass-true specs + compiled-CSS snapshots) and the rules of thumb — every new function or mixin ships with a spec,
and the default output never changes silently.

---

## :balance_scale: License

[MIT](https://github.com/embyth/scss-design-system/blob/main/LICENSE) © Rostyslav Miniukov

---

## :thinking: Supporting Materials

- [Color in Design Systems](https://medium.com/eightshapes-llc/color-in-design-systems-a1c80f65fa3)
- [OKLCH in CSS: why we moved from RGB and HSL](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [A Complete Guide to CSS Cascade Layers](https://css-tricks.com/css-cascade-layers/)
- [Responsive Typography With Sass Maps](https://www.smashingmagazine.com/2015/06/responsive-typography-with-scss-maps/)
- [The Type System](https://material.io/design/typography/the-type-system.html#type-scale)
- [Modular Scale](http://www.modularscale.com/)
- [Sass Docs](https://sass-lang.com/documentation/)
