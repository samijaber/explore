import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { fadeIn } from 'react-animations'

import { A } from '../A'

const styles = StyleSheet.create({
  footer: {
    position: "relative",
    marginTop: "-30px", /* negative value of footer height */
    height: "30px",
    clear: "both",
    textAlign: "center",
    animationName: fadeIn,
    animationDuration: '3s'
  }
})

export const AppFooter = () =>
  <div className={css(styles.footer)}>
    {"Made by Sami. Photographs from "}
    <A href="https://unsplash.com">
      Unsplash
    </A>
    {", icons by "}
    <A href="https://thenounproject.com/search/?q=camera&i=773808">
      Iconsparty.
    </A>
  </div>
