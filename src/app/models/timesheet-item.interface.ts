export interface TimesheetDto {
  id: number;
  date: string;
  start: string;
  end: string;
  break: string;
  projects: string[];
  comment: string;
}

export type TimesheetItem = Readonly<
  TimesheetDto & {
    [key: string]: string | number | string[];

    readonly presentTime: number;
    readonly workTime: number;
    readonly internalWorkTime: number;
    readonly projectTime: number;
  }
>;
