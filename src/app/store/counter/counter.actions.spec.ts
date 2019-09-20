import { add, decrement, increment } from './counter.actions';

describe('counter actions', () => {
  describe('increment', () => {
    it('returns the correct action', () => {
      expect(increment()).toMatchSnapshot();
    });
  });

  describe('decrement', () => {
    it('returns the correct action', () => {
      expect(decrement()).toMatchSnapshot();
    });
  });

  describe('add', () => {
    it('returns the correct action', () => {
      expect(add(2)).toMatchSnapshot();
    });
  });
});
