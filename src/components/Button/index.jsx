import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { fadeIn } from 'react-animations'

const styles = StyleSheet.create({
  button: {
    cursor: 'pointer',
    display: "inline-block",
    borderRadius: "10px",
    border: "1px solid black",
    padding: "10px"
  },
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '3s'
  },
  middleCenter: {
    position: 'fixed',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: "4"
  },
  topRight: {
    position: "absolute",
    top: "5%",
    right: "5%",
    textAlign: "center",
    zIndex: "4"
  }

})

export const Button = ({handleClick, children, location, description}) =>
  <div className={css(styles.fadeIn,
    location === 'topRight' ? styles.topRight : styles.middleCenter
  )}>
    <div
      className={css(styles.button)}
      type="submit"
      onClick={handleClick}
    >
      {children}
    </div>
    <br/>
    {description}
  </div>
