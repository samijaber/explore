import * as React from 'react';

import { ImageFlexRow } from '../ImageFlexRow';

const defStyle: React.CSSProperties = {
  textAlign: 'center'
};

interface ImageCollectionProps {
  collection: {
    id: number;
    name: string;
    imgUrls: Array<string>;
  };
};

export const ImageCollection = (props: ImageCollectionProps) =>
  <div>
    <h1 style={defStyle}>
      Collection #{props.collection.id}: {props.collection.name}
    </h1>
    <ImageFlexRow imgUrls={props.collection.imgUrls} />
  </div>;
