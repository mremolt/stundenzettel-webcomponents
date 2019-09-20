import { CounterAction } from './counter/counter.reducer';
import { TimesheetAction } from './timesheet/timesheet.reducer';

export type RootAction = CounterAction | TimesheetAction;
