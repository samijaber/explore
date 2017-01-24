import React from 'react'
import { connect } from 'react-redux'

import './App.css'

import { CentralPhoto } from '../../containers/CentralPhoto'
import { InitialPhotoSearch } from '../../containers/InitialPhotoSearch'

const AppComp = ({selectedPhoto}) => {
  if (selectedPhoto) {
    return (
    <div className="App">
      <CentralPhoto />
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

export const App = connect(mapStateToProps)(AppComp)
