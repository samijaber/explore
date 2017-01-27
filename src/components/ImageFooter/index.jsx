import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import { A } from '../A'

const cameraIcon = require('./camera-icon.svg')

const styles = StyleSheet.create({
  centerFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  xSmall : {
    '@media (max-width: 500px)': {
      justifyContent: 'center'
    }
  },
  svgSmall: {
    maxHeight: '30px',
    maxWidth: '30px'
  }
})


export const ImageFooter = ({username, photoId}) =>
  <div className={css(styles.centerFlex, styles.xSmall)}>
    <A href={"https://unsplash.com/" + username}>
       {"By @" + username + " "}
    </A>
    <A href={"https://unsplash.com/photos/" + photoId}>
      <img
        role="presentation"
        className={css(styles.svgSmall)}
        src={cameraIcon}
      />
    </A>
  </div>
