import { connect } from 'react-redux'

import { initialSearch } from '../../actions'
import { Button } from '../../components/Button'

const mapStateToProps = () => {
  return {
    children: "Explore Photography",
    location: "middleCenter",
    description: "Discover 3 related photos for every new one you click."
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch(initialSearch())
  }
}

export const StartButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
