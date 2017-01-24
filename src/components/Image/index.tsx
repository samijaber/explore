import * as React from 'react';

const defStyle: React.CSSProperties = {
  width: 'auto',
  height: '100%'
};

interface ImageProps {
  imgUrl: string;
}

export const Image = (props: ImageProps) =>
  <img src={props.imgUrl} style={defStyle} />;
