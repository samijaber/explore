import React from 'react'
import { css, StyleSheet } from 'aphrodite'

import { A } from '../A'

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    right: "0",
    bottom: "0",
    left: "0",
    padding: "1rem",
    textAlign: "center"
  }
})

export const AppFooter = () =>
  <div className={css(styles.footer)}>
    {"Made by Sami. Icons by "}
    <A href="https://thenounproject.com/search/?q=camera&i=773808">
      Iconsparty
    </A>
  </div>
