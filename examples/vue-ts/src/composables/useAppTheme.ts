import { readonly, ref, watch } from 'vue';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const STORAGE_KEY = 'app-theme';

export const ThemeMode = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type TThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

const getInitialMode = (): TThemeMode => {
  const stored = localStorage.getItem(STORAGE_KEY) as TThemeMode | null;
  if (stored) {
    return stored;
  }

  return matchMedia(COLOR_SCHEME_QUERY).matches ? ThemeMode.DARK : ThemeMode.LIGHT;
};

// Module-level singleton so every component shares the same reactive theme
// state — toggling the switch updates the canvas, the root attribute, etc.
const mode = ref<TThemeMode>(getInitialMode());

watch(
  mode,
  (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    document.documentElement.dataset.theme = value;
  },
  { immediate: true },
);

// Follow OS preference changes only while the user hasn't made a choice.
matchMedia(COLOR_SCHEME_QUERY).addEventListener('change', (event) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    mode.value = event.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
  }
});

export const useAppTheme = () => {
  const setMode = (value: TThemeMode): void => {
    mode.value = value;
  };

  return {
    mode: readonly(mode),
    toggle: () => setMode(mode.value === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK),
    setLight: () => setMode(ThemeMode.LIGHT),
    setDark: () => setMode(ThemeMode.DARK),
    setMode,
  };
};
