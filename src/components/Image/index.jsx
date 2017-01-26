import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import {
  merge, slideInDown, fadeIn
} from 'react-animations'

const slideInDownWithFade = merge(slideInDown, fadeIn)

const styles = StyleSheet.create({
  fitToWidth: {
    width: 'auto',
    height: '100%'
  },
  slideDown: {
    animationName: slideInDownWithFade,
    animationDuration: '1s'
  },
})

export const Image = ({url, photoId, userId, handleClick}) =>
  <img
    className={css(styles.fitToWidth, styles.slideDown)}
    role="presentation"
    onClick={(e) => {
      e.preventDefault()
      handleClick(photoId, userId)
    }}
    src={url}
  />
