export const CounterMode = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

export function setupCounter(element, store) {
  const renderCounter = () => {
    element.innerHTML = `Count is ${store.getState()}`;
  };
  store.subscribe(renderCounter);
  element.addEventListener('click', () => store.dispatch({ type: CounterMode.INCREMENT }));
}
