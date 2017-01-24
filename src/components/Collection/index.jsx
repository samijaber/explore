import React from 'react'

import { ImageFlexRow } from '../ImageFlexRow'
import { CollectionMetadata } from '../CollectionMetadata'
import { RelatedCollection } from '../../containers/RelatedCollection'

const flexStyle = {
  display: 'flex',
  justifyContent: 'space-around'
}

export const Collection = ({collection}) => {
  if (collection == null) {
    return <h1> Start by choosing a collection! </h1>
  } else if (
    collection.isFetchingMetadata === true ||
    collection.collectionIds == null ||
    collection.photos == null
  ) {
    return <h1> Loading... </h1>
  } else {
    const relatedCollectionsList = collection.collectionIds.map(id =>
      <RelatedCollection key={id} id={id}/>
    )

    return (
      <div>
        <CollectionMetadata {...collection.metadata} />
        <ImageFlexRow photos={collection.photos.slice(0,3)}/>
        <div>
          <h1>Related Collections:</h1>
          <div style={flexStyle}>
            {relatedCollectionsList}
          </div>
        </div>
      </div>
    )
  }
}
