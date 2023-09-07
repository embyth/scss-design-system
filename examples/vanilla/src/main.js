import { AbstractionAnimation, Config } from './abstraction';
import { CanvasAnimation } from './canvas';
import { setupCounter } from './counter';
import { createStore } from './store';
import { counter, theme } from './reducers';
import { ThemeMode, setupTheme } from './theme';
import './styles/index.scss';

const themeStore = createStore(theme);
const counterStore = createStore(counter);

const abstraction = new AbstractionAnimation();
const canvas = new CanvasAnimation(
  document.querySelector('#abstraction'),
  abstraction.draw.bind(abstraction),
  themeStore.getState() === ThemeMode.DARK ? Config.backgroundColorDark : Config.backgroundColor,
);

themeStore.subscribe(() => {
  const state = themeStore.getState();
  canvas.updateBackgroundColor(state === ThemeMode.DARK ? Config.backgroundColorDark : Config.backgroundColor);
});

canvas.init();
setupCounter(document.querySelector('#counter'), counterStore);
setupTheme(document.querySelector('#theme'), themeStore);
