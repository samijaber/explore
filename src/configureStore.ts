import { createStore, applyMiddleware, compose, Store } from 'redux';
import * as createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from './reducers';
import { selectCollection, fetchCollection } from './actions/collection';
import { fetchPhotos } from './actions/photos';

const loggerMiddleware = createLogger();
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default function configureStore(preloadedState?: any): Store<any> {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    )
  );
  store.dispatch(selectCollection('121'));
  store.dispatch(fetchCollection('121'));
  store.dispatch(fetchPhotos('121'));
  return store;
}
