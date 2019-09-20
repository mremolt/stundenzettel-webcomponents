import { createSelector } from 'reselect';
import { format } from 'date-fns';

import { RootState } from '../root.reducer';
import { TimesheetItem } from '../../models/timesheet-item.interface';
import { buildTimesheetItem } from '../../utils/time';

export const selectTimesheetState = (state: RootState): RootState['timesheet'] => state.timesheet;

export const selectEntities = createSelector(
  [selectTimesheetState],
  state => state.entities
);

export const selectLoading = createSelector(
  [selectTimesheetState],
  state => state.loading
);

export const selectLoaded = createSelector(
  [selectTimesheetState],
  state => state.loaded
);

export const selectDirty = createSelector(
  [selectTimesheetState],
  state => state.dirty
);

export const selectCurrentDay = createSelector(
  [selectTimesheetState],
  state => state.currentDay
);

export const selectCurrentMonth = createSelector(
  [selectTimesheetState],
  state => state.currentMonth
);

export const selectTimesheetItems = createSelector(
  [selectEntities],
  state =>
    Object.entries(state).reduce((result, [key, dto]) => {
      return { ...result, [key]: buildTimesheetItem(dto) };
    }, {}) as { [key: string]: TimesheetItem }
);

export const selectCurrentTimesheetItem = createSelector(
  [selectTimesheetItems, selectCurrentDay],
  (items, current) => {
    if (!current) {
      return null;
    }
    const key = format(current, 'yyyy-MM-dd');
    return items[key];
  }
);

export const selectAggregatedTimes = createSelector(
  [selectTimesheetItems, selectCurrentMonth],
  (items, month) => {
    const defaultValue = { full: 0, internal: 0, projects: 0 };

    if (!month) {
      return defaultValue;
    }

    const monthKey = format(month, 'yyyy-MM');

    return Object.entries(items)
      .filter(([key, _ignored]) => key.startsWith(monthKey))
      .reduce(
        (result, [_ignored, item]) => {
          return {
            full: result.full + item.workTime,
            internal: result.internal + item.internalWorkTime,
            projects: result.projects + item.projectTime,
          };
        },
        { full: 0, internal: 0, projects: 0 }
      );
  }
);
