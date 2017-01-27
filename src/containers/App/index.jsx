import React from 'react'
import { connect } from 'react-redux'
import { css, StyleSheet } from 'aphrodite'

import { GraphContainer } from '../../containers/GraphContainer'
import { StartButton } from '../../containers/StartButton'
import { ResetButton } from '../../containers/ResetButton'
import { AppFooter } from '../../components/AppFooter'

const styles = StyleSheet.create({
  main: {
    height: "100%",
    fontFamily: "'Nunito Sans', sans-serif"
  },
  wrap: {
    minHeight: "100%"
  }
})

const AppComponent = ({selectedPhoto}) => {
  if (selectedPhoto) {
    return (
      <div className={css(styles.main)}>
        <div className={css(styles.wrap)}>
          <ResetButton />
          <GraphContainer />
        </div>
        <AppFooter />
      </div>
    )
  } else {
    return (
      <div className={css(styles.main)}>
        <div className={css(styles.wrap)}>
          <StartButton />
        </div>
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
