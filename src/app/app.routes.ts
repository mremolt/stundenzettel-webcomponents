import './home/home-view.element';

export const APP_ROUTES = [
  {
    path: '/',
    component: 'sz-home-view',
  },
  {
    path: '/month/:month?',
    component: 'sz-month-view',
    action: async (): Promise<void> => {
      await import('./month/month-view.element');
    },
  },
  {
    path: '/day/:day?',
    component: 'sz-day-view',
    action: async (): Promise<void> => {
      await import('./day/day-view.element');
    },
  },
];
