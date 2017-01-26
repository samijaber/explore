import { connect } from 'react-redux'

import { getRelatedPhotos } from '../../reducers'
import { Graph } from '../../components/Graph'

const mapStateToProps = state => {
  return {
    selectedPhoto: state.selectedPhoto,
    isFetching: state.isFetching,
    relatedPhotos: getRelatedPhotos(state)
  }
}

export const GraphContainer = connect(mapStateToProps)(Graph)
