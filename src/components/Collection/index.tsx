import * as React from 'react';

import { ImageFlexRow } from '../ImageFlexRow';
import { CollectionMetadata } from '../CollectionMetadata';
import { RelatedCollection } from '../../containers/RelatedCollection';

const flexStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around'
};

export const Collection = (props: any) => {
  if (props.collection == null) {
    return <h1> Start by choosing a collection! </h1>;
  } else if (props.collection.isFetching === true) {
    return <h1> Loading... </h1>;
  } else {
    const relatedCollectionsList = props.collection.collectionIds.map( (id: any) =>
      <RelatedCollection key={id} id={id}/>
    );

    return (
      <div>
        <CollectionMetadata {...props.collection.metadata} />
        <div>
          {props.collection.metadata.description}
        </div>
        <ImageFlexRow photos={props.collection.photos.slice(0,3)}/>
        <div>
          <h1>Related Collections:</h1>
          <div style={flexStyle}>
            {relatedCollectionsList}
          </div>
        </div>
      </div>
    );
  }
};
