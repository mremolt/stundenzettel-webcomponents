import { ActionType, getType } from 'typesafe-actions';
import { set } from 'object-path-immutable';

import { TimesheetDto } from '../../models/timesheet-item.interface';

import * as actions from './timesheet.actions';

export type TimesheetAction = ActionType<typeof actions>;

export type TimesheetState = Readonly<{
  entities: Readonly<{ [key: string]: TimesheetDto }>;
  loading: boolean;
  loaded: boolean;
  dirty: boolean;
  error: Error | null;
  currentDay: Date | null;
  currentMonth: Date | null;
}>;

export const initialState: TimesheetState = {
  entities: {},
  loading: false,
  loaded: false,
  dirty: false,
  error: null,
  currentDay: null,
  currentMonth: null,
};

export function buildEmptyTimesheetDto(): TimesheetDto {
  return {
    id: 0,
    date: '',
    start: '',
    end: '',
    break: '',
    projects: [],
    comment: '',
  };
}

export function ensureItem(state: TimesheetState, key: string): TimesheetDto {
  return state.entities[key] || buildEmptyTimesheetDto();
}

export const timesheet = (state: TimesheetState = initialState, action: TimesheetAction): TimesheetState => {
  switch (action.type) {
    case getType(actions.update): {
      const key = action.payload.date;
      const currentItem = {
        ...ensureItem(state, key),
        ...action.payload,
      };

      return { ...state, entities: { ...state.entities, [key]: currentItem }, dirty: true };
    }

    case getType(actions.updateProject): {
      const key = action.payload.date;
      const index = String(action.payload.index);
      const currentItem = set(ensureItem(state, key), ['projects', index], action.payload.value);

      return { ...state, entities: { ...state.entities, [key]: currentItem }, dirty: true };
    }

    case getType(actions.fetch):
      return { ...state, loading: true, loaded: false, error: null };

    case getType(actions.fetchSuccess):
      return { ...state, loading: false, loaded: true, entities: action.payload };

    case getType(actions.fetchError):
      return { ...initialState, error: action.payload };

    case getType(actions.setCurrentDay):
      return { ...state, currentDay: action.payload };

    case getType(actions.setCurrentMonth):
      return { ...state, currentMonth: action.payload };

    default:
      return state;
  }
};
