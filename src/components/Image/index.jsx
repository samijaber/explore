import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { fadeIn } from 'react-animations'

import { ImageFooter } from '../ImageFooter'

const styles = StyleSheet.create({
  imgContainer: {
    textAlign: 'center',
    animationName: fadeIn,
    animationDuration: '3s',
    width: "33%",
    height: "50%",
    '@media (max-height: 1024px)': {
        height: "35%"
    }
  },
  bigMargins: {
    marginLeft: '30%',
    marginRight: '30%',
    marginBottom: '5%'
  },
  node: {
    maxHeight: "100%"
  }
})

export class Image extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(e) {
    e.preventDefault()
    if (this.props.handleClick) {
      this.props.handleClick(this.props.photo)
    }
  }

  render() {
    return (
      <div
        className={css(styles.imgContainer,
          (!this.props.nextNode && styles.bigMargins)
        )}
      >
        <img
          className={css(styles.node)}
          role="presentation"
          onClick={this._handleClick}
          src={this.props.photo.urls.small}
        />
        <ImageFooter
          photoId={this.props.photo.id}
          username={this.props.photo.user}
        />
      </div>
    )
  }
}
