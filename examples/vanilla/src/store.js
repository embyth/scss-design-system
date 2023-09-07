export const createStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(action, state);
    // eslint-disable-next-line no-restricted-syntax
    for (const listener of listeners) {
      listener();
    }
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  dispatch({});
  return { getState, dispatch, subscribe };
};
