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

    // position: "absolute",
    // left: "50%",
    // bottom: "0",

    // right: "0",
    // bottom: "0",
    // left: "0",
    // padding: "1rem",
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
