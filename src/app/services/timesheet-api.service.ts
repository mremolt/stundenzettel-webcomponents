import { TimesheetDto } from '../models/timesheet-item.interface';

export class TimesheetApiService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly endpoint: string) {}

  public async fetch(): Promise<{ [key: string]: TimesheetDto }> {
    const response = await fetch(`${this.endpoint}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  public async save(items: { [key: string]: TimesheetDto }): Promise<any> {
    return fetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(items),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
