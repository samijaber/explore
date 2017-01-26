import React from 'react'
import { connect } from 'react-redux'
import { css, StyleSheet } from 'aphrodite'

import { GraphContainer } from '../../containers/GraphContainer'
import { ButtonContainer } from '../../containers/ButtonContainer'
import { AppFooter } from '../../components/AppFooter'

const styles = StyleSheet.create({
  main: {
    margin: "0",
    paddingTop: "1%",
    fontFamily: "sans-serif"
  }
})

const AppComponent = ({selectedPhoto}) => {
  if (selectedPhoto) {
    return (
      <div className={css(styles.main)}>
        <GraphContainer />
        <AppFooter />
      </div>
    )
  } else {
    return (
      <div className={css(styles.main)}>
        <ButtonContainer />
        <AppFooter />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPhoto: state.selectedPhoto
  }
}

export const App = connect(mapStateToProps)(AppComponent)
