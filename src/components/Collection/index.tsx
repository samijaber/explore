import * as React from 'react';

import { ImageFlexRow } from '../../components/ImageFlexRow';

const defStyle: React.CSSProperties = {
  textAlign: 'center'
};

export const Collection = (props: any) => {
  if (props.collection == null || props.collection.photos == null) {
    return <h1> Start by choosing a collection! </h1>;
  } else {
    return (
      <div>
        <h1 style={defStyle}>
          Collection #{props.collection.metadata.id}: {props.collection.metadata.description}
        </h1>
        <ImageFlexRow photos={props.collection.photos.slice(0,3)}/>
      </div>
    );
  }
};
