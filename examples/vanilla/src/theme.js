export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
};

const setLocalStorageTheme = (mode) => {
  localStorage.setItem('app-theme', mode);
};

export function setupTheme(element, store) {
  const root = document.documentElement;

  const setRootTheme = (mode) => {
    root.dataset.theme = mode;
  };

  store.subscribe(() => {
    setRootTheme(store.getState());
  });

  store.subscribe(() => {
    setLocalStorageTheme(store.getState());
  });

  element.addEventListener('change', () => {
    return store.getState() === ThemeMode.DARK
      ? store.dispatch({ type: ThemeMode.LIGHT })
      : store.dispatch({ type: ThemeMode.DARK });
  });
  element.checked = store.getState() === ThemeMode.DARK;
  setRootTheme(store.getState());
  setLocalStorageTheme(store.getState());
}
