# :lipstick: `@embyth/scss-design-system`

> Embyth's Sass design system template for building scalable and maintainable CSS.

## :bookmark_tabs: Table of Contents

- [:lipstick: `@embyth/scss-design-system`](#lipstick-embythscss-design-system)
  - [:bookmark_tabs: Table of Contents](#bookmark_tabs-table-of-contents)
  - [:wrench: Installation](#wrench-installation)
  - [:eyes: Usage](#eyes-usage)
  - [:jigsaw: Extending the config](#jigsaw-extending-the-config)
  - [:paintbrush: Themes](#paintbrush-themes)
  - [:triangular_ruler: System Architecture](#triangular_ruler-system-architecture)
    - [Color System](#color-system)
    - [Accessibility](#accessibility)
    - [Border System](#border-system)
    - [Media Queries System](#media-queries-system)
    - [Elevation System](#elevation-system)
    - [Motion System](#motion-system)
    - [Shape System](#shape-system)
    - [Space System](#space-system)
    - [Typography System](#typography-system)
      - [Type System](#type-system)
      - [Font Size](#font-size)
      - [Font Weight](#font-weight)
      - [Line Height](#line-height)
      - [Letter Spacing](#letter-spacing)
      - [Typography Usage](#typography-usage)
  - [:thinking: Supporting Materials](#thinking-supporting-materials)

---

## :wrench: Installation

```bash
# Yarn:
yarn add @embyth/scss-design-system

# npm:
npm install @embyth/scss-design-system

# pnpm:
pnpm add @embyth/scss-design-system
```

---

## :eyes: Usage

Add it to your entry css file (e.g. `index.scss`):

```scss
@import '@embyth/scss-design-system';
```

---

## :jigsaw: Extending the config

You can access any setting with the setting() helper function. Below, you can see the $settings map (object) with its default values.

```scss
$settings: (
  // List of generators to include into the styles.
  'generators':
    (
      // Whether to include the reset of sensible defaults.
      'light-reset': true,
      // Whether to include the normalize.css file.
      'normalize': false,
      // Whether to include the root css variables.
      'root': true
    ),
  // The prefix to use for all CSS variables.
  'prefix': null,
  // Whether the project is poly-themed or not.
  'poly-themed': false,
  // Whenever to use the color fallbacks for CSS variables.
  'color-fallback': false,
  // The paths to use for the images, icons and fonts.
  'paths':
    (
      'images': './images',
      'icons': './icons',
      'fonts': './fonts',
    )
);
```

---

## :paintbrush: Themes

Design system uses CSS custom properties to handle the theming. It means that you can easily overwrite the colors if needed (like in a case of a dark theme mode).

Setting up your default theme is simple but can be tricky and complicated because of the many values (from the `$colors` map). For redeclaring dark mode or any other mode, we have a predefined `$config-theme` map which you can use when importing this system (you don't have to use it if you have only one theme mode).

For summing up, if you have only one theme mode, you need to use the `$colors` map. If you have more than one theme mode, you need to use the `$config-theme` map and set `$settings: ('poly-themed': true)`.

First, declare the new colors for your default theme in `$colors` map, you can use any name for the variables you want. The key is the name of the color or the level of the color (e.g. 50, 100, 200, etc.). The value is the color itself.

```scss
$colors: (
  'default': (
    50: #fafafa,
    100: #f4f4f5,
    200: #e4e4e7,
    300: #d4d4d8,
    400: #a1a1aa,
    500: #71717a,
    600: #52525b,
    700: #3f3f46,
    800: #27272a,
    900: #18181b,
  ),
  'primary': (
    50: #e6f1fe,
    100: #cce3fd,
    200: #99c7fb,
    300: #66aaf9,
    400: #338ef7,
    500: #006fee,
    600: #005bc4,
    700: #004493,
    800: #002e62,
    900: #001731,
  ),
  'secondary': (
    50: #f2eafa,
    100: #e4d4f4,
    200: #c9a9e9,
    300: #ae7ede,
    400: #9353d3,
    500: #7828c8,
    600: #6020a0,
    700: #481878,
    800: #301050,
    900: #180828,
  ),
  'success': (
    50: #e8faf0,
    100: #d1f4e0,
    200: #a2e9c1,
    300: #74dfa2,
    400: #45d483,
    500: #17c964,
    600: #12a150,
    700: #0e793c,
    800: #095028,
    900: #095028,
  ),
  'warning': (
    50: #fefce8,
    100: #fdedd3,
    200: #fbdba7,
    300: #f9c97c,
    400: #f7b750,
    500: #f5a524,
    600: #c4841d,
    700: #936316,
    800: #62420e,
    900: #312107,
  ),
  'danger': (
    50: #fee7ef,
    100: #fdd0df,
    200: #faa0bf,
    300: #f871a0,
    400: #f54180,
    500: #f31260,
    600: #c20e4d,
    700: #920b3a,
    800: #610726,
    900: #310413,
  ),
);
```

If you want to use more than one theme mode, you need to use the `$config-theme` map. The key is the name of the theme mode (e.g. dark, light, etc.). This an example of a dark theme config:

```scss
$config-theme: (
  'dark': (
    'default': (
      50: #18181b,
      100: #27272a,
      200: #3f3f46,
      300: #52525b,
      400: #71717a,
      500: #a1a1aa,
      600: #d4d4d8,
      700: #e4e4e7,
      800: #f4f4f5,
      900: #fafafa,
    ),
    'primary': (
      50: #001731,
      100: #002e62,
      200: #004493,
      300: #005bc4,
      400: #006fee,
      500: #338ef7,
      600: #66aaf9,
      700: #99c7fb,
      800: #cce3fd,
      900: #e6f1fe,
    ),
    'secondary': (
      50: #180828,
      100: #301050,
      200: #481878,
      300: #6020a0,
      400: #7828c8,
      500: #9353d3,
      600: #ae7ede,
      700: #c9a9e9,
      800: #e4d4f4,
      900: #f2eafa,
    ),
    'success': (
      50: #095028,
      100: #095028,
      200: #0e793c,
      300: #12a150,
      400: #17c964,
      500: #45d483,
      600: #74dfa2,
      700: #a2e9c1,
      800: #d1f4e0,
      900: #e8faf0,
    ),
    'warning': (
      50: #312107,
      100: #62420e,
      200: #936316,
      300: #c4841d,
      400: #f5a524,
      500: #f7b750,
      600: #f9c97c,
      700: #fbdba7,
      800: #fdedd3,
      900: #fefce8,
    ),
    'danger': (
      50: #310413,
      100: #610726,
      200: #920b3a,
      300: #c20e4d,
      400: #f31260,
      500: #f54180,
      600: #f871a0,
      700: #faa0bf,
      800: #fdd0df,
      900: #fee7ef,
    ),
  ),
);
```

---

## :triangular_ruler: System Architecture

Design system tries to be customizable and straightforward. You can find some core principles and the main structure below. The examples are based on predefined default config values.

### Color System

`color($category, $type)`

Applies a color from `$color` palette to a CSS property. `$category` refers to the type of color you would like to use. `$type` refers to what kind of color for that category.

```scss
.selector {
  color: color(default, 900);
}
```

---

### Accessibility

`focus-ring($size, $offset, $color, $radius, $thick)`

Applies a focus ring to an element. `$size` refers to the size of the focus ring. `$offset` refers to the offset of the focus ring. `$color` refers to the color of the focus ring. `$radius` refers to the radius of the focus ring. `$thick` refers to the thickness of the focus ring.

```scss
.selector {
  @include focus-ring(2px, 2px, color(primary, 500), 4px, 2px);
}
```

---

### Border System

`border($direction, $size, $style, $color)`

Applies a border to an element. `$direction` refers to the direction of the border. `$size` refers to the size of the border. `$style` refers to the style of the border. `$color` refers to the color of the border.

```scss
.selector {
  @include border(top, 1px, solid, color(primary, 500));
}
```

---

### Media Queries System

`breakpoint($breakpoint, $logic, $mobile-first)`

Makes easier way to work with CSS media queries. The block of code below shows how mixins are mapped out and associated with names. You can define your own breakpoints in the `$breakpoints` map. All media queries are mobile-first by default.

```scss
$breakpoints: (
  'xs': 0,
  'sm': 600px,
  'md': 960px,
  'lg': 1280px,
  'xl': 1920px,
);
```

Usage of the mixin with argument:

```scss
.selector {
  @include breakpoint('md') {
    opacity: 1;
  }
}
```

And other variant of the same technique but with slightly different mixin for the specific resolutions without argument:

```scss
// Direct approach
.selector {
  @include only-xs {
    opacity: 1;
  }

  @include only-sm {
    opacity: 0.5;
  }

  @include only-md {
    opacity: 0;
  }
}
```

```scss
// Mobile first approach
.selector {
  @include min-xs {
    opacity: 1;
  }

  @include min-md {
    opacity: 0.5;
  }

  @include min-xl {
    opacity: 0;
  }
}
```

```scss
// Desktop first approach
.selector {
  @include max-xxl {
    opacity: 0;
  }

  @include max-md {
    opacity: 0.5;
  }

  @include max-sm {
    opacity: 1;
  }
}
```

```scss
// Exclude breakpoints
.selector {
  @include not-xxl {
    opacity: 1;
  }

  @include not-md {
    opacity: 0.5;
  }

  @include not-sm {
    opacity: 1;
  }
}
```

---

### Elevation System

`shadow($x, $y, $blur, $spread, $color, $elevation)`

Applies a shadow to an element. `$x` refers to the horizontal position of the shadow. `$y` refers to the vertical position of the shadow. `$blur` refers to the blur radius of the shadow. `$spread` refers to the size of the shadow. `$color` refers to the color of the shadow. `$elevation` refers to the predefined elevation from the config map `$config-shadow`.

Provides a predictable scale for elevation. The higher the number, the closer the item will appear to the user:

```scss
.selector {
  @include shadow(0, 0, 3px, 0, color(default, 900));
  // or
  @include shadow($elevation: xl);
}
```

---

### Motion System

Sass functions specify the time and how things should move from one state to another.

`transition($property, $duration, $timing-function, $delay)`

Applies transition rules to an element. `$property` refers to the CSS property you want to apply the transition to. `$duration` refers to the how long the element should take to get to the desired state/position. `$timing-function` refers to the speed curve of the transition. `$delay` refers to the delay before the transition will start.

```scss
.selector {
  @include transition(all, fast, overshoot, none);
}
```

`animate($name, $duration, $timing, $delay, $iterations, $direction)`

Applies animation rules to an element. `$name` refers to the name of the animation. `$duration` refers to the how long the element should take to get to the desired state/position. `$timing` refers to the speed curve of the animation. `$delay` refers to the delay before the animation will start. `$iterations` refers to the number of times the animation should be played. `$direction` refers to the direction of the animation.

The animations are defined in the `$config-keyframes` map. The key is the name of the animation. The value is the animation itself. You can define your own animations in the `$config-keyframes` map.

```scss
.selector {
  @include animate(fade-in, fast, overshoot, none, infinite, normal);
}
```

---

### Shape System

`shape($size, $important)`

Applies spacing rules to a CSS property. `$size` refers to the scale of rounded of the object. Sizes can be redefine in the `$config-shape` map. `$important` refers to the !important flag.

```scss
.selector {
  @include shape(md);
  // or
  border-radius: shape(circle);
}
```

---

### Space System

`space($space, $map)`

Applies spacing rules to a CSS property. `$space` refers to the scale of the spacing. Sizes can be redefine in the `$config-space` map. `$map` refers to the map of the spacing.

```scss
.selector {
  padding: space(none) space(md);
}
```

---

### Typography System

First of all you need to define the font family in the `$config-font-stack` map.

```scss
$config-font-stack: (
  'primary': (
    'Roboto',
    'sans-serif',
  ),
);
```

Then you can use the mixins and functions to apply the typography styles to your elements with `font-setup($name, $filename, $weight, $style, $display, $exts)`, where `$name` refers to the name of the font, `$filename` refers to the name of the font file, `$weight` refers to the weight of the font, `$style` refers to the style of the font, `$display` refers to the display of the font, `$exts` refers to the file extensions of the font (if you have more than one file extension, you need to separate them with a space).

```scss
@include font-setup($name: 'Roboto', $filename: 'Roboto-Regular', $exts: woff2 ttf);
@include font-setup($name: 'Roboto', $filename: 'Roboto-Bold', $exts: woff2 ttf, $weight: bold);
```

#### Type System

Font size, font weight, and line-height have their own predictive scales.

#### Font Size

We use words to convey in size to make it clear what the size is for. You can use any word you want but we prefer to use the component names.

```scss
$config-font-size: (
  // Will be applied to root element
  'default': 16px,
  'h1': rem(24px),
  'h2': rem(20px),
  'text': rem(16px),
  'small': rem(14px),
  'tiny': rem(12px),
);
```

#### Font Weight

For font-weight we prefer to use words but like before its up to you.

```scss
$config-font-weight: (
  // Value that will be applied to root element
  'default': 400,
  'thin': 100,
  'extra-light': 200,
  'light': 300,
  'regular': 400,
  // Alias for "regular
  'normal': 400,
  // Alias for "regular
  'base': 400,
  'medium': 500,
  'semi-bold': 600,
  'bold': 700,
  'extra-bold': 800,
  'black': 900,
);
```

#### Line Height

Here we use names of components as well to convey the line-height.

```scss
$config-line-height: (
  'default': 1.5,
  'h1': 1.5,
  'h2': 1.5,
  'text': 1.5,
);
```

#### Letter Spacing

As for the others typography properties, we use words to convey the letter-spacing.

```scss
$config-letter-spacing: (
  'default': 0,
  'h1': 0,
  'h2': 0,
  'text': 0,
);
```

---

#### Typography Usage

We like to use of Sass functions in our mark up.

- `font-family($family)`

Applies a font family from the allowed font families in the system to a CSS property. `$family` refers to the name of the font family.

```scss
.selector {
  font-family: font-family(primary);
}
```

- `font-size($range)`

Applies a font size from the allowed font sizes in the system to a CSS property. `$range` refers to how big you would like the font to be. The higher the number, the bigger the font.

```scss
.selector {
  font-size: font-size(h1);
}
```

- `font-weight($range)`

Applies a font weight from the allowed font weights in the system to a CSS property. `$range` refers to how bold you would like the font to be. The higher the number, the bolder the font.

```scss
.selector {
  font-weight: font-weight(bold);
}
```

- `line-height($range)`

Applies a line height from the allowed line heights in the system to a CSS property. `$range` refers to how high you would like the line-height to be. The higher the number, the higher the line-height.

```scss
.selector {
  font-size: line-height(h1);
}
```

- `letter-spacing($range)`

Applies a letter spacing from the allowed letter spacings in the system to a CSS property. `$range` refers to how much space you would like between the letters. The higher the number, the more space between the letters.

```scss
.selector {
  font-size: letter-spacing(h1);
}
```

---

## :thinking: Supporting Materials

- [Color in Design Systems](https://medium.com/eightshapes-llc/color-in-design-systems-a1c80f65fa3)
- [Responsive Typography With Sass Maps](https://www.smashingmagazine.com/2015/06/responsive-typography-with-scss-maps/)
- [The Type System](https://material.io/design/typography/the-type-system.html#type-scale)
- [Modular Scale](http://www.modularscale.com/)
- [Sass Docs](https://sass-lang.com/documentation/)

---
