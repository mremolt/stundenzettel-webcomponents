import { createAction } from 'typesafe-actions';

export const increment = createAction('[Counter] Increment');

export const decrement = createAction('[Counter] Decrement');

export const add = createAction('[Counter] Add', action => {
  return (amount: number) => action(amount);
});
