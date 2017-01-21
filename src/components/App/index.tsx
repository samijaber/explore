import * as React from 'react';
import './App.css';

import { ImageCollection } from '../ImageCollection';
import { ActionButton } from '../ActionButton';

const logo = require('./logo.svg');

// tslint:disable-next-line
const url = 'https://images.unsplash.com/photo-1452767250494-3c864fc60bf2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=15ac49dca9a018423e6ff019492125a3';
const mockProps = {
  collection: {
    name: 'hippo',
    id: 123,
    imgUrls: [url, url, url]
  }
};

export default class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ActionButton />
        <ImageCollection {...mockProps} />
      </div>
    );
  }
}
