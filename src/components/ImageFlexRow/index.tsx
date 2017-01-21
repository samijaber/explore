import * as React from 'react';

import { Thumbnail } from '../Thumbnail';

const defStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around'
};

interface ImageFlexRowProps {
  imgUrls: Array<string>;
}

export const ImageFlexRow = (props: ImageFlexRowProps) => {
  const ThumbnailList = props.imgUrls.map(url =>
    <Thumbnail imgUrl={url}/>
  );

  return (
    <div style={defStyle}>
      {ThumbnailList}
    </div>
  );
};
