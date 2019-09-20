import { container } from './ioc/container';

import { REDUX_STORE, TIMESHEET_API_SERVICE } from './tokens';
import { TimesheetApiService } from './services/timesheet-api.service';
import { store } from './store/store';

container.provide(REDUX_STORE, () => store);
container.provide(TIMESHEET_API_SERVICE, () => new TimesheetApiService('http://localhost:4300/timesheetItems'));
