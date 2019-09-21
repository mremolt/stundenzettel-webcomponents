import { InjectionToken } from './ioc/injection-token.class';
import { TimesheetApiService } from './services/timesheet-api.service';
import { TranslationService } from './services/translation.service';
import { store } from './store/store';

export const REDUX_STORE = new InjectionToken<typeof store>('REDUX_STORE');
export const TIMESHEET_API_SERVICE = new InjectionToken<TimesheetApiService>('TIMESHEET_API_SERVICE');
export const TRANSLATION_SERVICE = new InjectionToken<TranslationService>('TRANSLATION_SERVICE');
