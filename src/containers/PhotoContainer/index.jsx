import { connect } from 'react-redux'

import { Image } from '../../components/Image'
import { selectPhotoAndFetchRelated } from '../../actions'

const mapStateToProps = (state, {id}) => {
  return {
    url: state.entities.photos[id].urls.small
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (photoId) => {
      dispatch(selectPhotoAndFetchRelated(photoId))
    }
  }
}

export const PhotoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Image)
