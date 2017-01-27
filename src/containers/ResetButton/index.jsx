import { connect } from 'react-redux'

import { resetState } from '../../actions'
import { Button } from '../../components/Button'

const mapStateToProps = () => {
  return {
    children: "Start Over",
    location: "topRight"
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch(resetState())
  }
}

export const ResetButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
