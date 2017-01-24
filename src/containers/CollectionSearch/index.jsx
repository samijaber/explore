import { connect } from 'react-redux';

import {selectAndFetchCollection} from '../../actions/collection';
import { Search } from '../../components/Search';

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (collectionId) => {
      dispatch(selectAndFetchCollection(collectionId));
    }
  };
};

export const CollectionSearch = connect(
  null,
  mapDispatchToProps
)(Search);
