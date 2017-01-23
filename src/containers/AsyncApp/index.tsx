import * as React from 'react';
import { connect } from 'react-redux';

import './App.css';

import { CollectionContainer } from '../../containers/CollectionContainer';
import { RequestCollectionContainer } from '../../containers/RequestCollectionContainer';

export const App = (props: any) => {
  return (
    <div className="App">
      <RequestCollectionContainer />
      <CollectionContainer />
    </div>
  );
};

const mapStateToProps = (state: any) => state;

export const AsyncApp = connect(mapStateToProps)(App);
