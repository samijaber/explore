import * as React from 'react';
import { connect } from 'react-redux';
// import * as Redux from 'redux';
import { selectCollection, fetchCollection } from '../../actions/collection';
import { fetchPhotos } from '../../actions/photos';

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
          props.dispatch(fetchCollection(input.value));
          props.dispatch(fetchPhotos(input.value));
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
