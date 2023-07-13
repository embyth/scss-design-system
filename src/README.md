# Not-Botan Sass Design Systems

## Table of Contents

- [Not-Botan Sass Design Systems](#not-botan-sass-design-systems)
  - [Table of Contents](#table-of-contents)
  - [Border System](#border-system)
  - [Color System](#color-system)
  - [Media Queries System](#media-queries-system)
  - [Elevation System](#elevation-system)
  - [Motion System](#motion-system)
    - [Motion Functions](#motion-functions)
  - [Shape System](#shape-system)
  - [Space System](#space-system)
  - [Typography System](#typography-system)
    - [Type System](#type-system)
    - [Font Size](#font-size)
    - [Font Weight](#font-weight)
    - [Line Height](#line-height)
    - [Typography Usage](#typography-usage)
    - [Typography Functions](#typography-functions)
    - [Typography Mixins](#typography-mixins)
  - [Supporting Material](#supporting-material)

---

## Border System

`nb-border-weight($width)`

Applies a `$width` to the border with already specified value for a given variant.

```scss
.div-container {
  border: nb-border-weight($width) nb-color(border, $color) solid;
}
```

---

## Color System

`nb-color($category, $type)`

Applies a color from our palette to a CSS property. `$category` refers to the type of color you would like to use. `$type` refers to what kind of color for that category.

```scss
.div-container {
  color: nb-color(primary, blue-900); // returns a hex value for that type of color and its kind
}
```

---

## Media Queries System

`nb-media($breakpoint)`

Makes easier way to work with CSS media queries. The block of code below shows how mixins are mapped out and associated with names.

```scss
.div-container {
  @include nb-media($laptop) {
    opacity: 1;
  }
}
```

And other variant of the same technique but with slightly different mixin without argument:

```scss
.div-container {
  @include nb-media-laptop {
    opacity: 1
  }
}
```

---

## Elevation System

`nb-elevation($elevation)`

Provides a predictable scale for elevation. The higher the number, the closer the item will appear to the user:

```scss
.div-container {
  box-shadow: nb-elevation(300); // returns a pixels and an rgba value;
}
```

---

## Motion System

Sass functions specify the time and how things should move from one state to another.

### Motion Functions

`nb-easing($variant)`

Applies transitions rules to the CSS property. `$variant` refers to the how the element should move or get to the desired state/position.

`nb-duration($variant)`

Applies transition rules to the CSS property. `$variant` refers to the how long the element should take to get to the desired state/position.

```scss
.div-container {
  transition: all nb-easing(in) nb-duration(slowest); // returns a cubic-bezier and the duration in ms.
}
```

---

## Shape System

`nb-shape($roundness)`

Applies spacing rules to a CSS property. `$roundness` refers to the scale of rounded of the object.

```scss
.div-container {
  border-radius: nb-shape($size);
}
```

---

## Space System

`nb-space($space)`

Applies spacing rules to a CSS property. `$space` refers to the scale in 8px of how much space you need. The higher the number, the bigger the font-size.

```scss
.div-container {
  padding: nb-space(none) nb-space(space-10); // returns a pixel value for those variables
}
```

---

## Typography System

Not Botan uses **Circe** as it Font Family with specific typographic styles that define a hierarchy for both mobile and web.

- H1
- H2
- Body1
- Body2
- Button
- Caption
- Caption Underline
- Label

### Type System

Font size, font weight, and line-height have their own predictive scales.

### Font Size

We use three digits to convey in size. The higher the range number, the higher the font-size.

```scss
$nb-theme-base-font-size: 17px;

$nb-font-size-data: (
  heading1: nb-rem(24px),
  heading2: nb-rem(20px),
  body1: nb-rem(17px),
  body2: nb-rem(15px),
  button: nb-rem(17px),
  caption: nb-rem(15px),
  label: nb-rem(12px),
);
```

### Font Weight

For font-weight I use words.

```scss
$nb-font-weight-data: (
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  bold: 700,
  extrabold: 800,
);
```

### Line Height

I use three digits to convey in line-height. The higher the range number, the higher the line-height.

```scss
$nb-line-height-data: (
  heading1: 1.5,
  heading2: 1.5,
  body1: 1.5,
  body2: 1.5,
  button: 1.5,
  caption: 1.5,
  label: 1,
);
```

### Typography Usage

We make use of Sass functions and mixins to use in our mark up.

### Typography Functions

- `nb-font-size($range)`

Applies a font size from the allowed sizes in the system to a CSS property. `$range` refers to the scale of how big you would like the font-size to be. The higher the number, the bigger the font-size.

```scss
.div-container {
  font-size: nb-font-size(body1); // returns a pixel value for that range
}
```

- `nb-font-weight($weight)`

Applies a font weight from the allowed weights in the system to a CSS property. `$weight` refers to either bold, semibold, base, light, etc.

```scss
.div-container {
  font-size: nb-font-weight(bold); // returns a weight value for that range (300 - 900)
}
```

- `nb-line-height($range)`

Applies a line height from the allowed line heights in the system to a CSS property. `$range` refers to how high you would like the line-height to be. The higher the number, the higher the line-height.

```scss
.div-container {
  font-size: nb-line-height(body1); // returns a weight value for that range (300 - 900)
}
```

### Typography Mixins

- `nb-text-style-heading1($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-heading1(bold);
}
```

- `nb-text-style-heading2($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-heading2(bold);
}
```

- `nb-text-style-body1($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-body1(bold);
}
```

- `nb-text-style-body2($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-body2(bold);
}
```

- `nb-text-style-button($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-button(bold);
}
```

- `nb-text-style-caption($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-caption(bold);
}
```

- `nb-text-style-caption-underline($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-caption-underline(bold);
}
```

- `nb-text-style-label($weight)`

Applies all the text styling needed by Typographic Style defined in the system to a CSS declaration. `$color` refers to the color in the system you want to use - optional. `$weight` refers to the weight in the system you would like to use - optional.

```scss
.div-container {
  @include nb-text-style-label(bold);
}
```

---

## Supporting Material

- [Color in Design Systems](https://medium.com/eightshapes-llc/color-in-design-systems-a1c80f65fa3)
- [Responsive Typography With Sass Maps](https://www.smashingmagazine.com/2015/06/responsive-typography-with-scss-maps/)
- [The Type System](https://material.io/design/typography/the-type-system.html#type-scale)
- [Modular Scale](http://www.modularscale.com/)

---
