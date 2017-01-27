import React from 'react'
import FlipMove from 'react-flip-move'
import { StyleSheet, css } from 'aphrodite'
import _ from 'lodash'

import { Image } from '../../components/Image'

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: "1% 0 0 0"
  },
  large: {
    '@media (min-height: 1024px)': {
        height: "740px"
    }
  },
  medium: {
    '@media (max-height: 1024px)': {
        height: "600px"
    }
  },
  small: {
    '@media (max-height: 800px)': {
        height: "540px"
    }
  },
  xSmall: {
    '@media (max-width: 500px)': {
        height: "300px"
    }
  }
})

export class Graph extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(clickedPhoto) {
    const displayedPhotoIds = _.map(this.props.relatedPhotos, photo => photo.id)
    this.props.handleClick(clickedPhoto, displayedPhotoIds)
  }

  render() {
    // We can't pass this list as-is, FlipMove won't have smooth transitions
    const relatedPhotosList = this.props.relatedPhotos.map( photo =>
      <Image
        key={photo.urls.small}
        photo={photo}
        handleClick={this._handleClick}
        nextNode={true}
      />
    )
    return (
      <FlipMove
        className={css(
          styles.main, styles.large, styles.medium, styles.small, styles.xSmall
        )}
      >
        <Image
          key={this.props.selectedPhoto.urls.small}
          photo={this.props.selectedPhoto}
        />
        {relatedPhotosList && relatedPhotosList[0]}
        {relatedPhotosList && relatedPhotosList[1]}
        {relatedPhotosList && relatedPhotosList[2]}
      </FlipMove>
    )
  }
}
