import * as React from 'react';

import { Thumbnail } from '../Thumbnail';

const defStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around'
};

interface ImageFlexRowProps {
  photos: Array<any>;
}

export const ImageFlexRow = (props: ImageFlexRowProps) => {
  const ThumbnailList = props.photos.map(photo =>
    <Thumbnail key={photo.id} imgUrl={photo.urls.small}/>
  );

  return (
    <div style={defStyle}>
      {ThumbnailList}
    </div>
  );
};
