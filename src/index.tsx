import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { initState } from './store/initState';
import {AsyncApp} from './containers/AsyncApp';

import './index.css';

const store = configureStore(initState);

ReactDOM.render(
  <Provider store={store}>
    <AsyncApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
