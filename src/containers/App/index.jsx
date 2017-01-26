import React from 'react'
import { connect } from 'react-redux'

import './App.css'

import { GraphContainer } from '../../containers/GraphContainer'
import { ButtonContainer } from '../../containers/ButtonContainer'
import { Graph } from '../../components/Graph'

const AppComponent = ({selectedPhoto}) => {
  if (selectedPhoto) {
    return (
      <div className="App">
        <GraphContainer />
      </div>
    )
    // const relatedPhotos = [{id: "2"}, {id: "3"}, {id: "4"}]
    // return (
    //   <div className="App">
    //     <Graph selectedPhoto={selectedPhoto} relatedPhotos={relatedPhotos} />
    //   </div>
    // )
  } else {
    return (
      <div className="App">
        <ButtonContainer />
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
