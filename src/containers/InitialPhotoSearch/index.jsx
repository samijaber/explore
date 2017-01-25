import { connect } from 'react-redux'

import { fetchInitialPhoto } from '../../actions'
import { Search } from '../../components/Search'

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (keyword) => {
      dispatch(fetchInitialPhoto(keyword))
    }
  }
}

export const InitialPhotoSearch = connect(
  null,
  mapDispatchToProps
)(Search)
