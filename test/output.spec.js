import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as sass from 'sass';
import { beforeAll, describe, expect, it } from 'vitest';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

// Any new Dart Sass deprecation in our output fails the build early —
// this is the early-warning system for Sass 2.0/3.0 removals.
const FATAL_DEPRECATIONS = ['import', 'global-builtin', 'color-functions', 'if-function'];

const compile = (configuration = null) => {
  const use = configuration ? `@use 'src' as * with (${configuration});` : `@use 'src' as *;`;

  return sass.compileString(`${use}\n@include generate-styles;`, {
    loadPaths: [ROOT],
    style: 'expanded',
    fatalDeprecations: FATAL_DEPRECATIONS,
  }).css;
};

describe('generate-styles output', () => {
  it('matches the default configuration snapshot', () => {
    expect(compile()).toMatchSnapshot();
  });

  it('matches the semantic + oklch + layers + class theme snapshot', () => {
    expect(
      compile(`$settings: ('semantic': true, 'color-format': 'oklch', 'layers': true, 'theme-strategy': 'class')`),
    ).toMatchSnapshot();
  });

  it('matches the semantic + hsl + data-attribute snapshot', () => {
    expect(compile(`$settings: ('semantic': true, 'color-format': 'hsl')`)).toMatchSnapshot();
  });

  it('matches the semantic + media strategy snapshot', () => {
    expect(compile(`$settings: ('semantic': true, 'theme-strategy': 'media')`)).toMatchSnapshot();
  });

  it('matches the semantic + light-dark strategy snapshot', () => {
    expect(compile(`$settings: ('semantic': true, 'theme-strategy': 'light-dark')`)).toMatchSnapshot();
  });

  it('matches the prefixed variables snapshot', () => {
    expect(compile(`$settings: ('prefix': 'ds', 'semantic': true)`)).toMatchSnapshot();
  });

  it('matches the color-fallback snapshot', () => {
    expect(compile(`$settings: ('color-fallback': true)`)).toMatchSnapshot();
  });

  it('matches the legacy poly-themed snapshot', () => {
    expect(compile(`$settings: ('poly-themed': true)`)).toMatchSnapshot();
  });

  it('matches the generators-disabled snapshot', () => {
    expect(
      compile(`$settings: ('generators': ('light-reset': false, 'normalize': false, 'root': false))`),
    ).toMatchSnapshot();
  });
});

describe('cascade layers', () => {
  it('declares the layer order first and wraps reset/base', () => {
    const css = compile(`$settings: ('layers': true)`);

    expect(css.startsWith('@layer reset, base, components;')).toBe(true);
    expect(css).toContain('@layer reset {');
    expect(css).toContain('@layer base {');
  });

  it('keeps tokens unlayered', () => {
    const css = compile(`$settings: ('layers': true, 'semantic': true)`);
    const layerlessRoot = css.split('@layer base')[0];

    expect(layerlessRoot).toContain('--color-primary:');
  });
});

describe('error paths', () => {
  const compileSnippet = (snippet) =>
    sass.compileString(`@use 'src/abstracts' as *;\n${snippet}`, { loadPaths: [ROOT] });

  it('throws on unknown color keys', () => {
    expect(() => compileSnippet(`.a { color: color('default', 9000); }`)).toThrowError(/doesn't exist under/);
  });

  it('throws on unknown semantic tokens', () => {
    expect(() => compileSnippet(`.a { color: token('nope'); }`)).toThrowError(/token doesn't exist/);
  });

  it('throws on unknown channel formats', () => {
    expect(() => compileSnippet(`.a { color: channels(#fff, 'rgbish'); }`)).toThrowError(/Unknown color format/);
  });

  it('throws on unknown breakpoints', () => {
    expect(() => compileSnippet(`.a { @include breakpoint('huge') { color: red; } }`)).toThrowError(
      /Breakpoint with such key/,
    );
  });

  it('throws on equal fluid breakpoints', () => {
    expect(() => compileSnippet(`.a { font-size: fluid(16px, 20px, 400px, 400px); }`)).toThrowError(/must differ/);
  });

  it('throws on unknown transition duration variants', () => {
    expect(() => compileSnippet(`.a { @include transition(opacity, 'warp-speed'); }`)).toThrowError(/Duration variant/);
  });
});

describe('package consumption', () => {
  // Node package self-references don't resolve through sass's importer, so
  // link the repo into its own node_modules to emulate an installed consumer.
  beforeAll(() => {
    const linkPath = path.join(ROOT, 'node_modules', '@embyth', 'scss-design-system');

    if (!fs.existsSync(linkPath)) {
      fs.mkdirSync(path.dirname(linkPath), { recursive: true });
      fs.symlinkSync(ROOT, linkPath, 'junction');
    }
  });

  it('resolves through the package exports field', () => {
    const { css } = sass.compileString(`@use 'pkg:@embyth/scss-design-system' as *;\n@include generate-styles;`, {
      importers: [new sass.NodePackageImporter(ROOT)],
    });

    expect(css).toContain('--default-color-50:');
  });
});
