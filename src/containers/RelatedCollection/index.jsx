import { connect } from 'react-redux';

import { CollectionMetadata } from '../../components/CollectionMetadata';

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.collections[ownProps.id].metadata
  };
};

export const RelatedCollection = connect(mapStateToProps)(CollectionMetadata);
