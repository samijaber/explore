import { connect } from 'react-redux'

import { Image } from '../../components/Image'

const mapStateToProps = (state) => {
  return {
    imgUrl: state.entities.photos[state.selectedPhoto].urls.small
  }
}

export const CentralPhoto = connect(mapStateToProps)(Image)
