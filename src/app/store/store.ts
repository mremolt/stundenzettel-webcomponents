import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { RootAction } from './root.action';
import { RootState, reducer } from './root.reducer';
import { connectFactory } from './connect.mixin';

const composeEnhancers = composeWithDevTools({
  name: 'Stundenzettel Store',
  trace: true,
});

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>)
    // other store enhancers if any
  )
);

export const connect = connectFactory(store);
