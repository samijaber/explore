import { connect } from 'react-redux';

import {selectAndFetchCollection} from '../../actions/collection';
import { Search } from '../../components/Search';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleClick: (collectionId: string) => {
      dispatch(selectAndFetchCollection(collectionId));
    }
  };
};

export const CollectionSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
