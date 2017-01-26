import { connect } from 'react-redux'

import { selectPhotoAndFetchRelated, displayPhotos } from '../../actions'
import { getRelatedPhotos, getSelectedPhoto } from '../../reducers'
import { Graph } from '../../components/Graph'

const mapStateToProps = state => {
  return {
    selectedPhoto: getSelectedPhoto(state),
    isFetching: state.isFetching,
    relatedPhotos: getRelatedPhotos(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (photo, displayedPhotoIds) => {
        // might wanna move displayPhotos to be more time accurate
        // i.e. when the photos are actually displayed,
        // not right before they're being removed
        dispatch(displayPhotos(displayedPhotoIds))
        dispatch(selectPhotoAndFetchRelated(photo))
      }
  }
}


export const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph)
