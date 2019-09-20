import { eachDayOfInterval, eachWeekendOfMonth, endOfMonth, startOfMonth } from 'date-fns';

export type CalendarInfo = Readonly<{
  start: Date;
  end: Date;
  days: Date[];
  weekends: ReadonlyArray<Date>;
  workDays: ReadonlyArray<Date>;
}>;

export function getCalendarInfo(year: number, month: number): CalendarInfo {
  const baseDate = new Date(year, month, 1, 0);

  const start = startOfMonth(baseDate);
  const end = endOfMonth(baseDate);
  const days = eachDayOfInterval({ start, end });
  const weekends = eachWeekendOfMonth(start);
  const workDays = days.filter(day => !weekends.includes(day));

  return { start, end, days, weekends, workDays };
}
