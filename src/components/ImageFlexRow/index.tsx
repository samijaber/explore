import * as React from 'react';

import { Image } from '../Image';

const defStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
};

export const ImageFlexRow = ({photos}) => {
  const ImageList = photos.map(photo =>
    <Image key={photo.id} imgUrl={photo.urls.small}/>
  );

  return (
    <div style={defStyle}>
      {ImageList}
    </div>
  );
};
