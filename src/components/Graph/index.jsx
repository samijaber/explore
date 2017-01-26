import React from 'react'

import { ImageContainer } from '../../containers/ImageContainer'


const FlexRowStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

export const Graph = ({selectedPhoto, relatedPhotos}) => {
  const relatedPhotosList = relatedPhotos.map( (photo, idx) =>
    <ImageContainer key={idx} photoId={photo.id} nextNode={true} />
  )
  return (
    <div>
      <ImageContainer photoId={selectedPhoto} />
      <p/>
      <div style={FlexRowStyle}>
        {relatedPhotosList}
      </div>
    </div>
  )
}
