import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  noHighlight: {
    textDecoration: 'none',
    color: '#7c7876'
  }
})

export const A = ({href, text, children}) =>
  <a className={css(styles.noHighlight)} href={href}>
    {children}
  </a>
