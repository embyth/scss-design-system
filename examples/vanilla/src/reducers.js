import { CounterMode } from './counter';
import { ThemeMode } from './theme';

export const counter = (action, state = 0) => {
  switch (action.type) {
    case CounterMode.INCREMENT: {
      return state + 1;
    }

    case CounterMode.DECREMENT: {
      return state - 1;
    }

    default: {
      return state;
    }
  }
};

export const theme = (action, state = localStorage.getItem('app-theme')) => {
  switch (action.type) {
    case ThemeMode.LIGHT: {
      return ThemeMode.LIGHT;
    }

    case ThemeMode.DARK: {
      return ThemeMode.DARK;
    }

    default: {
      return state;
    }
  }
};
