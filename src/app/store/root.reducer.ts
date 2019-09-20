import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { counterReducer as counter } from './counter/counter.reducer';
import { timesheet } from './timesheet/timesheet.reducer';

export const reducer = combineReducers({ counter, timesheet });

export type RootState = StateType<typeof reducer>;

export { RootAction } from './root.action';
