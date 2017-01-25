import React from 'react'
import { connect } from 'react-redux'

import './App.css'

import { Graph } from '../../containers/Graph'
import { InitialPhotoSearch } from '../../containers/InitialPhotoSearch'

const AppComponent = ({selectedPhoto}) => {
  if (selectedPhoto) {
    return (
    <div className="App">
      <Graph />
    </div>
    )

  } else {
    return (
    <div className="App">
      <InitialPhotoSearch />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPhoto: state.selectedPhoto
  }
}

export const App = connect(mapStateToProps)(AppComponent)
