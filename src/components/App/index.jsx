import React from 'react'

import './App.css'

import { CollectionContainer } from '../../containers/CollectionContainer'
import { CollectionSearch } from '../../containers/CollectionSearch'

export const App = () => {
  return (
    <div className="App">
      <CollectionSearch />
      <CollectionContainer />
    </div>
  )
}
