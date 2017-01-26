import { connect } from 'react-redux'

import { Image } from '../../components/Image'
import { selectPhotoAndFetchRelated } from '../../actions'

const mapStateToProps = (state, {photoId}) => {
  return {
    url: state.entities.photos[photoId].urls.small,
    userId: state.entities.photos[photoId].user,
  }
}

const mapDispatchToProps = (dispatch, {nextNode}) => {
  return {
    handleClick: (photoId, userId) => {
      if (nextNode) {
        dispatch(selectPhotoAndFetchRelated(photoId, userId))
      }
    }
  }
}

export const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Image)
