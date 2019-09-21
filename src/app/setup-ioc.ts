import { container } from './ioc/container';

import { REDUX_STORE, TIMESHEET_API_SERVICE, TRANSLATION_SERVICE } from './tokens';
import { TimesheetApiService } from './services/timesheet-api.service';
import { TranslationService } from './services/translation.service';
import { store } from './store/store';

container.provide(REDUX_STORE, () => store);
container.provide(TIMESHEET_API_SERVICE, () => new TimesheetApiService('http://localhost:4300/timesheetItems'));
container.provide(TRANSLATION_SERVICE, () => new TranslationService('de'));
