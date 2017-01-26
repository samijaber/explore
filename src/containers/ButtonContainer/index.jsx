import { connect } from 'react-redux'

import { initialSearch } from '../../actions'
import { Button } from '../../components/Button'

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch(initialSearch())
  }
}

export const ButtonContainer = connect(
  null,
  mapDispatchToProps
)(Button)
