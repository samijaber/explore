import React from 'react'

const defStyle = {
  width: 'auto',
  height: '100%'
}

export const Image = ({url, id, handleClick}) =>
  <img
    src={url}
    style={defStyle}
    role="presentation"
    onClick={() => handleClick(id)}
  />
