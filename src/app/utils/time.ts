import { TimesheetDto, TimesheetItem } from '../models/timesheet-item.interface';

export function timeStringToMinutes(timeString: string): number {
  if (!timeString) {
    return 0;
  }

  const [hours, minutes] = timeString.split(':');

  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

export function minutesToTimeString(timeInMinutes: number): string {
  if (!timeInMinutes) {
    return '00:00';
  }

  const minutes = String(timeInMinutes % 60).padStart(2, '0');
  const hours = String(Math.floor(timeInMinutes / 60)).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function buildTimesheetItem(dto: Readonly<TimesheetDto>): TimesheetItem {
  const start = timeStringToMinutes(dto.start);
  const end = timeStringToMinutes(dto.end);
  const breakTime = timeStringToMinutes(dto.break);

  const projectTime = dto.projects.reduce((sum, pTime) => {
    return sum + timeStringToMinutes(pTime);
  }, 0);

  const presentTime = end - start;
  const workTime = presentTime - breakTime;
  const internalWorkTime = workTime - projectTime;

  return { ...dto, presentTime, workTime, internalWorkTime, projectTime };
}
