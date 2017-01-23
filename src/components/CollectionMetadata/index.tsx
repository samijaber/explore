import * as React from 'react';

const defStyle: React.CSSProperties = {
  textAlign: 'center'
};

export const CollectionMetadata = (props: any) =>
  <h1 style={defStyle}>
    Collection #{props.id}: {props.title}
  </h1>;
