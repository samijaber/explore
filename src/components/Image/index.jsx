import React from 'react'

const defStyle = {
  width: 'auto',
  height: '100%'
}

export const Image = ({imgUrl}) =>
  <img src={imgUrl} style={defStyle} role="presentation" />
