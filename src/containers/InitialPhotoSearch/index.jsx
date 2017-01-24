import { connect } from 'react-redux'

import {selectAndFetchCollection} from '../../actions/collection'
import { fetchPhoto } from '../../actions'
import { Search } from '../../components/Search'

const mapStateToProps = () => {
  return {
    searchFor: 'initialImage'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (keyword) => {
      dispatch(fetchPhoto(keyword))
    }
  }
}

export const InitialPhotoSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
