import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAction } from 'typesafe-actions';

import { TIMESHEET_API_SERVICE } from '../../tokens';
import { TimesheetDto } from '../../models/timesheet-item.interface';

import { container } from '../../ioc/container';

export interface ProjectUpdate {
  index: number;
  date: string;
  value: string;
}

export const update = createAction('[Timesheet] Update Item', action => {
  return (item: Partial<TimesheetDto>) => action(item);
});

export const updateProject = createAction('[Timesheet] Update Project Time', action => {
  return (item: ProjectUpdate) => action(item);
});

export const fetch = createAction('[Timesheet] Fetch');
export const fetchSuccess = createAction('[Timesheet] Fetch Success', action => {
  return (items: { [key: string]: TimesheetDto }) => action(items);
});
export const fetchError = createAction('[Timesheet] Fetch Error', action => {
  return (error: Error) => action(error);
});

export const setCurrentDay = createAction('[Timesheet] Set Current Day', action => {
  return (day: Date) => action(day);
});

export const setCurrentMonth = createAction('[Timesheet] Set Current Month', action => {
  return (month: Date) => action(month);
});

export const fetchAsync = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const timesheetApi = container.inject(TIMESHEET_API_SERVICE);

    dispatch(fetch());

    try {
      const response = await timesheetApi.fetch();
      dispatch(fetchSuccess(response));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
};
