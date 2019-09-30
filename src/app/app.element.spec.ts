import configureStore, { MockStore } from 'redux-mock-store';

import { AppElement } from './app.element';
import { REDUX_STORE, TRANSLATION_SERVICE } from './tokens';
import { TranslationService } from './services/translation.service';
import { container } from './ioc/container';

describe('AppElement', () => {
  let subject: AppElement;
  let store: MockStore<any>;

  beforeAll(() => {
    store = configureStore()({});
    container.provide(REDUX_STORE, () => store);
    container.provide(TRANSLATION_SERVICE, () => new TranslationService());
  });

  beforeEach(() => {
    store.clearActions();
    subject = new AppElement();
  });

  it('should build', () => {
    expect(subject).toBeTruthy();
  });

  describe('render', () => {
    it('should return the template', () => {
      expect(subject.render()).toMatchSnapshot();
    });
  });

  describe('triggerIncrement', () => {
    beforeEach(() => {
      subject.triggerIncrement();
    });

    it('should call store.dispatch with increment', () => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
