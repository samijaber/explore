import * as React from 'react';
import { connect } from 'react-redux';

import {
  selectCollection, fetchCollectionIfNeeded,
  fetchRelatedCollectionsIfNeeded
} from '../../actions/collection';
import { fetchPhotosIfNeeded } from '../../actions/photos';

let RequestCollectionContainerComp = (props: any) => {
  let input: any;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          props.dispatch(selectCollection(input.value));
          props.dispatch(fetchCollectionIfNeeded(input.value));
          props.dispatch(fetchPhotosIfNeeded(input.value));
          props.dispatch(fetchRelatedCollectionsIfNeeded(input.value));
          input.value = '';
        }}
      >
      <input
        ref={node => input = node}
      />
      <button type="submit">
        Show Collection
      </button>
      </form>
    </div>
  );
};
export const RequestCollectionContainer = connect()(RequestCollectionContainerComp);
