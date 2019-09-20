import { createSelector } from 'reselect';

import { RootState } from '../root.reducer';

export const selectCounterState = (state: RootState): RootState['counter'] => state.counter;

export const selectValue = createSelector(
  [selectCounterState],
  state => state.value
);
