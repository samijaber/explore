import { connect } from 'react-redux';

import { Collection } from '../../components/Collection';

const mapStateToProps = (state: any) => {
  return {
    collection: state.collections[state.selectedCollection]
  };
};

export const CollectionContainer = connect(
  mapStateToProps
)(Collection);
