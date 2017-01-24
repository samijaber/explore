import * as React from 'react';

const defStyle: React.CSSProperties = {
  textAlign: 'center'
};

export const CollectionMetadata = ({id, title}) =>
  <h1 style={defStyle}>
    Collection #{id}: {title}
  </h1>;
