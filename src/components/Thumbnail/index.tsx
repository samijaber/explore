import * as React from 'react';

const defStyle: React.CSSProperties = {
  width: '300px',
  height: '300px'
};

interface ThumbnailProps {
  imgUrl: string;
}

export const Thumbnail = (props: ThumbnailProps) =>
  <img src={props.imgUrl} style={defStyle} />;
