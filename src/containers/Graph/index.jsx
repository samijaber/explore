import React from 'react'
import { connect } from 'react-redux'

import { PhotoContainer } from '../../containers/PhotoContainer'

const FlexRowStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const GraphComponent = ({selectedPhoto, relatedPhotos}) => {
  const relatedPhotosList = relatedPhotos.slice(0,3).map( photo =>
    <PhotoContainer key={photo} id={photo} />
  )

  return (
    <div className="App">
      <PhotoContainer id={selectedPhoto}/>
      <p/>
      <div style={FlexRowStyle}>
        {relatedPhotosList}
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    selectedPhoto: state.selectedPhoto,
    relatedPhotos: state.relatedPhotos
  }
}


export const Graph = connect(mapStateToProps)(GraphComponent)
