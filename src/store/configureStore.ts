import { createStore, applyMiddleware, compose, Store } from 'redux';
import * as createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from '../reducers';

const loggerMiddleware = createLogger();
// tslint:disable-next-line
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default function configureStore(preloadedState?: any): Store<any> {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    )
  );
}
