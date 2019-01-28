//  @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { compact } from 'lodash';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';

import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './reducers';

export default function initializeStore() {
  const middlewares = compact([
    thunk.withExtraArgument(),
    __DEV__ ? createLogger() : null
  ]);

  let debuggWrapper = data => data;
  if (__DEV__) {
    debuggWrapper = composeWithDevTools({ realtime: true, port: 8000 });
  }

  const store = createStore(
    rootReducer,
    {},
    debuggWrapper(compose(applyMiddleware(...middlewares)))
  );

  persistStore(store, null, () => {
    store.getState();
  });

  return store;
}
