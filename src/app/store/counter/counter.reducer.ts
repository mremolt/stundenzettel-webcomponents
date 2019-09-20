import { ActionType, getType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import * as actions from './counter.actions';

export type CounterAction = ActionType<typeof actions>;

export const initialState = { value: 0 };

export type CounterState = DeepReadonly<typeof initialState>;

export const counterReducer = (state: CounterState = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case getType(actions.increment):
      return { ...state, value: state.value + 1 };

    case getType(actions.decrement):
      return { ...state, value: state.value - 1 };

    case getType(actions.add):
      return { ...state, value: state.value + action.payload };

    default:
      return state;
  }
};
